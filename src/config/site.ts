// Single source of truth for ALL site content — edit here.
// Every field is mapped in form.md (root). Placeholders marked with TODO: fill in form.md

import type { ThemeKey } from "./theme";

export type SectionKey =
  | "hero"
  | "genres"
  | "featured"
  | "services"
  | "beats"
  | "gallery"
  | "about"
  | "contact";

export interface Link {
  label: string;
  href: string;
}

export const site = {
  name: "virus404",
  legalName: "Virus404",
  tagline: "Kolkata-based music producer, beatmaker & mix/master engineer",
  description:
    "Rap, hip-hop & trap beats from Kolkata. Original compositions, type beats, experimental hip-hop, mixing and mastering. Book a beat in 48 hours.",
  url: "https://virus404beats.vercel.app",
  locale: "en",
  genre: "Music",
};

export const contact = {
  whatsapp: "91XXXXXXXXXX", // TODO: fill your WhatsApp number in form.md
  whatsappMessage:
    "Hi virus404! I want to book a beat / mixing & mastering session.",
  email: "hello@virus404beats.com", // TODO: fill real email in form.md
  youtube: "https://youtube.com/@virus404beats",
  instagram: "https://instagram.com/virus404beats", // TODO: verify handle
  soundcloud: "", // TODO: add SoundCloud link if you have one
  soundbetter: "https://soundbetter.com/profiles/451361-virus404",
  spotify: "", // TODO: add Spotify artist link
};

export const hero = {
  title: ["VIRUS", "404"],
  kicker: "Music Producer / Beatmaker",
  subtitle:
    "Beats, production & mix/master for rap, trap, R&B, afrobeat and beyond. Original compositions from Kolkata — delivered in 48 hours.",
  ctaPrimary: { label: "Book a beat", href: "" }, // filled from whatsapp
  ctaSecondary: { label: "Listen on YouTube", href: contact.youtube },
  images: [
    "hero-1.avif",
    "hero-2.avif",
    "hero-3.avif",
    "hero-4.avif",
    "hero-5.avif",
    "hero-6.avif",
  ],
  sound: {
    enabled: true,
    label: "Time to move",
    src: "", // TODO: add your own audio file → public/audio/track.mp3
  },
};

export const genres = [
  "Hip-Hop",
  "Trap",
  "R&B / Soul",
  "Afrobeat",
  "Reggaeton",
  "EDM",
  "Chill",
];

export const platforms: { name: string; href: string; img: string }[] = [
  { name: "Spotify", href: contact.spotify, img: "platforms/spotify.svg" },
  { name: "YouTube Music", href: contact.youtube, img: "platforms/youtube-music.svg" },
  { name: "Amazon Music", href: "", img: "platforms/amazon-music.svg" }, // TODO: artist link
  { name: "Deezer", href: "", img: "platforms/deezer.svg" }, // TODO: artist link
  { name: "iTunes", href: "", img: "platforms/itunes.svg" }, // TODO: artist link
  { name: "Beatport", href: "", img: "platforms/beatport.svg" }, // TODO: artist link
  { name: "Apple Music", href: "", img: "platforms/apple-music.svg" }, // TODO: artist link
  { name: "Tidal", href: "", img: "platforms/tidal.svg" }, // TODO: artist link
];

export interface Release {
  year: string;
  title: string;
  cover: string;
  credits: string;
  description: string;
  links: Link[];
}

export const releases: Release[] = [
  {
    year: "2026",
    title: "ANTISOCIAL",
    cover: "album-1.avif",
    credits: "UNFILTERED AKASH, MISHI B & Virus404",
    description:
      "Latest single — rap, trap-flavoured production with a dark, minimal pocket.",
    links: [
      { label: "Stream", href: "" }, // TODO: add streaming link
      { label: "YouTube", href: "https://youtube.com/@virus404beats" },
    ],
  },
  {
    year: "2023",
    title: "REAL DEAL",
    cover: "album-2.avif",
    credits: "YxvngSha_dre & Virus404",
    description:
      "Hip-hop collaboration release. Original production, hard-knocking drums.",
    links: [
      { label: "Stream", href: "" }, // TODO: add streaming link
      { label: "YouTube", href: "https://youtube.com/@virus404beats" },
    ],
  },
  {
    year: "2023",
    title: "09:22 / PAISA, NASHA, FAME",
    cover: "album-3.avif",
    credits: "YxvngSha_dre, Virus404, tobehoyejak",
    description:
      "Earlier catalog: street-level storytelling over experimental trap textures.",
    links: [
      { label: "Stream", href: "" }, // TODO: add streaming link
      { label: "YouTube", href: "https://youtube.com/@virus404beats" },
    ],
  },
];

