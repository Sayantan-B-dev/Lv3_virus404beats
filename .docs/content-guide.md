# Content Guide

Every piece of visible content lives in `src/config/site.ts`. The questionnaire is `form.md` (root) — each answer maps to a field there.

## Where things appear

| Content | Config block | Rendered by |
|---|---|---|
| Brand name, tagline, SEO description, URL | `site` | layout metadata, Nav, Footer, OG |
| WhatsApp number, email, socials, platform links | `contact` | Nav, Hero CTA, Contact, Footer, platforms strip |
| Hero title lines, kicker, subtitle, CTAs, cycling images, sound demo | `hero` | Hero |
| Genre ticker words | `genres` | GenreMarquee |
| Streaming platform icons + links | `platforms` | Contact platforms strip |
| Release cards (year/title/credits/desc/links/covers) | `releases` | FeaturedReleases |
| Service cards (name/price/note/description/includes/CTA) | `services` | Services |
| Beat list rows (title/meta/year/link) | `beats` | BeatsList |
| Gallery images | `gallery.images` | GalleryStack |
| Bio, portrait, counters, facts | `about` | About |
| Nav links, footer blurb + columns | `nav`, `footer` | Nav, Footer |
| Section on/off + per-section theme | `sections[]` | page.tsx |

## Editing rules

1. Edit values in `src/config/site.ts` only. Components read config; nothing else changes.
2. `enabled: false` removes a section from the page (page.tsx filters).
3. Add `theme: "lime" | "amber" | "neon" | "blood"` to a section entry for a per-section palette.
4. Empty `href: ""` renders as a non-link item or is filled at runtime (CTA buttons fall back to WhatsApp via `whatsappHref()`).
5. Images: put files in `public/images/`, reference by bare filename (`"hero-1.avif"`). SmartImage prepends `/images/`.
6. Placeholder/`[TODO]` values in form.md must be replaced before launch: WhatsApp number, email, hero audio (`public/audio/track.mp3`), streaming links, Spotify/Amazon/Deezer/iTunes/Beatport/Tidal links.

## Images currently used

`hero-1..6.avif` · `break-1.avif`, `break-2.avif` · `album-1..3.avif` · `gallery-1..6.avif` · `about.avif` · `portrait.avif` · `marquee-1..9.avif` (GenreMarquee background set) · `noise.avif`, `noise-strip.avif` · `og.png` (OG image) · `platforms/*.svg` (8 logos).

Replace files 1:1 (keep names) to swap visuals without touching code.