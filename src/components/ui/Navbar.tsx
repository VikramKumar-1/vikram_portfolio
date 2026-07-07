'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
] as const;

type NavLinkId = (typeof NAV_LINKS)[number]['id'];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<NavLinkId>('home');
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Scroll direction detection — hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < 80) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY.current + 5) {
          setIsVisible(false);
          setIsMobileMenuOpen(false);
        } else if (currentScrollY < lastScrollY.current - 5) {
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to track active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mt-3 rounded-2xl border border-cyber-glass-border bg-cyber-bg/80 px-6 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="group relative flex items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyber-cyan/10 font-mono text-sm font-bold text-cyber-cyan transition-colors duration-300 group-hover:bg-cyber-cyan/20">
                {'</>'}
              </div>
              <span className="hidden font-mono text-lg font-semibold tracking-tight text-white sm:block">
                Portfolio
              </span>
            </button>

            {/* Desktop nav links */}
            <ul className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`relative rounded-lg px-4 py-2 font-mono text-sm transition-colors duration-300 ${
                      activeSection === id
                        ? 'text-cyber-cyan'
                        : 'text-white/60 hover:text-cyber-cyan'
                    }`}
                  >
                    {label}
                    {activeSection === id && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00f0ff]"
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-white/5 md:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="flex w-5 flex-col gap-1.5">
                <motion.span
                  animate={
                    isMobileMenuOpen
                      ? { rotate: 45, y: 5 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2 }}
                  className="h-0.5 w-full rounded-full bg-white/80"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className="h-0.5 w-full rounded-full bg-white/80"
                />
                <motion.span
                  animate={
                    isMobileMenuOpen
                      ? { rotate: -45, y: -7 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2 }}
                  className="h-0.5 w-full rounded-full bg-white/80"
                />
              </div>
            </button>
          </div>

          {/* Neon gradient bottom border */}
          <div className="absolute bottom-0 left-4 right-4 h-px bg-cyber-gradient opacity-40" />
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute left-4 right-4 mt-2 overflow-hidden rounded-2xl border border-cyber-glass-border bg-cyber-bg/95 backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col p-3">
                {NAV_LINKS.map(({ label, id }, index) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <button
                      onClick={() => scrollToSection(id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-mono text-sm transition-colors duration-200 ${
                        activeSection === id
                          ? 'bg-cyber-cyan/10 text-cyber-cyan'
                          : 'text-white/60 hover:bg-white/5 hover:text-cyber-cyan'
                      }`}
                    >
                      {activeSection === id && (
                        <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00f0ff]" />
                      )}
                      {label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
