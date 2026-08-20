"use client";

import { useRef, type ReactNode } from "react";
import { useMarquee } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  direction?: 1 | -1;
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export function Marquee({ children, direction = -1, duration = 40, className, pauseOnHover }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  useMarquee<HTMLDivElement>({ direction, duration });

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div data-marquee-track className="marquee-track">
        <div className={cn("marquee-inner", pauseOnHover && "group-hover:[animation-play-state:paused]")}>
          {children}
        </div>
        <div aria-hidden className="marquee-inner">
          {children}
        </div>
      </div>
    </div>
  );
}