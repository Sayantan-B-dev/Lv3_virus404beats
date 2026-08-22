"use client";

import { cn } from "@/lib/utils";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { SmartImage } from "@/components/ui/SmartImage";
import { getPreviewUrl } from "@/lib/cloudinary";

interface WorksCardProps {
  work: {
    id: number;
    kind: "youtube" | "uploaded";
    youtubeId?: string;
    cloudinaryId?: string;
    title: string;
    meta: string;
    year: string;
  };
}

export function WorksCard({ work }: WorksCardProps) {
  if (work.kind === "youtube") {
    return (
      <article className={cn("work-card youtube")} data-work-id={work.id}>
        <div className="work-media">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${work.youtubeId}?rel=0`}
            title={work.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="work-info">
          <h3 className="work-title">{work.title}</h3>
          <p className="work-meta">{work.meta}</p>
          <span className="work-year">{work.year}</span>
        </div>
      </article>
    );
  }

  // Uploaded audio
  const previewUrl = work.cloudinaryId ? getPreviewUrl(work.cloudinaryId) : "";
  const coverSrc = `album-${((work.id - 1) % 3) + 1}.avif`;

  return (
    <article className={cn("work-card uploaded")} data-work-id={work.id}>
      <div className="work-media">
        <SmartImage src={coverSrc} alt={`${work.title} cover`} className="cover-img" />
        {previewUrl && (
          <AudioPlayer
            src={previewUrl}
            title={work.title}
            className="preview-player"
            loop={true}
          />
        )}
      </div>
      <div className="work-info">
        <h3 className="work-title">{work.title}</h3>
        <p className="work-meta">{work.meta}</p>
        <span className="work-year">{work.year}</span>
      </div>
    </article>
  );
}