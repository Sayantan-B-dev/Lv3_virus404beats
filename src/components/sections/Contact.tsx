"use client";

import { useState } from "react";
import { contact, whatsappHref } from "@/config/site";
import { useReveal } from "@/lib/hooks";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  const ref = useReveal<HTMLDivElement>(0.1);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`[virus404] ${String(data.get("name") || "Booking")}`);
    const body = encodeURIComponent(`${String(data.get("message") || "")}\n\n— ${String(data.get("email") || "")}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const socials = [
    { label: "YouTube", href: contact.youtube },
    { label: "Instagram", href: contact.instagram },
    { label: "SoundBetter", href: contact.soundbetter },
  ].filter((s) => s.href);

  return (
    <section id="contact" className="bg-bg py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          kicker="Contact"
          title="Book a beat"
          intro="WhatsApp is the fastest line — or drop a message and get back within a day."
        />

        <div ref={ref} className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-8">
            <Button
              href={whatsappHref("Hi virus404! I want to book a beat.")}
              label="Chat on WhatsApp"
              variant="accent"
              external
              className="min-h-20 text-base"
            />
            <p data-reveal className="max-w-sm text-p-s text-muted">
              Fastest response: WhatsApp. For demos and stems, use the form — every message lands in the studio inbox.
            </p>
            <div data-reveal className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line text-caps text-muted transition-colors hover:text-fg"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4" data-reveal>
            <input
              name="name"
              required
              placeholder="Your name"
              className="border border-line bg-bg-soft px-5 py-4 text-p-r text-fg outline-none transition-colors placeholder:text-faint focus:border-fg"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Your email"
              className="border border-line bg-bg-soft px-5 py-4 text-p-r text-fg outline-none transition-colors placeholder:text-faint focus:border-fg"
            />
            <textarea
              name="message"
              required
              rows={6}
              placeholder="What do you need? Type beat, custom beat, mix, master…"
              className="resize-none border border-line bg-bg-soft px-5 py-4 text-p-r text-fg outline-none transition-colors placeholder:text-faint focus:border-fg"
            />
            <Button label={sent ? "Opening mail…" : "Send message"} type="submit" variant="solid" className="w-full" />
          </form>
        </div>
      </div>
    </section>
  );
}