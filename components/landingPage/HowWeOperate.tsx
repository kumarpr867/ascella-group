'use client';

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";
import Heading from "../headings/Heading";

// ── Particle config ───────────────────────────────────────────────────────────
const SPACING   = 3;
const THRESHOLD = 12;
const RADIUS    = 90;
const LERP      = 0.13;

// ── ParticleCanvas ────────────────────────────────────────────────────────────
function ParticleCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<
    { x: number; y: number; currentAlpha: number; size: number }[]
  >([]);
  const rafRef = useRef<number | null>(null);

  const buildParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgEl) return;

    const rect    = canvas.getBoundingClientRect();
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
              currentAlpha: 0,
              size: Math.random() * 0.9 + 0.4,
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
        const ease = t * t * (3 - 2 * t); // smoothstep

        // Higher opacity target on hover — feels much brighter
        const target = ease * 1.0;
        p.currentAlpha += (target - p.currentAlpha) * LERP;

        if (p.currentAlpha < 0.008) continue;

        // Large soft glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + ease * 6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.currentAlpha * 0.28})`;
        ctx.fill();

        // Core bright white dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, p.currentAlpha * 1.4)})`;
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
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const el = wrap.querySelector("img") as HTMLImageElement | null;
    if (el) setImgEl(el);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative", display: "inline-block" }} className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-contain"
        crossOrigin="anonymous"
      />
      <ParticleCanvas imgEl={imgEl} />
    </div>
  );
}

// ── Points data ───────────────────────────────────────────────────────────────
const points = [
  {
    svg: (
      <svg width="42" height="28" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7"  y="14" width="7" height="7" className="fill-gray-400" />
        <rect x="14" y="7"  width="7" height="7" className="fill-gray-400" />
        <rect x="14" y="14" width="7" height="7" className="fill-gray-400" />
        <rect x="21" y="14" width="7" height="7" className="fill-gray-400" />
        <rect x="35" y="14" width="7" height="7" className="fill-gray-400" />
        <rect x="28" y="6"  width="7" height="7" className="fill-gray-400" />
        <rect       y="21"  width="7" height="7" className="fill-gray-400" />
        <rect x="7"  y="21" width="7" height="7" className="fill-gray-400" />
        <rect       y="7"   width="7" height="7" className="fill-gray-400" />
        <rect x="7"         width="7" height="7" className="fill-gray-400" />
      </svg>
    ),
    count: "01",
    heading: "Structured authority",
    description: "Decision ownership stays defined from the start, with clear authority and outcome responsibility assigned to specific roles instead of shared committees.",
  },
  {
    svg: (
      <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7"  y="7"  width="7" height="7" className="fill-gray-400" />
        <rect x="14"        width="7" height="7" className="fill-gray-400" />
        <rect x="21" y="7"  width="7" height="7" className="fill-gray-400" />
        <rect x="21" y="14" width="7" height="7" className="fill-gray-400" />
        <rect       y="14"  width="7" height="7" className="fill-gray-400" />
        <rect x="14" y="14" width="7" height="7" className="fill-gray-400" />
        <rect x="14" y="21" width="7" height="7" className="fill-gray-400" />
        <rect x="27" y="7"  width="7" height="7" className="fill-gray-400" />
      </svg>
    ),
    count: "02",
    heading: "Outcome pods",
    description: "Small cross functional teams own defined results within a shared operating system, which reduces handoffs and keeps accountability intact throughout delivery.",
  },
  {
    svg: (
      <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="14" width="7" height="7" className="fill-gray-400" />
        <rect x="21" y="7"  width="7" height="7" className="fill-gray-400" />
        <rect x="21" y="21" width="7" height="7" className="fill-gray-400" />
        <rect x="28" y="14" width="7" height="7" className="fill-gray-400" />
        <rect       y="14"  width="7" height="7" className="fill-gray-400" />
        <rect x="7"  y="21" width="7" height="7" className="fill-gray-400" />
        <rect x="7"  y="7"  width="7" height="7" className="fill-gray-400" />
        <rect x="14"        width="7" height="7" className="fill-gray-400" />
      </svg>
    ),
    count: "03",
    heading: "Operational signals",
    description: "Progress, risk, and dependencies remain visible through a small set of consistent signals that surface issues early and trigger action.",
  },
  {
    svg: (
      <svg width="35" height="21" viewBox="0 0 35 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7"  y="14" width="7" height="7" className="fill-gray-400" />
        <rect x="21" y="7"  width="7" height="7" className="fill-gray-400" />
        <rect x="14" y="14" width="7" height="7" className="fill-gray-400" />
        <rect x="28" y="7"  width="7" height="7" className="fill-gray-400" />
        <rect       y="14"  width="7" height="7" className="fill-gray-400" />
        <rect               width="7" height="7" className="fill-gray-400" />
        <rect x="7"  y="7"  width="7" height="7" className="fill-gray-400" />
        <rect x="14"        width="7" height="7" className="fill-gray-400" />
      </svg>
    ),
    count: "04",
    heading: "Built in security",
    description: "Risk consideration stays embedded in planning and execution workflows, which reduces exposure and prevents last minute controls or reactive fixes.",
  },
];

