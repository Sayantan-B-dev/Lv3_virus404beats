"use client";

import { useMemo } from "react";
import { media } from "@/lib/media";

interface VisualizerProps {
  title: string;
  artistLine: string;
  animated: boolean;
}

// Procedural spectrum bars. Kept from the reference prototype.
export default function Visualizer({ title, artistLine, animated }: VisualizerProps) {
  const bars = useMemo(
    () =>
      Array.from({ length: 64 }).map((_, i) => ({
        height: 8 + ((i * 37) % 92),
        duration: 0.28 + ((i * 53) % 95) / 100,
        delay: -((i * 29) % 150) / 100,
      })),
    []
  );

  return (
    <div className="viz">
      <img src={media.vizBackdrop} alt="" aria-hidden="true" />
      <div className="viz-bars" aria-hidden="true">
        {bars.map((bar, i) => (
          <i
            key={i}
            style={{
              height: `${bar.height}%`,
              animationDuration: animated ? `${bar.duration}s` : undefined,
              animationDelay: `${bar.delay}s`,
              animationPlayState: animated ? "running" : "paused",
            }}
          />
        ))}
      </div>
      <h5>{title}</h5>
      <small>{artistLine}</small>
    </div>
  );
}
