"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import PlusHeading from "../headings/PlusHeading";
import PartialOutlineBtn from "../btns/PartialOutlineBtn";

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp: Variants = {
hidden: { opacity: 0, y: 32 },
visible: {
  opacity: 1,
  y: 0,
  transition: { duration: 0.9, ease: "easeOut" },
},
};

const fadeUpDelayed: Variants = {
hidden: { opacity: 0, y: 24 },
visible: {
  opacity: 1,
  y: 0,
  transition: { duration: 0.9, ease: "easeOut", delay: 0.2 },
},
};

// ── Shared config ─────────────────────────────────────────────────────────────
const SPACING   = 3;
const THRESHOLD = 15;

// ══════════════════════════════════════════════════════════════════════════════
// RIPPLE CANVAS — only for first section (water wave effect)
// ══════════════════════════════════════════════════════════════════════════════
const RIPPLE_RADIUS = 120;

function RippleCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
const canvasRef    = useRef<HTMLCanvasElement>(null);
const mouseRef     = useRef({ x: -9999, y: -9999 });
const ripplesRef   = useRef<{ x: number; y: number; t: number; strength: number }[]>([]);
const particlesRef = useRef<
  { x: number; y: number; baseY: number; vy: number; dy: number; size: number; currentAlpha: number }[]
>([]);
const rafRef       = useRef<number | null>(null);
const lastMouseRef = useRef({ x: -9999, y: -9999 });

