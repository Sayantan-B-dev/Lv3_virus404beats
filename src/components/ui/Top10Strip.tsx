"use client";

import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { SmartImage } from "@/components/ui/SmartImage";

interface Top10StripProps {
  beats: Array<{
    id: number;
    title: string;
    meta: string;
    year: string;
    price: number;
    currency: string;
    cover?: string | null | undefined;
    cloudinaryPublicId?: string | null | undefined;
    isTop?: boolean;
    previewUrl?: string;
  }>;
}

export function Top10Strip({ beats }: Top10StripProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const topBeats = beats.filter((b) => b.isTop).slice(0, 10);
  if (topBeats.length === 0) return null;

  const activeBeat = topBeats[activeIndex];
  const previewUrl = activeBeat.previewUrl ?? "";

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % topBeats.length);
  }, [topBeats.length]);

  useEffect(() => {
    setIsPlaying(false);
  }, [activeIndex]);

  return (
    <section className="top10-strip" aria-label="Top 10 beats quick play">
      <div className="top10-header">
        <h2 className="section-title">Top 10 Quick Play</h2>
        <div className="track-selector" role="tablist" aria-label="Select beat">
          {topBeats.map((beat, i) => (
            <button
              key={beat.id}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`${beat.title} - ${beat.meta}`}
              className={cn("track-btn", { active: i === activeIndex })}
              onClick={() => setActiveIndex(i)}
            >
              <span className="track-number">{i + 1}</span>
              <span className="track-title">{beat.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="top10-player">
        <div className="active-track">
          <SmartImage
            src={activeBeat.cover ?? `album-${((activeBeat.id - 1) % 3) + 1}.avif`}
            alt={`${activeBeat.title} cover`}
            className="active-cover"
            eager
          />
          <div className="active-info">
            <h3>{activeBeat.title}</h3>
            <p>{activeBeat.meta}</p>
            <span className="active-year">{activeBeat.year}</span>
          </div>
        </div>

        {previewUrl && (
          <AudioPlayer
            src={previewUrl}
            title={activeBeat.title}
            className="shared-player"
            autoPlay={false}
            loop={true}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
          />
        )}

        <div className="top10-nav">
          <button
            className="nav-btn prev"
            onClick={() => setActiveIndex((prev) => (prev - 1 + topBeats.length) % topBeats.length)}
            aria-label="Previous beat"
          >
            ←
          </button>
          <button
            className="nav-btn next"
            onClick={() => setActiveIndex((prev) => (prev + 1) % topBeats.length)}
            aria-label="Next beat"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}