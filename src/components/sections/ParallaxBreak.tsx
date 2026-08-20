"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { MOTION } from "@/config/motion";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

interface ParallaxBreakProps {
  src: string;
  alt: string;
  caption: string;
  sub?: string;
}

export function ParallaxBreak({ src, alt, caption, sub }: ParallaxBreakProps) {
  const pixelRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION.pixelTransition || !pixelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pixelRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: wrapRef.current, start: "top 70%", end: "top 30%", scrub: 0.6 },
        },
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative h-[80svh] overflow-hidden">
      <ParallaxImage src={src} alt={alt} className="h-full" imgClassName="h-[130%]" eager>
        <div
          ref={pixelRef}
          aria-hidden
          className="absolute inset-0"
          style={{ imageRendering: "pixelated" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- pixel-dissolve needs raw img */}
          <img
            src={`/images/${src}`}
            alt=""
            className="h-full w-full object-cover"
            style={{ transform: "scale(18)", imageRendering: "pixelated" }}
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-10">
          <p className="text-caps text-muted">{sub}</p>
          <h2 className="text-h-l text-fg" data-reveal>
            {caption}
          </h2>
        </div>
      </ParallaxImage>
    </section>
  );
}