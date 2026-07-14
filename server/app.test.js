// @vitest-environment node
import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { createApp } from "./app.js";

function createTestApp() {
  const messages = [
    {
      id: "message-1",
      name: "Hiring Manager",
      email: "hiring@example.com",
      company: "Example Company",
      inquiryType: "job-opportunity",
      projectContext: "Full-time role",
      message: "A valid professional message for Marc.",
      status: "new",
      internalNote: "",
      createdAt: "2026-07-12T10:00:00.000Z",
      updatedAt: "2026-07-12T10:00:00.000Z"
    }
  ];
  const store = {
    create: vi.fn(async () => "message-2"),
    list: vi.fn(async () => ({ messages, nextCursor: null, counts: { total: 1, new: 1, contacted: 0, archived: 0 } })),
    update: vi.fn(async (id, updates) => ({ ...messages[0], id, ...updates })),
    delete: vi.fn(async () => true)
  };
  const verifyIdToken = vi.fn(async (token) => {
    if (token === "allowed-token") return { uid: "allowed-admin", email: "admin@example.com" };
    if (token === "other-token") return { uid: "other-user", email: "other@example.com" };
    throw new Error("invalid token");
  });
  const config = {
    port: 5050,
    isProduction: false,
    allowedOrigins: ["http://localhost:5173"],
    adminUids: ["allowed-admin"],
    canonicalSiteUrl: "http://localhost:5173",
    contactRateLimitWindowMs: 900000,
    contactRateLimitMax: 5,
    firebase: { projectId: "", clientEmail: "", privateKey: "", storageBucket: "" }
  };
  return { app: createApp({ config, contactStore: store, verifyIdToken, rateLimitEnabled: false }), store };
}

describe("portfolio API security", () => {
  it("reports missing contact-storage credentials without exposing secrets", async () => {
    const { app } = createTestApp();
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.contactStorage).toBe("missing-credentials");
    expect(JSON.stringify(response.body)).not.toContain("privateKey");
  });

  it("disables unnecessary browser capabilities", async () => {
    const { app } = createTestApp();
    const response = await request(app).get("/api/health");
    expect(response.headers["permissions-policy"]).toBe(
      "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
    );
  });

  it("rejects unauthenticated administrator reads", async () => {
    const { app } = createTestApp();
    const response = await request(app).get("/api/admin/contacts");
    expect(response.status).toBe(401);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.headers.pragma).toBe("no-cache");
  });

  it("rejects authenticated users outside the server allowlist", async () => {
    const { app } = createTestApp();
    const response = await request(app).get("/api/admin/contacts").set("Authorization", "Bearer other-token");
    expect(response.status).toBe(403);
  });

  it("allows an authorized administrator to update a contact status", async () => {
    const { app, store } = createTestApp();
    const response = await request(app)
      .patch("/api/admin/contacts/message-1")
      .set("Authorization", "Bearer allowed-token")
      .send({ status: "contacted" });
    expect(response.status).toBe(200);
    expect(response.body.message.status).toBe("contacted");
    expect(store.update).toHaveBeenCalledWith("message-1", { status: "contacted" });
  });

  it("validates and stores a public contact submission through the server", async () => {
    const { app, store } = createTestApp();
    const response = await request(app).post("/api/contact").send({
      name: "Hiring Manager",
      email: "hiring@example.com",
      company: "Example Company",
      inquiryType: "job-opportunity",
      projectContext: "Full-time role",
      message: "I would like to discuss a full-stack role with Marc.",
      website: ""
    });
    expect(response.status).toBe(201);
    expect(store.create).toHaveBeenCalledOnce();
  });
});
