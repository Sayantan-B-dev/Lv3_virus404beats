"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  kicker: string;
  title?: string;
  intro?: string;
  className?: string;
}

export function SectionHeading({ kicker, title, intro, className }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} data-reveal className={cn("mb-10 md:mb-16", className)}>
      <div className="mb-6 flex items-center gap-3">
        <span className="size-2.5 bg-accent" aria-hidden />
        <span className="text-caps text-muted">{kicker}</span>
      </div>
      {title ? <h2 className="text-h-l text-fg">{title}</h2> : null}
      {intro ? <p className="mt-4 max-w-xl text-p-l text-muted">{intro}</p> : null}
    </div>
  );
}