// Vendored from React Bits (DavidHDev/react-bits, MIT).
// Source: src/ts-default/Animations/Magnet/Magnet.tsx
// Adapted: static positioning and will-change moved to
// src/styles/react-bits.css. The pointer driven translate stays inline
// inside this file under the documented vendored exception, because the
// values are computed per mousemove and cannot be predefined classes.

import React, { useState, useEffect, useRef, type ReactNode, type HTMLAttributes } from 'react';

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  wrapperClassName?: string;
  innerClassName?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return;

      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true);
        const offsetX = (e.clientX - centerX) / magnetStrength;
        const offsetY = (e.clientY - centerY) / magnetStrength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, disabled, magnetStrength]);

  const offset = disabled ? { x: 0, y: 0 } : position;

  return (
    <div
      ref={magnetRef}
      className={`magnet-wrap ${wrapperClassName}`}
      {...props}
    >
      <div
        className={`magnet-inner ${isActive ? 'is-active' : ''} ${innerClassName}`}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
