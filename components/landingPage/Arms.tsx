'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { content } from "./data/content";

export default function Arms() {
  const [index, setIndex] = useState(0);
  const total = content.length;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(id);
  }, [total]);

  return (
    <section className="w-full flex flex-col items-center justify-center py-16 md:py-24 px-4 bg-black font-sans">
      
      {/* Upper Header */}
      <div className="text-center max-w-3xl mb-10 md:mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 0V14M0 7H14" stroke="white" strokeWidth="1.5"/>
          </svg>
          <span className="uppercase text-[10px] tracking-[0.4em] text-white font-medium">
            Execution Arms
          </span>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-4xl text-white leading-tight font-light tracking-tight">
          We take full responsibility for critical outcomes that organisations
          cannot afford to fragment
        </h2>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl bg-white rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl p-2">
        
        {/* Mobile Layout: Stacked */}
        {/* Desktop Layout: Flex Row */}
        <div className="flex flex-col md:flex-row min-h-auto md:min-h-[720px]">
          
          {/* Navigation Sidebar */}
          <aside className="w-full md:w-[320px] px-6 py-8 md:p-12 flex flex-col gap-6 md:gap-0 md:justify-between">
            <div>
              {/* "Execution Arms" heading — hidden on mobile */}
              <h2 className="hidden md:block text-[11px] font-bold tracking-[0.2em] text-black mb-6 md:mb-12 uppercase">
                Execution Arms
              </h2>
              {/* Always vertical nav */}
              <nav className="flex flex-col gap-4 md:gap-6">
                {content.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setIndex(i)}
                    className={`text-left text-[13px] md:text-[15px] transition-all duration-300 ${
                      i === index
                        ? "text-black font-semibold md:translate-x-2"
                        : "text-gray-400 hover:text-gray-900"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Bottom section — hidden on mobile */}
            <div className="hidden md:flex flex-col gap-6 mt-auto">
              {/* Governance Text */}
              <p className="text-[12px] leading-relaxed text-gray-400 max-w-[240px]">
                All execution arms operate under{" "}
                <span className="text-black font-medium">Ascella Group governance</span>.
              </p>

              {/* Button */}
              <button className="group flex items-center justify-between w-full border border-black rounded-sm px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white">
                See How Works Delivers
                <span className="opacity-80 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect width="2" height="2" fill="currentColor" />
                    <rect y="6" width="2" height="2" fill="currentColor" />
                    <rect x="6" y="6" width="2" height="2" fill="currentColor" />
                    <rect x="6" width="2" height="2" fill="currentColor" />
                    <rect x="12" y="6" width="2" height="2" fill="currentColor" />
                    <rect x="6" y="12" width="2" height="2" fill="currentColor" />
                    <rect x="12" y="12" width="2" height="2" fill="currentColor" />
                  </svg>
                </span>
              </button>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 bg-white flex p-1">
            <div className="relative w-full bg-[#0F0F0F] rounded-[18px] md:rounded-[24px] overflow-hidden flex flex-col md:flex-row">
              
              {/* Left Side: Text Content */}
              <div className="w-full md:w-1/2 relative z-10 p-6 md:p-16 flex flex-col justify-between gap-6 md:gap-0">
                <div className="text-2xl md:text-3xl font-light">
                  <span className="text-white">0{index + 1}</span>
                  <span className="text-white/20">/0{total}</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h1 className="text-2xl md:text-4xl font-normal text-white mb-4 md:mb-6 tracking-tight">
                      {content[index].title}
                    </h1>
                    <div className="space-y-3 md:space-y-4 max-w-sm">
                      <p className="text-white/40 text-[13px] md:text-[15px] leading-relaxed">
                        {content[index].description}
                      </p>
                      <p className="text-[13px] md:text-[14px]">
                        <span className="text-white/80 font-medium">Outcome: </span>
                        <span className="text-white/80">
                          {content[index].outcome}
                        </span>
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Side: Image */}
              {/* On mobile: show below text. On desktop: show side by side */}
              <div className="flex flex-1 p-1 min-h-[220px] md:min-h-0">
                <div className="w-full h-full bg-black rounded-[10px] md:rounded-[12px] relative flex flex-col items-center justify-end px-6 md:px-[33px] py-6 md:py-[36px]">
                  
                  {/* Image Container with Animation */}
                  <div className="flex-1 w-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <img 
                          src={content[index].image} 
                          alt={content[index].title}
                          className="max-w-full max-h-[180px] md:max-h-[80%] object-contain select-none"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Pagination Dots */}
                  <div className="flex gap-2 md:gap-2.5 mt-4 md:mt-auto">
                    {content.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border transition-all duration-300 ${
                          i === index 
                            ? "bg-white border-white" 
                            : "bg-transparent border-white/20 hover:border-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
               
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}