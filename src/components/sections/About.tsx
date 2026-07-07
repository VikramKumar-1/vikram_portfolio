'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import GlowCard from '@/components/ui/GlowCard';

const aboutCards = [
  {
    title: '🧑‍💻 Who I Am',
    content:
      "I'm a passionate full-stack developer and creative technologist who thrives at the intersection of design and engineering. With a deep love for crafting immersive digital experiences, I transform complex ideas into elegant, performant applications that users love.",
    glowColor: '#00f0ff',
    colSpan: 'md:col-span-2',
  },
  {
    title: '📍 Location & Availability',
    content: 'Based in India 🇮🇳\nOpen to remote & hybrid roles worldwide.\nCurrently available for freelance projects and full-time opportunities.',
    glowColor: '#a855f7',
    colSpan: '',
  },
  {
    title: '💡 Tech Philosophy',
    content:
      'I believe great software is invisible — it just works. I focus on performance-first architecture, accessible interfaces, and code that tells a story. Every pixel and every function should earn its place.',
    glowColor: '#ff2d95',
    colSpan: '',
  },
  {
    title: '📊 Fun Stats',
    content: '',
    glowColor: '#00f0ff',
    colSpan: 'md:col-span-2',
    stats: [
      { label: 'Projects Completed', value: '30+' },
      { label: 'Cups of Coffee', value: '2,400+' },
      { label: 'Lines of Code', value: '500K+' },
      { label: 'GitHub Commits', value: '3,000+' },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Decorative neon line divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px">
        <div className="h-full w-full bg-cyber-gradient rounded-full" />
        <div className="absolute inset-0 bg-cyber-gradient rounded-full blur-sm opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto">
        <AnimatedText
          text="About Me"
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {aboutCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={card.colSpan}
            >
              <GlowCard glowColor={card.glowColor}>
                <div className="p-6 h-full">
                  <h3 className="text-xl font-semibold text-white mb-4 font-mono">
                    {card.title}
                  </h3>

                  {card.stats ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {card.stats.map((stat, statIndex) => (
                        <div
                          key={statIndex}
                          className="text-center p-3 rounded-xl bg-white/5 border border-cyber-glass-border"
                        >
                          <p className="text-2xl font-bold text-cyber-cyan font-mono">
                            {stat.value}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {card.content}
                    </p>
                  )}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
