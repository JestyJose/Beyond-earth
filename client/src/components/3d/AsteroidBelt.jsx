import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { getPlanetTexture } from './planetTextures';

/**
 * AsteroidBelt component
 * Procedurally distributes 650+ rocky planetesimals between Mars and Jupiter
 * using InstancedMesh for maximum performance (single draw call).
 * Features Dwarf Planet Ceres at mid-belt with its famous Occator bright spots.
 */
export default function AsteroidBelt({
  innerRadius = 46.5,
  outerRadius = 53.5,
  count = 650,
  isSelected = false,
  onSelect,
  destination
}) {
  const groupRef = useRef();
  const instancedMeshRef = useRef();
  const ceresMeshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Dwarf Planet Ceres orbital telemetry
  const ceresRadius = 0.52;
  const ceresOrbitRadius = (innerRadius + outerRadius) / 2; // ~50.0 AU visual scale
  const ceresAngle = 2.10; // Fixed orbital azimuth

  const ceresPosition = useMemo(() => {
    return new THREE.Vector3(
      Math.cos(ceresAngle) * ceresOrbitRadius,
      0,
      Math.sin(ceresAngle) * ceresOrbitRadius
    );
  }, [ceresAngle, ceresOrbitRadius]);

  const ceresTexture = useMemo(() => getPlanetTexture('ceres'), []);

  // Precompute instance geometry, colors, and transformation helper
  const { geometry, colors, dummy } = useMemo(() => {
    // 12-sided faceted irregular low-poly rock geometry
    const geo = new THREE.DodecahedronGeometry(0.22, 0);
    const d = new THREE.Object3D();

    // Authentically calibrated spectral type palettes:
    // C-type (Carbonaceous, dark), S-type (Silicate/rocky), M-type (Metallic nickel-iron)
    const colorPalette = [
      new THREE.Color('#38393D'), // Dark C-type
      new THREE.Color('#46484D'),
      new THREE.Color('#55575D'),
      new THREE.Color('#6E6B64'), // S-type stony
      new THREE.Color('#7D7971'),
      new THREE.Color('#8C877E'),
      new THREE.Color('#A19D94'), // M-type metallic
      new THREE.Color('#B5B1A8')
    ];

    return { geometry: geo, colors: colorPalette, dummy: d };
  }, []);

  // Initialize instanced matrices and randomized vertex colors once on mount
  useEffect(() => {
    if (!instancedMeshRef.current) return;
    const mesh = instancedMeshRef.current;

    for (let i = 0; i < count; i++) {
      // Gaussian-like radial density: concentrated toward mid-belt (~50.0)
      const u1 = Math.random();
      const u2 = Math.random();
      const randNorm = (u1 + u2) / 2;
      const radius = innerRadius + randNorm * (outerRadius - innerRadius);

      const theta = Math.random() * Math.PI * 2;
      // Vertical dispersion: thickness of the asteroid torus (±0.8)
      const y = (Math.random() - 0.5) * 1.6 * (1 - Math.abs(randNorm - 0.5));

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      dummy.position.set(x, y, z);

      // Random 3D orientation
      dummy.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      // Varied non-uniform asteroid scaling for irregular rocky appearance
      const baseScale = 0.35 + Math.random() * 0.95;
      const sx = baseScale * (0.75 + Math.random() * 0.5);
      const sy = baseScale * (0.65 + Math.random() * 0.7);
      const sz = baseScale * (0.75 + Math.random() * 0.5);
      dummy.scale.set(sx, sy, sz);

      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Color variation across spectral types
      const color = colors[Math.floor(Math.random() * colors.length)];
      mesh.setColorAt(i, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count, innerRadius, outerRadius, colors, dummy]);

  // Heliocentric Keplerian orbital revolution of the entire belt
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.012;
    }
    if (ceresMeshRef.current) {
      ceresMeshRef.current.rotation.y += delta * 0.15;
    }
  });

  const handleSelect = (e) => {
    if (e) e.stopPropagation();
    if (onSelect) {
      // Calculate current world coordinate of Ceres accounting for group rotation
      const currentRotation = groupRef.current ? groupRef.current.rotation.y : 0;
      const rotatedX = Math.cos(ceresAngle + currentRotation) * ceresOrbitRadius;
      const rotatedZ = Math.sin(ceresAngle + currentRotation) * ceresOrbitRadius;
      const worldPos = new THREE.Vector3(rotatedX, 0, rotatedZ);
      onSelect(worldPos, destination, 2.0);
    }
  };

  return (
    <group ref={groupRef}>
      {/* 1. Subtle Non-Solid Belt Guide Boundaries (visually distinct from solid planetary orbit tracks) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerRadius, innerRadius + 0.04, 96]} />
        <meshBasicMaterial color="#A8A29E" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[outerRadius, outerRadius + 0.04, 96]} />
        <meshBasicMaterial color="#A8A29E" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>

      {/* 2. High-Performance Instanced Asteroid Field */}
      <instancedMesh
        ref={instancedMeshRef}
        args={[geometry, null, count]}
        onClick={handleSelect}
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
        <meshStandardMaterial
          roughness={0.9}
          metalness={0.15}
          flatShading={true}
        />
      </instancedMesh>

      {/* 3. Dwarf Planet Ceres (Flagship of the Asteroid Belt) */}
      <group position={ceresPosition}>
        <mesh
          ref={ceresMeshRef}
          onClick={handleSelect}
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
          <sphereGeometry args={[ceresRadius, 32, 32]} />
          <meshStandardMaterial
            map={ceresTexture}
            color="#D1CDC5"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Selection/Hover Halo around Ceres */}
        {(isSelected || hovered) && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[ceresRadius * 1.35, ceresRadius * 1.5, 32]} />
            <meshBasicMaterial
              color="#00F0FF"
              side={THREE.DoubleSide}
              transparent={true}
              opacity={0.85}
            />
          </mesh>
        )}

        {/* 3D Billboarding HTML Label */}
        <Html
          position={[0, ceresRadius + 1.1, 0]}
          center
          distanceFactor={52}
          className="pointer-events-none select-none"
        >
          <div
            className={`px-2.5 py-1 rounded-lg backdrop-blur-md border text-center transition-all ${
              isSelected
                ? 'bg-space-cyan/20 border-space-cyan text-space-cyan shadow-cyan-glow scale-110'
                : hovered
                ? 'bg-space-navy/90 border-space-cyan/60 text-white'
                : 'bg-space-navy/70 border-white/10 text-slate-300'
            }`}
          >
            <div className="font-heading font-bold text-xs whitespace-nowrap">
              Main Asteroid Belt
            </div>
            <div className="text-[9px] font-mono text-amber-300 flex items-center justify-center gap-1">
              <span>Ceres (Dwarf Planet)</span>
              <span className="text-slate-400">• 2.77 AU</span>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}
