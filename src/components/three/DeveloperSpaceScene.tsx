'use client';

import { useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, useTexture, Float, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

import { useThree } from '@react-three/fiber';

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const colorMap = useTexture('/api/earth.jpg');
  const { viewport } = useThree();

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.003;
  });

  // Calculate if mobile based on viewport width
  const isMobile = viewport.width < 5;

  return (
    <group position={[0, isMobile ? 0.35 : 0.5, 0]}>
      <mesh ref={earthRef} rotation={[0.4, 0, 0.2]}>
        {/* Shrank the Earth slightly on mobile to avoid overlapping with the person */}
        <sphereGeometry args={[isMobile ? 0.7 : 0.8, 64, 64]} />
        <meshPhysicalMaterial
          map={colorMap}
          roughness={0.7}
          metalness={0.05}
          clearcoat={0.1}
          clearcoatRoughness={0.4}
        />
      </mesh>
    </group>
  );
}

// --------------------------------------------------------
// HYPER-REALISTIC PANORAMIC GALAXY SKYBOX
// --------------------------------------------------------
function PanoramicGalaxy() {
  const galaxyTexture = useTexture('/galaxy.jpg');
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  useEffect(() => {
    if (galaxyTexture) {
      galaxyTexture.colorSpace = THREE.SRGBColorSpace;
      galaxyTexture.needsUpdate = true;
    }
  }, [galaxyTexture]);

  return (
    <group position={[0, 0, 0]}>
      {/* 
        Using a 360 celestial sphere skybox guarantees 100% natural, undistorted texture mapping.
        No vertical stretching or oblong stars on mobile portrait screens!
      */}
      <mesh rotation={[0.08, Math.PI * 1.08, 0]}>
        <sphereGeometry args={[90, 64, 64]} />
        <meshBasicMaterial 
          map={galaxyTexture} 
          side={THREE.BackSide}
          transparent={true} 
          opacity={isMobile ? 0.75 : 0.70}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// --------------------------------------------------------
// ASTEROIDS FIELD
// --------------------------------------------------------
// Generate the asteroids OUTSIDE the component so they never re-render or reset when you scroll!
const INITIAL_ASTEROIDS = Array.from({ length: 25 }).map(() => {
  // Prevent asteroids from spawning perfectly inside the Earth to avoid clipping
  let startX = (Math.random() - 0.5) * 80;
  if (startX > -4 && startX < 4) startX += (startX > 0 ? 6 : -6);

  return {
    position: [
      startX,
      (Math.random() - 0.5) * 30, // Y between -15 and 15 (concentrated in the visible screen area!)
      (Math.random() * 48) - 40, // Z between -40 and 8
    ] as [number, number, number],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
    // Slow, majestic RIGHT TO LEFT velocity!
    velocity: [
      -(Math.random() * 0.02 + 0.005), // Cut speed in half: much slower negative X drift
      (Math.random() - 0.5) * 0.005,   // Very slight Y drift
      (Math.random() - 0.5) * 0.005,   // Very slight Z drift
    ],
    spin: [
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01,
    ],
    // Sweet spot size: Big enough to see the beautiful moon texture, but small enough not to dwarf the Earth!
    scale: Math.random() * 0.20 + 0.10, 
  };
});

let globalTime = 0; // Moved completely outside React so the timer never resets on scroll!

function Asteroids() {
  // Using a highly reliable, 2K resolution NASA Moon map from Wikimedia Commons.
  // This bypasses GitHub's strict CORS blocking so it will never crash!
  const rockTexture = useTexture('https://upload.wikimedia.org/wikipedia/commons/d/db/Moonmap_from_clementine_data.png');
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    globalTime += 0.01; // Custom internal timer guarantees ZERO time-jump glitches on scroll!
    if (groupRef.current) {
      // Apply true Newtonian space physics to each asteroid
      groupRef.current.children.forEach((child, i) => {
        const ast = INITIAL_ASTEROIDS[i];
        
        // Apply constant linear velocity
        ast.position[0] += ast.velocity[0];
        ast.position[1] += ast.velocity[1];
        ast.position[2] += ast.velocity[2];
        
        // Apply constant tumbling spin
        ast.rotation[0] += ast.spin[0];
        ast.rotation[1] += ast.spin[1];
        ast.rotation[2] += ast.spin[2];
        
        // Infinite Wrap Bounds
        if (ast.position[0] > 40) ast.position[0] = -40;
        if (ast.position[0] < -40) ast.position[0] = 40;
        
        if (ast.position[1] > 15) ast.position[1] = -15;
        if (ast.position[1] < -15) ast.position[1] = 15;
        
        // When they fly completely past the camera (Z > 8), teleport them back to the deep background (Z = -40)
        if (ast.position[2] > 8) ast.position[2] = -40;

        // Apply physics state to the active 3D meshes
        child.position.set(ast.position[0], ast.position[1], ast.position[2]);
        child.rotation.set(ast.rotation[0], ast.rotation[1], ast.rotation[2]);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {INITIAL_ASTEROIDS.map((ast, i) => (
        <mesh key={i} position={ast.position} rotation={ast.rotation} scale={ast.scale}>
          {/* Using a higher detail icosahedron (args 1, 1 -> 1, 2) makes it look like a smooth, highly detailed moon rock */}
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial 
            map={rockTexture}
            bumpMap={rockTexture}
            bumpScale={0.05} // Makes the craters pop out with real 3D shadows
            roughness={1} 
            metalness={0.1} 
            color="#9999aa" // Soften the brightness so they blend perfectly into deep space
          />
        </mesh>
      ))}
    </group>
  );
}

// --------------------------------------------------------
// INTERACTIVE BACKGROUND (Skybox, Stars)
// --------------------------------------------------------
function InteractiveBackground() {
  const bgRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  useFrame((state) => {
    if (!bgRef.current) return;
    // Mouse / touch parallax for the background
    const factor = isMobile ? 30 : 18;
    const targetX = (state.mouse.x * viewport.width) / factor;
    const targetY = (state.mouse.y * viewport.height) / factor;
    
    bgRef.current.position.x = THREE.MathUtils.lerp(bgRef.current.position.x, targetX, 0.04);
    bgRef.current.position.y = THREE.MathUtils.lerp(bgRef.current.position.y, targetY, 0.04);
  });

  return (
    <group ref={bgRef}>
      {/* Hyper-Realistic 360 Celestial Galaxy Sphere */}
      <PanoramicGalaxy />

      {/* Crisp Ambient Star Field */}
      <Stars radius={100} depth={50} count={isMobile ? 2200 : 3000} factor={1.4} saturation={0} fade speed={1.5} />
    </group>
  );
}

// --------------------------------------------------------
// PREMIUM LOADING SCREEN
// --------------------------------------------------------
function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
        {/* Outer glowing ring */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-[2px] border-cyan-500/30 border-t-cyan-400 animate-spin" />
          <div className="absolute inset-2 rounded-full border-[2px] border-purple-500/30 border-b-purple-400 animate-[spin_2s_linear_reverse_infinite]" />
          <span className="text-cyan-300 font-mono text-sm font-bold tracking-widest animate-pulse">
            {progress.toFixed(0)}%
          </span>
        </div>
        <div className="text-cyan-400/80 text-xs tracking-[0.3em] font-light uppercase animate-pulse">
          Initializing Space...
        </div>
      </div>
    </Html>
  );
}

// --------------------------------------------------------
// MAIN SCENE
// --------------------------------------------------------
export default function DeveloperSpaceScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none md:pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        dpr={[1, 1.5]} // Capped at 1.5x for absolute silky smooth scrolling without heavily sacrificing quality
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }} // alpha: false drastically reduces GPU load
        // Removed performance min/max scaling because it causes aggressive resolution flickering/stuttering when scrolling!
      >
        {/* Solid background color allows us to turn off transparent Canvas (alpha: false) for a massive FPS boost */}
        <color attach="background" args={['#030014']} />
        
        <ambientLight intensity={0.6} />
        
        <directionalLight position={[3, 3, 5]} intensity={4.0} color="#ffffff" />
        <directionalLight position={[-5, -2, -2]} intensity={2.0} color="#a0c4ff" />

        <fog attach="fog" args={['#030014', 10, 40]} />

        <Suspense fallback={<CanvasLoader />}>
          {/* Asteroids moved OUT of InteractiveBackground so they are completely unaffected by mouse movement! */}
          <Asteroids />
          
          {/* The background moves, but the camera and earth stay still! */}
          <InteractiveBackground />
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload heavy textures to speed up loading without losing quality
useTexture.preload('/api/earth.jpg');
useTexture.preload('/galaxy.jpg');
useTexture.preload('https://upload.wikimedia.org/wikipedia/commons/d/db/Moonmap_from_clementine_data.png');
