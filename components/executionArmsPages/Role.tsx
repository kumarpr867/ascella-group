"use client"
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    roleTitle: "Cybersecurity and risk execution arm responsible for embedding security, governance, and compliance into organisational operations.",
    deployedText: "When organisations require security, resilience, and regulatory alignment embedded directly into execution environments rather than layered on afterward.",
    mainTitle: "Ascella Infosec",
    mainDesc: "Security architecture, risk governance frameworks, compliance readiness, and incident preparedness structures that remain aligned to regulatory and operational requirements.",
    image: { src: "/Rectangle 5023.png", rotate: -20, scale: 1.1 }
  },
  {
    roleTitle: "Technology and engineering execution arm responsible for building and maintaining secure, scalable systems.",
    deployedText: "Deployed during board-level restructuring or when defining multi-year security roadmaps.",
    mainTitle: "Ascella Software Labs",
    mainDesc: "Secure system architecture, application development, platform engineering, and infrastructure delivery designed to perform reliably under growth and complexity.",
    image: { src: "/images/labs1.png", rotate: 5, scale: 1.2 }
  },
  {
    roleTitle: "Workforce and talent execution arm responsible for embedding capability into operating structures.",
    deployedText: "When organisations require embedded expertise delivered through accountable structures, without creating internal dependency or unmanaged overhead.",
    mainTitle: "Ascella Staffing",
    mainDesc: "Role-aligned talent deployment, pod formation, team integration, and workforce performance alignment within Ascella’s governance framework.",
    image: { src: "/images/staffing1.png", rotate: -5.28, scale: .8 }
  },
  {
    roleTitle: "Market-facing execution arm responsible for structured external engagement and growth operations.",
    deployedText: "When organisations require disciplined market engagement and growth execution without compromising internal operational control.",
    mainTitle: "Ascella Engage",
    mainDesc: "Demand execution systems, brand positioning structures, sales enablement frameworks, and revenue operations alignment.",
    image: { src: "/images/engage1.png", rotate: -30, scale: 0.6 }
  },
  {
    roleTitle: "Internal enablement and operations execution arm responsible for strengthening organisational infrastructure.",
    deployedText: "When organisations require internal operational readiness, process maturity, and infrastructure that supports sustained execution at scale.",
    mainTitle: "Ascella Forge",
    mainDesc: "Internal workflows, operational frameworks, revenue infrastructure, and cross-team coordination systems that keep execution stable as scale increases.",
    image: { src: "/images/forge1.png", rotate: -15, scale: 1.2 }
  }
];

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <Plus className="w-3.5 h-3.5 text-white" strokeWidth={3} />
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{title}</span>
  </div>
);

// Animation Variants for synchronized sliding
const containerVariants: any = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export default function Role() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeData = SLIDES[current];
  

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden font-sans flex flex-col">
      <div className="w-full h-[1px] bg-white/10 shrink-0 z-30" />

      {/* SYNCED CONTENT WRAPPER */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative flex-grow flex flex-col"
        >
          {/* BACKGROUND IMAGE - Moved inside AnimatePresence for sync */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              animate={{ scale: activeData.image.scale, rotate: activeData.image.rotate }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-[85vw] h-[85vh] opacity-100"
            >
              <Image 
                src={activeData.image.src} 
                alt=""
                fill
                className="object-contain grayscale brightness-75"
                priority
              />
            </motion.div>
          </div>

          {/* MAIN CONTENT GRID */}
          <main className="relative z-20 flex-grow grid grid-cols-12 px-6 md:px-16 lg:px-24">
            
            {/* LEFT COLUMN */}
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-between py-10 lg:py-20 h-full">
              
              <div className="max-w-md ">
                <SectionHeader title="Role" />
                <h4 className="text-xl md:text-2xl font- Montserrat text- white leading-snug">
                  <span className="font-bold ">{activeData.roleTitle.split(' ').slice(0, 4).join(' ')}</span>
                  <span className="font-bold text-gray-400 "> {" " + activeData.roleTitle.split(' ').slice(4).join(' ')}</span>
                 
                </h4>
              </div>

              {/* DECORATIVE INDICATOR (Hidden on small mobile if space is tight) */}
              <div className="hidden md:flex flex-col gap-4 py-8">
                <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
                <div className="w-5 h-5 rounded-full bg-zinc-700" />
              </div>

              <div className="max-w-sm mb-12 lg:mb-0">
                <SectionHeader title="When it's deployed" />
                <p className="text-sm md:text-base text-zinc-400 font- Montserrat leading-relaxed">
                  {activeData.deployedText}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-end items-start lg:items-end py-10 lg:py-20 h-full">
              <div className="max-w-lg lg:text-right">
                <h3 className="text-4xl md:text-6xl font-light tracking-tight mb-6 lg:mb-8">
                  {activeData.mainTitle}
                </h3>
                
                  <p className="text-sm md:text-base text-zinc-400 font- Montserrat leading-relaxed">
                    {activeData.mainDesc}
                  </p>
                
              </div>
            </div>
          </main>
        </motion.div>
      </AnimatePresence>

      {/* HORIZONTAL PAGINATION */}
      <div className="absolute bottom-6 md:bottom-10 w-full flex justify-center z-40">
        <div className="flex gap-4 items-center backdrop-blur-md   ">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="relative flex items-center justify-center outline-none group w-4 h-4"
            >
              {i === current ? (
                <motion.div 
                  layoutId="activeDot"
                  className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"
                />
              ) : (
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full group-hover:bg-zinc-500 transition-colors" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-white/10 shrink-0 z-30" />
    </div>
  );
}