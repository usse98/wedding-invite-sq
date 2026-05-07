'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Two interlocking gold wedding bands that gently rotate and bob.
 * Built from primitives — no external models required.
 */
export default function Rings() {
  const group = useRef<THREE.Group>(null!);
  const ringA = useRef<THREE.Mesh>(null!);
  const ringB = useRef<THREE.Mesh>(null!);
  const sparkleCore = useRef<THREE.Mesh>(null!);
  const sparkleHalo = useRef<THREE.Mesh>(null!);
  const orbitA = useRef<THREE.Mesh>(null!);
  const orbitB = useRef<THREE.Mesh>(null!);
  const orbitC = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      // Cinematic "breathing": very gentle vertical drift + tiny tilt.
      group.current.position.y = Math.sin(t * 0.52) * 0.1;
      group.current.rotation.z = Math.sin(t * 0.24) * 0.06;
      group.current.rotation.x = Math.sin(t * 0.18) * 0.04;
    }
    if (ringA.current) {
      ringA.current.rotation.y = t * 0.38;
      ringA.current.rotation.x = Math.PI / 2.2 + Math.sin(t * 0.45) * 0.06;
      ringA.current.position.x = -0.58 + Math.sin(t * 0.28) * 0.07;
      ringA.current.position.y = Math.sin(t * 0.62) * 0.04;
    }
    if (ringB.current) {
      ringB.current.rotation.y = -t * 0.3 + Math.PI / 4;
      ringB.current.rotation.x = Math.PI / 2.2 + Math.sin(t * 0.5 + 1.1) * 0.06;
      ringB.current.position.x = 0.58 + Math.sin(t * 0.28 + Math.PI) * 0.07;
      ringB.current.position.y = Math.sin(t * 0.62 + 0.9) * 0.04;
    }

    // Diamond sparkle pulse.
    const pulse = 1 + Math.sin(t * 2.2) * 0.18;
    if (sparkleCore.current) {
      sparkleCore.current.scale.setScalar(pulse);
      sparkleCore.current.rotation.y = t * 1.8;
    }
    if (sparkleHalo.current) {
      sparkleHalo.current.scale.setScalar(1.05 + Math.sin(t * 2.2 + 0.6) * 0.16);
      sparkleHalo.current.rotation.z = -t * 1.2;
    }

    // Tiny orbiting sparkles around the rings for extra movement.
    if (orbitA.current) {
      orbitA.current.position.set(Math.cos(t * 0.9) * 1.55, 0.55 + Math.sin(t * 1.1) * 0.35, Math.sin(t * 0.9) * 0.9);
    }
    if (orbitB.current) {
      orbitB.current.position.set(Math.cos(t * 0.75 + 2) * 1.8, -0.2 + Math.sin(t * 1.35 + 1.4) * 0.28, Math.sin(t * 0.75 + 2) * 0.95);
    }
    if (orbitC.current) {
      orbitC.current.position.set(Math.cos(t * 1.05 - 1.3) * 1.35, -0.75 + Math.sin(t * 1.5) * 0.22, Math.sin(t * 1.05 - 1.3) * 0.75);
    }
  });

  const goldMat = (
    <meshStandardMaterial
      color="#e8c47a"
      metalness={1}
      roughness={0.18}
      emissive="#3a270d"
      emissiveIntensity={0.25}
    />
  );

  // A torus + a small "diamond" octahedron sitting on top of the first ring.
  return (
    <group ref={group} position={[0, -1.9, 0]} scale={0.85}>
      <mesh ref={ringA} position={[-0.55, 0, 0]} rotation={[Math.PI / 2.2, 0, 0]} castShadow>
        <torusGeometry args={[0.85, 0.085, 64, 200]} />
        {goldMat}
      </mesh>

      {/* Diamond on ring A */}
      <group position={[-0.55, 0.85, 0.1]}>
        <mesh ref={sparkleCore} rotation={[0, Math.PI / 4, 0]}>
          <octahedronGeometry args={[0.13, 0]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.1}
            roughness={0}
            transmission={1}
            thickness={0.4}
            ior={2.4}
            clearcoat={1}
            clearcoatRoughness={0}
            emissive="#ffd9a8"
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh ref={sparkleHalo}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshBasicMaterial color="#fff7de" transparent opacity={0.32} />
        </mesh>
        {/* Sparkle point light */}
        <pointLight intensity={1.4} distance={2.2} color="#fff5d6" />
      </group>

      <mesh ref={ringB} position={[0.55, 0, 0]} rotation={[Math.PI / 2.2, 0, 0]} castShadow>
        <torusGeometry args={[0.85, 0.085, 64, 200]} />
        {goldMat}
      </mesh>

      {/* Orbiting sparkles */}
      <mesh ref={orbitA}>
        <sphereGeometry args={[0.028, 14, 14]} />
        <meshBasicMaterial color="#fff6d8" />
      </mesh>
      <mesh ref={orbitB}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color="#ffdcb0" />
      </mesh>
      <mesh ref={orbitC}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshBasicMaterial color="#f8c9d8" />
      </mesh>
    </group>
  );
}
