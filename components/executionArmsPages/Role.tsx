"use client"
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Heading from '../headings/Heading';

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
    mainDesc: "Role-aligned talent deployment, pod formation, team integration, and workforce performance alignment within Ascella's governance framework.",
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

const TOTAL = SLIDES.length;

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <Heading text={title} className="text-white" />
  </div>
);
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } }
};

export default function Role() {
  const [current, setCurrent] = useState(0);

  const next = () => { if (current < TOTAL - 1) setCurrent(p => p + 1); };
  const prev = () => { if (current > 0) setCurrent(p => p - 1); };

  const handleMobileClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.dots-container')) return;
    if (current < TOTAL - 1) next();
    else setCurrent(0);
  };

  const activeData = SLIDES[current];

  const DotsRow = () => (
    <div className="dots-container flex gap-4 items-center justify-center relative z-50">
      {SLIDES.map((_, i) => (
        <button
          key={i}
          onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
          className="relative flex items-center justify-center outline-none group w-4 h-4"
        >
          {i === current ? (
            <motion.div layoutId="activeDot" className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
          ) : (
            <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full group-hover:bg-zinc-500 transition-colors" />
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div className="relative w-full h-[100svh] bg-black text-white overflow-hidden font-sans flex flex-col">
      <div className="w-full h-[1px] bg-white/10 shrink-0 z-30" />

      {/* ============ MOBILE (< lg) ============ */}
      {/* ONLY CHANGE: mx-10 wrapper added — same as footer margin */}
      <div className="flex-1 lg:hidden flex flex-col relative" onClick={handleMobileClick}>
        <AnimatePresence mode="wait">
          <motion.div key={current} variants={fadeIn} initial="initial" animate="animate" exit="exit" className="absolute inset-0 flex flex-col z-10">
            <div className="mx-10 p-[18px_0px_0] shrink-0">
              <SectionHeader title="Role" />
              <h4 className="text-[15px] leading-[1.55]">
                <span className="font-bold text-white">{activeData.roleTitle.split(' ').slice(0, 6).join(' ')} </span>
                <span className="font-normal text-zinc-500">{activeData.roleTitle.split(' ').slice(6).join(' ')}</span>
              </h4>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center overflow-visible gap-[14px]">
              <div style={{ position: 'relative', width: '88vw', height: '52vw', maxHeight: '260px', transform: `rotate(${activeData.image.rotate}deg) scale(${activeData.image.scale})`, overflow: 'visible' }}>
                <Image src={activeData.image.src} alt="" fill className="object-contain" style={{ filter: 'grayscale(1) brightness(2)' }} priority />
              </div>
              <DotsRow />
            </div>
            <div className="mx-10 p-[0_0px_18px] shrink-0">
              <div className="mb-[14px]">
                <SectionHeader title="When it's deployed" />
                <p className="text-[12px] leading-[1.65]">{activeData.deployedText}</p>
              </div>
              <h3 className="text-[26px] font-light tracking-tight mb-[8px]">{activeData.mainTitle}</h3>
              <p className="text-[11.5px] text-zinc-500 leading-[1.65]">{activeData.mainDesc}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============ DESKTOP (lg+) ============ */}
      <div className="hidden lg:block flex-1 relative">
        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 w-24 flex items-center justify-center z-50">
          <button onClick={prev} disabled={current === 0} className={`p-4 transition-all ${current === 0 ? 'opacity-10 blur-[2px] cursor-not-allowed' : 'opacity-100 hover:scale-110 active:scale-95'}`}>
            <ChevronLeft size={48} strokeWidth={1} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 w-24 flex items-center justify-center z-50">
          <button onClick={next} disabled={current === TOTAL - 1} className={`p-4 transition-all ${current === TOTAL - 1 ? 'opacity-10 blur-[2px] cursor-not-allowed' : 'opacity-100 hover:scale-110 active:scale-95'}`}>
            <ChevronRight size={48} strokeWidth={1} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current} variants={fadeIn} initial="initial" animate="animate" exit="exit" className="absolute inset-0 flex flex-col z-10">
            {/* Background Image Container - 3x Opacity Enhancement */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-[75vw] h-[75vh]" style={{ transform: `rotate(${activeData.image.rotate}deg) scale(${activeData.image.scale})` }}>
                <Image 
                  src={activeData.image.src} 
                  alt="" 
                  fill 
                  className="object-contain grayscale brightness-110 opacity-90"
                  priority 
                />
              </div>
            </div>

            {/* Main Content Grid */}
            <main className="relative z-20 flex-1 grid grid-cols-12 px-24 h-full">
              <div className="col-span-5 flex flex-col justify-between py-24 h-full">
                <div className="max-w-md">
                  <SectionHeader title="Role" />
                  <h4 className="text-xl md:text-2xl leading-snug">
                    <span className="font-bold text-white">{activeData.roleTitle.split(' ').slice(0, 4).join(' ')}</span>
                    <span className="font-bold text-zinc-500">{' ' + activeData.roleTitle.split(' ').slice(4).join(' ')}</span>
                  </h4>
                </div>
                <div className="max-w-sm">
                  <SectionHeader title="When it's deployed" />
                  <p className="text-sm text-zinc-400 leading-relaxed">{activeData.deployedText}</p>
                </div>
              </div>

              <div className="col-span-7 flex flex-col justify-end items-end py-24 h-full">
                <div className="max-w-xl text-right">
                  <h3 className="text-4xl md:text-3xl  tracking-tighter mb-6 uppercase ">
                    {activeData.mainTitle}
                  </h3>
                  <p className="text-sm md:text-base  leading-relaxed">
                    {activeData.mainDesc}
                  </p>
                </div>
              </div>
            </main>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-12 left-0 right-0 z-50 flex justify-center">
          <DotsRow />
        </div>
      </div>

      <div className="w-full h-[1px] bg-white/10 shrink-0 z-30" />
    </div>
  );
}