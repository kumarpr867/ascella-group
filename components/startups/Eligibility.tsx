"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Plus } from "lucide-react";

 
const WireframeSpiral = () => {
  
  const geometry = useMemo(() => {
    
    return new THREE.TorusKnotGeometry(10, 3, 100, 16);
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial 
        color="#ffffff" 
        wireframe 
        transparent 
        opacity={0.15} 
      />
    </mesh>
  );
};

 
export default function Eligibility() {
  const criteria = [
    { id: "01", text: "Minimum 8 team members" },
    { id: "02", text: "Raised less than $1M in total funding" },
    { id: "03", text: "Annual Recurring Revenue (ARR) below $2M" },
  ];

  return (
    <section className="min-h-screen w-full bg-default text-default py-20 px-6 md:px-12 lg:px-24 flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        
        <div className="relative h-[400px] md:h-[600px] flex flex-col justify-between">
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <WireframeSpiral />
              </Float>
            </Canvas>
          </div>
          
          <div className="mt-auto z-10">
            <p className="text-gray-500 font-light text-lg md:text-xl">
              <span className="text-white font-medium">Engagement</span> is selective by design.
            </p>
          </div>
        </div>

          
        <div className="flex flex-col space-y-8">
          
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-gray-400 font-semibold">
            <Plus size={14} className="text-white" />
            <span>ELIGIBILITY CRITERIA</span>
          </div>

          
          <h2 className="text-3xl md:text-5xl font-light leading-tight max-w-xl">
            The programme is <span className="text-gray-400">designed</span> for startups preparing for structured, accountable execution at scale.
          </h2>

          
          <div className="bg-white-05 border border-fff10 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl">
            <div className="flex gap-4 mb-8">
              
              <div className="grid grid-cols-3 gap-1 h-fit pt-1  bg-blur opacity-40">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-white" />
                ))}
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                To qualify for the Ascella for Startups program, <br className="hidden md:block" /> 
                your startup should meet the following:
              </p>
            </div>

            
            <div className="space-y-0">
              {criteria.map((item, index) => (
                <div 
                  key={item.id}
                  className={`flex items-center py-6 ${
                    index !== criteria.length - 1 ? "border-b border-fff10" : ""
                  }`}
                >
                  <span className=" font-mono text-sm mr-8">{item.id}</span>
                  <span className=" text-base md:text-lg font-light">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}