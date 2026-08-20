"use client";

import { useRef } from "react";
import { useCustomCursor } from "@/lib/hooks";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useCustomCursor(ref);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] opacity-0"
    >
      <div
        data-cursor-dot
        className="fixed left-0 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg"
      />
      <div
        data-cursor-bubble
        className="fixed left-0 top-0 z-[101] flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-ink transition-[width,height,background-color] duration-300"
      >
        <span data-cursor-label className="text-caps" />
      </div>
    </div>
  );
}