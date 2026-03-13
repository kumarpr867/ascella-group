"use client"
import React, { useEffect, useRef } from 'react';
import Reveal from "@/utils/Reveal";
import { slideInFromBottom } from "@/utils/motion";

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
      const cols   = Math.ceil(W / cellW) + 2;
      const rows   = Math.ceil(H / (cellH / 2)) + 2;
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
        left:           cx,
        top:            cy,
        width:          cellW,
        height:         cellH,
        transform:      'translate(-50%, -50%)',
        objectFit:      'fill',
        opacity,
        pointerEvents: 'none',
        mixBlendMode:   'screen',
        zIndex:         10,
      }}
    />
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
const Alignments = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center py-20 font-sans overflow-hidden relative">

      {/* Header Section */}
      <div className="flex flex-col items-center w-full max-w-[720px] text-center px-4 z-10 relative">
        <Reveal variants={slideInFromBottom(0.1)}>
          <header className="flex flex-col gap-6">
            <h3 className="text-[28px] md:text-[36px] lg:text-[40px] leading-[1.1] tracking-tight">
              Alignment is the first step toward structured execution readiness.
            </h3>
            <p className="text-white/60 text-sm md:text-base max-w-[500px] mx-auto leading-relaxed">
              The Startups Programme begins with an alignment conversation focused on
              operating context, accountability expectations, and readiness for governed execution.
            </p>
          </header>
        </Reveal>
      </div>

      {/* ── Desktop grid (md and above) ─────────────────────────────────────── */}
      <Reveal variants={slideInFromBottom(0.2)} className="relative my-[-20px] hidden md:block">
        <div
          style={{
            width:  '720px',
            height: '160px',
            WebkitMaskImage: [
              'linear-gradient(to right,  transparent 0%, black 12%, black 88%, transparent 100%)',
              'linear-gradient(to bottom, transparent 0%, black 20%, black 75%, transparent 100%)',
            ].join(', '),
            maskImage: [
              'linear-gradient(to right,  transparent 0%, black 12%, black 88%, transparent 100%)',
              'linear-gradient(to bottom, transparent 0%, black 20%, black 75%, transparent 100%)',
            ].join(', '),
            WebkitMaskComposite: 'destination-in',
            maskComposite:       'intersect',
          }}
        >
          <IsometricHoverGrid cellW={100} cellH={60} interactive={true} />

          {/* left tile — slightly faded */}
          <IsoBox cellW={100} cellH={60} col={2} row={3} opacity={0.45} />
          {/* centre tile — most prominent */}
          <IsoBox cellW={100} cellH={60} col={4} row={3} opacity={0.9} />
          {/* right tile — slightly faded */}
          <IsoBox cellW={100} cellH={60} col={6} row={3} opacity={0.45} />
        </div>
      </Reveal>

      {/* ── Mobile grid (below md) ───────────────────────────────────────────── */}
      <Reveal variants={slideInFromBottom(0.2)} className="relative my-[-20px] block md:hidden w-full">
        <div
          style={{
            height: '140px',
            WebkitMaskImage: [
              'linear-gradient(to right,  transparent 0%, black 8%, black 92%, transparent 100%)',
              'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
            ].join(', '),
            maskImage: [
              'linear-gradient(to right,  transparent 0%, black 8%, black 92%, transparent 100%)',
              'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
            ].join(', '),
            WebkitMaskComposite: 'destination-in',
            maskComposite:       'intersect',
          }}
        >
          <IsometricHoverGrid cellW={60} cellH={36} interactive={false} />

          <IsoBox cellW={60} cellH={36} col={2} row={4} opacity={0.45} />
          <IsoBox cellW={60} cellH={36} col={4} row={4} opacity={0.9} />
          <IsoBox cellW={60} cellH={36} col={6} row={4} opacity={0.45} />
        </div>
      </Reveal>

      {/* ── FORM CONTAINER BOX ── */}
      <Reveal variants={slideInFromBottom(0.3)} className="w-full flex justify-center">
        <div
          className="
            w-full
            mx-10 md:mx-auto
            max-w-[calc(100%-80px)] md:max-w-[480px]
            border border-[#3D3D3D] rounded-[8px]
            bg-[#000]/90 backdrop-blur-md
            flex flex-col items-center
            px-5 md:px-[60px]
            z-20 relative
            mt-[10px]
          "
          style={{ paddingTop: '24px', paddingBottom: '24px' }}
        >
          {/* Top Icon */}
          <div className="mb- flex justify-center">
            <img src="/image-1.png" alt="Icon" className="w-14 h-14 md:w-20 md:h-20 object-contain" />
          </div>

          {/* Form Content */}
          <div className="w-full flex flex-col gap-4 text-center">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl md:text-2xl font-normal tracking-tight text-white/90">
                Let's Get You Started
              </h3>
              <p className="text-white/40 text-xs md:text-sm max-w-[340px] mx-auto leading-relaxed">
                Fill out the form below and we'll get in touch to explore how Ascella can help power your success
              </p>
            </div>

            <form className="flex flex-col gap-6 text-left mt-1" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-[#0A0A0A] border border-[#2a2a2a] p-2 rounded-md text-sm outline-none focus:border-white/40 transition-colors text-white placeholder-white/30"
              />
              <input
                type="text"
                placeholder="Your Role / Title *"
                required
                className="w-full bg-[#0A0A0A] border border-[#2a2a2a] p-2 rounded-md text-sm outline-none focus:border-white/40 transition-colors text-white placeholder-white/30"
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                className="w-full bg-[#0A0A0A] border border-[#2a2a2a] p-2 rounded-md text-sm outline-none focus:border-white/40 transition-colors text-white placeholder-white/30"
              />
              <input
                type="email"
                placeholder="Email Address *"
                required
                className="w-full bg-[#0A0A0A] border border-[#2a2a2a] p-2 rounded-md text-sm outline-none focus:border-white/40 transition-colors text-white placeholder-white/30"
              />

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className="bg-white text-black font-semibold py-2.5 px-10 rounded-md hover:bg-gray-200 transition-all active:scale-[0.98] text-sm"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </Reveal>

      {/* Bottom divider */}
      <div className="w-full border-t border-white/20 mt-[50px]" />
    </div>
  );
};

export default Alignments;