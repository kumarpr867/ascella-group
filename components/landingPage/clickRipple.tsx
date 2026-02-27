"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  Texture,
  CanvasTexture,
  AdditiveBlending,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  Group,
  Vector3,
  Vector2,
  Raycaster,
  DoubleSide
} from "three";
import { useThree, Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "./globe.json";

const GLOBE_CONFIG = {
  // Particle appearance
  particleSize: 0.0001,         // INCREASED from 0.045 to 0.06 for even larger pixels
  particleColor: "#ffffff",    // Color of pixels (hex code)
  particleOpacity: 0.30,       // Transparency (0-1)

  // Grid & density
  pointsPerDegree: 0.7,          // Grid resolution
  clusterChance: 0.6,          // Chance to place a cluster

  // Cluster sizes (min/max)
  minClusterSize: 2,           // Minimum pixels per cluster
  maxClusterSize: 7,           // Maximum pixels per cluster

  // Cluster spread
  clusterSpread: 0.25,         // How spread out clusters are

  // Rotation
  rotationSpeed: 0.01,        // Speed of auto-rotation

  // Camera
  cameraDistance: 22,          // REDUCED from 22 to 18 (much closer = much larger globe)
};

extend({ Points, Mesh });

interface PixelGlobeProps {
  particleSize?: number;
  rotationSpeed?: number;
}

// Convert lat/lon to 3D coordinates
const latLonToPosition = (lat: number, lon: number, radius: number = 7): [number, number, number] => {
  // INCREASED radius from 6 to 7 for even larger globe
  const phi = (90 - lat) * Math.PI / 180;
  const theta = lon * Math.PI / 180;

  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  ];
};

// Check if a point is inside a polygon
const isPointInPolygon = (point: [number, number], polygon: [number, number][]): boolean => {
  const [lat, lon] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [lat1, lon1] = polygon[i];
    const [lat2, lon2] = polygon[j];

    const intersect = ((lon1 > lon) !== (lon2 > lon)) &&
      (lat < (lat2 - lat1) * (lon - lon1) / (lon2 - lon1) + lat1);

    if (intersect) inside = !inside;
  }

  return inside;
};

// Generate particles using grid sampling
const generateParticles = (features: any[]): Float32Array => {
  const positions: number[] = [];
  const radius = 7; // INCREASED from 6 to 7
  const config = GLOBE_CONFIG;

  // Collect all polygons
  const polygons: { points: [number, number][]; bounds: any }[] = [];

  features.forEach((feature) => {
    const processRing = (ring: any) => {
      const points: [number, number][] = [];
      ring.forEach((coord: [number, number]) => {
        points.push([coord[1], coord[0]]);
      });

      const lats = points.map(p => p[0]);
      const lons = points.map(p => p[1]);

      polygons.push({
        points,
        bounds: {
          minLat: Math.min(...lats),
          maxLat: Math.max(...lats),
          minLon: Math.min(...lons),
          maxLon: Math.max(...lons)
        }
      });
    };

    if (feature.geometry.type === "MultiPolygon") {
      feature.geometry.coordinates.forEach((polygon: any) => {
        polygon.forEach(processRing);
      });
    } else if (feature.geometry.type === "Polygon") {
      feature.geometry.coordinates.forEach(processRing);
    }
  });

  // Grid sampling
  polygons.forEach(({ points: polygon, bounds }) => {
    const latStep = 1 / config.pointsPerDegree;
    const lonStep = 1 / config.pointsPerDegree;

    for (let lat = bounds.minLat; lat <= bounds.maxLat; lat += latStep) {
      for (let lon = bounds.minLon; lon <= bounds.maxLon; lon += lonStep) {

        if (isPointInPolygon([lat, lon], polygon)) {

          if (Math.random() < config.clusterChance) {
            // Random cluster size between min and max
            const size = Math.floor(Math.random() * (config.maxClusterSize - config.minClusterSize + 1)) + config.minClusterSize;

            for (let i = 0; i < size; i++) {
              const latOffset = (Math.random() - 0.5) * config.clusterSpread;
              const lonOffset = (Math.random() - 0.5) * config.clusterSpread;

              const [x, y, z] = latLonToPosition(lat + latOffset, lon + lonOffset, radius);
              positions.push(x, y, z);
            }
          }
        }
      }
    }
  });

  console.log(`Generated ${positions.length / 3} particles`);
  return new Float32Array(positions);
};

