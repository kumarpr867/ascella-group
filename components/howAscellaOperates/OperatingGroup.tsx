"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import {
  slideInFromBottom,
  slideInFromLeft,
} from "@/utils/motion";
import Reveal from "@/utils/Reveal";
import Heading from "../executionArmsPages/headings/Heading";

// helpers
const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const arcPath = (start: number, end: number) => {
  const s = polarToCartesian(200, 200, 160, end);
  const e = polarToCartesian(200, 200, 160, start);
  const largeArc = end - start <= 180 ? 0 : 1;

  return `M ${s.x} ${s.y} A 160 160 0 ${largeArc} 0 ${e.x} ${e.y}`;
};

export default function OperatingGroup() {
  const controls = useAnimation();

  const words = [
    "Infosec",
    "Software Labs",
    "Engage",
    "Staffing",
    "Forge"
  ];

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 60, // 🔥 slower rotation
        ease: "linear",
      },
    });
  }, [controls]);

  return (
    <section className="mt-20 border-y border-color">
      <div className="flex flex-col py-10 lg:py-20 overflow-x-hidden">

        {/* 🔹 TOP */}
        <div className="mx-6 lg:mx-20 xl:mx-24 flex flex-col md:flex-row text-center md:text-left justify-between gap-5">
          <Reveal
            variants={slideInFromLeft(0.1)}
            className="flex flex-col items-center md:items-start gap-6"
          >
            <Heading text="Introduction" />
            <h3 className="text-[20px] md:text-[36px]">
              What an Operating Group Means
            </h3>
            <p className="text-b3 md:w-2/3">
              Most organisations combine vendors and internal teams to move work forward,
              while an operating group establishes structure, authority, and accountability before execution begins.
            </p>
          </Reveal>
        </div>

        {/* 📱 MOBILE */}
        <Reveal
          variants={slideInFromBottom(0.1)}
          className="lg:hidden mt-10 px-6 flex flex-col items-center gap-6"
        >
          <div className="text-center text-sm text-white/70">
            Ascella Group holds <br /> operating authority
          </div>

          <div className="relative flex items-center justify-center">

            {/* Glow */}
            <div className="absolute w-[240px] h-[240px] rounded-full 
              bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_70%)]" />

            {/* Center */}
            <div className="absolute w-36 h-36 rounded-full 
              bg-white/10 backdrop-blur-xl border border-white/20 
              flex flex-col items-center justify-center text-white space-y-1">
              {words.map((w, i) => (
                <div key={i} className="text-xs w-27 text-center border-white/20 rounded-2xl p-0.5 m-1">{w}</div>
              ))}
            </div>

            {/* SVG */}
            <svg viewBox="0 0 400 400" className="w-[260px] h-[260px]">
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <motion.path
                  key={i}
                  d={arcPath(angle, angle + 72)}
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="10 12"
                  animate={{ strokeDashoffset: [0, 100] }}
                  transition={{ repeat: Infinity, duration: 6 + i }} // slower
                />
              ))}
            </svg>
          </div>

          <div className="text-center text-sm text-white/70">
            Execution arms <br /> deliver outcomes
          </div>
        </Reveal>

        {/* 💻 DESKTOP */}
        <Reveal
          variants={slideInFromBottom(0.1)}
          className="hidden lg:flex mx-10 lg:mx-20 xl:mx-24 mt-16 items-center justify-between border border-color p-10 relative"
        >

          {/* LEFT TEXT */}
          <div className="text-sm text-white/70 max-w-[200px] text-center">
            Ascella Group holds <br /> operating authority
          </div>

          {/* CENTER */}
          <div className="relative flex items-center justify-center">

            {/* Lines */}
            <div className="absolute left-[-210px] top-1/2 -translate-y-1/2 h-[1px] w-[245px] bg-white/30" />
            <div className="absolute right-[-210px] top-1/2 -translate-y-1/2 h-[1px] w-[245px] bg-white/30" />

            {/* Glow */}
            <div className="absolute w-[380px] h-[380px] rounded-full 
              bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,transparent_70%)]" />

            {/* Center circle */}
            {/* <div className="absolute w-52 h-52 rounded-full 
              bg-white/10 backdrop-blur-xl border border-white/20 
              flex flex-col items-center justify-center text-white space-y-1">
              {words.map((w, i) => (
                <div key={i} className="text-sm border-1 w-27 text-center border-white/20 rounded-2xl p-0.5 m-1 hover:bg-yellow-400">{w}</div>
              ))}
            </div> */}
            {/* Center circle */}
<div className="absolute z-10 w-52 h-52 rounded-full 
  bg-white/10 backdrop-blur-xl border border-white/20 
  flex flex-col items-center justify-center text-white space-y-1">

  {words.map((w, i) => (
    <div
      key={i}
      className="
        text-sm 
        border-1 
        w-27 
        text-center
        border border-white/20
        rounded-2xl
        p-0.5
        m-1
        transition-all duration-300
        cursor-pointer

        hover:bg-white
        hover:text-black
        hover:border-white
      "
    >
      {w}
    </div>
  ))}

</div>

            {/* SVG rotation */}
            <motion.svg
              viewBox="0 0 400 400"
              className="w-[440px] h-[440px]"
              animate={controls}
            >
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <motion.path
                  // key={i}
                  d={arcPath(angle, angle + 72)}
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="12 14"
                  animate={{ strokeDashoffset: [0, 120] }}
                  transition={{ repeat: Infinity, duration: 6 + i }}
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(255,255,255,0.5))",
                  }}
                />
              ))}
            </motion.svg>
          </div>

          {/* RIGHT TEXT */}
          <div className="text-sm text-white/70 max-w-[200px] text-center">
            Execution arms <br /> deliver outcomes
          </div>

        </Reveal>
      </div>
    </section>
  );
}