'use client';

import React, { useEffect, useRef } from 'react';

const categories = ['Infosec', 'Software Labs', 'Engage', 'Forge', 'Staffing'];

const SPACING   = 3;
const THRESHOLD = 15;
const RADIUS    = 120; // Increased radius for wider "glow" influence
const LERP      = 0.15; // Slightly faster reaction

type Particle = {
  x: number;
  y: number;
  baseAlpha: number;
  currentAlpha: number;
  size: number;
  vx: number; // velocity for bubbling effect
  vy: number;
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

// ── Particle Image Panel ──────────────────────────────────────────────────────
function ParticleImagePanel({ imageSrc = '/Rectangle 5046.svg' }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const imgElRef     = useRef<HTMLImageElement>(null);
  const scanRef      = useRef<{ x: number; y: number; rowH: number }>({ x: 0, y: 0, rowH: 120 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef       = useRef<number | null>(null);
  
  // Speed increased to cover full area faster (~5 seconds for typical heights)
  const SCAN_SPEED   = 2.8; 

  const buildParticles = () => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    const imgEl     = imgElRef.current;
    if (!canvas || !container) return;

    const W = container.offsetWidth  || 300;
    const H = container.offsetHeight || 440;
    canvas.width  = W;
    canvas.height = H;

    let builtFromImage = false;

    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      const off    = document.createElement('canvas');
      off.width    = W;
      off.height   = H;
      const offCtx = off.getContext('2d');
      if (offCtx) {
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
                    baseAlpha: 0, 
                    currentAlpha: 0, 
                    size: Math.random() * 0.8 + 0.4,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2
                });
              }
            }
          }
          if (pts.length > 0) {
            particlesRef.current = pts;
            builtFromImage = true;
          }
        } catch { /* Fallback used below */ }
      }
    }

    if (!builtFromImage) {
      const pts: Particle[] = [];
      const GAP = SPACING * 2;
      const cx  = W / 2;
      const cy  = H / 2;
      for (let y = 20; y < H - 20; y += GAP) {
        for (let x = 20; x < W - 20; x += GAP) {
          const dx  = (x - cx) / (W * 0.38);
          const dy  = (y - cy) / (H * 0.44);
          const r   = Math.sqrt(dx * dx + dy * dy);
          const band1 = Math.abs(Math.abs(dx) - Math.abs(dy)) < 0.18 && r < 0.95;
          const band2 = r < 0.85 && Math.abs(dx) < 0.55 && Math.abs(dy) < 0.55;
          if (band1 || band2) {
            pts.push({ 
                x, y, 
                baseAlpha: 0, 
                currentAlpha: 0, 
                size: Math.random() * 0.9 + 0.3,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            });
          }
        }
      }
      particlesRef.current = pts;
    }

    const rowH = H / 4;
    scanRef.current = { x: 0, y: rowH / 2, rowH };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scan = scanRef.current;
      scan.x += SCAN_SPEED;
      
      // Wrap logic: when scan reaches right, jump to next vertical segment
      if (scan.x > canvas.width + RADIUS) {
        scan.x = -RADIUS;
        scan.y += scan.rowH;
        if (scan.y > canvas.height) scan.y = scan.rowH / 2;
      }

      for (const p of particlesRef.current) {
        const dx   = p.x - scan.x;
        const dy   = p.y - scan.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Intensity of the "light" hitting the particle
        const t    = Math.max(0, 1 - dist / RADIUS);
        const ease = t * t * (3 - 2 * t);

        p.currentAlpha += (ease - p.currentAlpha) * LERP;

        if (p.currentAlpha < 0.005) continue;

        // "Bubble Out" effect logic
        // We displace the render position based on the brightness (ease)
        const bubbleShift = ease * 12; // How far they "pop" out
        const scatterSize = p.size * (1 + ease * 7); // Size increases significantly when lit

        // 1. Draw Glow/Scatter Layer
        if (ease > 0.03) {
          ctx.beginPath();
          ctx.arc(p.x + (p.vx * bubbleShift), p.y + (p.vy * bubbleShift), scatterSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${p.currentAlpha * 0.35})`; // Brighter scatter
          ctx.fill();
        }

        // 2. Draw Core Particle Layer
        ctx.beginPath();
        ctx.arc(p.x + (p.vx * bubbleShift * 0.5), p.y + (p.vy * bubbleShift * 0.5), p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, p.currentAlpha * 1.5)})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    const t1 = setTimeout(() => buildParticles(), 50);
    const t2 = setTimeout(() => buildParticles(), 300);

    const ro = new ResizeObserver(() => buildParticles());
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
    >
      <img
        ref={imgElRef}
        src={imageSrc}
        alt=""
        crossOrigin="anonymous"
        onLoad={buildParticles}
        style={{
          position:     'absolute',
          inset:        0,
          width:        '100%',
          height:       '100%',
          objectFit:    'cover',
          opacity:      1,
          pointerEvents:'none',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position:     'absolute',
          inset:        0,
          width:        '100%',
          height:       '100%',
          pointerEvents:'none',
          zIndex:       10,
        }}
      />
    </div>
  );
}

// ── Desktop right panel wrapper ──────────────────────────────────────────────
function DesktopParticlePanel({ imageSrc = '/Rectangle 5046.svg' }) {
  return (
    <div style={{ position: 'relative', height: '100%', width: '100%', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
      <ParticleImagePanel imageSrc={imageSrc} />
    </div>
  );
}

// ── Main Page Component ──────────────────────────────────────────────────────
const ExecutionLayer = () => {
  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden">

      {/* MOBILE LAYOUT (< md) */}
      <div className="flex flex-col md:hidden min-h-screen">
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
            <div className="mb-5">
              <span className="relative inline-block border border-white/30 px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase text-white/60 font-medium bg-black/50">
                <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-white"></span>
                <span className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-white"></span>
                <span className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-white"></span>
                <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white"></span>
                Execution Layer
              </span>
            </div>
            <h2 className="text-[2.5rem] font-Montserrat leading-[1.05] mb-5 tracking-tight">
              Controlled execution units for{' '}
              <span className="text-neutral-500">complex operating environments</span>
            </h2>
            <p className="text-[13px] leading-relaxed text-white">
              Execution arms deliver specialised work across security, technology, operations, and growth. Ascella Group retains governance, accountability, and oversight across all execution.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-start px-4 border-b border-white/10 bg-black" style={{ flexShrink: 0 }}>
          <span className="relative px-4 py-2 text-[9px] tracking-[0.2em] uppercase text-white bg-black border border-white/30 inline-block">
            <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white/70"></span>
            <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white/70"></span>
            <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white/70"></span>
            <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white/70"></span>
            ALL EXECUTION ARMS OPERATIONAL
          </span>
        </div>

        <div className="relative w-full border-b border-white/10 bg-black" style={{ height: '500px', flexShrink: 0 }}>
          <ParticleImagePanel imageSrc="/Rectangle 5046.svg" />
        </div>

        <div className="grid grid-cols-3 border-b border-white/10" style={{ flexShrink: 0 }}>
          <div className="flex flex-col justify-center px-3 py-5 border-r border-white/10">
            <span className="text-[7px] uppercase mb-1 text-white/50 tracking-wider leading-tight">Execution Arms</span>
            <span className="text-xl font-light">05.</span>
          </div>
          <div className="flex flex-col justify-center px-3 py-5 border-r border-white/10">
            <span className="text-[7px] uppercase mb-1 text-white/50 tracking-wider leading-tight">Governance Authority</span>
            <span className="text-xl">Single.</span>
          </div>
          <div className="flex flex-col justify-center px-3 py-5">
            <span className="text-[7px] uppercase mb-1 text-white/50 tracking-wider leading-tight">Oversight &amp; Accountability</span>
            <span className="text-xl">Continuous.</span>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>

      {/* DESKTOP LAYOUT (>= md) */}
      <div className="hidden md:block">
        <div className="absolute inset-0 z-0 grid grid-cols-[80px_1.5fr_0.8fr_80px] lg:grid-cols-[100px_1.5fr_0.8fr_100px] grid-rows-[80px_1fr_100px_80px]">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/10"></div>
          ))}
        </div>

        <div className="relative z-10 grid grid-cols-[80px_1.5fr_0.8fr_80px] lg:grid-cols-[100px_1.5fr_0.8fr_100px] grid-rows-[80px_1fr_100px_80px] min-h-screen">
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
              <div className="mb-4">
                <span className="relative inline-block border bg-blur border-white/30 px-4 py-1 text-[10px] tracking-widest uppercase text-white/60 font-medium bg-black/50">
                  <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white"></span>
                  <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white"></span>
                  <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white"></span>
                  <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white"></span>
                  Execution Layer
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-Montserrat leading-[1.1] mb-4 tracking-tight max-w-3xl">
                Controlled execution <br /> units for <span className="text-neutral-500">complex <br />operating environments</span>
              </h2>
              <p className="text-sm max-w-lg leading-relaxed">
                Execution arms deliver specialised work across security, technology, operations, and growth. Ascella Group retains governance, accountability, and oversight across all execution.
              </p>
            </div>
          </div>

          <DesktopParticlePanel imageSrc="/Rectangle 5046.svg" />
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
              <span className="text-[7px] lg:text-[8px] uppercase mb-1">Execution Arms</span>
              <span className="text-lg xl:text-xl font-light">05.</span>
            </div>
            <div className="flex flex-col justify-center px-2 lg:px-4 border-r border-white/10">
              <span className="text-[7px] lg:text-[8px] uppercase mb-1">Governance Authority</span>
              <span className="text-lg xl:text-xl">Single.</span>
            </div>
            <div className="flex flex-col justify-center px-2 lg:px-4">
              <span className="text-[7px] lg:text-[8px] uppercase mb-1 leading-tight">Oversight & Accountability</span>
              <span className="text-lg xl:text-xl">Continuous.</span>
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