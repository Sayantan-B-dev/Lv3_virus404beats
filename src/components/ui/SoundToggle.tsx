"use client";

import { useRef, useState } from "react";
import { MOTION } from "@/config/motion";
import { Equalizer } from "./Equalizer";

export function SoundToggle({ src, label }: { src: string; label: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [flash, setFlash] = useState(false);

  if (!MOTION.soundToggle || !src) return null;

  const toggle = () => {
    const a = (audioRef.current ??= new Audio(src));
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play();
      setPlaying(true);
      setFlash(true);
      setTimeout(() => setFlash(false), 2500);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Equalizer className={cn("text-accent", playing && "is-playing")} />
        <span className={cn("text-caps transition-opacity", flash ? "opacity-100" : "opacity-40")}>
          {playing ? "Now playing" : label}
        </span>
      </div>
      <button
        onClick={toggle}
        className="border border-line px-4 py-2 text-caps transition-colors hover:border-fg"
        aria-pressed={playing}
      >
        <span className="btn-label">
          <span>{playing ? "Sound ON" : "Sound OFF"}</span>
          <span aria-hidden>{playing ? "Sound ON" : "Sound OFF"}</span>
        </span>
      </button>
    </div>
  );
}