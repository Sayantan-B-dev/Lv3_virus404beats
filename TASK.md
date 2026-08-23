# TASK

MAIN GOAL
Build production-quality Virus404beats portfolio.
Public now.
Dynamic DB-backed CMS-ready architecture.
Secure admin.

PHASE 1 — FOUNDATION
[ ] Next.js + TypeScript
[ ] folder structure
[ ] env config
[ ] lint/typecheck/build
[ ] design tokens
[ ] global layout
[ ] typography
[ ] responsive grid
[ ] UI primitives

PHASE 2 — PUBLIC
[ ] hero
[ ] selected work
[ ] audio
[ ] releases
[ ] services
[ ] credits/collabs
[ ] about
[ ] contact
[ ] footer
[ ] social
[ ] SEO

PHASE 3 — DB
[ ] Turso
[ ] migrations
[ ] tracks
[ ] releases
[ ] release_tracks
[ ] projects
[ ] credits
[ ] services
[ ] social_links
[ ] status
[ ] timestamps
[ ] unique slugs
[ ] seed content

PHASE 4 — MEDIA
[ ] Cloudinary
[ ] server upload flow
[ ] cover upload
[ ] audio upload
[ ] asset metadata
[ ] replacement
[ ] cleanup

PHASE 5 — AUTH
[ ] Google OAuth
[ ] callback
[ ] normalized email
[ ] ADMIN_EMAILS
[ ] OTP
[ ] Resend
[ ] OTP rate limit
[ ] signed session
[ ] secure cookies
[ ] expiry

PHASE 6 — ADMIN
[ ] dashboard
[ ] track list
[ ] create track
[ ] edit track
[ ] publish/unpublish
[ ] archive
[ ] releases
[ ] projects
[ ] services
[ ] social links
[ ] featured ordering

PHASE 7 — DYNAMIC
[ ] caching
[ ] revalidation
[ ] draft isolation
[ ] dynamic routes
[ ] sitemap
[ ] metadata

PHASE 8 — QA
[ ] mobile
[ ] keyboard
[ ] accessibility
[ ] auth security
[ ] upload failure
[ ] empty states
[ ] loading states
[ ] error states
[ ] build
[ ] deployment

ACCEPTANCE
Public user can:
- identify Virus404beats
- hear/select work
- view recent work
- see services
- open public links
- contact

Admin can:
- authenticate
- add content
- upload media
- edit
- publish
- archive

KEY TEST
New published track/project appears without source-code edit.

DO NOT
hardcode secrets
fake CMS
expose drafts
store audio binaries in Turso
require admin auth for public site
sacrifice mobile UX