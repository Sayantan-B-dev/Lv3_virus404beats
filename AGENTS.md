<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# AI Project Engineering Standard

A compact, reusable engineering baseline for AI-assisted software projects.

## Files

- `CODE_CONVENTION.md` — main coding and architecture contract.
- `AGENTS.md` — concise instructions for AI coding agents.
- `ARCHITECTURE.md` — architecture defaults.
- `SECURITY.md` — security baseline.

## Change Tracking

After every successful change, session, or commit, append a track entry to `TRACK.md` in the following format:

| # | Time | Change |
|---|------|--------|
| 1 | 2026-08-23 18:20 | Agent helper restore |

- Use 24-hour format with date (YYYY-MM-DD HH:MM)
- Increment the serial number sequentially
- Keep the description concise (max 50 chars)
- Do not modify existing entries; always append new lines
- This is mandatory for all changes - bug fixes, features, config updates, dependency upgrades, etc.


<!-- END:nextjs-agent-rules -->
