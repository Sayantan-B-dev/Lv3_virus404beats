# VIRUS404BEATS

Professional portfolio for Virus404beats.

IDENTITY
Virus404beats = producer/beatmaking brand
Sayantan Bharati = professional identity
Virus404 / Virus - 404 = music/credit aliases

PROFILE
music producer + audio engineer
freelance since January 2021
remote
West Bengal, India
900+ client tracks/projects = self-reported claim

GENRES
drill | trap | afro | jersey | lo-fi | melodic |
sample-based | boom bap | old-school

GOALS
PUBLIC
- premium portfolio
- music/audio discovery
- recent work
- releases
- services
- credits
- about
- contact

ADMIN
- secure login
- add/edit/publish tracks
- upload audio/covers
- manage releases/projects/services
- manage featured ordering
- dynamic public updates

STACK
Next.js
TypeScript
React
Turso/libSQL
Cloudinary
Google OAuth
Resend
signed session
Vercel

DOCS
CONTEXT.md
ARCHITECTURE.md
DESIGN.md
CODE_CONVENTION.md
SECURITY.md
DESCISIONS.md
TASK.md
TODO.md
TRACK.md

DESIGN
See DESIGN.md.
Direction = maximalism + grid-based brutalism + editorial/music.

ENV
Create .env.local.
Never commit.

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
ADMIN_EMAILS=
OTP_EMAIL=
RESEND_API_KEY=
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
WHATSAPP=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
AUTH_SECRET=
SITE_URL=

LOCAL
http://localhost:3000

PRODUCTION EXAMPLE
https://virus404beats.vercel.app

INSTALL
npm install

DEV
npm run dev

BUILD
npm run build

START
npm run start

LINT
npm run lint

SECURITY
See SECURITY.md.

RULE
Public data = published DB records.
Admin data = authenticated + authorized server operations.