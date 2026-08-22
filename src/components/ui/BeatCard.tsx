"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { SmartImage } from "@/components/ui/SmartImage";

interface BeatCardProps {
  beat: {
    id: number;
    title: string;
    meta: string;
    year: string;
    price: number;
    currency: string;
    cover?: string | null | undefined;
    cloudinaryPublicId?: string | null | undefined;
    youtubeId?: string | null | undefined;
    isTop?: boolean;
  };
  previewUrl?: string;
  isTop10?: boolean;
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(price);
}

export function BeatCard({ beat, previewUrl = "", isTop10 = false }: BeatCardProps) {
  const coverSrc = beat.cover ?? `album-${((beat.id - 1) % 3) + 1}.avif`;

  // Buy links: email + WhatsApp prefilled
  const subject = `Beat Purchase: ${beat.title} (${beat.id})`;
  const body = `Hi virus404!\n\nI want to buy the beat "${beat.title}" (ID: ${beat.id}).\nPrice: ${formatPrice(beat.price, beat.currency)}\n\nPlease let me know the license terms and delivery method.\n\nThanks!`;
  const emailHref = `mailto:hello@virus404beats.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const whatsappHref = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(body)}`;

  return (
    <article
      className={cn("beat-card", isTop10 && "top10", beat.isTop && "featured")}
      data-beat-id={beat.id}
    >
      <div className="beat-cover">
        <SmartImage src={coverSrc} alt={`${beat.title} cover`} className="cover-img" />
        {beat.isTop && <span className="top-badge">TOP 10</span>}
        {previewUrl && (
          <AudioPlayer
            src={previewUrl}
            title={beat.title}
            className="preview-player"
            loop={true}
          />
        )}
      </div>

      <div className="beat-info">
        <h3 className="beat-title">{beat.title}</h3>
        <p className="beat-meta">{beat.meta}</p>
        <div className="beat-meta-row">
          <span className="beat-year">{beat.year}</span>
          <span className="beat-price">{formatPrice(beat.price, beat.currency)}</span>
        </div>

        <div className="beat-actions">
          <Button
            href={emailHref}
            label="Buy via Email"
            variant="outline"
            external
            className="buy-btn email"
          />
          <Button
            href={whatsappHref}
            label="Buy via WhatsApp"
            variant="accent"
            external
            className="buy-btn whatsapp"
          />
        </div>
      </div>
    </article>
  );
}