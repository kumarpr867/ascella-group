"use client"
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Plus } from 'lucide-react';

// --- Lorenz Attractor Particle System ---
function LorenzParticles() {
  const ref = useRef<THREE.Points>(null!);
  
  const points = useMemo(() => {
    const p: number[] = [];
    // Constants for the Lorenz Attractor math
    let x = 0.1, y = 0, z = 0;
    let a = 10, b = 28, c = 8 / 3;

    for (let i = 0; i < 15000; i++) {
      let dt = 0.01;
      let dx = a * (y - x) * dt;
      let dy = (x * (b - z) - y) * dt;
      let dz = (x * y - c * z) * dt;
      x += dx;
      y += dy;
      z += dz;
      // Scale down to fit screen better
      p.push(x * 0.1, y * 0.1, z * 0.1);
    }
    return new Float32Array(p);
  }, []);

  useFrame((state) => {
    // Subtle rotation to make it feel alive
    ref.current.rotation.y += 0.005;
    ref.current.rotation.z += 0.002;
  });

  return (
    <Points ref={ref} positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// --- UI Components ---
const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <Plus className="w-3 h-3 text-white opacity-80" strokeWidth={4} />
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">{title}</span>
  </div>
);

export default function Role() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between">
      
      {/* TOP GRID SECTION */}
      <div className="relative w-full h-[12vh] border-b border-white/10 overflow-hidden" />

      {/* CENTER CONTENT AREA */}
      <main className="relative flex-grow grid grid-cols-1 lg:grid-cols-12 px-8 md:px-20 py-10 z-10 pointer-events-none">
        
        {/* Left Column Text */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-16 pointer-events-auto">
          
          {/* Section 1: Role */}
          <section className="max-w-md">
            <SectionHeader title="Role" />
            <h2 className="text-xl md:text-2xl font-light leading-snug">
              <span className="font-bold">Cybersecurity and risk execution arm responsible</span> for embedding security, governance, and compliance into organisational operations.
            </h2>
            {/* UPDATED: Vertical Dots */}
            <div className="flex flex-col gap-2 mt-6">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <div className="w-3 h-3 rounded-full bg-white" />
              <div className="w-3 h-3 rounded-full border border-gray-600" />
              <div className="w-3 h-3 rounded-full bg-gray-800" />
            </div>
          </section>

          {/* Section 2: Deployment */}
          <section className="max-w-sm opacity-70">
            <SectionHeader title="When it's deployed" />
            <p className="text-sm font-light leading-relaxed">
              When organisations require security, resilience and regulatory alignment embedded directly into execution environments rather than layered on afterward.
            </p>
            {/* UPDATED: Vertical Dots */}
            <div className="flex flex-col gap-2 mt-6">
              <div className="w-3 h-3 rounded-full bg-white" />
              <div className="w-3 h-3 rounded-full border border-gray-600" />
              <div className="w-3 h-3 rounded-full bg-gray-800" />
            </div>
          </section>
        </div>

        {/* Right Column (The Particle Canvas) */}
        <div className="lg:col-span-7 relative h-[400px] lg:h-full flex flex-col justify-center lg:justify-end items-center lg:items-end">
          {/* THREE.JS CANVAS */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="w-full h-full max-w-2xl max-h-[600px]">
              <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <LorenzParticles />
              </Canvas>
            </div>
          </div>

          {/* Bottom Right Title */}
          <div className="relative z-10 text-right max-w-md pointer-events-auto mt-auto mb-10 flex flex-col items-end">
            <h1 className="text-4xl md:text-5xl font-light mb-4">Ascella Infosec</h1>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Security architecture, risk governance frameworks, compliance readiness, and incident preparedness structures that transform data protection and operations.
            </p>
            {/* UPDATED: Vertical Dots aligned to the right */}
            <div className="flex flex-col gap-2 mt-10 items-end">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i < 2 ? 'bg-white' : 'bg-gray-800'}`} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* BOTTOM GRID SECTION */}
      <div className="relative w-full h-[15vh] border-t border-white/10 overflow-hidden" />

    </div>
  );
}