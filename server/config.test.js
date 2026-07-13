// @vitest-environment node
import { describe, expect, it } from "vitest";
import { getServerConfig } from "./config.js";

describe("server Firebase configuration", () => {
  it("reads Firebase Admin credentials from one service-account JSON value", () => {
    const config = getServerConfig({
      FIREBASE_SERVICE_ACCOUNT_JSON: JSON.stringify({
        project_id: "portfolio-d77c1",
        client_email: "firebase-admin@example.iam.gserviceaccount.com",
        private_key: "line-one\\nline-two"
      })
    });

    expect(config.firebase).toMatchObject({
      projectId: "portfolio-d77c1",
      clientEmail: "firebase-admin@example.iam.gserviceaccount.com",
      privateKey: "line-one\nline-two"
    });
  });

  it("falls back to split Firebase Admin variables", () => {
    const config = getServerConfig({
      FIREBASE_PROJECT_ID: "portfolio-d77c1",
      FIREBASE_CLIENT_EMAIL: "firebase-admin@example.iam.gserviceaccount.com",
      FIREBASE_PRIVATE_KEY: "line-one\\nline-two"
    });

    expect(config.firebase.privateKey).toBe("line-one\nline-two");
  });

  it("does not accept incomplete service-account JSON", () => {
    const config = getServerConfig({ FIREBASE_SERVICE_ACCOUNT_JSON: '{"project_id":"portfolio-d77c1"}' });
    expect(config.firebase.projectId).toBe("");
  });
});
