import React from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

type AnimatedDottedRingProps = {
  radius: number
  count?: number
  dotSize?: number
  baseOpacity?: number
  rotationSpeed?: number
}

const AnimatedDottedRing: React.FC<AnimatedDottedRingProps> = ({
  radius,
  count = 80,
  dotSize = 0.022,
  baseOpacity = 0.9,
  rotationSpeed = 0.2,
}) => {
  const groupRef = React.useRef<THREE.Group>(null)

  // Smooth continuous rotation
  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.z -= rotationSpeed * delta
  })

  // Precompute dots
  const dots = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const theta = (i / count) * Math.PI * 2

      // Subtle fade around circle (like your diagonal line style)
      const opacity =
        baseOpacity * (0.65 + 0.35 * Math.sin((i / count) * Math.PI))

      return {
        position: [
          Math.cos(theta) * radius,
          Math.sin(theta) * radius,
          0,
        ] as [number, number, number],
        opacity,
      }
    })
  }, [radius, count, baseOpacity])

  return (
    <group ref={groupRef}>
      {dots.map((dot, i) => (
        <mesh key={i} position={dot.position}>
          <circleGeometry args={[dotSize, 8]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={dot.opacity}
          />
        </mesh>
      ))}
    </group>
  )
}

export default AnimatedDottedRing