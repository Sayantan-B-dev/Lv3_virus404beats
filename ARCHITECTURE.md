# ARCHITECTURE

STACK
Next.js
TypeScript
React
Turso/libSQL
Cloudinary
Google OAuth
Resend
Signed session
Vercel

FLOW: PUBLIC
browser
-> Next.js
-> server query
-> Turso
-> published content
-> render

FLOW: ADMIN LOGIN
browser
-> Google OAuth
-> callback
-> validate identity
-> normalize email
-> ADMIN_EMAILS check
-> OTP if enabled
-> signed admin session

FLOW: ADMIN MUTATION
admin UI
-> server action / route
-> session check
-> authz check
-> input validation
-> DB/provider mutation
-> revalidate
-> result

LAYERS
public UI
server queries
server mutations
auth
authz
media
DB

RULE
browser -> server -> DB
NEVER browser -> DB

PROJECT SHAPE
src/app
src/components
src/lib
src/server
src/types
src/styles

SUGGESTED ROUTES
/
 /work/[slug]
 /releases/[slug]
 /about
 /contact
 /admin
 /admin/tracks
 /admin/releases
 /admin/projects
 /admin/settings

API/ROUTES
/api/auth/*
/api/admin/*

DB
tracks:
id, slug, title, subtitle, description,
cover_url, audio_url, cloudinary_public_id,
duration_seconds, bpm, key_signature,
genre, tags, featured, status,
sort_order, released_at, created_at, updated_at

releases:
id, slug, title, description, cover_url,
release_type, release_date, featured,
status, sort_order, created_at, updated_at

release_tracks:
release_id, track_id, track_order

projects:
id, slug, title, client_name, role, description,
cover_url, external_url, status, featured,
sort_order, completed_at, created_at, updated_at

credits:
id, project_id, name, role, external_url,
sort_order, created_at

services:
id, slug, title, short_description, description,
featured, sort_order, status, created_at, updated_at

social_links:
id, platform, label, url, sort_order,
visible, created_at, updated_at

STATUS
draft
published
archived

PUBLIC QUERY
WHERE status = published

SLUG
Human URL.
Must be unique.
Never use title as primary key.

ID
Opaque stable DB primary key.

MEDIA
Cloudinary = binary/media
DB = URL + provider ID + metadata

AUDIO PLAYER
Client island.
Features:
play/pause
seek
time
duration
volume
accessible labels
single-active-track behavior
error/loading states
No accidental autoplay.

CACHE
Public = cache/revalidate where useful.
Admin = fresh.
After mutation:
DB update
-> provider cleanup if needed
-> revalidate affected paths/tags

SEO
Published only:
metadata
canonical
OG
structured data where useful
sitemap
Public dynamic routes.

EXTENSION POINTS
multiple admin roles
scheduled publish
draft preview
revisions
search
tags
analytics
private/unlisted work
platform metadata sync
lead/contact management