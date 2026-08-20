"use client";

import { services, whatsappHref } from "@/config/site";
import { useReveal } from "@/lib/hooks";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  const ref = useReveal<HTMLDivElement>(0.12);

  return (
    <section id="services" className="bg-bg py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          kicker="Services"
          title="Beats & engineering"
          intro="Two lanes, one studio. Custom production and radio-ready mixes — 48-hour turnaround, pricing based on difficulty."
        />

        <div ref={ref} className="grid gap-6 lg:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.name}
              data-reveal
              className="group relative flex flex-col gap-8 overflow-hidden border border-line bg-bg-soft p-8 transition-colors duration-500 hover:border-fg md:p-12"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-h-m text-fg">{s.name}</h3>
                  <p className="mt-2 max-w-sm text-p-s text-muted">{s.description}</p>
                </div>
                <span aria-hidden className="size-2.5 shrink-0 bg-accent transition-transform duration-500 group-hover:rotate-90" />
              </div>

              <div>
                <p className="text-h-l text-fg">{s.price}</p>
                <p className="mt-1 text-caps text-faint">{s.priceNote}</p>
              </div>

              <ul className="flex flex-col gap-2.5 border-t border-line pt-6">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex items-center gap-3 text-p-s text-muted">
                    <span aria-hidden className="size-1.5 bg-accent" />
                    {inc}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Button
                  href={whatsappHref(`Hi virus404! I want to book: ${s.name}`)}
                  label={s.cta.label}
                  variant={s.name === "Beat Production" ? "accent" : "solid"}
                  external
                  className="w-full md:w-auto"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}