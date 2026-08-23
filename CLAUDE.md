# CLAUDE

PROJECT
Virus404beats.

IDENTITY
brand = Virus404beats
professional = Sayantan Bharati
music aliases = Virus404 | Virus - 404 | Virus-404 | Virus 404

ROLE
producer
beatmaker
audio engineer
freelancer

SINCE
January 2021

PROFILE CLAIM
900+ client tracks/projects produced/edited/mixed.
self-reported.
Do not describe as 900+ released songs.

GENRES
drill | trap | afro | jersey | lo-fi | melodic |
sample-based | boom bap | old-school

STACK
Next.js
TypeScript
React
Turso
Cloudinary
Google OAuth
Resend
signed session
Vercel

ENV
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
ADMIN_EMAILS
OTP_EMAIL
RESEND_API_KEY
TURSO_DATABASE_URL
TURSO_AUTH_TOKEN
WHATSAPP
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
AUTH_SECRET
SITE_URL

NEVER
commit .env.local
hardcode secrets
expose server env
query DB from client
trust client auth
trust hidden admin UI as authorization

AUTH
Google identity
-> normalize email
-> ADMIN_EMAILS
-> OTP if enabled
-> signed session

PUBLIC
published only.

CONTENT
tracks
releases
projects
services
credits
social_links
featured content

IMPLEMENTATION
RSC default.
Client only when browser interaction requires it.

DB
Queries/mutations in server-side modules.
Parameterized SQL.
Explicit validation.

MEDIA
Cloudinary audio/covers.
Turso refs + metadata.

DESIGN
See DESIGN.md.
Direction = maximalism + grid-based brutalism + editorial/music.
Avoid generic SaaS, excessive glassmorphism, template-card UI.

ACCESSIBILITY
semantic HTML
keyboard usable
focus visible
labels
contrast
reduced motion
audio controls accessible

PERFORMANCE
server rendering
small client islands
optimized images
lazy heavy media
cache public reads

FEATURE DONE
typecheck
lint
build
authz
validation
responsive
error/loading states
docs updated when needed