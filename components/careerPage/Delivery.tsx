"use client"
import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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

/* ------------------ DOTTED DIAGONAL — upper-left to outer ring ------------------ */
const HalfDottedDiagonal = ({ outerR }: { outerR: number }) => {
  const dotCount = 38;
  const angle135 = (135 * Math.PI) / 180;
  return (
    <group>
      {Array.from({ length: dotCount }).map((_, i) => {
        const t = (i / (dotCount - 1)) * outerR + 0.08;
        if (t > outerR) return null;
        return (
          <mesh key={i} position={[Math.cos(angle135) * t, Math.sin(angle135) * t, 0]}>
            <circleGeometry args={[0.018, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
          </mesh>
        );
      })}
    </group>
  );
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
  const r = OUTER_R;
  return (
    <group>
      {/* MAIN OUTER RING — touches top & bottom canvas edge */}
      <mesh>
        <ringGeometry args={[r, r + 0.018, 256]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>

      {/* SECOND RING */}
      <mesh>
        <ringGeometry args={[r * 0.66, r * 0.66 + 0.012, 256]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>

      {/* DOTTED RING OUTER */}
      <PreciseDotted radius={r * 0.83} count={80} size={0.022} />

      {/* DOTTED RING INNER */}
      <PreciseDotted radius={r * 0.47} count={56} size={0.022} />

      {/* CENTER RINGS */}
      {[0.16, 0.25, 0.36, 0.50].map((fr, i) => (
        <mesh key={i}>
          <ringGeometry args={[fr, fr + 0.013, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.16 - i * 0.02} />
        </mesh>
      ))}

      {/* CENTER DOT */}
      <mesh>
        <circleGeometry args={[0.055, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

     

      {/* VERTICAL LINE — center to top outer ring */}
      <HalfVerticalLine outerR={r} />

      {/* DOTTED DIAGONAL — upper-left to outer ring */}
      <HalfDottedDiagonal outerR={r} />

      {/* ANIMATED TARGETS */}
      <AnimatedTarget ringRadius={r * 0.83} size={0.09} interval={4}   initialAngle={0.5} />
      <AnimatedTarget ringRadius={r * 0.57} size={0.09} interval={5}   initialAngle={2.3} />
      <AnimatedTarget ringRadius={r * 0.47} size={0.08} interval={4.5} initialAngle={4.1} />
    </group>
  );
};

/* ------------------ MAIN DELIVERY COMPONENT ------------------ */
const Delivery = () => {
  return (
    <div className="bg-default text-default min-h-screen w-full flex flex-col overflow-hidden">

      {/* TOP GRID LINE */}
      <div className="w-full h-px bg-white/15" />

      <div style={styles.mainContainer}>
        <div style={styles.contentWrapper}>

          {/* LEFT */}
          <div style={styles.leftSide}>
            <h3 style={styles.headline}>
              Delivery is organised through governed pods under central oversight.
            </h3>
            <p style={styles.description}>
              Teams operate within small, accountable pods aligned to specific execution outcomes.
              Pods are coordinated through Ascella's governance layer, performance measurement
              frameworks, and escalation structures. Collaboration across execution arms occurs
              through defined operating pathways.
            </p>
            <div style={styles.footerTag}>
              <div style={styles.arrowIcon}>↗</div>
              <span style={styles.footerText}>
                Pods execute. Governance <br />coordinates.
              </span>
            </div>
          </div>

          {/* RIGHT — canvas fills full column height, no padding */}
          <div style={styles.rightSide}>
            <div style={styles.canvasContainer}>
              <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                style={styles.canvas}
                gl={{ antialias: true, alpha: true }}
              >
                <RadarScene />
              </Canvas>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM GRID LINE */}
      <div className="w-full h-px bg-white/15" />
      <div className="w-full h-24 bg-default" />
    </div>
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
  /* Right side stretches full height between the two grid lines */
  rightSide: {
    width: '56%',
    display: 'flex',
    alignItems: 'stretch',   // let child fill height
    justifyContent: 'center',
  },
  /* Square canvas container — height 100% of the right side column */
  canvasContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',          // fills the space between top & bottom grid lines
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