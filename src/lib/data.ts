// src/lib/data.ts — unified data layer: site.ts defaults + DB overrides (ISR 60s)
import "server-only";
import { getBeats, getWorks, getContentOverrides } from "@/lib/db";
import * as site from "@/config/site";

// Types for public API (extended Beat/Work from DB + computed fields)
export interface StoreBeat {
  id: number;
  title: string;
  meta: string;
  year: string;
  price: number;
  currency: string;
  cover?: string | null;
  cloudinaryPublicId?: string | null;
  youtubeId?: string | null;
  isTop?: boolean;
  href: string;
}

export interface StoreWork {
  id: number;
  kind: "youtube" | "uploaded";
  youtubeId?: string;
  cloudinaryId?: string;
  title: string;
  meta: string;
  year: string;
  sortOrder: number;
}

// Re-export site config types
export type { Service, Release, Link } from "@/config/site";

/**
 * Merges DB beats with site.ts static beats (fallback when DB empty/unconfigured)
 * DB wins when present and status=published.
 */
export async function getStoreBeats(): Promise<StoreBeat[]> {
  const dbBeats = await getBeats({ status: "published" });
  if (dbBeats.length > 0) {
    return dbBeats.map((b) => ({
      id: b.id,
      title: b.title,
      meta: b.meta,
      year: b.year,
      price: b.price,
      currency: b.currency,
      cover: b.cover ? String(b.cover) : undefined,
      cloudinaryPublicId: b.cloudinaryPublicId ? String(b.cloudinaryPublicId) : undefined,
      youtubeId: b.youtubeId ?? undefined,
      isTop: b.isTop,
      href: "", // Not used in store page — buy buttons use beat ID
    }));
  }
  // Fallback: static beats from site.ts (no prices — just catalog)
  return site.beats.map((b, i) => ({
    id: i + 1,
    title: b.title,
    meta: b.meta,
    year: b.year,
    price: 999,
    currency: "INR",
    cover: `album-${(i % 3) + 1}.avif`,
    cloudinaryPublicId: `virus404/beats/${b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-preview`,
    youtubeId: "",
    isTop: i < 3,
    href: b.href,
  }));
}

/**
 * Gets featured beats for top-10 strip (isTop=true, published)
 */
export async function getTopBeats(): Promise<StoreBeat[]> {
  const dbBeats = await getBeats({ status: "published", topOnly: true, limit: 10 });
  if (dbBeats.length > 0) {
    return dbBeats.map((b) => ({
      id: b.id,
      title: b.title,
      meta: b.meta,
      year: b.year,
      price: b.price,
      currency: b.currency,
      cover: b.cover ? String(b.cover) : undefined,
      cloudinaryPublicId: b.cloudinaryPublicId ? String(b.cloudinaryPublicId) : undefined,
      youtubeId: b.youtubeId ?? undefined,
      isTop: b.isTop,
      href: "",
    }));
  }
  // Fallback: first 3 static beats
  return site.beats.slice(0, 3).map((b, i) => ({
    id: i + 1,
    title: b.title,
    meta: b.meta,
    year: b.year,
    price: 999,
    currency: "INR",
    cover: `album-${(i % 3) + 1}.avif`,
    cloudinaryPublicId: `virus404/beats/${b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-preview`,
    youtubeId: "",
    isTop: true,
    href: b.href,
  }));
}

/**
 * Merges DB works with static fallbacks
 */
export async function getWorksData(): Promise<StoreWork[]> {
  const dbWorks = await getWorks({ status: "published" });
  if (dbWorks.length > 0) {
    return dbWorks.map((w) => ({
      id: w.id,
      kind: w.kind as "youtube" | "uploaded",
      youtubeId: w.youtubeId ?? undefined,
      cloudinaryId: w.cloudinaryId ?? undefined,
      title: w.title,
      meta: w.meta,
      year: w.year,
      sortOrder: w.sortOrder,
    }));
  }
  // Fallback: static works from releases + beats
  return [
    ...site.releases.map((r, i) => ({
      id: i + 1,
      kind: "youtube" as const,
      youtubeId: "dQw4w9WgXcQ",
      cloudinaryId: undefined,
      title: r.title,
      meta: r.credits,
      year: r.year,
      sortOrder: i + 1,
    })),
    ...site.beats.slice(0, 2).map((b, i) => ({
      id: 100 + i,
      kind: "uploaded" as const,
      youtubeId: undefined,
      cloudinaryId: `virus404/works/${b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      title: b.title,
      meta: b.meta,
      year: b.year,
      sortOrder: 10 + i,
    })),
  ];
}

/**
 * Merges site services with DB content_overrides['services']
 */
export async function getServices(): Promise<site.Service[]> {
  const overrides = await getContentOverrides();
  if (overrides.services) {
    try {
      return overrides.services as site.Service[];
    } catch {
      // fall through to defaults
    }
  }
  return site.services;
}

/**
 * Merges site hero with DB content_overrides['hero']
 */
export async function getHero() {
  const overrides = await getContentOverrides();
  if (overrides.hero) {
    try {
      return { ...site.hero, ...(overrides.hero as Partial<typeof site.hero>) };
    } catch {
      // fall through
    }
  }
  return site.hero;
}

/**
 * Merges site about with DB content_overrides['about']
 */
export async function getAbout() {
  const overrides = await getContentOverrides();
  if (overrides.about) {
    try {
      return { ...site.about, ...(overrides.about as Partial<typeof site.about>) };
    } catch {
      // fall through
    }
  }
  return site.about;
}

/**
 * Get all public data for a page in one call (reduces DB round-trips)
 */
export async function getPageData(page: "beats" | "works" | "home") {
  const [beats, topBeats, works, services, hero, about] = await Promise.all([
    page === "beats" || page === "home" ? getStoreBeats() : Promise.resolve([]),
    page === "beats" || page === "home" ? getTopBeats() : Promise.resolve([]),
    page === "works" || page === "home" ? getWorksData() : Promise.resolve([]),
    getServices(),
    getHero(),
    getAbout(),
  ]);
  return { beats, topBeats, works, services, hero, about };
}

// ISR revalidation constant for public pages
export const REVALIDATE_SECONDS = 60;