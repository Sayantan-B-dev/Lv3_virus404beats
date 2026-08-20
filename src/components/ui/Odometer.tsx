"use client";

import { useRef } from "react";
import { useOdometer } from "@/lib/hooks";

interface OdometerProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function Odometer({ value, suffix = "", className }: OdometerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  useOdometer<HTMLSpanElement>(value);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}