const buildParticles = useCallback(() => {
  const canvas = canvasRef.current;
  if (!canvas || !imgEl) return;

  const rect = canvas.getBoundingClientRect();
  canvas.width  = rect.width;
  canvas.height = rect.height;

  const W = canvas.width;
  const H = canvas.height;
  if (W === 0 || H === 0) return;

  const off    = document.createElement("canvas");
  off.width    = W;
  off.height   = H;
  const offCtx = off.getContext("2d")!;

  try {
    offCtx.drawImage(imgEl, 0, 0, W, H);
    const { data } = offCtx.getImageData(0, 0, W, H);
    const pts: typeof particlesRef.current = [];

    for (let y = 0; y < H; y += SPACING) {
      for (let x = 0; x < W; x += SPACING) {
        const i          = (y * W + x) * 4;
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (brightness > THRESHOLD) {
          pts.push({
            x,
            y,
            baseY: y,
            vy: 0,
            dy: 0,
            size: Math.random() * 0.8 + 0.4,
            currentAlpha: (brightness / 255) * 0.85,
          });
        }
      }
    }
    particlesRef.current = pts;
  } catch {
    particlesRef.current = [];
  }
}, [imgEl]);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;

  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    const lx    = lastMouseRef.current.x;
    const ly    = lastMouseRef.current.y;
    const moved = Math.sqrt((mx - lx) ** 2 + (my - ly) ** 2);
    if (moved > 4 && mx > 0) {
      ripplesRef.current.push({ x: mx, y: my, t: 0, strength: Math.min(moved / 8, 3) });
      lastMouseRef.current = { x: mx, y: my };
    }

    ripplesRef.current = ripplesRef.current.filter((r) => r.t < 80);
    for (const r of ripplesRef.current) r.t += 1;

    for (const p of particlesRef.current) {
      let forceY = 0;

      for (const r of ripplesRef.current) {
        const dx           = p.x - r.x;
        const dy           = p.baseY - r.y;
        const dist         = Math.sqrt(dx * dx + dy * dy);
        const ringRadius   = r.t * 3.5;
        const ringWidth    = 40;
        const distFromRing = Math.abs(dist - ringRadius);

        if (distFromRing < ringWidth && dist < RIPPLE_RADIUS + ringRadius) {
          const wave    = Math.cos((distFromRing / ringWidth) * Math.PI * 0.5);
          const decay   = Math.max(0, 1 - r.t / 70);
          const dirSign = dist < ringRadius ? -1 : 1;
          forceY += dirSign * wave * decay * r.strength * 6;
        }
      }

      p.vy += forceY * 0.4;
      p.vy += -p.dy * 0.18;
      p.vy *= 0.80;
      p.dy += p.vy;
      p.dy  = Math.max(-18, Math.min(18, p.dy));

      const drawY     = p.baseY + p.dy;
      const dispAlpha = Math.min(1, p.currentAlpha + (Math.abs(p.dy) / 18) * 0.5);

      if (Math.abs(p.dy) > 1) {
        ctx.beginPath();
        ctx.arc(p.x, drawY, p.size * (1 + Math.abs(p.dy) / 8), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${dispAlpha * 0.2})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${dispAlpha})`;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(loop);
  };

  const onMove = (e: MouseEvent) => {
    const rect       = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const onLeave = () => {
    mouseRef.current     = { x: -9999, y: -9999 };
    lastMouseRef.current = { x: -9999, y: -9999 };
  };

  canvas.addEventListener("mousemove", onMove);
  canvas.addEventListener("mouseleave", onLeave);

  const ro = new ResizeObserver(buildParticles);
  ro.observe(canvas);

  if (imgEl) {
    if (imgEl.complete) buildParticles();
    else imgEl.addEventListener("load", buildParticles);
  }

  rafRef.current = requestAnimationFrame(loop);

  return () => {
    canvas.removeEventListener("mousemove", onMove);
    canvas.removeEventListener("mouseleave", onLeave);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    ro.disconnect();
    if (imgEl) imgEl.removeEventListener("load", buildParticles);
  };
}, [buildParticles, imgEl]);

return (
  <canvas
    ref={canvasRef}
    style={{
      position:      "absolute",
      inset:         0,
      width:         "100%",
      height:        "100%",
      pointerEvents: "auto",
      zIndex:        10,
      cursor:        "crosshair",
    }}
  />
);
}

// ══════════════════════════════════════════════════════════════════════════════
// ORIGINAL PARTICLE CANVAS — sections 2-5 (light-up on hover)
// ══════════════════════════════════════════════════════════════════════════════
const RADIUS = 80;
const LERP   = 0.13;

function ParticleCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
const canvasRef    = useRef<HTMLCanvasElement>(null);
const mouseRef     = useRef({ x: -9999, y: -9999 });
const particlesRef = useRef<
  { x: number; y: number; baseAlpha: number; currentAlpha: number; size: number }[]
>([]);
const rafRef = useRef<number | null>(null);

const buildParticles = useCallback(() => {
  const canvas = canvasRef.current;
  if (!canvas || !imgEl) return;

  const rect = canvas.getBoundingClientRect();
  canvas.width  = rect.width;
  canvas.height = rect.height;

  const W = canvas.width;
  const H = canvas.height;
  if (W === 0 || H === 0) return;

  const off    = document.createElement("canvas");
  off.width    = W;
  off.height   = H;
  const offCtx = off.getContext("2d")!;

  try {
    offCtx.drawImage(imgEl, 0, 0, W, H);
    const { data } = offCtx.getImageData(0, 0, W, H);
    const pts: typeof particlesRef.current = [];

    for (let y = 0; y < H; y += SPACING) {
      for (let x = 0; x < W; x += SPACING) {
        const i          = (y * W + x) * 4;
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (brightness > THRESHOLD) {
          pts.push({
            x,
            y,
            baseAlpha:    0,
            currentAlpha: 0,
            size: Math.random() * 0.8 + 0.4,
          });
        }
      }
    }
    particlesRef.current = pts;
  } catch {
    particlesRef.current = [];
  }
}, [imgEl]);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;

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

      if (ease > 0.03) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + ease * 5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.currentAlpha * 0.22})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.min(1, p.currentAlpha)})`;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(loop);
  };

  const onMove = (e: MouseEvent) => {
    const rect       = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

  canvas.addEventListener("mousemove", onMove);
  canvas.addEventListener("mouseleave", onLeave);

  const ro = new ResizeObserver(buildParticles);
  ro.observe(canvas);

  if (imgEl) {
    if (imgEl.complete) buildParticles();
    else imgEl.addEventListener("load", buildParticles);
  }

  rafRef.current = requestAnimationFrame(loop);

  return () => {
    canvas.removeEventListener("mousemove", onMove);
    canvas.removeEventListener("mouseleave", onLeave);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    ro.disconnect();
    if (imgEl) imgEl.removeEventListener("load", buildParticles);
  };
}, [buildParticles, imgEl]);

return (
  <canvas
    ref={canvasRef}
    style={{
      position:      "absolute",
      inset:         0,
      width:         "100%",
      height:        "100%",
      pointerEvents: "auto",
      zIndex:        10,
      cursor:        "crosshair",
    }}
  />
);
}

// ── ParticleImage ─────────────────────────────────────────────────────────────
function ParticleImage({
src,
alt,
className,
useRipple = false,
}: {
src: string;
alt: string;
className?: string;
useRipple?: boolean;
}) {
const wrapRef           = useRef<HTMLDivElement>(null);
const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);

useEffect(() => {
  const wrap = wrapRef.current;
  if (!wrap) return;
  const el = wrap.querySelector("img") as HTMLImageElement | null;
  if (el) setImgEl(el);
}, []);

return (
  <div
    ref={wrapRef}
    style={{ position: "relative", display: "inline-block" }}
    className={className}
  >
    <Image
      src={src}
      alt={alt}
      width={550}
      height={550}
      className="opacity-90 object-contain w-full h-full"
      crossOrigin="anonymous"
    />
    {useRipple ? <RippleCanvas imgEl={imgEl} /> : <ParticleCanvas imgEl={imgEl} />}
  </div>
);
}

// ─── OwnershipSection ────────────────────────────────────────────────────────
function OwnershipSection({
title,
description,
tag,
image,
isLast,
index,
setActiveIndex,
}: {
title: string;
description: string;
tag?: string;
image: string;
isLast: boolean;
index: number;
setActiveIndex: (n: number) => void;
}) {
const ref      = useRef<HTMLDivElement | null>(null);
const isInView = useInView(ref, { amount: 0.2 });

useEffect(() => {
  if (isInView) setActiveIndex(index);
}, [isInView, index, setActiveIndex]);

return (
  <div
    ref={ref}
    className="relative flex flex-col items-start
      mx-0 my-0
      pt-6 pb-10 px-5
      sm:pt-8 sm:pb-16 sm:px-8
      md:pt-12 md:pb-24 md:px-12
      lg:pt-16 lg:pb-32 lg:px-16
    "
  >
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full flex justify-center
        mb-10 sm:mb-16 md:mb-20 lg:mb-24
      "
    >
      {/* index === 0 → RippleCanvas, baaki sab → original ParticleCanvas */}
      <ParticleImage
        src={image}
        alt={title}
        useRipple={index === 0}
        className="
          w-[180px] h-[180px]
          sm:w-[280px] sm:h-[280px]
          md:w-[380px] md:h-[380px]
          lg:w-[480px] lg:h-[480px]
          xl:w-[550px] xl:h-[550px]
        "
      />
    </motion.div>

    <motion.div
      variants={fadeUpDelayed}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full max-w-xl"
    >
      <h3
        className="font-light tracking-tight
          text-2xl sm:text-3xl lg:text-4xl
          mb-4 sm:mb-6 lg:mb-8
        "
      >
        {title}
      </h3>
      <p
        className="text-white/50 leading-relaxed
          text-sm sm:text-base
          mb-4 sm:mb-6 lg:mb-8
        "
      >
        {description}
      </p>
      {tag && (
        <div className="text-xs sm:text-sm tracking-widest text-white/80">
          {tag}
        </div>
      )}
    </motion.div>

    {!isLast && (
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    )}
  </div>
);
}

