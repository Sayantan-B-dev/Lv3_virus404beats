"use client";

import { useEffect } from "react";

// Recreates the reference micro jitter on decorative layers only.
// Copy stays untouched so meaning and CTAs never shift.
export default function CollageJitter({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(
      ".hero .scribble,.hero .marker,.hero .paper,.hero .note,.hero .cross,.hero .crosshair"
    );
    nodes.forEach((el) => {
      const target = el as HTMLElement;
      target.style.marginLeft = `${(Math.random() - 0.5) * 2.4}px`;
    });
  }, []);

  return <>{children}</>;
}
