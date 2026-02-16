"use client"
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const ExecutionTogether = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const executionArms = [
    {
      id: '01',
      name: 'Infosec',
      desc: 'Coordinated execution without loss of control.',
      pos: { top: '60px', left: '0px' },
      zIndex: 50,
      iconPath: '/Group.svg', 
    },
    {
      id: '02',
      name: 'Software labs',
      desc: 'Scalable infrastructure and rapid prototyping.',
      pos: { top: '45px', left: '160px' },
      zIndex: 40,
      iconPath: '/software-labs.svg',
    },
    {
      id: '03',
      name: 'Engage',
      desc: 'Direct market interaction and growth strategies.',
      pos: { top: '30px', left: '320px' },
      zIndex: 30,
      iconPath: '/engage.svg',
    },
    {
      id: '04',
      name: 'Forge',
      desc: 'Innovation and high-performance engineering.',
      pos: { top: '15px', left: '480px' },
      zIndex: 20,
      iconPath: '/forge.svg',
    },
    {
      id: '05',
      name: 'Staffing',
      desc: 'Managed talent solutions and expert placement.',
      pos: { top: '0px', left: '640px' },
      zIndex: 10,
      iconPath: '/staffing.svg',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-8 relative overflow-hidden font-sans">
      
      {/* Header */}
      <div className="text-center max-w-4xl mb-12 z-50">
        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] mb-8 text-white">
          <Plus size={18} strokeWidth={1.5} className="text-white" />
          How Execution Arms Work Together
        </div>

        <h3 className="text-2xl md:text-4xl font-light leading-[1.1] mb-6 tracking-tight">
          Ascella Group sits above execution. <br />
          Execution arms deliver specialised work <br />
          within <span className="text-gray-400">Ascella's operating structure.</span>
        </h3>

        <p className="text-white text-[14px] leading-relaxed max-w-md mx-auto font-Montserrat">
          Governance, accountability, and performance oversight remain central ensuring coordinated execution without fragmented ownership.
        </p>
      </div>

      <div className="bg-[#111] px-8 py-2.5 rounded border border-gray-400 text-[11px] tracking-[0.4em] uppercase mb-10 z-50 text-white">
        Ascella
      </div>

      {/* Cards Interaction Area */}
      <div className="relative w-full max-w-[1000px] h-[500px] flex justify-center items-center">
        <div className="relative" style={{ width: '840px', height: '300px' }}>
          {executionArms.map((arm) => {
            const isHovered = hoveredId === arm.id;
            
            return (
              <div
                key={arm.id}
                onMouseEnter={() => setHoveredId(arm.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="absolute transition-all duration-500 ease-out cursor-pointer"
                style={{
                  width: '200px',
                  height: '256px',
                  top: arm.pos.top,
                  left: arm.pos.left,
                  zIndex: isHovered ? 100 : arm.zIndex,
                  transform: isHovered ? 'translateY(-60px) scale(1.05)' : 'none',
                }}
              >
                <div className="relative w-full h-full">
                  
                  {/* Background Layer */}
                  <div className="absolute inset-0 transition-all duration-500">
                    {isHovered ? (
                      <div className="w-full h-full bg-[#D1D1D1] rounded-sm shadow-2xl transition-all duration-500" />
                    ) : (
                      <svg 
                        viewBox="0 0 137 176" 
                        preserveAspectRatio="none" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-full h-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
                      >
                        <path 
                          d="M0.000976398 3.10009C-0.0481035 0.891496 1.6425 -0.437488 3.77705 0.131725L129.871 33.7567C132.005 34.3259 133.775 36.5778 133.825 38.7864L136.802 172.753C136.851 174.962 135.16 176.291 133.025 175.722L6.93183 142.097C4.79728 141.527 3.0271 139.276 2.97802 137.067L0.000976398 3.10009Z" 
                          fill="#0D0D0D"
                          className="stroke-gray-800/50"
                          strokeWidth="0.8"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Content Layer */}
                  <div className={`relative z-10 w-full h-full flex flex-col p-6 transition-colors duration-500 ${isHovered ? 'text-black' : 'text-white'}`}>
                    
                    {/* ID - Isomorphic on normal, flat on hover */}
                    <span 
                      className={`text-[12px] font-mono tracking-widest transition-all duration-500 ${isHovered ? 'text-gray-500' : 'text-gray-700 absolute top-10 left-8'}`}
                      style={{
                        transform: isHovered ? 'none' : 'skewY(-15deg)'
                      }}
                    >
                      {arm.id}
                    </span>

                    {/* Icon Logic */}
                    <div 
                      className={`transition-all duration-500 ${isHovered ? 'ml-auto w-10 h-10' : 'w-14 h-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}`}
                      style={{
                        backgroundColor: isHovered ? '#333' : '#9ca3af',
                        maskImage: `url(${arm.iconPath})`,
                        WebkitMaskImage: `url(${arm.iconPath})`,
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        transform: 'isHovered '
                      }}
                    />

                    {/* Description & Name */}
                    {isHovered ? (
                      <div className="mt-auto transition-all duration-500">
                        <p className="text-[13px] leading-snug font-medium mb-8 text-gray-800">
                          {arm.desc}
                        </p>
                        <h4 className="text-xl font-semibold text-right tracking-tight">
                          {arm.name}
                        </h4>
                      </div>
                    ) : (
                      /* TITLE IN DIRECTION: Added skewY to align with the SVG path */
                      <span 
                        className="absolute bottom-14 right-8 text-[11px] uppercase tracking-[0.2em] text-gray-500 text-right leading-tight max-w-[100px] transition-all duration-500"
                        style={{
                          transform: 'skewY(-15deg)'
                        }}
                      >
                        {arm.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Branding... (Keep as is) */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-end mt-auto pt-10 pb-12">
        <h5 className="text-gray-300 text-[12px] tracking-wide max-w-[200px] leading-relaxed mb-8 md:mb-0">
          Governance is designed <br />in, not enforced later.
        </h5>

        <div className="bg-[#D1D1D1] text-black px-6 py-5 rounded-sm flex gap-6 max-w-md items-center shadow-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="28" viewBox="0 0 35 28" fill="none">
            <rect x="14" y="21" width="7" height="7" fill="#3D3D3D"/>
            <rect x="21" y="7" width="7" height="7" fill="#3D3D3D"/>
            <rect x="21" y="14" width="7" height="7" fill="#3D3D3D"/>
            <rect x="28" y="7" width="7" height="7" fill="#3D3D3D"/>
            <rect x="7" y="14" width="7" height="7" fill="#3D3D3D"/>
            <rect y="14" width="7" height="7" fill="#3D3D3D"/>
            <rect x="7" width="7" height="7" fill="#3D3D3D"/>
            <rect x="14" y="7" width="7" height="7" fill="#3D3D3D"/>
            <rect x="21" width="7" height="7" fill="#3D3D3D"/>
          </svg>
          <div>
            <h4 className="font-bold text-lg leading-tight tracking-tight">Ascella Group</h4>
            <p className="text-[14px] text-gray-800 font-semibold">
              Coordinated execution without loss of control.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-400/60 z-10" />
    </div>
  );
};

export default ExecutionTogether;