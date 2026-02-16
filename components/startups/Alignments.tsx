"use client"
import React from 'react';

// Exact 3D Isometric SVG based on your screenshots
const Isometric3D = ({ opacity = "0.12" }) => (
  <svg width="128" height="75" viewBox="0 0 128 75" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 transition-opacity duration-500">
    {/* Top Face of the 3D Box */}
    <path 
      d="M127.007 37.498L64.0762 0.624023L0.989258 37.5137L64.4951 74.4209L127.007 37.498Z" 
      stroke="url(#paint0_linear)" 
      strokeOpacity={opacity} 
      strokeWidth="1"
    />
    {/* 3D Depth Lines (The 'sides' of the box visible in your image) */}
    <path 
      d="M0.989258 37.5137V45.5137L64.4951 82.4209L127.007 45.498V37.498" 
      stroke="url(#paint0_linear)" 
      strokeOpacity={Number(opacity) * 0.5} 
      strokeWidth="1"
    />
    <path 
      d="M64.4951 74.4209V82.4209" 
      stroke="url(#paint0_linear)" 
      strokeOpacity={Number(opacity) * 0.5} 
      strokeWidth="1"
    />
    <defs>
      <linearGradient id="paint0_linear" x1="4.14805e-07" y1="36.5" x2="121" y2="40.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const Alignments = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center py-10  font-sans overflow-hidden relative">
      
      {/* Header Section */}
      <div className="flex flex-col items-center w-full max-w-[720px] text-center px-4 z-10 relative">
        <header className="flex flex-col gap-4">
          <h3 className="text-[40px] md:text-[40px] leading-[1.1] font-normal tracking-tight">
            Alignment is the first step toward structured execution readiness.
          </h3>
          <p className="text-white/80 text-base md:text-mid max-w-[600px] mx-auto leading-relaxed">
            The Startups Programme begins with an alignment conversation focused on 
            operating context, accountability expectations, and readiness for governed execution.
          </p>
        </header>
      </div>

      {/* --- 100% EXACT ISOMETRIC GRID --- */}
      <div className="flex justify-center items-center w-full h-[180px] my-[-30px] pointer-events-none select-none overflow-visible">
        <div className="flex space-x-[-2px]">
          <Isometric3D opacity="0.05" />
          <Isometric3D opacity="0.1" />
          <Isometric3D opacity="0.6" />
          <Isometric3D opacity="1.0" />
          <Isometric3D opacity="0.6" /> 
          <Isometric3D opacity="0.1" />
          <Isometric3D opacity="0.05" />
        </div>
      </div>

      {/* --- FORM CONTAINER BOX --- */}
      <div 
        className="w-full max-w-[720px] min-h-[720px] border border-[#3D3D3D] rounded-[12px] bg-[#000]/90 backdrop-blur-md flex flex-col items-center px-8 md:px-[100px] z-20 relative"
        style={{ paddingTop: '60px' }}
      >
        
        {/* Top Icon */}
        <div className="mb-10 flex justify-center">
          <img src="/image (1).png" alt="Icon" className="w-24 h-24 object-contain" />
        </div>

        {/* Form Content */}
        <div className="w-full flex flex-col gap-5 text-center">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-normal tracking-tight text-white/90">Let's Get You Started</h2>
            <p className="text-white/40 text-sm max-w-[400px] mx-auto">
              Fill out the form below and we'll get in touch to explore how Ascella can help power your success
            </p>
          </div>

          <form className="flex flex-col gap-4 text-left" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-[#0A0A0A] border border-[#262626] p-4 rounded-md text-sm outline-none focus:border-white/40 transition-colors"
            />
            <input 
              type="text" 
              placeholder="Your Role / Title *" 
              required
              className="w-full bg-[#0A0A0A] border border-[#262626] p-4 rounded-md text-sm outline-none focus:border-white/40 transition-colors"
            />
            <input 
              type="tel" 
              placeholder="Phone Number *" 
              required
              className="w-full bg-[#0A0A0A] border border-[#262626] p-4 rounded-md text-sm outline-none focus:border-white/40 transition-colors"
            />
            <input 
              type="email" 
              placeholder="Email Address *" 
              required
              className="w-full bg-[#0A0A0A] border border-[#262626] p-4 rounded-md text-sm outline-none focus:border-white/40 transition-colors"
            />
            
            <button 
              type="submit" 
              className="mt-6 w-full bg-white text-black font-semibold py-4 rounded-md hover:bg-gray-200 transition-all active:scale-[0.98] text-base"
            >
              Next
            </button>
          </form>
        </div>
      </div>

      <div className="w-full border-t border-white/20" />
    </div>
  );
};

export default Alignments;