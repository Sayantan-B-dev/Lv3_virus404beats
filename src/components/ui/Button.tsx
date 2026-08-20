import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  label: string;
  variant?: "solid" | "outline" | "accent";
  className?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({
  href,
  label,
  variant = "solid",
  className,
  external,
  onClick,
  type,
}: ButtonProps) {
  const cls = cn(
    "group inline-flex items-center justify-center gap-3 border px-6 py-4 text-caps",
    variant === "solid" && "border-fg bg-fg text-bg hover:bg-transparent hover:text-fg",
    variant === "outline" && "border-line text-fg hover:border-fg",
    variant === "accent" && "border-accent bg-accent text-accent-ink hover:bg-transparent hover:text-accent",
    "transition-colors duration-300",
    className,
  );
  const inner = (
    <>
      <span className="btn-label">
        <span>{label}</span>
        <span aria-hidden>{label}</span>
      </span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );
  if (href) {
    return external || href.startsWith("http") ? (
      <a href={href} className={cls} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}