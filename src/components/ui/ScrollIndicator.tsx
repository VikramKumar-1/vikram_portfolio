'use client';

import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  className?: string;
}

export default function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8, ease: 'easeOut' }}
      className={`absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 ${className}`}
    >
      {/* Mouse-shaped outline */}
      <div className="relative flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5">
        {/* Scroll wheel dot */}
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-[0_0_6px_#00f0ff]"
        />
      </div>

      {/* Scroll text */}
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
        Scroll Down
      </span>

      {/* Animated chevrons */}
      <div className="flex flex-col items-center -mt-1">
        <motion.svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          animate={{ y: [0, 3, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="rgba(0, 240, 255, 0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
        <motion.svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          animate={{ y: [0, 3, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.15,
          }}
          className="-mt-1"
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="rgba(0, 240, 255, 0.25)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}
