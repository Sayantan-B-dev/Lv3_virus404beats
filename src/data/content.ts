import { DEMO_AUDIO_URL, media } from "@/lib/media";
import type {
  Project,
  Release,
  Service,
  SocialLink,
  Track,
} from "@/types/content";

export const NAV_ITEMS = [
  { href: "#home", label: "HOME" },
  { href: "#work", label: "WORK" },
  { href: "#releases", label: "RELEASES" },
  { href: "#about", label: "ABOUT" },
  { href: "#services", label: "SERVICES" },
  { href: "#contact", label: "CONTACT" },
] as const;

const tracks: Track[] = [
  { id: "t1", slug: "intro-wake-up", position: "01", title: "INTRO (WAKE UP)", plays: "1.2M", duration: "01:24", audioUrl: DEMO_AUDIO_URL, active: false, status: "published" },
  { id: "t2", slug: "shadow-realm", position: "02", title: "SHADOW REALM", plays: "2.7M", duration: "02:48", audioUrl: DEMO_AUDIO_URL, active: true, status: "published" },
  { id: "t3", slug: "system-failure", position: "03", title: "SYSTEM FAILURE", plays: "1.8M", duration: "02:33", audioUrl: DEMO_AUDIO_URL, active: false, status: "published" },
  { id: "t4", slug: "lost-signal", position: "04", title: "LOST SIGNAL", plays: "1.1M", duration: "02:10", audioUrl: DEMO_AUDIO_URL, active: false, status: "published" },
  { id: "t5", slug: "404-freestyle", position: "05", title: "404 FREESTYLE", plays: "3.2M", duration: "02:59", audioUrl: DEMO_AUDIO_URL, active: false, status: "published" },
];

const release: Release = {
  id: "r1",
  slug: "dark-alignment",
  type: "ALBUM",
  title: "DARK ALIGNMENT",
  meta: "12 TRACKS - 2024",
  description: "A sonic journey through shadows, chaos and clarity. No rules. Just vibe.",
  coverUrl: media.releaseCover,
  status: "published",
};

const projects: Project[] = [
  { id: "p1", slug: "no-signal", index: "01 / 05", category: "FEATURED PROJECT", title: "NO SIGNAL", detail: "PRODUCTION - ARRANGEMENT - MIXING", coverUrl: media.work[0], rotation: "-.35deg", featured: true, status: "published" },
  { id: "p2", slug: "after-dark", index: "02 / 05", category: "COLLAB", title: "AFTER DARK", detail: "BEAT PRODUCTION", coverUrl: media.work[1], rotation: ".55deg", featured: false, status: "published" },
  { id: "p3", slug: "swovab", index: "03 / 05", category: "ENGINEERING", title: "SWOVAB", detail: "EDITING - MIXING - MASTERING", coverUrl: media.work[2], rotation: "-.7deg", featured: false, status: "published" },
  { id: "p4", slug: "raw-cut", index: "04 / 05", category: "BEAT", title: "RAW CUT", detail: "DRILL - TRAP - SAMPLE", coverUrl: media.work[3], rotation: ".4deg", featured: false, status: "published" },
  { id: "p5", slug: "404-mode", index: "05 / 05", category: "RECENT", title: "404 MODE", detail: "EXPERIMENTAL PRODUCTION", coverUrl: media.work[4], rotation: "-.5deg", featured: false, status: "published" },
];

const services: Service[] = [
  { id: "s1", slug: "production", position: "01", title: "PRODUCTION", description: "Original beats, arrangements, instrumentals and artist-focused production.", status: "published" },
  { id: "s2", slug: "mixing", position: "02", title: "MIXING", description: "Clean, punchy and intentional mixes built for the final listening environment.", status: "published" },
  { id: "s3", slug: "editing", position: "03", title: "EDITING", description: "Vocal edits, timing, arrangement cleanup and detailed project preparation.", status: "published" },
  { id: "s4", slug: "engineering", position: "04", title: "ENGINEERING", description: "Remote audio engineering and project support from rough idea to finished work.", status: "published" },
];

const socials: SocialLink[] = [
  { id: "soc1", platform: "EMAIL", label: "HELLO@VIRUS404BEATS.COM", url: "mailto:hello@virus404beats.com" },
  { id: "soc2", platform: "WHATSAPP", label: "+91 86175 63200", url: "https://wa.me/918617563200" },
  { id: "soc3", platform: "INSTAGRAM", label: "@VIRUS404BEATS", url: "https://www.instagram.com/virus404beats/" },
  { id: "soc4", platform: "YOUTUBE", label: "@VIRUS404BEATS", url: "https://www.youtube.com/@Virus404beats" },
  { id: "soc5", platform: "LOCATION", label: "WEST BENGAL / REMOTE", url: "#contact" },
];

export const GENRES = ["TRAP", "HIP HOP", "DRILL", "RNB", "AMBIENT", "EXPERIMENTAL"] as const;

export const TRUSTED_PLATFORMS = ["DISTROKID", "TUNECORE", "SOUNDCLOUD", "AUDIOMACK", "SPOTIFY"] as const;

export function getPublishedTracks(): Track[] {
  return tracks.filter((t) => t.status === "published");
}

export function getActiveTrack(): Track {
  return tracks.find((t) => t.active) ?? tracks[0];
}

export function getPublishedRelease(): Release {
  return release;
}

export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.status === "published");
}

export function getPublishedServices(): Service[] {
  return services.filter((s) => s.status === "published");
}

export function getSocialLinks(): SocialLink[] {
  return socials;
}
