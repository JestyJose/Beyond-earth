import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SpacecraftBeacon({ planetRadius, beaconType = 'orbit', count = 0, isSelected = false }) {
  const orbitGroupRef = useRef();
  const surfacePulseRef = useRef();

  useFrame((state, delta) => {
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += delta * 0.8;
    }
    if (surfacePulseRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      surfacePulseRef.current.scale.set(s, s, s);
    }
  });

  if (!count || count <= 0) return null;

  // 1. Surface Beacon for Landers & Rovers (e.g. Mars Curiosity/Perseverance, Moon Apollo 11)
  if (beaconType === 'surface') {
    const surfaceY = planetRadius * 0.92;
    const surfaceZ = planetRadius * 0.38;

    return (
      <group position={[0, surfaceY, surfaceZ]}>
        {/* Surface Landing Pin Point */}
        <mesh position={[0, 0.1, 0]}>
          <coneGeometry args={[0.12, 0.28, 16]} />
          <meshBasicMaterial color={isSelected ? '#00F0FF' : '#10B981'} />
        </mesh>

        {/* Pulsing Ground Beacon Ring */}
        <mesh ref={surfacePulseRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.18, 0.28, 16]} />
          <meshBasicMaterial
            color={isSelected ? '#00F0FF' : '#10B981'}
            transparent={true}
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    );
  }

  // 2. Active Orbital Satellite Beacon (e.g. Earth Hubble, Jupiter Juno)
  if (beaconType === 'orbit') {
    const beaconDistance = planetRadius + 0.95;
    return (
      <group ref={orbitGroupRef}>
        {/* Orbiting Satellite Point */}
        <mesh position={[beaconDistance, 0.2, 0]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshBasicMaterial color={isSelected ? '#00F0FF' : '#38BDF8'} />
        </mesh>

        {/* Orbital Trajectory Line */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[beaconDistance - 0.02, beaconDistance + 0.02, 32]} />
          <meshBasicMaterial
            color={isSelected ? '#00F0FF' : '#38BDF8'}
            transparent={true}
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    );
  }

  // 3. For flybys or concluded impacts (Uranus, Neptune, Mercury, Venus):
  // No active orbiting ring to avoid misleading students!
  return null;
}
