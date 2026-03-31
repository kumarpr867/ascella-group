"use client";

import { motion } from "framer-motion";

const items = [
  "Software Labs",
  "Staffing",
  "Consulting",
  "AI Solutions",
  "Product Dev",
];

export default function Flowchart() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative w-[420px] h-[420px] flex items-center justify-center">

        {/* 🔥 Glow (FIXED) */}
        <div className="absolute w-full h-full rounded-full bg-purple-600 blur-[120px] opacity-50 z-0" />

        {/* 🌑 Main Circle */}
        <div className="relative w-full h-full rounded-full bg-black/70 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center gap-3 z-10">

          {/* Items */}
          <div className="flex flex-col items-center gap-2">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-white/80 text-sm px-4 py-1 rounded-full bg-white/5 border border-white/10"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* 🎯 SVG Overlay (this is what you're missing) */}
        <svg
          className="absolute w-full h-full z-20"
          viewBox="0 0 420 420"
        >
          {/* Dotted Half Circle */}
          <path
            d="M 60 210 A 150 150 0 0 1 360 210"
            fill="transparent"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.6"
          />

          {/* Solid Half Circle */}
          <path
            d="M 360 210 A 150 150 0 0 1 60 210"
            fill="transparent"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* End Nodes */}
          <circle cx="60" cy="210" r="6" fill="white" />
          <circle cx="360" cy="210" r="6" fill="white" />
        </svg>
      </div>
    </div>
  );
}