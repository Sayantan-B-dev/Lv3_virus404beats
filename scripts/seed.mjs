#!/usr/bin/env node
// scripts/seed.mjs — seed beats and works from site.ts static data
import { createClient } from "@libsql/client";
import { createHash } from "node:crypto";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error("TURSO_DATABASE_URL not set. For local testing, use: file:./local.db");
  process.exit(1);
}

const client = createClient({ url, authToken });

// Beats data from src/config/site.ts (simplified for store)
// Each beat needs a Cloudinary public_id for preview stream (upload separately)
// We'll seed with placeholder IDs; admin will replace via dashboard
const beatsSeed = [
  {
    title: "ANTISOCIAL",
    meta: "Trap · Dark minimal pocket",
    year: "2026",
    price: 1499,
    currency: "INR",
    cover: "album-1.avif",
    cloudinaryPublicId: "virus404/beats/antisocial-preview", // placeholder
    youtubeId: "",
    isTop: true,
    sortOrder: 1,
    status: "published",
  },
  {
    title: "NO CAP",
    meta: "Hip-Hop · Hard-knock drums",
    year: "2024",
    price: 1299,
    currency: "INR",
    cover: "album-2.avif",
    cloudinaryPublicId: "virus404/beats/no-cap-preview",
    youtubeId: "",
    isTop: true,
    sortOrder: 2,
    status: "published",
  },
  {
    title: "REAL DEAL",
    meta: "Rap · Original collab",
    year: "2023",
    price: 999,
    currency: "INR",
    cover: "album-3.avif",
    cloudinaryPublicId: "virus404/beats/real-deal-preview",
    youtubeId: "",
    isTop: false,
    sortOrder: 3,
    status: "published",
  },
  {
    title: "09:22",
    meta: "Experimental trap textures",
    year: "2023",
    price: 1199,
    currency: "INR",
    cover: "album-3.avif",
    cloudinaryPublicId: "virus404/beats/0922-preview",
    youtubeId: "",
    isTop: false,
    sortOrder: 4,
    status: "published",
  },
  {
    title: "PAISA, NASHA, FAME",
    meta: "Street storytelling",
    year: "2023",
    price: 999,
    currency: "INR",
    cover: "album-3.avif",
    cloudinaryPublicId: "virus404/beats/paisa-preview",
    youtubeId: "",
    isTop: false,
    sortOrder: 5,
    status: "published",
  },
];

// Works data: YouTube embeds + uploaded audio from site.ts releases + beats list
const worksSeed = [
  {
    kind: "youtube",
    youtubeId: "dQw4w9WgXcQ", // placeholder — replace with real video IDs
    title: "ANTISOCIAL (Official Video)",
    meta: "UNFILTERED AKASH, MISHI B & Virus404",
    year: "2026",
    sortOrder: 1,
    status: "published",
  },
  {
    kind: "youtube",
    youtubeId: "dQw4w9WgXcQ",
    title: "REAL DEAL (Official Video)",
    meta: "YxvngSha_dre & Virus404",
    year: "2023",
    sortOrder: 2,
    status: "published",
  },
  {
    kind: "youtube",
    youtubeId: "dQw4w9WgXcQ",
    title: "09:22 / PAISA, NASHA, FAME (Audio)",
    meta: "YxvngSha_dre, Virus404, tobehoyejak",
    year: "2023",
    sortOrder: 3,
    status: "published",
  },
  // Uploaded audio placeholders (replace cloudinary_id after upload)
  {
    kind: "uploaded",
    cloudinaryId: "virus404/works/infinity-mix",
    title: "INFINITY (Mix & Master)",
    meta: "SBVIEW & X Rhymer",
    year: "2024",
    sortOrder: 4,
    status: "published",
  },
];

async function seed() {
  console.log("Seeding beats...");
  for (const beat of beatsSeed) {
    await client.execute({
      sql: `INSERT INTO beats (title, meta, year, price, currency, cover, cloudinary_public_id, youtube_id, is_top, sort_order, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        beat.title,
        beat.meta,
        beat.year,
        beat.price,
        beat.currency,
        beat.cover,
        beat.cloudinaryPublicId,
        beat.youtubeId,
        beat.isTop ? 1 : 0,
        beat.sortOrder,
        beat.status,
      ],
    });
  }
  console.log(`  Inserted ${beatsSeed.length} beats`);

  console.log("Seeding works...");
  for (const work of worksSeed) {
    await client.execute({
      sql: `INSERT INTO works (kind, youtube_id, cloudinary_id, title, meta, year, sort_order, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        work.kind,
        work.youtubeId || null,
        work.cloudinaryId || null,
        work.title,
        work.meta,
        work.year,
        work.sortOrder,
        work.status,
      ],
    });
  }
  console.log(`  Inserted ${worksSeed.length} works`);

  await client.close();
  console.log("Seed complete.");
}

seed();