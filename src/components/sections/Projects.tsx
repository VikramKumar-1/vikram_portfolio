'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import AnimatedText from '@/components/ui/AnimatedText';
import GlowCard from '@/components/ui/GlowCard';
import MagneticButton from '@/components/ui/MagneticButton';
import { projects } from '@/lib/constants';

type GlowCardColor = 'cyan' | 'pink' | 'purple';
const glowColors: GlowCardColor[] = ['cyan', 'purple', 'pink', 'cyan'];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

interface TiltState {
  rotateX: number;
  rotateY: number;
}

function ProjectCard({
  project,
  glowColor,
}: {
  project: (typeof projects)[number];
  glowColor: GlowCardColor;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const tiltEl = tiltRef.current;
      if (!card || !tiltEl) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      tiltEl.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    const tiltEl = tiltRef.current;
    if (tiltEl) {
      tiltEl.style.transform = `rotateX(0deg) rotateY(0deg)`;
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-[550px] w-full transition-transform duration-200 ease-out"
      style={{
        perspective: '1000px',
      }}
    >
      <div
        ref={tiltRef}
        className="h-full w-full transition-transform duration-200 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(0deg) rotateY(0deg)',
        }}
      >
        <GlowCard glowColor={glowColor}>
          <div className="p-0 h-full flex flex-col">
            {/* Project Image */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-t-xl bg-black border-b border-cyber-glass-border shrink-0">
              {/* Fallback/Overlay Grid */}
              <div
                className="absolute inset-0 opacity-20 z-0"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              
              {/* Actual Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover z-10 transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />

              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1 overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-2 font-mono shrink-0 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 shrink-0">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      px-2.5 py-1 text-xs font-medium rounded-full
                      border border-cyber-glass-border bg-white/5
                      text-cyber-cyan
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 mt-auto">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <MagneticButton>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                        bg-cyber-gradient text-white text-sm font-semibold
                        transition-shadow duration-300
                        hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]
                      "
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                      Visit Website
                    </a>
                  </MagneticButton>
                )}

                {project.githubUrl && project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                      border border-cyber-glass-border bg-white/5
                      text-gray-300 text-sm font-semibold
                      transition-all duration-300
                      hover:border-cyber-purple hover:text-cyber-purple
                      hover:bg-cyber-purple/10
                    "
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedText
          text="Featured Projects"
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={project.title} variants={cardVariants} className="h-full">
              <ProjectCard
                project={project}
                glowColor={glowColors[index % glowColors.length]}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
