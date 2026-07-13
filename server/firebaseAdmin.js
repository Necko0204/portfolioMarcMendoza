import admin from "firebase-admin";

export class FirebaseUnavailableError extends Error {
  constructor() {
    super("Firebase Admin is unavailable");
    this.name = "FirebaseUnavailableError";
  }
}

export function getFirebaseAdminApp(config) {
  if (admin.apps.length) return admin.app();
  const { projectId, clientEmail, privateKey, storageBucket } = config.firebase;
  if (!projectId || !clientEmail || !privateKey) return null;

  return admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    ...(storageBucket ? { storageBucket } : {})
  });
}

export function getFirebaseAdmin(config) {
  const app = getFirebaseAdminApp(config);
  if (!app) throw new FirebaseUnavailableError();
  return { admin, app, firestore: admin.firestore(app), auth: admin.auth(app) };
}

export async function verifyFirebaseIdToken(token, config) {
  const { auth } = getFirebaseAdmin(config);
  return auth.verifyIdToken(token, true);
}
