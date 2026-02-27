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

      // Dot grid config — 15 dots across, 15 dots tall per cell
      const DOTS_X = 15;
      const DOTS_Y = 15;
      const DOT_R  = 0.6; // dot radius px

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const { x: cx, y: cy } = cellCenter(col, row, offsetX, offsetY);
          const key = `${col},${row}`;

          const hovered = inDiamond(mx, my, cx, cy);
          const target  = hovered ? 1 : 0;
          const current = (alphaMap.get(key) ?? 0) + (target - (alphaMap.get(key) ?? 0)) * 0.1;
          alphaMap.set(key, current);

          // Clip to diamond shape so dots don't spill outside
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(cx,              cy - CELL_H / 2);
          ctx.lineTo(cx + CELL_W / 2, cy);
          ctx.lineTo(cx,              cy + CELL_H / 2);
          ctx.lineTo(cx - CELL_W / 2, cy);
          ctx.closePath();
          ctx.clip();

          // Draw 15×15 dots inside the diamond bounding box
          for (let dy = 0; dy < DOTS_Y; dy++) {
            for (let dx = 0; dx < DOTS_X; dx++) {
              // Map dot to bounding box of diamond
              const px = cx - CELL_W / 2 + (dx + 0.5) * (CELL_W / DOTS_X);
              const py = cy - CELL_H / 2 + (dy + 0.5) * (CELL_H / DOTS_Y);

              // Only draw if inside diamond
              if (!inDiamond(px, py, cx, cy)) continue;

              // Distance from center for fade effect
              const fdx = (px - cx) / (CELL_W / 2);
              const fdy = (py - cy) / (CELL_H / 2);
              const fade = Math.max(0, 1 - (Math.abs(fdx) + Math.abs(fdy)));

              // Base yellow faded; brighter on hover
              const baseAlpha  = fade * 0.18;
              const hoverExtra = current * fade * 0.45;
              const alpha      = baseAlpha + hoverExtra;

              if (alpha < 0.01) continue;

              // Yellow: rgb(234, 197, 52) — faded
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
          <h3 className="text-[36px] md:text-[40px] leading-[1.1] tracking-tight">
            Alignment is the first step toward structured execution readiness.
          </h3>
          <p className="text-white/60 md:text-mid max-w-[500px] mx-auto leading-relaxed">
            The Startups Programme begins with an alignment conversation focused on
            operating context, accountability expectations, and readiness for governed execution.
          </p>
        </header>
      </div>

      {/*
        ── ISOMETRIC GRID STRIP ──
        Width matches the form box (720px), height ~160px
        Grid confined inside, faded on left/right/top/bottom edges
        vector 55.png placed at exact cell centers (CELL_W=100, CELL_H=60)

        Cell center formula:
          offsetX = -CELL_W/2 = -50
          offsetY = -CELL_H/2 = -30
          x = -50 + col*100 + (row%2===0 ? 0 : 50)
          y = -30 + row*30

        Canvas is 720px wide, 160px tall.
        Center x of canvas = 360.

        Row 2 (y = -30 + 2*30 = 30):  even row, no offset
          col=3 → x = -50 + 300 = 250   center(250, 30)  — too high
        Row 4 (y = -30 + 4*30 = 90):  even row
          col=2 → x = -50 + 200 = 150   center(150, 90)
          col=3 → x = -50 + 300 = 250   center(250, 90)
          col=4 → x = -50 + 400 = 350   center(350, 90)  ← place vector here (center of canvas ~360)

        We place one vector at center: col=3 row=4 → (250, 90)
        And one at col=4 row=4 → (350, 90)
      */}
      <div
        className="relative my-[-20px]"
        style={{
          width:  '720px',
          height: '160px',
          // Fade: left/right edges and top/bottom edges
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
        {/* Hover canvas — draws full iso grid */}
        <IsometricHoverGrid />

        {/* vector 55.png — exactly 100×60px, centered on cell col=3,row=4 → (250,90) */}
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

        {/* vector 55.png — exactly 100×60px, centered on cell col=4,row=4 → (350,90) */}
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
      </div>

      {/* --- FORM CONTAINER BOX --- */}
      <div
        className="w-full max-w-[720px] min-h-[720px] border border-[#3D3D3D] rounded-[12px] bg-[#000]/90 backdrop-blur-md flex flex-col items-center px-8 md:px-[100px] z-20 relative"
        style={{ paddingTop: '60px' }}
      >

        {/* Top Icon */}
        <div className="mb-10 flex justify-center">
          <img src="/image-1.png" alt="Icon" className="w-24 h-24 object-contain" />
        </div>

        {/* Form Content */}
        <div className="w-full flex flex-col gap-5 text-center">
          <div className="flex flex-col gap-3">
            <h3 className="text-3xl font-normal tracking-tight text-white/90">Let's Get You Started</h3>
            <p className="text-white/40 text-sm max-w-[400px] mx-auto">
              Fill out the form below and we'll get in touch to explore how Ascella can help power your success
            </p>
          </div>

          <form className="flex flex-col gap-4 text-left" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-[#0A0A0A] border border-[#262626] p-4 rounded-md text-sm outline-none focus:border-white/40 transition-colors"
            />
            <input
              type="text"
              placeholder="Your Role / Title *"
              required
              className="w-full bg-[#0A0A0A] border border-[#262626] p-4 rounded-md text-sm outline-none focus:border-white/40 transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              required
              className="w-full bg-[#0A0A0A] border border-[#262626] p-4 rounded-md text-sm outline-none focus:border-white/40 transition-colors"
            />
            <input
              type="email"
              placeholder="Email Address *"
              required
              className="w-full bg-[#0A0A0A] border border-[#262626] p-4 rounded-md text-sm outline-none focus:border-white/40 transition-colors"
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

      <div className="w-full border-t border-white/20" />
    </div>
  );
};

export default Alignments;