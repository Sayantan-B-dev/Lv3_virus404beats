"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/data/content";

// Tracks visible section and marks the matching nav link active.
export default function NavState() {
  const [active, setActive] = useState<string>("#home");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href)
    ).filter((el): el is Element => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-36% 0px -53% 0px", threshold: 0 }
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="nav" aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={active === item.href ? "active" : undefined}
          aria-current={active === item.href ? "true" : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
