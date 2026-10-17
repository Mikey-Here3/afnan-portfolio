/**
 * FloatingOrb — React Three Fiber interactive orb
 * Responsibility: 3D animated orb that reacts to mouse position.
 * Used in: FutureVisionSection as background element.
 */
"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function OrbMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle float
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    // Follow mouse subtly
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      (mouse.x * viewport.width) / 8,
      0.05
    );
    // Slow rotation
    meshRef.current.rotation.z = t * 0.1;
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#C6AD83"
        attach="material"
        distort={0.35}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
        opacity={0.15}
        transparent
      />
    </Sphere>
  );
}

export default function FloatingOrb({ className = "" }: { className?: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 55 }}
      className={className}
      style={{ pointerEvents: "none" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={1.5} color="#C6AD83" />
      <pointLight position={[-2, -1, -1]} intensity={0.5} color="#F3F0E9" />
      <OrbMesh />
    </Canvas>
  );
}
