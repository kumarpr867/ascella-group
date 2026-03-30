'use client';

import React, { useEffect, useRef } from 'react';
import Reveal from "@/utils/Reveal"
import { slideInFromBottom } from "@/utils/motion"

const categories = ['Infosec', 'Software Labs' , 'Staffing', 'Engage', 'Forge'];

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

// ── Main Page Component ──────────────────────────────────────────────────────
const ExecutionLayer = () => {
  const imageSrc = "/Rectangle 5046.svg";

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">

      {/* MOBILE LAYOUT (< md) */}
      <div className="flex flex-col md:hidden min-h-screen">
        <div className="mx-10">

          <div className="relative px-5 pb-10 overflow-hidden" style={{ flexShrink: 0 }}>
            <div
              style={{
                position: 'absolute',
                top: '48%',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 0,
                WebkitMaskImage: [
                  'linear-gradient(to right,  transparent 0%, black 8%, black 92%, transparent 100%)',
                  'linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%)',
                ].join(', '),
                maskImage: [
                  'linear-gradient(to right,  transparent 0%, black 8%, black 92%, transparent 100%)',
                  'linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%)',
                ].join(', '),
                WebkitMaskComposite: 'destination-in',
                maskComposite: 'intersect',
                pointerEvents: 'none',
              }}
            >
              <IsometricHoverGrid />
            </div>

            <div style={{ position: 'relative', zIndex: 10 }}>
              <Reveal variants={slideInFromBottom(0.1)} className="mb-5">
                <span className="relative inline-block border border-white/30 px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase text-white/60 font-medium bg-black/50">
                  <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-white"></span>
                  <span className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-white"></span>
                  <span className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-white"></span>
                  <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white"></span>
                  Execution Layer
                </span>
              </Reveal>
              <Reveal variants={slideInFromBottom(0.2)}>
                <h4 className="text-[1.5rem] font-Montserrat leading-[1.05] mb-5 tracking-tight">
                  Controlled execution units for{' '}
                  <span className="text-neutral-500">complex operating environments</span>
                </h4>
              </Reveal>
              <Reveal variants={slideInFromBottom(0.3)}>
                <p className="text-[12px] font-Montserrat leading-relaxed text-white">
                  Execution arms deliver specialised work across security, technology, operations, and growth. Ascella Group retains governance, accountability, and oversight across all execution.
                </p>
              </Reveal>
            </div>
          </div>

          

          {/* Static Image */}
          <div className="relative w-full border-b border-white/10 bg-black" style={{ height: '500px', flexShrink: 0 }}>
            <img
              src={imageSrc}
              alt="Execution Layer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-3 border-b border-white/10" style={{ flexShrink: 0 }}>
            <div className="flex flex-col justify-center px-3 py-5 border-r border-white/10">
              <span className="text-xl font-light">5</span>
              <span className="text-[8px] uppercase mt-1 text-white/50 tracking-wider leading-tight">Execution Arms</span>
            </div>
            <div className="flex flex-col justify-center px-3 py-5 border-r border-white/10">
              <span className="text-xl">Single</span>
              <span className="text-[8px] uppercase mt-1 text-white/50 tracking-wider leading-tight">Operating Ownership</span>
            </div>
            <div className="flex flex-col justify-center px-3 py-5">
              <span className="text-xl">Continuous</span>
              <span className="text-[8px] uppercase mt-1 text-white/50 tracking-wider leading-tight">Oversight &amp; Accountability</span>
            </div>
          </div>

        </div>
        <div className="flex-1"></div>
      </div>

      {/* DESKTOP LAYOUT (>= md) */}
      <div className="hidden md:block">
        {/* 
          Prog wale margins: mx-10 = 40px, lg:mx-20 = 80px, xl:mx-24 = 96px
          Grid columns: [margin] [main-content] [image] [margin]
        */}
        <div className="absolute inset-0 z-0 grid grid-cols-[40px_1.5fr_0.8fr_40px] lg:grid-cols-[80px_1.5fr_0.8fr_80px] xl:grid-cols-[96px_1.5fr_0.8fr_96px] grid-rows-[80px_1fr_100px_80px]">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/10"></div>
          ))}
        </div>

        <div className="relative z-10 grid grid-cols-[40px_1.5fr_0.8fr_40px] lg:grid-cols-[80px_1.5fr_0.8fr_80px] xl:grid-cols-[96px_1.5fr_0.8fr_96px] grid-rows-[80px_1fr_100px_80px] min-h-screen">
          <div className="border-b border-white/10"></div>
          <div className="border-b border-white/10"></div>
          <div className="relative border-b border-white/10 flex items-end">
            <Reveal variants={slideInFromBottom(0.1)}>
              <span className="relative px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-white bg-black border border-white/20 inline-block z-20">
                <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white/60"></span>
                <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white/60"></span>
                <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white/60"></span>
                <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white/60"></span>
                All Execution Arms Operational
              </span>
            </Reveal>
          </div>
          <div className="border-b border-white/10"></div>

          <div className="border-r border-white/10"></div>
          <div className="relative p-8 lg:p-12 xl:p-24 pt-8 lg:pt-10 flex flex-col justify-start border-r border-white/10 overflow-hidden">
            
            <div className="absolute z-0 pointer-events-none left-0 right-0" style={{ top: '55%', bottom: 0 }}>
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <image href="/vector 55.png" x="200" y="60"  width="100" height="60" opacity="30" preserveAspectRatio="xMidYMid meet" />
                <image href="/vector 55.png" x="500" y="120" width="100" height="60" opacity="50" preserveAspectRatio="xMidYMid meet" />
              </svg>
            </div>

            <div
              className="absolute z-1"
              style={{
                top: '55%',
                bottom: 0,
                left: '0',
                right: '0',
                WebkitMaskImage: [
                  'linear-gradient(to right,  transparent 0%, black 40%, black 60%, transparent 100%)',
                  'linear-gradient(to bottom, transparent 0%, black 18%, black 60%, transparent 100%)',
                ].join(', '),
                maskImage: [
                  'linear-gradient(to right,  transparent 0%, black 40%, black 88%, transparent 100%)',
                  'linear-gradient(to bottom, transparent 0%, black 40%, black 85%, transparent 100%)',
                ].join(', '),
                WebkitMaskComposite: 'destination-in',
                maskComposite: 'intersect',
                pointerEvents: 'auto',
              }}
            >
              <IsometricHoverGrid />
            </div>

            <div className="relative z-10">
              <Reveal variants={slideInFromBottom(0.1)} className="mb-4">
                <span className="relative inline-block border border-white/30 px-4 py-1 text-[10px] tracking-widest uppercase text-white/60 font-medium bg-black/50">
                  <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white"></span>
                  <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white"></span>
                  <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white"></span>
                  <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white"></span>
                  Execution Layer
                </span>
              </Reveal>
              <Reveal variants={slideInFromBottom(0.2)}>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl  mb-4 tracking-tight max-w-xl">
                  Controlled execution <br /> units for <span className="text-neutral-500">complex <br />operating environments</span>
                </h2>
              </Reveal>
              <Reveal variants={slideInFromBottom(0.3)}>
                <p className="text-sm max-w-lg leading-relaxed">
                  Execution arms deliver specialised work across security, technology, operations, and growth. Ascella Group retains governance, accountability, and oversight across all execution.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="relative h-full w-full border-r border-white/10 overflow-hidden">
            <img
              src={imageSrc}
              alt="Execution Layer Illustration"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </div>
          
          <div className="bg-black"></div>

          <div className="border-t border-r border-white/10"></div>
          <div className="col-span-1 border-t border-r border-white/10 flex">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="flex-1 flex items-center justify-center border-r border-white/10 last:border-r-0 hover:bg-white/5 cursor-pointer transition-colors group"
              >
                <h5 className="text-[9px] lg:text-[10px] tracking-[0.15em] lg:tracking-[0.2em] uppercase group-hover:text-white">{cat}</h5>
              </div>
            ))}
          </div>

          <div className="border-t border-r border-white/10 grid grid-cols-3 h-full">
            <div className="flex flex-col justify-center px-2 lg:px-4 border-r border-white/10">
              <span className="text-lg xl:text-xl text-gray-300">5</span>
              <span className="text-[8px] lg:text-[8px] uppercase mt-1">Execution Arms</span>
            </div>
            <div className="flex flex-col justify-center px-2 lg:px-4 border-r border-white/10">
              <span className="text-lg xl:text-xl text-gray-300 ">Single</span>
              <span className="text-[8px] lg:text-[8px] uppercase mt-1">Operating Ownership</span>
            </div>
            <div className="flex flex-col justify-center px-2 lg:px-2">
              <span className="text-gray-300 xl:text-xl">Continuous</span>
              <span className="text-[8px] lg:text-[9px] uppercase mt-1 leading-tight">Oversight & Accountability</span>
            </div>
          </div>
          <div className="border-t border-white/10"></div>
          <div className="col-span-4 border-t border-white/10"></div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionLayer;