import React from 'react';

const ExecutionLayer = () => {
  const categories = ['Infosec', 'Software Labs', 'Engage', 'Forge', 'Staffing'];

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Precision Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px' 
        }}
      ></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex flex-1 flex-col md:flex-row">
          
          {/* LEFT COLUMN */}
          <div className="flex-1 flex flex-col justify-center px-10 lg:px-20 border-r border-gray-800 relative">
            {/* Header Tag */}
            <div className="absolute top-12 left-10 lg:left-20">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-[10px]">⌜</span>
                <span className="text-[10px] tracking-widest text-gray-300 uppercase px-2">Execution Layer</span>
                <span className="text-gray-600 text-[10px]">⌟</span>
              </div>
            </div>

            <div className="max-w-xl">
              <h1 className="text-5xl lg:text-7xl font-normal leading-[1.1] mb-8 tracking-tight">
                Controlled execution <br />
                units for <span className="text-gray-500 font-light italic">complex operating environments</span>
              </h1>

              <p className="text-gray-400 text-sm leading-relaxed max-w-md opacity-80">
                Execution arms deliver specialised work across security, technology, operations, 
                and growth. Ascella Group retains governance, accountability, and oversight 
                across all execution.
              </p>
            </div>

            {/* Isometric Floor Pattern */}
            <div className="absolute bottom-20 left-10 lg:left-20 opacity-10">
              <svg width="400" height="200" viewBox="0 0 400 200" fill="none" stroke="white" strokeWidth="0.5">
                <path d="M0 100 L100 50 L200 100 L100 150 Z" />
                <path d="M100 50 L200 0 L300 50 L200 100 Z" />
                <path d="M200 100 L300 50 L400 100 L300 150 Z" />
              </svg>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex-1 flex flex-col relative bg-[#050505]">
            {/* Operational Status Tag */}
            <div className="absolute top-12 left-8">
              <div className="border-l border-t border-gray-700 p-2">
                <span className="text-[9px] tracking-[0.3em] text-gray-400 uppercase">
                  All Execution Arms Operational
                </span>
              </div>
            </div>

            {/* Central Graphic (Dashed Box Visual) */}
            <div className="flex-grow flex flex-col items-center justify-center space-y-4">
              <div className="relative w-64 h-64 opacity-40">
                {/* Simulated "Point Cloud" Cubes */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 border border-dotted border-gray-500 rotate-[35deg] bg-gradient-to-br from-gray-800/20 to-transparent"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 border border-dotted border-gray-400 -rotate-[15deg] bg-gradient-to-tr from-gray-800/20 to-transparent"></div>
              </div>
            </div>

            {/* Data Points Grid */}
            <div className="grid grid-cols-3 border-t border-gray-800 h-32">
              <div className="flex flex-col justify-center px-8 border-r border-gray-800">
                <span className="text-[9px] uppercase tracking-tighter text-gray-500 mb-1">Execution Arms</span>
                <span className="text-2xl font-medium tracking-tighter">05.</span>
              </div>
              <div className="flex flex-col justify-center px-8 border-r border-gray-800">
                <span className="text-[9px] uppercase tracking-tighter text-gray-500 mb-1">Governance Authority</span>
                <span className="text-2xl font-medium tracking-tighter">Single.</span>
              </div>
              <div className="flex flex-col justify-center px-8">
                <span className="text-[9px] uppercase tracking-tighter text-gray-500 mb-1">Oversight & Accountability</span>
                <span className="text-2xl font-medium tracking-tighter">Continuous.</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM NAV BAR */}
        <div className="flex border-t border-gray-800 h-24">
          <div className="flex w-1/2">
            {categories.map((cat, i) => (
              <div 
                key={cat} 
                className={`flex-1 flex items-center justify-center border-r border-gray-800 hover:bg-white hover:text-black transition-all cursor-pointer group`}
              >
                <span className="text-xs font-light tracking-wide text-gray-400 group-hover:text-black">
                  {cat}
                </span>
              </div>
            ))}
          </div>
          <div className="w-1/2 bg-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionLayer;