"use client";

import { genres } from "@/config/site";
import { Marquee } from "@/components/ui/Marquee";

export function GenreMarquee() {
  return (
    <section id="genres" className="border-y border-line bg-bg py-10 md:py-14" data-cursor-text="drag">
      <Marquee duration={32}>
        {genres.map((g) => (
          <span key={g} className="mx-6 flex items-center gap-12 whitespace-nowrap md:mx-10">
            <span className="text-h-l text-fg">{g}</span>
            <span aria-hidden className="size-2.5 bg-accent" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}