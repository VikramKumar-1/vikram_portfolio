'use client';

import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, useTexture } from '@react-three/drei';
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
// SUBTLE CAMERA PARALLAX
// --------------------------------------------------------
function CameraRig() {
  const { viewport } = useThree();
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, (state.mouse.x * viewport.width) / 20, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, (state.mouse.y * viewport.height) / 20, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// --------------------------------------------------------
// MAIN SCENE
// --------------------------------------------------------
export default function DeveloperSpaceScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none md:pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        dpr={[1, 1.5]} // Extremely important: prevents lag on high-resolution phones (like iPhones)
        gl={{ antialias: true, powerPreference: 'high-performance' }} // Re-enabled Anti-Aliasing to fix jagged edges
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} />
        
        <directionalLight position={[3, 3, 5]} intensity={3.5} color="#ffffff" />
        <directionalLight position={[-5, -2, -2]} intensity={1.5} color="#a0c4ff" />

        <fog attach="fog" args={['#030014', 8, 28]} />

        <Stars radius={100} depth={50} count={1200} factor={1.5} saturation={0} />

        <Suspense fallback={null}>
          <Earth />
        </Suspense>

        <CameraRig />
      </Canvas>
    </div>
  );
}
