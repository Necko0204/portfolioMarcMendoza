export function createAdminGuard({ verifyIdToken, adminUids }) {
  const allowedUids = new Set(adminUids);

  return async function adminGuard(req, res, next) {
    const authorization = req.get("authorization") || "";
    const [scheme, token] = authorization.split(" ");
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "Administrator authentication is required." });
    }

    try {
      const decoded = await verifyIdToken(token);
      const isAllowed = decoded.admin === true || allowedUids.has(decoded.uid);
      if (!isAllowed) return res.status(403).json({ error: "This account is not authorized for the dashboard." });
      req.adminUser = { uid: decoded.uid, email: decoded.email || "" };
      return next();
    } catch (error) {
      if (error?.name === "FirebaseUnavailableError") {
        return res.status(503).json({ error: "Administrator authentication is temporarily unavailable." });
      }
      return res.status(401).json({ error: "The administrator session is invalid or expired." });
    }
  };
}
