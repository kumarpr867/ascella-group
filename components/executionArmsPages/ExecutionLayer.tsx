'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const categories = ['Infosec', 'Software Labs', 'Engage', 'Forge', 'Staffing'];

const SPACING   = 3;
const THRESHOLD = 15;
const RADIUS    = 85;
const LERP      = 0.13;

type Particle = {
  x: number;
  y: number;
  baseAlpha: number;
  currentAlpha: number;
  size: number;
};

function ParticleImagePanel({ imageSrc = '/Rectangle 5046.svg' }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const imgElRef     = useRef<HTMLImageElement>(null);
  const mouseRef     = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef       = useRef<number | null>(null);

  const buildParticles = () => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    const imgEl     = imgElRef.current;
    if (!canvas || !container || !imgEl) return;

    canvas.width  = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const W = canvas.width;
    const H = canvas.height;

    const off    = document.createElement('canvas');
    off.width    = W;
    off.height   = H;
    const offCtx = off.getContext('2d');
    if (!offCtx) return;

    try {
      offCtx.drawImage(imgEl, 0, 0, W, H);
      const { data } = offCtx.getImageData(0, 0, W, H);
      const pts: Particle[] = [];

      for (let y = 0; y < H; y += SPACING) {
        for (let x = 0; x < W; x += SPACING) {
          const i          = (y * W + x) * 4;
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (brightness > THRESHOLD) {
            pts.push({
              x, y,
              baseAlpha:    0,
              currentAlpha: 0,
              size: Math.random() * 0.8 + 0.4,
            });
          }
        }
      }
      particlesRef.current = pts;
    } catch {
      // CORS fallback — no pixel sampling, canvas still captures hover
      particlesRef.current = [];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    if (!ctx) return;

    const startLoop = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const loop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        for (const p of particlesRef.current) {
          const dx   = p.x - mx;
          const dy   = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t    = Math.max(0, 1 - dist / RADIUS);
          const ease = t * t * (3 - 2 * t);

          p.currentAlpha += (ease - p.currentAlpha) * LERP;
          if (p.currentAlpha < 0.005) continue;

          // Outer glow halo
          if (ease > 0.03) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * (1 + ease * 5), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${p.currentAlpha * 0.2})`;
            ctx.fill();
          }

          // Core white dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${Math.min(1, p.currentAlpha)})`;
          ctx.fill();
        }

        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
    };

    const onMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect       = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    const ro = new ResizeObserver(() => buildParticles());
    if (containerRef.current) ro.observe(containerRef.current);

    startLoop();

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', onMove);
        canvas.removeEventListener('mouseleave', onLeave);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative border-r border-white/10 w-full h-full overflow-hidden"
      style={{ cursor: 'crosshair' }}
    >
      {/* Original image — untouched */}
      <img
        ref={imgElRef}
        src={imageSrc}
        alt="background pattern"
        onLoad={buildParticles}
        style={{
          position:     'absolute',
          inset:        0,
          width:        '100%',
          height:       '100%',
          objectFit:    'cover',
          opacity:      0.8,
          mixBlendMode: 'overlay',
          pointerEvents:'none',
        }}
      />

      {/* Transparent particle canvas on top */}
      <canvas
        ref={canvasRef}
        style={{
          position:     'absolute',
          inset:        0,
          width:        '100%',
          height:       '100%',
          pointerEvents:'auto',
          zIndex:       10,
        }}
      />
    </div>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────────

