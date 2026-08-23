# AI AGENT RULES

Read `CODE_CONVENTION.md` before changing code.

Keep responses and plans concise. Do not consume context with unnecessary explanation.

For non-trivial work:
- inspect before editing;
- reuse existing patterns;
- plan briefly;
- make the smallest safe change;
- test what changed;
- report only verified results.

Never invent files, APIs, requirements, credentials, test results, or architecture.

Never weaken security or validation to make a feature pass.

Prefer simple, readable, modular code over clever or over-engineered solutions.

## Change Tracking Protocol

After every successful change, session, or commit, append a track entry to `TRACK.md` in the following format:

| # | Time | Change |
|---|------|--------|
| 1 | 2026-08-23 18:20 | Agent helper restore |

- Use 24-hour format with date (YYYY-MM-DD HH:MM)
- Increment the serial number sequentially
- Keep the description concise (max 50 chars)
- Do not modify existing entries; always append new lines
- This is mandatory for all changes - bug fixes, features, config updates, dependency upgrades, etc.
