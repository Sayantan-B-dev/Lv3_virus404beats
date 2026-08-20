# Strategy — AI Skills, Stack & Recreate Workflow

## 1. AI Skills to Install (from skills.sh)

CLI: `npx skills` — browse https://skills.sh/ . Install:

```bash
# Design + cloning (core for recreating reference designs)
npx skills add anthropics/skills@frontend-design -g -y
npx skills add vercel-labs/agent-skills@web-design-guidelines -g -y
npx skills add vercel-labs/agent-skills@vercel-react-best-practices -g -y
npx skills add vercel-labs/agent-skills@vercel-composition-patterns -g -y

# Motion / animation (Framer Motion + design engineering)
npx skills add emilkowalski/skills@emil-design-eng -g -y

# Design taste + image-to-code (high-end visual quality, reference cloning)
npx skills add leonxlnx/taste-skill@high-end-visual-design -g -y
npx skills add leonxlnx/taste-skill@design-taste-frontend -g -y
npx skills add leonxlnx/taste-skill@image-to-code -g -y
npx skills add leonxlnx/taste-skill@redesign-existing-projects -g -y

# UI system + quality
npx skills add shadcn/ui@shadcn -g -y
npx skills add pbakaus/impeccable -g -y

# Scraping (JS/TS-based site capture, alternative to scrape.js)
npx skills add scrapegraphai/just-scrape -g -y

# Planning + token efficiency
npx skills add obra/superpowers@writing-plans -g -y
npx skills add juliusbrussee/caveman@caveman -g -y
```

Verify: `npx skills check`. Update: `npx skills update`. List: `npx skills list` (or opencode skills dir).

## 2. Stack Policy (ALWAYS)
- **Next.js** (App Router, TypeScript, `src/app`) — no other framework
- **Tailwind CSS** — design tokens as CSS variables + `theme.extend` (colors, tracking, spacing)
- **GSAP 3.15** — ScrollTrigger, SplitText, CustomEase for scroll/stagger reveals
- **Lenis** — smooth scrolling
- **Framer Motion** — UI micro-interactions, hover, page transitions
- Custom cursor, section-based components, `data-*` hooks contract kept in JSX props
- No jQuery, no Webflow classes in production code (reference only)
- Fonts: variable sans, tight negative tracking, self-hosted woff2

## 3. Recreate Workflow
1. Copy `reference_design.md` + universal prompt (section 6) into the project prompt
2. Mirror `reference_website/assets/` → `public/` (images, fonts, noise textures)
3. Map sections → components (see reference_design.md §5), tokens → Tailwind config
4. Implement animation contract table (reference_design.md §4) one-to-one
5. Pixel-check against `screenshots/desktop.png` + `mobile.png`
6. Verify: `npm run lint`, `npm run build`, responsive at 1440/390

## 4. Token-Efficiency Rules (docs)
- Tables > prose; short headers; no repeated boilerplate
- Keep reference docs structure-based (this folder = canonical spec)
- One prompt per feature; never dump full docs into prompts — reference paths
- Re-scrape pattern: run `node scrape.js` when source site changes (JS, zero deps, no Python)

## 5. Folder Guide
- `reference_website/` — canonical design spec + offline clone (feed to agents, never edit by hand)
- `virus404beats/` (parent) — the actual Next.js app generated from this reference