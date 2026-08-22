import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// beats — the store catalog (tagged Cloudinary previews, manual buy flow)
export const beats = sqliteTable("beats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  meta: text("meta").notNull().default(""),
  year: text("year").notNull().default(""),
  price: integer("price").notNull().default(999), // whole INR (or minor units of currency)
  currency: text("currency").notNull().default("INR"),
  cover: text("cover"), // public/images/... or full URL (Cloudinary)
  cloudinaryPublicId: text("cloudinary_public_id"), // tagged preview stream source
  youtubeId: text("youtube_id"),
  isTop: integer("is_top", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  status: text("status", { enum: ["draft", "published"] })
    .notNull()
    .default("draft"),
  createdAt: integer("created_at").notNull().default(sql`(unixepoch() * 1000)`),
  updatedAt: integer("updated_at").notNull().default(sql`(unixepoch() * 1000)`),
});

// works — portfolio items: embedded YouTube videos OR uploaded Cloudinary audio
export const works = sqliteTable("works", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kind: text("kind", { enum: ["youtube", "uploaded"] }).notNull(),
  youtubeId: text("youtube_id"),
  cloudinaryId: text("cloudinary_id"),
  title: text("title").notNull(),
  meta: text("meta").notNull().default(""),
  year: text("year").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  status: text("status", { enum: ["draft", "published"] })
    .notNull()
    .default("draft"),
  createdAt: integer("created_at").notNull().default(sql`(unixepoch() * 1000)`),
  updatedAt: integer("updated_at").notNull().default(sql`(unixepoch() * 1000)`),
});

// otps — one-time codes for admin login (hashed, short-lived)
export const otps = sqliteTable("otps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  codeHash: text("code_hash").notNull(), // sha256(code + AUTH_SECRET)
  attempts: integer("attempts").notNull().default(0),
  expiresAt: integer("expires_at").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});

// content_overrides — dashboard edits layered on top of src/config/site.ts
export const contentOverrides = sqliteTable("content_overrides", {
  key: text("key").primaryKey(), // "services" | "hero" | "about"
  value: text("value", { mode: "json" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});

// audit_log — every admin mutation (Phase 4 hardening)
export const auditLog = sqliteTable("audit_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  action: text("action").notNull(), // e.g. "beats.create"
  detail: text("detail").notNull().default(""), // json summary, no secrets
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});
