import React from 'react';

const categories = ['Infosec', 'Software Labs', 'Engage', 'Forge', 'Staffing'];

const ExecutionLayer = () => {
  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* 1. ARCHITECTURAL GRID SYSTEM */}
      {/* Defined as: [Fix 100px | Large 1.5fr | Narrow 0.8fr | Fix 100px] */}
      <div className="absolute inset-0 z-0 grid grid-cols-[100px_1.5fr_0.8fr_100px] grid-rows-[80px_1fr_100px_80px]">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-white/10"></div>
        ))}
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10 grid grid-cols-[100px_1.5fr_0.8fr_100px] grid-rows-[80px_1fr_100px_80px] min-h-screen">
        
        {/* ROW 1: HEADER */}
        <div className="border-b border-white/10"></div>
        <div className="border-b border-white/10"></div>
        <div className="relative border-b border-white/10 flex items-end">
          <div className="mb-[-14px] ml-4"> 
            <span className="relative px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-white bg-black border border-white/20 inline-block">
              <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white/60"></span>
              <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white/60"></span>
              <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white/60"></span>
              <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white/60"></span>
              All Execution Arms Operational
            </span>
          </div>
        </div>
        <div className="border-b border-white/10"></div>

        {/* ROW 2: MAIN CONTENT AREA */}
        <div className="border-r border-white/10"></div> 

        <div className="relative p-12 lg:p-24 flex flex-col justify-center border-r border-white/10">
          {/* Isometric Floor Pattern */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
             <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
             {/* Simple SVG for Isometric shapes as seen in image_285348.png */}
             <svg width="100%" height="100%" className="absolute inset-0">
                <pattern id="iso-grid" width="100" height="60" patternUnits="userSpaceOnUse">
                  <path d="M50 0 L100 30 L50 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#iso-grid)" />
             </svg>
          </div>

          <div className="relative z-10">
            <div className="mb-8">
              <span className="border border-white/30 px-3 py-1 text-[10px] tracking-widest uppercase text-white/60 font-medium">
                Execution Layer
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-semibold leading-[1.1] mb-8 tracking-tight max-w-4xl">
              Controlled execution units for <span className="text-neutral-500 font-normal italic">complex operating environments</span>
            </h1>
            <p className="text-sm text-neutral-500 max-w-lg leading-relaxed">
              Execution arms deliver specialised work across security, technology, operations, and growth.
            </p>
          </div>
        </div>

        {/* Column 3: The Particle Box Graphic */}
        <div className="relative border-r border-white/10 bg-[#020202] flex items-center justify-center overflow-hidden">
             {/* Representing the 507x641 Rectangle Asset */}
             <div className="w-[90%] h-[90%] opacity-60 bg-[radial-gradient(circle,white_0.5px,transparent_0.5px)] bg-[size:10px_10px]"></div>
        </div>
        <div className="bg-black"></div>

        {/* ROW 3: CATEGORIES & METRICS (This is where your requested update is) */}
        <div className="border-t border-r border-white/10"></div>
        
        {/* Category List in Col 2 */}
        <div className="col-span-1 border-t border-r border-white/10 flex">
           {categories.map((cat, i) => (
            <div key={i} className="flex-1 flex items-center justify-center border-r border-white/10 last:border-r-0 hover:bg-white/5 cursor-pointer">
               <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 hover:text-white">{cat}</span>
            </div>
          ))}
        </div>

        {/* ROW 3, COLUMN 3: METRICS INSERT */}
        <div className="border-t border-r border-white/10 grid grid-cols-3 h-full">
           {/* Metric 1: Execution Arms */}
           <div className="flex flex-col justify-center px-4 border-r border-white/10">
              <span className="text-[8px] uppercase text-neutral-600 mb-1">Execution Arms</span>
              <span className="text-xl font-light">05.</span>
           </div>

           {/* Metric 2: Governance Authority */}
           <div className="flex flex-col justify-center px-4 border-r border-white/10">
              <span className="text-[8px] uppercase text-neutral-600 mb-1">Governance Authority</span>
              <span className="text-xl font-light italic">Single.</span>
           </div>

           {/* Metric 3: Oversight & Accountability */}
           <div className="flex flex-col justify-center px-4">
              <span className="text-[8px] uppercase text-neutral-600 mb-1">Oversight & Accountability</span>
              <span className="text-xl font-light italic">Continuous.</span>
           </div>
        </div>

        <div className="border-t border-white/10 bg-neutral-900/10"></div>

        {/* ROW 4 */}
        <div className="col-span-4 border-t border-white/10"></div>

      </div>
    </div>
  );
};

export default ExecutionLayer;