"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useMemo, useRef } from "react"
import * as THREE from "three"

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15
    }
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[3, 1]} />
      <meshBasicMaterial
        wireframe
        color="#ffffff"
        transparent
        opacity={0.2}
      />
    </mesh>
  )
}

function StartupCluster() {
  const ref = useRef<THREE.Points>(null!)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.12
    }
  })

  // Proper spherical distribution
  const particles = useMemo(() => {
    const count = 120
    const radius = 3.4
    const arr = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      arr[i * 3] = x
      arr[i * 3 + 1] = y
      arr[i * 3 + 2] = z
    }

    return arr
  }, [])

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#d1d5db"
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  )
}

export default function EnterpriseStartupSystem() {
  return (
    <div className="w-full h-[420px] lg:h-[600px]">
      <Canvas camera={{ position: [0, 0, 7] }}>
        <ambientLight intensity={0.6} />

        <group rotation={[0.6, 0.6, 0]}>
          <CoreSphere />
          <StartupCluster />
        </group>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
