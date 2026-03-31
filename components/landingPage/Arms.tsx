'use client'

import { motion, AnimatePresence, useInView } from "motion/react";
import { useState, useRef, useCallback, useEffect } from "react";
import { content } from "../../data/ArmsContent";
import Heading from "../headings/Heading";
import { useRouter } from "next/navigation";
import Reveal from "@/utils/Reveal";
import { slideInFromBottom } from "@/utils/motion";

export default function Arms() {

  const router = useRouter();

  const [screen, setScreen] = useState<'sm' | 'md' | 'lg'>('lg');

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setScreen('sm');
      else if (w < 1024) setScreen('md');
      else setScreen('lg');
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);


  const [index, setIndex] = useState(0);
  const total = content.length;
  const [direction, setDirection] = useState(1);
  const lastClickTime = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  // md screen
  useEffect(() => {
  if (screen !== 'md') return;

  let interval: NodeJS.Timeout;

  if (!isPaused) {
    interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % total);
    }, 3500);
  }

  return () => {
    if (interval) clearInterval(interval);
  };
}, [screen, isPaused, total]);

 const handleTouchStart = (e: React.TouchEvent) => {
  touchStartX.current = e.touches[0].clientX;
  setIsPaused(true);
};

const handleTouchMove = (e: React.TouchEvent) => {
  touchEndX.current = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  const diff = touchStartX.current - touchEndX.current;
  const threshold = 60;

  if (Math.abs(diff) < threshold) {
    setIsPaused(false);
    return;
  }

  if (diff > 0) {
    goTo(index + 1);
  } else {
    goTo(index - 1);
  }

  setIsPaused(false);
};

  useEffect(() => {
    if (isInView) {
      setIndex(0);
      setDirection(1);
    }
  }, [isInView]);

  const goTo = useCallback((next: number) => {
    const now = Date.now();
    if (now - lastClickTime.current < 600) return;
    lastClickTime.current = now;
    const clamped = Math.max(0, Math.min(total - 1, next));
    setDirection(clamped >= index ? 1 : -1);
    setIndex(clamped);
  }, [index, total]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as any },
    }),
  };

  return (
    <section ref={sectionRef} className="mx-10 lg:mx-20 xl:mx-24 flex flex-col items-center justify-center my-8 md:my-12">

      <Reveal variants={slideInFromBottom(0.2)} className="text-center max-w-4xl mb-10 md:mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heading text="Execution Arms" />
        </div>
        <h2 className="text-xl md:text-[24px] lg:text-[36px] text-white leading-tight tracking-tight">
          We take full responsibility for critical outcomes that organisations
          cannot afford to fragment
        </h2>
      </Reveal>

      <Reveal variants={slideInFromBottom(0.4)} className="w-full lg:max-w-7xl bg-white rounded-lg overflow-hidden shadow-2xl p-2">

        <div className="flex flex-col lg:flex-row min-h-auto md:h-[550px]">

          {/* Navigation Sidebar */}
          <aside className="w-full md:w-[320px] px-6  md:p-8 flex flex-col  md:gap-0 md:justify-between">
            <div>
              {/* Desktop/Tablet: "Execution Arms" heading */}
              <h5 className="hidden lg:block text-[20px] font-light text-black mb-6 md:mb-12 uppercase">
                Execution Arms
              </h5>

              {/* Mobile only: Dynamic counter in white sidebar */}
              <div className="lg:hidden text-[28px] font-light mb-6">
                <span className="text-black">0{index + 1}</span>
                <span className="text-black/20">/0{total}</span>
              </div>

              {/* Nav for Tablet/Desktop */}
              <nav className="hidden lg:flex flex-col gap-4 md:gap-6">
                {content.map((item, i) => (
                  <button
                    key={item.id}
                    onMouseEnter={() => {
                      if (screen === 'lg') goTo(i);
                    }}
                    onClick={() => goTo(i)}
                    className={`text-left text-[12px] md:text-[14px] transition-all duration-300 ${i === index
                      ? "text-black font-semibold md:translate-x-2"
                      : "text-gray-500 hover:text-gray-900"
                      }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Bottom section — tablet+ desktop */}
            <div className="hidden lg:flex flex-col gap-6 mt-auto">
              <p className="text-[12px] leading-relaxed text-gray-400 max-w-[240px]">
                All execution arms operate under{" "}
                <span className="text-black font-medium">Ascella Group governance</span>.
              </p>

              <button
                onClick={() => router.push("/execution-arms")}
                className="group flex items-center justify-between w-full border border-black rounded-sm px-5 py-3.5 text-[12px] font-bold uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white">
                See How It Is Delivered
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
            <div className="relative w-full bg-gray-500 rounded-lg overflow-hidden flex flex-col lg:flex-row ">

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col md:flex-row w-full h-full md:absolute md:inset-0"
                >
                  {/* Left Side: Text Content */}
                  <div
                    className="w-full md:w-1/2 relative z-10 p-6 md:p-16 flex flex-col justify-between gap-6 md:gap-0"
                    style={{ cursor: 'w-resize' }}
                    onClick={() => goTo(index - 1)}
                  >
                    {/* Counter: always visible on desktop, hidden on mobile (shown in white sidebar) */}
                    <div className="hidden md:block text-2xl md:text-3xl font-light">
                      <span className="text-white">0{index + 1}</span>
                      <span className="text-white/20">/0{total}</span>
                    </div>

                    <div>
                      {/* Title: always visible */}
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
                    </div>
                  </div>

                  {/* Right Side: Image */}
                  <div
                    className="flex-1 w-full flex bg-black items-center justify-center relative"
                    style={{ userSelect: 'none' }}
                  >
                    {/* Left half click → go back (mobile) */}
                    <div
                      className="absolute inset-y-0 left-0 w-1/2 z-10 md:hidden"
                      style={{ cursor: 'w-resize' }}
                      onClick={() => {
                        if (screen !== 'sm') goTo(index + 1);
                      }}
                    />
                    {/* Right half click → go forward (mobile) */}
                    <div
                      className="absolute inset-y-0 right-0 w-1/2 z-10 md:hidden"
                      style={{ cursor: 'e-resize' }}
                      onClick={() => {
                        if (screen !== 'sm') goTo(index + 1);
                      }}
                    />
                    {/* Desktop: full area click → go forward */}
                    <div
                      className="absolute inset-0 hidden md:block"
                      style={{ cursor: 'e-resize' }}
                      onClick={() => {
                        if (screen !== 'sm') goTo(index + 1);
                      }}
                    />

                    <div className="py-10 h-[300px] md:h-[400px] lg:h-[400px] flex items-center justify-center">
                      <img
                        src={content[index].image}
                        alt={content[index].title}
                        className="w-full h-full object-contain select-none"
                      />
                    </div>

                    {/* Mobile only: dots navigation */}
                    <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-20 md:hidden">
                      {content.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            goTo(i);
                          }}
                          className={`rounded-full transition-all duration-300 ${i === index
                            ? "bg-white w-4 h-2"
                            : "bg-white/40 w-2 h-2"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </Reveal>
    </section>
  );
}