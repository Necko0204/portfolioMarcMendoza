import { readFile } from "node:fs/promises";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import admin from "firebase-admin";

const defaultEmail = "mendoza.marcangelo28@gmail.com";

function readHidden(prompt) {
  if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
    throw new Error("Run this command in an interactive terminal so the password can be entered securely.");
  }

  stdout.write(prompt);
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");

  return new Promise((resolve, reject) => {
    let value = "";

    function cleanup() {
      stdin.removeListener("data", onData);
      stdin.setRawMode(false);
      stdin.pause();
    }

    function onData(chunk) {
      for (const character of chunk) {
        if (character === "\u0003") {
          cleanup();
          stdout.write("\n");
          reject(new Error("Cancelled."));
          return;
        }
        if (character === "\r" || character === "\n") {
          cleanup();
          stdout.write("\n");
          resolve(value);
          return;
        }
        if (character === "\u007f" || character === "\b") {
          if (value) {
            value = value.slice(0, -1);
            stdout.write("\b \b");
          }
          continue;
        }
        value += character;
        stdout.write("*");
      }
    }

    stdin.on("data", onData);
  });
}

async function main() {
  const serviceAccountPath = process.argv[2];
  if (!serviceAccountPath) {
    throw new Error('Provide the downloaded service-account path. Example: pnpm firebase:create-admin -- "C:\\path\\service-account.json"');
  }

  const serviceAccount = JSON.parse(await readFile(serviceAccountPath, "utf8"));
  if (serviceAccount.project_id !== "portfolio-d77c1") {
    throw new Error("The selected service-account file is not for Firebase project portfolio-d77c1.");
  }

  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

  const terminal = createInterface({ input: stdin, output: stdout });
  const enteredEmail = await terminal.question(`Administrator email [${defaultEmail}]: `);
  terminal.close();
  const email = enteredEmail.trim() || defaultEmail;
  const password = await readHidden("Temporary password: ");

  if (password.length < 6) throw new Error("Firebase passwords must contain at least 6 characters.");

  try {
    const existingUser = await admin.auth().getUserByEmail(email);
    console.log(`The Firebase user already exists.\nADMIN_UIDS=${existingUser.uid}`);
    return;
  } catch (error) {
    if (error?.code !== "auth/user-not-found") throw error;
  }

  const user = await admin.auth().createUser({ email, password, emailVerified: false, disabled: false });
  console.log(`Firebase administrator created successfully.\nADMIN_UIDS=${user.uid}`);
  console.log("Add that ADMIN_UIDS value to Render, redeploy, then change the temporary password.");
}

main().catch((error) => {
  console.error(`Could not create the Firebase administrator: ${error.message}`);
  process.exitCode = 1;
});
