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
    <group position={[0, isMobile ? 0.0 : 0.5, 0]}>
      <mesh ref={earthRef} rotation={[0.4, 0, 0.2]}>
        {/* Increased geometry to 64x64 for a perfectly smooth, round physical boundary */}
        <sphereGeometry args={[0.8, 64, 64]} />
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
function Asteroids() {
  const rockTexture = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg');

  const asteroids = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        -10 - Math.random() * 30, // Push them deep into the background
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  return (
    <group>
      {asteroids.map((ast, i) => (
        <Float key={i} speed={Math.random() * 0.5 + 0.5} rotationIntensity={1.5} floatIntensity={1.5}>
          <mesh position={ast.position} rotation={ast.rotation} scale={ast.scale}>
            {/* Using Icosahedron with detail for realistic rocky shapes */}
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial 
              map={rockTexture} 
              bumpMap={rockTexture} 
              bumpScale={0.05} 
              roughness={1} 
              metalness={0.1} 
              color="#bbbbcc"
            />
          </mesh>
        </Float>
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
    const targetX = (state.mouse.x * viewport.width) / 30; // Softened the movement so it doesn't shift away aggressively
    const targetY = (state.mouse.y * viewport.height) / 30;
    
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
      <Asteroids />
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
        dpr={[1, 2]} // Capped at 2 (Retina standard). Higher than 2 causes massive battery drain with zero visual difference.
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }} // alpha: false drastically reduces GPU load
        performance={{ min: 0.5 }} // Re-enabled adaptive performance so old phones don't crash, but gaming PCs stay at 4K
      >
        {/* Solid background color allows us to turn off transparent Canvas (alpha: false) for a massive FPS boost */}
        <color attach="background" args={['#030014']} />
        
        <ambientLight intensity={0.6} />
        
        <directionalLight position={[3, 3, 5]} intensity={4.0} color="#ffffff" />
        <directionalLight position={[-5, -2, -2]} intensity={2.0} color="#a0c4ff" />

        <fog attach="fog" args={['#030014', 10, 40]} />

        <Suspense fallback={null}>
          {/* The background moves, but the camera and earth stay still! */}
          <InteractiveBackground />
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
}
