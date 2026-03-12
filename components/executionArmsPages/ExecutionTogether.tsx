"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';

// ── Isometric Grid with Per-Cell Hover (UPDATED VISIBILITY & IMAGES) ──────────────────────
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
  // List specific {col, row} coordinates for the 3 target boxes.
  // Coordinates are based on the cellCenter indexing.
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
        // Optional: Re-trigger render loop once loaded, but RAF handles it
      };
    }

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

      // Ensure vector55 image is loaded before attempting to draw
      const vectorImage = vector55Ref.current;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const { x: cx, y: cy } = cellCenter(col, row, offsetX, offsetY);
          const key = `${col},${row}`;

          const hovered = inDiamond(mx, my, cx, cy);
          const target  = hovered ? 1 : 0;
          const current = (alphaMap.get(key) ?? 0) + (target - (alphaMap.get(key) ?? 0)) * 0.1;
          alphaMap.set(key, current);

          // Path for the dynamic diamond mesh
          ctx.beginPath();
          ctx.moveTo(cx,              cy - CELL_H / 2);
          ctx.lineTo(cx + CELL_W / 2, cy);
          ctx.lineTo(cx,              cy + CELL_H / 2);
          ctx.lineTo(cx - CELL_W / 2, cy);
          ctx.closePath();

          // VISIBILITY UPDATE: Increase grid line opacity and visibility
          // Preserve image_2 style logic, but boost the values to feel like a BG
          // Light grey base line
          const baseLineAlpha = 0.2; // Significant visibility boost
          const hoverBoostAlpha = 0.3; // Lighten further on hover
          ctx.strokeStyle = `rgba(180, 180, 180, ${baseLineAlpha + current * hoverBoostAlpha})`;
          ctx.lineWidth   = LINE_WIDTH;
          ctx.stroke();

          // VECTOR55.PNG DRAW LOGIC:
          // Check if this specific cell coordinate matches one of the 3 requested spots.
          if (vectorImage) {
            const shouldDrawVector = vectorImagesConfig.some(
              (config) => config.col === col && config.row === row
            );

            if (shouldDrawVector) {
              // Draw the image *within* the isometric bounding box of the cell.
              // Cell bounds are:
              // Left: cx - CELL_W/2, Top: cy - CELL_H/2, Width: CELL_W, Height: CELL_H
              // We need to translate the context because drawImage needs a normal rect
              ctx.save();
              ctx.translate(cx - CELL_W / 2, cy - CELL_H / 2);
              
              // drawImage(image, x, y, width, height)
              // Width/height will stretch to fit the cell box perfectly.
              // Note: The image itself might not be isometric, so it will be stretched/skewed
              // to fill this normal bounding rect. For a truly isometric fit, the vector55.png
              // itself should be drawn on an isometric canvas or pre-sheared.
              // This stretches it to the boundaries.
              ctx.drawImage(vectorImage, 0, 0, CELL_W, CELL_H);
              
              ctx.restore();
            }
          }

          // Preserve fill on hover
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

// ── Responsive hook (NO CHANGE) ────────────────────────────────────────────────────────────
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

// ── Config per breakpoint (NO CHANGE) ──────────────────────────────────────────────────────
const CONFIG = {
  mobile:  { cardW: 90,  cardH: 116, leftStep: 72,  topStep: 8,  gridTop: 108, gridBottom: -40,  liftY: -30, scale: 1.05 },
  tablet:  { cardW: 160, cardH: 206, leftStep: 128, topStep: 12, gridTop: 196, gridBottom: -80,  liftY: -50, scale: 1.05 },
  desktop: { cardW: 200, cardH: 256, leftStep: 160, topStep: 15, gridTop: 260, gridBottom: -120, liftY: -60, scale: 1.05 },
};

