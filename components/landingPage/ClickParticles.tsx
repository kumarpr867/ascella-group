"use client";

import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

type Particle = {
  position: [number, number, number];
};

function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate particles once
  const particles = useMemo<Particle[]>(() => {
    const temp: Particle[] = [];
    const count = 200;

    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ],
      });
    }

    return temp;
  }, []);

  // Create Float32Array safely
  const positions = useMemo(() => {
    const array = new Float32Array(particles.length * 3);

    for (let i = 0; i < particles.length; i++) {
      array[i * 3] = particles[i].position[0];
      array[i * 3 + 1] = particles[i].position[1];
      array[i * 3 + 2] = particles[i].position[2];
    }

    return array;
  }, [particles]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.05}
        color="#ffffff"
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

export default function ClickParticles() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Particles />
      </Canvas>
    </div>
  );
}
