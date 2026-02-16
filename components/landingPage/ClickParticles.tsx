"use client";
import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

export default function ClickParticles({ clickPoint }: { clickPoint: THREE.Vector3 }) {
  const [particles] = useState<Particle[]>(() => {
    const arr: Particle[] = [];
    const count = 100; // number of scattered pixels
    for (let i = 0; i < count; i++) {
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();

      const speed = Math.random() * 2 + 1;
      arr.push({
        position: clickPoint.clone(),
        velocity: dir.multiplyScalar(speed),
      });
    }
    return arr;
  });

  const positions = useMemo(
    () => new Float32Array(particles.length * 3),
    [particles.length]
  );

  const pointsRef = useRef<THREE.Points>(null!);

  // Animate particles outward
  useFrame((_, delta) => {
    particles.forEach((p, i) => {
      p.position.add(p.velocity.clone().multiplyScalar(delta));
      // Optional: slow down particles over time
      p.velocity.multiplyScalar(0.95);

      positions[i * 3 + 0] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="white" transparent />
    </points>
  );
}
