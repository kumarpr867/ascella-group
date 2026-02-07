'use client';

import React, { useState } from 'react';

interface FocusItem {
  id: string;
  title: string;
  description: string;
}

const focusData: FocusItem[] = [
  {
    id: '01',
    title: 'Operating Structure Design',
    description: 'Governance, accountability, and oversight frameworks are designed before growth begins. This ensures decision rights, escalation paths, and ownership remain clear as teams and systems expand.',
  },
  {
    id: '02',
    title: 'Execution Pod Integration',
    description: 'Standardizing how decentralized teams execute high-velocity tasks while maintaining alignment with core strategic objectives.',
  },
  {
    id: '03',
    title: 'Security & Risk Readiness',
    description: 'Embedding automated compliance and threat detection into the architectural foundation to prevent technical debt.',
  },
  {
    id: '04',
    title: 'Scale-Readiness Planning',
    description: 'Stress-testing operational workflows to ensure the infrastructure can handle 10x growth without performance degradation.',
  },
];

export default function Focuses() {
  // Setting the first item as active by default to match the image
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="w-full bg-black text-white py-20 font-sans selection:bg-white selection:text-black">
      {/* Top Grid Border */}
      <div className="w-full border-t border-white/10" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header Row: 12-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 items-start">
          {/* Left Column: Lorem/Body Text */}
          <div className="md:col-span-3">
            <p className="text-[11px] leading-relaxed text-neutral-500 uppercase tracking-widest max-w-[240px]">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
              Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
            </p>
          </div>

          {/* Right Column: Main Headline */}
          <div className="md:col-start-6 md:col-span-7 text-right md:text-left">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-[1.1]">
              <span className="block text-white">The programme focuses on</span>
              <span className="block text-neutral-500">
                embedding operating discipline before scale introduces complexity.
              </span>
            </h2>
          </div>
        </div>

        {/* List Section */}
        <div className="mt-12">
          {focusData.map((item, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div 
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className="group cursor-pointer border-t border-white/10 last:border-b last:border-white/10 transition-colors duration-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 py-8 md:py-12 items-center text-center">
                  
                  {/* Left Index */}
                  <div className="hidden md:block md:col-span-1 text-left">
                    <span className={`text-sm font-mono tracking-tighter ${isActive ? 'text-white' : 'text-neutral-600'}`}>
                      [{item.id}]
                    </span>
                  </div>

                  {/* Center Title Area */}
                  <div className="md:col-span-10 flex flex-col items-center justify-center space-y-6">
                    <div className="flex items-center justify-center space-x-4">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                      <h3 className={`text-2xl md:text-4xl tracking-tight transition-all duration-500 ${
                        isActive ? 'text-white font-normal' : 'text-neutral-700 font-light hover:text-neutral-400'
                      }`}>
                        {item.title}
                      </h3>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                    </div>

                    {/* Active Description */}
                    {isActive && (
                      <p className="max-w-md text-sm md:text-base text-neutral-500 leading-relaxed mx-auto px-4">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Right Index (Mirrored) */}
                  <div className="hidden md:block md:col-span-1 text-right">
                    <span className={`text-sm font-mono tracking-tighter ${isActive ? 'text-white' : 'text-neutral-600'}`}>
                      [{item.id}]
                    </span>
                  </div>

                  {/* Mobile Mobile Index (shown only on small screens) */}
                  <div className="md:hidden mt-4">
                     <span className="text-xs font-mono text-neutral-600">[{item.id}]</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}