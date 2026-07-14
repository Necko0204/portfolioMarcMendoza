import dotenv from "dotenv";
import { createApp } from "./app.js";
import { getServerConfig } from "./config.js";
import { getFirebaseAdmin } from "./firebaseAdmin.js";

dotenv.config();

const config = getServerConfig();
const app = createApp({ config });

const firebaseConfigured = Boolean(config.firebase.projectId && config.firebase.clientEmail && config.firebase.privateKey);
if (!firebaseConfigured) {
  console.warn(
    "Contact storage is not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON (recommended) or the split FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY values."
  );
} else {
  getFirebaseAdmin(config).firestore.collection("portfolioContacts").limit(1).get().then(
    () => console.log("Contact storage connection verified."),
    (error) => console.error("Contact storage verification failed.", {
      name: error?.name || "Error",
      code: error?.code || "unknown"
    })
  );
}

app.listen(config.port, () => {
  console.log(`Portfolio service listening on port ${config.port}`);
});
