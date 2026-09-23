import type { Track } from "@/types/content";
import { PauseIcon, PlayIcon } from "../icons";

interface TrackListProps {
  tracks: Track[];
  selectedId: string;
  playing: boolean;
  onSelect: (id: string) => void;
}

export default function TrackList({ tracks, selectedId, playing, onSelect }: TrackListProps) {
  return (
    <div className="tracklist" role="listbox" aria-label="Release tracks">
      {tracks.map((track) => {
        const selected = track.id === selectedId;
        return (
          <div
            key={track.id}
            role="option"
            tabIndex={0}
            aria-selected={selected}
            className={selected ? "track active" : "track"}
            onClick={() => onSelect(track.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(track.id);
              }
            }}
          >
            <span className="track-mark">
              {selected && playing ? (
                <PauseIcon />
              ) : selected ? (
                <PlayIcon />
              ) : (
                track.position
              )}
            </span>
            <span>{track.title}</span>
            <span className="size">{track.plays}</span>
            <span className="dur">{track.duration}</span>
          </div>
        );
      })}
    </div>
  );
}
