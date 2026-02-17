"use client"
import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

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
            position={[
              Math.cos(theta) * radius,
              Math.sin(theta) * radius,
              0,
            ]}
          >
            <circleGeometry args={[size, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>
        );
      })}
    </group>
  );
};

/* ------------------ PRECISE SWEEP ------------------ */
const PreciseSweep = () => {
  const ref = React.useRef<any>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.008;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <planeGeometry args={[0.01, 4.2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.55} />
      </mesh>
    </group>
  );
};

/* ------------------ RADAR SCENE ------------------ */
// Camera at z=5, fov=60 → visible half-height = 5 * tan(30°) ≈ 2.89
// SCALE=0.82 → outermost radius = 3.25 * 0.82 ≈ 2.665 — fully inside frustum
const SCALE = 0.82;

const RadarScene = () => {
  return (
    <group scale={SCALE}>

      {/* OUTER DARK THICK RING */}
     

      {/* MAIN OUTER THIN RING */}
      <mesh>
        <ringGeometry args={[3.0, 3.01, 256]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>

      {/* INNER SOLID RING */}
      <mesh>
        <ringGeometry args={[2.0, 2.01, 256]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>

      {/* DOTTED RING OUTER — bright white */}
      <PreciseDotted radius={2.5} count={64} size={0.022} />

      {/* DOTTED RING INNER — bright white */}
      <PreciseDotted radius={1.4} count={48} size={0.024} />

      {/* CENTER RINGS (4 layers) */}
      {[0.18, 0.28, 0.40, 0.55].map((r, i) => (
        <mesh key={i}>
          <ringGeometry args={[r, r + 0.015, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18 - i * 0.02} />
        </mesh>
      ))}

      {/* CENTER DOT */}
      <mesh>
        <circleGeometry args={[0.06, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* CROSS LINE — vertical */}
      <mesh rotation={[0, 0, 0]}>
        <planeGeometry args={[0.006, 6.5]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>

      {/* CROSS LINE — horizontal */}
      <mesh rotation={[0, 0, Math.PI]}>
        <planeGeometry args={[0.006, 6.5]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>

      {/* FAINT DIAGONALS */}
      {[45, 135].map((angle) => (
        <group key={angle} rotation={[0, 0, (angle * Math.PI) / 180]}>
          <mesh>
            <planeGeometry args={[0.004, 6.5]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
          </mesh>
        </group>
      ))}

      {/* SWEEP LINE */}
      <PreciseSweep />

      {/* TARGETS */}
      <mesh position={[1.9, 1.3, 0]}>
        <boxGeometry args={[0.09, 0.09, 0.09]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <mesh position={[1.6, -2.0, 0]}>
        <boxGeometry args={[0.09, 0.09, 0.09]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <mesh position={[-2.2, -1.0, 0]}>
        <boxGeometry args={[0.09, 0.09, 0.09]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

    </group>
  );
};

/* ------------------ MAIN DELIVERY COMPONENT ------------------ */
const Delivery = () => {
  return (
    <div className="bg-default text-default min-h-screen w-full flex flex-col overflow-hidden">
      <div className="w-full h-px bg-white/15" />

      <div style={styles.mainContainer}>
        <div style={styles.contentWrapper}>
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

          <div style={styles.rightSide}>
            {/* Perfect square container — radar never clips */}
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

      <div style={styles.horizontalLine} />
      <div className="w-full border-t border-white/10" />
      <div className="w-full h-24 bg-default" />
    </div>
  );
};

/* ------------------ STYLES ------------------ */
const styles = {
  horizontalLine: {
    width: '100%',
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  mainContainer: {
    display: 'flex',
    flex: 1,
    padding: '0 80px',
  },
  contentWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  leftSide: {
    width: '40%',
    marginTop: '120px',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  rightSide: {
    width: '55%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 0',
  },
  canvasContainer: {
    position: 'relative' as const,
    width: 'min(100%, 580px)',
    aspectRatio: '1 / 1',
    overflow: 'hidden',
  },
  canvas: {
    position: 'absolute' as const,
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
    paddingBottom: '80px',
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