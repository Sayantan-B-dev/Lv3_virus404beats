@AGENT.md
@DESIGN.md
@.docs/architecture.md
@.docs/content-guide.md
@.docs/motion.md
@.docs/theme-presets.md

# virus404beats

Single-page site for **virus404** (Kolkata music producer, beatmaker, mix/master engineer), inspired by the
paulkalkbrenner.net reference (`reference_website/`). Static Next.js 16 app — content-driven, themeable.

Key points:
- Content → `src/config/site.ts` (map in `form.md`), themes → `globals.css` + `src/config/theme.ts`, animation flags → `src/config/motion.ts`
- GSAP + Lenis for scroll, Framer Motion for menus; Space Grotesk font
- Never edit `reference_website/` / `general_info_virus404beats/` (read-only source material; ESLint-ignored)
- Keep `npm run build` + `npm run lint` green; verify visually before finishing
- Commit only at crucial checkpoints; never push

Full details in the referenced docs above.