@AGENT.md
@DESIGN.md
@.docs/architecture.md
@.docs/content-guide.md
@.docs/motion.md
@.docs/theme-presets.md

# virus404beats

Single-page site for **virus404** — Kolkata-based music producer, beatmaker & mix/master engineer.
Inspired by the paulkalkbrenner.net reference (see `reference_website/`), built as a config-driven,
themeable Next.js app. Static, no backend.

## Stack

- Next.js 16 (App Router, Turbopack, TypeScript), Tailwind CSS v4
- GSAP + ScrollTrigger + Lenis (scroll choreography), Framer Motion (`motion`) for menus/micro
- Space Grotesk via `next/font/google`
- All content: `src/config/site.ts` · themes: `src/config/theme.ts` · animation flags: `src/config/motion.ts`

## Commands

```bash
npm run dev        # dev server (Turbopack) — http://localhost:3000
npm run build      # production build
npm run lint       # ESLint (ignores vendored reference_website/ JS)
node scripts/copy-assets.mjs   # re-copy images from reference_website → public/images
```

## Docs

- `form.md` — questionnaire → config field map; **[TODO]** values to fill before launch
- `DESIGN.md` — design system, sections, motion
- `.docs/` — architecture, content guide, motion guide, theme presets
- `AGENT.md` / `.agent/instructions.md` — rules for AI agents (and humans) working here

## Content state

Prefilled from the artist's real info (releases, services, pricing, bio). Remaining **[TODO]**: WhatsApp number,
email, hero audio demo (`public/audio/track.mp3`), streaming links (Spotify/Amazon/Deezer/iTunes/Beatport/Tidal).

## Git

Remote: `origin` → github.com/Sayantan-B-dev/Lv3_virus404beats. **Never push without explicit request**;
commit only at crucial checkpoints.