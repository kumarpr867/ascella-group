'use client';
import React from 'react';
import Link from 'next/link';

const Controlled = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col">
      
      {/* Horizontal Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/10 z-50" />
      
      {/* Left Vertical Line */}
      <div className="absolute top-0 left-2 sm:left-4 lg:left-24 w-px h-full bg-white/10 z-50" />
      
      {/* Right Vertical Line */}
      <div className="absolute top-0 right-2 sm:right-4 lg:right-24 w-px h-full bg-white/10 z-50" />

      {/* Grid Sub-lines */}
      <div className="absolute top-[100px] left-0 w-full h-px bg-white/10 z-50" />
      <div className="absolute bottom-[120px] left-0 w-full h-px bg-white/10 z-50" />

      {/* Side Masks */}
      <div className="absolute top-0 left-0 w-2 sm:w-4 lg:w-24 h-full bg-black z-20" />
      
      <div className="absolute top-0 right-0 w-2 sm:w-4 lg:w-24 h-full bg-black z-20" />
      
      <div className="absolute bottom-0 left-0 w-full h-[120px] bg-black z-20 border-t border-white/10" />

      {/* Decorative Globe Overlay */}
      <div className="absolute z-10 pointer-events-none opacity-50 globe-decor" />

      {/* Main Content Layer */}
      <div className="relative z-40 flex flex-col h-screen">
        
        <div className="h-[100px] w-full" />

        <div className="flex-grow flex flex-col justify-center items-end lg:px-80">
          <div className="max-w-3xl text-right">
            <h2 className="text-[30px] md:text-[42px] lg:text-[48px] leading-[1.1] font-light ">
              Controlled execution <br />
              units for <span className="text-white/40 font-extralight">complex <br />operating environments</span>
            </h2>
            
            <div className="mt-12 flex items-center justify-end gap-6 group cursor-pointer">
              <p className="text-[10px] md:text-xs text-white/60 max-w-[220px] leading-relaxed uppercase tracking-widest">
                Early-stage execution succeeds or fails based on operating structure.
              </p>
              <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <span className="text-2xl font-light">↓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Container - Padding-left increased to push button right of the line */}
        <div className="h-[120px] flex items-center justify-between p-5 px-10 lg:pl-32 lg:pr-24 lg: pl-10 relative z-50">
          
          <Link href="/engageWithUs">
            <button className="relative z-25 justify-center px-8 py-4 border border-white/20 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all">
              Engage With Us <span className="ml-2 opacity-40">:::</span>
            </button>
          </Link>

          <p className="hidden md:block text-[9px] tracking-[0.1em] text-white/30 max-w-[320px] text-right uppercase leading-tight">
            The Ascella Startups Programme embeds governance, accountability, and execution discipline before scale begins.
          </p>
        </div>
      </div>

    </section>
  );
};

export default Controlled;