import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { getPlanetTexture } from './planetTextures';
import OrbitTrack from './OrbitTrack';
import SaturnRings from './SaturnRings';
import SpacecraftBeacon from './SpacecraftBeacon';

export default function Planet({
  destination,
  orbitRadius,
  radius,
  angle = 0,
  rotationSpeed = 0.5,
  hasRings = false,
  isSelected = false,
  onSelect,
  hardwareCount = 0
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const texture = useMemo(() => getPlanetTexture(destination.slug), [destination.slug]);

  // Planet 3D position on orbit plane
  const position = useMemo(() => {
    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;
    return new THREE.Vector3(x, 0, z);
  }, [angle, orbitRadius]);

  // Axial rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <>
      {/* Planetary Orbit Track */}
      {orbitRadius > 0 && (
        <OrbitTrack radius={orbitRadius} isSelected={isSelected} />
      )}

      {/* Planet Group positioned along orbit */}
      <group position={position}>
        {/* Planet Sphere */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(position, destination);
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
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            map={texture}
            color={destination.color || '#FFFFFF'}
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>

        {/* Selection / Hover Indicator Ring */}
        {(isSelected || hovered) && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 1.25, radius * 1.35, 32]} />
            <meshBasicMaterial
              color={isSelected ? '#00F0FF' : '#38BDF8'}
              side={THREE.DoubleSide}
              transparent={true}
              opacity={0.8}
            />
          </mesh>
        )}

        {/* Saturn Rings */}
        {hasRings && (
          <SaturnRings innerRadius={radius * 1.3} outerRadius={radius * 2.4} />
        )}

        {/* Spacecraft Beacon */}
        {hardwareCount > 0 && (
          <SpacecraftBeacon
            planetRadius={radius}
            count={hardwareCount}
            isSelected={isSelected}
          />
        )}

        {/* 3D Billboarding HTML Label */}
        <Html
          position={[0, radius + 1.2, 0]}
          center
          distanceFactor={55}
          className="pointer-events-none select-none"
        >
          <div
            className={`px-2 py-0.5 rounded-lg backdrop-blur-md border text-center transition-all ${
              isSelected
                ? 'bg-space-cyan/20 border-space-cyan text-space-cyan shadow-cyan-glow scale-110'
                : hovered
                ? 'bg-space-navy/90 border-space-cyan/60 text-white'
                : 'bg-space-navy/70 border-white/10 text-slate-300'
            }`}
          >
            <div className="font-heading font-bold text-xs whitespace-nowrap">
              {destination.name}
            </div>
            <div className="text-[9px] font-mono text-slate-400">
              {destination.distance_from_sun_au} AU
              {hardwareCount > 0 && (
                <span className="ml-1 text-space-cyan font-bold">
                  ({hardwareCount} {hardwareCount === 1 ? 'craft' : 'crafts'})
                </span>
              )}
            </div>
          </div>
        </Html>
      </group>
    </>
  );
}
