'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import Rings from './three/Rings';
import Petals from './three/Petals';
import Hearts from './three/Hearts';
import { config, type SceneTemplate } from '@/lib/config';

function PearlsTemplate() {
  const gRef = useRef<THREE.Group>(null);
  const pearls = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const a = (i / 18) * Math.PI * 2;
        return {
          pos: [Math.cos(a) * 1.8, Math.sin(a) * 1.1, Math.sin(a * 2) * 0.5] as [number, number, number],
          scale: 0.13 + (i % 3) * 0.025
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!gRef.current) return;
    gRef.current.rotation.y = clock.elapsedTime * 0.18;
    gRef.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.08;
  });

  return (
    <group ref={gRef}>
      {pearls.map((p, i) => (
        <mesh key={i} position={p.pos} scale={p.scale}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color="#f5e9d6" roughness={0.18} metalness={0.15} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.05, 0.04, 24, 200]} />
        <meshStandardMaterial color="#d6bf8e" emissive="#6b5223" emissiveIntensity={0.22} />
      </mesh>
    </group>
  );
}

function CrystalTemplate() {
  const gRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!gRef.current) return;
    gRef.current.rotation.y = clock.elapsedTime * 0.22;
    gRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.35) * 0.12;
  });

  return (
    <group ref={gRef}>
      <mesh position={[0, 0.15, 0]} rotation={[0.25, 0.7, 0]}>
        <octahedronGeometry args={[1.15, 0]} />
        <meshPhysicalMaterial
          color="#ffd9e7"
          transmission={0.75}
          roughness={0.06}
          metalness={0.1}
          thickness={0.9}
          ior={1.2}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
      <mesh position={[0, -0.9, -0.2]} rotation={[0.4, 0.2, 0.1]}>
        <tetrahedronGeometry args={[0.55]} />
        <meshStandardMaterial color="#ffe7b8" emissive="#7a5b1a" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0.8, 0.9, -0.5]} rotation={[0.2, 0.5, 0.3]}>
        <tetrahedronGeometry args={[0.35]} />
        <meshStandardMaterial color="#f4c6dc" emissive="#6a3350" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function GardenTemplate() {
  const gRef = useRef<THREE.Group>(null);
  const buds = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const r = 1.5 + (i % 4) * 0.18;
        return {
          pos: [Math.cos(a) * r, Math.sin(a * 1.3) * 0.45, Math.sin(a) * r * 0.42] as [number, number, number]
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!gRef.current) return;
    gRef.current.rotation.y = clock.elapsedTime * 0.15;
  });

  return (
    <group ref={gRef}>
      {buds.map((b, i) => (
        <mesh key={i} position={b.pos} scale={0.12 + (i % 3) * 0.03}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={i % 2 ? '#f0b4cc' : '#ffe3a6'} roughness={0.35} metalness={0.1} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[1.9, 0.1, 24, 220]} />
        <meshStandardMaterial color="#caa86a" roughness={0.45} metalness={0.25} />
      </mesh>
    </group>
  );
}

function SceneHero({ template }: { template: SceneTemplate }) {
  switch (template) {
    case 'pearls':
      return <PearlsTemplate />;
    case 'crystal':
      return <CrystalTemplate />;
    case 'garden':
      return <GardenTemplate />;
    default:
      return <Rings />;
  }
}

interface PerfProfile {
  petals: number;
  stars: number;
  postprocessing: boolean;
  autoRotate: boolean;
  dpr: [number, number];
  reducedMotion: boolean;
}

function detectProfile(): PerfProfile {
  if (typeof window === 'undefined') {
    return { petals: 140, stars: 1200, postprocessing: true, autoRotate: true, dpr: [1, 2], reducedMotion: false };
  }
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const isMobile = window.matchMedia('(max-width: 640px)').matches;
  const lowEnd = cores <= 4 || memory <= 4;

  if (reduced) {
    return { petals: 0, stars: 400, postprocessing: false, autoRotate: false, dpr: [1, 1.25], reducedMotion: true };
  }
  if (lowEnd && isMobile) {
    return { petals: 50, stars: 600, postprocessing: false, autoRotate: true, dpr: [1, 1.5], reducedMotion: false };
  }
  if (isMobile) {
    return { petals: 90, stars: 900, postprocessing: true, autoRotate: true, dpr: [1, 1.75], reducedMotion: false };
  }
  return { petals: 140, stars: 1200, postprocessing: true, autoRotate: true, dpr: [1, 2], reducedMotion: false };
}

export default function Scene() {
  const [template, setTemplate] = useState<SceneTemplate>(config.sceneTemplate);
  const [profile, setProfile] = useState<PerfProfile>(() => detectProfile());

  useEffect(() => {
    setProfile(detectProfile());
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('template');
    if (fromUrl === 'rings' || fromUrl === 'pearls' || fromUrl === 'crystal' || fromUrl === 'garden') {
      setTemplate(fromUrl);
    }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setProfile(detectProfile());
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return (
    <Canvas
      dpr={profile.dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.6, 6.2], fov: 40 }}
      frameloop={profile.reducedMotion ? 'demand' : 'always'}
    >
      <fog attach="fog" args={['#1a0f24', 9, 20]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#fff1c9" />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#e8b4bc" />
      <pointLight position={[0, 0, 3]} intensity={1.2} color="#ffd9a8" distance={9} />

      <Suspense fallback={null}>
        <SceneHero template={template} />
        <Hearts />
        {profile.petals > 0 ? <Petals count={profile.petals} /> : null}
        <Stars radius={40} depth={30} count={profile.stars} factor={3} fade speed={0.6} />
        <Environment preset="sunset" />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={profile.autoRotate}
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.7}
      />

      {profile.postprocessing ? (
        <EffectComposer>
          <Bloom intensity={0.9} luminanceThreshold={0.35} luminanceSmoothing={0.6} mipmapBlur />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
        </EffectComposer>
      ) : null}
    </Canvas>
  );
}
