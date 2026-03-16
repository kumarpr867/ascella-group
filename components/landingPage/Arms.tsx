'use client'

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { content } from "../../data/ArmsContent";
import Heading from "../headings/Heading";
import { useRouter } from "next/navigation";
import Reveal from "@/utils/Reveal";
import { slideInFromBottom } from "@/utils/motion";

export default function Arms() {

  const router = useRouter();

  const [index, setIndex] = useState(0);
  const total = content.length;
  const [paused, setPaused] = useState(false);

useEffect(() => {
  if (paused) return;

  const id = setInterval(() => {
    setIndex((prev) => (prev + 1) % total);
  }, 3000);

  return () => clearInterval(id);
}, [paused, total]);

  return (
    <section className="max-w-7xl xl:mx-auto mx-10 flex flex-col items-center justify-center my-24 ">

      {/* Upper Header */}
      <Reveal variants={slideInFromBottom(0.2)} className="text-center max-w-4xl mb-10 md:mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heading text="Execution Arms" />
        </div>
        <h2 className="text-xl md:text-[24px] lg:text-[36px] text-white leading-tight font-light tracking-tight">
          We take full responsibility for critical outcomes that organisations
          cannot afford to fragment
        </h2>
      </Reveal>

      {/* Main Container */}
      <Reveal variants={slideInFromBottom(0.4)} className="w-full mx:10 xl:mx-auto max-w-7xl lg:max-w-6xl bg-white rounded-lg overflow-hidden shadow-2xl p-2">

        {/* Mobile Layout: Stacked */}
        {/* Desktop Layout: Flex Row */}
        <div className="flex flex-col lg:flex-row min-h-auto lg:h-[550px]">

          {/* Navigation Sidebar */}
          <aside className="w-full md:w-[320px] px-6 py-8 md:p-8 flex flex-col gap-6 md:gap-0 md:justify-between">
            <div>
              {/* "Execution Arms" heading — hidden on mobile */}
              <h5 className="hidden lg:block text-[20px] font-light text-black mb-6 md:mb-12 uppercase">
                Execution Arms
              </h5>
              {/* Always vertical nav */}
              <nav className="flex flex-col gap-4 md:gap-6">
                {content.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setIndex(i)}
                    className={`text-left text-[12px] md:text-[14px] transition-all duration-300 ${i === index
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
            <div className="hidden lg:flex flex-col gap-6 mt-auto">
              {/* Governance Text */}
              <p className="text-[12px] leading-relaxed text-gray-400 max-w-[240px]">
                All execution arms operate under{" "}
                <span className="text-black font-medium">Ascella Group governance</span>.
              </p>

              {/* Button */}
              <button
                onClick={() => {
                  router.push("/execution-arms")
                }}
                className="group flex items-center justify-between w-full border border-black rounded-sm px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white">
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
            <div
              className="relative w-full bg-gray-500 rounded-lg overflow-hidden flex flex-col md:flex-row"
              onMouseDown={() => setPaused(true)}
              onMouseUp={() => setPaused(false)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
            >

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
                    <h3 className="text-[24px] md:text-[36px] font-normal text-white mb-4 md:mb-6 tracking-tight">
                      {content[index].title}
                    </h3>
                    <div className="space-y-3 md:space-y-4 max-w-sm">
                      <p className="text-white/40 text-b3 leading-relaxed">
                        {content[index].description}
                      </p>
                      <p className="text-b3">
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
              <div className="flex-1 w-full flex bg-black items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
                    className="py-10 h-[300px] md:h-[400px] lg:h-[400px] flex items-center justify-center"
                  >
                    <img
                      src={content[index].image}
                      alt={content[index].title}
                      className="w-full h-full object-contain select-none"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </Reveal>
    </section>
  );
}