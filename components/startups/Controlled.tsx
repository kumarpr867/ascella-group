'use client';
import React from 'react';
import Link from 'next/link';

const Controlled = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col">
      
      {/* ─── 1. EDGE-TO-EDGE GRID LINES ─── */}
      {/* Topmost Horizontal Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/10 z-50" />
      
      {/* Vertical Line Left (Margin) */}
      <div className="absolute top-0 left-2 sm:left-4 lg:left-24 w-px h-full bg-white/10 z-50" />
      
      {/* Vertical Line Right (Margin) */}
      <div className="absolute top-0 right-2 sm:right-4 lg:right-24 w-px h-full bg-white/10 z-50" />

      {/* Row Separator Lines */}
      <div className="absolute top-[100px] left-0 w-full h-px bg-white/10 z-50" />
      <div className="absolute bottom-[120px] left-0 w-full h-px bg-white/10 z-50" />


      {/* ─── 2. BLACK MASKING PANELS (To hide globe in margins) ─── */}
      {/* Left Mask: Engage with us ke neeche wala portion cover karne ke liye */}
      <div className="absolute top-0 left-0 w-2 sm:w-4 lg:w-24 h-full bg-black z-20" />
      
      {/* Right Mask: Symmetry ke liye */}
      <div className="absolute top-0 right-0 w-2 sm:w-4 lg:w-24 h-full bg-black z-20" />
      
      {/* Bottom Mask: Taaki footer ke peeche image na dikhe agar niche ja rahi ho */}
      <div className="absolute bottom-0 left-0 w-full h-[120px] bg-black z-20 border-t border-white/10" />


      {/* ─── 3. GLOBE IMAGE (Between the lines) ─── */}
      <div 
        className="absolute z-10 pointer-events-none opacity-50"
        style={{
          width: '761.33px',
          height: '677.03px',
          bottom: '-50px', 
          left: '-150px', 
          transform: 'rotate(158.67deg)', 
          backgroundImage: `url('/globe2.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />


      {/* ─── 4. CONTENT LAYER (Above masks and image) ─── */}
      <div className="relative z-40 flex flex-col h-screen">
        
        {/* TOP SECTION (100px) */}
        <div className="h-[100px] w-full" />

        {/* MIDDLE SECTION (Headline) */}
        <div className="flex-grow flex flex-col justify-center items-end px-10 lg:px-80">
          <div className="max-w-3xl text-right">
            <h1 className="text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] font-light ">
              Controlled execution <br />
              units for <h1 className="text-white/40 font-extralight">complex operating environments</h1>
            </h1>
            
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

        {/* FOOTER SECTION (120px) */}
        <div className="h-[120px] flex items-center justify-between px-10 lg:px-24">
          {/* Button is now safely above the black mask */}
          <Link href="/engageWithUs">
            <button className="relative z-25 px-8 py-4 border border-white/20 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all">
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