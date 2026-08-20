"use client";

import { about } from "@/config/site";
import { useLineReveal, useReveal } from "@/lib/hooks";
import { Odometer } from "@/components/ui/Odometer";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function About() {
  const titleRef = useLineReveal<HTMLHeadingElement>(0.14);
  const bodyRef = useReveal<HTMLDivElement>(0.1);

  return (
    <section id="about" className="bg-bg-soft py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[3/4] overflow-hidden">
              <ParallaxImage src={about.portrait} alt="virus404 in the studio" className="h-full" imgClassName="h-[118%]" />
            </div>
          </div>

          <div className="order-1 flex flex-col justify-center lg:order-2">
            <div className="mb-6 flex items-center gap-3">
              <span className="size-2.5 bg-accent" aria-hidden />
              <span className="text-caps text-muted">{about.kicker}</span>
            </div>
            <h2 ref={titleRef} className="text-display text-fg">
              {about.title.map((line, i) => (
                <span key={line} className="reveal-line">
                  <span className={i === 1 ? "text-accent" : ""}>{line}</span>
                </span>
              ))}
            </h2>

            <div ref={bodyRef} className="mt-10 flex flex-col gap-5">
              {about.bio.map((p, i) => (
                <p key={i} data-reveal className="max-w-xl text-p-l text-muted">
                  {p}
                </p>
              ))}
            </div>

            <div data-reveal className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-10">
              {about.counters.map((c) => (
                <div key={c.label}>
                  <p className="text-h-l text-fg">
                    <Odometer value={c.value} suffix={c.suffix} />
                  </p>
                  <p className="mt-1 text-caps text-faint">{c.label}</p>
                </div>
              ))}
            </div>

            <div data-reveal className="mt-10 flex flex-wrap gap-2.5">
              {about.facts.map((f) => (
                <span key={f} className="border border-line px-4 py-2 text-p-s text-muted">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}