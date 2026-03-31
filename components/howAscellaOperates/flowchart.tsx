"use client";

import { motion } from "framer-motion";

const items = [
  "Software Labs",
  "Staffing",
  "Engage",
  "Forge",
  "Infosec",
];


export default function Flowchart() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[350px] h-[350px] flex items-center justify-center">

        <div className="absolute w-full h-full rounded-full bg-white/16 blur-[120px] z-0" />

        <div className="relative w-full h-full rounded-full bg-black backdrop-blur-2xl border border-white/10 flex flex-col items-center justify-center gap-3 z-10">

          {/* Items */}
          <div className="grid grid-cols-2 items-center gap-y-3">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index === 0 ? 0 : 0.6 + index * 0.5,
                  stiffness: 10,
                }}
                whileHover={{ scale: 1.05 }}
                className={`text-gray-100 text-[14px] px-2 py-1 text-center ${index === 0 ? "col-span-2" : ""
                  }`}
              >
                {/* floating layer */}
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {item}
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* 🎯 SVG Overlay (this is what you're missing) */}
        <motion.svg
          className="absolute w-full h-full z-20"
          viewBox="0 0 420 420"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20, // speed (increase for slower)
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "50% 50%" }}
        >
          {/* Dotted Half Circle */}
          <motion.path
            d="M 60 210 A 150 150 0 0 1 360 210"
            fill="transparent"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          <motion.path
            d="M 360 210 A 150 150 0 0 1 60 210"
            fill="transparent"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          />

          {/* End Nodes */}
          <circle cx="60" cy="210" r="6" fill="white" />
          <circle cx="360" cy="210" r="6" fill="white" />
        </motion.svg>
        
      </div>
    </div>
  );
}