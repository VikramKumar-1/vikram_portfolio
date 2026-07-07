'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

const wordHidden = {
  opacity: 0,
  y: 24,
};

const wordVisible = {
  opacity: 1,
  y: 0,
};

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, {
    once,
    margin: '0px 0px -15% 0px',
  });

  const words = text.split(' ');

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={wordHidden}
            animate={isInView ? wordVisible : wordHidden}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.05,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
          >
            {word}
            {/* Preserve spaces between words */}
            {index < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
