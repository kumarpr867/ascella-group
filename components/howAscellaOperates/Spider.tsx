"use client"
import { useRef, useMemo, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export function SpiderNetwork({
  count = 16,
  radius = 2.5,
  maxConnections = 3,
  hoverDistance = 1.5,
  color = "white",
}) {
  const pointsRef = useRef<THREE.InstancedMesh>(null!)
  const linesRef = useRef<THREE.LineSegments>(null!)
  const { mouse, viewport } = useThree()

  // Points setup
  const positions = useMemo(() => {
    const arr: {
      base: THREE.Vector3
      position: THREE.Vector3
      connections: number[]
      phase: number
    }[] = []

    const gridSize = Math.ceil(Math.sqrt(count))
    const spacing = (radius * 2) / gridSize

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        if (arr.length >= count) break
        const px = (x - gridSize / 2 + 0.1) * spacing
        const py = (y - gridSize / 2 + 0.1) * spacing

        arr.push({
          base: new THREE.Vector3(px, py, 0),
          position: new THREE.Vector3(),
          phase: Math.random() * Math.PI * 2,
          connections: [],
        })
      }
    }

    // Random connections
    for (let i = 0; i < arr.length; i++) {
      while (arr[i].connections.length < maxConnections) {
        const j = Math.floor(Math.random() * arr.length)
        if (i !== j && !arr[i].connections.includes(j)) arr[i].connections.push(j)
      }
    }

    return arr
  }, [count, radius, maxConnections])

  // Line buffer
  const linePositions = useMemo(() => new Float32Array(count * maxConnections * 6), [
    count,
    maxConnections,
  ])

  // Hovered points (glow)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    let lineIndex = 0

    const mouseVec = new THREE.Vector3(
      mouse.x * viewport.width / 2,
      mouse.y * viewport.height / 2,
      0
    )

    positions.forEach((p, i) => {
      // Floating
      p.position.copy(p.base)
      p.position.x += Math.sin(t + p.phase) * 0.05
      p.position.y += Math.cos(t + p.phase) * 0.05

      // Mouse influence
      const distToMouse = p.position.distanceTo(mouseVec)
      if (distToMouse < hoverDistance) {
        const dir = mouseVec.clone().sub(p.position).multiplyScalar(0.1)
        p.position.add(dir)
        setHoveredIndex(i)
      }

      // Update instance mesh
      const dummy = new THREE.Object3D()
      dummy.position.copy(p.position)
      dummy.updateMatrix()
      pointsRef.current.setMatrixAt(i, dummy.matrix)
    })

    // Draw lines only between connected points
    positions.forEach((p) => {
      p.connections.forEach((j) => {
        const target = positions[j].position
        linePositions[lineIndex++] = p.position.x
        linePositions[lineIndex++] = p.position.y
        linePositions[lineIndex++] = p.position.z
        linePositions[lineIndex++] = target.x
        linePositions[lineIndex++] = target.y
        linePositions[lineIndex++] = target.z
      })
    })

    pointsRef.current.instanceMatrix.needsUpdate = true
    linesRef.current.geometry.setDrawRange(0, lineIndex / 3)
    linesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group>
      <instancedMesh ref={pointsRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={color} />
      </instancedMesh>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.4} />
      </lineSegments>
    </group>
  )
}