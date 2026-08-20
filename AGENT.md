# AGENT.md — project instructions for AI agents

## What this project is

Single-page marketing site for **virus404** — a Kolkata-based music producer/beatmaker (rap, hip-hop, trap, mix & master). Static Next.js 16 app (App Router, TS, Tailwind v4, Turbopack), styled after the paulkalkbrenner.net reference (in `reference_website/`) — **inspired, not cloned**.

## Stack & key decisions (locked — do not change without asking)

- Next.js 16.3 + React 19 + Tailwind v4 (CSS-first, `@theme inline`) + TypeScript
- Motion: **GSAP** (ScrollTrigger) + **Lenis** for scroll; **Framer Motion** (`motion` pkg) for menus/micro
- Font: Space Grotesk (`next/font/google`). **Never copy ABC Diatype into the repo** (licensed font)
- Everything configurable: `src/config/site.ts` (content), `src/config/theme.ts` (4 palettes), `src/config/motion.ts` (animation flags)

## Read these before touching anything

- `form.md` — the questionnaire → config field map (what each value is for)
- `DESIGN.md` — design system, tokens, sections, motion flags
- `.docs/architecture.md` — structure, data flow, conventions
- `.docs/content-guide.md` — where content lives, editing rules
- `.docs/motion.md` — animation conventions
- `.docs/theme-presets.md` — palettes and how to switch

## Hard rules

1. **Edit `src/config/`, never hardcode content in components.**
2. **Never edit `reference_website/` or `general_info_virus404beats/`** — read-only source material. They are excluded from ESLint (`eslint.config.mjs`) — keep it that way.
3. **Do not push** to the git remote (`origin` = github.com/Sayantan-B-dev/Lv3_virus404beats). Commit only at crucial/checkpoint states.
4. Next.js 16 breaking changes: read `node_modules/next/dist/docs/` before writing Next-specific code.
5. New animations must respect `MOTION.*` flags and `prefers-reduced-motion`.
6. Keep `npm run build` and `npm run lint` green after any change.
7. No comments in code unless functional (e.g. eslint-disable).

## Commands

```bash
npm run dev      # dev server (Turbopack) — port 3000
npm run build    # production build (compiles + TS + prerender)
npm run lint     # ESLint
node scripts/copy-assets.mjs   # re-copy reference images → public/images
```

## Verification

- Build + lint must pass.
- Visual check: dev server running → screenshot script `C:\Users\Virus404\AppData\Local\Temp\opencode\pk-scrape\shot-next.mjs` (Puppeteer/Edge, scroll-through validates lazy images + console errors + failed requests). Output lands in `screenshots/` (gitignored).
- Note: VS Code may bind port 3000 (Simple Browser) — if `:3000` behaves oddly, verify with a different port.

## Content state

`src/config/site.ts` is prefilled from the artist's info; `[TODO]` values remain (WhatsApp number, email, hero audio `public/audio/track.mp3`, streaming links). See `form.md` §1–2 for the exact list.