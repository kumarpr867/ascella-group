"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect } from "react";

function Model() {
  const { scene } = useGLTF("/firstglobe.glb");
  return <primitive object={scene} scale={0.3} />;
}

export default function Globe3D() {
  return (
    <Canvas camera={{ fov: 35, position: [0, 0, 3.5] }}>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[4, 6, 4]}
        intensity={0.8}
      />
      <Suspense fallback={null}>
        <Model />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
      />
    </Canvas>

  );
}

