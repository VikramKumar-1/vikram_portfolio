"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, AdaptiveDpr } from "@react-three/drei";
import { Suspense } from "react";
import FloatingCrystals from "./FloatingCrystals";
import ParticleField from "./ParticleField";

export default function Scene() {
  return (
    <div className="canvas-container">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f0ff" />
          <pointLight position={[-10, -5, 5]} intensity={0.5} color="#a855f7" />
          <pointLight position={[0, -10, 0]} intensity={0.3} color="#ff2d95" />

          <FloatingCrystals />
          <ParticleField />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
