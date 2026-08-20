# Theme Presets

Palettes live in `src/app/globals.css` under `[data-theme]` selectors (html-level default, per-section via `data-section-theme` on wrapper divs). Tailwind v4 `@theme inline` maps each `--color-*` to utilities: `bg-bg`, `text-fg`, `text-muted`, `border-line`, `bg-accent`, `text-accent`, `bg-accent-soft`.

## lime (default)

```
--color-bg:          #0b0b09   near-black (warm)
--color-fg:          #f4f1ea   off-white
--color-muted:       #8a877c   warm gray
--color-line:        #2a2a24   hairline border
--color-accent:      #b8f135   lime
--color-accent-soft: #1d260b   lime-tinted wash
```

## amber

```
--color-bg:          #0d0b08
--color-fg:          #f7f1e6
--color-muted:       #8f8878
--color-line:        #2c2820
--color-accent:      #f5a623
--color-accent-soft: #261b09
```

## neon

```
--color-bg:          #0a0812   deep violet
--color-fg:          #f5f2ff
--color-muted:       #8f86b0
--color-line:        #262140
--color-accent:      #ff5bd0   pink
--color-accent-soft: #2b0f2e
```

## blood

```
--color-bg:          #0c0606   red-black
--color-fg:          #f6ecea
--color-muted:       #8f7a76
--color-line:        #2c1412
--color-accent:      #e23d2b
--color-accent-soft: #2a0f0b
```

## Switching

- Default: `DEFAULT_THEME` in `src/config/theme.ts`
- Per section: `theme` field in `sections[]` (`src/config/site.ts`) → e.g. contact is `amber`
- Runtime: `ThemeInit` persists choice in localStorage (`data-theme` on `<html>`)
- Add a theme: new `[data-theme="name"]` block in globals.css + key in `ThemeKey` — everything else follows automatically

## Notes

- All palettes keep the same *roles* (bg/fg/muted/line/accent/accent-soft) so components never reference raw colors.
- `--color-accent` is used for: text highlights, hover link lines, button fills, cursor bubble, progress bar, marquee accents.
- Accent usage is ~5–10% of any screen; the look stays monochrome + one accent per section.