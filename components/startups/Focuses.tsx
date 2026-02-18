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
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="w-full bg-black text-white selection:bg-white selection:text-black font-['Montserrat',sans-serif]">
      
      {/* Top Edge-to-Edge Line */}
      <div className="w-full border-t border-white/10" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-20">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 items-start">
          <div className="md:col-span-3 pt-6">
            <p className="text-[10px] leading-relaxed  tracking-[0.3em] max-w-[420px] ">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </p>
          </div>

          <div className="md:col-start-6 md:col-span-7">
            <h3 className="text-2xl md:text-[38px]  tracking-tight leading-[1.05] text-right">
              <span className="block text-white">The programme focuses on</span>
              <span className="block text-neutral-500">
                embedding operating discipline <br />before scale introduces complexity.
              </span>
            </h3>
          </div>
        </div>
      </div>

      {/* Accordion / List Section with Edge-to-Edge Borders */}
      <div className="w-full">
        {focusData.map((item, index) => {
          const isActive = activeIndex === index;
          
          return (
            <div 
              key={item.id}
              onMouseEnter={() => setActiveIndex(index)}
              className="group cursor-pointer border-b border-white/10 transition-all duration-700 ease-in-out w-full"
            >
              {/* Content Container (Centered) */}
              <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <div className="grid w-full grid-cols-1 md:grid-cols-12 py-10 md:py-14 items-center">
                  
                  {/* Left ID */}
                  <div className="hidden md:block md:col-span-2">
                    <span className={`text-2xl font-light transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-20'}`}>
                      [{item.id}]
                    </span>
                  </div>

                  {/* Main Content Area */}
                  <div className="md:col-span-8 flex flex-col items-center">
                    <div className="flex items-center space-x-6">
                      {/* Left Dot */}
                      <span className={`w-1 h-1 rounded-full bg-cyan-400 transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                      
                      <h3 className={`text-3xl md:text-[36px] transition-all duration-500 ease-out leading-none
                        ${isActive 
                          ? 'text-white font-normal' 
                          : 'text-neutral-700 font-light hover:text-neutral-500'}`}
                        style={{ 
                          letterSpacing: '-2.52px', 
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* Right Dot */}
                      <span className={`w-1 h-1 rounded-full bg-cyan-400 transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                    </div>

                    {/* Animated Description */}
                    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isActive ? 'max-h-40 opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
                      <p className="max-w-md text-center text-sm md:text-[13px] text-neutral-400 leading-relaxed font-light tracking-wide px-4 border-l border-r border-white/5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right ID */}
                  <div className="hidden md:block md:col-span-2 text-right">
                    <span className={`text-2xl font-light transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-20'}`}>
                      [{item.id}]
                    </span>
                  </div>

                  {/* Mobile ID */}
                  <div className="md:hidden mt-4 text-center">
                     <span className="text-xs text-neutral-600">[{item.id}]</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}