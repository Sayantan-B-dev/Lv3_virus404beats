// Single SVG icon set. Line style, currentColor, no dependencies.
// Sizes come from CSS. TSX sets names only, never shapes or colors.

interface IconProps {
  className?: string;
}

function Base({
  className,
  children,
  filled,
}: IconProps & { children: React.ReactNode; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? undefined : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <Base filled className={className}>
      <path d="M8 5v14l11-7z" />
    </Base>
  );
}

export function PauseIcon({ className }: IconProps) {
  return (
    <Base filled className={className}>
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </Base>
  );
}

export function PrevIcon({ className }: IconProps) {
  return (
    <Base filled className={className}>
      <rect x="5" y="5" width="2.5" height="14" />
      <path d="M20 5v14L9.5 12z" />
    </Base>
  );
}

export function NextIcon({ className }: IconProps) {
  return (
    <Base filled className={className}>
      <rect x="16.5" y="5" width="2.5" height="14" />
      <path d="M4 5v14l10.5-7z" />
    </Base>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </Base>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="M10.5 9.8v4.4L14.5 12z" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M4 7.5l8 5.5 8-5.5" />
    </Base>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M21 12a8 8 0 1 1-3.3-6.5L21 4l-1.6 3.4c.4.8.6 1.7.6 2.6z" />
    </Base>
  );
}
