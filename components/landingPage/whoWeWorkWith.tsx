'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, animate, useInView } from "motion/react"
import OutlineBtn from '../btns/OutlineBtn';
import Heading from '@/components/headings/Heading';
import { useRouter } from "next/navigation";

const cards = [
  {
    title: "Startups",
    heading: "Early teams need speed without long term damage.",
    description:
      "Lightweight structure prevents chaos as headcount and complexity grow. Execution stays focused while foundations remain strong.",
    svg: <svg width="43" height="28" viewBox="0 0 43 28" fill="none">
      <rect x="15" y="14" width="7" height="7" fill="#3D3D3D" />
      <rect x="8" width="7" height="7" fill="#3D3D3D" />
      <rect x="22" width="7" height="7" fill="#3D3D3D" />
      <rect x="22" y="14" width="7" height="7" fill="#3D3D3D" />
      <rect x="29" y="21" width="7" height="7" fill="#3D3D3D" />
      <rect x="29" y="7" width="7" height="7" fill="#3D3D3D" />
      <rect x="36" y="14" width="7" height="7" fill="#3D3D3D" />
      <rect x="8" y="14" width="7" height="7" fill="#3D3D3D" />
      <rect y="21" width="7" height="7" fill="#3D3D3D" />
      <rect x="36" y="21" width="7" height="7" fill="#3D3D3D" />
      <rect x="15" y="7" width="7" height="7" fill="#3D3D3D" />
    </svg>
  },
  {
    title: "Venture-backed scale-ups",
    heading: "Growth exposes gaps in ownership and execution discipline.",
    description:
      "Structured decision paths protect speed while reducing breakage. Founders gain clarity as scale becomes manageable.",
    svg: <svg width="28" height="28" viewBox="0 0 35 35" fill="none">
      <rect x="7" y="21" width="7" height="7" fill="#3D3D3D" />
      <rect x="14" width="7" height="7" fill="#3D3D3D" />
      <rect x="14" y="21" width="7" height="7" fill="#3D3D3D" />
      <rect x="21" y="21" width="7" height="7" fill="#3D3D3D" />
      <rect x="21" y="7" width="7" height="7" fill="#3D3D3D" />
      <rect x="28" y="13" width="7" height="7" fill="#3D3D3D" />
      <rect y="14" width="7" height="7" fill="#3D3D3D" />
      <rect x="14" y="14" width="7" height="7" fill="#3D3D3D" />
      <rect x="14" y="28" width="7" height="7" fill="#3D3D3D" />
      <rect x="7" y="7" width="7" height="7" fill="#3D3D3D" />
    </svg>
  },
  {
    title: "Regulated organisations",
    heading: "Built for environments where risk tolerance stays low.",
    description:
      "Controls, ownership, and review cycles align with regulatory expectations. Operations remain steady under audits, incidents, and external scrutiny.",
    svg: <svg width="43" height="28" viewBox="0 0 43 28" fill="none">
      <rect x="15" y="14" width="7" height="7" fill="#3D3D3D" />
      <rect x="8" width="7" height="7" fill="#3D3D3D" />
      <rect x="22" width="7" height="7" fill="#3D3D3D" />
      <rect x="22" y="14" width="7" height="7" fill="#3D3D3D" />
      <rect x="29" y="21" width="7" height="7" fill="#3D3D3D" />
      <rect x="29" y="7" width="7" height="7" fill="#3D3D3D" />
      <rect x="36" y="14" width="7" height="7" fill="#3D3D3D" />
      <rect x="8" y="14" width="7" height="7" fill="#3D3D3D" />
      <rect y="21" width="7" height="7" fill="#3D3D3D" />
      <rect x="36" y="21" width="7" height="7" fill="#3D3D3D" />
      <rect x="15" y="7" width="7" height="7" fill="#3D3D3D" />
    </svg>
  },
  {
    title: "Enterprises",
    heading: "Large organisations face fragmentation across teams and vendors.",
    description:
      "Central operating control restores alignment and accountability. Delivery becomes predictable instead of reactive.",
    svg: <svg width="42" height="28" viewBox="0 0 42 28" fill="none">
      <rect x="7" y="14" width="7" height="7" fill="#3D3D3D" />
      <rect x="14" y="7" width="7" height="7" fill="#3D3D3D" />
      <rect x="14" y="14" width="7" height="7" fill="#3D3D3D" />
      <rect x="21" y="14" width="7" height="7" fill="#3D3D3D" />
      <rect x="35" y="14" width="7" height="7" fill="#3D3D3D" />
      <rect x="28" y="6" width="7" height="7" fill="#3D3D3D" />
      <rect y="21" width="7" height="7" fill="#3D3D3D" />
      <rect x="7" y="21" width="7" height="7" fill="#3D3D3D" />
      <rect y="7" width="7" height="7" fill="#3D3D3D" />
      <rect x="7" width="7" height="7" fill="#3D3D3D" />
    </svg>
  }
]

