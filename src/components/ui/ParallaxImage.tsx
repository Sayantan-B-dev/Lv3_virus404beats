"use client";

import { useRef } from "react";
import { useParallax } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { SmartImage } from "./SmartImage";

interface ParallaxImageProps {
  src: string;
  alt: string;
  start?: number;
  end?: number;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  children?: React.ReactNode;
}

export function ParallaxImage({
  src,
  alt,
  start = -12,
  end = 8,
  className,
  imgClassName,
  eager,
  children,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax<HTMLDivElement>(start, end);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <SmartImage
        src={src}
        alt={alt}
        eager={eager}
        className={cn("h-[115%] w-full object-cover", imgClassName)}
      />
      {children}
    </div>
  );
}