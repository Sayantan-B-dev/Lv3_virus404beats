// src/lib/db.ts — Turso (libSQL) client with graceful static fallback
import { createClient } from "@libsql/client";
import * as schema from "@db/schema";

export interface BeatRow {
  id: number;
  title: string;
  meta: string;
  year: string;
  price: number;
  currency: string;
  cover: string | null;
  cloudinaryPublicId: string | null;
  youtubeId: string | null;
  isTop: boolean;
  sortOrder: number;
  status: string;
  createdAt: number;
  updatedAt: number;
}

export interface WorkRow {
  id: number;
  kind: string;
  youtubeId: string | null;
  cloudinaryId: string | null;
  title: string;
  meta: string;
  year: string;
  sortOrder: number;
  status: string;
  createdAt: number;
  updatedAt: number;
}

export function isDbConfigured(): boolean {
  return !!process.env.TURSO_DATABASE_URL;
}

function getClient() {
  if (!isDbConfigured()) throw new Error("DB not configured");
  return createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
}

// Beats
export async function getBeats(options?: {
  status?: "draft" | "published";
  topOnly?: boolean;
  limit?: number;
}): Promise<BeatRow[]> {
  if (!isDbConfigured()) return [];
  const client = getClient();
  let sql = "SELECT * FROM beats WHERE 1=1";
  const args: (string | number | boolean)[] = [];
  if (options?.status) {
    sql += " AND status = ?";
    args.push(options.status);
  }
  if (options?.topOnly) {
    sql += " AND is_top = 1";
  }
  sql += " ORDER BY sort_order ASC, year DESC LIMIT ?";
  args.push(options?.limit ?? 100);
  try {
    const result = await client.execute({ sql, args });
    await client.close();
    return result.rows.map((r) => ({
      id: Number(r.id),
      title: String(r.title),
      meta: String(r.meta),
      year: String(r.year),
      price: Number(r.price),
      currency: String(r.currency),
      cover: r.cover ? String(r.cover) : null,
      cloudinaryPublicId: r.cloudinary_public_id ? String(r.cloudinary_public_id) : null,
      youtubeId: r.youtube_id ? String(r.youtube_id) : null,
      isTop: Boolean(r.is_top),
      sortOrder: Number(r.sort_order),
      status: String(r.status),
      createdAt: Number(r.created_at),
      updatedAt: Number(r.updated_at),
    }));
  } catch {
    try { await client.close(); } catch {}
    return [];
  }
}

// Works
export async function getWorks(options?: {
  status?: "draft" | "published";
  kind?: "youtube" | "uploaded";
  limit?: number;
}): Promise<WorkRow[]> {
  if (!isDbConfigured()) return [];
  const client = getClient();
  let sql = "SELECT * FROM works WHERE 1=1";
  const args: (string | number | boolean)[] = [];
  if (options?.status) {
    sql += " AND status = ?";
    args.push(options.status);
  }
  if (options?.kind) {
    sql += " AND kind = ?";
    args.push(options.kind);
  }
  sql += " ORDER BY sort_order ASC, year DESC LIMIT ?";
  args.push(options?.limit ?? 100);
  try {
    const result = await client.execute({ sql, args });
    await client.close();
    return result.rows.map((r) => ({
      id: Number(r.id),
      kind: String(r.kind),
      youtubeId: r.youtube_id ? String(r.youtube_id) : null,
      cloudinaryId: r.cloudinary_id ? String(r.cloudinary_id) : null,
      title: String(r.title),
      meta: String(r.meta),
      year: String(r.year),
      sortOrder: Number(r.sort_order),
      status: String(r.status),
      createdAt: Number(r.created_at),
      updatedAt: Number(r.updated_at),
    }));
  } catch {
    try { await client.close(); } catch {}
    return [];
  }
}

// Content overrides
export async function getContentOverrides(): Promise<Record<string, unknown>> {
  if (!isDbConfigured()) return {};
  const client = getClient();
  try {
    const result = await client.execute("SELECT key, value FROM content_overrides");
    await client.close();
    const out: Record<string, unknown> = {};
    for (const row of result.rows) {
      try {
        out[String(row.key)] = JSON.parse(String(row.value));
      } catch {
        out[String(row.key)] = row.value;
      }
    }
    return out;
  } catch {
    try { await client.close(); } catch {}
    return {};
  }
}

// Audit log
export async function writeAuditLog(action: string, detail: Record<string, unknown> = {}) {
  if (!isDbConfigured()) return;
  const client = getClient();
  await client.execute({
    sql: "INSERT INTO audit_log (action, detail) VALUES (?, ?)",
    args: [action, JSON.stringify(detail)],
  });
  await client.close();
}

// OTP helpers
export async function storeOtp(email: string, codeHash: string, expiresAt: number) {
  if (!isDbConfigured()) return;
  const client = getClient();
  await client.execute({
    sql: "INSERT INTO otps (email, code_hash, attempts, expires_at) VALUES (?, ?, ?, ?)",
    args: [email.toLowerCase(), codeHash, 0, expiresAt],
  });
  await client.close();
}

export async function getOtp(email: string) {
  if (!isDbConfigured()) return null;
  const client = getClient();
  const result = await client.execute({
    sql: "SELECT * FROM otps WHERE email = ? ORDER BY created_at DESC LIMIT 1",
    args: [email.toLowerCase()],
  });
  await client.close();
  return result.rows[0] ?? null;
}

