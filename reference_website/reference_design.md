# Reference Design — Paul Kalkbrenner (paulkalkbrenner.net)

## Source
- Live site: https://www.paulkalkbrenner.net/ (Webflow build, July 2026)
- Local mirror: `index.html` + `assets/` (fully offline, all URLs rewritten to `./assets/…`)
- Stack: Webflow output + GSAP 3.15 (ScrollTrigger/SplitText/CustomEase/Inertia/Draggable/Observer/Flip) + Lenis 1.3.23 (smooth scroll) + Barba 2 (page transitions) + Odyn engine (`assets/js/bundle.js` + `assets/css/bundle.css`) + jQuery 3.5
- Animations are 100% driven by `data-*` hooks in HTML → Odyn bundle reads them. Recreate = keep the hooks.
- Screenshots: `screenshots/desktop.png`, `screenshots/mobile.png`

## 1. Design Language
- Font: **ABC Diatype Plus Variable** (`assets/fonts/…ABCDiatypePlusVariable.ttf`, weight 100–700, `font-display: swap`)
- Colors: dark `#000`, light `#fff`, gray `#c5c5c5`, green `#a7ff9c`, orange `#ff6831`, yellow `#fc0`, brown `#bc8556`; dark tints `#000` @ 20/30/40% opacity (`--color--dark-20/30/40`)
- Palette usage: monochrome base, one accent per section (green=tour, orange=newsletter, gray=recordings/gallery, dark=archive)
- Texture: `.noise` / `.tour-dates__item-noise` animated grain overlays (avif noise images)
- Motion principles: stagger reveals (SplitText words/lines), clip-path image reveals, custom ease curves, image cycling, marquees, odometer counters, custom cursor with contextual label ("play")

## 2. HTML Structure (12 sections, DOM order)
Global (outside `main`): `div.global` (odyn css embed) → `nav.nav[data-nav-status]` → `div.cursor[data-cursor]`
`main.main[data-barba="container" data-barba-namespace="home"]`:

1. **Hero** `section[data-home-hero]` — `h1.h-d` two lines `span[data-h1].h-d__span` ("Paul"/"Kalkbrenner") + `span[data-img-wrap data-image-cycle="1"]` cycling 6 `img.home-hero__img`; bottom row: equalizer `div[data-equalizer]` 8× `div[data-equalizer-bar].eq__bar`, sound label `#heroSoundFlash`, intro `.home-hero__p`, sound toggle `button[data-sound-toggle="…mp3"]` with `span[data-button-text]` "Sound OFF/ON"
2. **Experience** `section.u--rel` — `div[data-experience-wrap].exp-wrap`: 10 `div[data-experience-col].exp-lines__col` (01–09) + 4 `div[data-experience-text-row].exp-content__row` → words "Experience the Pulse of Electronic Music" in `h2.h-d` with dot markers
3. **Platforms marquee** `div[data-draggable-marquee-init data-direction="left" data-duration="80" data-multiplier="35" data-sensitivity="0.01"].draggable-marquee` — 8 streaming logos (Spotify, YT Music, Amazon, Deezer, iTunes, Beatport, Apple, Tidal) — GSAP Draggable
4. **Media break 1** `section.media` — `div[data-parallax="trigger" data-parallax-start="-12" data-parallax-end="8"].media-inner > img.img` + `div[data-pixelated-scroll-transition data-columns="25" data-rows="4" data-theme="gray"]`
5. **Featured recordings** `section[data-section-theme="gray" data-featured-albums]` — section-top (square + `h3.u-text-caps` + intro), year tabs (2025/2018/2015, `a[data-trigger="the-essence|partsoflife|7"]`), visual list `div[data-visual-item].album-feature__visual-item` (bg img + noise + center), info list `div[data-info-item]` (`h4.h-m` title, desc, 2 `a.button`)
6. **Tour dates** `section.tour-dates[data-section-theme="green"]` — portrait img (ratio-1-1, `mix-blend-mode:multiply`, parallax), table header Date/Venue/City, `ul[data-reveal-group data-stagger="35" data-distance="150%"].tour-dates__list` → `li[data-hover].tour-dates__item` (row bg `div[data-noise-wrap]`, time/venue/city, "tickets" `u--clip` button) — 11 rows
7. **Media break 2** `section.media` (same as 4)
8. **Gallery** `section.u--clip[data-section-theme="gray"]` — `div[data-dropping-stack-init].dropping-stack`: 8 `div[data-dropping-stack-item]` (cover avif), controls `data-dropping-stack-prev/next` + odometer count `data-odometer-element` 01/08
9. **Video archive** `section[data-section-theme="dark"]` — grid count `h-d.is--archive__count` (odometer), 8 `div[data-archive-visual]` each with `div[data-mini-showreel-lightbox]` + `button[data-archive-preview data-mini-showreel-player/open][data-cursor-text="play"]` (YouTube thumb + iframe), credits `div[data-archive-info]`, strip `button[data-archive-trigger]` with duration `span.p-s` (02:54–05:36)
10. **Life works** `section.media` — `section-overlay`: "life WORKS" heading + bio, parallax img (ratio-1-2-1), odometer group `data-odometer-group` (`data-odometer-start="2000" data-odometer-end="2026"`)
11. **Newsletter** `section.newsletter[data-section-theme="orange"]` — `div[data-marquee-duplicate="2" data-marquee-direction="right" data-marquee-speed="25" data-marquee-scroll-speed="10"].marquee-auto` (9 image strip), form `data-laylo-form` (email/phone fields, `data-form-trigger` button, `w-form-done/fail`)
12. **Footer** `footer.footer[data-footer-parallax]` — `div[data-footer-parallax-inner].footer-wrap`: 3 link columns (`a[data-indent-link].text-link`), copyright `span[data-current-year]`, `div[data-spin]` logo (infinite rotation); `div[data-footer-parallax-dark].footer-overlay`

