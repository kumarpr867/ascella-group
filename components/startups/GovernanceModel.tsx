'use client';

import React from 'react';

const GovernanceModel = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#000000] text-white font-sans overflow-hidden">
      {/* 1. Global Grid Overlay - Bilkul image jaisa */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical Lines */}
        <div className="absolute inset-0 flex justify-between px-[5%]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-full w-[1px] bg-white/[0.08]" />
          ))}
        </div>
        {/* Horizontal Lines */}
        <div className="absolute inset-0 flex flex-col justify-between py-[10%]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full h-[1px] bg-white/[0.08]" />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-20 py-24">
        
        {/* 2. Top Bracket Caption */}
        <div className="flex justify-center mb-32">
          <div className="flex items-start text-neutral-500">
            <span className="text-2xl font-extralight leading-none mt-[-4px]">[</span>
            <p className="px-4 text-[10px] tracking-[0.15em] uppercase text-center leading-relaxed">
              Support embeds execution discipline, <br />
              <span className="opacity-70">not short-term delivery assistance.</span>
            </p>
            <span className="text-2xl font-extralight leading-none mt-[-4px]">]</span>
          </div>
        </div>

        {/* 3. Main Bento Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-l border-t border-white/[0.08]">
          
          {/* LEFT: Large Circle Section (Spans 2 columns) */}
          <div className="relative col-span-2 min-h-[500px] border-r border-b border-white/[0.08] p-12 flex items-end">
            {/* The Glass Circle */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square rounded-full border border-white/20"
              style={{
                background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 80%)',
                boxShadow: 'inset 0 0 50px rgba(255,255,255,0.05)',
                backdropFilter: 'blur(1px)'
              }}
            />
            
            {/* Text Overlay on Circle */}
            <div className="relative z-20">
              <span className="block text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-4">
                Governance Model
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
                <span className="text-white">Governance is introduced early</span><br />
                <span className="text-neutral-500">to keep execution controlled as complexity grows.</span>
              </h2>
            </div>
          </div>

          {/* CENTER: Progressive Introduction */}
          <div className="col-span-1 border-r border-b border-white/[0.08] p-10 flex flex-col justify-end">
            <h4 className="text-xl font-normal mb-6 text-white">Progressive Introduction</h4>
            <p className="text-sm text-neutral-500 leading-relaxed font-light">
              Governance structures are introduced gradually as scale increases. 
              Early-stage flexibility is preserved while accountability and oversight mature 
              in parallel with organisational growth.
            </p>
          </div>

          {/* RIGHT: Operating Framework & Adaptability */}
          <div className="col-span-1 flex flex-col">
            {/* Top Part */}
            <div className="border-r border-b border-white/[0.08] p-10 flex-1">
              <h4 className="text-xl font-normal mb-6 text-white">Operating Framework</h4>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">
                Startups in the programme operate within Ascella’s governance framework from the outset. 
                Decision rights, accountability paths, and escalation mechanisms are established.
              </p>
            </div>
            {/* Bottom Part */}
            <div className="border-r border-b border-white/[0.08] p-10 flex-1">
              <p className="text-lg text-neutral-400 leading-snug font-light">
                Execution remains adaptable to evolving startup environments. 
                <span className="text-neutral-600 block mt-2 italic">
                  Accountability, ownership, and oversight remain clearly defined at every stage.
                </span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GovernanceModel;