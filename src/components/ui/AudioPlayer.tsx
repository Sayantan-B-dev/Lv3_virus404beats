"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Equalizer } from "@/components/ui/Equalizer";

interface AudioPlayerProps {
  src: string;
  title: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export function AudioPlayer({
  src,
  title,
  className,
  autoPlay = false,
  loop = false,
  onPlay,
  onPause,
  onEnded,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      onPause?.();
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
      onPlay?.();
    }
  }, [isPlaying, onPlay, onPause]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = loop;
    const handleTimeUpdate = () => setProgress((audio.currentTime / audio.duration) * 100);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      onEnded?.();
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    if (autoPlay) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [autoPlay, loop, onEnded]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * audio.duration;
    setProgress(pos * 100);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setVolume(pos);
    setIsMuted(pos === 0);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className={cn("audio-player", className)} data-title={title}>
      <div className="player-controls">
        <button
          className="play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
          aria-pressed={isPlaying}
        >
          <span className="play-icon" aria-hidden>{isPlaying ? "⏸" : "▶"}</span>
          <Equalizer className={cn("eq-visualizer", { playing: isPlaying })} />
        </button>

        <div className="progress-wrap" ref={progressRef} onClick={handleProgressClick}>
          <div className="progress-bar" style={{ width: `${progress}%` }} />
          <div className="progress-handle" style={{ left: `${progress}%` }} />
        </div>

        <div className="time-display">
          <span>{formatTime((duration * progress) / 100)}</span>
          <span>/</span>
          <span>{formatTime(duration) || "0:00"}</span>
        </div>

        <div className="volume-wrap" onClick={handleVolumeClick}>
          <button
            className="mute-btn"
            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
            aria-label={isMuted ? "Unmute" : "Mute"}
            aria-pressed={isMuted}
          >
            <span aria-hidden>{isMuted ? "🔇" : "🔊"}</span>
          </button>
          <div className="volume-bar">
            <div className="volume-fill" style={{ width: `${volume * 100}%` }} />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        crossOrigin="anonymous"
      />
    </div>
  );
}