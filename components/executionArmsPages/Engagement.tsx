'use client';
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Three.js Background Component
function Scene() {
  const points = useRef<THREE.Points>(null);
  const [particles] = useMemo(() => {
    const count = 40;
    const positions = new Float32Array(count * count * 3);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        positions[(i * count + j) * 3] = (i - count / 2) * 0.5;
        positions[(i * count + j) * 3 + 1] = (j - count / 2) * 0.5;
        positions[(i * count + j) * 3 + 2] = 0;
      }
    }
    return [positions];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (points.current) {
      const pos = (points.current.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < 40 * 40; i++) {
        const x = pos.array[i * 3];
        const y = pos.array[i * 3 + 1];
        pos.array[i * 3 + 2] = Math.sin(x * 0.3 + time) * Math.cos(y * 0.3 + time) * 0.8;
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#ffffff" transparent opacity={0.2} sizeAttenuation />
    </points>
  );
}

export default function Engagement() {
  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      
      <div className="relative z-10 w-full flex flex-col">
        
        {/* ROW 1 */}
        <div className="w-full h-[100px] border-b border-white/15">
          <div className="mx-2 sm:mx-4 lg:mx-24 h-full border-x border-white/15" />
        </div>

        {/* ROW 2: Center Box */}
        <div className="w-full h-[650px] border-b border-white/15 relative">
          
          {/* Background Canvas */}
          <div className="absolute inset-0 mx-2 sm:mx-4 lg:mx-24 z-0 pointer-events-none">
             <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                <Scene />
             </Canvas>
          </div>

          {/* Master Container: Isko Center rakha hai */}
          <div className="relative z-10 mx-2 sm:mx-4 lg:mx-24 h-full border-x border-white/15 flex items-center justify-center">
            
            {/* Content Wrapper: Iske andar sab Left Align hoga lekin ye khud center mein hai */}
            <div className="flex flex-col items-start text-left max-w-4xl px-6 md:px-20">
              
              {/* DIV 1: Sub-header */}
              <div className="w-full mb-4">
                <p className="text-sm md:text-base text-white/70 tracking-wide font-light">
                  Ready to Engage Ascella Group?
                </p>
              </div>

              {/* DIV 2: Main Headline */}
              <div className="w-full mb-10">
                <h1 className="text-[32px] md:text-[48px] lg:text-[56px] leading-[1.15] font-light">
                  Engagement begins with{' '}
                  <span className="text-white/40">
                    alignment of operating structure and accountability.
                  </span>
                </h1>
              </div>

              {/* DIV 3: Button */}
              <div className="w-full">
                <button className="flex items-center gap-4 px-8 py-4 border border-white/30 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500 group">
                  Engage With Us 
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ROW 3 */}
        <div className="w-full h-[100px]">
          <div className="mx-2 sm:mx-4 lg:mx-24 h-full border-x border-white/15" />
        </div>

      </div>

      {/* Edge-to-edge lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/15" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15" />

    </section>
  );
}