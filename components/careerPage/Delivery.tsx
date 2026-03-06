"use client"
import React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------ PRECISE DOTTED RING ------------------ */
const PreciseDotted: React.FC<{
  radius: number;
  count: number;
  size: number;
}> = ({ radius, count, size }) => {
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const theta = (i / count) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(theta) * radius, Math.sin(theta) * radius, 0]}
          >
            <circleGeometry args={[size, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>
        );
      })}
    </group>
  );
};

/* ------------------ HALF VERTICAL LINE — center to top outer ring ------------------ */
const HalfVerticalLine = ({ outerR }: { outerR: number }) => (
  <mesh position={[0, outerR / 2, 0]}>
    <planeGeometry args={[0.008, outerR]} />
    <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
  </mesh>
);

/* ------------------ ROTATING DOTTED DIAGONAL — auto-rotates + follows mouse on hover ------------------ */
const RotatingDottedDiagonal = ({ outerR }: { outerR: number }) => {
  const dotCount = 38;
  const groupRef = React.useRef<THREE.Group>(null);
  const targetAngleRef = React.useRef((135 * Math.PI) / 180);
  const currentAngleRef = React.useRef((135 * Math.PI) / 180);
  const isHoveredRef = React.useRef(false);
  const autoSpeedRef = React.useRef(0.3); // radians per second

  const { gl, camera } = useThree();

  React.useEffect(() => {
    const canvas = gl.domElement;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Project mouse to world space at z=0
      const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const worldPos = camera.position.clone().addScaledVector(dir, distance);

      targetAngleRef.current = Math.atan2(worldPos.y, worldPos.x);
      isHoveredRef.current = true;
    };

    const onMouseLeave = () => {
      isHoveredRef.current = false;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [gl, camera]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (isHoveredRef.current) {
      // Smooth lerp toward mouse angle
      let diff = targetAngleRef.current - currentAngleRef.current;
      // Normalize diff to [-PI, PI]
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      currentAngleRef.current += diff * Math.min(delta * 8, 1);
    } else {
      // Auto clockwise rotation (subtract = clockwise in standard coords)
      currentAngleRef.current -= autoSpeedRef.current * delta;
    }

    groupRef.current.rotation.z = currentAngleRef.current - (135 * Math.PI) / 180;
  });

  // Build dots along 135° direction (upper-left) — we'll rotate the group
  const dots = Array.from({ length: dotCount }).map((_, i) => {
    const angle135 = (135 * Math.PI) / 180;
    const t = (i / (dotCount - 1)) * outerR + 0.08;
    if (t > outerR) return null;
    return (
      <mesh key={i} position={[Math.cos(angle135) * t, Math.sin(angle135) * t, 0]}>
        <circleGeometry args={[0.018, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.28 + (i / dotCount) * 0.15} />
      </mesh>
    );
  });

  return <group ref={groupRef}>{dots}</group>;
};

/* ------------------ ANIMATED TARGET — blink on jump ------------------ */
const AnimatedTarget: React.FC<{
  ringRadius: number;
  size?: number;
  interval?: number;
  initialAngle?: number;
}> = ({ ringRadius, size = 0.09, interval = 4, initialAngle }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const matRef = React.useRef<THREE.MeshBasicMaterial>(null);
  const angleRef = React.useRef(initialAngle ?? Math.random() * Math.PI * 2);
  const lastTimeRef = React.useRef(-(Math.random() * interval));
  const blinkRef = React.useRef(0);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (elapsed - lastTimeRef.current >= interval) {
      lastTimeRef.current = elapsed;
      angleRef.current = Math.random() * Math.PI * 2;
      blinkRef.current = elapsed;
    }
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angleRef.current) * ringRadius;
      meshRef.current.position.y = Math.sin(angleRef.current) * ringRadius;
    }
    if (matRef.current) {
      if (blinkRef.current > 0) {
        const since = elapsed - blinkRef.current;
        matRef.current.opacity = since < 0.3 ? since / 0.3 : 1;
        if (since >= 0.3) blinkRef.current = 0;
      } else {
        matRef.current.opacity = 1;
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial ref={matRef} color="#ffffff" transparent opacity={1} />
    </mesh>
  );
};


const OUTER_R = 2.82;

