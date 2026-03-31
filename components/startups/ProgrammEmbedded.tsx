'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

// --- Reveal Animation Variants ---
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as any } 
  }
};

// ── Isometric Grid with Per-Cell Hover ────────────────────────────────────────
function IsometricHoverGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef    = useRef<number | null>(null);

  const CELL_W = 100;
  const CELL_H = 60;

  const cellCenter = (col: number, row: number, offsetX: number, offsetY: number) => {
    const x = offsetX + col * CELL_W + (row % 2 === 0 ? 0 : CELL_W / 2);
    const y = offsetY + row * (CELL_H / 2);
    return { x, y };
  };

  const inDiamond = (px: number, py: number, cx: number, cy: number) => {
    const dx = Math.abs(px - cx) / (CELL_W / 2);
    const dy = Math.abs(py - cy) / (CELL_H / 2);
    return dx + dy <= 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    const alphaMap = new Map<string, number>();

    const loop = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const cols = Math.ceil(W / CELL_W) + 2;
      const rows = Math.ceil(H / (CELL_H / 2)) + 2;
      const offsetX = -CELL_W / 2;
      const offsetY = -CELL_H / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const { x: cx, y: cy } = cellCenter(col, row, offsetX, offsetY);
          const key = `${col},${row}`;

          const hovered = inDiamond(mx, my, cx, cy);
          const target  = hovered ? 1 : 0;
          const current = (alphaMap.get(key) ?? 0) + (target - (alphaMap.get(key) ?? 0)) * 0.1;
          alphaMap.set(key, current);

          ctx.beginPath();
          ctx.moveTo(cx,              cy - CELL_H / 2);
          ctx.lineTo(cx + CELL_W / 2, cy);
          ctx.lineTo(cx,              cy + CELL_H / 2);
          ctx.lineTo(cx - CELL_W / 2, cy);
          ctx.closePath();

          ctx.strokeStyle = `rgba(255,255,255,${0.06 + current * 0.12})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();

          if (current > 0.005) {
            ctx.fillStyle = `rgba(163,163,163,${current * 0.25})`;
            ctx.fill();
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:     'absolute',
        inset:        0,
        width:        '100%',
        height:       '100%',
        pointerEvents:'auto',
        cursor:       'crosshair',
      }}
    />
  );
}

// ── Slide Data ─────────────────────────────────────────────────────────────────
type TextSlide = {
  type: 'text';
  icon: string;
  title: string;
  paragraphs: string[];
};
type ImageSlide = {
  type: 'image';
  image: string;
  quote: string;
};
type Slide = TextSlide | ImageSlide;

const slides: Slide[] = [
  {
    type: 'text',
    icon: '/Group 1665 (2).svg',
    title: 'Why operating structure is introduced early',
    paragraphs: [
      'Most early-stage companies prioritise product, growth, and funding.',
      'Operating structure — governance, accountability, and execution control — is often deferred until complexity forces reactive changes.',
      'Introducing structure early prevents execution debt.',
    ],
  },
  {
    type: 'image',
    image: '/Rectangle 9444.png',
    quote: 'Early structure prevents later execution debt.',
  },
  {
    type: 'text',
    icon: '/Group 1670.svg',
    title: 'How the programme supports controlled scale',
    paragraphs: [
      'The Startups Programme introduces governance models and execution discipline from the beginning.',
      'This ensures teams and systems remain aligned as the organisation grows.',
      'Scale becomes deliberate, not improvised.',
    ],
  },
];

// ── Shared Carousel (used on mobile + tablet) ──────────────────────────────────
function SlidesCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setActiveSlide((p) => (p + 1) % slides.length);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3000);
  };

  const stopTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  // Click → playing: pause | paused: resume from current slide
  const handleClick = () => {
    if (!isPaused) {
      stopTimer();
      setIsPaused(true);
    } else {
      startTimer();
      setIsPaused(false);
    }
  };

  // Swipe → always go right, resume if paused
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = Math.abs(touchStartX.current - e.changedTouches[0].clientX);
    if (diff > 30) {
      next();
      setIsPaused(false);
      startTimer();
    }
    touchStartX.current = null;
  };

  const goTo = (i: number) => setActiveSlide(i);

  const current = slides[activeSlide];

  return (
    <div
      className="relative w-full bg-black overflow-hidden select-none cursor-pointer"
      style={{ minHeight: '340px' }}
      onClick={handleClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >

      {/* Side border lines */}
      <div className="absolute top-0 bottom-0 border-l border-[#3D3D3D] z-10" style={{ left: '40px' }} />
      <div className="absolute top-0 bottom-0 border-r border-[#3D3D3D] z-10" style={{ right: '40px' }} />

      {/* Slide content */}
      <motion.div
        key={activeSlide}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-20 flex flex-col justify-between h-full"
        style={{ padding: '32px 52px 28px 52px', minHeight: '340px' }}
      >
        {/* IMAGE SLIDE */}
        {current.type === 'image' && (
          <>
            <div className="absolute inset-0" style={{ left: '40px', right: '40px', top: 0, bottom: 0, overflow: 'hidden' }}>
              <img src={(current as ImageSlide).image} alt="slide visual" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="relative z-10 flex flex-col justify-between h-full" style={{ minHeight: '340px' }}>
              <div />
              <p className="text-[15px] pl-4 border-l border-white/40 text-white">{(current as ImageSlide).quote}</p>
              <Dots activeSlide={activeSlide} goTo={goTo} />
            </div>
          </>
        )}

        {/* TEXT SLIDE */}
        {current.type === 'text' && (
          <div className="relative z-10 flex flex-col justify-between h-full" style={{ minHeight: '340px' }}>
            <img src={(current as TextSlide).icon} alt="icon" className="w-6 h-6" />
            <div className="flex flex-col space-y-4 mt-6 flex-1">
              <h5 className="text-[17px] font-light leading-snug text-white">{(current as TextSlide).title}</h5>
              <div className="text-[12px] text-white/40 space-y-3 leading-relaxed">
                {(current as TextSlide).paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <Dots activeSlide={activeSlide} goTo={goTo} />
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Dots({ activeSlide, goTo }: { activeSlide: number; goTo: (i: number) => void }) {
  return (
    <div className="flex items-center gap-2 mt-6 pt-2">
      {slides.map((_, i) => (
        <div
          key={i}
          onClick={(e) => { e.stopPropagation(); goTo(i); }}
          style={{
            width: i === activeSlide ? '18px' : '6px',
            height: '6px',
            borderRadius: '3px',
            backgroundColor: i === activeSlide ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
const ProgramEmbedded = () => {
  const boxClass = "flex-1 h-[450px] border-r border-b border-[#3D3D3D] p-10 xl:p-12 flex flex-col justify-end relative bg-black transition-colors duration-300 hover:bg-[#1a1a1a]";
  const imageBoxClass = "flex-1 h-[450px] border-r border-b border-[#3D3D3D] flex flex-col justify-end relative bg-black";

  return (
    <section className="relative w-full bg-black text-white flex flex-col items-center">

      {/* Top horizontal line */}
      <div className="w-full border-t border-[#3D3D3D]" />

      <style>{`
        /* ── Desktop (1024px+): full 3-column grid layout ── */
        .prog-desktop {
          display: none;
        }
        @media (min-width: 1024px) {
          .prog-desktop {
            display: block;
            border-left: 1px solid #3D3D3D;
            position: relative;
            z-index: 10;
            margin-left: 80px;
            margin-right: 80px;
          }
          .prog-carousel-layout { display: none !important; }
        }
        @media (min-width: 1440px) {
          .prog-desktop {
            margin-left: 96px;
            margin-right: 96px;
          }
        }

        /* ── Mobile + Tablet (up to 1023px): carousel layout ── */
        .prog-carousel-layout {
          display: flex;
          flex-direction: column;
          width: 100%;
          position: relative;
          z-index: 10;
        }
        @media (min-width: 1024px) {
          .prog-carousel-layout { display: none !important; }
        }

        /* Tablet hero adjustments */
        @media (min-width: 641px) and (max-width: 1023px) {
          .carousel-hero-text { font-size: 28px !important; }
          .carousel-hero-padding { padding: 48px 80px 32px 80px !important; }
          .carousel-slide-padding { padding: 40px 100px 36px 100px !important; }
          .carousel-side-line-left { left: 80px !important; }
          .carousel-side-line-right { right: 80px !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT (1024px+) — unchanged 3-column grid
      ══════════════════════════════════════════════ */}
      <div className="prog-desktop">

        {/* TOP ROW */}
        <div className="relative w-full h-[450px] border-b border-r border-[#3D3D3D] flex flex-col justify-end p-12 overflow-hidden">
          <div
            className="absolute"
            style={{
              top: 0, bottom: 0, left: 0, right: '30%',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 42% 48%, black 5%, transparent 75%)',
              maskImage:       'radial-gradient(ellipse 85% 80% at 42% 48%, black 5%, transparent 75%)',
              pointerEvents:   'auto',
            }}
          >
            <IsometricHoverGrid />
            <img src="/vector 55.png" alt="" style={{ position: 'absolute', left: '150px', top: '90px', width: '100px', height: '60px', transform: 'translate(-50%, -50%)', objectFit: 'fill', opacity: 0.5, pointerEvents: 'none', mixBlendMode: 'screen' }} />
            <img src="/vector 55.png" alt="" style={{ position: 'absolute', left: '350px', top: '90px', width: '100px', height: '60px', transform: 'translate(-50%, -50%)', objectFit: 'fill', opacity: 10, pointerEvents: 'none', mixBlendMode: 'screen' }} />
          </div>

          <div className="absolute top-0 right-0 w-[300px] h-[200px] border-l border-b border-[#3D3D3D] z-20 pointer-events-none">
            <img src="/Rectangle 9440.png" alt="Grid Visual" className="w-full h-full object-cover opacity-60" />
          </div>

          <motion.div className="max-w-2xl mb-4 relative z-30" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.h3 variants={itemVariants} className="text-[36px] text-regular leading-[1.1] tracking-tight">
              The Startups Programme embeds
              <span className="block text-white/40">
                operating structure, governance, and accountability before scale begins.
              </span>
            </motion.h3>
          </motion.div>
        </div>

        {/* BOTTOM ROW — 3 BOXES */}
        <motion.div className="flex w-full" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}>

          <motion.div variants={itemVariants} className={boxClass}>
            <div className="absolute top-10 left-10">
              <img src="/Group 1665 (2).svg" alt="icon" className="w-6 h-6" />
            </div>
            <div className="space-y-5">
              <h5 className="text-[20px] leading-tight">Why operating structure is introduced early</h5>
              <div className="text-b3 text-[10px] text-white/40 space-y-2 max-w-[360px]">
                <p>Most early stage companies prioritise product, growth, and funding.</p>
                <p>Operating structure governance, accountability, and execution control is often deferred until complexity forces reactive changes.</p>
                <p>Introducing structure early prevents execution debt.</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className={imageBoxClass}>
            <img src="/Rectangle 9444.png" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Execution structure" />
            <div className="relative z-10 p-10 xl:p-12">
              <h5 className="text-[20px] border-white/40 pl-7">Early structure prevents <br /> later execution debt.</h5>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className={boxClass}>
            <div className="absolute top-10 left-10">
              <img src="/Group 1670.svg" alt="icon" className="w-6 h-6" />
            </div>
            <div className="space-y-5">
              <h5 className="text-[20px] leading-tight">How the programme supports controlled scale</h5>
              <div className="text-B2 text-[10px] text-white/40 space-y-4 leading-relaxed max-w-[320px]">
                <p>The Startups Programme introduces governance models and execution discipline from the beginning.</p>
                <p>This ensures teams and systems remain aligned as the organisation grows.</p>
                <p>Scale becomes deliberate, not improvised.</p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE + TABLET LAYOUT (up to 1023px) — carousel
      ══════════════════════════════════════════════ */}
      <div className="prog-carousel-layout">

        {/* Hero */}
        <div className="relative w-full overflow-hidden bg-black" style={{ minHeight: '200px' }}>
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 80% 85% at 50% 55%, black 5%, transparent 80%)',
              maskImage:       'radial-gradient(ellipse 80% 85% at 50% 55%, black 5%, transparent 80%)',
              pointerEvents:   'auto',
            }}
          >
            <IsometricHoverGrid />
            <img src="/vector 55.png" alt="" style={{ position: 'absolute', left: '50%', top: '95px', width: '100px', height: '60px', transform: 'translate(-160px, -50%)', objectFit: 'fill', opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'screen' }} />
            <img src="/vector 55.png" alt="" style={{ position: 'absolute', left: '50%', top: '95px', width: '100px', height: '60px', transform: 'translate(-50%, -50%)', objectFit: 'fill', opacity: 0.7, pointerEvents: 'none', mixBlendMode: 'screen' }} />
            <img src="/vector 55.png" alt="" style={{ position: 'absolute', left: '50%', top: '95px', width: '100px', height: '60px', transform: 'translate(60px, -50%)', objectFit: 'fill', opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'screen' }} />
          </div>

          <motion.div
            className="carousel-hero-padding relative z-30 flex flex-col justify-end h-full px-10 pb-6 pt-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
          >
            <motion.h3 variants={itemVariants} className="carousel-hero-text text-[20px] leading-[1.2] tracking-tight font-light">
              The Startups Programme embeds
              <span className="block text-white/40">
                operating structure, governance, and accountability before scale begins.
              </span>
            </motion.h3>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-[#3D3D3D]" />

        {/* Carousel */}
        <SlidesCarousel />

        {/* Bottom line */}
        <div className="w-full border-t border-[#3D3D3D]" />

      </div>

      {/* Bottom line (desktop) */}
      <style>{`.prog-bottom-line { display: none; } @media (min-width: 1024px) { .prog-bottom-line { display: block; } }`}</style>
      <div className="prog-bottom-line w-full border-t border-[#3D3D3D]" />

    </section>
  );
};

export default ProgramEmbedded;