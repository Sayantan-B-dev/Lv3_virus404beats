"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/data/content";

// Scroll position spy. Picks the last section whose top sits above the
// viewport midpoint, so short sections never share one active marker.
export default function NavState() {
  const [active, setActive] = useState<string>("#home");

  useEffect(() => {
    let raf = 0;
    const pick = () => {
      raf = 0;
      const sections = Array.from(document.querySelectorAll("section[id]")) as HTMLElement[];
      const line = window.innerHeight * 0.4;
      let current = sections[0]?.id ?? "home";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      });
      setActive(`#${current}`);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="nav" aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={active === item.href ? "active cursor-target" : "cursor-target"}
          aria-current={active === item.href ? "true" : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
