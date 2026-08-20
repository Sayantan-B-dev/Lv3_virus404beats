# Reference Website — paulkalkbrenner.net

Folder = offline clone + design spec of `https://www.paulkalkbrenner.net/` (Webflow build).

- `reference_design.md` — HTML/CSS/JS/design system spec + universal copy-paste prompt (section 6)
- `strategy.md` — AI skills to install, Next.js stack policy, recreate workflow
- `PLAN.md` — original execution plan
- `index.html` + `assets/` — fully local mirror (all refs rewritten to `./assets/`)
- `screenshots/` — desktop.png + mobile.png renders
- `scrape.js` — reusable JS scraper (re-run: `node scrape.js`); `verify.js` — checks self-containment

Caveats: YouTube embeds, newsletter form, tracking pixels need network (inert offline). Barba transitions need multi-page.