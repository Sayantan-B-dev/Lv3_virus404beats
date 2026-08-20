"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText, Draggable, InertiaPlugin } from "@/lib/gsap";
import { MOTION, EASE, DUR, prefersReducedMotion } from "@/config/motion";

const reduced = () => prefersReducedMotion();

/* Scroll reveal for elements marked [data-reveal] — staggered per index */
export function useReveal<T extends HTMLElement>(stagger = 0.08, start = "top 85%") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) => n.setAttribute("data-reveal-visible", ""));
      return;
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]", el).forEach((node, i) => {
        gsap.fromTo(
          node,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DUR.base,
            ease: EASE.reference,
            delay: (i % 6) * stagger,
            scrollTrigger: { trigger: node, start },
            onComplete: () => node.setAttribute("data-reveal-visible", ""),
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, [stagger, start]);
  return ref;
}

/* Line-mask reveal: children with class .reveal-line lift their inner span */
export function useLineReveal<T extends HTMLElement>(stagger = 0.1) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = gsap.utils.toArray<HTMLElement>(".reveal-line", el);
    if (reduced()) {
      lines.forEach((l) => l.classList.add("revealed"));
      return;
    }
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(lines, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            duration: DUR.slow,
            ease: EASE.reference,
            stagger,
            className: "revealed",
          }),
      });
    }, el);
    return () => ctx.revert();
  }, [stagger]);
  return ref;
}

/* SplitText word reveal for headings */
export function useSplitReveal<T extends HTMLElement>(type: "words" | "lines" = "words") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const split = new SplitText(el, { type: "lines,words", linesClass: "reveal-line", wordsClass: "split-word" });
    const targets = type === "lines" ? split.lines : split.words;
    if (reduced()) {
      gsap.set(targets, { opacity: 1 });
      return;
    }
    gsap.set(el, { opacity: 1 });
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        yPercent: 120,
        duration: DUR.slow,
        ease: EASE.reference,
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    });
    return () => {
      ctx.revert();
      split.revert();
    };
  }, [type]);
  return ref;
}

/* Parallax translate (defaults like the reference: -12% → +8%) */
export function useParallax<T extends HTMLElement>(start = -12, end = 8) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (reduced() || !MOTION.parallax) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { yPercent: start },
        {
          yPercent: end,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
    });
    return () => ctx.revert();
  }, [start, end]);
  return ref;
}

/* Count-up odometer on enter */
export function useOdometer<T extends HTMLElement>(to: number, duration = 1.6) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || !MOTION.odometers) {
      el.textContent = String(to);
      return;
    }
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: to,
        duration,
        ease: EASE.soft,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => (el.textContent = String(Math.round(obj.v))),
      });
    }, el);
    return () => ctx.revert();
  }, [to, duration]);
  return ref;
}

/* Hero background image cycle */
export function useImageCycle<T extends HTMLElement>(count: number, interval = 4200) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (reduced()) return;
    const els = gsap.utils.toArray<HTMLElement>("[data-cycle-img]", ref.current);
    if (!els.length) return;
    const ctx = gsap.context(() => {
      let i = 0;
      const loop = () => {
        const next = (i + 1) % els.length;
        gsap.to(els[next], { opacity: 1, duration: 1.1, ease: "power2.out" });
        gsap.to(els[i], { opacity: 0, duration: 1.1, ease: "power2.in" });
        i = next;
      };
      gsap.delayedCall(interval / 1000, loop).repeat(-1);
    }, ref.current);
    return () => ctx.revert();
  }, [count, interval]);
  return ref;
}

/* Auto-scroll marquee. Track ([data-marquee-track]) must contain 2 copies of content. */
export function useMarquee<T extends HTMLElement>({
  direction = -1,
  duration = 40,
}: { direction?: 1 | -1; duration?: number } = {}) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || !MOTION.marquee) return;
    const track = el.querySelector<HTMLElement>("[data-marquee-track]");
    if (!track) return;
    const half = track.scrollWidth / 2;
    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        track,
        { x: direction === 1 ? -half : 0 },
        { x: direction === 1 ? 0 : -half, duration, ease: "none", repeat: -1 },
      );
      Draggable.create(track, {
        type: "x",
        inertia: true,
        bounds: { minX: -half, maxX: 0 },
        onPress: () => tween.pause(),
        onRelease: () => tween.resume(),
      });
    }, el);
    return () => ctx.revert();
  }, [direction, duration]);
  return ref;
}

/* Custom cursor (lerped dot + labeled bubble) */
export function useCustomCursor<T extends HTMLElement>(root?: HTMLElement | null) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (reduced() || !MOTION.customCursor) return;
    const el = ref.current;
    if (!el) return;
    document.body.classList.add("has-cursor");
    const dot = el.querySelector<HTMLElement>("[data-cursor-dot]");
    const bubble = el.querySelector<HTMLElement>("[data-cursor-bubble]");
    const label = el.querySelector<HTMLElement>("[data-cursor-label]");
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const show = () => gsap.to(el, { autoAlpha: 1, duration: 0.3 });
    const hide = () => gsap.to(el, { autoAlpha: 0, duration: 0.3 });
    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      show();
      if (dot) gsap.set(dot, { x: pos.x, y: pos.y });
    };
    const raf = () => {
      if (bubble) gsap.to(bubble, { x: pos.x, y: pos.y, duration: 0.3, ease: "power2.out" });
      requestAnimationFrame(raf);
    };
    const scope = root ?? document;
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      const txt = t.closest<HTMLElement>("[data-cursor-text]")?.getAttribute("data-cursor-text");
      if (txt && label) {
        label.textContent = txt;
        bubble?.classList.add("is-label");
      } else {
        bubble?.classList.remove("is-label");
      }
    };
    window.addEventListener("mousemove", onMove);
    scope.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", hide);
    raf();
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      scope.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", hide);
    };
  }, [root]);
  return ref;
}

/* Pin a tall panel so a dark overlay rolls over the footer (footer parallax) */
export function useFooterParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (reduced() || !MOTION.parallax) return;
    const ctx = gsap.context(() => {
      const overlay = ref.current?.querySelector<HTMLElement>("[data-footer-overlay]");
      if (!overlay || !ref.current) return;
      gsap.fromTo(
        overlay,
        { yPercent: 0 },
        {
          yPercent: -100,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 1 },
        },
      );
    }, ref.current ?? undefined);
    return () => ctx.revert();
  }, []);
  return ref;
}