## 3. CSS System (assets/css/paul-kalkbrenner-staging.shared.9547378de.css + bundle.css)
- **Variables** (`:root` + theme): `--color--dark:#000 --color--light:white --color--gray:#c5c5c5 --color--green:#a7ff9c --color--orange:#ff6831 --color--yellow:#fc0 --color--brown:#bc8556`; tints `--color--dark-20/30/40`; space scale `--space-xs…xxxl`; `--gap-xxs…xl --gap-ml`; layout `--page-pad:.625em --col-pad:var(--gap-ml) --cta-height:11.25em`; grid `--exp-grid-row/col/dot`
- **Type scale** (ABC Diatype Plus Variable, all `-0.02em…-0.05em` tight tracking):
  | class | size | lh | use |
  |---|---|---|---|
  | `.h-d` | 12.5em | .8 | display headlines (hero, archive count) |
  | `.h-l` | 3em | .9 | big labels |
  | `.h-m` | 1.5em | .9 | album titles |
  | `.p-r` | 1em | 1.5 | body |
  | `.p-l` | 1.125em | – | lead/labels |
  | `.p-s` | .875em | – | small (durations, meta) |
- **Helpers**: `u-text-caps` (uppercase), `u-color-dark-40`, `u--clip` (overflow hidden), `u--rel` (relative)
- **Layout**: `.container` (page-pad gutters), `.row`/`.col` (col-pad grid, flex), `u-col-2`, Webflow variant attrs `data-col-span`, `data-sm` (responsive cols), `.spacer` variants (250/32 etc. via `data-wf--spacer--variant`)
- **Components**: `.nav` fixed top z100 (logo SVG + 8 links `.nav-link` with `.nav-link__underline` hover, `[data-menu-toggle]` burger, `.nav-list__bg`); `.button` full-width `height:var(--cta-height)` bordered, label swap on hover (`[data-button][data-button-text]`); `.cursor-bubble` 3.625em dark circle w/ uppercase label; `.eq__bar` 0.1875em dark bars (scaleY origin bottom); `.tour-dates__item` border-bottom currentColor; `.footer` parallax overlay
- **Section themes** via `[data-section-theme="gray|green|dark|orange"]` → background/accent swap
- **Breakpoints**: Webflow default (mobile-first); key behavior changes: hero image cycle columns, dropping-stack, marquee count via `data-columns-mobile="6"` etc.

