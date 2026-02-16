"use client";

import React from 'react';
import Image from 'next/image';
import { LayoutGrid, Target, Settings, ShieldCheck } from 'lucide-react';

const CurrentOpenings = () => {
  const gridData = [
    { id: 1, empty: true }, 
    {
      id: 2,
      title: "Scope of responsibility",
      icon: <Target className="w-6 h-6 text-gray-400" />,
      description: "The outcomes the role owns, the decisions it is accountable for, and the execution areas it governs.",
    },
    {
      id: 3,
      title: "Accountability expectations",
      icon: <ShieldCheck className="w-6 h-6 text-gray-400" />,
      description: "How responsibility is measured, how delivery is reviewed, and how performance aligns with operating objectives.",
    },
    {
      id: 4,
      title: "Operating context",
      icon: <LayoutGrid className="w-6 h-6 text-gray-400" />,
      description: "The execution environment, pod structure, and cross-functional dependencies in which the role operates.",
    },
    { id: 5, empty: true }, 
    {
      id: 6,
      title: "Reporting and governance structure",
      icon: <Settings className="w-6 h-6 text-gray-400" />,
      description: "How the role fits within Ascella's oversight framework, including escalation paths and decision authority.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white p-5 pb-32 overflow-hidden flex flex-col items-start">
      
      
      <div className="absolute left-[-140px] top-[20%] w-3/4 h-full opacity-30 pointer-events-none z-0">
        <Image 
          src="/current.png" 
          alt="Background Decoration" 
          fill
          className="object-contain object-left-top" 
          priority
        />
      </div>

      
      <div className="relative z-10 mb-12 w-full max-w-5xl">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-6">
          Roles & Opportunities
        </p>

        <h1 className="text-4xl md:text-5xl font-light leading-tight text-white">
          Current openings are <span className="text-gray-400 ">aligned to</span>
        </h1>

        <div className="text-4xl md:text-5xl font-light leading-tight text-gray-400 mt-2 ml-16 md:ml-55">
          execution and governance needs.
        </div>
      </div>

      
      <div className="relative z-10 w-full flex justify-end pr-[150px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> 
          {gridData.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                width: '289px', 
                height: '270px',
                borderColor: 'rgba(61, 61, 61, 1)' 
              }} 
              className={`p-8 flex flex-col justify-between transition-all duration-300 ${
                item.empty 
                  ? "bg-transparent border-none" 
                  : "bg-black/60 backdrop-blur-[11.6px] border rounded-sm" 
              }`}
            >
              {!item.empty && (
                <>
                  <div className="space-y-6">
                    <div className="opacity-80">{item.icon}</div>
                    <h3 className="text-xl font-medium tracking-tight leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentOpenings;