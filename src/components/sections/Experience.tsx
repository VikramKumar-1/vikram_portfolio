'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import GlowCard from '@/components/ui/GlowCard';
import { experiences } from '@/lib/constants';

const glowColors = ['#00f0ff', '#a855f7', '#ff2d95'];

function TimelineEntry({
  experience,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  const entryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(entryRef, { once: true, margin: '-50px' });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={entryRef}
      className={`
        relative flex items-center w-full
        md:justify-${isEven ? 'start' : 'end'}
      `}
    >
      {/* Desktop layout: alternating sides */}
      <motion.div
        initial={{
          opacity: 0,
          x: isEven ? -60 : 60,
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: isEven ? -60 : 60 }
        }
        transition={{
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.1,
        }}
        className={`
          w-full md:w-[calc(50%-2rem)]
          ${isEven ? 'md:mr-auto' : 'md:ml-auto'}
        `}
      >
        <GlowCard glowColor={glowColors[index % glowColors.length]}>
          <div className="p-6">
            {/* Year badge */}
            <span
              className="
                inline-block px-3 py-1 text-sm font-bold rounded-full
                bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30
                font-mono mb-3
              "
            >
              {experience.year}
            </span>

            <h3 className="text-xl font-bold text-white mb-1 font-mono">
              {experience.role}
            </h3>
            <p className="text-cyber-purple font-medium mb-3">
              {experience.company}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {experience.description}
            </p>
          </div>
        </GlowCard>
      </motion.div>

      {/* Timeline dot — only visible on md+ */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="
          hidden md:block absolute left-1/2 -translate-x-1/2
          w-4 h-4 rounded-full z-10
          bg-cyber-cyan
          shadow-[0_0_15px_rgba(0,240,255,0.6),0_0_30px_rgba(0,240,255,0.3)]
        "
      >
        {/* Inner dot */}
        <div className="absolute inset-1 rounded-full bg-cyber-bg" />
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <AnimatedText
          text="Experience"
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        />

        <div className="relative">
          {/* Glowing vertical timeline line — desktop only */}
          <div
            className="
              hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0
              w-0.5
            "
          >
            <div className="h-full w-full bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-pink rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-pink rounded-full blur-sm opacity-50" />
          </div>

          {/* Mobile: subtle left line */}
          <div
            className="
              block md:hidden absolute left-4 top-0 bottom-0 w-0.5
            "
          >
            <div className="h-full w-full bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-pink rounded-full opacity-40" />
          </div>

          {/* Timeline entries */}
          <div className="flex flex-col gap-12 pl-10 md:pl-0">
            {experiences.map((experience, index) => (
              <TimelineEntry
                key={experience.year + experience.company}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
