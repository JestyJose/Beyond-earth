import React, { useState, useMemo, useEffect, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import Sun from './Sun';
import Planet from './Planet';
import CameraDirector from './CameraDirector';
import SpacecraftBeacon from './SpacecraftBeacon';
import { getPlanetTexture } from './planetTextures';

// WebGL Error Boundary to catch hardware acceleration issues
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('WebGL Canvas Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[420px] sm:h-[500px] lg:h-[680px] glass-panel rounded-3xl flex flex-col items-center justify-center p-8 text-center">
          <p className="text-white font-bold mb-2">WebGL 3D Acceleration Unavailable</p>
          <p className="text-xs text-slate-400 mb-4 max-w-md">
            Your browser or device does not currently support WebGL hardware acceleration. You can view the full planetary catalog using the 2D Orbital Map.
          </p>
          <button
            onClick={this.props.onFallback}
            className="px-4 py-2 rounded-xl bg-space-cyan text-space-black font-semibold text-xs font-mono"
          >
            Switch to 2D Orbital Map
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Scientifically calibrated visibility scale configuration
const PLANET_CONFIG = {
  'mercury': { orbitRadius: 14, radius: 0.6, angle: 0.45, speed: 0.8, beaconType: 'impact' },
  'venus': { orbitRadius: 21, radius: 1.0, angle: 1.25, speed: 0.4, beaconType: 'atmospheric_entry' },
  'earth': { orbitRadius: 29, radius: 1.1, angle: 2.15, speed: 0.5, beaconType: 'orbit' },
  'moon': { isLunar: true, radius: 0.42, localDistance: 2.6, speed: 0.6, beaconType: 'surface' },
  'mars': { orbitRadius: 42, radius: 0.85, angle: 3.10, speed: 0.45, beaconType: 'surface' },
  'jupiter': { orbitRadius: 58, radius: 2.8, angle: 4.05, speed: 0.3, beaconType: 'orbit' },
  'saturn': { orbitRadius: 78, radius: 2.3, angle: 5.15, speed: 0.25, hasRings: true, beaconType: 'flyby' },
  'uranus': { orbitRadius: 98, radius: 1.6, angle: 0.85, speed: 0.2, beaconType: 'flyby' },
  'neptune': { orbitRadius: 116, radius: 1.5, angle: 1.95, speed: 0.18, beaconType: 'flyby' },
  'kuiper-belt': { orbitRadius: 134, radius: 0.6, angle: 2.85, speed: 0.15, beaconType: 'flyby' },
  'interstellar-space': { orbitRadius: 152, radius: 0.5, angle: 3.75, speed: 0.1, beaconType: 'flyby' }
};

// Earth's Moon component rendered locally in Earth's orbit
function MoonInEarthOrbit({ moonDest, isSelected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => getPlanetTexture('moon'), []);
  const cfg = PLANET_CONFIG['moon'];

  const moonPos = useMemo(() => {
    return new THREE.Vector3(cfg.localDistance, 0, 0);
  }, [cfg.localDistance]);

  const earthCfg = PLANET_CONFIG['earth'];
  const earthAbsolutePos = useMemo(() => {
    const ex = Math.cos(earthCfg.angle) * earthCfg.orbitRadius;
    const ez = Math.sin(earthCfg.angle) * earthCfg.orbitRadius;
    return new THREE.Vector3(ex, 0, ez);
  }, [earthCfg]);

  const moonAbsolutePos = useMemo(() => {
    return new THREE.Vector3(earthAbsolutePos.x + cfg.localDistance, 0, earthAbsolutePos.z);
  }, [earthAbsolutePos, cfg.localDistance]);

  return (
    <>
      {/* Local Lunar Orbit Ring around Earth */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[cfg.localDistance - 0.02, cfg.localDistance + 0.02, 64]} />
        <lineBasicMaterial color={isSelected ? '#00F0FF' : '#FFFFFF'} transparent opacity={isSelected ? 0.6 : 0.15} />
      </mesh>

      {/* Moon Mesh */}
      <group position={moonPos}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelect(moonAbsolutePos, moonDest, cfg.radius);
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
          <sphereGeometry args={[cfg.radius, 24, 24]} />
          <meshStandardMaterial map={texture} roughness={0.8} />
        </mesh>

        {/* Selection Ring */}
        {(isSelected || hovered) && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[cfg.radius * 1.3, cfg.radius * 1.45, 32]} />
            <meshBasicMaterial color="#00F0FF" side={THREE.DoubleSide} transparent opacity={0.8} />
          </mesh>
        )}

        {/* Surface Beacon for Apollo 11 Lunar Module */}
        <SpacecraftBeacon
          planetRadius={cfg.radius}
          beaconType="surface"
          count={moonDest?.hardware_count || 1}
          isSelected={isSelected}
        />

        {/* 3D Label */}
        <Html position={[0, cfg.radius + 0.8, 0]} center distanceFactor={50} className="pointer-events-none select-none">
          <div className={`px-2 py-0.5 rounded-lg backdrop-blur-md border text-center transition-all ${
            isSelected
              ? 'bg-space-cyan/20 border-space-cyan text-space-cyan scale-105'
              : 'bg-space-navy/70 border-white/10 text-slate-300'
          }`}>
            <div className="font-heading font-bold text-[11px] whitespace-nowrap">The Moon</div>
            <div className="text-[8px] font-mono text-emerald-400 font-semibold">Tranquility Base (Apollo 11)</div>
          </div>
        </Html>
      </group>
    </>
  );
}

