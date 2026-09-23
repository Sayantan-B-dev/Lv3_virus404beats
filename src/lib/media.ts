// Central media registry. Prototype uses Picsum seeds plus one Cloudinary mp3.
// Later the admin panel swaps these values with Cloudinary production assets.
// Picsum must not ship as final production content (DESIGN.md section 20).

export const DEMO_AUDIO_URL =
  "https://res.cloudinary.com/dhw3ttwaz/video/upload/v1790181697/2026_zoz6ef.mp3";

export const media = {
  sideCover: "https://picsum.photos/seed/v404-side-final/600/600",
  heroPortrait: "https://picsum.photos/seed/v404-hero-final/1000/1400",
  releaseCover: "https://picsum.photos/seed/v404-release-final/800/800",
  vizBackdrop: "https://picsum.photos/seed/v404-viz-final/600/600",
  aboutPortrait: "https://picsum.photos/seed/v404-about-final/900/1200",
  work: [
    "https://picsum.photos/seed/v404-work-1-final/900/1200",
    "https://picsum.photos/seed/v404-work-2-final/800/800",
    "https://picsum.photos/seed/v404-work-3-final/800/800",
    "https://picsum.photos/seed/v404-work-4-final/800/800",
    "https://picsum.photos/seed/v404-work-5-final/800/800",
  ] as const,
} as const;
