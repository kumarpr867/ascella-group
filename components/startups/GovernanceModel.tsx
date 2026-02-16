"use client";
import React from 'react';

const GovernanceModel = () => {
  const sideWidth = "w-[8.33%]";
  const colWidth = "w-[20.83%]";
  const rowHeight = "h-[300px]";

  // Base Class for Circle
  const circleBaseClass = "absolute rounded-[611px] w-[41.66vw] h-[600px] border border-gray-400/40";

  return (
    <div className="bg-black text-white min-h-screen w-full font-sans overflow-hidden relative">
      
      {/* --- ADDED TOP SECTION --- */}
      <div className="w-full flex justify-center pt-24 pb-32">
        <div className="flex items-center space-x-6">
          <span className="text-white text-6xl font-light opacity-80">[</span>
          <p className="text-[13px] tracking-wide text-center font-
Montserrat text-gray-200 max-w-[280px] leading-relaxed">
            Support embeds execution discipline, <br />
            not short-term delivery assistance.
          </p>
          <span className="text-white text-6xl font-light opacity-60">]</span>
        </div>
      </div>

      {/* --- Rest of your code starts here --- */}
      
      {/* --- Heading Overlay --- */}
      <div className="absolute z-30 flex flex-col items-center text-center pointer-events-none w-[30%]"
           style={{ top: '600px', left: '29.16%', transform: 'translate(-50%, -50%)' }}>
        <div className="border border-blue-500/40 px-3 py-1 mb-4 bg-black">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white">Governance Model</span>
        </div>
        <h2 className="text-3xl font-light leading-tight">
          Governance is introduced early to keep execution controlled as complexity grows.
        </h2>
      </div>

      {/* --- Row 1 --- */}
      <div className={`w-full border-t border-gray-400 flex ${rowHeight} relative z-10`}>
        <div className={`${sideWidth} border-r border-gray-400`}></div>
        
        <div className={`${colWidth} border-r border-gray-400 relative overflow-hidden`}>
           <div className={`${circleBaseClass} top-0 left-0`}></div>
        </div>
        
        <div className={`${colWidth} border-r border-gray-400 relative overflow-hidden`}>
           <div 
             className={`${circleBaseClass} top-0 left-[-100%]`} 
             style={{ background: 'linear-gradient(190deg, #D9D9D9 -216%, #000 30.2%)' }}
           ></div>
        </div>
        
        <div className={`${colWidth} border-r border-gray-400`}></div>
        <div className={`${colWidth} border-r border-gray-400 pt-30 pr-4 pl-4`}>
            <h3 className="text-xl font-[20px] mb-10">Operating Framework</h3>
            <p className="text-gray-300 text-xs leading-relaxed font-light">Startups in the programme operate within Ascella's governance framework from the outset. <br />
            Decision rights, accountability paths, and escalation mechanisms are established before execution expands across teams, systems, or external parterns.</p>
        </div>
        <div className={`${sideWidth}`}></div>
      </div>

      {/* --- Row 2 --- */}
      <div className={`w-full border-t border-gray-400 flex ${rowHeight} relative z-10`}>
        <div className={`${sideWidth} border-r border-gray-400`}></div>
        
        <div className={`${colWidth} border-r border-gray-400 relative overflow-hidden`}>
           <div 
             className={`${circleBaseClass} top-[-300px] left-0`} 
             style={{ background: 'linear-gradient(10deg, #D9D9D9 -180%, #000 35%)' }}
           ></div>
        </div>

        <div className={`${colWidth} border-r border-gray-400 relative overflow-hidden p-8 flex flex-col justify-end`}>
          <div className={`${circleBaseClass} top-[-300px] left-[-100%]`}></div>
        </div>
        
        <div className={`${colWidth} border-r border-gray-400 pt-30 pl-4`}>
          <div className="relative z-20">
            <h3 className="text-xl font-normal mb-12">Progressive Introduction</h3>
            <p className="text-gray-400 text-xs font-light">Governance structures are introduced gradually as scale increases. Early- stage flexibility is preserved while accountability and oversight mature in parallel with organisational growth.</p>
          </div>
        </div>
        <div className={`${colWidth} border-r border-gray-400 p-8 flex flex-col justify-end`}>
          <p className="text-lg text-gray-400 leading-snug font-light">Execution remains adaptable to evolving startup environments. Accountabilty, ownership, and oversight remain clearly defined at every stage.</p>
        </div>
        <div className={`${sideWidth}`}></div>
      </div>

      <div className="w-full border-t border-gray-400"></div>
    </div>
  );
};

export default GovernanceModel;