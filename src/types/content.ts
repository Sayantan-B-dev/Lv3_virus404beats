// Static content model. Shapes mirror docs/ARCHITECTURE.md tables.
// Accessors are named like future server queries so the DB swap stays local.

export type ContentStatus = "draft" | "published" | "archived";

export interface Track {
  id: string;
  slug: string;
  position: string;
  title: string;
  plays: string;
  duration: string;
  audioUrl: string;
  active: boolean;
  status: ContentStatus;
}

export interface Release {
  id: string;
  slug: string;
  type: string;
  title: string;
  meta: string;
  description: string;
  coverUrl: string;
  status: ContentStatus;
}

export interface Project {
  id: string;
  slug: string;
  index: string;
  category: string;
  title: string;
  detail: string;
  coverUrl: string;
  rotation: string;
  featured: boolean;
  status: ContentStatus;
}

export interface Service {
  id: string;
  slug: string;
  position: string;
  title: string;
  description: string;
  status: ContentStatus;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
}
