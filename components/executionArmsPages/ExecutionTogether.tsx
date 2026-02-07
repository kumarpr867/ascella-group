import React from 'react';
import { Shield, Monitor, Lightbulb, Flame, Users, Plus } from 'lucide-react';

const ExecutionTogether = () => {
  // 01 is front (highest zIndex), 05 is back (lowest zIndex)
  const executionArms = [
    { 
      id: '01', name: 'Infosec', icon: <Shield size={36} strokeWidth={1} />,
      pos: { top: '40px', left: '0px' }, zIndex: 50 
    },
    { 
      id: '02', name: 'Software labs', icon: <Monitor size={36} strokeWidth={1} />,
      pos: { top: '30px', left: '115px' }, zIndex: 40 
    },
    { 
      id: '03', name: 'Engage', icon: <Lightbulb size={36} strokeWidth={1} />,
      pos: { top: '20px', left: '230px' }, zIndex: 30 
    },
    { 
      id: '04', name: 'Forge', icon: <Flame size={36} strokeWidth={1} />,
      pos: { top: '10px', left: '345px' }, zIndex: 20 
    },
    { 
      id: '05', name: 'Staffing', icon: <Users size={36} strokeWidth={1} />,
      pos: { top: '0px', left: '460px' }, zIndex: 10 
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-8 relative overflow-hidden font-sans">
      
      {/* Header Section */}
      <div className="text-center max-w-4xl mb-12 z-50">
        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] mb-8 text-gray-400">
          <Plus size={18} strokeWidth={1.5} className="text-white" />
          How Execution Arms Work Together
        </div>

        <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6">
          Ascella Group sits above execution. <br />
          Execution arms deliver specialised work <br />
          within <span className="text-gray-600">Ascella's operating structure.</span>
        </h1>

        <p className="text-gray-400 text-[13px] leading-relaxed max-w-md mx-auto">
          Governance, accountability, and performance oversight remain central ensuring coordinated execution without fragmented ownership.
        </p>
      </div>

      {/* Center Label (Ascella) */}
      <div className="bg-[#111] px-6 py-2 rounded border border-gray-800 text-[10px] tracking-[0.3em] uppercase mb-16 z-50 text-gray-300">
        Ascella
      </div>

      {/* Isometric Visualization Container */}
      <div className="relative w-full max-w-5xl h-[350px] flex justify-center items-center mt-10">
        
        {/* Wrapper to hold the stack */}
        <div className="relative" style={{ width: '600px', height: '200px' }}>
          
          {executionArms.map((arm) => (
            <div
              key={arm.id}
              className="absolute transition-all duration-500 ease-out group"
              style={{
                width: '138.5px',
                height: '142px',
                top: arm.pos.top,
                left: arm.pos.left,
                transform: 'rotate(-14.93deg)',
                zIndex: arm.zIndex, // 01 is front, 05 is back
              }}
            >
              {/* Card Surface */}
              <div className="relative w-full h-full bg-[#0a0a0a] border border-gray-800/80 rounded-sm shadow-[13px_-4px_20px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center transition-all duration-300 group-hover:border-blue-400 group-hover:-translate-y-6 group-hover:z-[100]">
                
                {/* ID - Top Left */}
                <span className="absolute top-3 left-4 text-[11px] text-gray-600 font-mono">
                  {arm.id}
                </span>

                {/* Icon - Center */}
                <div className="text-gray-500 group-hover:text-white transition-all duration-300 scale-[1.2] group-hover:scale-[1.3]">
                  {arm.icon}
                </div>

                {/* Name - Bottom Right */}
                <span className="absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.15em] text-gray-500 group-hover:text-white text-right">
                  {arm.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-end mt-auto pt-20">
        <p className="text-gray-500 text-xs tracking-wide max-w-[200px] leading-relaxed mb-8 md:mb-0">
          Governance is designed in, not enforced later.
        </p>

        {/* Ascella Group Branding Card */}
        <div className="bg-[#d1d1d1] text-black p-5 rounded-lg flex gap-5 max-w-sm shadow-2xl items-center">
          <div className="w-10 h-10 bg-black/10 grid grid-cols-2 gap-1 p-1 rounded-sm shrink-0">
            <div className="bg-black" />
            <div />
            <div className="bg-black" />
            <div className="bg-black" />
          </div>
          <div>
            <h4 className="font-bold text-base leading-tight">Ascella Group</h4>
            <p className="text-[14px] text-gray-700 font-medium">
              Coordinated execution without loss of control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionTogether;