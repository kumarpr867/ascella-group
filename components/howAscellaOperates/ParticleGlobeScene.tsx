"use client"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useMemo, useRef } from "react"

/* ------------------------ Random Curved Lines ------------------------ */

function CurvedLines({ count = 120, radius = 2 }) {
  const group = useRef<THREE.Group>(null)

  const lines = useMemo(() => {
    const temp = []

    for (let i = 0; i < count; i++) {
      const points = []
      const segments = 40

      for (let j = 0; j <= segments; j++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI

        const r = radius * (0.6 + Math.random() * 0.4)

        points.push(
          new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
          )
        )
      }

      const curve = new THREE.CatmullRomCurve3(points)
      const geometry = new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(80)
      )

      temp.push(geometry)
    }

    return temp
  }, [count, radius])

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.0015
      group.current.rotation.x += 0.0007
    }
  })

  return (
    <group ref={group}>
      {lines.map((geometry, i) => (
        <line key={i}>
          <primitive object={geometry} attach="geometry" />
          <lineBasicMaterial
            color="#CFCFCF"
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  )
}

/* ----------------------------- Particles ----------------------------- */

function Particles({ count = 300 }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return arr
  }, [count])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffffff"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ----------------------------- Core Cluster ----------------------------- */

function Core() {
  return (
    <mesh>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshBasicMaterial
        color="#CFCFCF"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ----------------------------- Main Scene ----------------------------- */

export default function ParticleGlobeScene() {
  return (  
    <Canvas camera={{ position: [0, 0, 10], fov: 70 }}>
      <ambientLight intensity={0.1} />
      <CurvedLines />
      <Particles />
      <Core />

      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}