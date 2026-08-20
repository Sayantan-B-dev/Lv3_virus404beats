"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { gallery } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

export function GalleryStack() {
  const images = gallery.images;
  const [order, setOrder] = useState<number[]>(images.map((_, i) => i));
  const stackRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const lastMoved = useRef<number | null>(null);

  useEffect(() => {
    const cards = stackRef.current?.querySelectorAll<HTMLElement>("[data-stack-card]");
    if (!cards) return;
    cards.forEach((card) => {
      const idx = Number(card.dataset.idx);
      const pos = order.indexOf(idx);
      const depth = order.length - 1 - pos;
      const to = { y: depth * 18, rotation: depth * -2.4, opacity: pos === 0 ? 0.35 : 1, zIndex: pos };
      if (lastMoved.current === idx) {
        gsap.fromTo(card, { y: 130, rotation: depth === 0 ? -6 : 6, opacity: 0 }, { ...to, duration: 0.6, ease: "power3.out" });
        lastMoved.current = null;
      } else {
        gsap.set(card, to);
      }
    });
  }, [order]);

  const move = (dir: 1 | -1) => {
    if (animating.current) return;
    animating.current = true;
    const topIdx = order[order.length - 1];
    const bottomIdx = order[0];
    const card = stackRef.current?.querySelector<HTMLElement>(`[data-idx="${dir === 1 ? topIdx : bottomIdx}"]`);
    const done = () => {
      lastMoved.current = dir === 1 ? topIdx : bottomIdx;
      setOrder(dir === 1 ? [topIdx, ...order.slice(0, -1)] : [...order.slice(1), order[0]]);
      requestAnimationFrame(() => {
        animating.current = false;
      });
    };
    if (!card) {
      done();
      return;
    }
    if (dir === 1) {
      gsap.to(card, { y: 150, rotation: 8, opacity: 0, duration: 0.5, ease: "power3.in", onComplete: done });
    } else {
      done();
    }
  };

  const current = order[order.length - 1] + 1;

  return (
    <section id="gallery" className="bg-bg py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          kicker="Gallery"
          title="In the studio"
          intro="Frames from the work — sessions, shows and the city it happens in."
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_auto] lg:items-center">
          <div
            ref={stackRef}
            className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden bg-bg-soft"
            data-cursor-text="view"
          >
            {images.map((img, i) => (
              <div
                key={img}
                data-stack-card
                data-idx={i}
                className="absolute inset-0 will-change-transform"
              >
                <SmartImage src={img} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-8 lg:flex-col lg:items-start">
            <p className="text-h-l text-fg">
              <span className="tabular-nums">{String(current).padStart(2, "0")}</span>
              <span className="text-faint"> / {String(images.length).padStart(2, "0")}</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => move(-1)}
                aria-label="Previous image"
                className="flex size-14 items-center justify-center border border-line text-h-m transition-colors hover:border-fg"
              >
                ←
              </button>
              <button
                onClick={() => move(1)}
                aria-label="Next image"
                className={cn(
                  "flex size-14 items-center justify-center border text-h-m transition-colors",
                  "border-accent bg-accent text-accent-ink hover:bg-transparent hover:text-accent",
                )}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}