// Motion engine config — flip feature flags / ease presets to restyle all motion.
// Animation style change = edit this file only, no component edits.

export const MOTION = {
  smoothScroll: true,
  customCursor: true,
  noise: true,
  parallax: true,
  pixelTransition: true,
  splitText: true,
  marquee: true,
  reveals: true,
  odometers: true,
  soundToggle: true,
  scrollProgress: true,
};

export const EASE = {
  reference: "power4.out",
  soft: "power2.out",
  spring: [0.22, 1, 0.36, 1] as const,
};

export const DUR = {
  fast: 0.5,
  base: 0.9,
  slow: 1.4,
};

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}