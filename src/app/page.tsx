"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import SmoothScroll from "@/components/providers/SmoothScroll";

import ScrollCurve from "@/components/ui/ScrollCurve";

import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollCurve />
      <Navbar />
      <main className="relative">
        <Hero />
        <div className="grid-bg">
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyber-glass-border bg-cyber-bg py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Vikram Kumar. Built with{" "}
            <span className="text-cyber-cyan">Next.js</span>,{" "}
            <span className="text-cyber-purple">Three.js</span>, and{" "}
            <span className="text-cyber-pink">♥</span>
          </p>
        </div>
      </footer>
    </SmoothScroll>
  );
}
