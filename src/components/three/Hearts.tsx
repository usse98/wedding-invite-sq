'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Build a 3D heart by extruding a heart-shaped 2D path. */
function useHeartGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x, y);
    shape.bezierCurveTo(x, y, x - 0.5, y - 0.6, x - 1, y - 0.6);
    shape.bezierCurveTo(x - 2, y - 0.6, x - 2, y + 0.7, x - 2, y + 0.7);
    shape.bezierCurveTo(x - 2, y + 1.6, x - 1.1, y + 2.3, x, y + 2.9);
    shape.bezierCurveTo(x + 1.1, y + 2.3, x + 2, y + 1.6, x + 2, y + 0.7);
    shape.bezierCurveTo(x + 2, y + 0.7, x + 2, y - 0.6, x + 1, y - 0.6);
    shape.bezierCurveTo(x + 0.5, y - 0.6, x, y, x, y);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.6,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.18,
      bevelThickness: 0.18,
      curveSegments: 24
    });
    geo.center();
    geo.scale(0.18, 0.18, 0.18);
    return geo;
  }, []);
}

interface HeartItem {
  position: [number, number, number];
  rotSpeed: number;
  bobAmp: number;
  bobSpeed: number;
  phase: number;
}

const HEARTS: HeartItem[] = [
  { position: [-2.4, 1.6, -1.5], rotSpeed: 0.35, bobAmp: 0.25, bobSpeed: 0.9, phase: 0 },
  { position: [2.6, -1.4, -1.0], rotSpeed: -0.25, bobAmp: 0.3, bobSpeed: 0.7, phase: 1.2 },
  { position: [-3.2, -1.8, -2.2], rotSpeed: 0.2, bobAmp: 0.2, bobSpeed: 1.1, phase: 2.4 },
  { position: [3.0, 1.9, -2.8], rotSpeed: -0.4, bobAmp: 0.28, bobSpeed: 0.8, phase: 3.1 }
];

export default function Hearts() {
  const geo = useHeartGeometry();
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    HEARTS.forEach((h, i) => {
      const m = refs.current[i];
      if (!m) return;
      m.rotation.y = t * h.rotSpeed;
      m.rotation.z = Math.PI; // hearts point up (extrude orients them upside-down by default)
      m.position.y = h.position[1] + Math.sin(t * h.bobSpeed + h.phase) * h.bobAmp;
    });
  });

  return (
    <group>
      {HEARTS.map((h, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          geometry={geo}
          position={h.position}
        >
          <meshStandardMaterial
            color="#e8b4bc"
            emissive="#7a2434"
            emissiveIntensity={0.45}
            roughness={0.35}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}
