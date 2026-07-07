'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const SPRING_CONFIG = { type: 'spring' as const, stiffness: 150, damping: 15, mass: 0.1 };

export default function MagneticButton({
  children,
  className = '',
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, SPRING_CONFIG);
  const y = useSpring(0, SPRING_CONFIG);

  // Subtle inner content offset for depth
  const contentX = useTransform(x, (val) => val * 0.3);
  const contentY = useTransform(y, (val) => val * 0.3);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.35;
      const deltaY = (e.clientY - centerY) * 0.35;

      x.set(deltaX);
      y.set(deltaY);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.div
      ref={buttonRef}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`group relative inline-block ${className}`}
    >
      {/* Inner content with slight magnetic offset */}
      <motion.div
        style={{ x: contentX, y: contentY }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
