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
    <section className="w-full flex flex-col items-center justify-center py-24 px-4 bg-black">
      
      
      <div className="text-center max-w-3xl mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 0V14M0 7H14" stroke="white" strokeWidth="1.5"/>
          </svg>
          <span className="uppercase text-[10px] tracking-[0.4em] text-white font-medium">
            Execution Arms
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl text-white leading-tight font-light tracking-tight">
          We take full responsibility for critical outcomes that organisations
          cannot afford to fragment
        </h2>
      </div>

     
      <div className="w-full max-w-7xl bg-white rounded-[24px] overflow-hidden flex shadow-2xl min-h-[680px] p-2">
        
        
        <aside className="w-[320px] p-12 flex flex-col justify-between">
          <div>
            <h2 className="text-[14px] font-bold tracking-[0.2em] text-black mb-12 uppercase">
              Execution Arms
            </h2>
            <nav className="flex flex-col gap-5">
              {content.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setIndex(i)}
                  className={`text-left text-[16px] transition-all duration-300 ${
                    i === index ? "text-black font-semibold translate-x-2" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto">
            <p className="text-[11px] text-gray-400 leading-relaxed mb-6 max-w-[220px]">
              All execution arms operate under Ascella Group governance.
            </p>
            <button className="group flex items-center justify-between w-full border border-black rounded-sm px-5 py-3 text-[13px] font-medium text-black transition-all hover:bg-black hover:text-white">
              See How Works Delivers
              <span className="grid grid-cols-2 gap-0.5 opacity-60 group-hover:opacity-100">
                <div className="w-1 h-1 bg-current rounded-full"></div>
                <div className="w-1 h-1 bg-current rounded-full"></div>
                <div className="w-1 h-1 bg-current rounded-full"></div>
                <div className="w-1 h-1 bg-current rounded-full"></div>
              </span>
            </button>
          </div>
        </aside>

       
        <div className="flex-1 bg-white flex p-1">
          <div className="relative w-full h-full bg-[#0D0D0D] rounded-[20px] overflow-hidden flex">
            
           
            <div className="w-full md:w-1/2 relative z-10 p-16 flex flex-col justify-between">
           
              <div className="text-3xl font-light">
                <span className="text-white">0{index + 1}</span>
                <span className="text-white/20">/0{total}</span>
              </div>

              
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mb-12"
                >
                  <h1 className="text-4xl font-normal text-white mb-8 tracking-tight leading-tight">
                    {content[index].title}
                  </h1>

                  <div className="space-y-6 max-w-sm">
                    <p className="text-white/50 text-[15px] leading-relaxed">
                      {content[index].description}
                    </p>
                    {content[index].outcome && (
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-[15px]">
                          <span className="text-white/90 font-medium">Outcome: </span>
                          <span className="text-white/50 font-light">
                            {content[index].outcome}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

            
              <div className="flex items-center gap-3">
                {content.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === index ? "w-3 h-3 bg-white" : "w-2 h-2 border border-white/40 hover:border-white"
                    }`}
                  />
                ))}
              </div>
            </div>

           
            <div className="hidden md:flex flex-1 items-center justify-center p-8 relative overflow-hidden">
              
               <div className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
               </div>
               
            
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5 }}
                 className="relative z-10 w-full h-full flex items-center justify-center"
               >
                 
                 <div className="w-4/5 aspect-video border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-white/20 text-xs uppercase tracking-widest">Illustration Asset</span>
                 </div>
               </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}