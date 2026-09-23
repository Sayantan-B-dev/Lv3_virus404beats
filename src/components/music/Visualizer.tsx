"use client";

import { useEffect, useRef } from "react";
import {
  SPECTRUM_BARS,
  attachSpectrum,
  startFallback,
  type LevelCallback,
} from "@/lib/audio-spectrum";
import { media } from "@/lib/media";

interface VisualizerProps {
  title: string;
  artistLine: string;
  playing: boolean;
  audio: React.RefObject<HTMLAudioElement | null>;
}

// Live spectrum bars. Levels arrive quantized, JS only switches classes.
export default function Visualizer({ title, artistLine, playing, audio }: VisualizerProps) {
  const barsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const apply: LevelCallback = (levels) => {
      levels.forEach((level, i) => {
        const bar = barsRef.current[i];
        if (bar) bar.className = `sb-${level}`;
      });
    };
    if (!playing) {
      apply(new Array(SPECTRUM_BARS).fill(1));
      return;
    }
    const el = audio.current;
    if (!el) {
      const stop = startFallback(apply);
      return stop;
    }
    const { detach, live } = attachSpectrum(el, apply);
    if (live) return detach;
    const stop = startFallback(apply);
    return () => {
      detach();
      stop();
    };
  }, [playing, audio, title]);

  return (
    <div className="viz">
      <img src={media.vizBackdrop} alt="" aria-hidden="true" />
      <div className="viz-bars" aria-hidden="true">
        {Array.from({ length: SPECTRUM_BARS }).map((_, i) => (
          <i
            key={i}
            ref={(node) => {
              barsRef.current[i] = node;
            }}
            className="sb-1"
          />
        ))}
      </div>
      <h5>{title}</h5>
      <small>{artistLine}</small>
    </div>
  );
}
