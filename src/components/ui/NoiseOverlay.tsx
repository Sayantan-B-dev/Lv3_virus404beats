"use client";

import { MOTION } from "@/config/motion";

export function NoiseOverlay() {
  if (!MOTION.noise) return null;
  return <div aria-hidden className="noise-overlay" />;
}