// ── Main Component ─────────────────────────────────────────────────────────────
const ExecutionTogether = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { bp, screenW } = useBreakpoint();
  const isMobile = bp === 'mobile';

  // Mobile computation (NO CHANGE)
  const mobileCfg = (() => {
    const totalCards = 5;
    const pagePadding = 40;
    const available = Math.max(screenW - pagePadding, 200);
    const cardW = Math.floor(available / 4.12);
    const leftStep = Math.floor(cardW * 0.78);
    const cardH = Math.round(cardW * 1.28);
    const gridTop = Math.round(cardH * 0.93);
    return { cardW, cardH, leftStep, topStep: 8, gridTop, gridBottom: -40, liftY: -28, scale: 1.04 };
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
  const containerH = cfg.cardH + cfg.topStep * (totalCards - 1) + (isMobile ? 60 : 100);

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col items-center relative overflow-hidden"
      style={{
        fontFamily: 'sans-serif',
        paddingTop: isMobile ? 36 : 48,
        paddingBottom: 48,
        paddingLeft: isMobile ? 20 : 32,
        paddingRight: isMobile ? 20 : 32,
      }}
    >
      {/* ── Header (NO CHANGE) ────────────────────────────────────────────────────────── */}
      <div
        className="text-center z-50"
        style={{ maxWidth: isMobile ? '100%' : 900, marginBottom: isMobile ? 24 : 48 }}
      >
        <div
          className="flex items-center justify-center gap-2 text-white uppercase"
          style={{ fontSize: 10, letterSpacing: '0.3em', marginBottom: isMobile ? 20 : 32 }}
        >
          <Plus size={isMobile ? 14 : 18} strokeWidth={1.5} />
          How Execution Arms Work Together
        </div>

        <h3
          className="font-light tracking-tight"
          style={{
            fontSize: isMobile ? 20 : bp === 'tablet' ? 28 : 36,
            lineHeight: 1.1,
            marginBottom: isMobile ? 16 : 24,
          }}
        >
          Ascella Group sits above execution.{' '}
          {!isMobile && <br />}
          Execution arms deliver specialised work{' '}
          {!isMobile && <br />}
          within <span className="text-gray-400">Ascella's operating structure.</span>
        </h3>

        <p
          className="text-white leading-relaxed mx-auto"
          style={{ fontSize: isMobile ? 12 : 14, maxWidth: isMobile ? 300 : 420 }}
        >
          Governance, accountability, and performance oversight remain central ensuring coordinated execution without fragmented ownership.
        </p>
      </div>

      {/* ── Ascella badge (NO CHANGE) ─────────────────────────────────────────────────── */}
      <div
        className="bg-[#111] rounded border border-gray-400 text-white uppercase z-50"
        style={{
          padding: isMobile ? '7px 20px' : '10px 32px',
          fontSize: 11,
          letterSpacing: '0.4em',
          marginBottom: isMobile ? 24 : 40,
        }}
      >
        Ascella
      </div>

      {/* ── Cards area (Layout preserved, structure preserved) ────────────────────── */}
      <div
        className="relative flex justify-center items-start w-full"
        style={{ height: containerH + (isMobile ? 40 : 80) }}
      >
        <div className="relative" style={{ width: containerW, height: containerH }}>
          
          {/* SVG grid removed - now all dynamic lines handled by canvas */}

          {/* Canvas Hover Area - Preserve existing size/position, geometry preserved, visibility & image insertion updated */}
          <div
            style={{
              position: 'absolute',
              top: cfg.gridTop,
              bottom: cfg.gridBottom,
              left: 0, right: 0,
              zIndex: 1,
              // Fading mask preserved
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

          {/* Cards (NO CHANGE) */}
          {executionArms.map((arm, index) => {
            const isExpanded = activeId === arm.id;
            const topPx  = (totalCards - 1 - index) * cfg.topStep;
            const leftPx = index * cfg.leftStep;
            const zBase  = totalCards - index;

            return (
              <div
                key={arm.id}
                onMouseEnter={() => !isMobile && setActiveId(arm.id)}
                onMouseLeave={() => !isMobile && setActiveId(null)}
                onClick={() => isMobile && setActiveId(prev => prev === arm.id ? null : arm.id)}
                className="absolute transition-all ease-out"
                style={{
                  width: cfg.cardW,
                  height: cfg.cardH,
                  top: topPx,
                  left: leftPx,
                  zIndex: isExpanded ? 100 : zBase,
                  transform: isExpanded ? `translateY(${cfg.liftY}px) scale(${cfg.scale})` : 'none',
                  transitionDuration: '500ms',
                  cursor: isMobile ? 'pointer' : 'default',
                }}
              >
                <div className="relative w-full h-full">
                  {/* Card shape and color preserved */}
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

                  {/* Content (NO CHANGE) */}
                  <div
                    className={`relative z-10 w-full h-full flex flex-col transition-colors duration-500 ${isExpanded ? 'text-black' : 'text-white'}`}
                    style={{ padding: isMobile ? '12px' : '24px' }}
                  >
                    {/* ID */}
                    <span
                      className="font-mono transition-all duration-500"
                      style={{
                        fontSize: isMobile ? 9 : 12,
                        letterSpacing: '0.15em',
                        color: isExpanded ? '#6b7280' : '#374151',
                        position: isExpanded ? 'static' : 'absolute',
                        top: isMobile ? 20 : 40,
                        left: isMobile ? 16 : 32,
                        transform: isExpanded ? 'none' : 'skewY(-15deg)',
                      }}
                    >
                      {arm.id}
                    </span>

                    {/* Icon */}
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
                        width: isExpanded ? (isMobile ? 24 : 40) : (isMobile ? 36 : 56),
                        height: isExpanded ? (isMobile ? 24 : 40) : (isMobile ? 36 : 56),
                        flexShrink: 0,
                        ...(isExpanded
                          ? { marginLeft: 'auto' }
                          : { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
                        ),
                      }}
                    />

                    {/* Text */}
                    {isExpanded ? (
                      <div className="mt-auto">
                        <p
                          className="leading-snug font-medium text-gray-800"
                          style={{ fontSize: isMobile ? 10 : 13, marginBottom: isMobile ? 12 : 32 }}
                        >
                          {arm.desc}
                        </p>
                        <h4
                          className="font-semibold text-right tracking-tight"
                          style={{ fontSize: isMobile ? 13 : 20 }}
                        >
                          {arm.name}
                        </h4>
                      </div>
                    ) : (
                      <span
                        className="uppercase text-gray-500 text-right leading-tight"
                        style={{
                          position: 'absolute',
                          bottom: isMobile ? 20 : 56,
                          right: isMobile ? 10 : 32,
                          fontSize: isMobile ? 8 : 11,
                          letterSpacing: '0.2em',
                          maxWidth: isMobile ? 60 : 100,
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

      {/* ── Footer (NO CHANGE) ────────────────────────────────────────────────────────── */}
      <div
        className="w-full"
        style={{
          maxWidth: 1280,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-end' : 'flex-end',
          gap: isMobile ? 0: 0,
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <h5
          className="text-gray-300 leading-relaxed"
          style={{ fontSize: 12, letterSpacing: '0.03em', maxWidth: 200, alignSelf: isMobile ? 'flex-start' : 'auto' }}
        >
          Governance is designed <br />in, not enforced later.
        </h5>

        <div
          className="bg-[#D1D1D1] text-black rounded-sm flex items-center shadow-2xl"
          style={{
            gap: isMobile ? 14 : 14,
            padding: isMobile ? '14px 16px' : '20px 24px',
            width: isMobile ? 'auto' : 'auto',
            maxWidth: isMobile ? '80%' : 400,
            alignSelf: isMobile ? 'flex-end' : 'auto',
          }}
        >
          {/* SVG logo preserved */}
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
            <h4 className="font-bold leading-tight tracking-tight" style={{ fontSize: isMobile ? 15 : 18 }}>
              Ascella Group
            </h4>
            <p className="text-gray-800 text-b3 text-[12px]" style={{ fontSize: isMobile ? 12 : 14 }}>
              Coordinated execution without  loss of control.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-gray-400/60 z-10" style={{ height: 1 }} />
    </div>
  );
};

export default ExecutionTogether;