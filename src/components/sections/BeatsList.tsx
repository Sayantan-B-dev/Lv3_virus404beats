"use client";

import { beats } from "@/config/site";
import { useReveal } from "@/lib/hooks";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BeatsList() {
  const ref = useReveal<HTMLDivElement>(0.07);

  return (
    <section id="beats" className="bg-bg-soft py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          kicker="Recent work"
          title="The catalog"
          intro="Selected releases, collabs and mix/master credits. Stream links land here as they go live."
        />

        <div ref={ref} className="border-t border-line">
          {beats.map((b, i) => (
            <a
              key={b.title + i}
              href={b.href || undefined}
              data-reveal
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden border-b border-line py-6 transition-colors duration-300 hover:bg-accent hover:text-accent-ink md:grid-cols-[64px_1fr_auto_auto] md:gap-8 md:py-8"
            >
              <span className="text-p-s text-faint transition-colors group-hover:text-accent-ink/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="truncate text-h-m text-fg transition-colors group-hover:text-accent-ink">
                {b.title}
              </span>
              <span className="hidden max-w-xs truncate text-p-s text-muted transition-colors group-hover:text-accent-ink/70 md:block">
                {b.meta}
              </span>
              <span className="flex items-center gap-4">
                <span className="text-caps text-faint transition-colors group-hover:text-accent-ink/60">
                  {b.year}
                </span>
                <span
                  aria-hidden
                  className="text-h-m transition-transform duration-300 group-hover:translate-x-2"
                >
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}