export default function SolarSystemCanvas({
  destinations = [],
  selectedDest,
  onSelectDestination,
  isResetView,
  onResetComplete,
  onFallback
}) {
  const [targetPosition, setTargetPosition] = useState(null);
  const [targetRadius, setTargetRadius] = useState(1.0);

  // Separate the Sun and Moon from heliocentric planets
  const sunDest = useMemo(() => {
    return destinations.find((d) => d.slug === 'sun') || { slug: 'sun', name: 'The Sun', hardware_count: 1 };
  }, [destinations]);

  const moonDest = useMemo(() => {
    return destinations.find((d) => d.slug === 'moon') || { slug: 'moon', name: 'The Moon', hardware_count: 1 };
  }, [destinations]);

  const planetDestinations = useMemo(() => {
    return destinations.filter((d) => d.slug !== 'sun' && d.slug !== 'moon');
  }, [destinations]);

  // Synchronize camera target whenever selectedDest prop changes (supports Quick Jump dropdown!)
  useEffect(() => {
    if (!selectedDest) return;

    if (selectedDest.slug === 'sun') {
      setTargetPosition(new THREE.Vector3(0, 0, 0));
      setTargetRadius(5.0);
      return;
    }

    const cfg = PLANET_CONFIG[selectedDest.slug];
    if (!cfg) return;

    if (cfg.isLunar) {
      const earthCfg = PLANET_CONFIG['earth'];
      const ex = Math.cos(earthCfg.angle) * earthCfg.orbitRadius;
      const ez = Math.sin(earthCfg.angle) * earthCfg.orbitRadius;
      setTargetPosition(new THREE.Vector3(ex + cfg.localDistance, 0, ez));
      setTargetRadius(cfg.radius);
      return;
    }

    const px = Math.cos(cfg.angle) * cfg.orbitRadius;
    const pz = Math.sin(cfg.angle) * cfg.orbitRadius;
    setTargetPosition(new THREE.Vector3(px, 0, pz));
    setTargetRadius(cfg.radius);
  }, [selectedDest]);

  const handlePlanetSelect = (pos, dest, radius) => {
    setTargetPosition(pos);
    setTargetRadius(radius || 1.0);
    onSelectDestination(dest);
  };

  const handleSunSelect = () => {
    setTargetPosition(new THREE.Vector3(0, 0, 0));
    setTargetRadius(5.0);
    onSelectDestination(sunDest);
  };

  return (
    <CanvasErrorBoundary onFallback={onFallback}>
      <div className="w-full h-[420px] sm:h-[500px] lg:h-[680px] rounded-3xl overflow-hidden glass-panel border border-space-border relative">
        <Canvas
          camera={{ position: [0, 65, 120], fov: 45, near: 0.1, far: 2000 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          {/* Deep space background */}
          <color attach="background" args={['#05070D']} />

          {/* Ambient Starlight */}
          <ambientLight intensity={0.25} />

          {/* Procedural Stars */}
          <Stars
            radius={280}
            depth={80}
            count={3200}
            factor={4}
            saturation={0}
            fade={true}
            speed={0.8}
          />

          {/* Camera Smooth Controller with adaptive zoom */}
          <CameraDirector
            targetPosition={targetPosition}
            targetRadius={targetRadius}
            isResetView={isResetView}
            onResetComplete={() => {
              setTargetPosition(null);
              if (onResetComplete) onResetComplete();
            }}
          />

          {/* Central Sun */}
          <Sun
            onSelect={handleSunSelect}
            isSelected={selectedDest?.slug === 'sun'}
            hardwareCount={sunDest.hardware_count || 1}
          />

          {/* Planet Spheres & Orbit Lines */}
          {planetDestinations.map((dest) => {
            const config = PLANET_CONFIG[dest.slug] || {
              orbitRadius: 40,
              radius: 1.0,
              angle: 0,
              speed: 0.3,
              beaconType: 'orbit'
            };
            const isSelected = selectedDest?.slug === dest.slug;

            return (
              <Planet
                key={dest.slug}
                destination={dest}
                orbitRadius={config.orbitRadius}
                radius={config.radius}
                angle={config.angle}
                rotationSpeed={config.speed}
                hasRings={config.hasRings}
                beaconType={config.beaconType}
                isSelected={isSelected}
                hardwareCount={dest.hardware_count}
                onSelect={(pos, d, r) => handlePlanetSelect(pos, d, r)}
              >
                {/* If Earth, nest the Moon orbiting Earth locally! */}
                {dest.slug === 'earth' && (
                  <MoonInEarthOrbit
                    moonDest={moonDest}
                    isSelected={selectedDest?.slug === 'moon'}
                    onSelect={(pos, d, r) => handlePlanetSelect(pos, d, r)}
                  />
                )}
              </Planet>
            );
          })}
        </Canvas>

        {/* Floating Canvas UI Overlay: Desktop & Mobile Navigation Hints */}
        <div className="absolute bottom-4 left-4 pointer-events-none text-[10.5px] font-mono text-slate-300 bg-space-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 sm:gap-4">
          <span className="hidden sm:inline">Left Click + Drag: <strong>Orbit</strong></span>
          <span className="hidden sm:inline">Right Click + Drag: <strong>Pan</strong></span>
          <span className="hidden sm:inline">Scroll: <strong>Zoom</strong></span>
          <span className="sm:hidden">Drag: <strong>Rotate</strong> • Pinch: <strong>Zoom</strong></span>
        </div>
      </div>
    </CanvasErrorBoundary>
  );
}
