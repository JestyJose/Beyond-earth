import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function SpacecraftBeacon({ planetRadius, count, isSelected }) {
  const orbitGroupRef = useRef();

  useFrame((state, delta) => {
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += delta * 0.8;
    }
  });

  if (!count || count <= 0) return null;

  const beaconDistance = planetRadius + 0.9;

  return (
    <group ref={orbitGroupRef}>
      {/* Spacecraft Beacon Pin */}
      <mesh position={[beaconDistance, 0.2, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={isSelected ? '#00F0FF' : '#38BDF8'} />
      </mesh>

      {/* Orbiting Satellite Trail Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[beaconDistance - 0.02, beaconDistance + 0.02, 32]} />
        <meshBasicMaterial
          color={isSelected ? '#00F0FF' : '#38BDF8'}
          transparent={true}
          opacity={0.3}
          side={2}
        />
      </mesh>
    </group>
  );
}