const RadarScene = () => {
  const { viewport } = useThree()
  const r = OUTER_R

  const isMobile = viewport.width < 6

  // 🔑 MOBILE: scale based only on height
  // 🔑 DESKTOP: scale based on min dimension
  const fitSize = isMobile
    ? viewport.height * 0.75
    : Math.min(viewport.width, viewport.height) * 0.75

  const scale = fitSize / (r * 2)

  return (
    <group
      scale={[scale, scale, scale]}
      position={[0, 0, 0]}   // ✅ ALWAYS CENTER
    >
      <mesh>
        <ringGeometry args={[r, r + 0.018, 256]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>

      <mesh>
        <ringGeometry args={[r * 0.66, r * 0.66 + 0.012, 256]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>

      <PreciseDotted radius={r * 0.83} count={80} size={0.022} />
      <PreciseDotted radius={r * 0.47} count={56} size={0.022} />

      {[0.16, 0.25, 0.36, 0.50].map((fr, i) => (
        <mesh key={i}>
          <ringGeometry args={[fr, fr + 0.013, 128]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.16 - i * 0.02}
          />
        </mesh>
      ))}

      <mesh>
        <circleGeometry args={[0.055, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <HalfVerticalLine outerR={r} />
      <RotatingDottedDiagonal outerR={r} />

      <AnimatedTarget ringRadius={r * 0.83} size={0.09} interval={4} initialAngle={0.5} />
      <AnimatedTarget ringRadius={r * 0.57} size={0.09} interval={5} initialAngle={2.3} />
      <AnimatedTarget ringRadius={r * 0.47} size={0.08} interval={4.5} initialAngle={4.1} />
    </group>
  )
}

/* ------------------ MAIN DELIVERY COMPONENT ------------------ */
const Delivery = () => {
  return (
    <section className="w-full border-y border-color my-20">
      <div className="flex flex-col lg:pl-20 lg:flex-row w-full min-h-[700px] lg:min-h-[90vh]">

        {/* LEFT */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 md:px-16 py-16 lg:py-24">
          <div className="max-w-xl">
            <h3 className="text-3xl md:text-4xl font-light leading-tight mb-8 tracking-tight">
              Delivery is organised through governed pods under central oversight.
            </h3>

            <p className="text-sm text-gray-200 leading-relaxed">
              Teams operate within small, accountable pods aligned to specific execution outcomes.
              Pods are coordinated through Ascella's governance layer, performance measurement
              frameworks, and escalation structures. Collaboration across execution arms occurs
              through defined operating pathways.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 mt-16 lg:mt-0">
            <div className="border border-white/25 rounded-full w-11 h-11 flex items-center justify-center text-xl">
              ↗
            </div>
            <span className="text-lg font-light">
              Pods execute. Governance coordinates.
            </span>
          </div>

        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[650px] lg:h-auto">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            className="absolute inset-0 w-full h-full"
          >
            <RadarScene />
          </Canvas>
        </div>

        <div className="lg:hidden flex items-center px-10 gap-4 mb-10 lg:mt-0">
          <div className="border border-white/25 rounded-full w-11 h-11 flex items-center justify-center text-xl">
            ↗
          </div>
          <span className="text-lg font-light">
            Pods execute. Governance coordinates.
          </span>
        </div>

      </div>

    </section>
  );
};

/* ------------------ STYLES ------------------ */
const styles: Record<string, React.CSSProperties> = {
  mainContainer: {
    display: 'flex',
    flex: 1,
    padding: '0 80px',
    minHeight: 0,
  },
  contentWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  leftSide: {
    width: '38%',
    marginTop: '120px',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '80px',
  },
  rightSide: {
    width: '56%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  canvasContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  canvas: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  },
  headline: {
    fontSize: '36px',
    fontWeight: '400',
    lineHeight: '1.1',
    marginBottom: '30px',
    letterSpacing: '-0.01em',
  },
  description: {
    color: 'var(--color-gray-300)',
    maxWidth: '440px',
    lineHeight: '1.6',
    marginBottom: 'auto',
    fontSize: '14px',
  },
  footerTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginTop: 'auto',
  },
  arrowIcon: {
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
  },
  footerText: {
    fontSize: '18px',
    fontWeight: '400',
  },
};

export default Delivery;