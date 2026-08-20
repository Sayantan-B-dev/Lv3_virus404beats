# Plan: Clone paulkalkbrenner.net → reference_website

## Context
Site is a Webflow build. Real style lives in 2 CSS bundles (Webflow + `cdn.odyn.dev` "Odyn" engine) + ~15 JS files (GSAP 3.15, Lenis 1.3.23, Barba 2, Odyn bundle, jQuery). ~64 assets across 2 Webflow CDN buckets + BunnyCDN (mp3) + YouTube/embedly. All animation is driven by `data-*` attribute hooks. Node v22 available → zero-dep `fetch` scraper is enough.

## Steps
1. Write `reference_website/scrape.js` (Node, no npm deps)
   - `fetch` the homepage → save `index.html`
   - Regex-extract every asset URL (css, js, images incl. srcset, favicons, mp3, fonts from `@font-face` in CSS)
   - Download all into `reference_website/assets/` preserving original CDN paths (e.g. `assets/img/69bbf53c…/loader-1.avif`)
   - Rewrite all HTML/CSS/JS references to local relative paths; strip SRI `integrity`/`crossorigin` on self-hosted files; keep `data-*` hooks intact
   - Write `assets/manifest.json` (url → local path)
2. Screenshots (JS, Puppeteer-core using installed Edge → no Chromium download)
   - Run from temp dir; serve local mirror with a tiny Node http server; capture desktop + mobile full-page PNGs → `reference_website/screenshots/`
3. `reference_website/reference_design.md` — structure-based, token-efficient
   - Stack: Webflow output + GSAP(ScrollTrigger/SplitText/CustomEase/Inertia/Draggable/Observer/Flip) + Lenis + Barba + Odyn
   - HTML map: 12 sections in DOM order with class names + `data-*` hooks (hero/equalizer/sound, experience stagger, draggable marquee, parallax + pixelated transition, album tabs, tour reveal+hover-noise, dropping-stack gallery, video archive lightbox, odometers, newsletter marquee, footer parallax)
   - CSS system: type scale (`h-d/h-m/h-l`, `p-r/p-l/p-s`), helpers (`u-text-caps`, `u-color-dark-40`, `u--clip`), section themes (gray/green/dark/orange), grid (`container/row/col`, `data-col-span`), components (nav, buttons, marquee, tour table, spacer variants), texture/noise, responsive breakpoints
   - JS animation contract: condensed `data-*` hook table (the exact contract to replicate)
   - Design language: monochrome + accent themes, typography, motion principles (stagger, clip reveals, custom ease)
   - Next.js migration map: section → component mapping, where hooks belong
   - END: universal copy-paste prompt — standalone prompt to paste into any agent to regenerate this design/style
4. `reference_website/strategy.md`
   - AI skills to install: research skills.sh / skill marketplaces (find-skills) and list exact skill names + install commands for web-design cloning, Next.js, Tailwind, GSAP/Framer motion, design tokens
   - Stack policy: always Next.js (App Router) + Tailwind + GSAP + Lenis + Framer Motion; design tokens as CSS variables; no jQuery; section components
   - Recreate workflow: how to consume reference_design.md + assets to build the parent app
   - Token-efficiency rules for docs
5. Update `info.md` — pointer to the 3 docs (keep minimal)

## Output layout
```
reference_website/
├── scrape.js            (reusable JS scraper)
├── index.html           (mirror)
├── assets/  css/ js/ img/ fonts/ audio/ manifest.json
├── screenshots/         (desktop + mobile)
├── info.md
├── reference_design.md  (+ universal prompt at end)
└── strategy.md
```

## Caveats (documented, not bugs)
- YouTube embeds, Laylo/Turnstile form, FB pixel/GTM need network → stay stub/inert offline
- Barba page-transitions need multi-page → home page only, transitions inactive