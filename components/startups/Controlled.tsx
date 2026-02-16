'use client';
import React from 'react';
import Link from 'next/link';

const Controlled = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col border border-white/20">
      
      {/* --- EDGE-TO-EDGE GRID LINES --- */}
      
      {/* 1. Main Navbar Line (Top) */}
      <div className="absolute  left-0 w-full h-px bg-white/20 z-50" />
      
     
      {/* Iski position aap adjust kar sakte hain (e.g., top-[100px]) */}
      <div className="absolute top-[100px] left-0 w-full h-px bg-white/20 z-50" />
      
      {/* 3. Bottom Horizontal Line (Above Footer) */}
      <div className="absolute bottom-[120px] left-0 w-full h-px bg-white/20 z-50" />
      
      {/* Left Vertical Line */}
      <div className="absolute top-0 left-6 sm:left-10 lg:left-24 w-px h-full bg-white/20 z-50" />
      
      {/* Right Vertical Line */}
      <div className="absolute top-0 right-6 sm:right-10 lg:right-24 w-px h-full bg-white/20 z-50" />


      {/* --- IMAGE CONTAINER (CLIPPED TO VERTICAL LINES) --- */}
      {/* Image ab left/right vertical lines ke bahar nahi dikhegi */}
      <div className="absolute top-[100px] bottom-[120px] left-6 sm:left-10 lg:left-24 right-6 sm:right-10 lg:right-24 overflow-hidden z-10">
        <img 
          src="/globe2.png" 
          alt="Globe Decor"
          className="absolute opacity-55 object-contain max-w-none"
          style={{
            width: '761px',
            height: '677px',
            top: '30px',
            left: '-200px',
            transform: 'rotate(158.67deg)',
          }}
        />
      </div>


      {/* --- CONTENT LAYER --- */}
      <div className="relative z-40 flex flex-col h-screen">
        
        {/* Top Spacer - Matches the grid lines height */}
        <div className="h-[100px] w-full" />

        <div className="flex-grow flex flex-col justify-center items-end px-10 lg:px-40">
          <div className="max-w-4xl text-right">
            <h2 className="text-[32px] md:text-[50px] lg:text-[64px] leading-[1.05] font-light tracking-tight">
              Controlled execution <br />
              units for <span className="text-white/30 font-extralight italic">complex <br />operating environments</span>
            </h2>
            
            <div className="mt-16 flex items-center justify-end gap-8 group cursor-pointer">
              <p className="text-[10px] md:text-xs text-white/50 max-w-[200px] leading-relaxed uppercase tracking-[0.2em] text-right">
                Early-stage execution succeeds or fails based on operating structure.
              </p>
              <div className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700">
                <span className="text-2xl font-light">↓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="h-[120px] flex items-center justify-between px-10 lg:px-32 relative z-50">
          <Link href="/engageWithUs">
            <button className="relative px-8 py-4 border border-white/10 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all">
              Engage With Us <span className="ml-2 opacity-30">:::</span>
            </button>
          </Link>

          <p className="hidden md:block text-[9px] tracking-[0.15em] text-white/20 max-w-[320px] text-right uppercase leading-tight">
            The Ascella Startups Programme embeds governance, accountability, and execution discipline before scale begins.
          </p>
        </div>
      </div>

    </section>
  );
};

export default Controlled;