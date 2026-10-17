
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function SignatureText() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    const { pointer } = state;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.12,
      0.035
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.06,
      0.035
    );
  });

  return (
    <Float speed={0.7} rotationIntensity={0.04} floatIntensity={0.12}>
      <group ref={group} position={[0, 0, 0]}>
        {/* Dark offset layers create dimensional depth */}
        <Text
          position={[0.035, -0.035, -0.12]}
          fontSize={1.15}
          letterSpacing={-0.065}
          anchorX="center"
          anchorY="middle"
          color="#5A452A"
        >
          AFNAN
          <meshStandardMaterial
            color="#5A452A"
            metalness={0.8}
            roughness={0.35}
          />
        </Text>

        <Text
          fontSize={1.15}
          letterSpacing={-0.065}
          anchorX="center"
          anchorY="middle"
          color="#D6C19A"
        >
          AFNAN
          <meshStandardMaterial
            color="#D6C19A"
            metalness={0.85}
            roughness={0.24}
          />
        </Text>
      </group>
    </Float>
  );
}

export default function Hero3DSignature() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 38 }}
        dpr={[1, 1.25]}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        fallback={<div />}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[2, 3, 4]} intensity={2.5} color="#FFF0D2" />
        <pointLight position={[-3, -1, 2]} intensity={2} color="#C6AD83" />
        <SignatureText />
      </Canvas>
    </div>
  );
}
