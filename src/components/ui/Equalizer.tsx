"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Equalizer({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("eq", className)}>
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="eq-bar" />
      ))}
    </span>
  );
}