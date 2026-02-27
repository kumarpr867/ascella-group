"use client"
import React, { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function ParticleSphere({ count = 1500, radius = 2 }) {
  const meshRef = useRef<THREE.Group>(null)

  // Generate positions + random rotations
  const { positions, rotations } = useMemo(() => {
    const positions = []
    const rotations = []

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = 2 * Math.PI * Math.random()

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      positions.push(x, y, z)
      rotations.push(Math.random() * Math.PI)
    }

    return {
      positions: new Float32Array(positions),
      rotations,
    }
  }, [count, radius])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.x += 0.001
    }
  })

  return (
    <group ref={meshRef}>
      <instancedMesh args={[undefined, undefined, count]}>
        <planeGeometry args={[0.05, 0.015]} />
        <meshBasicMaterial color="white" />
        {positions && (
          <InstanceSetter positions={positions} rotations={rotations} />
        )}
      </instancedMesh>
    </group>
  )
}

interface InstanceSetterProps {
  positions: Float32Array;
  rotations: number[];
}

function InstanceSetter({ positions, rotations }: InstanceSetterProps) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const temp = useMemo(() => new THREE.Object3D(), [])

  useFrame(() => {
    if (!ref.current) return

    for (let i = 0; i < rotations.length; i++) {
      temp.position.set(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      )
      temp.rotation.z = rotations[i]
      temp.updateMatrix()
      ref.current.setMatrixAt(i, temp.matrix)
    }

    ref.current.instanceMatrix.needsUpdate = true
  })

  return ref.current ? <primitive object={ref.current} /> : null;
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <color attach="background" args={["black"]} />
      <ParticleSphere count={2000} radius={2.5} />
    </Canvas>
  )
}