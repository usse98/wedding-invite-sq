'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Soft falling rose petals (instanced for performance).
 * Each petal is a small flat plane with a subtle tilt; they drift down,
 * sway sideways, and recycle to the top when they fall too low.
 */
export default function Petals({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const data = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 14,
      y: Math.random() * 12 - 2,
      z: (Math.random() - 0.5) * 10,
      rx: Math.random() * Math.PI,
      rz: Math.random() * Math.PI,
      speed: 0.25 + Math.random() * 0.5,
      sway: 0.4 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      scale: 0.07 + Math.random() * 0.07
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      const y = p.y - t * p.speed;
      const wrappedY = ((y + 6) % 14) - 8; // recycle from -8..6
      const x = p.x + Math.sin(t * p.sway + p.phase) * 0.6;
      const z = p.z + Math.cos(t * p.sway * 0.7 + p.phase) * 0.4;

      dummy.position.set(x, wrappedY, z);
      dummy.rotation.set(p.rx + t * 0.4, 0, p.rz + t * 0.6);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <planeGeometry args={[1, 1.4]} />
      <meshStandardMaterial
        color="#f4c6cd"
        emissive="#a23f54"
        emissiveIntensity={0.15}
        roughness={0.9}
        metalness={0}
        side={THREE.DoubleSide}
        transparent
        opacity={0.92}
      />
    </instancedMesh>
  );
}
