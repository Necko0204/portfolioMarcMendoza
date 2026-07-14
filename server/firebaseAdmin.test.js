// @vitest-environment node
import { generateKeyPairSync } from "node:crypto";
import { deleteApp } from "firebase-admin/app";
import { describe, expect, it } from "vitest";
import { getFirebaseAdmin } from "./firebaseAdmin.js";

describe("Firebase Admin initialization", () => {
  it("initializes through the modular Firebase Admin API", async () => {
    const { privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
      publicKeyEncoding: { type: "spki", format: "pem" }
    });
    const config = {
      firebase: {
        projectId: "portfolio-security-test",
        clientEmail: "firebase-admin@example.iam.gserviceaccount.com",
        privateKey,
        storageBucket: ""
      }
    };

    const firebase = getFirebaseAdmin(config);
    expect(firebase.app.name).toBe("[DEFAULT]");
    expect(typeof firebase.auth.verifyIdToken).toBe("function");
    expect(typeof firebase.firestore.collection).toBe("function");

    await deleteApp(firebase.app);
  });
});
