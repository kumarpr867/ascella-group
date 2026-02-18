import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/firstglobe.glb");
  const ref = useRef<THREE.Object3D | null>(null);

  // Render the GLB with its original materials so textures are visible.
  return <primitive ref={ref} object={scene} scale={0.3} dispose={null} />;
}

export default function Globe3D() {
  return (
    <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
