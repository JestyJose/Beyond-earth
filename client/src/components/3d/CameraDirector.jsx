import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export default function CameraDirector({ targetPosition, isResetView, onResetComplete }) {
  const controlsRef = useRef();
  const { camera } = useThree();

  const defaultCamPos = useRef(new THREE.Vector3(0, 65, 120));
  const defaultTarget = useRef(new THREE.Vector3(0, 0, 0));

  const desiredCamPos = useRef(new THREE.Vector3(0, 65, 120));
  const desiredTarget = useRef(new THREE.Vector3(0, 0, 0));
  const isTransitioning = useRef(false);

  // When target planet changes
  useEffect(() => {
    if (targetPosition) {
      desiredTarget.current.copy(targetPosition);
      // Position camera at an inspection offset relative to the target
      desiredCamPos.current.set(
        targetPosition.x + 8,
        targetPosition.y + 6,
        targetPosition.z + 12
      );
      isTransitioning.current = true;
    }
  }, [targetPosition]);

  // When reset view is requested
  useEffect(() => {
    if (isResetView) {
      desiredCamPos.current.copy(defaultCamPos.current);
      desiredTarget.current.copy(defaultTarget.current);
      isTransitioning.current = true;
      if (onResetComplete) {
        onResetComplete();
      }
    }
  }, [isResetView, onResetComplete]);

  // Smooth lerp on every frame
  useFrame(() => {
    if (controlsRef.current && isTransitioning.current) {
      controlsRef.current.target.lerp(desiredTarget.current, 0.05);
      camera.position.lerp(desiredCamPos.current, 0.05);

      // Check if close enough to hand full control back to user
      const distTarget = controlsRef.current.target.distanceTo(desiredTarget.current);
      const distCam = camera.position.distanceTo(desiredCamPos.current);

      if (distTarget < 0.1 && distCam < 0.2) {
        isTransitioning.current = false;
      }
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping={true}
      dampingFactor={0.05}
      minDistance={5}
      maxDistance={380}
      maxPolarAngle={Math.PI / 2 + 0.1} // Prevent looking directly from below orbit plane
    />
  );
}
