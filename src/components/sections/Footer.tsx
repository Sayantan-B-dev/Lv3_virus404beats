"use client";

import { contact, footer, site } from "@/config/site";
import { useFooterParallax } from "@/lib/hooks";

export function Footer() {
  const ref = useFooterParallax<HTMLElement>();

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-bg-soft">
      <div className="relative z-10">
        <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
          <div className="flex flex-col justify-between gap-12 md:flex-row">
            <div className="max-w-sm">
              <p className="text-h-l text-fg">{site.name}</p>
              <p className="mt-3 text-p-s text-muted">{footer.blurb}</p>
              <p className="mt-6 text-caps text-faint">
                <span className="tabular-nums">{new Date().getFullYear()}</span> © {site.legalName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12">
              {footer.columns.map((col) => (
                <div key={col.title}>
                  <p className="mb-5 text-caps text-faint">{col.title}</p>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target={l.href.startsWith("http") ? "_blank" : undefined}
                          rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                          className="link-line text-p-r text-muted transition-colors hover:text-fg"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-start justify-between gap-6">
              <a
                href="#hero"
                aria-label="Back to top"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="spin-logo text-muted transition-colors hover:text-accent"
              >
                <svg width="54" height="54" viewBox="0 0 64 64" aria-hidden>
                  <rect width="64" height="64" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 22 32 42 44 22" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="link-line text-p-s text-faint transition-colors hover:text-fg"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}