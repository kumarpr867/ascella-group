"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import Heading from '../headings/Heading';
import Reveal from "@/utils/Reveal";
import { slideInFromBottom } from "@/utils/motion";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const SLIDES = [
  {
    roleTitle: "Cybersecurity and risk execution arm responsible for embedding security, governance, and compliance into organisational operations.",
    deployedText: "When organisations require security, resilience, and regulatory alignment embedded directly into execution environments rather than layered on afterward.",
    mainTitle: "Ascella Infosec",
    mainDesc: "Security architecture, risk governance frameworks, compliance readiness, and incident preparedness structures that remain aligned to regulatory and operational requirements.",
    image: { src: "/images/rectangle-50233.png", rotate: -20, scale: 1.1 }
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
    roleTitle: "External execution arm coordinating structured market interaction and disciplined growth operations.",
    deployedText: "When organisations require controlled market activity and coordinated growth efforts without disrupting internal execution stability.",
    mainTitle: "Ascella Engage",
    mainDesc: "Market communication systems positioning clarity frameworks sales coordination models and revenue workflow alignment.",
    image: { src: "/images/engage1.png", rotate: -30, scale: 0.6 }
  },
  {
    roleTitle: "Revenue execution arm coordinating structured sales activity and disciplined pipeline development operations.",
    deployedText: "When organisations require consistent sales execution and pipeline development without disrupting internal operational focus.",
    mainTitle: "Ascella Forge",
    mainDesc: "Sales execution systems pipeline development frameworks deal progression structures and revenue workflow alignment.",
    image: { src: "/images/forge1.png", rotate: -15, scale: 1.2 }
  }
];

const TOTAL = SLIDES.length;

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <Heading text={title} className="text-white" />
  </div>
);

export default function Role() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  // --- Desktop Scroll Logic (UNTOUCHED) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end 80vh"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (window.innerWidth >= 1024) {
        const index = Math.round(v * TOTAL);
        const clampedIndex = Math.max(0, Math.min(index, TOTAL - 1));
        setCurrent(clampedIndex);
      }
    });
  }, [scrollYProgress]);

  const activeData = SLIDES[current];

  // --- Mobile Toggle Logic ---
  const handleToggle = () => {
    if (!swiperRef.current) return;
    if (isPaused) {
      swiperRef.current.autoplay.start();
      setIsPaused(false);
    } else {
      swiperRef.current.autoplay.stop();
      setIsPaused(true);
    }
  };

  const DotsRow = ({ vertical = false }: { vertical?: boolean }) => (
    <div className={`dots-container flex ${vertical ? 'flex-col' : 'flex-row'} gap-3 items-center justify-center relative z-50`}>
      {SLIDES.map((_, i) => (
        <button
          key={i}
          onClick={(e) => { 
            e.stopPropagation(); 
            const section = containerRef.current;
            if(section) {
                const scrollPos = section.offsetTop + (i / TOTAL) * section.offsetHeight;
                window.scrollTo({ top: scrollPos, behavior: 'smooth' });
            }
          }}
          className="relative flex items-center justify-center outline-none group w-4 h-4"
        >
          {i === current ? (
            <motion.div
              layoutId={vertical ? "activeDotV" : "activeDotH"}
              className="w-[5px] h-[5px] bg-white rounded-full"
              style={{ boxShadow: '0 0 8px 2px rgba(255,255,255,0.6)' }}
            />
          ) : (
            <div className="w-[5px] h-[5px] rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors" />
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${TOTAL * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col" style={{ background: '#181818' }}>
        
        <div style={{ height: '64px', background: '#000' }} />
        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.10)' }} />
        <div style={{ height: '64px' }} />

        {/* ══ MOBILE (< lg) ══════════════════════════════════════════════════ */}
        <div className="lg:hidden flex-1 px-4 pb-[16px]">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            loop={true} // 5 ke baad wapas 1 par aayega right side se
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
            className="h-full w-full"
          >
            {SLIDES.map((slide, idx) => (
              <SwiperSlide key={idx} onClick={handleToggle}>
                <div className="flex flex-col h-full bg-[#0d0d0d] border border-white/10 rounded-sm overflow-hidden">
                  <div className="relative w-full h-[220px] bg-[#080808] flex items-center justify-center">
                    <div style={{ position: 'relative', width: '85%', height: '85%', transform: `rotate(${slide.image.rotate}deg) scale(${slide.image.scale})` }}>
                      <Image src={slide.image.src} alt={slide.mainTitle} fill className="object-contain grayscale brightness-110" priority />
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-white/10" />
                  <div className="flex-1 p-6 flex flex-col">
                    <h3 className="text-[26px] font-light text-white mb-2">{slide.mainTitle}</h3>
                    <p className="text-[12px] text-zinc-500 mb-6 leading-relaxed">{slide.mainDesc}</p>
                    <div className="mb-4">
                      <SectionHeader title="Role" />
                      <p className="text-[14px] leading-relaxed">
                        <span className="font-bold text-white">{slide.roleTitle.split(' ').slice(0, 5).join(' ')} </span>
                        <span className="text-zinc-500 font-normal">{slide.roleTitle.split(' ').slice(5).join(' ')}</span>
                      </p>
                    </div>
                    <div className="mt-auto">
                      <SectionHeader title="When it's deployed" />
                      <div className="bg-black p-4 border border-white/5">
                        <p className="text-[12px] text-zinc-400">{slide.deployedText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Mobile Dots hta diye gaye hain */}
        </div>

        {/* ══ DESKTOP (lg+) - ORIGINAL 100% SAME CODE ═══════════════════════ */}
        <div className="hidden lg:flex items-center justify-center flex-1" style={{ background: '#181818' }}>
          <div className="lg:mx-20 xl:mx-24 w-full" style={{ height: 'min(660px, 86vh)', background: '#0d0d0d', display: 'flex', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '46%', flexShrink: 0, position: 'relative', borderRight: '1px solid rgba(255,255,255,0.07)', background: '#080808', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
              <AnimatePresence mode="wait">
                <motion.div key={current} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                   <div style={{ position: 'absolute', inset: 0, transform: `rotate(${activeData.image.rotate}deg) scale(${activeData.image.scale})` }}>
                      <Image src={activeData.image.src} alt={activeData.mainTitle} fill className="object-contain grayscale brightness-110 opacity-90" priority />
                   </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '44px 48px', color: '#fff' }}>
                  <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 40px)', fontWeight: 300, letterSpacing: '-0.02em', margin: '0 0 18px', lineHeight: 1.2 }}>{activeData.mainTitle}</h2>
                  <p style={{ fontSize: '12px', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', margin: '0 0 28px', maxWidth: '440px' }}>{activeData.mainDesc}</p>
                  <div style={{ marginBottom: '24px' }}>
                    <SectionHeader title="Role" />
                    <p style={{ fontSize: '13.5px', lineHeight: 1.65, margin: 0 }}>
                      <span style={{ fontWeight: 700, color: '#fff' }}>{activeData.roleTitle.split(' ').slice(0, 5).join(' ')} </span>
                      <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>{activeData.roleTitle.split(' ').slice(5).join(' ')}</span>
                    </p>
                  </div>
                  <div style={{ marginTop: 'auto', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '3px', padding: '18px 22px' }}>
                    <SectionHeader title="When it's deployed" />
                    <p style={{ fontSize: '12px', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{activeData.deployedText}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="absolute right-6 top-1/2 -translate-y-1/2"><DotsRow vertical /></div>
            </div>
          </div>
        </div>

        <div style={{ height: '64px' }} />
        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.10)' }} />
      </div>
    </div>
  );
}