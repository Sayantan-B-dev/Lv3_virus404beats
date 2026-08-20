// Theme presets — switch the whole site's palette here.
// Change THEME to "amber" | "neon" | "blood" to rebrand instantly.
// Palettes live in src/app/globals.css keyed by [data-theme=...].

export type ThemeKey = "lime" | "amber" | "neon" | "blood";

export interface ThemeMeta {
  label: string;
  accent: string;
  bg: string;
}

export const THEME: ThemeKey = "lime";

export const THEMES: Record<ThemeKey, ThemeMeta> = {
  lime: { label: "Mono + Lime", accent: "#a7ff9c", bg: "#0a0a0a" },
  amber: { label: "Dark + Amber", accent: "#ffb454", bg: "#0c0a07" },
  neon: { label: "Neon Cyber", accent: "#c08cff", bg: "#0a0710" },
  blood: { label: "Dark Red", accent: "#ff4b3e", bg: "#0d0707" },
};

export function applyTheme(key: ThemeKey = THEME) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = key;
}