"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { socialLinks } from "@/lib/constants";

// 3D Scene loads after paint
const Scene = dynamic(() => import("@/components/three/DeveloperSpaceScene"), {
  ssr: false,
  loading: () => null,
});

const playShockSound = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const msg = new SpeechSynthesisUtterance('Faaaaaaaaa!');
    // Tweak pitch and rate to make it sound like a shocked human reaction
    msg.pitch = 1.8;
    msg.rate = 0.7;
    msg.volume = 1;
    
    window.speechSynthesis.speak(msg);
  }
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-[#030014] select-none"
    >
      {/* No background text — completely clean space */}

      {/* LAYER 1: 3D Three.js Canvas (Earth + Stars) */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Scene />
      </div>

      {/* LAYER 1: Foreground — Boy & Dog on Mars */}
      <div className="absolute inset-0 z-[5] pointer-events-none flex items-end justify-center overflow-hidden">
        
        {/* 
          Restored height to 50vh on mobile so the person and dog are big and prominent, 
          while pushing the Earth higher in the 3D scene to prevent overlapping. 
        */}
        <div className="relative w-full h-[50vh] md:h-[50vh] z-[5] brightness-105 contrast-105">
          <Image
            src="/bernie.png"
            alt="Developer and dog on Mars"
            fill
            priority
            unoptimized={true}
            sizes="100vw"
            draggable={false}
            className="object-cover md:object-contain object-bottom drop-shadow-[0_0_1px_rgba(0,0,0,1)]"
          />
        </div>

        {/* Blend the bottom of the Mars terrain into the dark background */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-t from-[#030014] to-transparent z-20" />
      </div>



      {/* LAYER 2: Editorial UI Overlay */}

      {/* Top Left: Name & Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-24 md:top-32 left-6 md:left-8 z-20 pointer-events-auto"
      >
        <h1 className="text-2xl md:text-3xl font-black tracking-[0.2em] text-white/40 uppercase font-sans leading-tight">
          Vikram<br />Kumar
        </h1>
        <p className="mt-2 text-[10px] md:text-xs text-cyan-400/60 font-mono tracking-[0.3em] uppercase">
          Full Stack Developer
        </p>
      </motion.div>

      {/* Left: SOCIALS */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute left-6 md:left-8 bottom-28 z-20 hidden md:flex flex-col gap-2 font-sans text-[13px] text-gray-300/90"
      >
        <span className="mb-1.5 text-[12px] font-bold tracking-[0.2em] text-white/90">
          SOCIALS
        </span>
        {[
          { 
            label: "LinkedIn", 
            href: socialLinks.linkedin,
            icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          },
          { 
            label: "GitHub", 
            href: socialLinks.github,
            icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
          },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors duration-200 group/link w-max"
          >
            <span className="text-gray-500 group-hover/link:text-cyan-400 transition-colors">
              {link.icon}
            </span>
            <span className="relative">
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-cyan-400 transition-all duration-300 ease-out group-hover/link:w-full" />
            </span>
          </a>
        ))}
      </motion.div>

      {/* Right Side: Sci-Fi 'Hire Me' Satellite Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        // Moved to top-right on mobile to avoid overlapping the Earth in the center
        className="absolute right-6 md:right-8 top-24 md:top-1/2 md:-translate-y-1/2 z-20 pointer-events-auto"
      >
        <a 
          href="#contact"
          className="group relative flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full bg-cyan-900/20 border border-cyan-400/30 backdrop-blur-md transition-all duration-500 hover:bg-cyan-500/20 hover:scale-110 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
        >
          <span className="text-cyan-300 font-bold tracking-[0.2em] text-[10px] md:text-xs text-center leading-tight transition-transform duration-500">
            HIRE<br/>ME
          </span>
          {/* Rotating outer radar/satellite ring */}
          <div className="absolute inset-0 rounded-full border-[1.5px] border-cyan-400/50 animate-[spin_6s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
          {/* Inner pulsing ring */}
          <div className="absolute inset-2 rounded-full border border-cyan-200/30 animate-ping opacity-50" style={{ animationDuration: '3s' }} />
        </a>
      </motion.div>

      {/* Bottom Bar */}
      <div className="absolute bottom-5 md:bottom-6 left-5 md:left-8 right-5 md:right-8 z-20 flex items-end justify-between pointer-events-auto">
        {/* Don't press! */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          onClick={() => {
            playShockSound();
            alert("🚀 Warning: Critical system failure imminent... just kidding!");
          }}
          className="group flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-[13px] text-gray-300 backdrop-blur-md transition-all duration-300 hover:border-orange-400/60 hover:bg-black/70 hover:text-white"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400" />
          </span>
          Don&apos;t press!
        </motion.button>

        {/* Scroll */}
        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="hidden sm:flex flex-col items-center gap-1.5 cursor-pointer group"
        >
          <div className="flex h-8 w-[18px] items-start justify-center rounded-full border-[1.5px] border-gray-400/60 p-[3px] transition-colors group-hover:border-white/80">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-[3px] rounded-full bg-white/80"
            />
          </div>
          <span className="text-[10px] font-medium tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">
            SCROLL
          </span>
        </motion.a>

        {/* Contact */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="group flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-[13px] text-gray-300 backdrop-blur-md transition-all duration-300 hover:border-green-400/60 hover:bg-black/70 hover:text-white"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="hidden sm:inline">Need a project or a developer: vikuraj3337@gmail.com</span>
          <span className="sm:hidden">Contact me</span>
        </motion.a>
      </div>

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#030014] to-transparent z-10" />
    </section>
  );
}
