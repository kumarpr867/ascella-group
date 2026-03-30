"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import Reveal from "@/utils/Reveal";
import { slideInFromBottom } from "@/utils/motion";
import Heading from '../headings/Heading';

// ── Isometric Grid with Per-Cell Hover (CODE PRESERVED) ──────────────────────
function IsometricHoverGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef    = useRef<number | null>(null);

  // New Image Ref for caching
  const vector55Ref = useRef<HTMLImageElement | null>(null);

  // Preserve existing geometry from last update (image_2 style)
  const CELL_W = 100;
  const CELL_H = 60;
  const LINE_WIDTH = 0.5;

  // Configuration for Vector55 insertion:
  const vectorImagesConfig = [
    { col: 2, row: 4 }, // Target box 1
    { col: 5, row: 7 }, // Target box 2
    { col: 3, row: 10 },// Target box 3
  ];

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

    // 1. Load the vector55.png image once
    if (!vector55Ref.current) {
      const img = new Image();
      img.src = '/vector 55.png'; // Ensure this path is correct
      img.onload = () => {
        vector55Ref.current = img;
      };
    }

    const syncSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width: w, height: h } = parent.getBoundingClientRect();
      if (w > 0 && h > 0 && (canvas.width !== Math.round(w) || canvas.height !== Math.round(h))) {
        canvas.width  = Math.round(w);
        canvas.height = Math.round(h);
      }
    };

    const ro = new ResizeObserver(() => syncSize());
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    syncSize();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    const alphaMap = new Map<string, number>();

    const loop = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        syncSize();
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const cols = Math.ceil(W / CELL_W) + 2;
      const rows = Math.ceil(H / (CELL_H / 2)) + 2;
      const offsetX = -CELL_W / 2;
      const offsetY = -CELL_H / 2;

      const vectorImage = vector55Ref.current;

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

          const baseLineAlpha = 0.2;
          const hoverBoostAlpha = 0.3;
          ctx.strokeStyle = `rgba(180, 180, 180, ${baseLineAlpha + current * hoverBoostAlpha})`;
          ctx.lineWidth   = LINE_WIDTH;
          ctx.stroke();

          if (vectorImage) {
            const shouldDrawVector = vectorImagesConfig.some(
              (config) => config.col === col && config.row === row
            );

            if (shouldDrawVector) {
              ctx.save();
              ctx.translate(cx - CELL_W / 2, cy - CELL_H / 2);
              ctx.drawImage(vectorImage, 0, 0, CELL_W, CELL_H);
              ctx.restore();
            }
          }

          if (current > 0.005) {
            ctx.fillStyle = `rgba(163,163,163,${current * 0.15})`;
            ctx.fill();
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        cursor: 'crosshair',
      }}
    />
  );
}

// ── Responsive hook (CODE PRESERVED) ────────────────────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [screenW, setScreenW] = useState(375);
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setScreenW(w);
      if (w < 640) setBp('mobile');
      else if (w < 1024) setBp('tablet');
      else setBp('desktop');
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return { bp, screenW };
}

// ── Config per breakpoint (CODE PRESERVED) ──────────────────────────────────────────────────────
const CONFIG = {
  mobile:  { cardW: 90,  cardH: 116, leftStep: 72,  topStep: 8,  gridTop: 108, gridBottom: -40,  liftY: -30, scale: 1.05 },
  tablet:  { cardW: 160, cardH: 206, leftStep: 128, topStep: 12, gridTop: 196, gridBottom: -80,  liftY: -50, scale: 1.05 },
  desktop: { cardW: 200, cardH: 256, leftStep: 160, topStep: 15, gridTop: 200, gridBottom: -120, liftY: -60, scale: 1.05 },
};

