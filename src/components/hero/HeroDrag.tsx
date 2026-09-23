"use client";

import { useEffect, useRef } from "react";

// Free drag plus cursor proximity for hero decorations.
// Positions live only in memory and reset on refresh. JS writes only
// --dx/--dy offsets, which CSS appends to each item's own transform,
// so rotations and collage styling never leave the stylesheets.

const px = (v: number) => `${v.toFixed(1)}px`;

export default function HeroDrag({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const hero = root.closest(".hero") as HTMLElement | null;
    if (!hero) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-drag]"));
    const drag = new Map<string, { x: number; y: number }>();
    const drift = new Map<string, { x: number; y: number }>();
    const cursor = { x: 0, y: 0, inside: false };
    let active: {
      id: string;
      el: HTMLElement;
      pointerX: number;
      pointerY: number;
      baseX: number;
      baseY: number;
    } | null = null;
    let raf = 0;

    const depthOf = (el: HTMLElement) => {
      const raw = Number(el.getAttribute("data-depth") ?? "12");
      return Number.isFinite(raw) ? raw : 12;
    };

    const apply = (el: HTMLElement, id: string) => {
      const d = drag.get(id) ?? { x: 0, y: 0 };
      const p = drift.get(id) ?? { x: 0, y: 0 };
      el.style.setProperty("--dx", px(d.x + p.x));
      el.style.setProperty("--dy", px(d.y + p.y));
    };

    const onDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest("[data-drag]") as HTMLElement | null;
      if (!target || !root.contains(target)) return;
      const id = target.getAttribute("data-drag") ?? "";
      const base = drag.get(id) ?? { x: 0, y: 0 };
      active = { id, el: target, pointerX: e.clientX, pointerY: e.clientY, baseX: base.x, baseY: base.y };
      target.classList.add("is-dragging");
      try {
        target.setPointerCapture(e.pointerId);
      } catch {
        /* pointer capture unavailable, drag still tracks on the layer */
      }
      e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
      cursor.inside =
        cursor.x >= 0 && cursor.y >= 0 && cursor.x <= rect.width && cursor.y <= rect.height;
      if (!active) return;
      drag.set(active.id, {
        x: active.baseX + (e.clientX - active.pointerX),
        y: active.baseY + (e.clientY - active.pointerY),
      });
      apply(active.el, active.id);
    };

    const onUp = () => {
      if (!active) return;
      active.el.classList.remove("is-dragging");
      active = null;
    };

    const loop = () => {
      items.forEach((el) => {
        const id = el.getAttribute("data-drag") ?? "";
        if (active && active.id === id) return;
        const centerX = el.offsetLeft + el.offsetWidth / 2;
        const centerY = el.offsetTop + el.offsetHeight / 2;
        const depth = depthOf(el);
        let tx = 0;
        let ty = 0;
        if (cursor.inside) {
          const dx = cursor.x - centerX;
          const dy = cursor.y - centerY;
          const dist = Math.max(Math.hypot(dx, dy), 1);
          const pull = Math.min(depth, (depth * 220) / dist);
          tx = (dx / dist) * pull;
          ty = (dy / dist) * pull;
        }
        const prev = drift.get(id) ?? { x: 0, y: 0 };
        drift.set(id, { x: prev.x + (tx - prev.x) * 0.08, y: prev.y + (ty - prev.y) * 0.08 });
        apply(el, id);
      });
      raf = requestAnimationFrame(loop);
    };

    root.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    if (!calm) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="hero-draglayer" ref={rootRef}>
      {children}
    </div>
  );
}
