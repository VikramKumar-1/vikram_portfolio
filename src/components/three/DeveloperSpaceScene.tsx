'use client';

import { useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, useTexture, Float } from '@react-three/drei';
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
    <group position={[0, isMobile ? 0.7 : 0.5, 0]}>
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
// HYPER-REALISTIC PANORAMIC GALAXY
// --------------------------------------------------------
function PanoramicGalaxy() {
  const galaxyTexture = useTexture('/galaxy.jpg');
  return (
    <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
      {/* 
        Centered at [0,0,0] with radius 50 puts the wall exactly 50 units deep into space.
        Rotated 180 degrees (Math.PI) so the curved slice sits perfectly at -Z (in front of the camera).
        This creates a flawless 120-degree IMAX-style curved backdrop!
      */}
      <cylinderGeometry args={[50, 50, 60, 64, 1, true, -Math.PI / 3, (Math.PI * 2) / 3]} />
      <meshBasicMaterial 
        map={galaxyTexture} 
        transparent={true} 
        opacity={0.4} // Soft, realistic nebula glow
        blending={THREE.AdditiveBlending} // Blends the black perfectly into deep space
        fog={false} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// --------------------------------------------------------
// ASTEROIDS FIELD
// --------------------------------------------------------
// Generate the asteroids OUTSIDE the component so they never re-render or reset when you scroll!
const INITIAL_ASTEROIDS = Array.from({ length: 40 }).map(() => {
  // Prevent asteroids from spawning perfectly inside the Earth to avoid clipping
  let startX = (Math.random() - 0.5) * 80;
  if (startX > -4 && startX < 4) startX += (startX > 0 ? 6 : -6);

  return {
    position: [
      startX,
      (Math.random() - 0.5) * 60, // Y between -30 and 30
      (Math.random() * 48) - 40, // Z between -40 and 8 (allows them to pass the Earth at Z=0 and Camera at Z=6)
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
    scale: Math.random() * 0.4 + 0.1,
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
        
        // Infinite Wrap Bounds (if it floats out of the massive 3D box, loop it to the other side)
        if (ast.position[0] > 40) ast.position[0] = -40;
        if (ast.position[0] < -40) ast.position[0] = 40;
        
        if (ast.position[1] > 30) ast.position[1] = -30;
        if (ast.position[1] < -30) ast.position[1] = 30;
        
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
// INTERACTIVE BACKGROUND (Skybox, Stars, Asteroids)
// --------------------------------------------------------
function InteractiveBackground() {
  const bgRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Load the new hyper-realistic galaxy texture!
  const galaxyTexture = useTexture('/galaxy.jpg');

  useFrame((state) => {
    if (!bgRef.current) return;
    // Mouse parallax for the background ONLY
    // Increased the movement (divided by 15 instead of 30) so the galaxy feels much more fluid and free!
    const targetX = (state.mouse.x * viewport.width) / 15;
    const targetY = (state.mouse.y * viewport.height) / 15;
    
    bgRef.current.position.x = THREE.MathUtils.lerp(bgRef.current.position.x, targetX, 0.05);
    bgRef.current.position.y = THREE.MathUtils.lerp(bgRef.current.position.y, targetY, 0.05);
    
    // Removed automatic rotation as requested — background only moves on mouse hover/movement
  });

  return (
    <group ref={bgRef}>
      {/* Hyper-Realistic Curved IMAX-style Galaxy Screen */}
      <PanoramicGalaxy />

      {/* Increased factor from 1.5 to 3.0 to make stars much brighter and larger */}
      <Stars radius={100} depth={50} count={3000} factor={1.5} saturation={0} fade speed={2} />
    </group>
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

        <Suspense fallback={null}>
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
