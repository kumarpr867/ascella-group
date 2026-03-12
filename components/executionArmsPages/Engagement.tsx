'use client';
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Link from 'next/link';

function Scene() {
  const points = useRef<THREE.Points>(null);
  const count = 40;

  const [particles] = useMemo(() => {
    const positions = new Float32Array(count * count * 3);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        positions[(i * count + j) * 3] = (i - count / 2) * 0.7;
        positions[(i * count + j) * 3 + 1] = (j - count / 2) * 0.7;
        positions[(i * count + j) * 3 + 2] = 0;
      }
    }
    return [positions];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.4;
    if (points.current) {
      const pos = (points.current.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < count * count; i++) {
        const x = pos.array[i * 3];
        const y = pos.array[i * 3 + 1];
        pos.array[i * 3 + 2] = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 0.5;
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.15} sizeAttenuation />
    </points>
  );
}

export default function Engagement() {
  const bgImage = "/engagement-bg.png";

  return (
    <section className="relative w-full bg-black text-white overflow-hidden border-t border-white/20">
      
      {/* V-LINES ALIGNMENT */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="mx-10 xl:mx-auto max-w-7xl h-full border-x border-white/20" />
      </div>

      <div className="relative z-10 w-full flex flex-col">

        {/* TOP SPACER */}
        <div className="w-full h-[60px] md:h-[100px] border-b border-white/20" />

        {/* MID CONTENT BOX */}
        <div className="w-full border-b border-white/20 relative">

          <div className="relative mx-10 xl:mx-auto max-w-7xl overflow-hidden min-h-[460px] md:min-h-[583px]">

            {/* Background Image */}
            <div
              className="absolute inset-0 z-0 opacity-60 bg-neutral-900"
              style={{
                backgroundImage: `url("${bgImage}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(1px)',
              }}
            />

            {/* Particles */}
            <div className="absolute inset-0 z-[1] pointer-events-none opacity-30">
              <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                <Scene />
              </Canvas>
            </div>

            {/* UI Content Wrapper */}
            {/* key-change: flex-col items-center handles horizontal centering of the block */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[460px] md:min-h-[583px] px-6 md:px-10 py-12 md:py-16">
              
              {/* Inner Container: text-left ensures vertical alignment between elements */}
              <div className="max-w-4xl flex flex-col items-start text-left">
                
                <div className="mb-3 md:mb-4">
                  <h5 className="text-xs md:text-base text-white/70 tracking-widest uppercase">
                    Ready to Engage Ascella Group?
                  </h5>
                </div>

                <div className=" md:mb-8">
             <h3 className="lg:max-w-[651px] lg:h-[114px] text-[24px] md:text-[30px] lg:text-[32px] leading-[1.2] tracking-tight lg:line-clamp-2">
  Engagement begins with{' '}
  <span className="text-white/30">
    alignment of operating structure and accountability.
  </span>
</h3>
                </div>

                <div>
                  <Link href="/engageWithUs">
                    <button className="group relative px-3 md:px-4 py-3 md:py-2 border border-white/30 text-[9px] md:text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500">
                      Engage With Us
                      <span className="inline-block ml-3 md:ml-4 text-base md:text-lg group-hover:translate-x-2 transition-transform duration-300"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="2" height="2" fill="#3D3D3D"/>
<rect y="6" width="2" height="2" fill="#3D3D3D"/>
<rect x="6" y="6" width="2" height="2" fill="#3D3D3D"/>
<rect x="6" width="2" height="2" fill="#3D3D3D"/>
<rect x="12" y="6" width="2" height="2" fill="#3D3D3D"/>
<rect x="6" y="12" width="2" height="2" fill="#3D3D3D"/>
<rect x="12" y="12" width="2" height="2" fill="#3D3D3D"/>
</svg>
</span>
                    </button>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SPACER */}
        <div className="w-full h-[60px] md:h-[100px]" />
      </div>
    </section>
  );
}