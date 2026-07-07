'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollCurve() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress for a buttery drawn line effect
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-screen z-[-1] pointer-events-none mix-blend-screen opacity-90 flex justify-center">
      <svg 
        viewBox="0 0 400 1000" 
        preserveAspectRatio="none" 
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="soulGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
            <stop offset="15%" stopColor="#00f0ff" stopOpacity="1" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="85%" stopColor="#ff2d95" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff2d95" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ethereal wide aura (The "Soul Air") */}
        <motion.path
          d="M 200 0 C 380 250, 20 500, 200 750 C 380 1000, 200 1100, 200 1100"
          fill="none"
          stroke="url(#soulGradient)"
          strokeWidth="16"
          style={{ pathLength }}
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Core energetic plasma line */}
        <motion.path
          d="M 200 0 C 380 250, 20 500, 200 750 C 380 1000, 200 1100, 200 1100"
          fill="none"
          stroke="url(#soulGradient)"
          strokeWidth="6"
          style={{ pathLength }}
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Inner white hot spirit core */}
        <motion.path
          d="M 200 0 C 380 250, 20 500, 200 750 C 380 1000, 200 1100, 200 1100"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          style={{ pathLength }}
          strokeLinecap="round"
          opacity="1"
        />
      </svg>
    </div>
  );
}