export async function incrementOtpAttempts(id: number) {
  if (!isDbConfigured()) return;
  const client = getClient();
  await client.execute({
    sql: "UPDATE otps SET attempts = attempts + 1 WHERE id = ?",
    args: [id],
  });
  await client.close();
}

export async function deleteOtp(id: number) {
  if (!isDbConfigured()) return;
  const client = getClient();
  await client.execute({
    sql: "DELETE FROM otps WHERE id = ?",
    args: [id],
  });
  await client.close();
}

// Admin mutations
export async function createBeat(data: any) {
  if (!isDbConfigured()) throw new Error("DB not configured");
  const client = getClient();
  const result = await client.execute({
    sql: `INSERT INTO beats (title, meta, year, price, currency, cover, cloudinary_public_id, youtube_id, is_top, sort_order, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      data.title, data.meta, data.year, data.price ?? 999,
      data.currency ?? "INR", data.cover ?? null,
      data.cloudinaryPublicId ?? null, data.youtubeId ?? null,
      data.isTop ? 1 : 0, data.sortOrder ?? 0, data.status ?? "draft",
    ],
  });
  await client.close();
  return result;
}

export async function updateBeat(id: number, data: any) {
  if (!isDbConfigured()) throw new Error("DB not configured");
  const client = getClient();
  const fields: string[] = [];
  const args: any[] = [];
  if (data.title !== undefined) { fields.push("title = ?"); args.push(data.title); }
  if (data.meta !== undefined) { fields.push("meta = ?"); args.push(data.meta); }
  if (data.year !== undefined) { fields.push("year = ?"); args.push(data.year); }
  if (data.price !== undefined) { fields.push("price = ?"); args.push(data.price); }
  if (data.currency !== undefined) { fields.push("currency = ?"); args.push(data.currency); }
  if (data.cover !== undefined) { fields.push("cover = ?"); args.push(data.cover); }
  if (data.cloudinaryPublicId !== undefined) { fields.push("cloudinary_public_id = ?"); args.push(data.cloudinaryPublicId); }
  if (data.youtubeId !== undefined) { fields.push("youtube_id = ?"); args.push(data.youtubeId); }
  if (data.isTop !== undefined) { fields.push("is_top = ?"); args.push(data.isTop ? 1 : 0); }
  if (data.sortOrder !== undefined) { fields.push("sort_order = ?"); args.push(data.sortOrder); }
  if (data.status !== undefined) { fields.push("status = ?"); args.push(data.status); }
  if (fields.length === 0) return;
  args.push(id);
  await client.execute({
    sql: `UPDATE beats SET ${fields.join(", ")} WHERE id = ?`,
    args,
  });
  await client.close();
}

export async function deleteBeat(id: number) {
  if (!isDbConfigured()) throw new Error("DB not configured");
  const client = getClient();
  await client.execute({ sql: "DELETE FROM beats WHERE id = ?", args: [id] });
  await client.close();
}

export async function createWork(data: any) {
  if (!isDbConfigured()) throw new Error("DB not configured");
  const client = getClient();
  const result = await client.execute({
    sql: `INSERT INTO works (kind, youtube_id, cloudinary_id, title, meta, year, sort_order, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      data.kind, data.youtubeId ?? null, data.cloudinaryId ?? null,
      data.title, data.meta, data.year ?? "",
      data.sortOrder ?? 0, data.status ?? "draft",
    ],
  });
  await client.close();
  return result;
}

export async function updateWork(id: number, data: any) {
  if (!isDbConfigured()) throw new Error("DB not configured");
  const client = getClient();
  const fields: string[] = [];
  const args: any[] = [];
  if (data.kind !== undefined) { fields.push("kind = ?"); args.push(data.kind); }
  if (data.youtubeId !== undefined) { fields.push("youtube_id = ?"); args.push(data.youtubeId); }
  if (data.cloudinaryId !== undefined) { fields.push("cloudinary_id = ?"); args.push(data.cloudinaryId); }
  if (data.title !== undefined) { fields.push("title = ?"); args.push(data.title); }
  if (data.meta !== undefined) { fields.push("meta = ?"); args.push(data.meta); }
  if (data.year !== undefined) { fields.push("year = ?"); args.push(data.year); }
  if (data.sortOrder !== undefined) { fields.push("sort_order = ?"); args.push(data.sortOrder); }
  if (data.status !== undefined) { fields.push("status = ?"); args.push(data.status); }
  if (fields.length === 0) return;
  args.push(id);
  await client.execute({
    sql: `UPDATE works SET ${fields.join(", ")} WHERE id = ?`,
    args,
  });
  await client.close();
}

export async function deleteWork(id: number) {
  if (!isDbConfigured()) throw new Error("DB not configured");
  const client = getClient();
  await client.execute({ sql: "DELETE FROM works WHERE id = ?", args: [id] });
  await client.close();
}

export async function upsertContentOverride(key: string, value: unknown) {
  if (!isDbConfigured()) throw new Error("DB not configured");
  const client = getClient();
  await client.execute({
    sql: `INSERT INTO content_overrides (key, value) VALUES (?, ?)
          ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = (unixepoch() * 1000)`,
    args: [key, JSON.stringify(value)],
  });
  await client.close();
}