'use client';
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Link from 'next/link';
import Reveal from "@/utils/Reveal";
import { slideInFromBottom } from "@/utils/motion";
import OutlineBtn from '../btns/OutlineBtn';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();

  return (
    <section className="relative w-full bg-black text-white overflow-hidden border-t border-white/20">

      {/* V-LINES ALIGNMENT - Matches Footer Margins */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="mx-10 lg:mx-20 xl:mx-24 h-full border-x border-white/20" />
      </div>

      <div className="relative z-10 w-full flex flex-col">

        {/* TOP SPACER */}
        <div className="w-full h-[60px] md:h-[100px] border-b border-white/20" />

        {/* MID CONTENT BOX */}
        <div className="w-full border-b border-white/20 relative">

          {/* Container with matching horizontal lines and margins */}
          <div className="relative mx-10 lg:mx-20 xl:mx-24 overflow-hidden min-h-[460px] md:min-h-[583px] border-x border-white/20">

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
            <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[460px] md:min-h-[583px] px-6 md:px-10 py-12 md:py-16">

              {/* Inner Container */}
              <div className="max-w-4xl flex flex-col items-start text-left">

                <div className="mb-3 md:mb-4">
                  <Reveal variants={slideInFromBottom(0.1)}>
                    <h5 className="text-xs md:text-base text-white/70 tracking-widest uppercase">
                      Ready to Engage Ascella Group?
                    </h5>
                  </Reveal>
                </div>

                <div className="mb-2 md:mb-4">
                  <Reveal variants={slideInFromBottom(0.2)}>
                    <h3 className="lg:max-w-[651px] text-[24px] md:text-[30px] lg:text-[32px] leading-[1.2] tracking-tight">
                      Ascella brings {' '}
                      <span className="text-gray-200">
                        ownership, structure, and discipline to how work moves forward.
                      </span>
                    </h3>
                  </Reveal>
                </div>

                {/* Button */}
                <div className="mt-4 md:mt-2">
                  <Reveal variants={slideInFromBottom(0.3)}>
                    <OutlineBtn text='Take Control' onClick={() => router.push('/engageWithUs')} />
                  </Reveal>
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