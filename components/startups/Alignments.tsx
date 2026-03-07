"use client"
import React, { useEffect, useRef } from 'react';

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

      const DOTS_X = 15;
      const DOTS_Y = 15;
      const DOT_R  = 0.6;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const { x: cx, y: cy } = cellCenter(col, row, offsetX, offsetY);
          const key = `${col},${row}`;

          const hovered = inDiamond(mx, my, cx, cy);
          const target  = hovered ? 1 : 0;
          const current = (alphaMap.get(key) ?? 0) + (target - (alphaMap.get(key) ?? 0)) * 0.1;
          alphaMap.set(key, current);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(cx,              cy - CELL_H / 2);
          ctx.lineTo(cx + CELL_W / 2, cy);
          ctx.lineTo(cx,              cy + CELL_H / 2);
          ctx.lineTo(cx - CELL_W / 2, cy);
          ctx.closePath();
          ctx.clip();

          for (let dy = 0; dy < DOTS_Y; dy++) {
            for (let dx = 0; dx < DOTS_X; dx++) {
              const px = cx - CELL_W / 2 + (dx + 0.5) * (CELL_W / DOTS_X);
              const py = cy - CELL_H / 2 + (dy + 0.5) * (CELL_H / DOTS_Y);

              if (!inDiamond(px, py, cx, cy)) continue;

              const fdx = (px - cx) / (CELL_W / 2);
              const fdy = (py - cy) / (CELL_H / 2);
              const fade = Math.max(0, 1 - (Math.abs(fdx) + Math.abs(fdy)));

              const baseAlpha  = fade * 0.55;
              const hoverExtra = current * fade * 0.45;
              const alpha      = baseAlpha + hoverExtra;

              if (alpha < 0.01) continue;

              ctx.beginPath();
              ctx.arc(px, py, DOT_R + current * 0.4, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(234,197,52,${Math.min(1, alpha)})`;
              ctx.fill();
            }
          }

          ctx.restore();
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

// ── Main Component ─────────────────────────────────────────────────────────────
const Alignments = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center py-10 font-sans overflow-hidden relative">

      {/* Header Section */}
      <div className="flex flex-col items-center w-full max-w-[720px] text-center px-4 z-10 relative">
        <header className="flex flex-col gap-6">
          <h3 className="text-[28px] md:text-[36px] lg:text-[40px] leading-[1.1] tracking-tight">
            Alignment is the first step toward structured execution readiness.
          </h3>
          <p className="text-white/60 text-sm md:text-base max-w-[500px] mx-auto leading-relaxed">
            The Startups Programme begins with an alignment conversation focused on
            operating context, accountability expectations, and readiness for governed execution.
          </p>
        </header>
      </div>

      {/*
        ── ISOMETRIC GRID STRIP ──
        Desktop: 720px wide, 160px tall — same as before
        Mobile: full width, 140px tall — vectors placed at proportional positions
      */}

      {/* Desktop grid (md and above) */}
      <div
        className="relative my-[-20px] hidden md:block"
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
        <IsometricHoverGrid />

        {/* vector at col=3, row=4 → (250, 90) */}
        <img
          src="/vector 55.png"
          alt=""
          style={{
            position:      'absolute',
            left:          '250px',
            top:           '90px',
            width:         '100px',
            height:        '60px',
            transform:     'translate(-50%, -50%)',
            objectFit:     'fill',
            opacity:       0.55,
            pointerEvents: 'none',
            mixBlendMode:  'screen',
          }}
        />

        {/* vector at col=4, row=4 → (350, 90) */}
        <img
          src="/vector 55.png"
          alt=""
          style={{
            position:      'absolute',
            left:          '350px',
            top:           '90px',
            width:         '100px',
            height:        '60px',
            transform:     'translate(-50%, -50%)',
            objectFit:     'fill',
            opacity:       0.75,
            pointerEvents: 'none',
            mixBlendMode:  'screen',
          }}
        />

        {/* vector at col=5, row=4 → (450, 90) — extra cell for desktop */}
        <img
          src="/vector 55.png"
          alt=""
          style={{
            position:      'absolute',
            left:          '450px',
            top:           '90px',
            width:         '100px',
            height:        '60px',
            transform:     'translate(-50%, -50%)',
            objectFit:     'fill',
            opacity:       0.4,
            pointerEvents: 'none',
            mixBlendMode:  'screen',
          }}
        />
      </div>

      {/* Mobile grid (below md) */}
      {/*
        On mobile canvas is full width (let's call it W px).
        CELL_W=100, CELL_H=60, offsetX=-50, offsetY=-30
        We place vectors at row=3 (y = -30+3*30 = 60), odd row so +50 offset:
          col=1 → x = -50 + 100 + 50 = 100  → center(100, 60)
          col=2 → x = -50 + 200 + 50 = 200  → center(200, 60)
          col=3 → x = -50 + 300 + 50 = 300  → center(300, 60)
        Canvas height = 140px, center y = 70 → row=3 y=60 is close to center, good.
      */}
      <div
        className="relative my-[-20px] block md:hidden w-full"
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
        <IsometricHoverGrid />

        {/* Mobile: 3 vectors on odd row=3 (y=60) — centered roughly around mid-screen */}
        {/* col=1 odd → x=100 */}
        <img
          src="/vector 55.png"
          alt=""
          style={{
            position:      'absolute',
            left:          '100px',
            top:           '60px',
            width:         '100px',
            height:        '60px',
            transform:     'translate(-50%, -50%)',
            objectFit:     'fill',
            opacity:       0.45,
            pointerEvents: 'none',
            mixBlendMode:  'screen',
          }}
        />
        {/* col=2 odd → x=200 */}
        <img
          src="/vector 55.png"
          alt=""
          style={{
            position:      'absolute',
            left:          '200px',
            top:           '60px',
            width:         '100px',
            height:        '60px',
            transform:     'translate(-50%, -50%)',
            objectFit:     'fill',
            opacity:       0.75,
            pointerEvents: 'none',
            mixBlendMode:  'screen',
          }}
        />
        {/* col=3 odd → x=300 */}
        <img
          src="/vector 55.png"
          alt=""
          style={{
            position:      'absolute',
            left:          '300px',
            top:           '60px',
            width:         '100px',
            height:        '60px',
            transform:     'translate(-50%, -50%)',
            objectFit:     'fill',
            opacity:       0.45,
            pointerEvents: 'none',
            mixBlendMode:  'screen',
          }}
        />
      </div>

      {/* --- FORM CONTAINER BOX --- */}
      {/*
        Desktop: max-w-[720px], centered, no horizontal margin
        Mobile: mx-[10px] so 10px gap on left and right
        Box bottom: 10px margin from grid line (mb-[10px] on grid, or mt-[10px] on box)
      */}
      <div
        className="
          w-full
          mx-[10px] md:mx-auto
          max-w-[calc(100%-20px)] md:max-w-[720px]
          min-h-[720px]
          border border-[#3D3D3D] rounded-[12px]
          bg-[#000]/90 backdrop-blur-md
          flex flex-col items-center
          px-5 md:px-[100px]
          z-20 relative
          mt-[10px]
        "
        style={{ paddingTop: '60px', paddingBottom: '60px' }}
      >

        {/* Top Icon */}
        <div className="mb-10 flex justify-center">
          <img src="/image-1.png" alt="Icon" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
        </div>

        {/* Form Content */}
        <div className="w-full flex flex-col gap-5 text-center">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-white/90">
              Let's Get You Started
            </h3>
            <p className="text-white/40 text-sm max-w-[400px] mx-auto leading-relaxed">
              Fill out the form below and we'll get in touch to explore how Ascella can help power your success
            </p>
          </div>

          <form className="flex flex-col gap-4 text-left" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-[#0A0A0A] border border-[#262626] p-4 rounded-md text-sm outline-none focus:border-white/40 transition-colors text-white placeholder-white/30"
            />
            <input
              type="text"
              placeholder="Your Role / Title *"
              required
              className="w-full bg-[#0A0A0A] border border-[#262626] p-4 rounded-md text-sm outline-none focus:border-white/40 transition-colors text-white placeholder-white/30"
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              required
              className="w-full bg-[#0A0A0A] border border-[#262626] p-4 rounded-md text-sm outline-none focus:border-white/40 transition-colors text-white placeholder-white/30"
            />
            <input
              type="email"
              placeholder="Email Address *"
              required
              className="w-full bg-[#0A0A0A] border border-[#262626] p-4 rounded-md text-sm outline-none focus:border-white/40 transition-colors text-white placeholder-white/30"
            />

            <button
              type="submit"
              className="mt-6 w-full bg-white text-black font-semibold py-4 rounded-md hover:bg-gray-200 transition-all active:scale-[0.98] text-base"
            >
              Next
            </button>
          </form>
        </div>
      </div>

      {/* Bottom divider — 10px margin from box bottom */}
      <div className="w-full border-t border-white/20 mt-[10px]" />
    </div>
  );
};

export default Alignments;