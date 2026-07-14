import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export class FirebaseUnavailableError extends Error {
  constructor() {
    super("Firebase Admin is unavailable");
    this.name = "FirebaseUnavailableError";
  }
}

export function getFirebaseAdminApp(config) {
  if (getApps().length) return getApp();
  const { projectId, clientEmail, privateKey, storageBucket } = config.firebase;
  if (!projectId || !clientEmail || !privateKey) return null;

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    ...(storageBucket ? { storageBucket } : {})
  });
}

export function getFirebaseAdmin(config) {
  const app = getFirebaseAdminApp(config);
  if (!app) throw new FirebaseUnavailableError();
  return { app, firestore: getFirestore(app), auth: getAuth(app) };
}

export async function verifyFirebaseIdToken(token, config) {
  const { auth } = getFirebaseAdmin(config);
  return auth.verifyIdToken(token, true);
}
