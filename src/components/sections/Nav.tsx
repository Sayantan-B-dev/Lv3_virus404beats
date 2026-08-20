"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/config/site";
import { cn } from "@/lib/utils";

function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY;
      setHidden(y > last && y > 120);
      last = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (lenis) lenis.scrollTo(href, { offset: 0 });
    else scrollToId(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] border-b border-transparent transition-all duration-500",
          hidden ? "-translate-y-full" : "translate-y-0",
          open && "border-line bg-bg",
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-10">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              go("#hero");
            }}
            className="flex items-center gap-2"
            aria-label="virus404 home"
          >
            <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden>
              <path d="M14 18 32 50 50 18" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-caps">{site.name}</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className="link-line text-caps text-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("#contact");
              }}
              className="border border-fg px-4 py-2 text-caps text-fg transition-colors hover:bg-fg hover:text-bg"
            >
              Book a beat
            </a>
          </nav>

          <button
            className="flex size-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={cn("h-px w-6 bg-fg transition-transform duration-300", open && "translate-y-[3.5px] rotate-45")} />
            <span className={cn("h-px w-6 bg-fg transition-transform duration-300", open && "-translate-y-[3.5px] -rotate-45")} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[79] flex flex-col justify-center bg-bg px-8 lg:hidden"
            aria-label="Mobile"
          >
            {nav.links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-line py-5 text-h-m text-fg"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}