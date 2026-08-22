#!/usr/bin/env node
// scripts/apply-migration.mjs — apply SQL migration to Turso (or local file)
import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sqlPath = join(__dirname, "..", "db", "migrations", "000_init.sql");
const sql = readFileSync(sqlPath, "utf-8");

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error("TURSO_DATABASE_URL not set. For local testing, use: file:./local.db");
  process.exit(1);
}

const client = createClient({ url, authToken });

async function apply() {
  console.log(`Applying migration to ${url}`);
  const statements = sql.split(";").map((s) => s.trim()).filter(Boolean);
  for (const stmt of statements) {
    try {
      await client.execute(stmt);
      console.log("  OK:", stmt.slice(0, 60) + "...");
    } catch (e) {
      console.error("  FAILED:", stmt.slice(0, 60) + "...");
      console.error(e);
      process.exit(1);
    }
  }
  console.log("Migration applied successfully.");
  await client.close();
}

apply();