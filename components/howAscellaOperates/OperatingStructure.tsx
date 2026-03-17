"use client"
import { slideInFromBottom, slideInFromLeft, slideInFromRight } from '@/utils/motion';
import Reveal from '@/utils/Reveal';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

// ── Isometric Grid — same as ContextsPage ────────────────────────────────────
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
  const mouseRef  = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef    = useRef<number | null>(null);

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

    if (interactive) {
      canvas.addEventListener('mousemove', onMove);
      canvas.addEventListener('mouseleave', onLeave);
    }

    const alphaMap = new Map<string, number>();

    const loop = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const cols    = Math.ceil(W / cellW) + 2;
      const rows    = Math.ceil(H / (cellH / 2)) + 2;
      const offsetX = -cellW / 2, offsetY = -cellH / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const { x: cx, y: cy } = cellCenter(col, row, offsetX, offsetY);
          const key = `${col},${row}`;

          const hovered = interactive ? inDiamond(mx, my, cx, cy) : false;
          const target  = hovered ? 1 : 0;
          const current = (alphaMap.get(key) ?? 0) + (target - (alphaMap.get(key) ?? 0)) * 0.1;
          alphaMap.set(key, current);

          ctx.beginPath();
          ctx.moveTo(cx,             cy - cellH / 2);
          ctx.lineTo(cx + cellW / 2, cy);
          ctx.lineTo(cx,             cy + cellH / 2);
          ctx.lineTo(cx - cellW / 2, cy);
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
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: interactive ? 'auto' : 'none',
        cursor:        interactive ? 'crosshair' : 'default',
      }}
    />
  );
}

// ── IsoBox — vector55.png snapped to a grid cell ─────────────────────────────
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
        position:      'absolute',
        left:          cx,
        top:           cy,
        width:         cellW,
        height:        cellH,
        transform:     'translate(-50%, -50%)',
        objectFit:     'fill',
        opacity,
        pointerEvents: 'none',
        mixBlendMode:  'screen',
        zIndex:        10,
      }}
    />
  );
};

// ── Data ──────────────────────────────────────────────────────────────────────
const items = [
  { label: "Accountability",       icon: "/howAscellaOperates/accountability.svg" },
  { label: "Assemble Pods",        icon: "/howAscellaOperates/pods.png" },
  { label: "Performance",          icon: "/howAscellaOperates/performance.png" },
  { label: "Embed Security",       icon: "/howAscellaOperates/security.png" },
  { label: "Controlled Execution", icon: "/howAscellaOperates/execution.png" },
];

