'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import GlowCard from '@/components/ui/GlowCard';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Decorative neon line divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-px">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <AnimatedText
            text="ABOUT ME"
            className="text-4xl md:text-5xl font-black tracking-[0.2em] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
          />
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
            Initializing Developer Profile...
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-auto"
        >
          {/* Main Bio Card */}
          <motion.div variants={itemVariants} className="md:col-span-3 md:row-span-2">
            <GlowCard glowColor="cyan" className="h-full">
              <div className="p-8 md:p-10 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 scale-150 pointer-events-none text-9xl">
                  🧑‍💻
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 font-mono flex items-center gap-3">
                  <span className="text-cyan-400">&gt;</span> WHO_I_AM
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed font-sans z-10">
                  Full Stack Developer with hands-on experience building and deploying production-ready web applications using Next.js, React, TypeScript, and Laravel. Skilled across the MERN stack, Prisma ORM, and Docker, with a strong focus on clean, scalable, MVC-based engineering.
                </p>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <h4 className="text-white font-semibold mb-2 font-mono text-sm flex items-center gap-2">
                    🎓 EDUCATION
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Bachelor of Computer Applications (BCA)<br/>
                    <span className="text-cyan-400/80">Sarala Birla University</span>
                  </p>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Location / Status Card */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
            <GlowCard glowColor="purple" className="h-full">
              <div className="p-6 h-full flex flex-col items-center justify-center text-center">
                <div className="h-14 w-14 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 text-2xl">
                  📍
                </div>
                <h4 className="text-white font-semibold mb-2 font-mono">LOCATION</h4>
                <p className="text-gray-400 text-sm">Based in India 🇮🇳<br/>Available Worldwide</p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] uppercase tracking-wider font-bold font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  AVAILABLE
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Resume Download Card */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
            <a href="/vikram_fullstack.pdf" download="Vikram_Kumar_Resume.pdf" target="_blank" rel="noopener noreferrer" className="block h-full group">
              <GlowCard glowColor="purple" className="h-full transition-all duration-300 group-hover:border-purple-500/30">
                <div className="p-6 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
                  {/* Background gradient sweep on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-900/10 transition-all duration-500" />
                  
                  <div className="relative h-14 w-14 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <h4 className="relative text-white font-semibold mb-1 font-mono text-sm group-hover:text-purple-300 transition-colors">RESUME</h4>
                  <p className="relative text-gray-400 text-xs mt-1 group-hover:text-gray-300 transition-colors">
                    Click to download
                  </p>
                </div>
              </GlowCard>
            </a>
          </motion.div>



        </motion.div>
      </div>
    </section>
  );
}
