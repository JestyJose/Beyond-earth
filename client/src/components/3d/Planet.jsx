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
  hardwareCount = 0,
  beaconType = 'orbit',
  children
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

  // Telemetry badge text based on authentic mission state
  const badgeInfo = useMemo(() => {
    if (!hardwareCount || hardwareCount === 0) return null;
    if (beaconType === 'surface') {
      return { text: `${hardwareCount} on Surface (Rovers/Landers)`, color: 'text-emerald-400' };
    }
    if (beaconType === 'orbit') {
      return { text: `${hardwareCount} in Active Orbit`, color: 'text-space-cyan' };
    }
    if (beaconType === 'flyby') {
      return { text: `Historic Flyby (Deep Space)`, color: 'text-purple-300' };
    }
    if (beaconType === 'impact') {
      return { text: `Surface Impact Site`, color: 'text-amber-400' };
    }
    if (beaconType === 'atmospheric_entry') {
      return { text: `Atmospheric Entry Site`, color: 'text-amber-400' };
    }
    return { text: `${hardwareCount} craft`, color: 'text-space-cyan' };
  }, [hardwareCount, beaconType]);

  return (
    <>
      {/* Planetary Orbit Track around the Sun */}
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
            onSelect(position, destination, radius);
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
              color={isSelected ? '#A855F7' : '#C4B5FD'}
              side={THREE.DoubleSide}
              transparent={true}
              opacity={0.85}
            />
          </mesh>
        )}

        {/* Saturn Rings */}
        {hasRings && (
          <SaturnRings innerRadius={radius * 1.3} outerRadius={radius * 2.4} />
        )}

        {/* Spacecraft Beacon (Differentiates Surface vs Active Orbit vs Flyby) */}
        {hardwareCount > 0 && (
          <SpacecraftBeacon
            planetRadius={radius}
            beaconType={beaconType}
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
            className={`px-2.5 py-1 rounded-lg backdrop-blur-md border text-center transition-all ${
              isSelected
                ? 'bg-[#170F2C]/90 border-purple-400 text-purple-200 shadow-violet-glow scale-110'
                : hovered
                ? 'bg-[#110B20]/90 border-purple-400/60 text-white'
                : 'bg-[#110B20]/80 border-purple-500/20 text-[#F5F0FF]'
            }`}
          >
            <div className="font-heading font-bold text-xs whitespace-nowrap">
              {destination.name}
            </div>
            <div className="text-[9px] font-mono text-slate-400">
              {destination.distance_from_sun_au} AU
            </div>
            {badgeInfo && (
              <div className={`text-[8.5px] font-mono font-semibold ${badgeInfo.color} whitespace-nowrap`}>
                {badgeInfo.text}
              </div>
            )}
          </div>
        </Html>

        {/* Nested local children (e.g. Earth's Moon) */}
        {children}
      </group>
    </>
  );
}
