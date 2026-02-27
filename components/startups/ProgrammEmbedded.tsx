'use client';
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

          // Always draw grid line
          ctx.strokeStyle = `rgba(255,255,255,${0.06 + current * 0.12})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();

          // Fill only on hover
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

// ── Main Component ─────────────────────────────────────────────────────────────

const ProgramEmbedded = () => {
  const boxClass = "w-[442px] h-[450px] border-r border-b border-[#3D3D3D] p-10 flex flex-col justify-end relative bg-black";

  const shapes = [
    { t: 0, l: 0, o: 0.6 },
    { t: -37, l: -64, o: 0.2 },
    { t: -37, l: 64, o: 0.2 },
    { t: 37, l: -64, o: 0.2 },
    { t: 37, l: 64, o: 0.2 },
    { t: -74, l: 0, o: 0.1 },
    { t: 74, l: 0, o: 0.1 },
    { t: 0, l: -128, o: 0.1 },
    { t: 0, l: 128, o: 0.1 },
    { t: -74, l: -128, o: 0.05 },
    { t: -74, l: 128, o: 0.05 },
    { t: 74, l: -128, o: 0.05 },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center">

      {/* Top horizontal line - Edge to Edge */}
      <div className="w-full border-t border-[#3D3D3D]" />

      {/* Main Container */}
      <div className="w-[1325px] border-l border-[#3D3D3D] relative z-10">

        {/* --- TOP ROW (Hero Section) --- */}
        <div className="relative w-full h-[450px] border-b border-r border-[#3D3D3D] flex flex-col justify-end p-12 overflow-hidden">

          {/* --- ISOMETRIC HOVER GRID + vector images cell-fitted --- */}
          <div
            className="absolute"
            style={{
              top: 0,
              bottom: 0,
              left: 0,
              right: '30%',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 42% 48%, black 5%, transparent 75%)',
              maskImage:       'radial-gradient(ellipse 85% 80% at 42% 48%, black 5%, transparent 75%)',
              pointerEvents:   'auto',
            }}
          >
            {/* Hover canvas — draws grid lines + per-cell highlight */}
            <IsometricHoverGrid />

            {/*
              Grid math: CELL_W=100, CELL_H=60, offsetX=-50, offsetY=-30
              cellCenter(col, row):
                x = -50 + col*100 + (row%2===0 ? 0 : 50)
                y = -30 + row*30

              Cell A: col=2, row=4  → x=-50+200+0=150,  y=-30+120=90   → center(150,90)
              Cell B: col=4, row=4  → x=-50+400+0=350,  y=-30+120=90   → center(350,90)

              Image must be exactly CELL_W × CELL_H = 100×60, anchored at center via transform
            */}

            {/* Vector cell A — fits exactly in one iso diamond */}
            <img
              src="/vector 55.png"
              alt=""
              style={{
                position:      'absolute',
                left:          '150px',
                top:           '90px',
                width:         '100px',
                height:        '60px',
                transform:     'translate(-50%, -50%)',
                objectFit:     'fill',
                opacity:       0.5,
                pointerEvents: 'none',
                mixBlendMode:  'screen',
              }}
            />

            {/* Vector cell B — fits exactly in adjacent iso diamond */}
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
                opacity:       10,
                pointerEvents: 'none',
                mixBlendMode:  'screen',
              }}
            />
          </div>

          {/* Top-right image panel */}
          <div className="absolute top-0 right-0 w-[300px] h-[200px] border-l border-b border-[#3D3D3D] z-20 pointer-events-none">
            <img
              src="/Rectangle 9440.png"
              alt="Grid Visual"
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          {/* Hero text — z-30 so it's always above canvas */}
          <div className="max-w-2xl mb-4 relative z-30">
            <h3 className="text-[36px] leading-[1.1] tracking-tight">
              The Startups Programme embeds
              <span className="block text-white/40">
                operating structure, governance, and accountability before scale begins.
              </span>
            </h3>
          </div>
        </div>

        {/* --- BOTTOM ROW (3 BOXES) --- */}
        <div className="flex w-full">

          {/* Box 1 */}
          <div className={boxClass}>
            <div className="absolute top-10 left-10">
              <img src="/Group 1665 (2).svg" alt="icon" className="w-6 h-6" />
            </div>

            <div className="space-y-5">
              <h5 className="text-[20px] font-light leading-tight">
                Why operating structure is introduced early
              </h5>
              <div className="text-[12px] text-white/40 space-y-4 leading-relaxed max-w-[320px]">
                <p>Most early-stage companies prioritise product, growth, and funding.</p>
                <p>Operating structure — governance, accountability, and execution control — is often deferred until complexity forces reactive changes.</p>
                <p>Introducing structure early prevents execution debt.</p>
              </div>
            </div>
          </div>

          {/* Box 2 (Image Box) */}
          <div className={boxClass}>
            <img
              src="/Rectangle 9444.png"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              alt="Execution structure"
            />
            <div className="relative z-10">
              <p className="text-[16px] font-light border-l border-white/40 pl-4">
                Early structure prevents <br /> later execution debt.
              </p>
            </div>
          </div>

          {/* Box 3 */}
          <div className={boxClass}>
            <div className="absolute top-10 left-10">
              <img src="/Group 1670.svg" alt="icon" className="w-6 h-6" />
            </div>

            <div className="space-y-6">
              <h3 className="text-[22px] font-light leading-tight">
                How the programme supports controlled scale
              </h3>
              <div className="text-[13px] text-white/40 space-y-4 leading-relaxed max-w-[320px]">
                <p>The Startups Programme introduces governance models and execution discipline from the beginning.</p>
                <p>This ensures teams and systems remain aligned as the organisation grows.</p>
                <p>Scale becomes deliberate, not improvised.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom horizontal line - Edge to Edge */}
      <div className="w-full border-t border-[#3D3D3D]" />

    </section>
  );
};

export default ProgramEmbedded;