// Main PixelGlobe component
const PixelGlobe = ({
  particleSize = GLOBE_CONFIG.particleSize,
  rotationSpeed = GLOBE_CONFIG.rotationSpeed
}: PixelGlobeProps) => {
  const groupRef = useRef<Group>(null);
  const sphereRef = useRef<Mesh>(null);
  const { camera, gl } = useThree();

  const particles = useMemo(
    () => generateParticles(countries.features),
    []
  );

  const originalPositions = useRef(new Float32Array(particles));

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(particles, 3));
    return geo;
  }, [particles]);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 4;
    canvas.height = 4;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = GLOBE_CONFIG.particleColor;
    ctx.fillRect(0, 0, 4, 4);
    return new CanvasTexture(canvas);
  }, []);

  const material = useMemo(() => {
    return new PointsMaterial({
      color: 0xffffff,
      size: particleSize,
      sizeAttenuation: true,
      map: texture,
      blending: AdditiveBlending,
      transparent: true,
      opacity: GLOBE_CONFIG.particleOpacity,
      depthWrite: true,
      depthTest: true
    });
  }, [particleSize, texture]);

  const raycaster = useMemo(() => new Raycaster(), []);
  const mouse = useRef(new Vector2());
  const hoverPoint = useRef<Vector3 | null>(null);

  // 🔥 Shockwave additions
  const shockwaveTime = useRef<number | null>(null);
  const clickPoint = useRef<Vector3 | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();

      mouse.current.x =
        ((e.clientX - rect.left) / rect.width) * 2 - 1;

      mouse.current.y =
        -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleClick = () => {
      if (hoverPoint.current) {
        clickPoint.current = hoverPoint.current.clone();
        shockwaveTime.current = performance.now();
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (rotationSpeed) {
      groupRef.current.rotation.y += rotationSpeed * delta * 60;
    }

    // Raycast
    if (sphereRef.current) {
      raycaster.setFromCamera(mouse.current, camera);
      const intersects = raycaster.intersectObject(sphereRef.current);

      if (intersects.length) {
        const worldPoint = intersects[0].point.clone();
        groupRef.current.worldToLocal(worldPoint);
        hoverPoint.current = worldPoint;
      } else {
        hoverPoint.current = null;
      }
    }

    const positions = geometry.attributes.position.array as Float32Array;
    const originals = originalPositions.current;
    const temp = new Vector3();

    const baseRadius = 7;
    const influenceRadius = 2.2;
    const time = performance.now() * 0.002;

    for (let i = 0; i < positions.length; i += 3) {
      temp.set(originals[i], originals[i + 1], originals[i + 2]);

      let displacement = 0;

      // ✅ KEEP YOUR EXISTING HOVER EFFECT EXACTLY
      if (hoverPoint.current) {
        const dist = temp.distanceTo(hoverPoint.current);

        if (dist < influenceRadius) {
          const strength = 1 - dist / influenceRadius;

          const pullDir = hoverPoint.current.clone().sub(temp).normalize();
          const pullForce = strength * 0.4;
          temp.add(pullDir.multiplyScalar(pullForce));

          const pulse = Math.sin(time * 4 + dist * 6) * 0.15 * strength;
          displacement += pulse;
        }
      }

      // ✅ NEW: Shockwave (pure radial ring)
      if (shockwaveTime.current && clickPoint.current) {
        const elapsed = (performance.now() - shockwaveTime.current) * 0.002;
        const waveRadius = elapsed * 4;
        const waveWidth = 0.4;

        const dist = temp.distanceTo(clickPoint.current);
        const diff = Math.abs(dist - waveRadius);

        if (diff < waveWidth) {
          displacement += (1 - diff / waveWidth) * 0.6;
        }

        if (elapsed > 3) {
          shockwaveTime.current = null;
        }
      }

      temp.normalize().multiplyScalar(baseRadius + displacement);

      positions[i] += (temp.x - positions[i]) * 0.12;
      positions[i + 1] += (temp.y - positions[i + 1]) * 0.12;
      positions[i + 2] += (temp.z - positions[i + 2]) * 0.12;
    }

    // ✅ NEW: Subtle glow on hover
    if (hoverPoint.current) {
      material.opacity = 0.6;
      material.size = particleSize * 1.3;
    } else {
      material.opacity = GLOBE_CONFIG.particleOpacity;
      material.size = particleSize;
    }

    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} material={material} />

      <mesh ref={sphereRef}>
        <sphereGeometry args={[7, 64, 64]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          side={DoubleSide}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[6.99, 64, 32]} />
        <meshBasicMaterial color={0x000000} side={2} />
      </mesh>
    </group>
  );
};

// Solid sphere to block backside (adjusted for larger radius)
const SolidSphere = () => {
  const geometry = new SphereGeometry(6.99, 64, 32); // INCREASED from 5.99 to 6.99
  const material = new MeshBasicMaterial({
    color: 0x000000,
    side: 2
  });
  return <mesh geometry={geometry} material={material} />;
};

interface PixelWorldProps {
  particleSize?: number;
  rotationSpeed?: number;
  autoRotate?: boolean;
  enableZoom?: boolean;
}

const PixelWorld = ({
  particleSize = GLOBE_CONFIG.particleSize,
  rotationSpeed = GLOBE_CONFIG.rotationSpeed,
  autoRotate = true,
  enableZoom = false
}: PixelWorldProps) => {
  return (
    <Canvas
      style={{ width: "100%", height: "100%", background: "black" }}
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [0, 0, GLOBE_CONFIG.cameraDistance], fov: 45 }}
    >
      <ambientLight intensity={2} />

      <PixelGlobe
        particleSize={particleSize}
        rotationSpeed={autoRotate ? rotationSpeed : 0}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={enableZoom}
        enableDamping
        dampingFactor={0.05}
        minDistance={GLOBE_CONFIG.cameraDistance - 2}
        maxDistance={GLOBE_CONFIG.cameraDistance + 5}
      />
    </Canvas>
  );
};

export { PixelGlobe, PixelWorld };