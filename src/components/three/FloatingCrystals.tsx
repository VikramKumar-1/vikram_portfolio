"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function Crystal({
  position,
  geometry,
  color,
  speed,
  floatSpeed,
  floatIntensity,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "torus" | "sphere" | "octahedron";
  color: string;
  speed: number;
  floatSpeed: number;
  floatIntensity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += speed * 0.3 * delta;
    meshRef.current.rotation.y += speed * 0.5 * delta;
    meshRef.current.rotation.z += speed * 0.2 * delta;
  });

  const geometryNode = useMemo(() => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 1]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case "sphere":
        return <sphereGeometry args={[0.8, 32, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.9, 0]} />;
    }
  }, [geometry]);

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.3}
      floatIntensity={floatIntensity}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh ref={meshRef} position={position}>
        {geometryNode}
        <MeshTransmissionMaterial
          backside={false}
          samples={3}
          resolution={256}
          thickness={0.5}
          chromaticAberration={0.2}
          anisotropy={0.2}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color={color}
          roughness={0.1}
          toneMapped={true}
        />
      </mesh>
    </Float>
  );
}

function GlowingSphere({
  position,
  color,
  size,
}: {
  position: [number, number, number];
  color: string;
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.3 * delta;
  });

  return (
    <Float speed={2} floatIntensity={0.5} rotationIntensity={0.2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingCrystals() {
  return (
    <group>
      {/* Main large crystal - center */}
      <Crystal
        position={[0, 0, 0]}
        geometry="icosahedron"
        color="#00f0ff"
        speed={0.4}
        floatSpeed={1.5}
        floatIntensity={0.8}
      />

      {/* Torus - upper right */}
      <Crystal
        position={[2.5, 1.2, -1]}
        geometry="torus"
        color="#a855f7"
        speed={0.3}
        floatSpeed={2}
        floatIntensity={0.6}
      />

      {/* Sphere - lower left */}
      <Crystal
        position={[-2.2, -1, -0.5]}
        geometry="sphere"
        color="#ff2d95"
        speed={0.5}
        floatSpeed={1.8}
        floatIntensity={0.7}
      />

      {/* Octahedron - far back */}
      <Crystal
        position={[1.5, -1.5, -2]}
        geometry="octahedron"
        color="#00f0ff"
        speed={0.35}
        floatSpeed={1.2}
        floatIntensity={0.5}
      />

      {/* Small glowing accent spheres */}
      <GlowingSphere position={[-3, 2, -3]} color="#00f0ff" size={0.15} />
      <GlowingSphere position={[3.5, -0.5, -2]} color="#a855f7" size={0.12} />
      <GlowingSphere position={[-1, 2.5, -1.5]} color="#ff2d95" size={0.1} />
      <GlowingSphere position={[2, 2, -2.5]} color="#00f0ff" size={0.08} />
    </group>
  );
}
