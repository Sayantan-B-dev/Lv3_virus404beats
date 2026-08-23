# AGENTS

PROJECT = Virus404beats portfolio
STACK = Next.js + TypeScript + React + Turso/libSQL + Cloudinary + Google OAuth + Resend + signed session + Vercel

PURPOSE
Public music portfolio now.
Database-backed dynamic content.
Secure admin CMS later/alongside public site.

SOURCE DOCS
CONTEXT.md = brand/content facts
ARCHITECTURE.md = system structure
DESIGN.md = visual/interaction source of truth
CODE_CONVENTION.md = coding rules
SECURITY.md = security rules
DESCISIONS.md = architecture decisions
TASK.md = current build scope
TODO.md = backlog
TRACK.md = progress

CORE RULES
- public content = DB data, not JSX hardcode
- server owns DB/auth/authz/secrets
- browser never talks directly to Turso
- never commit .env.local
- never expose server secrets
- never trust client auth/authz
- every admin mutation rechecks session + authorization
- validate all external/admin input server-side
- public queries = published only

AUTH
Google OAuth = identity
ADMIN_EMAILS = authorization allowlist
OTP = second verification layer when enabled
ADMIN SESSION = signed + expiring + secure/httpOnly cookie in production

MEDIA
Cloudinary = audio + cover/media
Turso = metadata + asset refs
Never store binary audio in DB.

CONTENT
tracks
releases
release_tracks
projects
credits
services
social_links

STATUS
draft | published | archived

PUBLIC
No login required.
Never expose draft/archived via:
pages | API | metadata | search | sitemap

ADMIN
Protected routes + server checks.
UI hiding != security.

NEXT.JS
RSC default.
Client components only for browser state/API/interaction needs.

DESIGN
Maximalism + grid-based brutalism + editorial/music aesthetic.
Details in DESIGN.md.
Do not replace with generic SaaS visual style.

FACTUALITY
900+ client tracks/projects = self-reported claim.
Do not rewrite as 900+ released songs.
Do not invent clients, releases, stats, credits, achievements.

WORKFLOW
Read relevant docs before major changes.
Architecture/security/design changes => update matching docs.
Feature changes => update TASK/TODO/TRACK as appropriate.

DONE
typecheck + lint + build pass
auth/authz tested
public draft isolation tested
upload validation tested
responsive/a11y checked