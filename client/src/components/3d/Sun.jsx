import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { getPlanetTexture } from './planetTextures';

export default function Sun({ onSelect, isSelected, hardwareCount }) {
  const meshRef = useRef();
  const coronaRef = useRef();
  const [hovered, setHovered] = useState(false);

  const texture = useMemo(() => getPlanetTexture('sun'), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z -= delta * 0.03;
      // Gentle pulsating corona
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
      coronaRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Sunlight Emitter */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3.5}
        distance={300}
        decay={0.1}
        color="#FFF6D6"
      />

      {/* Main Solar Sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[5.0, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          emissive="#FDB813"
          emissiveIntensity={1.2}
          emissiveMap={texture}
          roughness={0.2}
        />
      </mesh>

      {/* Solar Corona Glow Layer */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[5.4, 32, 32]} />
        <meshBasicMaterial
          color="#FF8C00"
          transparent={true}
          opacity={hovered || isSelected ? 0.35 : 0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Solar Label Overlay */}
      <Html
        position={[0, 6.2, 0]}
        center
        distanceFactor={65}
        className="pointer-events-none select-none"
      >
        <div className={`px-2.5 py-1 rounded-lg backdrop-blur-md border text-center transition-all ${
          isSelected
            ? 'bg-amber-500/30 border-amber-400 text-amber-300 shadow-md'
            : hovered
            ? 'bg-space-navy/90 border-space-cyan text-space-cyan'
            : 'bg-space-navy/70 border-white/10 text-slate-200'
        }`}>
          <div className="font-heading font-bold text-xs">The Sun</div>
          <div className="text-[9px] font-mono text-amber-300">
            {hardwareCount > 0 ? `${hardwareCount} Craft (Parker Solar Probe)` : 'Solar Core'}
          </div>
        </div>
      </Html>
    </group>
  );
}
