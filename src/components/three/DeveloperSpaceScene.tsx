'use client';

import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// 3D EARTH — Small, centered, slowly spinning
// --------------------------------------------------------
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const colorMap = useTexture('/api/earth.jpg');

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.003;
  });

  return (
    <group position={[0, 0.9, 0]}>
      {/* Added an initial tilt to make the 3D rotation look more realistic (like Earth's actual axis) */}
      <mesh ref={earthRef} rotation={[0.4, 0, 0.2]}>
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
// SUBTLE CAMERA PARALLAX (mouse only, no orbit)
// --------------------------------------------------------
function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    const tx = mouse.current.x * 0.4;
    const ty = mouse.current.y * 0.3 + 0.5;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, tx, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, ty, 0.02);
    state.camera.lookAt(0, 0.4, 0);
  });

  return null;
}

// --------------------------------------------------------
// MAIN SCENE
// --------------------------------------------------------
export default function DeveloperSpaceScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas camera={{ position: [0, 0.5, 6], fov: 45 }}>
        <ambientLight intensity={0.4} />
        
        {/* Main 'Sun' light hitting the Earth directly from the front-right */}
        <directionalLight position={[3, 3, 5]} intensity={3.5} color="#ffffff" />
        
        {/* Soft, cool blue fill light from the bottom-left to gently illuminate the dark side */}
        <directionalLight position={[-5, -2, -2]} intensity={1.5} color="#a0c4ff" />

        <fog attach="fog" args={['#030014', 8, 28]} />

        <Stars radius={100} depth={50} count={2500} factor={1.2} saturation={0} />

        <Suspense fallback={null}>
          <Earth />
        </Suspense>

        <CameraRig />
      </Canvas>
    </div>
  );
}
