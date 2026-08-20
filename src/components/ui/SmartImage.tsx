import { cn } from "@/lib/utils";

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  eager?: boolean;
}

export function SmartImage({ src, alt, className, eager, ...rest }: SmartImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- deliberate lazy avif wrapper
    <img
      src={`/images/${src}`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={cn("select-none", className)}
      {...rest}
    />
  );
}