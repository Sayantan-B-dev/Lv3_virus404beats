-- 000_init.sql — initial schema for virus404beats
-- Run with: npx @libsql/client <TURSO_DATABASE_URL> --authToken <TOKEN> < 000_init.sql
-- Or: npx tsx scripts/apply-migration.mjs

-- beats — the beat store catalog (tagged Cloudinary previews, manual buy flow)
CREATE TABLE IF NOT EXISTS beats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  meta TEXT NOT NULL DEFAULT '',
  year TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL DEFAULT 999, -- whole INR (or minor units of currency)
  currency TEXT NOT NULL DEFAULT 'INR',
  cover TEXT, -- public/images/... or full URL (Cloudinary)
  cloudinary_public_id TEXT, -- tagged preview stream source
  youtube_id TEXT,
  is_top INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

-- works — portfolio items: embedded YouTube videos OR uploaded Cloudinary audio
CREATE TABLE IF NOT EXISTS works (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL CHECK (kind IN ('youtube', 'uploaded')),
  youtube_id TEXT,
  cloudinary_id TEXT,
  title TEXT NOT NULL,
  meta TEXT NOT NULL DEFAULT '',
  year TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

-- otps — one-time codes for admin login (hashed, short-lived)
CREATE TABLE IF NOT EXISTS otps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  code_hash TEXT NOT NULL, -- sha256(code + AUTH_SECRET)
  attempts INTEGER NOT NULL DEFAULT 0,
  expires_at INTEGER NOT NULL, -- timestamp_ms
  created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

-- content_overrides — dashboard edits layered on top of src/config/site.ts
CREATE TABLE IF NOT EXISTS content_overrides (
  key TEXT PRIMARY KEY, -- 'services' | 'hero' | 'about'
  value TEXT NOT NULL, -- JSON
  updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

-- audit_log — every admin mutation (Phase 4 hardening)
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL, -- e.g. 'beats.create'
  detail TEXT NOT NULL DEFAULT '', -- json summary, no secrets
  created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

-- indexes
CREATE INDEX IF NOT EXISTS beats_slug ON beats (id); -- implicit PK
CREATE INDEX IF NOT EXISTS beats_year_order ON beats (year, sort_order);
CREATE INDEX IF NOT EXISTS works_kind_order ON works (kind, sort_order);
CREATE INDEX IF NOT EXISTS otps_email_expires ON otps (email, expires_at);
CREATE INDEX IF NOT EXISTS audit_log_created ON audit_log (created_at);