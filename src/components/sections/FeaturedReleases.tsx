"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { releases } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

export function FeaturedReleases() {
  const [active, setActive] = useState(0);
  const rel = releases[active];

  return (
    <section id="featured" className="bg-bg-soft py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading kicker="Selected works" intro="Releases and collabs carrying the virus404 sound — from dark trap pockets to melodic hip-hop." />

        <div className="mb-12 flex flex-wrap items-center gap-3 border-b border-line pb-6">
          {releases.map((r, i) => (
            <button
              key={r.year + r.title}
              onClick={() => setActive(i)}
              className={cn(
                "border px-5 py-2.5 text-caps transition-colors duration-300",
                i === active
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line text-muted hover:border-fg hover:text-fg",
              )}
              aria-pressed={i === active}
            >
              {r.year}
            </button>
          ))}
          <a
            href="https://youtube.com/@virus404beats"
            target="_blank"
            rel="noreferrer"
            className="link-line ml-auto text-caps text-muted transition-colors hover:text-fg"
          >
            view all on YouTube →
          </a>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-bg">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={rel.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <SmartImage src={rel.cover} alt={rel.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-bg/20 mix-blend-multiply" aria-hidden />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={rel.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              <p className="text-caps text-accent">{rel.year}</p>
              <h3 className="text-h-l text-fg">{rel.title}</h3>
              <p className="text-p-s text-faint">{rel.credits}</p>
              <p className="max-w-md text-p-l text-muted">{rel.description}</p>
              <div className="mt-2 flex flex-wrap gap-3">
                {rel.links.map((l) => (
                  <Button key={l.label} href={l.href} label={l.label} variant="outline" external />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}