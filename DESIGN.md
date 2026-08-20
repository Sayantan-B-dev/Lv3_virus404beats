# virus404beats — Design System

Inspired by the paulkalkbrenner.net reference (see `reference_website/reference_design.md`), re-imagined as a config-driven, themeable system — **not** a pixel clone. All tokens are CSS custom properties; all content lives in `src/config/site.ts`.

## Themes

Four palettes in `src/app/globals.css`, switched via `data-theme` on `<html>` and overridden per-section via `data-section-theme` in `src/app/page.tsx`. Each defines:

- `--color-bg` (page background) · `--color-fg` (text) · `--color-muted` (secondary text)
- `--color-line` (borders) · `--color-accent` (highlight) · `--color-accent-soft` (tinted wash)

| Theme | bg | fg | accent |
|---|---|---|---|
| `lime` (default) | near-black | off-white | lime |
| `amber` | near-black | off-white | amber |
| `neon` | deep violet | white | pink/cyan |
| `blood` | deep red-black | off-white | red |

Set default in `src/config/theme.ts` (`DEFAULT_THEME`). Per-section: add `theme` to the section entry in `sections[]` in `src/config/site.ts`. Tailwind v4 maps these via `@theme inline` → utilities: `bg-bg`, `text-fg`, `text-muted`, `border-line`, `bg-accent`, `text-accent`, `bg-accent-soft`.

## Type scale (globals.css)

- `.text-display` — clamp(3.2rem → 12.5rem), -0.04em tracking — hero + section titles
- `.text-h-l` — clamp(2.4rem → 6rem) — section headings
- `.text-h-m` — clamp(1.6rem → 3rem) — card titles
- `.text-p-l` — clamp(1.1rem → 1.75rem) — ledes
- `.text-p-s` — clamp(0.95rem → 1.1rem) — body
- `.text-caps` — 0.75rem, 0.28em tracking, uppercase — kickers/labels
- `.btn-label` — 0.85rem, 0.2em tracking, uppercase — buttons

Typeface: **Space Grotesk** via `next/font/google` in `src/app/layout.tsx` (replaces the licensed ABC Diatype from the reference).

## Layout & feel

- Mono-spaced caps, oversized display type, hard black/off-white contrast, noise grain, hairline borders (`border-line`)
- Custom cursor (dot + trailing bubble) when `motion.customCursor` is on; native cursor hidden via `body.has-cursor`
- Grain overlay via `NoiseOverlay` (static noise PNG, animated with steps()) — config `motion.noise`
- Sections flow: Nav → Hero → GenreMarquee → ParallaxBreak → FeaturedReleases → Services → BeatsList → ParallaxBreak → GalleryStack → About → Contact → Footer

## Motion (src/config/motion.ts)

Every effect respects `prefers-reduced-motion` and its own toggle:

| Flag | Effect |
|---|---|
| `smoothScroll` | Lenis smooth scroll (ReactLenis provider in layout) |
| `customCursor` | dot + bubble cursor |
| `noise` | animated grain overlay |
| `parallax` | scroll-linked parallax (images, layers) |
| `pixelTransition` | pixelated dissolve on ParallaxBreak |
| `reveals` | GSAP line/title reveals (clip-path masks) |
| `odometers` | animated number counters in About |
| `soundToggle` | hero sound button + equalizer bars |
| `scrollProgress` | thin progress bar under the nav |

## Sections

| Section | Component | Notes |
|---|---|---|
| Nav | `sections/Nav` | fixed, logo + links + sound toggle; Framer Menu |
| Hero | `sections/Hero` | cycling images, masked title lines, CTA, sound demo |
| Genres | `sections/GenreMarquee` | infinite genre ticker |
| Break | `sections/ParallaxBreak` | full-bleed image, parallax + pixel dissolve |
| Featured | `sections/FeaturedReleases` | release cards w/ covers, credits, links |
| Services | `sections/Services` | price cards, CTA → WhatsApp |
| Beats | `sections/BeatsList` | numbered track list w/ hover link lines |
| Gallery | `sections/GalleryStack` | stacked image pile, GSAP stagger/drop |
| About | `sections/About` | portrait + bio + odometer counters + facts |
| Contact | `sections/Contact` | big CTA, WhatsApp/email, platforms strip |
| Footer | `sections/Footer` | blurb + link columns |

## Assets (`public/images/`)

Copied from the reference site by `scripts/copy-assets.mjs` with simplified names (hero-1..6, break-1/2, album-1..3, gallery-1..6, about, portrait, marquee-1..9, noise, noise-strip, og.png, platforms/*.svg). Keep filenames; edit the map in the script if the source changes. Own assets can replace these 1:1 without code changes.

## Accessibility & performance

- All motion hooks check `prefers-reduced-motion`
- Custom cursor / noise / smooth scroll degrade gracefully (flags off → still fully usable)
- Images: lazy `img` wrapper (`SmartImage`), `eager` for hero above-the-fold; avif
- Single static prerendered page; JSON-LD `MusicGroup` in layout metadata