// ── Mobile Single Card Carousel ──────────────────────────────────────────────
function MobileCardCarousel({ executionArms }: { executionArms: { id: string; name: string; desc: string; iconPath: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goLeft = () => setActiveIndex(prev => Math.max(prev - 1, 0));
  const goRight = () => setActiveIndex(prev => Math.min(prev + 1, executionArms.length - 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goRight();
        else goLeft();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const arm = executionArms[activeIndex];
  const CARD_SIZE = 210;

  return (
    <div className="flex flex-col items-center w-full" style={{ paddingLeft: 24, paddingRight: 24 }}>
      {/* Card */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: CARD_SIZE,
          height: CARD_SIZE,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Left half tap zone — go back */}
        <div
          onClick={goLeft}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '50%',
            height: '100%',
            zIndex: 20,
            cursor: activeIndex > 0 ? 'pointer' : 'default',
          }}
        />
        {/* Right half tap zone — go forward */}
        <div
          onClick={goRight}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '50%',
            height: '100%',
            zIndex: 20,
            cursor: activeIndex < executionArms.length - 1 ? 'pointer' : 'default',
          }}
        />

        {/* Card background — off-white */}
        <div
          className="absolute inset-0 rounded-md"
          style={{
            background: '#D1D1D1',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          }}
        />

        {/* Card content */}
        <div className="relative z-10 w-full h-full flex flex-col" style={{ padding: 16 }}>
          {/* Top row: number left, icon right */}
          <div className="flex justify-between items-start w-full">
            <span
              style={{ fontSize: 11, letterSpacing: '0.15em', color: '#555' }}
            >
              {arm.id}
            </span>
            <div
              style={{
                backgroundColor: '#1a1a1a',
                maskImage: `url(${arm.iconPath})`,
                WebkitMaskImage: `url(${arm.iconPath})`,
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                width: 32,
                height: 32,
                flexShrink: 0,
              }}
            />
          </div>

          {/* Center: description */}
          <div className="flex-1 flex items-center justify-start" style={{ marginTop: 12 }}>
            <p
              style={{ fontSize: 12, maxWidth: 160, color: '#1a1a1a', lineHeight: 1.4 }}
            >
              {arm.desc}
            </p>
          </div>

          {/* Bottom right: card name */}
          <div className="flex justify-end items-end w-full">
            <span
              style={{ fontSize: 16, fontWeight: 700, color: '#0d0d0d', letterSpacing: '-0.01em' }}
            >
              {arm.name}
            </span>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-[6px]" style={{ marginTop: 20 }}>
        {executionArms.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? 18 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === activeIndex ? '#ffffff' : '#3a3a3a',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: i === activeIndex ? 1 : 0.4,
            }}
          />
        ))}
      </div>

    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