// ── HowWeOperate ──────────────────────────────────────────────────────────────
export default function HowWeOperate() {
  return (
    <section className="mx-10 xl:mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

      {/* ══ DESKTOP lg+ ══ */}
      <div className="hidden lg:flex items-start gap-16 xl:gap-24">

        {/* Left: image with particle hover */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-shrink-0 flex items-center justify-center"
        >
          <ParticleImage
            src="/HowWeOperate.png"
            alt="How We Operate"
            width={550}
            height={550}
            className="w-[420px] xl:w-[500px]"
          />
        </motion.div>

        {/* Right: text + cards */}
        <div className="flex flex-col justify-between gap-10 flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <Heading text="How We Operate" />
            <p className="font-light text-3xl xl:text-4xl text-white leading-tight">
              Control is designed in,<br />
              not enforced later
            </p>
            <p className="text-gray-100 font-light max-w-lg">
              Ascella establishes governance, accountability, and measurement before execution begins—ensuring delivery remains controlled, predictable, and aligned as organisations scale.
            </p>
          </motion.div>

          <ul className="grid grid-cols-2 gap-5">
            {points.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                className="flex flex-col gap-2.5 bg-gray-500 p-5 xl:p-6 rounded-2xl"
              >
                <div className="flex justify-between w-full items-start">
                  <div aria-hidden="true">{point.svg}</div>
                  <span className="text-xl font-thin">{point.count}</span>
                </div>
                <h4 className="leading-tight font-light text-xl xl:text-2xl">{point.heading}</h4>
                <p className="text-gray-300 text-sm xl:text-base">{point.description}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* ══ MOBILE <lg ══ */}
      <div className="flex flex-col gap-6 lg:hidden">

        {/* Heading block */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-3"
        >
          <Heading text="How We Operate" />
          <p className="font-light text-3xl text-white leading-tight">
            Control is built before<br />
            work begins
          </p>
          <p className="text-gray-100 font-light text-sm">
            Ascella establishes governance, accountability, and measurement before execution begins—ensuring delivery remains controlled, predictable, and aligned as organisations scale.
          </p>
        </motion.div>

        {/* First two cards */}
        <ul className="flex flex-col gap-4">
          {points.slice(0, 2).map((point, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="flex flex-col gap-2 bg-gray-500 p-5 rounded-2xl"
            >
              <div className="flex justify-between w-full items-start">
                <div aria-hidden="true">{point.svg}</div>
                <span className="text-lg font-thin">{point.count}</span>
              </div>
              <h4 className="leading-tight font-light text-xl">{point.heading}</h4>
              <p className="text-gray-300 text-sm">{point.description}</p>
            </motion.li>
          ))}
        </ul>

        {/* Image with particle hover — mobile center */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center"
        >
          <ParticleImage
            src="/HowWeOperate.png"
            alt="How We Operate"
            width={400}
            height={400}
            className="w-full max-w-xs sm:max-w-sm"
          />
        </motion.div>

        {/* Last two cards */}
        <ul className="flex flex-col gap-4">
          {points.slice(2).map((point, index) => (
            <motion.li
              key={index + 2}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="flex flex-col gap-2 bg-gray-500 p-5 rounded-2xl"
            >
              <div className="flex justify-between w-full items-start">
                <div aria-hidden="true">{point.svg}</div>
                <span className="text-lg font-thin">{point.count}</span>
              </div>
              <h4 className="leading-tight font-light text-xl">{point.heading}</h4>
              <p className="text-gray-300 text-sm">{point.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>

    </section>
  );
}