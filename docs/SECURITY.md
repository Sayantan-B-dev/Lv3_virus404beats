# SECURITY BASELINE

## Scope

Applies to:
- Next.js app
- public routes
- admin routes
- Google OAuth
- admin allowlist
- OTP
- signed sessions
- Turso
- Cloudinary
- Resend
- uploads
- external integrations
- future CMS features

## Baseline

- Never commit secrets.
- Validate every external input.
- Enforce authorization on every protected operation.
- Use parameterized database access.
- Do not expose stack traces or internal details to users.
- Do not log secrets or sensitive data.
- Use secure defaults and least privilege.
- Protect file uploads and paths against traversal and malicious content.
- Use timeouts and safe retry behavior for external services.
- Treat webhooks and external responses as untrusted.
- Rotate any accidentally exposed credential immediately.
- Report security-sensitive changes and assumptions clearly.

## Secrets

Never commit:
- `.env.local`
- `GOOGLE_CLIENT_SECRET`
- `RESEND_API_KEY`
- `TURSO_AUTH_TOKEN`
- `CLOUDINARY_API_SECRET`
- `AUTH_SECRET`

Never:
- send secrets to client code
- put secrets in HTML/props
- log secrets
- expose secrets through errors
- hardcode secrets

If a secret is exposed:
1. treat it as compromised
2. rotate it
3. remove the exposure
4. document the security event/change

## Authentication

Google OAuth = identity only.

Authentication != authorization.

Expected admin flow:

`Google OAuth -> validate identity -> normalize email -> ADMIN_EMAILS check -> OTP if enabled -> signed admin session`

Validate OAuth callback/state/provider response.

Never trust browser-supplied identity fields.

## Authorization

Admin allowlist:
- normalize email: trim + lowercase
- compare with `ADMIN_EMAILS`
- unlisted email = no admin access

Every protected operation must verify authorization server-side.

Protected operations include:
- create
- update
- publish
- archive
- delete
- upload
- replace media
- remove media
- edit homepage content
- edit social links
- future privileged mutations

Hidden buttons are not authorization.

Client-side auth checks are not security boundaries.

## OTP

When enabled:

- cryptographically random OTP
- short expiration
- one-time use
- server-side verification
- attempt limit
- rate limiting/throttling
- invalidate after success
- invalidate after expiration
- do not place OTP in URLs
- do not log OTP values

Prefer secure OTP representation/storage rather than long-lived plaintext storage.

## Session

Admin session must be:
- signed
- expiring
- httpOnly
- secure in production
- appropriate SameSite
- minimal in claims

Do not expose signing material.

## Public Data

Public routes expose published content only.

`status = published`

Draft/archived content must not leak through:
- pages
- API
- metadata
- search
- sitemap
- JSON-LD
- client props
- prefetch payloads

Do not fetch all records and hide them in the UI.
Filter at the server/query boundary.

## Input Validation

Treat all external/admin input as untrusted.

Validate:
- strings
- IDs
- slugs
- URLs
- enums
- dates
- numeric values
- status
- provider IDs
- query parameters
- request bodies
- headers where relevant

Use allowlists for enum-like values.

## Database

- Parameterized SQL only.
- No user-input SQL concatenation.
- Use constraints.
- Use transactions for atomic security-sensitive operations.
- Restrict DB credentials as much as possible.
- DB auth token server-only.

## XSS

Do not render arbitrary HTML.

If rich text is added:
- sanitize server-side
- use strict allowed markup
- never blindly inject raw HTML

CMS content must be treated as untrusted if attacker account access occurs.

## URLs

Validate external URLs.

Allowed schemes:
- `https`
- `http` only where explicitly intended

Reject dangerous schemes such as:
- `javascript:`
- `data:`
- other executable/untrusted schemes

## Uploads

Uploads are untrusted.

Validate:
- MIME type
- extension
- size
- expected media category

Do not trust file extension alone.

Protect against:
- path traversal
- malicious files
- unexpected MIME/content
- oversized uploads
- arbitrary provider resource manipulation

Cloudinary:
- credentials server-only
- validate public IDs
- authorize every destructive media operation

Audio binaries:
- Cloudinary
- never Turso

## External Services

Google OAuth, Resend, Cloudinary, Turso, and future integrations:

- validate responses
- treat provider output as untrusted
- use timeouts
- use safe retry behavior
- consider exponential backoff
- consider idempotency
- rate-limit sensitive calls
- never expose raw provider errors

## Webhooks

Webhooks are untrusted.

Where used:
- validate signature
- validate payload
- validate event type
- ensure idempotency
- reject malformed/replayed requests where applicable

## CSRF / Origin

For state-changing requests:

- rely on secure same-site cookie policy
- use framework protections where available
- validate origin where appropriate
- do not expose unnecessary cross-origin mutation endpoints

## Rate Limiting

Priority:
- admin login
- OAuth callback where relevant
- OTP request
- OTP verification
- uploads
- admin mutations
- webhooks
- public endpoints vulnerable to abuse

## Security Headers

Use appropriate production headers, including where applicable:
- CSP
- X-Content-Type-Options
- Referrer-Policy
- frame restrictions
- Permissions-Policy

Do not break OAuth, Cloudinary, audio, or required app functionality with
an untested CSP.

## Logging

Safe to log:
- event type
- request/correlation ID
- timing
- non-sensitive identifiers
- success/failure state

Never log:
- passwords
- OTPs
- OAuth secrets
- access tokens
- auth cookies
- DB tokens
- Cloudinary secrets
- sensitive payloads

## Errors

Internal error:
detailed + actionable in controlled logs

External error:
safe + minimal + useful

Never expose:
- stack traces
- SQL
- provider secrets
- internal paths
- security-sensitive state

## Security-Sensitive Changes

When changing:
- authentication
- authorization
- sessions
- uploads
- DB permissions
- external integrations
- secret handling
- security headers

Update:
- `SECURITY.md`
- `TRACK.md`

Also update `DESCISIONS.md` when the architecture/security model changes.

## Production Checklist

- [ ] `.env.local` ignored
- [ ] no secrets in git/history
- [ ] production secrets configured
- [ ] exposed secrets rotated if necessary
- [ ] OAuth redirect verified
- [ ] admin allowlist verified
- [ ] OTP protections active
- [ ] secure session cookies active
- [ ] admin mutations server-authorized
- [ ] public queries exclude unpublished data
- [ ] upload validation active
- [ ] media deletion authorized
- [ ] SQL parameterized
- [ ] rate limits active where needed
- [ ] security headers configured
- [ ] logs checked for secrets
- [ ] error responses checked for leakage