import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createAdminGuard } from "./auth.js";
import { getServerConfig } from "./config.js";
import { createFirestoreContactStore, FirebaseUnavailableError } from "./contactStore.js";
import { verifyFirebaseIdToken } from "./firebaseAdmin.js";
import { contactSubmissionSchema, contactUpdateSchema, formatValidationError } from "./validation.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "..", "dist");
const projectRoutes = [
  "/",
  "/projects",
  "/projects/human-capital-management-system",
  "/projects/skilltest-indonesia-platform",
  "/projects/hshr-school-erp",
  "/operations",
  "/about",
  "/contact"
];

function xmlEscape(value) {
  return value.replace(/[<>&'"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character]);
}

function requestBaseUrl(req, config) {
  if (config.canonicalSiteUrl) return config.canonicalSiteUrl;
  return `${req.protocol}://${req.get("host")}`;
}

function safeLog(label, error) {
  console.error(label, { name: error?.name || "Error", code: error?.code || "unknown" });
}

export function createApp(options = {}) {
  const config = options.config || getServerConfig();
  const contactStore = options.contactStore || createFirestoreContactStore(config);
  const verifyIdToken = options.verifyIdToken || ((token) => verifyFirebaseIdToken(token, config));
  const rateLimitEnabled = options.rateLimitEnabled ?? true;
  const app = express();
  const contactStorageConfigured = Boolean(
    config.firebase.projectId && config.firebase.clientEmail && config.firebase.privateKey
  );

  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
          fontSrc: ["'self'", "data:"],
          connectSrc: ["'self'", "https://*.googleapis.com", "https://*.firebaseio.com", "wss://*.firebaseio.com"],
          frameSrc: ["'self'", "https://*.firebaseapp.com"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"]
        }
      }
    })
  );
  app.use((_req, res, next) => {
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
    next();
  });
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || config.allowedOrigins.includes(origin)) return callback(null, true);
        return callback(null, false);
      },
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      maxAge: 86400
    })
  );
  app.use(express.json({ limit: "20kb", strict: true }));

  app.get("/api/health", (_req, res) => res.json({
    ok: true,
    service: "marc-mendoza-portfolio-api",
    contactStorage: contactStorageConfigured ? "configured" : "missing-credentials"
  }));

  const contactLimiter = rateLimit({
    windowMs: config.contactRateLimitWindowMs,
    limit: config.contactRateLimitMax,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many messages were sent from this connection. Please try again later." },
    skip: () => !rateLimitEnabled
  });

  app.post("/api/contact", contactLimiter, async (req, res) => {
    const parsed = contactSubmissionSchema.safeParse(req.body || {});
    if (!parsed.success) {
      return res.status(400).json({ error: "Review the highlighted fields and try again.", fieldErrors: formatValidationError(parsed.error) });
    }

    const { website, ...submission } = parsed.data;
    if (website) {
      return res.status(201).json({ ok: true, message: "Thanks. Your message has been received." });
    }

    try {
      await contactStore.create(submission);
      return res.status(201).json({ ok: true, message: "Thanks. Your message was sent to Marc successfully." });
    } catch (error) {
      safeLog("Contact submission failed", error);
      const status = error instanceof FirebaseUnavailableError ? 503 : 500;
      return res.status(status).json({ error: "The message service is temporarily unavailable. Please use email instead." });
    }
  });

  const adminGuard = createAdminGuard({ verifyIdToken, adminUids: config.adminUids });

  app.use("/api/admin", (_req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
    next();
  });

  app.get("/api/admin/contacts", adminGuard, async (req, res) => {
    const requestedLimit = Number.parseInt(String(req.query.limit || "30"), 10);
    const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 50) : 30;
    const cursor = typeof req.query.cursor === "string" ? req.query.cursor : "";
    try {
      const result = await contactStore.list({ limit, cursor });
      return res.json({ ok: true, ...result });
    } catch (error) {
      safeLog("Admin contact read failed", error);
      return res.status(500).json({ error: "Contact messages could not be loaded." });
    }
  });

  app.patch("/api/admin/contacts/:id", adminGuard, async (req, res) => {
    const parsed = contactUpdateSchema.safeParse(req.body || {});
    if (!parsed.success) return res.status(400).json({ error: "The requested update is invalid.", fieldErrors: formatValidationError(parsed.error) });
    try {
      const message = await contactStore.update(req.params.id, parsed.data);
      if (!message) return res.status(404).json({ error: "The contact message was not found." });
      return res.json({ ok: true, message });
    } catch (error) {
      safeLog("Admin contact update failed", error);
      return res.status(500).json({ error: "The contact message could not be updated." });
    }
  });

  app.delete("/api/admin/contacts/:id", adminGuard, async (req, res) => {
    try {
      const deleted = await contactStore.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: "The contact message was not found." });
      return res.json({ ok: true });
    } catch (error) {
      safeLog("Admin contact delete failed", error);
      return res.status(500).json({ error: "The contact message could not be deleted." });
    }
  });

  app.use("/api", (_req, res) => res.status(404).json({ error: "API route not found." }));

  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = requestBaseUrl(req, config);
    const entries = projectRoutes.map((route) => `<url><loc>${xmlEscape(`${baseUrl}${route}`)}</loc></url>`).join("");
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`);
  });

  app.get("/robots.txt", (req, res) => {
    const baseUrl = requestBaseUrl(req, config);
    res.type("text/plain").send(`User-agent: *\nAllow: /\nDisallow: /dashboard\nSitemap: ${baseUrl}/sitemap.xml\n`);
  });

  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath, {
      setHeaders(res, filePath) {
        if (filePath.includes(`${path.sep}assets${path.sep}`)) res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    }));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  return app;
}
