import React, { useState, useMemo, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import Sun from './Sun';
import Planet from './Planet';
import CameraDirector from './CameraDirector';

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
        <div className="w-full h-[550px] glass-panel rounded-3xl flex flex-col items-center justify-center p-8 text-center">
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

// Planetary layout specifications (scaled for visibility and discovery)
const PLANET_CONFIG = {
  'mercury': { orbitRadius: 14, radius: 0.6, angle: 0.45, speed: 0.8 },
  'venus': { orbitRadius: 21, radius: 1.0, angle: 1.25, speed: 0.4 },
  'earth': { orbitRadius: 29, radius: 1.1, angle: 2.15, speed: 0.5 },
  'moon': { orbitRadius: 33, radius: 0.45, angle: 2.35, speed: 0.6 },
  'mars': { orbitRadius: 42, radius: 0.85, angle: 3.10, speed: 0.45 },
  'jupiter': { orbitRadius: 58, radius: 2.8, angle: 4.05, speed: 0.3 },
  'saturn': { orbitRadius: 78, radius: 2.3, angle: 5.15, speed: 0.25, hasRings: true },
  'uranus': { orbitRadius: 98, radius: 1.6, angle: 0.85, speed: 0.2 },
  'neptune': { orbitRadius: 116, radius: 1.5, angle: 1.95, speed: 0.18 },
  'kuiper-belt': { orbitRadius: 134, radius: 0.6, angle: 2.85, speed: 0.15 },
  'interstellar-space': { orbitRadius: 152, radius: 0.5, angle: 3.75, speed: 0.1 }
};

export default function SolarSystemCanvas({
  destinations = [],
  selectedDest,
  onSelectDestination,
  isResetView,
  onResetComplete,
  onFallback
}) {
  const [targetPosition, setTargetPosition] = useState(null);

  // Separate the Sun from planets
  const sunDest = useMemo(() => {
    return destinations.find((d) => d.slug === 'sun') || { slug: 'sun', name: 'The Sun', hardware_count: 1 };
  }, [destinations]);

  const planetDestinations = useMemo(() => {
    return destinations.filter((d) => d.slug !== 'sun');
  }, [destinations]);

  const handlePlanetSelect = (pos, dest) => {
    setTargetPosition(pos);
    onSelectDestination(dest);
  };

  const handleSunSelect = () => {
    setTargetPosition(new THREE.Vector3(0, 0, 0));
    onSelectDestination(sunDest);
  };

  return (
    <CanvasErrorBoundary onFallback={onFallback}>
      <div className="w-full h-[580px] lg:h-[680px] rounded-3xl overflow-hidden glass-panel border border-space-border relative">
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

          {/* Camera Smooth Controller */}
          <CameraDirector
            targetPosition={targetPosition}
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
              speed: 0.3
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
                isSelected={isSelected}
                hardwareCount={dest.hardware_count}
                onSelect={(pos, d) => handlePlanetSelect(pos, d)}
              />
            );
          })}
        </Canvas>

        {/* Floating Canvas UI Overlay: Mouse Navigation Instructions */}
        <div className="absolute bottom-4 left-4 pointer-events-none text-[11px] font-mono text-slate-400 bg-space-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-3">
          <span>Left Click + Drag: <strong>Rotate</strong></span>
          <span>Right Click + Drag: <strong>Pan</strong></span>
          <span>Scroll: <strong>Zoom</strong></span>
        </div>
      </div>
    </CanvasErrorBoundary>
  );
}
