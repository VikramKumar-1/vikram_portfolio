'use client';

import { useRef, useCallback } from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'pink';
}

const GLOW_COLORS = {
  cyan: {
    hoverBorder: 'hover:border-cyber-cyan/40',
    rgb: '0, 240, 255',
  },
  purple: {
    hoverBorder: 'hover:border-cyber-purple/40',
    rgb: '168, 85, 247',
  },
  pink: {
    hoverBorder: 'hover:border-cyber-pink/40',
    rgb: '255, 45, 149',
  },
} as const;

export default function GlowCard({
  children,
  className = '',
  glowColor = 'cyan',
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const colorConfig = GLOW_COLORS[glowColor] || GLOW_COLORS['cyan'];
  const { hoverBorder, rgb } = colorConfig;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glow.style.setProperty('--mouse-x', `${x}px`);
      glow.style.setProperty('--mouse-y', `${y}px`);
      glow.style.opacity = '1';
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const glow = glowRef.current;
    if (glow) {
      glow.style.opacity = '0';
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl border border-cyber-glass-border bg-cyber-glass-bg backdrop-blur-md transition-all duration-500 ${hoverBorder} ${className}`}
    >
      {/* Mouse-following radial glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(
            400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(${rgb}, 0.12),
            transparent 60%
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
