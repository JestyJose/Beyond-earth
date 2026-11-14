import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function OrbitTrack({ radius, isSelected, segments = 128 }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius, segments]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial
        color={isSelected ? '#C4B5FD' : '#E9D5FF'}
        opacity={isSelected ? 0.75 : 0.13}
        transparent={true}
        linewidth={1}
      />
    </line>
  );
}
