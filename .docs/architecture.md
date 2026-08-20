# Architecture

Next.js 16 (App Router, Turbopack, TypeScript, Tailwind v4). Static single-page site.

```
src/
  app/
    layout.tsx        Space Grotesk font, metadata, OG, JSON-LD (MusicGroup), LenisProvider
    page.tsx          section loop from config + hardcoded ParallaxBreak dividers
    globals.css       theme palettes (@theme inline), type scale, effects
  config/             ← edit here, not in components
    site.ts           ALL content (contact, hero, releases, services, beats, about, nav, footer, sections[])
    theme.ts          ThemeKey type + DEFAULT_THEME
    motion.ts         every animation flag
  lib/
    utils.ts          cn()
    gsap.ts           GSAP plugin registration (single client bundle)
    lenis.tsx         ReactLenis root provider (autoRaf)
    hooks.ts          useReveal, useLineReveal, useTitleReveal, useParallax,
                      useOdometer, useImageCycle, useMarquee, useCustomCursor, useFooterParallax
  components/
    ui/               SmartImage, CustomCursor, NoiseOverlay, Button, Marquee, Odometer,
                      ParallaxImage, SectionHeading, ScrollProgress, Equalizer, SoundToggle, ThemeInit
    sections/         Nav, Hero, GenreMarquee, ParallaxBreak, FeaturedReleases, Services,
                      BeatsList, GalleryStack, About, Contact, Footer
public/
  images/             hero-*, break-*, album-*, gallery-*, about, portrait, marquee-*, noise,
                      og.png, platforms/*.svg (copied by scripts/copy-assets.mjs)
  audio/              track.mp3 — TODO (hero sound demo)
  favicon.svg         V monogram
scripts/
  copy-assets.mjs     reference → public/images rename map
```

## Data flow

- `src/config/site.ts` exports plain typed objects. `page.tsx` maps `sections[]` → components.
- `contact.whatsapp` + a message build `wa.me` links via `whatsappHref()` (used by Hero/CTA/Contact).
- Theme per section: wrapper `<div data-section-theme="lime">` cascades CSS vars; `ThemeInit` sets `data-theme` on `<html>` on load (prefers localStorage, falls back to `DEFAULT_THEME`).

## Rendering

- Everything is a server component except client widgets (marked `"use client"`): Nav, Hero internals, marquees, cursor, sound, odometers, counters.
- Single route `/` prerendered statically. `_not-found` also static.
- No data fetching, no API routes, no `next/image` (deliberate: full-bleed avif + pixel effect via raw `img`; SmartImage handles lazy/eager).
- Fonts: `next/font/google` Space Grotesk — self-hosted at build.

## Build / lint

- `npm run build` — must stay green (compiles + TS + prerender).
- `npm run lint` — ESLint config in `eslint.config.mjs` **ignores** `reference_website/**`, `general_info_virus404beats/**`, `public/**` (vendored third-party JS was being linted → thousands of false positives).
- Verification: dev server + Puppeteer screenshot script (`C:\Users\Virus404\AppData\Local\Temp\opencode\pk-scrape\shot-next.mjs`) against `localhost:3000`; scroll-through validates lazy images.

## Conventions

- Config in `src/config/`, never hardcode content in components.
- New section: add component + config entry + optional theme override; register in `sectionMap` (page.tsx).
- Respect `MOTION.*` flags in any new animation; check `prefers-reduced-motion`.
- `reference_website/` and `general_info_virus404beats/` are read-only source material — never edit.
- Fonts: keep license; do not copy ABC Diatype into the repo.