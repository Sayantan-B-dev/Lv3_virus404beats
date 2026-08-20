"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { MOTION } from "@/config/motion";

export function LenisProvider({ children }: { children: ReactNode }) {
  if (!MOTION.smoothScroll) return <>{children}</>;
  return (
    <ReactLenis root options={{ autoRaf: true, duration: 1.15, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}