"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  {
    id: "overview",
    title: "Overview",
    content: "Short overview content goes here.",
  },
  {
    id: "accountability",
    title: "Accountability Structure",
    content: "4–5 lines explaining accountability structure.",
  },
  {
    id: "prevents",
    title: "What This Prevents",
    content: "4–5 lines describing what this prevents.",
  },
  {
    id: "reality",
    title: "Operational Reality",
    content: (
      <>
        <p className="mb-4">In conventional models:</p>
        <p className="opacity-70 mb-4">
          Execution is distributed. Accountability becomes unclear.
          Risk increases.
        </p>

        <p className="mb-4 mt-6">In the Ascella model:</p>
        <p className="opacity-70">
          Execution remains distributed, but accountability is singular.
          Risk is controlled.
        </p>
      </>
    ),
  },
];

export default function AccountabilitySection() {
  const [active, setActive] = useState<string>("overview");

  return (
    <section className="relative w-full py-24">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_240px_1.2fr] gap-16 px-6">

        <div className="flex items-end">
          <div>
            <h3 className="text-lg leading-tight">
              The Single Accountability Principle
            </h3>
            <p className="text-sm opacity-60 mt-2 max-w-xs">
              A governance model designed to eliminate ownership gaps in execution.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {SECTIONS.map((item) => {
            const isActive = active === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                className="border-b border-color pb-4"
              >
                <button
                  onClick={() => setActive(item.id)}
                  className={`w-full text-left transition-colors ${isActive ? "text-white" : "text-gray-200"}`}
                >
                  {item.title}
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-2 text-sm opacity-70"
                    >
                      {item.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="lg:hidden mt-20 px-6 space-y-4">
        {SECTIONS.map((item) => {
          const isActive = active === item.id;

          return (
            <motion.div key={item.id} layout className="border-b border-color pb-4">
              <button
                onClick={() => setActive(isActive ? "" : item.id)}
                className="w-full text-left text-lg"
              >
                {item.title}
              </button>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-4 text-sm opacity-70"
                  >
                    {item.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