const gridItems = [
  { label: 'Governance',           src: '/howAscellaOperates/governace.svg',      width: 69, height: 70 },
  { label: 'Accountability',       src: '/howAscellaOperates/accountability.svg',  width: 80, height: 80 },
  { label: 'Assemble Pods',        src: '/howAscellaOperates/pods.png',            width: 69, height: 70 },
  { label: 'Performance',          src: '/howAscellaOperates/performance.png',     width: 88, height: 52 },
  { label: 'Embed Security',       src: '/howAscellaOperates/security.png',        width: 63, height: 73 },
  { label: 'Controlled Execution', src: '/howAscellaOperates/execution.png',       width: 65, height: 45 },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function OperatingStructure() {
  return (
    <section className="border-y border-color">

      {/* ══════════════════════════════════════════
          DESKTOP HERO  (md+)
          Isometric grid fills the right half,
          text sits on the left.
      ══════════════════════════════════════════ */}
      <div className="relative border-b border-color overflow-hidden">
        <div className="relative mx-10 lg:mx-20 xl:mx-24  px-5 md:px-10 py-10 md:py-24 border-x border-color">

          {/* Text — left half */}
          <Reveal variants={slideInFromLeft(0.2)} className="relative z-10 flex flex-col gap-5 w-full lg:w-2/3 xl:w-1/2">
            <h2 className="text-[24px] md:text-[48px]">
              A unified model built for accountable
              <span className="text-gray-300"> execution at scale.</span>
            </h2>
            <p className="text-[14px] text-left sm:w-1/2">
              Ownership, governance, and delivery aligned before work begins.
            </p>
          </Reveal>

          {/*
            Isometric grid — right half overlay
            Masked so it fades left (into text area) and at top/bottom edges.

            cellW=100, cellH=60
            Container: ~830px wide, ~260px tall (matches old SVG viewport roughly)

            Tiles placed to match the 2 diamonds visible in the screenshot:
              Image shows 2 boxes roughly at centre-right of the hero.
              With offsetX=-50:
                col=6, row=3 (odd) → cx = -50+600+50 = 600, cy = -30+3*30 = 60
                col=8, row=3       → cx = -50+800+50 = 800, cy = 60
              These sit at 600 and 800px from container left — right half ✓
          */}
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
              maskComposite:       'intersect',
            }}
          >
            <IsometricHoverGrid cellW={100} cellH={60} interactive={true} />

            {/* Left diamond — slightly faded */}
            <IsoBox cellW={100} cellH={60} col={6} row={3} opacity={0.45} />
            {/* Right diamond — prominent */}
            <IsoBox cellW={100} cellH={60} col={8} row={3} opacity={0.75} />
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          FLOW CHART — xl screen
      ══════════════════════════════════════════ */}
      <div className="border-t border-color">
        <div className="hidden mx-10 lg:mx-20 xl:mx-24 px-10 py-10 xl:flex items-center justify-around border-x-0 xl:border-x border-color">
          <Reveal variants={slideInFromLeft(0.2)} className="flex flex-col items-center py-8">
            <p className="text-b3 mb-6">Governance</p>
            <div className="w-full h-40 flex items-center justify-center">
              <Image src="/howAscellaOperates/governace.svg" alt="governance" width={80} height={80} />
              <div className="w-10 bg-gray-400 h-1" />
            </div>
          </Reveal>

          <div className="grid grid-cols-5 text-center">
            {items.map((item, index) => (
              <Reveal key={index} variants={slideInFromBottom(0.2)} className="flex flex-col items-center py-8">
                <p className="text-b3 mb-6">{item.label}</p>
                <div className={`w-48 h-40 flex items-center justify-center border-y border-color
                  ${index === 0 ? 'border-l' : ''} ${index === 4 ? 'border-r' : ''}`}>
                  <Image src={item.icon} alt={item.label} width={80} height={80} />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variants={slideInFromRight(0.4)} className="flex flex-col items-center py-8">
            <p className="text-b3 mb-6">Outcome Stability</p>
            <div className="w-full h-40 flex items-center justify-center">
              <div className="w-10 bg-gray-400 h-1" />
              <Image src="/howAscellaOperates/outcome.png" alt="Outcome Stability" width={80} height={80} />
            </div>
          </Reveal>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE VIEW  (< xl)
      ══════════════════════════════════════════ */}
      <div className="block xl:hidden">

        {/* 2-column icon grid — 3 rows */}
        <div className="px-10 border-b border-color">
          <div className="grid grid-cols-2 border-x border-color">
            {gridItems.map((item, i) => (
              <Reveal variants={slideInFromBottom(0.2)} key={item.label}
                className={[
                  'relative flex flex-col items-center justify-center gap-3 py-6',
                  i % 2 === 0 ? 'border-r border-color' : '',
                  i < 4      ? 'border-b border-color' : '',
                ].join(' ')}
              >
                <div className="flex items-center justify-center">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={item.width}
                    height={item.height}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <span
                  className="text-[#6E6E6E] text-[12px] leading-[13px] text-center px-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {item.label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Outcome Stability */}
        <div className="px-10 border-b border-color">
          <div className="flex flex-col items-center justify-center py-6 gap-3 border-x border-color">
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

      </div>
    </section>
  );
}