export interface Service {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  includes: string[];
  cta: Link;
}

export const services: Service[] = [
  {
    name: "Beat Production",
    price: "₹999 – ₹1,999",
    priceNote: "based on difficulty",
    description:
      "Original compositions, type beats & experimental hip-hop. Custom drums, no default loops unless you ask for them.",
    includes: [
      "Original composition",
      "Type beats & custom beats",
      "Stems + tagged/un-tagged mp3/wav",
      "48-hour turnaround",
    ],
    cta: { label: "Book a beat", href: "" }, // filled from whatsapp
  },
  {
    name: "Mixing & Mastering",
    price: "₹499 – ₹799",
    priceNote: "per track, based on difficulty",
    description:
      "Radio-ready mixdowns and masters for rap vocals, instrumentals and full records.",
    includes: [
      "Vocal mixing",
      "Full-track mastering",
      "Reference matching",
      "Revision passes",
    ],
    cta: { label: "Get a mix", href: "" }, // filled from whatsapp
  },
];

export interface Beat {
  title: string;
  meta: string;
  year: string;
  href: string;
}

export const beats: Beat[] = [
  { title: "ANTISOCIAL", meta: "Single · UNFILTERED AKASH, MISHI B & Virus404", year: "2026", href: "" },
  { title: "NO CAP", meta: "Dead V feat. M Zee Cubist & Virus404", year: "2024", href: "" },
  { title: "REAL DEAL", meta: "YxvngSha_dre & Virus404", year: "2023", href: "" },
  { title: "09:22", meta: "YxvngSha_dre, Virus404 & tobehoyejak", year: "2023", href: "" },
  { title: "PAISA, NASHA, FAME", meta: "YxvngSha_dre feat. Virus404", year: "2023", href: "" },
  { title: "BLOODINK tracks", meta: "Various — featuring Virus404", year: "2022", href: "" },
  { title: "INFINITY", meta: "Mix & Master · SBVIEW & X Rhymer", year: "2024", href: "" },
];

export const gallery = {
  images: [
    "gallery-1.avif",
    "gallery-2.avif",
    "gallery-3.avif",
    "gallery-4.avif",
    "gallery-5.avif",
    "gallery-6.avif",
  ],
};

export const about = {
  kicker: "The producer",
  title: ["LIFE", "WORKS"],
  portrait: "about.avif",
  bio: [
    "virus404 is an independent music producer and beatmaker from Kolkata, West Bengal, India — primarily rap, hip-hop and trap, but at home across R&B, afrobeat, reggaeton, EDM and chill.",
    "Original compositions first: custom drum kits, hand-built arrangements, and no default loops unless the artist asks for them. The service runs from beat production to full mix & master, with a 48-hour turnaround on most projects.",
  ],
  counters: [
    { value: 100, suffix: "+", label: "Projects" },
    { value: 7, suffix: "", label: "Genres" },
    { value: 48, suffix: "h", label: "Turnaround" },
  ],
  facts: [
    "Original beatmaking",
    "Mix & master engineer",
    "Released collabs since 2022",
    "100s of individual projects",
  ],
};

export const nav = {
  links: [
    { label: "Beats", href: "#featured" },
    { label: "Services", href: "#services" },
    { label: "Recent", href: "#beats" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};

export const footer = {
  blurb: "Beats, production & mix/master. Made in Kolkata.",
  columns: [
    {
      title: "Links",
      links: [
        { label: "Beats", href: "#featured" },
        { label: "Services", href: "#services" },
        { label: "Gallery", href: "#gallery" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Follow",
      links: [
        { label: "YouTube", href: contact.youtube },
        { label: "Instagram", href: contact.instagram },
        { label: "SoundBetter", href: contact.soundbetter },
        { label: "Website", href: "https://virus404beats.vercel.app" },
      ],
    },
  ],
};

export const sections: { key: SectionKey; enabled: boolean; theme?: ThemeKey }[] = [
  { key: "hero", enabled: true },
  { key: "genres", enabled: true },
  { key: "featured", enabled: true, theme: "lime" },
  { key: "services", enabled: true },
  { key: "beats", enabled: true, theme: "lime" },
  { key: "gallery", enabled: true },
  { key: "about", enabled: true },
  { key: "contact", enabled: true, theme: "amber" },
];

export function whatsappHref(message: string) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}