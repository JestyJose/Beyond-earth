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

  const effectiveLabelPos = useMemo(() => {
    return isSelected ? [0, 5.8, 0] : [0, 10.5, -6.5];
  }, [isSelected]);

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

      {/* Solar Label Overlay with Direct Click Selection (Offset in overview to prevent inner planet collision) */}
      <Html
        position={effectiveLabelPos}
        center
        className="select-none z-10"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => {
            setHovered(false);
          }}
          className={`px-2.5 py-1 rounded-xl backdrop-blur-md border text-center transition-all max-w-[130px] shadow-lg cursor-pointer hover:scale-105 active:scale-95 ${
            isSelected
              ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-md scale-105'
              : hovered
              ? 'bg-[#170F2C]/90 border-purple-400 text-purple-200'
              : 'bg-[#110B20]/85 border-purple-500/25 text-[#F5F0FF]'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 leading-tight truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 shadow-[0_0_6px_#FDB813]" />
            <span className="font-heading font-bold text-xs truncate">The Sun</span>
          </div>
          <div className="text-[8.5px] font-mono text-amber-300 leading-tight truncate mt-0.5">
            {hardwareCount > 0 ? `${hardwareCount} Craft (Parker)` : 'Solar Core'}
          </div>
        </div>
      </Html>
    </group>
  );
}
