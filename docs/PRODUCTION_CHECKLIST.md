# Production Checklist

## Render

- Set `NODE_ENV=production`.
- Set `VITE_CANONICAL_URL` and `CANONICAL_SITE_URL` to the final HTTPS origin.
- Set `ALLOWED_ORIGINS` to the same HTTPS origin.
- Leave `VITE_API_BASE_URL` blank when Express and the frontend share one Render service.
- Confirm the health check at `/api/health`.
- Confirm direct refreshes work for `/projects`, every project slug, `/operations`, `/about`, `/contact`, and `/dashboard`.

## Firebase Web App

- Enable Email/Password under Firebase Authentication sign-in methods.
- Add the Render domain under Firebase Authentication authorized domains.
- Configure all six `VITE_FIREBASE_*` values in Render.
- Do not place a password or administrator UID in a `VITE_` variable.

## Firebase Admin

- Recommended: configure `FIREBASE_SERVICE_ACCOUNT_JSON` with the complete private-key JSON downloaded from Firebase Project settings > Service accounts.
- Alternative: configure `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`, preserving escaped `\n` line breaks.
- Configure `FIREBASE_STORAGE_BUCKET` when needed.
- Configure `ADMIN_UIDS` with Marc's Firebase Authentication UID.
- Rotate the service-account key if it is ever copied to an unsafe location.

## Firestore

- Deploy `firestore.rules`.
- Confirm browser reads and writes to `portfolioContacts` are denied.
- Submit one message through `/contact` and confirm it is created by Firebase Admin.
- Confirm an unauthenticated request to `/api/admin/contacts` returns HTTP 401.
- Confirm a signed-in but non-allowlisted Firebase user receives HTTP 403.
- Confirm the allowlisted administrator can update status, save a note, export CSV, and delete a test message.

## Contact Form

- Set the final origin in `ALLOWED_ORIGINS`.
- Keep the body limit, validation, honeypot, and rate limiter enabled.
- Test success and safe failure states.
- Confirm messages never include passwords or credentials during testing.

## Search And Sharing

- Open `/sitemap.xml` and verify production URLs.
- Open `/robots.txt` and confirm `/dashboard` is disallowed.
- Share the production URL in a link-preview tool and verify `public/og.png`.
- Confirm every route has a unique title, description, and canonical URL.

## Final Quality Pass

- Run `pnpm lint`.
- Run `pnpm typecheck`.
- Run `pnpm test`.
- Run `pnpm build`.
- Test keyboard navigation, the mobile menu, light/dark/system themes, and reduced-motion mode.
- Search the repository and final `dist` output for private credentials before deployment.
