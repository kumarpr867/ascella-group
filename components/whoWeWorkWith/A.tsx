import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const coreRotation = new THREE.Vector3();

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
      coreRotation.y = ref.current.rotation.y;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[3, 1]} />
      <meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.2} />
    </mesh>
  );
}

function StartupCluster() {
  const ref = useRef<THREE.Points>(null!);
  const targetRotation = useRef(0); // current rotation target

  // Generate particles
  const particles = useMemo(() => {
    const count = 120;
    const radius = 3.4;
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }

    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      // Smoothly follow the core rotation with some lag
      const lerpFactor = 0.02; // smaller = slower/further delay
      ref.current.rotation.y += (coreRotation.y - ref.current.rotation.y) * lerpFactor;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#d1d5db" transparent opacity={0.8} depthWrite={false} />
    </points>
  );
}