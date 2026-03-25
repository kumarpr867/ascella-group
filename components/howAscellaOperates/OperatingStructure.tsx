"use client"
import { slideInFromBottom, slideInFromLeft, slideInFromRight } from '@/utils/motion';
import Reveal from '@/utils/Reveal';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState, useCallback } from 'react';

// ── Isometric Grid ────────────────────────────────────────────────────────────
function IsometricHoverGrid({
  cellW = 100,
  cellH = 60,
  interactive = true,
}: {
  cellW?: number;
  cellH?: number;
  interactive?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);

  const cellCenter = (col: number, row: number, oX: number, oY: number) => ({
    x: oX + col * cellW + (row % 2 === 0 ? 0 : cellW / 2),
    y: oY + row * (cellH / 2),
  });
  const inDiamond = (px: number, py: number, cx: number, cy: number) =>
    Math.abs(px - cx) / (cellW / 2) + Math.abs(py - cy) / (cellH / 2) <= 1;

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    if (interactive) {
      canvas.addEventListener('mousemove', onMove);
      canvas.addEventListener('mouseleave', onLeave);
    }

    const alphaMap = new Map<string, number>();

    const loop = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const cols = Math.ceil(W / cellW) + 2;
      const rows = Math.ceil(H / (cellH / 2)) + 2;
      const offsetX = -cellW / 2, offsetY = -cellH / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const { x: cx, y: cy } = cellCenter(col, row, offsetX, offsetY);
          const key = `${col},${row}`;

          const hovered = interactive ? inDiamond(mx, my, cx, cy) : false;
          const target = hovered ? 1 : 0;
          const current = (alphaMap.get(key) ?? 0) + (target - (alphaMap.get(key) ?? 0)) * 0.1;
          alphaMap.set(key, current);

          ctx.beginPath();
          ctx.moveTo(cx, cy - cellH / 2);
          ctx.lineTo(cx + cellW / 2, cy);
          ctx.lineTo(cx, cy + cellH / 2);
          ctx.lineTo(cx - cellW / 2, cy);
          ctx.closePath();

          ctx.strokeStyle = `rgba(255,255,255,${0.06 + current * 0.12})`;
          ctx.lineWidth = 0.5;
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
      if (interactive) {
        canvas.removeEventListener('mousemove', onMove);
        canvas.removeEventListener('mouseleave', onLeave);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cellW, cellH, interactive]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: interactive ? 'auto' : 'none',
        cursor: interactive ? 'crosshair' : 'default',
      }}
    />
  );
}

// ── IsoBox ────────────────────────────────────────────────────────────────────
interface IsoBoxProps {
  src?: string;
  cellW: number;
  cellH: number;
  col: number;
  row: number;
  opacity?: number;
}
const IsoBox: React.FC<IsoBoxProps> = ({
  src = '/vector 55.png',
  cellW, cellH, col, row,
  opacity = 0.9,
}) => {
  const offsetX = -cellW / 2;
  const offsetY = -cellH / 2;
  const cx = offsetX + col * cellW + (row % 2 === 0 ? 0 : cellW / 2);
  const cy = offsetY + row * (cellH / 2);

  return (
    <img
      src={src}
      alt=""
      style={{
        position: 'absolute',
        left: cx,
        top: cy,
        width: cellW,
        height: cellH,
        transform: 'translate(-50%, -50%)',
        objectFit: 'fill',
        opacity,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        zIndex: 10,
      }}
    />
  );
};

// ── Data ──────────────────────────────────────────────────────────────────────
const items = [
  { label: "Accountability", icon: "/howAscellaOperates/accountability.svg" },
  { label: "Assemble Pods", icon: "/howAscellaOperates/pods.png" },
  { label: "Performance", icon: "/howAscellaOperates/performance.png" },
  { label: "Embed Security", icon: "/howAscellaOperates/security.png" },
  { label: "Controlled Execution", icon: "/howAscellaOperates/execution.png" },
];

const gridItems = [
  { label: 'Governance', src: '/howAscellaOperates/governace.svg', width: 69, height: 70 },
  { label: 'Accountability', src: '/howAscellaOperates/accountability.svg', width: 80, height: 80 },
  { label: 'Assemble Pods', src: '/howAscellaOperates/pods.png', width: 69, height: 70 },
  { label: 'Performance', src: '/howAscellaOperates/performance.png', width: 88, height: 52 },
  { label: 'Embed Security', src: '/howAscellaOperates/security.png', width: 63, height: 73 },
  { label: 'Controlled Execution', src: '/howAscellaOperates/execution.png', width: 65, height: 45 },
];

