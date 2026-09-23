// Vendored from React Bits (DavidHDev/react-bits, MIT).
// Source: src/ts-default/TextAnimations/GlitchText/GlitchText.tsx
// Adapted: inline custom properties replaced with speed and shadow
// classes in src/styles/react-bits.css. Palette matched to the brand:
// red plus off-white on transparent, never cyan on dark purple.

import { type FC } from 'react';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = ''
}) => {
  const speedClass =
    speed <= 0.35 ? 'glitch-fast' : speed <= 0.8 ? 'glitch-normal' : 'glitch-slow';
  const shadowClass = enableShadows ? 'glitch-shadows' : 'glitch-no-shadows';
  const hoverClass = enableOnHover ? 'enable-on-hover' : '';

  return (
    <div className={`glitch ${speedClass} ${shadowClass} ${hoverClass} ${className}`} data-text={children}>
      {children}
    </div>
  );
};

export default GlitchText;
