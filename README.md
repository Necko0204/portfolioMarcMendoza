# Marc Angelo Mendoza Portfolio

A production-focused, multi-route portfolio for Marc Angelo Mendoza: a full-stack systems builder with operations intelligence.

The website connects three kinds of proof:

- Live full-stack project case studies
- Technical architecture and handover evidence
- Executive VA and operations workflow evidence

## Application Routes

- `/` - focused homepage and interactive capability map
- `/projects` - selected project index
- `/projects/:slug` - reusable project case studies
- `/operations` - curated spreadsheet and workflow evidence
- `/about` - experience, education, and professional background
- `/contact` - validated public contact experience
- `/dashboard` - Firebase-authenticated contact administration
- Any unknown route - polished 404 experience

## Stack

- React 19, TypeScript, Vite, and React Router
- Tailwind base layer plus a custom token-driven interface system
- Framer Motion with reduced-motion support
- Node.js and Express
- Firebase Authentication and Firebase Admin
- Firestore for contact records
- Helmet, restricted CORS, input validation, and rate limiting
- Vitest, React Testing Library, and Supertest

## Local Development

Requirements: Node.js 22 and pnpm 11.7.x.

```bash
pnpm install --frozen-lockfile
cp .env.example .env
pnpm dev
```

The Vite frontend runs at `http://localhost:5173`. The Express service runs at `http://localhost:5050` and Vite proxies API requests to it.

Useful commands:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

## Environment Variables

Public build-time values are prefixed with `VITE_`. They are visible in browser code and must never contain passwords, private keys, administrator UIDs, or service-account credentials.

| Variable | Scope | Purpose |
| --- | --- | --- |
| `VITE_CONTACT_EMAIL` | Public | Intentionally public contact email |
| `VITE_PHONE_NUMBER` | Public | Intentionally public WhatsApp number |
| `VITE_LOCATION` | Public | Portfolio location |
| `VITE_API_BASE_URL` | Public | Optional separate API origin; blank for same-origin production |
| `VITE_CANONICAL_URL` | Public | Canonical production URL used for route metadata |
| `VITE_FIREBASE_*` | Public | Firebase web-app identifiers used only by the lazy dashboard login |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Server | Recommended: complete Firebase Admin service-account JSON stored as one Render secret |
| `FIREBASE_PROJECT_ID` | Server | Firebase Admin project ID |
| `FIREBASE_CLIENT_EMAIL` | Server | Firebase Admin service-account email |
| `FIREBASE_PRIVATE_KEY` | Server | Firebase Admin private key with escaped newlines |
| `FIREBASE_STORAGE_BUCKET` | Server | Optional Firebase Storage bucket |
| `ADMIN_UIDS` | Server | Comma-separated Firebase Auth UIDs allowed to administer contacts |
| `ALLOWED_ORIGINS` | Server | Comma-separated browser origins allowed to call the API |
| `CANONICAL_SITE_URL` | Server | Production URL used for `sitemap.xml` and `robots.txt` |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | Server | Public contact rate-limit window |
| `CONTACT_RATE_LIMIT_MAX` | Server | Maximum messages per window and connection |

Copy `.env.example` to `.env` locally. Never commit `.env`.

## Firebase Administrator Setup

1. In Firebase Console, enable **Authentication > Sign-in method > Email/Password**.
2. Create Marc's administrator account under **Authentication > Users**. Choose a unique email and a strong password in Firebase Console; do not place either password or a reusable credential in source code.
3. Copy the new user's Firebase UID.
4. Set that UID in the server-only `ADMIN_UIDS` environment variable. Multiple UIDs may be comma-separated.
5. In **Project settings > Service accounts**, generate a private key and store the complete downloaded JSON in Render as `FIREBASE_SERVICE_ACCOUNT_JSON`. Keep the file private and never commit it. The split server-only `FIREBASE_*` variables remain available as an alternative.
6. Configure the Firebase web-app values in the public `VITE_FIREBASE_*` variables so `/dashboard` can initiate Firebase Authentication.
7. Deploy `firestore.rules`. Those rules deny every browser read and write to `portfolioContacts`; the Admin SDK performs approved server operations and bypasses client rules.

An administrator must pass both checks:

1. Firebase Authentication verifies the account and issues an ID token.
2. Express verifies the token and confirms the UID is in `ADMIN_UIDS` or has an `admin: true` custom claim.

Signing in successfully does not grant access by itself.

## Contact Storage And Security

The public form sends only to `POST /api/contact`.

The server:

- Limits the JSON request body
- Normalizes and validates every accepted field
- Enforces email and length rules
- Uses a hidden honeypot field
- Rate-limits repeated submissions
- Applies Helmet security headers
- Restricts CORS to `ALLOWED_ORIGINS`
- Writes through Firebase Admin
- Returns generic errors without exposing Firebase configuration
- Avoids logging names, email addresses, or message bodies

Contact documents include contact details, inquiry type, optional role/project context, message, status, internal note, and server timestamps. Dashboard status values are `new`, `contacted`, and `archived`.

Protected routes:

- `GET /api/admin/contacts`
- `PATCH /api/admin/contacts/:id`
- `DELETE /api/admin/contacts/:id`

Every protected request requires a valid Firebase ID token and server-side administrator authorization.

## Render Deployment

The repository retains a single Render web service. Render installs dependencies, builds the Vite application, and starts Express. Express serves `dist` and returns `index.html` for client-side routes, so direct navigation to project, contact, operations, and dashboard paths works.

Before the first production deployment:

1. Add every `sync: false` value listed in `render.yaml`.
2. Set `VITE_CANONICAL_URL` and `CANONICAL_SITE_URL` to the final HTTPS origin.
3. Set `ALLOWED_ORIGINS` to that same origin. Add other approved origins only when needed.
4. Configure Firebase web values, Firebase Admin values, and `ADMIN_UIDS`.
5. Deploy the restrictive Firestore rules.
6. Confirm `/api/health`, the public contact form, Firebase sign-in, and dashboard authorization.

The generated `dist` directory is intentionally ignored. Render builds production assets from source and the lockfile, which avoids stale compiled files and prevents old browser bundles from retaining removed credentials.

## Evidence Assets

- Professional portrait: `public/assets/marc-mendoza-portrait.png` plus optimized WebP sizes
- SkillTest Indonesia handover preview: `public/assets/technical-handover-skilltestindonesia-preview.pdf`
- Executive VA workbook: `public/assets/marc-mendoza-executive-va-portfolio.xlsx`
- Curated operations screenshots: `public/assets/operations`
- Social preview card: `public/og.png`

The handover is a public redacted preview, not the confidential internal file. Workbook screenshots use representative sample records rather than private client data.