const ExecutionLayer = () => {
  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden">

      {/* Background Grid */}
      <div className="absolute inset-0 z-0 grid grid-cols-[100px_1.5fr_0.8fr_100px] grid-rows-[80px_1fr_100px_80px]">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-white/10"></div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 grid grid-cols-[100px_1.5fr_0.8fr_100px] grid-rows-[80px_1fr_100px_80px] min-h-screen">

        {/* ── Row 1 ── */}
        <div className="border-b border-white/10"></div>
        <div className="border-b border-white/10"></div>
        <div className="relative border-b border-white/10 flex items-end">
          <div>
            <span className="relative px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-white bg-black border border-white/20 inline-block z-20">
              <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white/60"></span>
              <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white/60"></span>
              <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white/60"></span>
              <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white/60"></span>
              All Execution Arms Operational
            </span>
          </div>
        </div>
        <div className="border-b border-white/10"></div>

        {/* ── Row 2 — Hero ── */}
        <div className="border-r border-white/10"></div>

        <div className="relative p-12 lg:p-24 pt-10 lg:pt-10 flex flex-col justify-start border-r border-white/10 overflow-hidden">

          {/* ISO grid + vector images */}
          <div
            className="absolute z-0 pointer-events-none left-0 right-0"
            style={{ top: '55%', bottom: 0 }}
          >
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <pattern id="iso-grid" width="100" height="60" patternUnits="userSpaceOnUse">
                  <path
                    d="M50 0 L100 30 L50 60 L0 30 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    opacity="0.08"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#iso-grid)" />
              <image href="/vector 55.png" x="0"   y="0"   width="100" height="60" opacity="30" preserveAspectRatio="xMidYMid meet" />
              <image href="/vector 55.png" x="200" y="60"  width="100" height="60" opacity="30" preserveAspectRatio="xMidYMid meet" />
              <image href="/vector 55.png" x="500" y="120" width="100" height="60" opacity="50" preserveAspectRatio="xMidYMid meet" />
            </svg>
          </div>

          {/* Hero content */}
          <div className="relative">
            <div className="mb-4">
              <span className="relative inline-block border bg-blur border-white/30 px-4 py-1 text-[10px] tracking-widest uppercase text-white/60 font-medium bg-black/50">
                <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white"></span>
                <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white"></span>
                <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white"></span>
                <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white"></span>
                Execution Layer
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-Montserrat leading-[1.1] mb-4 tracking-tight max-w-3xl">
              Controlled execution <br /> units for <span className="text-neutral-500">complex <br />operating environments</span>
            </h2>
            <p className="text-sm max-w-lg leading-relaxed">
              Execution arms deliver specialised work across security, technology, operations, and growth. Ascella Group retains governance, accountability, and oversight across all execution.
            </p>
          </div>
        </div>

        {/* ── Right Panel — Particle Hover Image ── */}
        <ParticleImagePanel imageSrc="/Rectangle 5046.svg" />

        <div className="bg-black"></div>

        {/* ── Row 3 — Categories & Stats ── */}
        <div className="border-t border-r border-white/10"></div>

        <div className="col-span-1 border-t border-r border-white/10 flex">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex-1 flex items-center justify-center border-r border-white/10 last:border-r-0 hover:bg-white/5 cursor-pointer transition-colors group"
            >
              <h5 className="text-[10px] tracking-[0.2em] uppercase group-hover:text-white">{cat}</h5>
            </div>
          ))}
        </div>

        <div className="border-t border-r border-white/10 grid grid-cols-3 h-full">
          <div className="flex flex-col justify-center px-4 border-r border-white/10">
            <span className="text-[8px] uppercase mb-1">Execution Arms</span>
            <span className="text-xl font-light">05.</span>
          </div>
          <div className="flex flex-col justify-center px-4 border-r border-white/10">
            <span className="text-[8px] uppercase mb-1">Governance Authority</span>
            <span className="text-xl">Single.</span>
          </div>
          <div className="flex flex-col justify-center px-4">
            <span className="text-[8px] uppercase mb-1">Oversight & Accountability</span>
            <span className="text-xl">Continuous.</span>
          </div>
        </div>

        <div className="border-t border-white/10"></div>

        {/* ── Footer Row ── */}
        <div className="col-span-4 border-t border-white/10"></div>
      </div>
    </div>
  );
};

export default ExecutionLayer;