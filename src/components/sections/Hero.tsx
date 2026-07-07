"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { socialLinks } from "@/lib/constants";

// 3D Scene loads after paint
const Scene = dynamic(() => import("@/components/three/DeveloperSpaceScene"), {
  ssr: false,
  loading: () => null,
});

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
          The user's bernie.png has accidental semi-transparency baked into the character (common with background removers).
          We stack the exact same image 5 times precisely on top of itself to mathematically force the pixels to become 100% solid,
          which completely stops the stars from shining through their bodies!
        */}
        <div className="relative w-full h-[50vh] z-[5] brightness-110 contrast-105 drop-shadow-[0_-10px_25px_rgba(255,255,255,0.15)]">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src="/bernie.png"
              alt="Developer and dog on Mars"
              draggable={false}
              className="absolute inset-0 w-full h-full object-contain object-bottom"
            />
          ))}
        </div>

        {/* Blend the bottom of the Mars terrain into the dark background */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#030014] to-transparent z-20" />
      </div>

      {/* LAYER 2: Editorial UI Overlay */}

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
          { label: "WhatsApp", href: "#" },
          { label: "Instagram", href: "#" },
          { label: "LinkedIn", href: socialLinks.linkedin },
          { label: "GitHub", href: socialLinks.github },
          { label: "Twitter", href: socialLinks.twitter },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </motion.div>

      {/* Right Side: Sci-Fi 'Hire Me' Satellite Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-auto"
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
          onClick={() => alert("🚀 Welcome to Vikram Kumar's Creative Space!")}
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
