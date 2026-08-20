"use client";

import { useRef } from "react";
import { hero, whatsappHref } from "@/config/site";
import { useImageCycle, useTitleReveal } from "@/lib/hooks";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { Equalizer } from "@/components/ui/Equalizer";
import { SoundToggle } from "@/components/ui/SoundToggle";

export function Hero() {
  const imgsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useImageCycle<HTMLDivElement>(hero.images.length);
  useTitleReveal<HTMLHeadingElement>();

  return (
    <section id="hero" className="relative flex min-h-svh flex-col overflow-hidden">
      <div ref={imgsRef} className="absolute inset-0" aria-hidden>
        {hero.images.map((img, i) => (
          <SmartImage
            key={img}
            src={img}
            alt=""
            eager={i === 0}
            data-cycle-img
            className={`absolute inset-0 h-full w-full object-cover ${i === 0 ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-bg/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-transparent to-bg" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end px-5 pb-10 pt-32 md:px-10">
        <p className="mb-4 flex items-center gap-3 text-caps text-muted" data-reveal>
          <Equalizer className="text-accent" />
          {hero.kicker}
        </p>

        <h1 ref={titleRef} className="text-display text-fg">
          {hero.title.map((line, i) => (
            <span key={line} className="clip-text">
              <span data-title-line className={i === 1 ? "text-accent" : ""}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-xl text-p-l text-muted" data-reveal>
            {hero.subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row" data-reveal>
            <Button
              href={whatsappHref(hero.ctaPrimary.label)}
              label={hero.ctaPrimary.label}
              variant="accent"
              external
              className="min-w-56"
            />
            <Button href={hero.ctaSecondary.href} label={hero.ctaSecondary.label} variant="outline" external />
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6" data-reveal>
          <SoundToggle src={hero.sound.src} label={hero.sound.label} />
          <a
            href="#genres"
            className="flex items-center gap-2 text-caps text-muted transition-colors hover:text-fg"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#genres")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Scroll
            <span aria-hidden className="inline-block h-8 w-px animate-pulse bg-muted" />
          </a>
        </div>
      </div>
    </section>
  );
}