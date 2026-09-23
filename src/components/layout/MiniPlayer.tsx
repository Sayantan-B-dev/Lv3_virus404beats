"use client";

import { useEffect, useRef, useState } from "react";
import { getActiveTrack, getPublishedTracks } from "@/data/content";
import { media } from "@/lib/media";

function formatTime(value: number): string {
  if (!Number.isFinite(value) || value < 0) return "00:00";
  const min = Math.floor(value / 60);
  const sec = Math.floor(value % 60);
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// Rail mini player. Real audio element, single active track behavior.
export default function MiniPlayer() {
  const tracks = getPublishedTracks();
  const [index, setIndex] = useState(() =>
    Math.max(
      tracks.findIndex((t) => t.id === getActiveTrack().id),
      0
    )
  );
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const track = tracks[index];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, index]);

  const step = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + tracks.length) % tracks.length);
    setPlaying(true);
  };

  return (
    <div className="side-player">
      <div className="cover-side">
        <img src={media.sideCover} alt={`Cover art for ${track.title}`} />
      </div>
      <div className="now">NOW PLAYING</div>
      <h2>{track.title}</h2>
      <div className="side-meta">
        VIRUS404BEATS - {formatTime(current)} / {formatTime(total)}
      </div>
      <div className="progress">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="controls">
        <button type="button" onClick={() => step(-1)} aria-label="Previous track">
          &#9664;&#9664;
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="play"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "II" : "&#9654;"}
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next track">
          &#9654;&#9654;
        </button>
      </div>
      <div className="side-socials" aria-hidden="true">
        <span>&#9673;</span>
        <span>&#9679;</span>
        <span>&#9654;</span>
        <span>&#9678;</span>
      </div>
      <audio
        ref={audioRef}
        src={track.audioUrl}
        preload="none"
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          setCurrent(el.currentTime);
          setTotal(el.duration);
          setProgress(el.duration ? (el.currentTime / el.duration) * 100 : 0);
        }}
        onEnded={() => step(1)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </div>
  );
}
