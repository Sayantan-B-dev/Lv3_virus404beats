"use client";

import { useEffect, useState } from "react";
import { MOTION } from "@/config/motion";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!MOTION.scrollProgress) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        setP(max > 0 ? scrollY / max : 0);
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!MOTION.scrollProgress) return null;
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[99] h-[3px] bg-transparent">
      <div className="h-full bg-accent" style={{ width: `${p * 100}%` }} />
    </div>
  );
}