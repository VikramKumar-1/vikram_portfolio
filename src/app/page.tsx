"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import SmoothScroll from "@/components/providers/SmoothScroll";

import ScrollCurve from "@/components/ui/ScrollCurve";

// Lazy-load below-fold sections — only download when user scrolls near
const About = dynamic(() => import("@/components/sections/About"), {
  ssr: false,
});
const Skills = dynamic(() => import("@/components/sections/Skills"), {
  ssr: false,
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: false,
});
const Experience = dynamic(() => import("@/components/sections/Experience"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  ssr: false,
});

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
            © {new Date().getFullYear()} John Doe. Built with{" "}
            <span className="text-cyber-cyan">Next.js</span>,{" "}
            <span className="text-cyber-purple">Three.js</span>, and{" "}
            <span className="text-cyber-pink">♥</span>
          </p>
        </div>
      </footer>
    </SmoothScroll>
  );
}
