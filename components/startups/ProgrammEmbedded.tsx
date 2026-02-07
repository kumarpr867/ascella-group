'use client';
import React from 'react';

const ProgramEmbedded = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      
      {/* ─── GRID LINES ─── */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/10 z-50" />
      <div className="absolute top-0 left-2 sm:left-4 lg:left-24 w-px h-full bg-white/10 z-50" />
      <div className="absolute top-0 right-2 sm:right-4 lg:right-24 w-px h-full bg-white/10 z-50" />
      <div className="absolute top-[50%] left-0 w-full h-px bg-white/10 z-50" />
      <div className="absolute top-[50%] left-[33.33%] w-px h-full bg-white/10 z-50" />
      <div className="absolute top-[50%] left-[66.66%] w-px h-full bg-white/10 z-50" />

      <div className="relative z-40 flex flex-col min-h-screen">
        
        {/* UPPER SECTION: Exact Text Layout from Image */}
        <div className="h-[50vh] flex flex-col justify-end pb-24 px-10 lg:px-32">
          {/* Top Right Grid/Visual from Image */}
          <div className="absolute top-12 right-32 w-64 h-48 opacity-60">
             <img src="/grid-visual.png" alt="" className="object-contain w-full h-full" />
          </div>

          <div className="max-w-4xl space-y-1">
            <h2 className="text-[32px] md:text-[42px] font-light tracking-tight">
              The Startups Programme embeds
            </h2>
            <h2 className="text-[32px] md:text-[42px] text-white/40 font-extralight tracking-tight leading-tight">
              operating structure, governance, and <br />
              accountability before scale begins.
            </h2>
          </div>
        </div>

        {/* BOTTOM SECTION: 3-Column Grid as per Image */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3">
          
          {/* Column 1: Why early structure */}
          <div className="p-10 lg:p-20 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Dot Icon from Screenshot */}
              <div className="flex flex-col gap-1 opacity-60">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-white/40" />
                  <div className="w-1.5 h-1.5 bg-white" />
                </div>
                <div className="w-1.5 h-1.5 bg-white/40" />
              </div>
              <h3 className="text-2xl font-light leading-tight max-w-[240px]">
                Why operating structure is introduced early
              </h3>
            </div>
            
            <div className="text-[12px] text-white/40 space-y-4 leading-relaxed max-w-[280px] mt-12">
              <p>Most early-stage companies prioritise product, growth, and funding.</p>
              <p>Operating structure — governance, accountability, and execution control — is often deferred until complexity forces reactive changes.</p>
              <p>Introducing structure early prevents execution debt and coordination breakdowns later.</p>
            </div>
          </div>

          {/* Column 2: Center Visual with Bottom Text Overlay */}
          <div className="relative flex flex-col justify-end overflow-hidden border-x border-white/5">
            <img 
              src="/center-abstract.png" 
              className="absolute inset-0 w-full h-full object-cover opacity-80" 
              alt="Execution structure"
            />
            <div className="relative z-10 p-10 lg:p-20 bg-gradient-to-t from-black via-black/20 to-transparent">
              <p className="text-[16px] leading-snug font-light max-w-[180px]">
                Early structure prevents later execution debt.
              </p>
            </div>
          </div>

          {/* Column 3: How programme supports */}
          <div className="p-10 lg:p-20 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Different Dot Icon Pattern */}
              <div className="flex flex-col items-end gap-1 opacity-40">
                <div className="w-1.5 h-1.5 bg-white" />
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-white/40" />
                  <div className="w-1.5 h-1.5 bg-white" />
                </div>
              </div>
              <h3 className="text-2xl font-light leading-tight max-w-[240px]">
                How the programme supports controlled scale
              </h3>
            </div>

            <div className="text-[12px] text-white/40 space-y-4 leading-relaxed max-w-[280px] mt-12">
              <p>The Startups Programme introduces governance models, accountability frameworks, and execution discipline from the beginning.</p>
              <p>This ensures teams, vendors, and systems remain aligned as the organisation grows.</p>
              <p>Scale becomes deliberate, not improvised.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProgramEmbedded;