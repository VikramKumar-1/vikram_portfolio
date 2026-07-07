'use client';

import { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import { skills } from '@/lib/constants';

type GlowCardColor = 'cyan' | 'pink' | 'purple';
const glowColors: GlowCardColor[] = ['cyan', 'purple', 'pink', 'cyan', 'purple'];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

import { 
  SiJavascript, SiTypescript, SiPhp, SiNextdotjs, SiReact, 
  SiHtml5, SiCss, SiTailwindcss, SiLaravel, SiNodedotjs, 
  SiExpress, SiMysql, SiPrisma, SiPostgresql, SiMongodb, 
  SiDocker, SiVercel, SiGit, SiGithub, SiPostman 
} from 'react-icons/si';

const iconMap: Record<string, import('react-icons').IconType> = {
  "JavaScript (ES6+)": SiJavascript,
  "TypeScript": SiTypescript,
  "PHP": SiPhp,
  "Next.js": SiNextdotjs,
  "React.js": SiReact,
  "HTML5": SiHtml5,
  "CSS3": SiCss,
  "Tailwind CSS": SiTailwindcss,
  "Laravel": SiLaravel,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "MySQL": SiMysql,
  "Prisma ORM": SiPrisma,
  "PostgreSQL": SiPostgresql,
  "MongoDB": SiMongodb,
  "Docker": SiDocker,
  "Vercel": SiVercel,
  "Git": SiGit,
  "GitHub": SiGithub,
  "Postman": SiPostman
};

import { FaTerminal, FaLaptopCode, FaServer, FaDatabase, FaRocket } from 'react-icons/fa';

const categoryIconMap: Record<string, import('react-icons').IconType> = {
  "Languages": FaTerminal,
  "Frontend": FaLaptopCode,
  "Backend": FaServer,
  "Database": FaDatabase,
  "DevOps & Tools": FaRocket,
};

const colorMap: Record<string, string> = {
  "JavaScript (ES6+)": "#F7DF1E",
  "TypeScript": "#3178C6",
  "PHP": "#777BB4",
  "Next.js": "#ffffff",
  "React.js": "#61DAFB",
  "HTML5": "#E34F26",
  "CSS3": "#1572B6",
  "Tailwind CSS": "#06B6D4",
  "Laravel": "#FF2D20",
  "Node.js": "#339933",
  "Express.js": "#ffffff",
  "MySQL": "#4479A1",
  "Prisma ORM": "#2D3748",
  "PostgreSQL": "#4169E1",
  "MongoDB": "#47A248",
  "Docker": "#2496ED",
  "Vercel": "#ffffff",
  "Git": "#F05032",
  "GitHub": "#ffffff",
  "Postman": "#FF6C37"
};

function SkillCard3D({
  skill,
  glowColor,
}: {
  skill: (typeof skills)[0];
  glowColor: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const tiltEl = tiltRef.current;
      const glowEl = glowRef.current;
      if (!card || !tiltEl || !glowEl) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt degrees (max 15 deg)
      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;

      // Apply tilt to the inner 3D container
      tiltEl.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Move radial glow
      glowEl.style.setProperty('--mouse-x', `${x}px`);
      glowEl.style.setProperty('--mouse-y', `${y}px`);
      glowEl.style.opacity = '1';
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const tiltEl = tiltRef.current;
    const glowEl = glowRef.current;
    if (tiltEl) {
      tiltEl.style.transform = `rotateX(0deg) rotateY(0deg)`;
    }
    if (glowEl) {
      glowEl.style.opacity = '0';
    }
  }, []);

  // Determine RGB for glow
  const isCyan = glowColor === '#00f0ff';
  const isPurple = glowColor === '#a855f7';
  const rgb = isCyan ? '0, 240, 255' : isPurple ? '168, 85, 247' : '255, 45, 149';
  const hoverBorder = isCyan
    ? 'group-hover:border-cyber-cyan/40'
    : isPurple
    ? 'group-hover:border-cyber-purple/40'
    : 'group-hover:border-cyber-pink/40';

  const CategoryIcon = categoryIconMap[skill.category];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full w-full rounded-2xl"
      style={{ perspective: '1200px' }}
    >
      <div
        ref={tiltRef}
        className={`relative h-full w-full rounded-2xl border border-cyber-glass-border bg-[#0a0a0a]/80 backdrop-blur-xl transition-transform duration-300 ease-out overflow-hidden ${hoverBorder}`}
        style={{ transformStyle: 'preserve-3d', transform: 'rotateX(0deg) rotateY(0deg)' }}
      >
        {/* Mouse-following radial glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(
              400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
              rgba(${rgb}, 0.15),
              transparent 60%
            )`,
            transform: 'translateZ(-1px)', // Push behind content
          }}
        />

        {/* 3D Floating Content */}
        <div 
          className="p-8 h-full flex flex-col"
          style={{ transform: 'translateZ(40px)' }} // Floats 40px above card surface!
        >
          <div className="flex flex-col items-center gap-4 mb-8 text-center">
            <span 
              className="text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] text-gray-200" 
              style={{ transform: 'translateZ(30px)' }} // Floats even higher
            >
              {CategoryIcon ? <CategoryIcon /> : skill.icon}
            </span>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-mono tracking-widest uppercase drop-shadow-md" style={{ transform: 'translateZ(20px)' }}>
              {skill.category}
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-auto" style={{ transformStyle: 'preserve-3d' }}>
            {skill.items.map((item) => {
              const Icon = iconMap[item];
              const brandColor = colorMap[item] || "#00f0ff";
              
              // We use CSS variables to handle the dynamic hover styles cleanly
              return (
                <span
                  key={item}
                  className="
                    peer relative inline-flex items-center gap-3 px-6 py-3 text-base md:text-lg font-bold rounded-xl
                    bg-[#111] text-gray-300 transition-all duration-200 ease-out
                    hover:text-white cursor-default
                  "
                  style={{
                    transform: 'translateZ(30px)', // Float up
                    borderTop: `1px solid rgba(255,255,255,0.15)`,
                    borderBottom: `1px solid rgba(0,0,0,0.8)`,
                    // 3D physical thickness using box-shadow
                    boxShadow: `
                      0 6px 0 ${brandColor}40, 
                      0 12px 24px -6px rgba(0,0,0,0.8)
                    `,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    // "Press down" effect + intense glow
                    el.style.transform = 'translateZ(25px) translateY(6px)';
                    el.style.boxShadow = `
                      0 0px 0 ${brandColor}40, 
                      0 0px 30px 0px ${brandColor}70,
                      inset 0 0 12px ${brandColor}30
                    `;
                    el.style.color = brandColor;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    // Reset to unpressed state
                    el.style.transform = 'translateZ(30px) translateY(0px)';
                    el.style.boxShadow = `
                      0 6px 0 ${brandColor}40, 
                      0 12px 24px -6px rgba(0,0,0,0.8)
                    `;
                    el.style.color = '#D1D5DB'; // text-gray-300
                  }}
                >
                  {Icon && <Icon className="w-6 h-6 md:w-7 md:h-7 transition-colors" style={{ color: brandColor }} />}
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedText
          text="Skills & Technologies"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div key={skill.category} variants={cardVariants} className="h-full">
              <SkillCard3D skill={skill} glowColor={glowColors[index % glowColors.length]} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
