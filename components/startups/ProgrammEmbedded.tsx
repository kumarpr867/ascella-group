'use client';
import React, { useEffect, useRef, useState } from 'react';

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

// ── Mobile Slide Data ──────────────────────────────────────────────────────────
type TextSlide = {
  type: 'text';
  icon: string;
  title: string;
  paragraphs: string[];
};
type ImageSlide = {
  type: 'image';
  image: string;
  quote: string;
};
type MobileSlide = TextSlide | ImageSlide;

const mobileSlides: MobileSlide[] = [
  {
    type: 'text',
    icon: '/Group 1665 (2).svg',
    title: 'Why operating structure is introduced early',
    paragraphs: [
      'Most early-stage companies prioritise product, growth, and funding.',
      'Operating structure — governance, accountability, and execution control — is often deferred until complexity forces reactive changes.',
      'Introducing structure early prevents execution debt.',
    ],
  },
  {
    type: 'image',
    image: '/Rectangle 9444.png',
    quote: 'Early structure prevents later execution debt.',
  },
  {
    type: 'text',
    icon: '/Group 1670.svg',
    title: 'How the programme supports controlled scale',
    paragraphs: [
      'The Startups Programme introduces governance models and execution discipline from the beginning.',
      'This ensures teams and systems remain aligned as the organisation grows.',
      'Scale becomes deliberate, not improvised.',
    ],
  },
];

