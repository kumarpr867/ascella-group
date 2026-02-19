"use client"

import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo, useState } from "react"

function SpherePoints() {
  const ref = useRef<THREE.Points>(null!)
  const [hovered, setHovered] = useState(false)

  const { geometry, original, colors } = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.8, 64, 64)
    const originalPositions = Float32Array.from(
      geo.attributes.position.array
    )

    const colorArray = new Float32Array(
      geo.attributes.position.count * 3
    )

    const colorTop = new THREE.Color("#737373")
    const colorBottom = new THREE.Color("#5f5f5f")


    for (let i = 0; i < geo.attributes.position.count; i++) {
      const y = geo.attributes.position.getY(i)
      const mixFactor = (y + 1.6) / 3.2
      const mixedColor = colorBottom.clone().lerp(colorTop, mixFactor)

      colorArray[i * 3] = mixedColor.r
      colorArray[i * 3 + 1] = mixedColor.g
      colorArray[i * 3 + 2] = mixedColor.b
    }

    geo.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3)
    )

    return { geometry: geo, original: originalPositions, colors: colorArray }
  }, [])

  useFrame((state) => {
    const mesh = ref.current
    const time = state.clock.getElapsedTime()

    const positions = mesh.geometry.attributes.position
    const array = positions.array as Float32Array

    // 🔹 Slow Breathing Animation
    const breathing = 1 + Math.sin(time * 1.2) * 0.05
    mesh.scale.setScalar(breathing)

    mesh.rotation.y += 0.0025

    for (let i = 0; i < array.length; i += 3) {
      const ox = original[i]
      const oy = original[i + 1]
      const oz = original[i + 2]

      const wave = Math.sin(time * 2 + ox * 4) * 0.06
      const scatter = hovered ? 0.3 : 0.1

      array[i] = ox + ox * wave * scatter
      array[i + 1] = oy + oy * wave * scatter
      array[i + 2] = oz + oz * wave * scatter
    }

    positions.needsUpdate = true
  })

  return (
    <points
      ref={ref}
      geometry={geometry}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <pointsMaterial
        vertexColors
        size={0.03}
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

export default function ParticleSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4] }}
      gl={{ alpha: true }}
    >
      {/* subtle ambient lighting for metallic vibe */}
      <ambientLight intensity={0.4} />
      <SpherePoints />
    </Canvas>
  )
}
