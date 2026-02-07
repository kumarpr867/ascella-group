"use client"
import React from 'react';
import { Plus } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

const WireframeGraphic = () => {
  return (
    <div className="w-full h-[220px] xs:h-[260px] sm:h-[320px] md:h-[400px] lg:h-[480px] flex items-center justify-center md:-ml-10 lg:-ml-20 transition-all duration-300">
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          {/* Outer Wireframe Box - Reduced size from 2.5 to 1.8 */}
          <mesh rotation={[0.5, 0.5, 0]}>
            <boxGeometry args={[1.8, 1.8, 1.8]} />
            <meshBasicMaterial color="white" wireframe opacity={0.1} transparent />
          </mesh>
          {/* Inner Polygonal Sphere - Reduced size from 1.2 to 0.9 */}
          <mesh>
            <sphereGeometry args={[0.9, 12, 12]} />
            <meshStandardMaterial 
              color="white" 
              wireframe 
              transparent 
              opacity={0.4} 
            />
          </mesh>
        </Float>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
};

const Introduction = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans px-4 py-8 sm:px-6 md:px-10 lg:px-20 xl:px-32 flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full mb-6 sm:mb-8">
        <div className="group flex items-center gap-2 cursor-pointer w-fit">
          <Plus 
            size={25} 
            className="text-white transition-transform duration-500 ease-in-out group-hover:rotate-180" 
          />
          <span className="text-sm tracking-widest uppercase text-white font-medium">
            Introduction
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl flex flex-col-reverse md:flex-row items-stretch gap-8 md:gap-0">
        
        {/* Left Column: Shrunk and shifted Graphic */}
        <div className="w-full md:w-[44%] flex justify-center md:justify-start items-center mb-8 md:mb-0">
          <WireframeGraphic />
        </div>

        {/* Right Column: Content (Takes up more space now) */}
        <div className="w-full md:w-[56%] flex flex-col justify-center space-y-10 md:space-y-14 lg:space-y-16 py-2 md:py-10">
          
          <section className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
              Execution arms are structured units <span className="text-gray-400">designed to deliver specialised expertise without fragmenting accountability.</span> 
            </h1>
            <p className="text-gray-400 text-xs xs:text-sm max-w-lg leading-relaxed">
              They enable organisations to access security, technology, operations, and growth 
              capabilities in deployable formats — while maintaining a single governing 
              authority over execution.
            </p>
          </section>

          <section className="space-y-4 sm:space-y-6">
            {/* Stacked squares icon */}
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 opacity-70">
              <div className="absolute inset-0 bg-white/20 -translate-x-1 -translate-y-1"></div>
              <div className="absolute inset-0 bg-white/40"></div>
              <div className="absolute inset-0 bg-white scale-75 translate-x-1 translate-y-1"></div>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light">Why Execution Arms Exist</h2>
            <div className="text-gray-400 text-xs xs:text-sm max-w-lg space-y-2 sm:space-y-3">
              <p>Modern organisations require specialised expertise across security, technology, operations, and growth.</p>
              <p>Execution arms provide this expertise in structured, deployable units without creating independent silos or external vendor dependency.</p>
            </div>
            <p className="text-xs sm:text-sm font-medium text-white pt-2"># Security, Technology, Operations</p>
          </section>

          <section className="space-y-4 sm:space-y-6 pt-8 sm:pt-10 border-t border-white/10">
            {/* Simple geometric icon for second section */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white/30 relative flex items-center justify-center">
                <div className="w-4 h-4 bg-white"></div>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light">Why They Are Not Independent</h2>
            <p className="text-gray-400 text-xs xs:text-sm max-w-lg">
              They function inside Ascella Group's governance framework, accountability structure, and oversight mechanisms.
            </p>
            <div className="pt-2">
              <p className="text-white text-base sm:text-lg font-light leading-tight"># Delivery is distributed.</p>
              <p className="text-white text-base sm:text-lg font-light leading-tight">Accountability remains central.</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Introduction;