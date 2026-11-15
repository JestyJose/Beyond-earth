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
  labelOffset = null,
  children
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Adaptive label positioning: uses calibrated collision-free offset in overview,
  // centers neatly directly above the celestial body when selected and inspected.
  const effectiveLabelPos = useMemo(() => {
    if (isSelected) {
      return [0, radius + 0.9, 0];
    }
    return labelOffset || [0, radius + 1.0, 0];
  }, [isSelected, radius, labelOffset]);

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
      return { text: `${hardwareCount} on Surface`, color: 'text-emerald-400' };
    }
    if (beaconType === 'orbit') {
      return { text: `${hardwareCount} in Orbit`, color: 'text-space-cyan' };
    }
    if (beaconType === 'flyby') {
      return { text: `Historic Flyby`, color: 'text-purple-300' };
    }
    if (beaconType === 'impact') {
      return { text: `Impact Site`, color: 'text-amber-400' };
    }
    if (beaconType === 'atmospheric_entry') {
      return { text: `Atmospheric Entry`, color: 'text-amber-400' };
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
        {/* Primary Planet Mesh */}
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

        {/* Generous invisible raycast hit proxy (minimum 3.2 units radius) for effortless overview clicking */}
        <mesh
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
          <sphereGeometry args={[Math.max(radius * 1.8, 3.2), 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
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

        {/* 3D Billboarding HTML Label with Direct Click Selection (Adaptive positioning prevents overview collisions) */}
        <Html
          position={effectiveLabelPos}
          center
          className="select-none z-10"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelect(position, destination, radius);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(true);
            }}
            onPointerOut={() => {
              setHovered(false);
            }}
            className={`px-2.5 py-1 rounded-xl backdrop-blur-md border text-center transition-all max-w-[125px] sm:max-w-[135px] shadow-lg cursor-pointer hover:scale-105 active:scale-95 ${
              isSelected
                ? 'bg-[#170F2C]/95 border-purple-400 text-purple-200 shadow-violet-glow scale-105'
                : hovered
                ? 'bg-[#110B20]/95 border-purple-400/60 text-white'
                : 'bg-[#110B20]/85 border-purple-500/25 text-[#F5F0FF]'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 leading-tight truncate">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: destination.color || '#A855F7' }}
              />
              <span className="font-heading font-bold text-xs truncate">
                {destination.name}
              </span>
            </div>
            <div className="text-[9px] font-mono text-[#A99BBF] leading-tight mt-0.5">
              {destination.distance_from_sun_au} AU
            </div>
            {badgeInfo && (
              <div className={`text-[8.5px] font-mono font-semibold ${badgeInfo.color} leading-tight truncate mt-0.5`}>
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
