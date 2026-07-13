function parseList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parsePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(String(value || ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseServiceAccount(value) {
  if (!value) return null;

  try {
    const parsed = JSON.parse(String(value));
    if (!parsed || typeof parsed !== "object") return null;
    const projectId = String(parsed.project_id || parsed.projectId || "");
    const clientEmail = String(parsed.client_email || parsed.clientEmail || "");
    const privateKey = String(parsed.private_key || parsed.privateKey || "").replace(/\\n/g, "\n");
    if (!projectId || !clientEmail || !privateKey) return null;
    return { projectId, clientEmail, privateKey };
  } catch {
    return null;
  }
}

export function getServerConfig(env = process.env) {
  const isProduction = env.NODE_ENV === "production";
  const configuredOrigins = parseList(env.ALLOWED_ORIGINS);

  const serviceAccount = parseServiceAccount(env.FIREBASE_SERVICE_ACCOUNT_JSON);

  return {
    port: parsePositiveInteger(env.PORT, 5050),
    isProduction,
    allowedOrigins: configuredOrigins.length ? configuredOrigins : isProduction ? [] : ["http://localhost:5173"],
    adminUids: parseList(env.ADMIN_UIDS),
    canonicalSiteUrl: String(env.CANONICAL_SITE_URL || "").replace(/\/$/, ""),
    contactRateLimitWindowMs: parsePositiveInteger(env.CONTACT_RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    contactRateLimitMax: parsePositiveInteger(env.CONTACT_RATE_LIMIT_MAX, 5),
    firebase: {
      projectId: serviceAccount?.projectId || env.FIREBASE_PROJECT_ID || "",
      clientEmail: serviceAccount?.clientEmail || env.FIREBASE_CLIENT_EMAIL || "",
      privateKey: serviceAccount?.privateKey || String(env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      storageBucket: env.FIREBASE_STORAGE_BUCKET || ""
    }
  };
}
