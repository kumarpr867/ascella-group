"use client"
import React from 'react';
import { Canvas } from '@react-three/fiber';

const RadarScene = () => {
  return (
    <group scale={1.1}>
      <mesh>
        <ringGeometry args={[3, 3.005, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>

      <DottedCircle radius={1.2} />
      <DottedCircle radius={2.2} />

      <mesh>
        <circleGeometry args={[0.04, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh>
        <ringGeometry args={[0.12, 0.15, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>

      <mesh position={[0, 1.5, 0]}>
        <planeGeometry args={[0.008, 3]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <planeGeometry args={[0.008, 3]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>

      <group rotation={[0, 0, (60 * Math.PI) / 180]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.01, 6]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      </group>

      <group rotation={[0, 0, (15 * Math.PI) / 180]}>
        <mesh position={[0, 1.5, 0]}>
          <planeGeometry args={[0.015, 3]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      </group>

      {[135, -45].map((angle) => (
        <group key={angle} rotation={[0, 0, (angle * Math.PI) / 180]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[0.005, 7]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
          </mesh>
        </group>
      ))}

      <mesh position={[1.8, 1.2, 0]}>
        <boxGeometry args={[0.07, 0.07, 0.07]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[1.5, -1.8, 0]}>
        <boxGeometry args={[0.07, 0.07, 0.07]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-2.1, -0.9, 0]}>
        <boxGeometry args={[0.07, 0.07, 0.07]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

const Delivery = () => {
  return (
    <div className="bg-default text-default min-h-screen w-full flex flex-col overflow-hidden">
      <div className="w-full h-px bg-white/15" />

      <div style={styles.mainContainer}>
        <div style={styles.contentWrapper}>
          <div style={styles.leftSide}>
            <h1 style={styles.headline}>
              Delivery is organised through governed pods under central oversight.
            </h1>
            <p style={styles.description}>
              Teams operate within small, accountable pods aligned to specific execution outcomes. 
              Pods are coordinated through Ascella's governance layer, performance measurement 
              frameworks, and escalation structures. Collaboration across execution arms occurs 
              through defined operating pathways.
            </p>
            <div style={styles.footerTag}>
              <div style={styles.arrowIcon}>↗</div>
              <span style={styles.footerText}>Pods execute. Governance <br/>coordinates.</span>
            </div>
          </div>

          <div style={styles.rightSide}>
            <Canvas camera={{ position: [0, 0, 5] }} style={styles.canvas}>
              <RadarScene />
            </Canvas>
          </div>
        </div>
      </div>

      <div style={styles.horizontalLine} />
      <div className="w-full border-t border-white/10" />
      <div className="w-full h-24 bg-default" />
    </div>
  );
};

const styles = {
  pageWrapper: { 
    backgroundColor: 'var(--color-black)', 
    color: 'var(--color-white)', 
    minHeight: '100vh', 
    display: 'flex', 
    flexDirection: 'column' as const,
    width: '100%',
    overflow: 'hidden' as const
  },
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
    alignItems: 'stretch' 
  },
  leftSide: { 
    width: '40%', 
    marginTop: '120px', 
    display: 'flex',
    flexDirection: 'column' as const
  },
  rightSide: { 
    width: '55%', 
    height: '100%', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  canvas: {
    height: '100%',
    width: '100%',
  },
  headline: { 
    fontSize: '40px', 
    fontWeight: '400', 
    lineHeight: '1.1', 
    marginBottom: '30px',
    letterSpacing: '-0.01em'
  },
  description: { 
    color: 'var(--color-gray-300)', 
    maxWidth: '440px', 
    lineHeight: '1.6',
    marginBottom: 'auto',
    fontSize: '15px' 
  },
  footerTag: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '15px', 
    paddingBottom: '80px' 
  },
  arrowIcon: { 
    border: '1px solid rgba(255,255,255,0.25)', 
    borderRadius: '50%', 
    width: '44px', 
    height: '44px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    fontSize: '30px'
  },
  footerText: { 
    fontSize: '18px', 
    fontWeight: '400' 
  }
};

const DottedCircle: React.FC<{ radius: number }> = ({ radius }) => {
  const dots = 48;
  return (
    <group>
      {Array.from({ length: dots }).map((_, i) => {
        const theta = (i / dots) * Math.PI * 2;
        const x = Math.cos(theta) * radius;
        const y = Math.sin(theta) * radius;
        return (
          <mesh key={i} position={[x, y, 0]}>
            <circleGeometry args={[0.02, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
};

export default Delivery;