import React from 'react';
import Image from 'next/image';

const categories = ['Infosec', 'Software Labs', 'Engage', 'Forge', 'Staffing'];

const ExecutionLayer = () => {
  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* Background Grid - Static */}
      <div className="absolute inset-0 z-0 grid grid-cols-[100px_1.5fr_0.8fr_100px] grid-rows-[80px_1fr_100px_80px]">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-white/10"></div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 grid grid-cols-[100px_1.5fr_0.8fr_100px] grid-rows-[80px_1fr_100px_80px] min-h-screen">
        
        {/* Row 1 */}
        <div className="border-b border-white/10"></div>
        <div className="border-b border-white/10"></div>
        <div className="relative border-b border-white/10 flex items-end">
          <div className=""> 
            <span className="relative px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-white bg-black border border-white/20 inline-block z-20">
              <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white/60"></span>
              <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white/60"></span>
              <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white/60"></span>
              <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white/60"></span>
              All Execution Arms Operational
            </span>
          </div>
        </div>
        <div className="border-b border-white/10"></div>

        {/* Row 2 - Hero Section */}
        <div className="border-r border-white/10"></div> 

        <div className="relative p-12 lg:p-24 flex flex-col justify-center border-r border-white/10 overflow-hidden">
          {/* IMAGE FIX: Yahan opacity 20 ki jagah 40-50 karke test karein */}
          <div className="absolute inset-0 z-0 pointer-events-none">
             
             
             <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
                <pattern id="iso-grid" width="100" height="60" patternUnits="userSpaceOnUse">
                  <path d="M50 0 L100 30 L50 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#iso-grid)" />
             </svg>
          </div>

          <div className="relative z-10">
            <div className="mb-8">
              <span className="relative inline-block border bg-blur border-white/30 px-4 py-1 text-[10px] tracking-widest uppercase text-white/60 font-medium bg-black/50">

  <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white"></span>
  <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white"></span>
  <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white"></span>
  <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white"></span>
     Execution Layer
    </span>
            </div>
            <h2 className="text-5xl lg:text-5xl font-semibold leading-[1.1] mb-8 tracking-tight max-w-4xl">
              Controlled execution <br /> units for <span className="text-neutral-500 font-normal">complex <br />operating environments</span>
            </h2>
            <p className="text-sm text-neutral-500 max-w-lg leading-relaxed">
              Execution arms deliver specialised work across security, technology, operations, and growth.
            </p>
          </div>
        </div>

        {/* Right Panel - Dot Matrix */}
        <div className="relative border-r border-white/10  flex items-center justify-center">
            <Image 
               src="/Rectangle 5046.svg" 
               alt="background pattern"
               fill
               priority // Image jaldi load hone ke liye
               className="object-cover opacity-80 mix-blend-overlay" // Opacity thodi badhayi hai
             />
        </div>
        <div className="bg-black"></div>

        {/* Row 3 - Categories & Stats */}
        <div className="border-t border-r border-white/10"></div>
        
        <div className="col-span-1 border-t border-r border-white/10 flex">
           {categories.map((cat, i) => (
            <div key={i} className="flex-1 flex items-center justify-center border-r border-white/10 last:border-r-0 hover:bg-white/5 cursor-pointer transition-colors group">
               <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 group-hover:text-white">{cat}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-r border-white/10 grid grid-cols-3 h-full">
           <div className="flex flex-col justify-center px-4 border-r border-white/10">
              <span className="text-[8px] uppercase text-neutral-600 mb-1">Execution Arms</span>
              <span className="text-xl font-light">05.</span>
           </div>
           <div className="flex flex-col justify-center px-4 border-r border-white/10">
              <span className="text-[8px] uppercase text-neutral-600 mb-1">Governance Authority</span>
              <span className="text-xl font-light italic">Single.</span>
           </div>
           <div className="flex flex-col justify-center px-4">
              <span className="text-[8px] uppercase text-neutral-600 mb-1">Oversight & Accountability</span>
              <span className="text-xl font-light italic">Continuous.</span>
           </div>
        </div>

        <div className="border-t border-white/10 bg-neutral-900/40"></div>

        {/* Footer Row */}
        <div className="col-span-4 border-t border-white/10"></div>
      </div>
    </div>
  );
};

export default ExecutionLayer;