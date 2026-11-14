import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createSaturnRingTexture } from './planetTextures';

export default function SaturnRings({ innerRadius = 3.0, outerRadius = 5.2 }) {
  const texture = useMemo(() => createSaturnRingTexture(), []);

  return (
    <mesh rotation={[-Math.PI / 2 + 0.45, 0.2, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent={true}
        opacity={0.88}
      />
    </mesh>
  );
}
