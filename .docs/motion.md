# Motion Guide

Hybrid system: **GSAP** (ScrollTrigger, SplitText-style line masks, Lenis) for scroll choreography + **Framer Motion** (`motion` package) for menus/micro-interactions.

## Global switchboard — `src/config/motion.ts`

All effects are flags; every hook reads them AND `prefers-reduced-motion`:

| Flag | What it controls | Where |
|---|---|---|
| `smoothScroll` | Lenis smooth scrolling | `lib/lenis.tsx` provider in layout |
| `customCursor` | dot + bubble cursor (`CustomCursor`), hides native cursor | `ui/CustomCursor` |
| `noise` | animated grain (`NoiseOverlay`) | layout |
| `parallax` | scroll parallax on images/layers | `useParallax` (Hero, ParallaxBreak, GalleryStack, About portrait, Footer) |
| `pixelTransition` | pixelated dissolve layer on ParallaxBreak | `sections/ParallaxBreak` |
| `reveals` | masked line/title reveals on scroll | `useLineReveal`, `useTitleReveal`, `useReveal` |
| `odometers` | rolling number counters | `useOdometer` (About) |
| `soundToggle` | hero sound button + EQ bars | `ui/SoundToggle`, `ui/Equalizer` |
| `scrollProgress` | progress bar under nav | `ui/ScrollProgress` |

## Hooks (`lib/hooks.ts`)

- `useReveal` — fade/slide-up on enter (generic)
- `useLineReveal` / `useTitleReveal` — clip-path mask reveals for `.text-display`/headings; hero title lines use `data-title-line` + `clip-text` helpers from globals.css
- `useParallax(ref, speed)` — y-translate on scroll via ScrollTrigger scrub; speed = px per viewport shift
- `useOdometer` — number roll on enter
- `useImageCycle` — hero crossfade between `hero.images`
- `useMarquee` — infinite CSS-independent ticker (translate loop)
- `useCustomCursor` — lerped dot + bubble trailing
- `useFooterParallax` — footer lifts/parallax as it enters

## Conventions for new animations

1. New effect → add a flag to `motion.ts` first (default true unless heavy), default-respecting `prefers-reduced-motion`.
2. Register any new GSAP plugin in `lib/gsap.ts` (single shared client module — avoids duplicate bundles).
3. Scroll-triggered: prefer ScrollTrigger with `scrub: true` for parallax; `once: true` for reveals.
4. Keep JS-driven animation for scroll; Framer for hover/tap/overlays (menu, button states).
5. Test with flags off — site must be fully functional without any animation.