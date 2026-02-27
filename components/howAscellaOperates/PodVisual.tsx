"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo, useState } from "react";
import * as THREE from "three";

function ScatterSphere() {
  const pointsRef = useRef();
  const progress = useRef(0); // 0 = circle, 1 = scattered
  const [hovered, setHovered] = useState(false);

  const { original, scatter } = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1, 128, 128);
    const pos = geometry.attributes.position.array;

    const originalPositions = new Float32Array(pos.length);
    const scatterPositions = new Float32Array(pos.length);

    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i];
      const y = pos[i + 1];
      const z = pos[i + 2];

      originalPositions[i] = x;
      originalPositions[i + 1] = y;
      originalPositions[i + 2] = z;

      const dir = new THREE.Vector3(x, y, z).normalize();
      const strength = 0.6 + Math.random() * 1.2;

      scatterPositions[i] = x + dir.x * strength;
      scatterPositions[i + 1] = y + dir.y * strength;
      scatterPositions[i + 2] = z + dir.z * strength;
    }

    return {
      original: originalPositions,
      scatter: scatterPositions,
    };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    // Smooth progress animation
    const target = hovered ? 1 : 0;
    progress.current = THREE.MathUtils.lerp(
      progress.current,
      target,
      0.06
    );

    // Ease curve (smoothstep)
    const t = progress.current * progress.current * (3 - 2 * progress.current);

    const positions = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i++) {
      positions[i] = THREE.MathUtils.lerp(
        original[i],
        scatter[i],
        t
      );
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points
      ref={pointsRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={original}
          count={original.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="white" size={0.01} />
    </points>
  );
}

export default function PodVisual() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <Suspense fallback={null}>
        <ScatterSphere />
      </Suspense>
    </Canvas>
  );
}