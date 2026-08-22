import { defineConfig } from "drizzle-kit";

// Turso (libSQL) speaks the SQLite dialect. Works for local file: URLs too.
export default defineConfig({
  dialect: "sqlite",
  schema: "./db/schema.ts",
  out: "./db/migrations",
});
