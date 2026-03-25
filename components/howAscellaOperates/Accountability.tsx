"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Heading from "../headings/Heading";
import { slideInFromBottom } from "@/utils/motion";
import Reveal from "@/utils/Reveal";

type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <div className="border-b border-color">
          <div className=" flex flex-col sm:flex-row justify-between sm:items-center my-6">
            <h4 className="text-[16px] lg:text-[24px] font-light">In conventional models:</h4> <p className="text-[16px] font">[ Risk increases ]</p>
          </div>
          <p className="text-b2 text-gray-200  mb-4">
            Accountability is implied rather than explicitly assigned, leaving
            responsibility dependent on coordination habits instead of defined
            authority and measurable ownership.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center my-6">
          <h4 className="text-[16px] lg:text-[24px] font-light">In the Ascella model: </h4><p className="text-[16px] font">[ Risk is controlled ]</p>
        </div>
        <p className="text-b2 text-gray-200  mb-4">
          Accountability is architected into the operating system with named
          decision rights, outcome ownership, and structured oversight embedded
          before execution begins.
        </p>
        <p className="text-b2 lg:text-b1 mt-6">
          Accountability shifts from assumed responsibility → to designed authority.
        </p>
      </>
    ),
  },
  {
    id: "accountability",
    title: "Accountability Structure",
    content: (
      <>
        <div className="border-b border-color">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center my-6">
            <h4 className="text-[16px] lg:text-[24px] font-light">In conventional models:</h4> <p className="text-[16px] font">[ Risk increases ]</p>
          </div>
          <p className="text-b2 text-gray-200  mb-4">
            Multiple leaders share influence over the same workstreams, approvals
            overlap, and escalation routes remain informal, creating confusion when
            priorities conflict or delivery pressure rises.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center my-6">
          <h4 className="text-[16px] lg:text-[24px] font-light">In the Ascella model: </h4><p className="text-[16px] font">[ Risk is controlled ]</p>
        </div>
        <p className="text-b2 text-gray-200  mb-4">
          Each execution domain has a single accountable owner supported by
          defined reporting lines, formal approval gates, and documented
          escalation pathways that maintain clarity under scale.
        </p>
        <p className="text-b2 lg:text-b1 mt-6">
          Shared influence → Singular ownership → Structured escalation.
        </p>
      </>
    ),
  },
  {
    id: "prevents",
    title: "What This Prevents",
    content: (
      <>
        <div className="border-b border-color">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center my-6">
            <h4 className="text-[16px] lg:text-[24px] font-light">In conventional models:</h4> <p className="text-[16px] font">[ Risk increases ]</p>
          </div>
          <p className="text-b2 text-gray-200  mb-4">
            Delayed decisions, duplicated effort, silent risk accumulation, and
            reactive firefighting emerge when no single authority governs execution
            end to end.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center my-6">
          <h4 className="text-[16px] lg:text-[24px] font-light">In the Ascella model: </h4><p className="text-[16px] font">[ Risk is controlled ]</p>
        </div>
        <p className="text-b2 text-gray-200 mb-4">
          Clear ownership eliminates ambiguity, accelerates decision velocity,
          reduces operational friction, and ensures risk is surfaced early within
          controlled governance boundaries.
        </p>
        <p className="text-b2 lg:text-b1 mt-6">
          Ambiguity reduces → Alignment increases → Risk is contained.
        </p>
      </>
    ),
  },
  {
    id: "reality",
    title: "Operational Reality",
    content: (
      <>
        <div className="border-b border-color">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 my-6">
            <h4 className="text-[16px] lg:text-[24px] font-light">In conventional models:</h4> <p className="text-[16px] font">[ Risk increases ]</p>
          </div>
          <p className="text-b2 text-gray-200 mb-4">
            Work is divided across teams, vendors, and functions without a single
            accountable authority for outcomes, creating blurred ownership, slow
            decisions, and unmanaged operational exposure as complexity increases.
          </p>
          <p className="text-b2 lg:text-b1 mb-4">
            Execution spreads across multiple contributors → Accountability
            fragments → Risk compounds over time.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center my-6">
          <h4 className="text-[16px] lg:text-[24px] font-light">In the Ascella model: </h4><p className="text-[16px] font">[ Risk is controlled ]</p>
        </div>
        <p className="text-b2 text-gray-200 mb-4">
          Workstreams operate through defined governance channels where one
          authority retains accountability for outcomes, escalation paths are
          explicit, and performance oversight remains continuous as execution
          scales.
        </p>
        <p className="text-b2 lg:text-b1 mt-6">
          Execution is distributed → Accountability remains singular → Risk stays controlled.
        </p>
      </>
    ),
  },
];

// ── Isometric Grid constants ──────────────────────────────────────────────────
const CELL_W = 100;
const CELL_H = 60;

// Cells where vector55.png is placed — will scale with canvas size
const IMAGE_CELLS = [
  { col: 3, row: 3 },
  { col: 5, row: 5 },
];

// ── Isometric Hover Grid ──────────────────────────────────────────────────────
function IsometricHoverGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef    = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

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
          const cx  = offsetX + col * CELL_W + (row % 2 === 0 ? 0 : CELL_W / 2);
          const cy  = offsetY + row * (CELL_H / 2);
          const key = `${col},${row}`;

          const hovered =
            Math.abs(mx - cx) / (CELL_W / 2) +
            Math.abs(my - cy) / (CELL_H / 2) <= 1;

          // Only hovered cell = 1, everything else decays to 0
          const target  = hovered ? 1 : 0;
          const prev    = alphaMap.get(key) ?? 0;
          const speed   = target > prev ? 0.18 : 0.07;
          const current = prev + (target - prev) * speed;
          alphaMap.set(key, current);

          ctx.beginPath();
          ctx.moveTo(cx,              cy - CELL_H / 2);
          ctx.lineTo(cx + CELL_W / 2, cy);
          ctx.lineTo(cx,              cy + CELL_H / 2);
          ctx.lineTo(cx - CELL_W / 2, cy);
          ctx.closePath();

          // Base stroke for all cells
          ctx.strokeStyle = `rgba(255,255,255,${0.06 + current * 0.12})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();

          // Glow fill ONLY on hovered cell — radial gradient for smooth glow
          if (current > 0.005) {
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, CELL_W / 1.8);
            grad.addColorStop(0,   `rgba(255,255,255,${current * 0.2})`);
            grad.addColorStop(0.5, `rgba(200,200,255,${current * 0.03})`);
            grad.addColorStop(1,   `rgba(160, 160, 160, 0)`);
            ctx.fillStyle = grad;
            ctx.fill();

            // Bright border on hovered cell only
            ctx.strokeStyle = `rgba(255,255,255,${current * 0.3})`;
            ctx.lineWidth   = 1.2;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Canvas — pointer-events:auto so hover works directly */}
      <canvas
        ref={canvasRef}
        style={{
          position:      "absolute",
          inset:         0,
          width:         "100%",
          height:        "100%",
          display:       "block",
          pointerEvents: "auto",
          cursor:        "crosshair",
        }}
      />

      {/* vector55.png snapped to exact isometric cells, diamond-clipped */}
      <svg
        style={{
          position:      "absolute",
          inset:         0,
          width:         "100%",
          height:        "100%",
          pointerEvents: "none",
          overflow:      "visible",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {IMAGE_CELLS.map(({ col, row }, i) => {
            const offsetX = -CELL_W / 2;
            const offsetY = -CELL_H / 2;
            const cx = offsetX + col * CELL_W + (row % 2 === 0 ? 0 : CELL_W / 2);
            const cy = offsetY + row * (CELL_H / 2);
            return (
              <clipPath key={i} id={`acct-clip-${i}`} clipPathUnits="userSpaceOnUse">
                <polygon
                  points={`
                    ${cx},${cy - CELL_H / 2}
                    ${cx + CELL_W / 2},${cy}
                    ${cx},${cy + CELL_H / 2}
                    ${cx - CELL_W / 2},${cy}
                  `}
                />
              </clipPath>
            );
          })}
        </defs>
        {IMAGE_CELLS.map(({ col, row }, i) => {
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
              clipPath={`url(#acct-clip-${i})`}
            />
          );
        })}
      </svg>
    </>
  );
}