// ── Glow Segment Map ──────────────────────────────────────────────────────────
//  Index  What glows
//  ─────  ─────────────────────────────────────────────────────
//    0    Governance icon
//    1    Left connector line  (governance → first box)
//    2    Box 0 — Accountability   → TOP + BOTTOM border + image glow
//    3    Box 1 — Assemble Pods    → TOP + BOTTOM border + image glow
//    4    Box 2 — Performance      → TOP + BOTTOM border + image glow
//    5    Box 3 — Embed Security   → TOP + BOTTOM border + image glow
//    6    Box 4 — Controlled Exec. → TOP + BOTTOM border + image glow
//    7    Right connector line     (last box → globe)
//    8    Globe — Outcome Stability

// Beam animation duration and spread
const BEAM_DURATION_MS = 2200; // total time for beam to sweep Governance → Globe
const BEAM_SPREAD = 5.5;  // higher = narrower beam (affects fewer elements at once)

// ── Component ─────────────────────────────────────────────────────────────────
export default function OperatingStructure() {
  //
  // beamPos: -1 = inactive, 0..1 = position of the glowing beam across the layout
  // Each element sits at normalised position: seg / 8  (there are 9 elements, seg 0‑8)
  // Brightness of any element = how close the beam currently is to that position.
  //
  const [beamPos, setBeamPos] = useState(-1);
  const beamRAFRef = useRef<number | null>(null);
  const beamActiveRef = useRef(false);

  const startBeam = useCallback(() => {
    // Don't restart while still sweeping
    if (beamActiveRef.current) return;
    beamActiveRef.current = true;

    if (beamRAFRef.current) cancelAnimationFrame(beamRAFRef.current);
    const startTime = performance.now();

    const animate = (now: number) => {
      const t = Math.min((now - startTime) / BEAM_DURATION_MS, 1);
      setBeamPos(t);
      if (t < 1) {
        beamRAFRef.current = requestAnimationFrame(animate);
      } else {
        // Brief hold at Globe then fade out
        setTimeout(() => {
          setBeamPos(-1);
          beamActiveRef.current = false;
          beamRAFRef.current = null;
        }, 350);
      }
    };
    beamRAFRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => () => {
    if (beamRAFRef.current) cancelAnimationFrame(beamRAFRef.current);
  }, []);

  // ── Style helpers ────────────────────────────────────────────────────────

  // How bright is element at segment index seg (0‑8)?
  const glowAt = (seg: number): number => {
    if (beamPos < 0) return 0;
    return Math.max(0, 1 - Math.abs(beamPos - seg / 8) * BEAM_SPREAD);
  };

  // Standalone icon glow — Governance (seg 0) and Globe (seg 8)
  const iconStyle = (seg: number): React.CSSProperties => {
    const g = glowAt(seg);
    return {
      cursor: 'pointer',
      filter: g > 0.01
        ? `brightness(${1 + g * 9}) drop-shadow(0 0 ${g * 10}px rgba(255,255,255,${g})) drop-shadow(0 0 ${g * 24}px rgba(255,255,255,${g * 0.7}))`
        : 'none',
    };
  };

  // Connector line glow — seg 1 (left) and seg 7 (right)
  const lineStyle = (seg: number): React.CSSProperties => {
    const g = glowAt(seg);
    return {
      background: g > 0.01
        ? `rgba(255,255,255,${0.3 + g * 0.7})`
        : 'rgb(156 163 175)',
      boxShadow: g > 0.01
        ? `0 0 ${g * 8}px ${g * 2}px rgba(255,255,255,${g * 0.9}), 0 0 ${g * 20}px ${g * 4}px rgba(255,255,255,${g * 0.4})`
        : 'none',
    };
  };

  // ── Box wrapper — pointer-events none so only image area is hoverable ──
  const boxWrapperStyle: React.CSSProperties = {
    position: 'relative',
    pointerEvents: 'none',
  };

  // Border glow line — same seg as image → both track the beam together
  const hBorderStyle = (seg: number): React.CSSProperties => {
    const g = glowAt(seg);
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      height: '1px',
      pointerEvents: 'none',
      background: g > 0.01 ? `rgba(255,255,255,${g * 0.95})` : 'transparent',
      boxShadow: g > 0.01
        ? `0 0 ${g * 8}px ${g * 3}px rgba(255,255,255,${g * 0.8}), 0 0 ${g * 22}px ${g * 8}px rgba(255,255,255,${g * 0.35})`
        : 'none',
    };
  };

  // Image wrapper
  const imgWrapperStyle = (seg: number): React.CSSProperties => {
    const g = glowAt(seg);
    return {
      cursor: 'pointer',
      pointerEvents: 'auto',
      filter: g > 0.01
        ? `brightness(${1 + g * 9}) drop-shadow(0 0 ${g * 10}px rgba(255,255,255,${g})) drop-shadow(0 0 ${g * 24}px rgba(255,255,255,${g * 0.7}))`
        : 'none',
    };
  };

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (

    <section className="border-y border-color">

      {/* ══════════════════════════════════════════
          DESKTOP HERO  (md+)
      ══════════════════════════════════════════ */}
      <div className="relative border-b border-color overflow-hidden">
        <div className="relative mx-10 lg:mx-20 xl:mx-24 px-5 md:px-10 py-10 lg:py-24 xl:border-x border-color">

          <Reveal variants={slideInFromLeft(0.2)} className="relative z-10 flex flex-col items-center xl:items-start gap-5 w-full xl:w-1/2 text-center xl:text-left">
            <h2 className="text-[24px] md:text-[48px]">
              A unified model built for accountable
              <span className="text-gray-300"> execution at scale.</span>
            </h2>
            <p className="text-[14px] xl:text-left sm:w-1/2">
              Ownership, governance, and delivery aligned before work begins.
            </p>
          </Reveal>

          <div
            className="absolute inset-0 z-0"
            style={{
              WebkitMaskImage: [
                'linear-gradient(to right, transparent 0%, transparent 35%, black 55%, black 85%, transparent 100%)',
                'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              ].join(', '),
              maskImage: [
                'linear-gradient(to right, transparent 0%, transparent 35%, black 55%, black 85%, transparent 100%)',
                'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              ].join(', '),
              WebkitMaskComposite: 'destination-in',
              maskComposite: 'intersect',
            }}
          >
            <IsometricHoverGrid cellW={100} cellH={60} interactive={true} />
            <IsoBox cellW={100} cellH={60} col={6} row={3} opacity={0.45} />
            <IsoBox cellW={100} cellH={60} col={8} row={3} opacity={0.75} />
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          FLOW CHART — xl screen
      ══════════════════════════════════════════ */}
      <div className="border-t border-color">
        <div className="hidden xl:flex mx-10 lg:mx-20 xl:mx-24 px-4 xl:px-10 py-10 items-center justify-center border-x-0 xl:border-x border-color">

          {/* ── Governance — segment 0 ── */}
          <Reveal variants={slideInFromLeft(0.2)} className="flex flex-col items-center py-8">
            <p className="text-b3 mb-6">Governance</p>
            <div className="w-full h-40 flex items-center justify-center">
              {/* Governance icon — hover triggers sequence */}
              <div
                style={iconStyle(0)}
                onMouseEnter={startBeam}
              >
                <Image src="/howAscellaOperates/governace.svg" alt="governance" width={80} height={80} />
              </div>
              {/* Left connector line — segment 1 */}
              <div className="w-4 xl:w-5 h-px overflow-hidden" style={lineStyle(1)} />
            </div>
          </Reveal>

          {/* ── 5 Middle Boxes — segments 2 → 6 ── */}
          {/*
            Single top + bottom line spans the FULL grid width.
            background-position moves with beamPos → one smooth unbroken sweep.
          */}
          <div className="relative">

            {/* ── Unified top glow line ── */}
            <div style={{
              position: 'absolute',
              top: 75,         // aligns with box top border
              left: 0,
              right: 0,
              height: '1px',
              pointerEvents: 'none',
              zIndex: 20,
              // Narrow bright spot; position tracks beamPos mapped to box area (segs 2-6)
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 70%, transparent 100%)',
              backgroundSize: '40% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: (() => {
                // beamPos 0.25 (seg2) → 0%, beamPos 0.75 (seg6) → 100%
                const p = Math.max(0, Math.min(1, (beamPos - 0.25) / 0.5)) * 100;
                return `${p}% 0`;
              })(),
              opacity: beamPos >= 0.2 && beamPos <= 0.82 ? 1 : 0,
              transition: 'opacity 0.15s ease',
              boxShadow: '0 0 10px 4px rgba(255,255,255,0.45), 0 0 24px 8px rgba(255,255,255,0.2)',
            }} />

            {/* ── Unified bottom glow line ── */}
            <div style={{
              position: 'absolute',
              bottom: 31,         // aligns with box bottom border
              left: 0,
              right: 0,
              height: '1px',
              pointerEvents: 'none',
              zIndex: 20,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 70%, transparent 100%)',
              backgroundSize: '40% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: (() => {
                const p = Math.max(0, Math.min(1, (beamPos - 0.25) / 0.5)) * 100;
                return `${p}% 0`;
              })(),
              opacity: beamPos >= 0.2 && beamPos <= 0.82 ? 1 : 0,
              transition: 'opacity 0.15s ease',
              boxShadow: '0 0 10px 4px rgba(255,255,255,0.45), 0 0 24px 8px rgba(255,255,255,0.2)',
            }} />

            <div className="grid grid-cols-5 text-center bg-black z-10">
              {items.map((item, index) => {
                const seg = index + 2; // 2, 3, 4, 5, 6
                return (
                  <Reveal key={index} variants={slideInFromBottom(0.2)} className="flex flex-col items-center py-8">
                    <p className="text-b3 mb-6">{item.label}</p>

                    <div
                      className={[
                        'w-48 h-40 flex items-center justify-center border-y border-color',
                        index === 0 ? 'border-l' : '',
                        index === 4 ? 'border-r' : '',
                      ].join(' ')}
                      style={boxWrapperStyle}
                    >
                      {/* Image — glows as beam passes (glowAt tracked via beamPos) */}
                      <div
                        style={imgWrapperStyle(seg)}
                        onMouseEnter={startBeam}
                      >
                        <Image src={item.icon} alt={item.label} width={80} height={80} />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* ── Outcome Stability — right line (7) + Globe (8) ── */}
          <Reveal variants={slideInFromRight(0.4)} className="flex flex-col items-center py-8">
            <p className="text-b3 mb-6">Outcome Stability</p>
            <div className="w-full h-40 flex items-center justify-center">
              {/* Right connector line — segment 7 */}
              <div className="w-10 h-px" style={lineStyle(7)} />
              {/* Globe — segment 8, hover triggers sequence */}
              <div
                style={iconStyle(8)}
                onMouseEnter={startBeam}
              >
                <Image src="/howAscellaOperates/outcome.png" alt="Outcome Stability" width={80} height={80} />
              </div>
            </div>
          </Reveal>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE VIEW  (< xl) — UNTOUCHED
      ══════════════════════════════════════════ */}
      <div className="block xl:hidden">
        {/* ── Governance (static) ── */}
        <div className="flex flex-col items-center justify-center py-8 border-b border-color">
          <Image
            src="/howAscellaOperates/governace.svg"
            alt="Governance"
            width={70}
            height={70}
            className="rotate-90"
          />
          <span className="text-white text-[12px] mt-3">
            Governance
          </span>
        </div>

        {/* ── Accordion Items ── */}
        {items.map((item, index) => {
  const isOpen = activeIndex === index;

  return (
    <div
      key={item.label}
      className="border-b border-gray-500"
      onMouseEnter={() => setActiveIndex(index)}   // desktop
      onMouseLeave={() => setActiveIndex(null)}    // desktop
    >

      {/* Header */}
      <div
        onClick={() => setActiveIndex(isOpen ? null : index)} // mobile
        className="flex w-full justify-center items-center py-5 cursor-pointer hover:bg-gray-500/10 transition"
      >
        <span className="text-gray-200 text-[12px]">
          {item.label}
        </span>
      </div>

      {/* Content (SMOOTH) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="flex justify-center py-4"
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={70}
                height={70}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
})}

      <div className="flex flex-col items-center justify-center py-6 gap-3">
        <div className="flex items-center justify-center" style={{ minHeight: 80 }}>
          <Image
            src="/howAscellaOperates/outcome.png"
            alt="Outcome Stability"
            width={73}
            height={75}
            style={{ objectFit: 'contain' }}
          />
        </div>
        <span
          className="text-white text-[12px] leading-[13px]"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Outcome Stability
        </span>
      </div>
    </div>
    </section >
  );
}