// ── Main Component ─────────────────────────────────────────────────────────────
const ProgramEmbedded = () => {
  const boxClass = "w-[450px] h-[450px] border-r border-b border-[#3D3D3D] p-15 flex flex-col justify-end relative bg-black";

  // Mobile carousel state
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideClick = () => {
    setActiveSlide((prev) => (prev + 1) % mobileSlides.length);
  };

  const currentSlide: MobileSlide = mobileSlides[activeSlide];

  return (
    <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center">

      {/* Top horizontal line - Edge to Edge */}
      <div className="w-full border-t border-[#3D3D3D]" />

      {/* ══════════════════════════════════════════════
          DESKTOP / MAC LAYOUT (hidden on mobile)
      ══════════════════════════════════════════════ */}
      <div className="hidden md:block w-[1292px] border-l border-[#3D3D3D] relative z-10">

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
            <IsometricHoverGrid />

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

          {/* Hero text */}
          <div className="max-w-2xl mb-4 relative z-30">
            <h3 className="text-[36px]  text-regular leading-[1.1] tracking-tight">
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
              <h5 className="text-[20px]  leading-tight">
                Why operating structure is introduced early
              </h5>
              <div className=" text-b3 text-[10px] text-white/40 space-y-2 max-w-[360px]">
                <p>Most early stage companies prioritise product, growth, and funding.</p>
                <p>Operating structure governance, accountability, and execution control is often deferred until complexity forces reactive changes.</p>
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
              <h5 className="text-[20px]  border-white/40 pl-7">
                Early structure prevents <br /> later execution debt.
              </h5>
            </div>
          </div>

          {/* Box 3 */}
          <div className={boxClass}>
            <div className="absolute top-10 left-10">
              <img src="/Group 1670.svg" alt="icon" className="w-6 h-6" />
            </div>
            <div className="space-y-5">
              <h5 className="text-[20px]  leading-tight">
                How the programme supports controlled scale
              </h5>
              <div className=" text-B2 text-[10px] text-white/40 space-y-4 leading-relaxed max-w-[320px]">
                <p>The Startups Programme introduces governance models and execution discipline from the beginning.</p>
                <p>This ensures teams and systems remain aligned as the organisation grows.</p>
                <p>Scale becomes deliberate, not improvised.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE LAYOUT (visible only on small screens)
      ══════════════════════════════════════════════ */}
      <div className="flex md:hidden flex-col w-full relative z-10">

        {/* ── TOP HORIZONTAL LINE (edge to edge) ── */}
        {/* already rendered above as w-full border-t */}

        {/* ── MOBILE HERO SECTION ── */}
        <div
          className="relative w-full overflow-hidden bg-black"
          style={{ minHeight: '260px' }}
        >
          {/* Isometric Grid BG — masked to center */}
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 80% 85% at 50% 55%, black 5%, transparent 80%)',
              maskImage:       'radial-gradient(ellipse 80% 85% at 50% 55%, black 5%, transparent 80%)',
              pointerEvents:   'auto',
            }}
          >
            <IsometricHoverGrid />

            {/* Vector images inside isometric grid — centered horizontally */}
            <img
              src="/vector 55.png"
              alt=""
              style={{
                position:      'absolute',
                left:          '50%',
                top:           '95px',
                width:         '100px',
                height:        '60px',
                transform:     'translate(-160px, -50%)',
                objectFit:     'fill',
                opacity:       0.3,
                pointerEvents: 'none',
                mixBlendMode:  'screen',
              }}
            />
            <img
              src="/vector 55.png"
              alt=""
              style={{
                position:      'absolute',
                left:          '50%',
                top:           '95px',
                width:         '100px',
                height:        '60px',
                transform:     'translate(-50%, -50%)',
                objectFit:     'fill',
                opacity:       0.7,
                pointerEvents: 'none',
                mixBlendMode:  'screen',
              }}
            />
            <img
              src="/vector 55.png"
              alt=""
              style={{
                position:      'absolute',
                left:          '50%',
                top:           '95px',
                width:         '100px',
                height:        '60px',
                transform:     'translate(60px, -50%)',
                objectFit:     'fill',
                opacity:       0.3,
                pointerEvents: 'none',
                mixBlendMode:  'screen',
              }}
            />
          </div>

          

          {/* Hero text — bottom of hero block */}
          <div className="relative z-30 flex flex-col justify-end h-full px-5 pb-6 pt-[150px]">
            <h3 className="text-[20px] leading-[1.2] tracking-tight font-light">
              The Startups Programme embeds
              <span className="block text-white/40">
                operating structure, governance, and accountability before scale begins.
              </span>
            </h3>
          </div>
        </div>

        {/* ── MIDDLE HORIZONTAL LINE (edge to edge) ── */}
        <div className="w-full border-t border-[#3D3D3D]" />

        {/* ── MOBILE CAROUSEL SECTION ── */}
        <div
          className="relative w-full bg-black overflow-hidden cursor-pointer select-none"
          style={{ minHeight: '340px' }}
          onClick={handleSlideClick}
          key={`slide-${activeSlide}`}
        >
          {/* Left vertical border line (inset from edge) */}
          <div
            className="absolute top-0 bottom-0 border-l border-[#3D3D3D] z-10"
            style={{ left: '20px' }}
          />
          {/* Right vertical border line (inset from edge) */}
          <div
            className="absolute top-0 bottom-0 border-r border-[#3D3D3D] z-10"
            style={{ right: '20px' }}
          />

          {/* ── IMAGE SLIDE ── */}
          {currentSlide.type === 'image' && (
            <div
              className="relative z-20 flex flex-col justify-between h-full"
              style={{ padding: '32px 36px 28px 36px', minHeight: '340px', animation: 'fadeSlide 0.35s ease' }}
            >
              {/* Image contained strictly inside the vertical border lines */}
              <div className="absolute inset-0" style={{ left: '20px', right: '20px', top: 0, bottom: 0, overflow: 'hidden' }}>
                <img
                  src={(currentSlide as ImageSlide).image}
                  alt="slide visual"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>

              {/* Content overlay at bottom, above image */}
              <div className="relative z-10 flex flex-col justify-between h-full" style={{ minHeight: '340px' }}>
                <div />
                <div>
                  <p className="text-[15px]   border-white pl-4  text-white">
                    {(currentSlide as ImageSlide).quote}
                  </p>
                </div>
                {/* Dots */}
                <div className="flex items-center gap-2 mt-6">
                  {mobileSlides.map((_, i) => (
                    <div
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setActiveSlide(i); }}
                      style={{
                        width:           i === activeSlide ? '18px' : '6px',
                        height:          '6px',
                        borderRadius:    '3px',
                        backgroundColor: i === activeSlide ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
                        transition:      'all 0.3s ease',
                        cursor:          'pointer',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TEXT SLIDE ── */}
          {currentSlide.type === 'text' && (
            <div
              className="relative z-20 flex flex-col justify-between h-full"
              style={{ padding: '32px 36px 28px 36px', minHeight: '340px', animation: 'fadeSlide 0.35s ease' }}
            >
              {/* Icon */}
              <div>
                <img
                  src={(currentSlide as TextSlide).icon}
                  alt="icon"
                  className="w-6 h-6"
                />
              </div>

              {/* Text content */}
              <div className="flex flex-col space-y-4 mt-6 flex-1">
                <h5 className="text-[17px] font-light leading-snug text-white">
                  {(currentSlide as TextSlide).title}
                </h5>
                <div className="text-[12px] text-white/40 space-y-3 leading-relaxed">
                  {(currentSlide as TextSlide).paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center  gap-2 mt-6 pt-2">
                {mobileSlides.map((_, i) => (
                  <div
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveSlide(i); }}
                    style={{
                      width:           i === activeSlide ? '18px' : '6px',
                      height:          '6px',
                      borderRadius:    '3px',
                      backgroundColor: i === activeSlide ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
                      transition:      'all 0.3s ease',
                      cursor:          'pointer',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── BOTTOM HORIZONTAL LINE (edge to edge) ── */}
        <div className="w-full border-t border-[#3D3D3D]" />

      </div>

      {/* Bottom horizontal line - Edge to Edge (desktop) */}
      <div className="hidden md:block w-full border-t border-[#3D3D3D]" />

      {/* Fade animation keyframe */}
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </section>
  );
};

export default ProgramEmbedded;