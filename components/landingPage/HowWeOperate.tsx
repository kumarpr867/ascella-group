'use client';

import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";
import Heading from "../headings/Heading";
import Reveal from "@/utils/Reveal";
import { slideInFromBottom, slideInFromLeft, slideInFromRight } from "@/utils/motion";

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { x: { type: "spring", stiffness: 220, damping: 30 }, opacity: { duration: 0.25 } }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: { x: { type: "spring", stiffness: 220, damping: 30 }, opacity: { duration: 0.2 } }
  })
};

// ── Points data ───────────────────────────────────────────────────────────────
const points = [
  {
    svg: (
      <svg width="42" height="28" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="14" y="7" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="14" y="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="21" y="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="35" y="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="28" y="6" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect y="21" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="7" y="21" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect y="7" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="7" width="0" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
      </svg>
    ),
    count: "01",
    heading: "Structured authority",
    description: "Decision ownership stays defined from the start, with clear authority and outcome responsibility assigned to specific roles instead of shared committees.",
  },
  {
    svg: (
      <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="7" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="21" y="7" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="21" y="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect y="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="14" y="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="14" y="21" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="27" y="7" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
      </svg>
    ),
    count: "02",
    heading: "Outcome pods",
    description: "Small cross functional teams own defined results within a shared operating system, which reduces handoffs and keeps accountability intact throughout delivery.",
  },
  {
    svg: (
      <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="21" y="7" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="21" y="21" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="28" y="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect y="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="7" y="21" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="7" y="7" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
      </svg>
    ),
    count: "03",
    heading: "Operational signals",
    description: "Progress, risk, and dependencies remain visible through a small set of consistent signals that surface issues early and trigger action.",
  },
  {
    svg: (
      <svg width="35" height="21" viewBox="0 0 35 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="21" y="7" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="14" y="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="28" y="7" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect y="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="7" y="7" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
        <rect x="14" width="7" height="7" className="fill-gray-400 transition-colors duration-300 group-hover:fill-white" />
      </svg>
    ),
    count: "04",
    heading: "Built in security",
    description: "Risk consideration stays embedded in planning and execution workflows, which reduces exposure and prevents last minute controls or reactive fixes.",
  },
];

export default function HowWeOperate() {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const paginate = useCallback((dir: number) => {
    setPage(([prev]) => [(prev + dir + points.length) % points.length, dir]);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => paginate(1), 5000);
  }, [paginate]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  // Auto-play on mount
  useEffect(() => {
    if (window.innerWidth < 1024) startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

  // Click on card → pause / resume toggle
  const handleCardClick = useCallback(() => {
    if (window.innerWidth >= 1024) return;
    if (isDragging.current) return; // swipe ke baad click fire na ho
    if (!isPaused) {
      stopTimer();
      setIsPaused(true);
    } else {
      startTimer();
      setIsPaused(false);
    }
  }, [isPaused, startTimer, stopTimer]);

  // Touch swipe handlers (left = next, right = prev)
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = false;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    if (Math.abs(e.touches[0].clientX - touchStartX.current) > 10) {
      isDragging.current = true;
    }
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) paginate(1);   // swipe left → next
      else paginate(-1);            // swipe right → prev
      // resume auto-play after swipe
      setIsPaused(false);
      startTimer();
    }
    touchStartX.current = null;
    // reset isDragging after a tiny delay so click handler sees it
    setTimeout(() => { isDragging.current = false; }, 50);
  }, [paginate, startTimer]);

  return (
    <section className="mx-10 lg:mx-20 xl:mx-24 py-10 my-20">

      {/* ── DESKTOP / TABLET (md+) — unchanged ── */}
      <div className="hidden md:flex items-center gap-16 xl:gap-24 overflow-hidden">
        <Reveal variants={slideInFromLeft(0.1)} className="flex-shrink-0 flex items-center justify-center">
          <Image src="/HowWeOperate.png" alt="How We Operate" width={500} height={500} className="w-[420px] xl:w-[500px]" />
        </Reveal>

        <div className="flex flex-col justify-between gap-10 flex-1 min-w-0">
          <Reveal variants={slideInFromRight(0.15)}>
            <div className="flex flex-col gap-4">
              <Heading text="How We Operate" />
              <h3 className="font-light text-[24px] xl:text-[36px] text-white leading-tight">
                Control is designed in,<br /> not enforced later
              </h3>
              <p className="text-[12px] font-light max-w-md">
                Ascella establishes governance, accountability, and measurement before execution begins—ensuring delivery remains controlled, predictable, and aligned as organisations scale.
              </p>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {points.map((point, index) => (
              <li
                key={index}
                className="flex flex-col gap-2.5 bg-gray-500 p-5 xl:p-6 rounded-2xl cursor-default transition-all duration-300 hover:scale-[1.03] group"
              >
                <div className="flex justify-between w-full items-start">
                  <div aria-hidden="true">{point.svg}</div>
                  <span className="text-[16px] font-thin transition-colors duration-300 group-hover:text-white">{point.count}</span>
                </div>
                <h4 className="leading-tight font-light text-[14px] md:text-[20px] transition-colors duration-300 group-hover:text-white">{point.heading}</h4>
                <p className="text-gray-300 text-[12px] transition-colors duration-300 group-hover:text-gray-100">{point.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── MOBILE (max md) ── */}
      <div className="flex flex-col gap-6 md:hidden">
        <Reveal variants={slideInFromBottom(0.02)} className="flex flex-col gap-3">
          <Heading text="How We Operate" />
          <p className="font-light text-3xl text-white leading-tight">Control is built before<br /> work begins</p>
          <p className="text-gray-100 font-light text-sm">Ascella establishes governance, accountability, and measurement before execution begins...</p>
        </Reveal>

        <div className="flex justify-center">
          <Image src="/HowWeOperate.png" alt="How We Operate" width={400} height={400} className="w-full max-w-xs" />
        </div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={handleCardClick}
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full bg-gray-500 p-6 rounded-2xl flex flex-col gap-3 group cursor-pointer select-none"
            >
              <div className="flex justify-between items-start">
                {points[page].svg}
                <span className="text-lg font-thin transition-colors duration-300 group-hover:text-white">
                  {points[page].count}
                </span>
              </div>
              <h4 className="text-xl font-light transition-colors duration-300 group-hover:text-white">
                {points[page].heading}
              </h4>
              <p className="text-gray-300 text-sm transition-colors duration-300 group-hover:text-gray-100">
                {points[page].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-2">
          {points.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setPage([i, i > page ? 1 : -1]);
                setIsPaused(false);
                startTimer();
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page ? "w-6 bg-white" : "w-2 bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}