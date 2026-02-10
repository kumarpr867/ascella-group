"use client";

import React from "react";

const Professionals = () => {
  const features = [
    { text: "Value clear ownership and accountability" },
    { text: "Prefer structured operating models over ad-hoc delivery" },
    { text: "Are comfortable working within governance and oversight frameworks" },
    { text: "Structure enables clarity.", isSpecial: true },
    { text: "Prioritize execution quality over speed alone" },
    { text: "Operate confidently across multidisciplinary teams" },
  ];

  return (
    <section className="bg-black text-white w-full overflow-hidden">
      {/* --- TOP GRID LINE (Starting from 0) --- */}
      <div className="w-full border-t border-white/10" />

      {/* --- ROW 1: HEADER SECTION --- */}
      <div className="grid grid-cols-12">
        {/* Left Side Gutter */}
        
        
        {/* Header Content Area */}
        <div className="col-span-10 p-12 lg:p-20">
          <div className="flex items-center gap-3 mb-8">
            {/* The diamond/plus icon from image */}
            <div className="relative w-4 h-4">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white" />
              <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white" />
            </div>
            <span className="text-[11px] tracking-[0.25em] uppercase opacity-60 font-medium">
              Who this is for
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light leading-[1.1] max-w-5xl tracking-tight">
            Ascella is suited for <span className="text-white">professionals</span>{" "}
            <span className="opacity-20">
              who operate effectively within structured execution environments
            </span>
          </h2>
        </div>

        {/* Right Side Gutter */}
      
      </div>

      {/* --- GRID SECTION (Rows 2 & 3) --- */}
      <div className="w-full border-t border-white/10">
        <div className="grid grid-cols-12">
          {/* Left Side Gutter continues */}
          <div className="col-span-1 border-r border-white/10" />

          {/* Main 3-Column Content Grid */}
          <div className="col-span-10 grid grid-cols-1 md:grid-cols-3">
            {features.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center justify-between p-12 min-h-[480px] 
                  ${index < 3 ? "border-b" : ""} 
                  ${index % 3 !== 3 ? "md:border-r" : ""} 
                  border-white/10`}
              >
                {/* Visual Area (3js Placeholders) */}
                <div className="w-full flex-1 flex items-center justify-center">
                  {item.isSpecial ? (
                    <div className="absolute inset-0 overflow-hidden bg-neutral-900/20">
                      {/* Smoke/Fluid Background Placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center p-10">
                        <p className="text-2xl font-light text-center leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-44 h-44 flex items-center justify-center">
                      {/* Orbiting UI elements from image */}
                      <div className="absolute inset-0 border border-dashed border-white/20 rounded-full" />
                      <div className="absolute inset-6 border border-white/5 rounded-full" />
                      <div className="w-2 h-2 bg-white rounded-full absolute top-0 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      {/* Optional: Second dot for more complex orbits */}
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full absolute right-4 top-1/4" />
                    </div>
                  )}
                </div>

                {/* Content Below the Visuals */}
                {!item.isSpecial && (
                  <div className="mt-10 text-center">
                    <p className="text-[13px] opacity-60 leading-relaxed max-w-[200px]">
                      {item.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Gutter continues */}
          <div className="col-span-1 border-l border-white/10" />
        </div>
      </div>

      {/* Margin Bottom as requested */}
         <div className="w-full border-t border-white/10" />
      <div className="w-full h-24 bg-black" />
    </section>
  );
};

export default Professionals;