## 4. JS Animation Contract (data-* hooks → reimplement in GSAP/Framer)
| hook | effect |
|---|---|
| `data-h1` | SplitText word reveal (lines of "Paul Kalkbrenner") |
| `data-image-cycle` / `-item` | hero bg image crossfade cycle |
| `data-equalizer` / `-bar` | EQ bars scaleY loop |
| `data-sound-toggle` | toggle mp3 play + `#heroSoundFlash` label |
| `data-experience-col/text-row` | scroll-staggered column & word reveal |
| `data-draggable-marquee-init` (+direction/duration/multiplier/sensitivity) | GSAP Draggable infinite marquee |
| `data-parallax` (+start/end) | ScrollTrigger image parallax |
| `data-pixelated-scroll-transition` | pixel-dissolve between media sections |
| `data-trigger` + `data-visual-item`/`data-info-item` | album year-tab switcher |
| `data-reveal-group` (+stagger/distance) | list stagger reveal on scroll |
| `data-hover` + `data-noise-wrap`/`data-noise-move` | row hover noise overlay |
| `data-dropping-stack-init/item/prev/next` | vertical stack slider + odometer count |
| `data-odometer-element/group/start/end` | number counter 01/08, 2000→2026 |
| `data-mini-showreel-lightbox/open/player` | YouTube lightbox |
| `data-cursor` / `data-cursor-text` / `data-cursor-hover` | custom cursor + label swap |
| `data-marquee-*` | auto-scrolling image marquee (duplicated) |
| `data-footer-parallax(-inner/-dark)` | footer parallax lift + dark overlay |
| `data-spin` | infinite logo rotation |
| `data-button` / `data-button-text` | hover label swap (clip) |
| `data-nav-status` / `data-menu-toggle` | mobile menu state |

## 5. Next.js Migration Map
| webflow section | Next component |
|---|---|
| global/nav/cursor | `Nav`, `CustomCursor`, `SoundProvider` |
| hero | `Hero` (SplitText + image cycle + EQ + sound toggle) |
| experience | `ExperienceMarquee` (scroll words) |
| platforms | `PlatformMarquee` (draggable) |
| media breaks | `ParallaxMedia` + `PixelTransition` |
| recordings | `Albums` (tabs) |
| tour | `TourDates` (stagger + hover noise) |
| gallery | `DroppingStack` |
| archive | `VideoArchive` (odometer + lightbox) |
| life works | `About` (odometer) |
| newsletter | `Newsletter` (marquee + form) |
| footer | `Footer` (parallax + spin logo) |
Cross-cutting: `useLenis` provider, `useGsap` (ScrollTrigger/SplitText), `data-theme` per section via props, CSS vars as Tailwind `theme.extend.colors/letterSpacing`.

## 6. Universal Copy-Paste Prompt (use for any project)
```
Build a [choose: full marketing / artist / portfolio] website matching the design & animation system of this reference:
REFERENCE: local folder reference_website/ (index.html + assets/ = offline clone of paulkalkbrenner.net) + reference_design.md
STACK: Always Next.js (App Router, TS, src/app), Tailwind CSS, GSAP 3.15 (ScrollTrigger, SplitText, CustomEase) + Lenis smooth scroll + Framer Motion for UI micro-interactions. No jQuery. Fonts: use ABC Diatype Plus Variable style (variable, 100–700, tight -0.02em tracking) — fallback: install an equivalent variable sans on Google Fonts.
DESIGN SYSTEM (must match):
- Monochrome (#000/#fff) + accent-per-section themes: green #a7ff9c, orange #ff6831, yellow #fc0, gray #c5c5c5; 20/30/40% dark tints
- Type scale: display 12.5em lh .8 ls -.05em; h-l 3em; h-m 1.5em; p-l 1.125em; p-r 1em; p-s .875em; uppercase caps helper
- Noise/grain texture overlays on images; animated on hover
- Grid: container with .625em page padding, row/col with col-pad gutters, per-section responsive col spans
SECTIONS (in order): nav (fixed, logo + underline links + burger), hero (split-text reveal of 2-line display title, cycling bg image, audio equalizer bars, play/pause sound toggle), scroll-staggered word section, draggable logo marquee, parallax image break with pixelated dissolve transition, tabbed featured-items (year tabs → visual + info), list section with staggered scroll reveal + row hover noise, vertical dropping-stack slider with odometer counter, dark video archive grid with custom-cursor "play" label + lightbox, about with odometer (2000→2026), newsletter with auto marquee + form, footer with parallax dark overlay + spinning logo
ANIMATIONS: all scroll-driven via ScrollTrigger; SplitText stagger reveals; custom ease; Lenis smooth scroll; custom cursor with contextual label; odometer counters; image cycles; marquees
DELIVERABLES: full working Next.js app in this repo (parent of reference_website), sections as components, design tokens as CSS vars/Tailwind config, responsive (mobile-first, hero/big-display scale down), pixel-matched to screenshots/desktop.png + mobile.png. Content = my own placeholder copy. Do not copy brand assets; recreate structure/style only.
```