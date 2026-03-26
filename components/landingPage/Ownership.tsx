"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, type Variants } from "motion/react";
import PartialOutlineBtn from "../btns/PartialOutlineBtn";
import PlusHeading from "../headings/Heading";
import SecurityWaveSVG from "./SecurityWave";
import TechnologyExecution from "./TechonologyExecution";
import RevenueEnablement from "./Revenue";
import WorkforceReadinessSVG from "./WorkforceReadinessSVG";

function IsometricHoverGrid({ cellW = 100, cellH = 60, interactive = true }: { cellW?: number; cellH?: number; interactive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);
  const cellCenter = (col: number, row: number, oX: number, oY: number) => ({ x: oX + col * cellW + (row % 2 === 0 ? 0 : cellW / 2), y: oY + row * (cellH / 2) });
  const inDiamond = (px: number, py: number, cx: number, cy: number) => Math.abs(px - cx) / (cellW / 2) + Math.abs(py - cy) / (cellH / 2) <= 1;
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const onMove = (e: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    if (interactive) { canvas.addEventListener('mousemove', onMove); canvas.addEventListener('mouseleave', onLeave); }
    const alphaMap = new Map<string, number>();
    const loop = () => {
      const W = canvas.width, H = canvas.height; ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const cols = Math.ceil(W / cellW) + 2, rows = Math.ceil(H / (cellH / 2)) + 2;
      const offsetX = -cellW / 2, offsetY = -cellH / 2;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const { x: cx, y: cy } = cellCenter(col, row, offsetX, offsetY);
          const key = `${col},${row}`;
          const hovered = interactive ? inDiamond(mx, my, cx, cy) : false;
          const target = hovered ? 1 : 0;
          const current = (alphaMap.get(key) ?? 0) + (target - (alphaMap.get(key) ?? 0)) * 0.1;
          alphaMap.set(key, current);
          ctx.beginPath(); ctx.moveTo(cx, cy - cellH / 2); ctx.lineTo(cx + cellW / 2, cy); ctx.lineTo(cx, cy + cellH / 2); ctx.lineTo(cx - cellW / 2, cy); ctx.closePath();
          ctx.strokeStyle = `rgba(255,255,255,${0.06 + current * 0.12})`; ctx.lineWidth = 0.5; ctx.stroke();
          if (current > 0.005) { ctx.fillStyle = `rgba(163,163,163,${current * 0.25})`; ctx.fill(); }
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener('resize', resize); if (interactive) { canvas.removeEventListener('mousemove', onMove); canvas.removeEventListener('mouseleave', onLeave); } if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [cellW, cellH, interactive]);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: interactive ? 'auto' : 'none', cursor: interactive ? 'crosshair' : 'default' }} />;
}

interface IsoBoxProps { src?: string; cellW: number; cellH: number; col: number; row: number; opacity?: number; }
const IsoBox: React.FC<IsoBoxProps> = ({ src = '/vector 55.png', cellW, cellH, col, row, opacity = 0.9 }) => {
  const offsetX = -cellW / 2, offsetY = -cellH / 2;
  const cx = offsetX + col * cellW + (row % 2 === 0 ? 0 : cellW / 2);
  const cy = offsetY + row * (cellH / 2);
  return <img src={src} alt="" style={{ position: 'absolute', left: cx, top: cy, width: cellW, height: cellH, transform: 'translate(-50%, -50%)', objectFit: 'fill', opacity, pointerEvents: 'none', mixBlendMode: 'screen', zIndex: 10 }} />;
};

const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as any } } };
const fadeUpDelayed: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as any, delay: 0.2 } } };
const SPACING = 3, THRESHOLD = 15, RIPPLE_RADIUS = 120;

function RippleCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null), mouseRef = useRef({ x: -9999, y: -9999 }), ripplesRef = useRef<{ x: number; y: number; t: number; strength: number }[]>([]), particlesRef = useRef<{ x: number; y: number; baseY: number; vy: number; dy: number; size: number; currentAlpha: number }[]>([]), rafRef = useRef<number | null>(null), lastMouseRef = useRef({ x: -9999, y: -9999 });
  const buildParticles = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas || !imgEl) return;
    const rect = canvas.getBoundingClientRect(); canvas.width = rect.width; canvas.height = rect.height;
    const W = canvas.width, H = canvas.height; if (W === 0 || H === 0) return;
    const off = document.createElement("canvas"); off.width = W; off.height = H;
    const offCtx = off.getContext("2d")!;
    try { offCtx.drawImage(imgEl, 0, 0, W, H); const { data } = offCtx.getImageData(0, 0, W, H); const pts: typeof particlesRef.current = []; for (let y = 0; y < H; y += SPACING) for (let x = 0; x < W; x += SPACING) { const i = (y * W + x) * 4, b = (data[i] + data[i + 1] + data[i + 2]) / 3; if (b > THRESHOLD) pts.push({ x, y, baseY: y, vy: 0, dy: 0, size: Math.random() * 0.8 + 0.4, currentAlpha: (b / 255) * 0.85 }); } particlesRef.current = pts; } catch { particlesRef.current = []; }
  }, [imgEl]);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d")!;
    const loop = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); const mx = mouseRef.current.x, my = mouseRef.current.y; const moved = Math.sqrt((mx - lastMouseRef.current.x) ** 2 + (my - lastMouseRef.current.y) ** 2); if (moved > 4 && mx > 0) { ripplesRef.current.push({ x: mx, y: my, t: 0, strength: Math.min(moved / 8, 3) }); lastMouseRef.current = { x: mx, y: my }; } ripplesRef.current = ripplesRef.current.filter(r => r.t < 80); for (const r of ripplesRef.current) r.t++; for (const p of particlesRef.current) { let fy = 0; for (const r of ripplesRef.current) { const dx = p.x - r.x, dy = p.baseY - r.y, dist = Math.sqrt(dx * dx + dy * dy); const rr = r.t * 3.5, rw = 40, dfr = Math.abs(dist - rr); if (dfr < rw && dist < RIPPLE_RADIUS + rr) { const wave = Math.cos((dfr / rw) * Math.PI * 0.5), decay = Math.max(0, 1 - r.t / 70); fy += (dist < rr ? -1 : 1) * wave * decay * r.strength * 6; } } p.vy += fy * 0.4 + (-p.dy) * 0.18; p.vy *= 0.80; p.dy += p.vy; p.dy = Math.max(-18, Math.min(18, p.dy)); const drawY = p.baseY + p.dy, da = Math.min(1, p.currentAlpha + (Math.abs(p.dy) / 18) * 0.5); if (Math.abs(p.dy) > 1) { ctx.beginPath(); ctx.arc(p.x, drawY, p.size * (1 + Math.abs(p.dy) / 8), 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${da * 0.2})`; ctx.fill(); } ctx.beginPath(); ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${da})`; ctx.fill(); } rafRef.current = requestAnimationFrame(loop); };
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; lastMouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMove); canvas.addEventListener("mouseleave", onLeave);
    const ro = new ResizeObserver(buildParticles); ro.observe(canvas);
    if (imgEl) { if (imgEl.complete) buildParticles(); else imgEl.addEventListener("load", buildParticles); }
    rafRef.current = requestAnimationFrame(loop);
    return () => { canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave); if (rafRef.current) cancelAnimationFrame(rafRef.current); ro.disconnect(); if (imgEl) imgEl.removeEventListener("load", buildParticles); };
  }, [buildParticles, imgEl]);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "auto", zIndex: 10, cursor: "crosshair" }} />;
}

const RADIUS = 80, LERP = 0.13;
function ParticleCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null), mouseRef = useRef({ x: -9999, y: -9999 }), particlesRef = useRef<{ x: number; y: number; baseAlpha: number; currentAlpha: number; size: number }[]>([]), rafRef = useRef<number | null>(null);
  const buildParticles = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas || !imgEl) return;
    const rect = canvas.getBoundingClientRect(); canvas.width = rect.width; canvas.height = rect.height;
    const W = canvas.width, H = canvas.height; if (W === 0 || H === 0) return;
    const off = document.createElement("canvas"); off.width = W; off.height = H; const offCtx = off.getContext("2d")!;
    try { offCtx.drawImage(imgEl, 0, 0, W, H); const { data } = offCtx.getImageData(0, 0, W, H); const pts: typeof particlesRef.current = []; for (let y = 0; y < H; y += SPACING) for (let x = 0; x < W; x += SPACING) { const i = (y * W + x) * 4, b = (data[i] + data[i + 1] + data[i + 2]) / 3; if (b > THRESHOLD) pts.push({ x, y, baseAlpha: 0, currentAlpha: 0, size: Math.random() * 0.8 + 0.4 }); } particlesRef.current = pts; } catch { particlesRef.current = []; }
  }, [imgEl]);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d")!;
    const loop = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); const mx = mouseRef.current.x, my = mouseRef.current.y; for (const p of particlesRef.current) { const dx = p.x - mx, dy = p.y - my, dist = Math.sqrt(dx * dx + dy * dy), t = Math.max(0, 1 - dist / RADIUS), ease = t * t * (3 - 2 * t); p.currentAlpha += (ease - p.currentAlpha) * LERP; if (p.currentAlpha < 0.005) continue; if (ease > 0.03) { ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (1 + ease * 5), 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${p.currentAlpha * 0.22})`; ctx.fill(); } ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${Math.min(1, p.currentAlpha)})`; ctx.fill(); } rafRef.current = requestAnimationFrame(loop); };
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMove); canvas.addEventListener("mouseleave", onLeave);
    const ro = new ResizeObserver(buildParticles); ro.observe(canvas);
    if (imgEl) { if (imgEl.complete) buildParticles(); else imgEl.addEventListener("load", buildParticles); }
    rafRef.current = requestAnimationFrame(loop);
    return () => { canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave); if (rafRef.current) cancelAnimationFrame(rafRef.current); ro.disconnect(); if (imgEl) imgEl.removeEventListener("load", buildParticles); };
  }, [buildParticles, imgEl]);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "auto", zIndex: 10, cursor: "crosshair" }} />;
}

function ParticleImage({ src, alt, className, useRipple = false }: { src: string; alt: string; className?: string; useRipple?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  useEffect(() => { const el = wrapRef.current?.querySelector("img") as HTMLImageElement | null; if (el) setImgEl(el); }, []);
  return (
    <div ref={wrapRef} style={{ position: "relative", display: "inline-block" }} className={className}>
      <Image src={src} alt={alt} width={550} height={550} className="opacity-90 object-contain w-full h-full" crossOrigin="anonymous" />
      {useRipple ? <RippleCanvas imgEl={imgEl} /> : <ParticleCanvas imgEl={imgEl} />}
    </div>
  );
}


function DesktopScroll({
  sections,
  activeIndex,
  setActiveIndex,
  goToRef,
}: {
  sections: any[];
  activeIndex: number;
  setActiveIndex: (n: number) => void;
  goToRef: React.MutableRefObject<((i: number) => void) | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (el) => el === entry.target
            );
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      {
        threshold: [0.3, 0.6, 0.9], // IMPORTANT
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    goToRef.current = (i: number) => {
      const el = sectionRefs.current[i];
      if (!el) return;

      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {sections.map((section, index) => (
        <div
          key={section.title}
          data-slide
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          className="sticky top-0 h-screen flex items-center bg-black"
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 px-10">

            {/* LEFT CONTENT */}
            <div className="lg:max-w-xl">
              <h2 className="text-[24px] lg:text-[36px] font-light mb-4">
                {section.title}
              </h2>
              <p className="text-b1 text-gray-300">
                {section.description}
              </p>
            </div>

            {/* RIGHT VISUAL */}
            <div className="hidden lg:flex items-center justify-center">
              {section.svgComponent ? (
                section.svgComponent
              ) : section.image ? (
                <ParticleImage src={section.image} alt={section.title} />
              ) : null}
            </div>

            <div
            className="hidden md:block lg:hidden "
             style={{ width: '68vw', height: '56vw', maxWidth: 400, maxHeight: 240, flexShrink: 0 }}>
                  {section.svgComponent ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {section.svgComponent}
                    </div>
                  ) : section.image ? (
                    <ParticleImage src={section.image} alt={section.title} useRipple={false} className="w-full h-full" />
                  ) : null}
                </div>

          </div>
        </div>
      ))}
    </div>
  );
}

function Sidebar({
  sections,
  activeIndex,
  setActiveIndex,
  scrollToSection,
}: {
  sections: any[];
  activeIndex: number;
  setActiveIndex: (n: number) => void;
  scrollToSection: React.MutableRefObject<((i: number) => void) | null>;
}) {
  return (
    <aside className="sticky top-0 h-screen pl-10  flex flex-col bg-gray-500 border-r border-color">
      <div className="pt-[clamp(3.5rem,8vh,6rem)]">
        <PlusHeading text="OWNERSHIP" />
      </div>

      <ul className="mt-20 space-y-4">
        {sections.map((item, idx) => (
          <li
            key={idx}
            onClick={() => scrollToSection.current?.(idx)}
            className={`text-[16px] uppercase cursor-pointer transition ${activeIndex === idx
              ? "text-white"
              : "text-gray-300 hover:text-gray-200 hover:scale-105"
              }`}
          >
            {item.title}
          </li>
        ))}
      </ul>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-[200px] h-[100px] overflow-hidden">
          <IsometricHoverGrid cellW={80} cellH={48} interactive />
          <IsoBox cellW={80} cellH={48} col={1} row={2} opacity={0.55} />
          <IsoBox cellW={80} cellH={48} col={2} row={2} opacity={0.9} />
        </div>
      </div>

      <div className="mb-12">
        <Link href="/execution-arms">
          <PartialOutlineBtn text="Explore Execution Arms" bgColor="bg-white" textColor="text-black" borderColor="border-white" />
        </Link>
      </div>
    </aside>
  );
}

// ─── Ownership (main export) ──────────────────────────────────────────────────
export default function Ownership() {
  const [activeIndex, setActiveIndex] = useState(0);
  const goToRef = useRef<((i: number) => void) | null>(null);
  const resetRef = useRef<(() => void) | null>(null);
  const sectionEl = useRef<HTMLElement>(null);


  const sections: { title: string; description: string; tag?: string; image?: string; svgComponent?: React.ReactNode }[] = [
    { title: "Security & Risk Posture", description: "Security and risk posture focuses on keeping organisational risk visible and controlled. Security decisions link directly to business priorities and acceptable risk levels. Each control has a clear owner, review cycle, and response plan. This reduces surprises and limits the impact of incidents when issues occur.", svgComponent: <SecurityWaveSVG /> },
    { title: "Technology Execution", description: "Technology execution ensures systems work reliably as change increases. Platforms follow clear build, release, and run standards. Ownership stays consistent across development and operations to avoid gaps. This keeps delivery steady and reduces failures during growth.", image: "TechonologyExecution.svg" },
    { title: "Workforce Readiness", description: "Workforce readiness prepares teams for real operating conditions. Roles and escalation paths stay clear before pressure hits. Training reflects actual scenarios instead of theory. Teams respond faster and make better decisions during incidents.", svgComponent: <WorkforceReadinessSVG /> },
    { title: "Operational Control", description: "Operational control brings structure to daily execution. Decisions follow defined paths instead of informal coordination. Signals focus on risk, progress, and dependencies. Work becomes predictable and less reactive over time.", image: "/Operational1.png" },
    { title: "Revenue Enablement", description: "Revenue enablement connects execution quality to business results. Technical priorities reflect revenue impact and customer trust. Launches follow readiness checks and clear success measures. Growth stays protected as execution becomes disciplined.", svgComponent: <RevenueEnablement /> },
  ];


  return (
    <section ref={sectionEl} className="relative my-20 md:border-y border-color">

      <div className="mx-10 lg:mx-20 xl:mx-24 relative">

        {/* ══ DESKTOP lg+ ══ */}
        <div className="hidden md:grid grid-cols-[200px_1fr] lg:grid-cols-[400px_1fr] border-x border-color">

          {/* LEFT */}
          <div >
            <Sidebar
              sections={sections}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              scrollToSection={goToRef}
            />
          </div>

          <DesktopScroll
            sections={sections}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            goToRef={goToRef}
          />
        </div>

        <div className="md:hidden">
          <div className="w-full px-10 mb-10 flex justify-center">
            <PlusHeading text="OWNERSHIP" />
          </div>
          <div className="flex flex-col gap-8">
            {sections.map((item, index) => (
              <div
                key={item.title}
                className="border border-color p-4 flex flex-col items-center justify-center gap-2 rounded-xl"
              >
                <div style={{ width: '68vw', height: '56vw', maxWidth: 280, maxHeight: 220, flexShrink: 0 }}>
                  {item.svgComponent ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.svgComponent}
                    </div>
                  ) : item.image ? (
                    <ParticleImage src={item.image} alt={item.title} useRipple={false} className="w-full h-full" />
                  ) : null}
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-light tracking-tight text-xl mb-3 leading-snug">{item.title}</h3>
                  <p className="text-white/50 text-center leading-relaxed text-[12px]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}