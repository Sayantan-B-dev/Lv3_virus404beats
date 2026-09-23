"use client";

import { useEffect, useRef, useState } from "react";
import { getPublishedRelease, getPublishedTracks } from "@/data/content";
import SectionHead from "../layout/SectionHead";
import TrackList from "./TrackList";
import Visualizer from "./Visualizer";

// Release sleeve plus real track audio. One shared element keeps
// single active track behavior inside this block.
export default function ReleaseCard() {
  const release = getPublishedRelease();
  const tracks = getPublishedTracks();
  const [selectedId, setSelectedId] = useState(
    tracks.find((t) => t.active)?.id ?? tracks[0].id
  );
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const selected = tracks.find((t) => t.id === selectedId) ?? tracks[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, selectedId]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.src !== selected.audioUrl) audio.src = selected.audioUrl;
    setPlaying((p) => !p);
  };

  const select = (id: string) => {
    if (id === selectedId) {
      toggle();
      return;
    }
    setSelectedId(id);
    setPlaying(true);
  };

  return (
    <section className="section" id="releases">
      <SectionHead lead="LATEST" accent="RELEASE" note="VIEW ALL RELEASES &rarr;" />

      <div className="release">
        <div className="release-cover">
          <img src={release.coverUrl} alt={`Cover art for ${release.title}`} />
          <button type="button" onClick={toggle} aria-label={playing ? "Pause release preview" : "Play release preview"}>
            {playing ? "II" : "\u25B6"}
          </button>
        </div>
        <div className="release-info">
          <span className="tag">{release.type}</span>
          <h4>{release.title}</h4>
          <div className="meta">{release.meta}</div>
          <p>{release.description}</p>
          <a className="listen" href="#releases">
            LISTEN NOW &rarr;
          </a>
        </div>
        <TrackList tracks={tracks} selectedId={selectedId} playing={playing} onSelect={select} />
        <Visualizer
          title={selected.title}
          artistLine={`VIRUS404BEATS - ${selected.duration}`}
          animated={playing}
        />
      </div>
      <audio
        ref={audioRef}
        src={selected.audioUrl}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </section>
  );
}
