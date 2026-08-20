@AGENT.md
@DESIGN.md
@.docs/architecture.md
@.docs/content-guide.md
@.docs/motion.md
@.docs/theme-presets.md

# virus404beats — session checklist for agents

1. **Before editing**: read `AGENT.md` + `DESIGN.md` + the relevant `.docs/` file.
2. **Content changes** go in `src/config/site.ts` (see `form.md` for the field map).
3. **Design/theme changes** go in `globals.css` palettes + `src/config/theme.ts` + `src/config/site.ts` (`sections[]` themes).
4. **Animation changes**: add a flag to `src/config/motion.ts`, register new GSAP plugins in `lib/gsap.ts`, respect `prefers-reduced-motion`.
5. **Never touch** `reference_website/`, `general_info_virus404beats/`.
6. **After any change**: `npm run lint` + `npm run build` green; visual verify via the Puppeteer shot script against the running dev server.
7. **Commits**: only at crucial checkpoints; never push. Write clear one-line messages matching repo history (e.g. "foundation: config layer, ui primitives, asset pipeline").
8. If a Next.js API behaves differently than expected, check `node_modules/next/dist/docs/` — this Next version has breaking changes vs training data.