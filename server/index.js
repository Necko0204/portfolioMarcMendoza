import dotenv from "dotenv";
import { createApp } from "./app.js";
import { getServerConfig } from "./config.js";

dotenv.config();

const config = getServerConfig();
const app = createApp({ config });

const firebaseConfigured = Boolean(config.firebase.projectId && config.firebase.clientEmail && config.firebase.privateKey);
if (!firebaseConfigured) {
  console.warn(
    "Contact storage is not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON (recommended) or the split FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY values."
  );
}

app.listen(config.port, () => {
  console.log(`Portfolio service listening on port ${config.port}`);
});