const ExecutionTogether = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { bp, screenW } = useBreakpoint();
  const isMobile = bp === 'mobile';

  const mobileCfg = (() => {
    const totalCards = 5;
    const pagePadding = 80;
    const available = Math.max(screenW - pagePadding, 200);
    const cardW = Math.floor(available / 4.12);
    const leftStep = Math.floor(cardW * 0.78);
    const cardH = Math.round(cardW * 1.28);
    const gridTop = Math.round(cardH * 0.93);
    return { cardW, cardH, leftStep, topStep: 8, gridTop, gridBottom: 0, liftY: -28, scale: 1.04 };
  })();

  const cfg = isMobile ? mobileCfg : CONFIG[bp];

  const executionArms = [
    { id: '01', name: 'Infosec',       desc: 'Coordinated execution without loss of control.', iconPath: '/Group.svg' },
    { id: '02', name: 'Software labs', desc: 'Scalable infrastructure and rapid prototyping.',  iconPath: '/software-labs.svg' },
    { id: '03', name: 'Engage',        desc: 'Direct market interaction and growth strategies.', iconPath: '/engage.svg' },
    { id: '04', name: 'Forge',         desc: 'Innovation and high-performance engineering.',     iconPath: '/forge.svg' },
    { id: '05', name: 'Staffing',      desc: 'Managed talent solutions and expert placement.',   iconPath: '/staffing.svg' },
  ];

  const totalCards = executionArms.length;
  const containerW = cfg.cardW + cfg.leftStep * (totalCards - 1);
  const expandedCardH = (isMobile && activeId) ? cfg.cardH * 1.4 : cfg.cardH;
  const containerH = expandedCardH + cfg.topStep * (totalCards - 1) + (isMobile ? 20 : 100);

  // ── MOBILE LAYOUT ─────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div
        className="bg-black text-white flex flex-col items-center relative overflow-hidden w-full"
        style={{ paddingTop: 36, paddingBottom: 24 }}
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center w-full" style={{ paddingLeft: 24, paddingRight: 24, marginBottom: 24 }}>
          <Reveal variants={slideInFromBottom(0.1)}>
            <div
              className="flex items-center justify-center gap-2 text-white uppercase"
              style={{ fontSize: 10, letterSpacing: '0.3em', marginBottom: 20 }}
            >
              <Heading text="How Execution Arms Work Together" size={14} />
            </div>
          </Reveal>

          <Reveal variants={slideInFromBottom(0.2)}>
            <h3
              className="font-light tracking-tight text-center"
              style={{ fontSize: 20, lineHeight: 1.1, marginBottom: 16 }}
            >
              Ascella Group sits above execution.{' '}
              Execution arms deliver specialised work within{' '}
              <span className="text-gray-400">Ascella's operating structure.</span>
            </h3>
          </Reveal>

          <Reveal variants={slideInFromBottom(0.3)}>
            <p
              className="text-white leading-relaxed text-center"
              style={{ fontSize: 12, maxWidth: 300 }}
            >
              Governance, accountability, and performance oversight remain central ensuring coordinated execution without fragmented ownership.
            </p>
          </Reveal>
        </div>

        {/* Ascella badge */}
        <Reveal variants={slideInFromBottom(0.4)}>
          <div
            className="text-white uppercase z-50"
            style={{
              padding: '7px 20px',
              fontSize: 11,
              letterSpacing: '0.4em',
              marginBottom: 28,
              border: '1px solid rgba(156,163,175,0.6)',
              borderRadius: 4,
              background: '#111',
            }}
          >
            Ascella
          </div>
        </Reveal>

        {/* Single Card Carousel */}
        <Reveal variants={slideInFromBottom(0.5)}>
          <MobileCardCarousel executionArms={executionArms} />
        </Reveal>

        {/* Footer governance text */}
        <Reveal variants={slideInFromBottom(0.6)}>
          <div className="flex flex-col items-center text-center" style={{ marginTop: 28, marginBottom: 20, paddingLeft: 24, paddingRight: 24 }}>
            <h5
              className="text-gray-300 leading-relaxed text-center"
              style={{ fontSize: 12, letterSpacing: '0.03em' }}
            >
              Governance is designed in,<br />not enforced later.
            </h5>
          </div>
        </Reveal>

        {/* Ascella Group card — centered */}
        <Reveal variants={slideInFromBottom(0.7)}>
          <div
            className="bg-[#D1D1D1] text-black rounded-sm flex items-center shadow-2xl"
            style={{ gap: 14, padding: '14px 16px', marginBottom: 28 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="28" viewBox="0 0 35 28" fill="none" style={{ flexShrink: 0 }}>
              <rect x="14" y="21" width="7" height="7" fill="#3D3D3D"/>
              <rect x="21" y="7" width="7" height="7" fill="#3D3D3D"/>
              <rect x="21" y="14" width="7" height="7" fill="#3D3D3D"/>
              <rect x="28" y="7" width="7" height="7" fill="#3D3D3D"/>
              <rect x="7" y="14" width="7" height="7" fill="#3D3D3D"/>
              <rect x="0" y="14" width="7" height="7" fill="#3D3D3D"/>
              <rect x="7" y="0" width="7" height="7" fill="#3D3D3D"/>
              <rect x="14" y="7" width="7" height="7" fill="#3D3D3D"/>
              <rect x="21" y="0" width="7" height="7" fill="#3D3D3D"/>
            </svg>
            <div>
              <h4 className="font-bold leading-tight tracking-tight" style={{ fontSize: 15 }}>
                Ascella Group
              </h4>
              <p className="text-gray-800" style={{ fontSize: 12, maxWidth: 160, lineHeight: 1.4 }}>
                Coordinated execution<br />without loss of control.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="absolute bottom-0 left-0 w-full bg-gray-400/60 z-10" style={{ height: 1 }} />
      </div>
    );
  }

  // ── DESKTOP / TABLET LAYOUT (CODE PRESERVED) ──────────────────────────────
  return (
    <div
      className="bg-black text-white flex flex-col items-center relative overflow-hidden"
      style={{
        paddingTop: 48,
        paddingBottom: 48,
        paddingLeft: 40,
        paddingRight: 40,
      }}
    >
      {/* ── Header (REVEAL ADDED) ────────────────────────────────────────────────────────── */}
      <div
        className="text-center z-50"
        style={{ maxWidth: 900, marginBottom: 48 }}
      >
        <Reveal variants={slideInFromBottom(0.1)}>
          <div
            className="flex items-center justify-center gap-2 text-white uppercase"
            style={{ fontSize: 10, letterSpacing: '0.3em', marginBottom: 32 }}
          >
            <Heading text="How Execution Arms Work Together"/>
          </div>
        </Reveal>

        <Reveal variants={slideInFromBottom(0.2)}>
          <h3
            className="font-light tracking-tight"
            style={{
              fontSize: bp === 'tablet' ? 28 : 36,
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Ascella Group sits above execution.{' '}
            <br />
            Execution arms deliver specialised work{' '}
            <br />
            within <span className="text-gray-400">Ascella's operating structure.</span>
          </h3>
        </Reveal>

        <Reveal variants={slideInFromBottom(0.3)}>
          <p
            className="text-white leading-relaxed mx-auto"
            style={{ fontSize: 14, maxWidth: 420 }}
          >
            Governance, accountability, and performance oversight remain central ensuring coordinated execution without fragmented ownership.
          </p>
        </Reveal>
      </div>

      {/* ── Ascella badge (REVEAL ADDED) ─────────────────────────────────────────────────── */}
      <Reveal variants={slideInFromBottom(0.4)}>
        <div
          className="bg-[#111] rounded border border-gray-400 text-white uppercase z-50"
          style={{
            padding: '10px 32px',
            fontSize: 11,
            letterSpacing: '0.4em',
            marginBottom: 40,
          }}
        >
          Ascella
        </div>
      </Reveal>

      {/* ── Cards area (ALL CODE PRESERVED) ────────────────────── */}
      <div
        className="relative flex justify-center items-start w-full"
        style={{ height: containerH + 80 }}
      >
        <div className="relative" style={{ width: containerW, height: containerH }}>

          {/* Canvas Hover Area */}
          <div
            style={{
              position: 'absolute',
              top: cfg.gridTop,
              bottom: cfg.gridBottom,
              left: 0, right: 0,
              zIndex: 1,
              WebkitMaskImage: [
                'radial-gradient(ellipse at center, black 0%, transparent 80%)',
                'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              ].join(', '),
              maskImage: [
                'radial-gradient(ellipse at center, black 0%, transparent 80%)',
                'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              ].join(', '),
              WebkitMaskComposite: 'destination-in',
              maskComposite: 'intersect',
              pointerEvents: 'auto',
            }}
          >
            <IsometricHoverGrid />
          </div>

          {/* Cards */}
          {executionArms.map((arm, index) => {
            const isExpanded = activeId === arm.id;
            const topPx  = (totalCards - 1 - index) * cfg.topStep;
            const leftPx = index * cfg.leftStep;
            const zBase  = totalCards - index;

            return (
              <div
                key={arm.id}
                onMouseEnter={() => setActiveId(arm.id)}
                onMouseLeave={() => setActiveId(null)}
                className="absolute transition-all ease-out"
                style={{
                  width: cfg.cardW,
                  height: cfg.cardH,
                  top: topPx,
                  left: leftPx,
                  zIndex: isExpanded ? 100 : zBase,
                  transform: isExpanded ? `translateY(${cfg.liftY}px) scale(${cfg.scale})` : 'none',
                  transitionDuration: '500ms',
                  cursor: 'default',
                }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 transition-all duration-500">
                    {isExpanded ? (
                      <div className="w-full h-full bg-[#D1D1D1] rounded-sm shadow-2xl" />
                    ) : (
                      <svg
                        viewBox="0 0 137 176"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-full h-full"
                        style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.8))' }}
                      >
                        <path
                          d="M0.000976398 3.10009C-0.0481035 0.891496 1.6425 -0.437488 3.77705 0.131725L129.871 33.7567C132.005 34.3259 133.775 36.5778 133.825 38.7864L136.802 172.753C136.851 174.962 135.16 176.291 133.025 175.722L6.93183 142.097C4.79728 141.527 3.0271 139.276 2.97802 137.067L0.000976398 3.10009Z"
                          fill="#0D0D0D"
                          stroke="rgba(75,85,99,0.5)"
                          strokeWidth="0.8"
                        />
                      </svg>
                    )}
                  </div>

                  <div
                    className={`relative z-10 w-full h-full flex flex-col transition-colors duration-500 ${isExpanded ? 'text-black' : 'text-white'}`}
                    style={{ padding: '24px' }}
                  >
                    <span
                      className="font-mono transition-all duration-500"
                      style={{
                        fontSize: 12,
                        letterSpacing: '0.15em',
                        color: isExpanded ? '#6b7280' : '#374151',
                        position: isExpanded ? 'static' : 'absolute',
                        top: 40,
                        left: 32,
                        transform: isExpanded ? 'none' : 'skewY(-15deg)',
                      }}
                    >
                      {arm.id}
                    </span>

                    <div
                      className="transition-all duration-500"
                      style={{
                        backgroundColor: isExpanded ? '#333' : '#9ca3af',
                        maskImage: `url(${arm.iconPath})`,
                        WebkitMaskImage: `url(${arm.iconPath})`,
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        width: isExpanded ? 40 : 56,
                        height: isExpanded ? 40 : 56,
                        flexShrink: 0,
                        ...(isExpanded
                          ? { marginLeft: 'auto' }
                          : { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
                        ),
                      }}
                    />

                    {isExpanded ? (
                      <div className="mt-auto">
                        <Reveal variants={slideInFromBottom(0.1)}>
                          <p
                            className="leading-snug font-medium text-gray-800"
                            style={{ fontSize: 13, marginBottom: 32 }}
                          >
                            {arm.desc}
                          </p>
                          <h4
                            className="font-semibold text-right tracking-tight"
                            style={{ fontSize: 20 }}
                          >
                            {arm.name}
                          </h4>
                        </Reveal>
                      </div>
                    ) : (
                      <span
                        className="uppercase text-gray-500 text-right leading-tight"
                        style={{
                          position: 'absolute',
                          bottom: 56,
                          right: 32,
                          fontSize: 11,
                          letterSpacing: '0.2em',
                          maxWidth: 100,
                          transform: 'skewY(-15deg)',
                        }}
                      >
                        {arm.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer (REVEAL ADDED) ────────────────────────────────────────────────────────── */}
      <div
        className="w-full"
        style={{
          maxWidth: 1280,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingTop: 16,
          paddingBottom: 16,
          marginTop: -20,
        }}
      >
        <Reveal variants={slideInFromBottom(0.5)}>
          <h5
            className="text-gray-300 leading-relaxed"
            style={{ fontSize: 12, letterSpacing: '0.03em', maxWidth: 200 }}
          >
            Governance is designed <br />in, not enforced later.
          </h5>
        </Reveal>

        <Reveal variants={slideInFromBottom(0.6)}>
          <div
            className="bg-[#D1D1D1] text-black rounded-sm flex items-center shadow-2xl"
            style={{ gap: 14, padding: '20px 24px', maxWidth: 400 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="28" viewBox="0 0 35 28" fill="none" style={{ flexShrink: 0 }}>
              <rect x="14" y="21" width="7" height="7" fill="#3D3D3D"/>
              <rect x="21" y="7" width="7" height="7" fill="#3D3D3D"/>
              <rect x="21" y="14" width="7" height="7" fill="#3D3D3D"/>
              <rect x="28" y="7" width="7" height="7" fill="#3D3D3D"/>
              <rect x="7" y="14" width="7" height="7" fill="#3D3D3D"/>
              <rect x="0" y="14" width="7" height="7" fill="#3D3D3D"/>
              <rect x="7" y="0" width="7" height="7" fill="#3D3D3D"/>
              <rect x="14" y="7" width="7" height="7" fill="#3D3D3D"/>
              <rect x="21" y="0" width="7" height="7" fill="#3D3D3D"/>
            </svg>
            <div>
              <h4 className="font-bold leading-tight tracking-tight" style={{ fontSize: 18 }}>
                Ascella Group
              </h4>
              <p className="text-gray-800 text-[12px]" style={{ fontSize: 14 }}>
                Coordinated execution without loss of control.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-gray-400/60 z-10" style={{ height: 1 }} />
    </div>
  );
};

export default ExecutionTogether;