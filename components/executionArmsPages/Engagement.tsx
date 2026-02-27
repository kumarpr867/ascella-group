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

      {/* MASTER VERTICAL LINES — match footer border-x pattern */}
      {/* Desktop: fixed px offsets | Mobile/tablet: mx-5 equivalent = 20px */}
      <div className="absolute inset-y-0 left-5 lg:left-[120px] w-px bg-white/20 z-20" />
      <div className="absolute inset-y-0 right-5 lg:right-[120px] w-px bg-white/20 z-20" />

      <div className="relative z-10 w-full flex flex-col">

        {/* TOP SPACER */}
        <div className="w-full h-[60px] md:h-[100px] border-b border-white/20" />

        {/* MID CONTENT BOX */}
        <div className="w-full border-b border-white/20 relative">

          {/*
            Mobile:  mx-5  (matches footer mobile: mx-5 border-x border-color)
            Desktop: mx-[120px]
          */}
          <div className="relative mx-5 lg:mx-[120px] overflow-hidden min-h-[460px] md:min-h-[583px]">

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

            {/* UI Content */}
            <div className="relative z-10 flex flex-col items-start justify-center h-full min-h-[460px] md:min-h-[583px] px-6 md:pl-32 lg:pl-44 py-12 md:py-16">

              <div className="w-full mb-3 md:mb-4">
                <h5 className="text-xs md:text-base text-white/70 tracking-widest font-light">
                  Ready to Engage Ascella Group?
                </h5>
              </div>

              <div className="w-full mb-8 md:mb-10">
                <h1 className="text-[24px] md:text-[42px] lg:text-[52px] leading-[1.1] font-light max-w-3xl">
                  Engagement begins with{' '}
                  <span className="text-white/30">
                    alignment of operating structure and accountability.
                  </span>
                </h1>
              </div>

              <div className="w-full">
                <Link href="/engageWithUs">
                  <button className="group relative px-6 md:px-8 py-3 md:py-4 border border-white/30 text-[9px] md:text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500">
                    Engage With Us
                    <span className="inline-block ml-3 md:ml-4 text-base md:text-lg group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </button>
                </Link>
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