const AUTO_DURATION = 5;
const CELL_W = 100;
const CELL_H = 60;

// ── Isometric Grid ────────────────────────────────────────────────────────────
function IsometricHoverGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef    = useRef<number | null>(null);

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
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

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

      const cols    = Math.ceil(W / CELL_W) + 2;
      const rows    = Math.ceil(H / (CELL_H / 2)) + 2;
      const offsetX = -CELL_W / 2;
      const offsetY = -CELL_H / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = offsetX + col * CELL_W + (row % 2 === 0 ? 0 : CELL_W / 2);
          const cy = offsetY + row * (CELL_H / 2);
          const key = `${col},${row}`;

          const hovered = Math.abs(mx - cx) / (CELL_W / 2) + Math.abs(my - cy) / (CELL_H / 2) <= 1;
          const target  = hovered ? 1 : 0;
          const current = (alphaMap.get(key) ?? 0) + (target - (alphaMap.get(key) ?? 0)) * 0.1;
          alphaMap.set(key, current);

          ctx.beginPath();
          ctx.moveTo(cx,            cy - CELL_H / 2);
          ctx.lineTo(cx + CELL_W/2, cy);
          ctx.lineTo(cx,            cy + CELL_H / 2);
          ctx.lineTo(cx - CELL_W/2, cy);
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
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        display:       'block',
        pointerEvents: 'auto',
        cursor:        'crosshair',
      }}
    />
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function WhoWeWorkWith() {
  const router = useRouter();
  const [paused, setPaused]           = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress]       = useState(0);
  const sectionRef  = useRef<HTMLDivElement>(null);
  const isInView    = useInView(sectionRef, { once: true, margin: "-100px" });
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (paused) { controlsRef.current?.stop(); return; }
    const remaining = AUTO_DURATION * (1 - progress / 100);
    controlsRef.current = animate(progress, 100, {
      duration: remaining,
      ease: [0, 0, 1, 1],
      onUpdate:  (latest) => setProgress(latest),
      onComplete: () => {
        setProgress(0);
        setActiveIndex((prev) => (prev + 1) % cards.length);
      },
    });
    return () => controlsRef.current?.stop();
  }, [paused, activeIndex]);

  const card = cards[activeIndex];

  return (
    <motion.section
      ref={sectionRef}
      className="relative  border-y border-color  overflow-hidden"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as any }}
    >

      <div className="relative z-10 flex flex-col h-auto lg:min-h-screen">

        {/* ── Header (no grid here) ── */}
        <motion.div
          className="flex flex-col items-center text-center px-4 pt-12 sm:pt-16 lg:pt-20 pb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Heading text="Who We Work With" />
          <h3 className="w-full sm:w-3/4 lg:w-1/2 my-5 text-[16px] lg:text-[24px] leading-snug">
            Organisations that require control, accountability, and structured execution at scale
          </h3>
          <OutlineBtn
            text="Engage With Us"
            color="white"
            onClick={() => { router.push("/engageWithUs"); }}
          />
        </motion.div>

        {/*
          ── Everything below the button — grid lives here as bg ──────────────
          This wrapper starts right after the button.
          Grid is absolute inside this, card content is relative z-10 on top.
        */}
        <div className="relative flex-1 flex items-start sm:items-center justify-center px-4 sm:px-6 lg:px-8 pb-4">

          {/* Isometric grid — absolute, fills only this bottom area */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex justify-center items-center"
            style={{ pointerEvents: 'none' }}
          >
            <div
              style={{
                position:      'relative',
                width:         '100%',
                maxWidth:      '900px',
                height:        '100%',
                // Fade: top edge (just below button), left/right edges
                WebkitMaskImage: [
                  'linear-gradient(to right,  transparent 0%, black 12%, black 88%, transparent 100%)',
                  'linear-gradient(to bottom, transparent 0%, black 12%, black 85%, transparent 100%)',
                ].join(', '),
                maskImage: [
                  'linear-gradient(to right,  transparent 0%, black 12%, black 88%, transparent 100%)',
                  'linear-gradient(to bottom, transparent 0%, black 12%, black 85%, transparent 100%)',
                ].join(', '),
                WebkitMaskComposite: 'destination-in',
                maskComposite:       'intersect',
              }}
            >
              <IsometricHoverGrid />

              {/* vector55.png — snapped to exact isometric cell positions, diamond-clipped */}
              <svg
                style={{
                  position:      'absolute',
                  inset:         0,
                  width:         '100%',
                  height:        '100%',
                  pointerEvents: 'none',
                  overflow:      'visible',
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {[{ col: 4, row: 4 }, { col: 6, row: 6 }].map(({ col, row }, i) => {
                    const offsetX = -CELL_W / 2;
                    const offsetY = -CELL_H / 2;
                    const cx = offsetX + col * CELL_W + (row % 2 === 0 ? 0 : CELL_W / 2);
                    const cy = offsetY + row * (CELL_H / 2);
                    return (
                      <clipPath key={i} id={`iso-clip-${i}`} clipPathUnits="userSpaceOnUse">
                        <polygon points={`${cx},${cy - CELL_H/2} ${cx + CELL_W/2},${cy} ${cx},${cy + CELL_H/2} ${cx - CELL_W/2},${cy}`} />
                      </clipPath>
                    );
                  })}
                </defs>
                {[{ col: 4, row: 4 }, { col: 6, row: 6 }].map(({ col, row }, i) => {
                  const offsetX = -CELL_W / 2;
                  const offsetY = -CELL_H / 2;
                  const cx = offsetX + col * CELL_W + (row % 2 === 0 ? 0 : CELL_W / 2);
                  const cy = offsetY + row * (CELL_H / 2);
                  return (
                    <image
                      key={i}
                      href="/vector 55.png"
                      x={cx - CELL_W / 2}
                      y={cy - CELL_H / 2}
                      width={CELL_W}
                      height={CELL_H}
                      opacity="0.85"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#iso-clip-${i})`}
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Card content on top of grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="relative z-10 w-full flex items-start sm:items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                onMouseDown={(e) => { if (e.button === 0) setPaused(true); }}
                onMouseUp={() => setPaused(false)}
                onMouseLeave={() => setPaused(false)}
                onTouchStart={() => setPaused(true)}
                onTouchEnd={() => setPaused(false)}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
                exit={{    opacity: 0, y: -40, filter: "blur(10px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4 w-full"
              >
                <motion.div
                  className="flex gap-3 sm:gap-4 items-center"
                  initial={{ opacity: 0, filter: "blur(10px)", y: 20  }}
                  animate={{ opacity: 1, filter: "blur(0px)",  y: 0   }}
                  exit={{    opacity: 0, filter: "blur(20px)", y: -20  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="scale-90 sm:scale-100">{card.svg}</div>
                  <h4 className="text-[20px] lg:text-[24px] capitalize">{card.title}</h4>
                </motion.div>

                <div className="relative w-full flex justify-center my-6">
                  <div className="relative w-[280px] sm:w-full sm:max-w-xl lg:max-w-[1142px] h-[1px] bg-white/20">
                    <div className="absolute left-0 top-0 h-full bg-white" style={{ width: `${progress}%` }} />
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${progress}%` }}>
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-[3px] sm:border-[4px] border-white rotate-45 bg-black" />
                    </div>
                  </div>
                </div>

                <motion.div
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex flex-col w-full max-w-xs sm:max-w-sm lg:max-w-md text-center px-2 sm:px-0"
                >
                  <motion.h5
                    variants={{
                      hidden:  { opacity: 0, y: 15, filter: "blur(6px)" },
                      visible: { opacity: 1, y: 0,  filter: "blur(0px)" },
                    }}
                    transition={{ duration: 0.5 }}
                    className="leading-snug mb-3 sm:mb-4 text-[20px] uppercase"
                  >
                    {card.heading}
                  </motion.h5>
                  <motion.p
                    variants={{
                      hidden:  { opacity: 0, y: 15, filter: "blur(6px)" },
                      visible: { opacity: 1, y: 0,  filter: "blur(0px)" },
                    }}
                    transition={{ duration: 0.6 }}
                    className="text-[12px]"
                  >
                    {card.description}
                  </motion.p>
                </motion.div>

              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}