// ── Accordion Item ────────────────────────────────────────────────────────────
function AccordionItem({
  item,
  active,
  onToggle,
  titleClass = "",
  showContent = true,
  isLast = false,
}: {
  item: Section;
  active: string;
  onToggle: (id: string) => void;
  titleClass?: string;
  showContent?: boolean;
  isLast?: boolean;
}) {
  const isActive = active === item.id;
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const handleHover = () => {
    hoverTimer.current = setTimeout(() => { onToggle(item.id); }, 200);
  };
  const cancelHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      className={`${isLast ? "" : "border-b border-color"}`}
    >
      <motion.button
        onClick={() => onToggle(item.id)}
        onMouseEnter={handleHover}
        onMouseLeave={cancelHover}
        className={`group w-full text-left p-4 transition-colors duration-300 ${titleClass} flex justify-between items-center`}
        whileTap={{ scale: 0.98 }}
      >
        <motion.h5
          className={
            showContent
              ? "text-[16px] lg:text-[24px]"
              : "text-[12px] lg:text-[20px] tracking-wide"
          }
          animate={{ x: isActive ? 6 : 0, opacity: isActive ? 1 : 0.75 }}
          transition={{ duration: 0.3 }}
        >
          {item.title}
        </motion.h5>
        {showContent && (
          <div
            className={`
              relative flex items-center justify-center h-3 w-3
              transition-transform duration-300 ease-out
              ${isActive ? "rotate-45" : ""}
              group-hover:scale-125
            `}
          >
            <span className="absolute w-full h-px bg-current" />
            <span className="absolute h-full w-px bg-current" />
          </div>
        )}
      </motion.button>

      {showContent && (
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key="content"
              layout
              initial={{ height: 0, opacity: 0, y: -10, filter: "blur(6px)" }}
              animate={{ height: "auto", opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ height: 0, opacity: 0, y: -6, filter: "blur(4px)" }}
              transition={{
                height:  { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.25 },
                y:       { duration: 0.35 },
              }}
              className="overflow-hidden bg-gray-500"
            >
              <div className="p-5">{item.content}</div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Accountability() {
  const [active, setActive] = useState<string>("overview");

  const toggle = (id: string) => {
    setActive((prev) => (prev === id ? "" : id));
  };

  return (
    <section className="border-b border-color min-h-[720px] lg:min-h-[640px]">
      <div className="py-10 xl:py-10 md:border-b border-color">
        <Reveal variants={slideInFromBottom(0.1)} className="flex justify-center md:justify-start lg:mx-20 xl:mx-24 px-10 xl:px-0">
          <Heading text="Accountability Principle" />
        </Reveal>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden lg:block mx-10 lg:mx-20 xl:mx-24 px-4 sm:px-6">
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_1.2fr] min-h-[520px]">
          <div
            aria-hidden="true"
            style={{
              position:      "absolute",
              top:           "50%",
              left:          "20%",           // roughly where middle col starts
              transform:     "translate(-50%, -50%)",
              width:         "420px",         // tight around the diamond shapes
              height:        "300px",
              pointerEvents: "none",
              zIndex:        11,
            }}
          >
            {/* Overflow container — gives canvas its pixel size */}
            <div
              style={{
                position:      "relative",
                width:         "100%",
                height:        "100%",
                overflow:      "hidden",
                pointerEvents: "none",
              }}
            >
              {/* Mask wrapper — separate from overflow so getBoundingClientRect is stable */}
              <div
                style={{
                  position:            "absolute",
                  inset:               0,
                  pointerEvents:       "none",
                  WebkitMaskImage: [
                    "linear-gradient(to right,  transparent 0%, black 15%, black 85%, transparent 100%)",
                    "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                  ].join(", "),
                  maskImage: [
                    "linear-gradient(to right,  transparent 0%, black 15%, black 85%, transparent 100%)",
                    "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                  ].join(", "),
                  WebkitMaskComposite: "destination-in",
                  maskComposite:       "intersect",
                }}
              >
                <IsometricHoverGrid />
              </div>
            </div>
          </div>

          {/* Left col — text content */}
          <Reveal variants={slideInFromBottom(0.1)} className="relative z-10 flex flex-col justify-between sticky">
            <div />
            <div className="pb-10">
              <h3>The Single <br /> Accountability Principle</h3>
              <p className="text-b2 text-gray-200 mb-4">
                A structural governance approach that assigns one clearly defined accountable authority to every execution domain, ensuring decisions, outcomes, and risk ownership remain unambiguous as scale increases.
              </p>
            </div>
          </Reveal>

          {/* Middle col — section titles */}
          {/* <Reveal variants={slideInFromBottom(0.1)} className="relative z-10 space-y-4">
            {SECTIONS.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                active={active}
                onToggle={setActive}
                showContent={false}
                titleClass={active === item.id ? "text-white" : "text-gray-200"}
              />
            ))}
          </Reveal> */}

          {/* Right col — accordion content */}
          <div className="relative z-10 border-x border-color h-full min-h-[500px]">
            <Reveal variants={slideInFromBottom(0.1)} className="relative h-full">
              {SECTIONS.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  active={active}
                  onToggle={toggle}
                  isLast={index === SECTIONS.length - 1}
                />
              ))}
            </Reveal>
          </div>

        </div>
      </div>

      {/* ── Mobile / tablet layout ── */}
      <div className="lg:hidden mb-20  space-y-4">
        <div className="relative">
          {/* Mobile text content */}
          <div className="relative z-10 p-6 text-center">
            <h4>The Single <br /> Accountability Principle</h4>
            <p className="text-b2 leading-tight mt-4">
              A structural governance approach that assigns one clearly defined accountable authority to every execution domain, ensuring decisions, outcomes, and risk ownership remain unambiguous as scale increases.
            </p>
          </div>

          {/* Mobile accordion */}
          <div className="relative z-10">
            {SECTIONS.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                active={active}
                onToggle={toggle}
                titleClass="text-b1"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}