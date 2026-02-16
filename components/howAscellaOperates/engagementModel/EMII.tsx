"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PlusHeading from "../../headings/PlusHeading";
import { SECTIONS, EngagementLabel } from "./data";

const MENU_ITEMS: EngagementLabel[] = [
  "Operation",
  "Pod deployment",
  "Integration",
  "Support",
];

export default function EMII() {
  const [active, setActive] = useState<EngagementLabel>("Operation");
  const [isPaused, setIsPaused] = useState(false);

  const section = SECTIONS.find((s) => s.label === active)!;

  
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActive((prev) => {
        const currentIndex = MENU_ITEMS.indexOf(prev);
        const nextIndex = (currentIndex + 1) % MENU_ITEMS.length;
        return MENU_ITEMS[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  
  useEffect(() => {
    const handleScroll = () => setIsPaused(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  const handleClick = (item: EngagementLabel) => {
    if (active === item) {
      
      setIsPaused(false);
    } else {
      
      setActive(item);
      setIsPaused(true);
    }
  };

  return (
    <section className="m-20 xl:m-30">
      
      <header className="flex flex-col gap-6 md:w-1/2 mb-20">
        <PlusHeading text="ENGAGEMENT MODELS" size="b1" />
        <h1 className="text-3xl leading-tight">
          Engagement structures are{" "}
          <span className="text-gray-200">
            designed for operational alignment
          </span>
          , not transactional delivery.
        </h1>
        <p className="font-extralight">
          Ascella engagements are structured based on organisational maturity,
          execution complexity, and governance need.
        </p>
      </header>

      
      <div className="flex justify-between items-start">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={section.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-sm flex flex-col gap-5"
          >
            <h2 className="text-xl">{section.title}</h2>
            <p className="text-sm text-gray-300">{section.description}</p>
          </motion.div>
        </AnimatePresence>

        
        <AnimatePresence mode="wait">
          <motion.div
            key={section.image}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-5"
          >
            <h1 className="text-3xl">
              [0{MENU_ITEMS.indexOf(active) + 1}]
            </h1>
            <Image
              src={section.image}
              alt={section.title}
              width={300}
              height={600}
            />
          </motion.div>
        </AnimatePresence>

        
        <nav className="menu mb-5 text-2xl flex flex-col gap-2">
          {MENU_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => handleClick(item)}
              className={`text-left transition-colors ${
                active === item ? "text-white" : "text-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
