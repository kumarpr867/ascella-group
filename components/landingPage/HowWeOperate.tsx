'use client';

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Heading from "../headings/Heading";
import Reveal from "@/utils/Reveal";
import { slideInFromBottom, slideInFromLeft, slideInFromRight } from "@/utils/motion";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0
  })
};

// ── Points data (Updated with Hover effect on SVGs) ──────────────────────────
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const paginate = (dir: number) => {
    setPage(([prev]) => [(prev + dir + points.length) % points.length, dir]);
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    timerRef.current = setInterval(() => paginate(1), 5000);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  return (
    <section className="mx-10 lg:mx-20 xl:mx-24 py-12 sm:py-16 lg:py-24">
      <div className="hidden lg:flex items-center gap-16 xl:gap-24">
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

          <motion.ul
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid grid-cols-2 gap-5"
          >
            {points.map((point, index) => (
              <motion.li
                key={index}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
                className="flex flex-col gap-2.5 bg-gray-500 p-5 xl:p-6 rounded-2xl cursor-default transition-all duration-300 hover:scale-[1.03] group"
              >
                <div className="flex justify-between w-full items-start">
                  <div aria-hidden="true">{point.svg}</div>
                  <span className="text-[16px] font-thin transition-colors duration-300 group-hover:text-white">{point.count}</span>
                </div>
                <h4 className="leading-tight font-light text-[14px] md:text-[20px] transition-colors duration-300 group-hover:text-white">{point.heading}</h4>
                <p className="text-gray-300 text-[12px] transition-colors duration-300 group-hover:text-gray-100">{point.description}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="flex flex-col gap-6 lg:hidden">
        <Reveal variants={slideInFromBottom(0.02)} className="flex flex-col gap-3">
          <Heading text="How We Operate" />
          <p className="font-light text-3xl text-white leading-tight">Control is built before<br /> work begins</p>
          <p className="text-gray-100 font-light text-sm">Ascella establishes governance, accountability, and measurement before execution begins...</p>
        </Reveal>

        <div className="flex justify-center">
          <Image src="/HowWeOperate.png" alt="How We Operate" width={400} height={400} className="w-full max-w-xs" />
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={page} custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ x: { type: "spring", stiffness: 220, damping: 30 }, opacity: { duration: 0.25 } }}
              drag="x" dragConstraints={{ left: 0, right: 0 }}
              className="w-full bg-gray-500 p-6 rounded-2xl flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="flex justify-between items-start">
                {points[page].svg}
                <span className="text-lg font-thin transition-colors duration-300 group-hover:text-white">{points[page].count}</span>
              </div>
              <h4 className="text-xl font-light transition-colors duration-300 group-hover:text-white">{points[page].heading}</h4>
              <p className="text-gray-300 text-sm transition-colors duration-300 group-hover:text-gray-100">{points[page].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {points.map((_, i) => (
            <button key={i} className={`h-2 rounded-full transition-all duration-300 ${i === page ? "w-6 bg-white" : "w-2 bg-gray-500"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}