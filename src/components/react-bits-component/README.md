# react-bits-component

Vendored React Bits components (DavidHDev/react-bits, MIT).
TS-CSS variants, adapted to the repo pure CSS rule.

- SplitText.tsx: text scatter entrance on scroll.
- TargetCursor.tsx: main cursor, red dot plus corner brackets.
- Magnet.tsx: magnetic pull on CTAs.
- GlitchText.tsx: RGB split glitch for 404 marks.

Rules for this folder:

- Never add new CSS files here. Styles belong in src/styles/react-bits.css.
- Keep the adaptation notes at the top of each file.
- Magnet keeps one inline transform under the documented vendored
  exception in docs/CODE_CONVENTION.md. Everything else is class based.
