"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";

interface LiteYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
}

export function LiteYouTube({ videoId, title, className }: LiteYouTubeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    if (!loaded) {
      const iframe = iframeRef.current;
      if (iframe) {
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
        setLoaded(true);
        setPlaying(true);
      }
    } else if (iframeRef.current) {
      // Toggle play/pause via postMessage (YouTube API)
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: playing ? "pauseVideo" : "playVideo" }),
        "*"
      );
      setPlaying(!playing);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        iframeRef.current.src = "";
      }
    };
  }, []);

  return (
    <div
      className={cn("lite-youtube", { playing, loaded }, className)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }}
      aria-label={`Play ${title}`}
    >
      <div className="lite-youtube-thumb">
        <SmartImage
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="thumb-img"
          eager
        />
        <div className="play-overlay" aria-hidden>
          <svg viewBox="0 0 68 48" className="play-icon">
            <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.79,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#ff0000" />
            <path d="M45,24 27,14 27,34" fill="#fff" />
          </svg>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        className="lite-youtube-iframe"
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        src=""
      />
    </div>
  );
}