// ─── Ownership ───────────────────────────────────────────────────────────────
export default function Ownership() {
const [activeIndex, setActiveIndex] = useState(0);

const sections = [
  {
    title: "Security & Risk Posture",
    description:
      "Security and risk posture focuses on keeping organisational risk visible and controlled. Security decisions link directly to business priorities and acceptable risk levels. Each control has a clear owner, review cycle, and response plan. This reduces surprises and limits the impact of incidents when issues occur.",
    tag: "#Resilience",
    image: "/Security.png",
  },
  {
    title: "Technology Execution",
    description:
      "Technology execution ensures systems work reliably as change increases. Platforms follow clear build, release, and run standards. Ownership stays consistent across development and operations to avoid gaps. This keeps delivery steady and reduces failures during growth.",
    tag: "#Scalability",
    image: "/Technology.png",
  },
  {
    title: "Workforce Readiness",
    description:
      "Workforce readiness prepares teams for real operating conditions. Roles and escalation paths stay clear before pressure hits. Training reflects actual scenarios instead of theory. Teams respond faster and make better decisions during incidents.",
    tag: "#Alignment",
    image: "/Workforce.png",
  },
  {
    title: "Operational Control",
    description:
      "Operational control brings structure to daily execution. Decisions follow defined paths instead of informal coordination. Signals focus on risk, progress, and dependencies. Work becomes predictable and less reactive over time.",
    image: "/Operational.png",
  },
  {
    title: "Revenue Enablement",
    description:
      "Revenue enablement connects execution quality to business results. Technical priorities reflect revenue impact and customer trust. Launches follow readiness checks and clear success measures. Growth stays protected as execution becomes disciplined.",
    tag: "#Sustainability",
    image: "/Revenue.png",
  },
];

const scrollToSection = (index: number) => {
  const els = document.querySelectorAll("[data-ownership-section]");
  els[index]?.scrollIntoView({ behavior: "smooth" });
};

return (
  <section className="relative">
    <div className="relative h-px w-full mt-30 border-t border-color">
      <div className="mx-8 h-full" />
    </div>

    <div className="mx-auto w-full relative">

      {/* ══ DESKTOP lg+ ══ */}
      <div className="hidden lg:grid lg:grid-cols-[10%_25%_55%_10%] relative">
        <div className="absolute inset-0 flex pointer-events-none z-0">
          <div className="h-full w-[10%] border-r border-color" />
          <div className="h-full w-[25%] border-r border-color" />
          <div className="h-full w-[55%] border-r border-color" />
        </div>

        <div className="z-10 h-full" />

        <aside className="relative z-10 p-12">
          <div className="sticky top-24">
            <PlusHeading text="OWNERSHIP" />
            <ul className="mt-20 space-y-6">
              {sections.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => scrollToSection(idx)}
                  className={`text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "text-white font-medium"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {item.title}
                </li>
              ))}
            </ul>
            <div className="mt-32">
              <PartialOutlineBtn text="Explore More" />
            </div>
          </div>
        </aside>

        <main className="relative z-10">
          {sections.map((item, index) => (
            <div key={item.title} data-ownership-section>
              <OwnershipSection
                title={item.title}
                description={item.description}
                tag={item.tag}
                image={item.image}
                isLast={index === sections.length - 1}
                index={index}
                setActiveIndex={setActiveIndex}
              />
            </div>
          ))}
        </main>

        <div className="z-10 h-full" />
      </div>

      {/* ══ TABLET sm–lg ══ */}
      <div className="hidden sm:grid lg:hidden grid-cols-[30%_70%] relative">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="h-full w-[30%] border-r border-color" />
        </div>

        <aside className="relative z-10 px-6 pt-10 pb-6">
          <div className="sticky top-20">
            <PlusHeading text="OWNERSHIP" />
            <ul className="mt-10 space-y-4">
              {sections.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => scrollToSection(idx)}
                  className={`text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "text-white font-medium"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {item.title}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <PartialOutlineBtn text="Explore More" />
            </div>
          </div>
        </aside>

        <main className="relative z-10">
          {sections.map((item, index) => (
            <div key={item.title} data-ownership-section>
              <OwnershipSection
                title={item.title}
                description={item.description}
                tag={item.tag}
                image={item.image}
                isLast={index === sections.length - 1}
                index={index}
                setActiveIndex={setActiveIndex}
              />
            </div>
          ))}
        </main>
      </div>

      {/* ══ MOBILE <sm ══ */}
      <div className="sm:hidden">
        <div className="px-4 pt-8 pb-4 border-b border-white/10">
          <PlusHeading text="OWNERSHIP" />
        </div>

        <div className="py-2">
          {sections.map((item, index) => (
            <div key={item.title} data-ownership-section>
              <OwnershipSection
                title={item.title}
                description={item.description}
                tag={item.tag}
                image={item.image}
                isLast={index === sections.length - 1}
                index={index}
                setActiveIndex={setActiveIndex}
              />
            </div>
          ))}
        </div>

        <div className="px-4 pb-10">
          <PartialOutlineBtn text="Explore More" />
        </div>
      </div>

    </div>

    <div className="relative h-px w-full">
      <div className="mx-8 h-full bg-white/10" />
    </div>
  </section>
);
}