"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import PartialOutlineBtn from "../btns/PartialOutlineBtn";
import PlusHeading from "../headings/Heading";
import SecurityWaveSVG from "./SecurityWave";
import TechnologyExecution from "./TechonologyExecution";
import RevenueEnablement from "./Revenue";


// Image fades up on enter
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};
const fadeUpDelayed: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut", delay: 0.2 } },
};

const SPACING = 3;
const THRESHOLD = 15;
const RIPPLE_RADIUS = 120;

// ── RippleCanvas ──────────────────────────────────────────────────────────────
function RippleCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const ripplesRef   = useRef<{ x: number; y: number; t: number; strength: number }[]>([]);
  const particlesRef = useRef<{ x: number; y: number; baseY: number; vy: number; dy: number; size: number; currentAlpha: number }[]>([]);
  const rafRef       = useRef<number | null>(null);
  const lastMouseRef = useRef({ x: -9999, y: -9999 });

  const buildParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgEl) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width; canvas.height = rect.height;
    const W = canvas.width, H = canvas.height;
    if (W === 0 || H === 0) return;
    const off = document.createElement("canvas");
    off.width = W; off.height = H;
    const offCtx = off.getContext("2d")!;
    try {
      offCtx.drawImage(imgEl, 0, 0, W, H);
      const { data } = offCtx.getImageData(0, 0, W, H);
      const pts: typeof particlesRef.current = [];
      for (let y = 0; y < H; y += SPACING)
        for (let x = 0; x < W; x += SPACING) {
          const i = (y * W + x) * 4;
          const b = (data[i] + data[i+1] + data[i+2]) / 3;
          if (b > THRESHOLD) pts.push({ x, y, baseY: y, vy: 0, dy: 0, size: Math.random()*0.8+0.4, currentAlpha: (b/255)*0.85 });
        }
      particlesRef.current = pts;
    } catch { particlesRef.current = []; }
  }, [imgEl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const moved = Math.sqrt((mx - lastMouseRef.current.x)**2 + (my - lastMouseRef.current.y)**2);
      if (moved > 4 && mx > 0) { ripplesRef.current.push({ x: mx, y: my, t: 0, strength: Math.min(moved/8, 3) }); lastMouseRef.current = { x: mx, y: my }; }
      ripplesRef.current = ripplesRef.current.filter(r => r.t < 80);
      for (const r of ripplesRef.current) r.t++;
      for (const p of particlesRef.current) {
        let fy = 0;
        for (const r of ripplesRef.current) {
          const dx = p.x-r.x, dy = p.baseY-r.y, dist = Math.sqrt(dx*dx+dy*dy);
          const rr = r.t*3.5, rw = 40, dfr = Math.abs(dist-rr);
          if (dfr < rw && dist < RIPPLE_RADIUS+rr) {
            const wave = Math.cos((dfr/rw)*Math.PI*0.5), decay = Math.max(0,1-r.t/70);
            fy += (dist < rr ? -1:1) * wave * decay * r.strength * 6;
          }
        }
        p.vy += fy*0.4 + (-p.dy)*0.18; p.vy *= 0.80; p.dy += p.vy; p.dy = Math.max(-18, Math.min(18, p.dy));
        const drawY = p.baseY+p.dy, da = Math.min(1, p.currentAlpha+(Math.abs(p.dy)/18)*0.5);
        if (Math.abs(p.dy) > 1) { ctx.beginPath(); ctx.arc(p.x, drawY, p.size*(1+Math.abs(p.dy)/8), 0, Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${da*0.2})`; ctx.fill(); }
        ctx.beginPath(); ctx.arc(p.x, drawY, p.size, 0, Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${da})`; ctx.fill();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX-r.left, y: e.clientY-r.top }; };
    const onLeave = () => { mouseRef.current = { x:-9999, y:-9999 }; lastMouseRef.current = { x:-9999, y:-9999 }; };
    canvas.addEventListener("mousemove", onMove); canvas.addEventListener("mouseleave", onLeave);
    const ro = new ResizeObserver(buildParticles); ro.observe(canvas);
    if (imgEl) { if (imgEl.complete) buildParticles(); else imgEl.addEventListener("load", buildParticles); }
    rafRef.current = requestAnimationFrame(loop);
    return () => { canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave); if (rafRef.current) cancelAnimationFrame(rafRef.current); ro.disconnect(); if (imgEl) imgEl.removeEventListener("load", buildParticles); };
  }, [buildParticles, imgEl]);

  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"auto", zIndex:10, cursor:"crosshair" }} />;
}

// ── ParticleCanvas ────────────────────────────────────────────────────────────
const RADIUS = 80, LERP = 0.13;

function ParticleCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<{ x: number; y: number; baseAlpha: number; currentAlpha: number; size: number }[]>([]);
  const rafRef = useRef<number | null>(null);

  const buildParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgEl) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width; canvas.height = rect.height;
    const W = canvas.width, H = canvas.height;
    if (W === 0 || H === 0) return;
    const off = document.createElement("canvas"); off.width = W; off.height = H;
    const offCtx = off.getContext("2d")!;
    try {
      offCtx.drawImage(imgEl, 0, 0, W, H);
      const { data } = offCtx.getImageData(0, 0, W, H);
      const pts: typeof particlesRef.current = [];
      for (let y = 0; y < H; y += SPACING) for (let x = 0; x < W; x += SPACING) { const i=(y*W+x)*4, b=(data[i]+data[i+1]+data[i+2])/3; if (b>THRESHOLD) pts.push({ x, y, baseAlpha:0, currentAlpha:0, size:Math.random()*0.8+0.4 }); }
      particlesRef.current = pts;
    } catch { particlesRef.current = []; }
  }, [imgEl]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      for (const p of particlesRef.current) {
        const dx=p.x-mx, dy=p.y-my, dist=Math.sqrt(dx*dx+dy*dy), t=Math.max(0,1-dist/RADIUS), ease=t*t*(3-2*t);
        p.currentAlpha += (ease-p.currentAlpha)*LERP;
        if (p.currentAlpha < 0.005) continue;
        if (ease > 0.03) { ctx.beginPath(); ctx.arc(p.x,p.y,p.size*(1+ease*5),0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${p.currentAlpha*0.22})`; ctx.fill(); }
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${Math.min(1,p.currentAlpha)})`; ctx.fill();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    const onMove = (e: MouseEvent) => { const r=canvas.getBoundingClientRect(); mouseRef.current={x:e.clientX-r.left,y:e.clientY-r.top}; };
    const onLeave = () => { mouseRef.current={x:-9999,y:-9999}; };
    canvas.addEventListener("mousemove", onMove); canvas.addEventListener("mouseleave", onLeave);
    const ro = new ResizeObserver(buildParticles); ro.observe(canvas);
    if (imgEl) { if (imgEl.complete) buildParticles(); else imgEl.addEventListener("load", buildParticles); }
    rafRef.current = requestAnimationFrame(loop);
    return () => { canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave); if (rafRef.current) cancelAnimationFrame(rafRef.current); ro.disconnect(); if (imgEl) imgEl.removeEventListener("load", buildParticles); };
  }, [buildParticles, imgEl]);

  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"auto", zIndex:10, cursor:"crosshair" }} />;
}

function ParticleImage({ src, alt, className, useRipple=false }: { src:string; alt:string; className?:string; useRipple?:boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement|null>(null);
  useEffect(() => { const el = wrapRef.current?.querySelector("img") as HTMLImageElement|null; if (el) setImgEl(el); }, []);
  return (
    <div ref={wrapRef} style={{ position:"relative", display:"inline-block" }} className={className}>
      <Image src={src} alt={alt} width={550} height={550} className="opacity-90 object-contain w-full h-full" crossOrigin="anonymous" />
      {useRipple ? <RippleCanvas imgEl={imgEl} /> : <ParticleCanvas imgEl={imgEl} />}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// WORKFORCE READINESS — ANIMATED SVG
// ══════════════════════════════════════════════════════════════════════════════

const WF_ARROWS = [
  { id:"a01", x1:249.5, y1:137.0, x2:308.7, y2:103.1, pts:"305.2,101.3 309.4,103.0 307.3,107.1 304.5,102.3", dur:7.0, del:0.0  },
  { id:"a02", x1:259.5, y1:102.0, x2:210.4, y2:73.8,  pts:"211.4,78.4 210.2,73.4 215.2,72.2 212.4,78.1",     dur:6.0, del:0.9  },
  { id:"a03", x1:273.7, y1:39.8,  x2:273.7, y2:1.0,   pts:"270.2,3.3 273.7,0.1 277.2,3.3 273.7,1.2",         dur:5.0, del:1.7  },
  { id:"a04", x1:322.1, y1:137.0, x2:322.1, y2:89.3,  pts:"318.5,91.8 322.1,88.6 325.6,91.8 322.1,89.7",     dur:8.0, del:0.4  },
  { id:"a05", x1:289.8, y1:183.5, x2:273.6, y2:192.7, pts:"278.2,194.4 273.2,192.7 274.4,188.3 275.4,188.6", dur:6.0, del:2.2  },
  { id:"a06", x1:146.7, y1:166.0, x2:146.7, y2:141.3, pts:"143.2,143.8 146.7,140.6 150.2,143.8 146.7,141.7", dur:7.0, del:0.6  },
  { id:"a07", x1:199.1, y1:108.0, x2:199.1, y2:36.7,  pts:"195.6,39.5 199.1,36.3 202.7,39.5 199.1,37.4",     dur:9.0, del:1.3  },
  { id:"a08", x1:146.7, y1:31.7,  x2:111.4, y2:51.9,  pts:"115.6,53.6 110.9,51.9 112.1,47.5 111.7,51.6",     dur:7.0, del:0.3  },
  { id:"a09", x1:249.5, y1:195.4, x2:222.3, y2:178.4, pts:"226.8,177.9 222.2,178.0 223.8,182.7 223.4,178.8", dur:6.0, del:2.9  },
  { id:"a10", x1:313.0, y1:232.0, x2:344.8, y2:213.8, pts:"340.6,212.0 345.3,213.8 344.1,218.1 340.3,214.0", dur:7.0, del:1.8  },
  { id:"a11", x1:249.5, y1:268.5, x2:282.8, y2:288.0, pts:"278.3,288.4 283.0,288.2 281.5,283.2 278.6,287.3", dur:8.0, del:0.7  },
  { id:"a12", x1:26.4,  y1:253.9, x2:0.5,   y2:268.8, pts:"4.7,270.5 0.0,268.7 1.2,264.3 1.1,268.5",         dur:6.0, del:3.3  },
  { id:"a13", x1:372.5, y1:80.9,  x2:349.2, y2:65.2,  pts:"353.8,65.0 349.2,65.2 350.0,70.2 349.9,66.0",     dur:7.0, del:2.5  },
  { id:"a14", x1:473.3, y1:79.0,  x2:524.1, y2:49.9,  pts:"519.9,48.1 524.1,49.9 523.4,54.2 519.6,49.1",     dur:9.0, del:1.0  },
  { id:"a15", x1:473.3, y1:221.7, x2:463.1, y2:227.5, pts:"467.4,229.2 463.1,227.4 463.9,223.0 463.8,227.2", dur:5.0, del:3.6  },
  { id:"a16", x1:473.3, y1:221.7, x2:513.6, y2:198.9, pts:"509.4,196.8 513.6,198.9 511.9,202.7 509.1,197.8", dur:7.5, del:1.2  },
  { id:"a17", x1:473.3, y1:221.7, x2:626.9, y2:310.7, pts:"622.4,310.9 626.9,310.7 625.2,305.7 622.7,309.8", dur:11.0,del:2.1  },
  { id:"a18", x1:473.3, y1:142.3, x2:631.5, y2:51.1,  pts:"627.3,49.5 631.5,51.1 630.8,55.3 627.0,50.4",     dur:12.0,del:0.2  },
  { id:"a19", x1:388.6, y1:244.3, x2:490.1, y2:314.6, pts:"485.9,314.5 490.1,314.6 489.8,309.9 486.1,313.8", dur:10.0,del:2.7  },
  { id:"a20", x1:423.1, y1:224.4, x2:475.8, y2:254.9, pts:"471.3,255.6 475.8,254.9 475.1,250.4 471.6,254.5", dur:8.0, del:0.5  },
  { id:"a21", x1:313.0, y1:278.0, x2:313.0, y2:344.4, pts:"309.5,341.2 313.0,344.4 316.5,341.2 313.0,343.4", dur:7.0, del:4.0  },
  { id:"a22", x1:249.5, y1:268.5, x2:249.5, y2:338.3, pts:"246.0,335.1 249.5,338.3 253.0,335.1 249.5,337.3", dur:8.5, del:3.0  },
  { id:"a23", x1:202.1, y1:323.4, x2:202.1, y2:369.5, pts:"198.6,366.3 202.1,369.5 205.6,366.3 202.1,368.5", dur:6.5, del:1.5  },
  { id:"a24", x1:154.8, y1:296.1, x2:154.8, y2:332.3, pts:"151.3,329.1 154.8,332.3 158.3,329.1 154.8,331.3", dur:7.0, del:4.5  },
] as const;

function WorkforceReadinessSVG({ className }: { className?: string }) {
  const dist = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2-x1)**2 + (y2-y1)**2);

  return (
    <div className={className} style={{ position:"relative", display:"inline-block", width:"100%", height:"100%" }}>
      <style>{`
        @keyframes wf-line {
          0%          { stroke-dashoffset: var(--L); opacity: 0; }
          3%          { opacity: 1; }
          40%         { stroke-dashoffset: 0; opacity: 1; }
          52%         { stroke-dashoffset: 0; opacity: 1; }
          90%         { stroke-dashoffset: calc(-1 * var(--L)); opacity: 1; }
          95%, 100%   { stroke-dashoffset: calc(-1 * var(--L)); opacity: 0; }
        }
        @keyframes wf-head {
          0%, 38%     { opacity: 0; }
          43%         { opacity: 1; }
          52%         { opacity: 1; }
          88%, 100%   { opacity: 0; }
        }
      `}</style>
      <svg viewBox="0 0 632 370" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"100%" }}>
        <path fill="white" d="
M195.088 138.247L194.839 137.813L146.46 165.677L146.71 166.111L146.959 166.544L195.338 138.68L195.088 138.247Z
M146.71 166.111H146.21V243.819H146.71H147.21V166.111H146.71Z
M313.01 231.951L313.259 231.518L249.763 194.946L249.513 195.38L249.264 195.813L312.76 232.384L313.01 231.951Z
M195.088 226.726L194.839 226.293L185.767 231.518L186.017 231.951L186.267 232.384L195.338 227.16L195.088 226.726Z
M249.513 195.38L249.264 194.946L194.839 226.293L195.088 226.726L195.338 227.16L249.763 195.813L249.513 195.38Z
M249.513 195.38H250.013V138.247H249.513H249.013V195.38H249.513Z
M195.088 138.247H194.588V169.593H195.088H195.588V138.247H195.088Z
M195.088 169.593H194.588V226.726H195.088H195.588V169.593H195.088Z
M249.513 138.247L249.264 137.813L194.839 169.16L195.088 169.593L195.338 170.027L249.763 138.68L249.513 138.247Z
M170.899 124.315L170.649 124.748L194.839 138.68L195.088 138.247L195.338 137.813L171.148 123.882L170.899 124.315Z
M170.899 124.315L171.148 124.748L199.369 108.494L199.119 108.061L198.87 107.628L170.649 123.882L170.899 124.315Z
M249.513 137.086L249.763 137.519L309.161 103.308L308.911 102.875L308.662 102.442L249.264 136.652L249.513 137.086Z
M199.119 108.061L198.87 108.494L242.209 133.456L242.458 133.022L242.708 132.589L199.369 107.628L199.119 108.061Z
M242.458 133.022L242.209 133.456L249.264 137.519L249.513 137.086L249.763 136.652L242.708 132.589L242.458 133.022Z
M242.458 133.022H242.958V57.811H242.458H241.958V133.022H242.458Z
M273.703 39.8156L273.453 40.2489L289.579 49.5369L289.829 49.1036L290.078 48.6703L273.952 39.3824L273.703 39.8156Z
M289.829 49.1036L289.579 48.6703L259.343 66.0852L259.592 66.5185L259.842 66.9518L290.078 49.5369L289.829 49.1036Z
M242.458 57.811L242.708 58.2443L243.716 57.6638L243.466 57.2305L243.217 56.7973L242.209 57.3778L242.458 57.811Z
M243.466 57.2305L243.716 57.6638L273.952 40.2489L273.703 39.8156L273.453 39.3824L243.217 56.7973L243.466 57.2305Z
M259.592 66.5185L259.842 66.0852L243.716 56.7973L243.466 57.2305L243.217 57.6638L259.343 66.9518L259.592 66.5185Z
M259.592 66.5185H259.092V102.05H259.592H260.092V66.5185H259.592Z
M259.592 102.05H259.092V169.593H259.592H260.092V102.05H259.592Z
M259.592 102.05L259.842 101.617L210.962 73.4646L210.713 73.8978L210.463 74.3311L259.343 102.484L259.592 102.05Z
M273.703 39.8156H274.203V0.5H273.703H273.203V39.8156H273.703Z
M289.829 183.492L289.579 183.059L273.453 192.347L273.703 192.78L273.952 193.213L290.078 183.925L289.829 183.492Z
M289.829 49.1036H289.329V183.492H289.829H290.329V49.1036H289.829Z
M289.829 183.492L290.078 183.925L322.33 165.349L322.081 164.916L321.831 164.483L289.579 183.059L289.829 183.492Z
M322.081 209.634H322.581V164.916H322.081H321.581V209.634H322.081Z
M322.081 88.9796H321.581V137.086H322.081H322.581V88.9796H322.081Z
M322.081 137.086H321.581V209.634H322.081H322.581V137.086H322.081Z
M322.081 164.916H322.581V137.086H322.081H321.581V164.916H322.081Z
M322.081 137.086L322.33 137.519L372.724 108.494L372.475 108.061L372.225 107.628L321.831 136.652L322.081 137.086Z
M372.475 108.061H371.975V195.38H372.475H372.975V108.061H372.475Z
M372.475 195.38L372.734 194.952L322.339 164.488L322.081 164.916L321.822 165.344L372.216 195.807L372.475 195.38Z
M372.475 195.38L372.225 195.813L422.619 224.838L422.869 224.404L423.118 223.971L372.724 194.946L372.475 195.38Z
M322.081 283.031H321.581V307.162H322.081H322.581V283.031H322.081Z
M322.081 283.031L322.33 282.598L313.259 277.374L313.01 277.807L312.76 278.24L321.831 283.465L322.081 283.031Z
M313.01 277.807H313.51V231.951H313.01H312.51V277.807H313.01Z
M313.01 277.807H312.51V344.364H313.01H313.51V277.807H313.01Z
M249.513 268.522L249.763 268.955L313.259 232.384L313.01 231.951L312.76 231.518L249.264 268.089L249.513 268.522Z
M186.017 231.951L185.767 232.384L249.264 268.955L249.513 268.522L249.763 268.089L186.267 231.518L186.017 231.951Z
M249.513 268.522L249.264 268.955L282.524 288.112L282.773 287.679L283.023 287.245L249.763 268.089L249.513 268.522Z
M202.143 323.386H201.643V369.5H202.143H202.643V323.386H202.143Z
M202.143 323.386L202.393 322.952L155.022 295.669L154.773 296.102L154.523 296.535L201.894 323.819L202.143 323.386Z
M154.773 296.102H154.273V332.298H154.773H155.273V296.102H154.773Z
M249.513 296.102L249.264 295.669L201.894 322.952L202.143 323.386L202.393 323.819L249.763 296.535L249.513 296.102Z
M249.513 296.102H249.013V338.331H249.513H250.013V296.102H249.513Z
M249.513 268.522H249.013V296.102H249.513H250.013V268.522H249.513Z
M202.143 268.819L201.894 269.252L249.264 296.535L249.513 296.102L249.763 295.669L202.393 268.386L202.143 268.819Z
M186.017 278.107L186.267 278.54L202.393 269.252L202.143 268.819L201.894 268.386L185.767 277.674L186.017 278.107Z
M186.017 231.951H185.517V278.107H186.017H186.517V231.951H186.017Z
M146.71 243.819L146.46 244.252L163.917 254.307L164.166 253.873L164.416 253.44L146.959 243.386L146.71 243.819Z
M154.773 296.102L155.022 296.535L164.416 291.125L164.166 290.692L163.917 290.259L154.523 295.669L154.773 296.102Z
M164.166 290.692L164.416 291.125L186.267 278.54L186.017 278.107L185.767 277.674L163.917 290.259L164.166 290.692Z
M164.166 253.873H163.666V290.692H164.166H164.666V253.873H164.166Z
M164.166 253.873L163.917 253.44L95.0582 293.1L95.3077 293.533L95.5573 293.966L164.416 254.307L164.166 253.873Z
M95.3077 293.533L95.5573 293.1L26.6987 253.44L26.4491 253.873L26.1996 254.307L95.0582 293.966L95.3077 293.533Z
M26.4491 253.873L26.674 254.32L98.5563 218.124L98.3314 217.677L98.1065 217.231L26.2243 253.427L26.4491 253.873Z
M98.3314 217.677L98.0937 218.117L146.472 244.259L146.71 243.819L146.947 243.379L98.5691 217.237L98.3314 217.677Z
M26.4491 253.873L26.1996 253.44L0.250575 268.386L0.500122 268.819L0.74967 269.252L26.6987 254.307L26.4491 253.873Z
M146.71 243.819H147.21V141H146.71H146.21V243.819H146.71Z
M146.71 166.111L146.959 165.677L98.5809 137.813L98.3314 138.247L98.0818 138.68L146.46 166.544L146.71 166.111Z
M98.3314 138.247L98.5809 138.68L146.959 110.816L146.71 110.383L146.46 109.95L98.0818 137.813L98.3314 138.247Z
M146.71 110.383L146.46 110.816L170.649 124.748L170.899 124.315L171.148 123.882L146.959 109.95L146.71 110.383Z
M146.71 110.383H147.21V31.6689H146.71H146.21V110.383H146.71Z
M146.71 31.6689L146.46 31.2357L111.184 51.553L111.434 51.9863L111.683 52.4196L146.959 32.1022L146.71 31.6689Z
M199.119 108.061H199.619V36.6962H199.119H198.619V108.061H199.119Z
M249.513 137.086H249.013V195.38H249.513H250.013V137.086H249.513Z
M222.301 178.465L222.037 178.889L249.249 195.804L249.513 195.38L249.777 194.955L222.565 178.04L222.301 178.465Z
M313.01 231.951L313.259 232.384L345.025 214.089L344.775 213.655L344.526 213.222L312.76 231.518L313.01 231.951Z
M422.869 224.404L422.617 223.972L388.35 243.905L388.601 244.338L388.852 244.77L423.12 224.837L422.869 224.404Z
M388.601 244.338L388.35 243.905L321.829 282.599L322.081 283.031L322.332 283.464L388.852 244.77L388.601 244.338Z
M388.601 244.338H388.101V310.178H388.601H389.101V244.338H388.601Z
M388.601 244.338L388.318 244.75L490.114 314.613L490.397 314.2L490.68 313.788L388.884 243.925L388.601 244.338Z
M422.869 224.404L422.619 224.838L475.53 255.312L475.78 254.879L476.029 254.445L423.118 223.971L422.869 224.404Z
M422.869 224.404H423.369V108.061H422.869H422.369V224.404H422.869Z
M422.869 108.061L423.118 108.494L473.512 79.4693L473.263 79.0361L473.013 78.6028L422.619 107.628L422.869 108.061Z
M473.263 79.0361L473.514 78.6037L423.12 49.3347L422.869 49.767L422.618 50.1994L473.012 79.4684L473.263 79.0361Z
M372.475 80.936H371.975V108.061H372.475H372.975V80.936H372.475Z
M422.869 108.061L423.118 107.628L374.315 79.5189L374.065 79.9522L373.816 80.3855L422.619 108.494L422.869 108.061Z
M374.065 79.9522L374.315 79.5189L349.543 65.2514L349.294 65.6847L349.044 66.118L373.816 80.3855L374.065 79.9522Z
M422.869 49.767L422.606 49.3418L373.802 79.527L374.065 79.9522L374.328 80.3774L423.132 50.1923L422.869 49.767Z
M374.065 79.9522L373.802 79.527L372.212 80.5107L372.475 80.936L372.738 81.3612L374.328 80.3774L374.065 79.9522Z
M473.263 79.0361L473.512 79.4693L524.331 50.2003L524.081 49.767L523.831 49.3338L473.013 78.6028L473.263 79.0361Z
M473.263 221.699L473.013 221.266L462.935 227.071L463.184 227.504L463.434 227.937L473.512 222.132L473.263 221.699Z
M473.263 221.699L473.512 222.132L513.828 198.912L513.578 198.479L513.329 198.046L473.013 221.266L473.263 221.699Z
M473.263 221.699L473.013 222.132L626.635 310.612L626.885 310.178L627.134 309.745L473.512 221.266L473.263 221.699Z
M473.263 79.0361H472.763V142.268H473.263H473.763V79.0361H473.263Z
M473.263 142.268H472.763V221.699H473.263H473.763V142.268H473.263Z
M473.263 142.268L473.512 142.702L631.75 51.5637L631.5 51.1304L631.251 50.6972L473.013 141.835L473.263 142.268Z
M98.3314 138.247L98.0818 137.813L97.3296 138.247L98.0818 138.68L98.3314 138.247Z
"/>
        {WF_ARROWS.map(({ id, x1, y1, x2, y2, pts, dur, del }) => {
          const L = dist(x1, y1, x2, y2);
          return (
            <g key={id}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="0.75"
                style={{ strokeDasharray: L, strokeDashoffset: L, animation: `wf-line ${dur}s ${del}s infinite linear`, ["--L" as string]: L }} />
              <polygon points={pts} fill="white" style={{ opacity: 0, animation: `wf-head ${dur}s ${del}s infinite linear` }} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── OwnershipSection ─────────────────────────────────────────────────────────
function OwnershipSection({
  title, description, tag, image, svgComponent, isLast, index, setActiveIndex,
}: {
  title: string;
  description: string;
  tag?: string;
  image?: string;
  svgComponent?: React.ReactNode;
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
      className="relative flex flex-col"
      style={{ minHeight: "100vh", overflow: "visible" }}
    >
      {/* Image — fixed height block, overflow visible so animation doesn't clip */}
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="flex justify-center items-center lg:pt-16"
        style={{ height: "calc(100vh - 280px)", overflow: "visible", paddingTop: "2rem", paddingLeft: "2rem", paddingRight: "2rem" }}
      >
        {svgComponent ? (
          <div
            style={{
              width: "min(420px, 55vw)",
              height: "min(420px, calc(100vh - 320px))",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
            }}
          >
            {svgComponent}
          </div>
        ) : image ? (
          <ParticleImage
            src={image}
            alt={title}
            useRipple={false}
            className=""
            style={{
              width: "min(420px, 55vw)",
              height: "min(420px, calc(100vh - 320px))",
              flexShrink: 0,
            } as React.CSSProperties}
          />
        ) : null}
      </motion.div>

      {/* Content — sits below the image in the same viewport */}
      <motion.div
        variants={fadeUpDelayed} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full max-w-xl"
        style={{ padding: "1.5rem 2rem 2.5rem 3.5rem", flexShrink: 0 }}
      >
        <h3 className="font-light tracking-tight text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-5 lg:mb-6">
          {title}
        </h3>
        <p className="text-white/50 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4 lg:mb-5">
          {description}
        </p>
        {tag && <div className="text-xs sm:text-sm tracking-widest text-white/80">{tag}</div>}
      </motion.div>


    </div>
  );
}

// ─── Ownership (main export) ──────────────────────────────────────────────────
export default function Ownership() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sections: {
    title: string;
    description: string;
    tag?: string;
    image?: string;
    svgComponent?: React.ReactNode;
  }[] = [
    {
      title: "Security & Risk Posture",
      description: "Security and risk posture focuses on keeping organisational risk visible and controlled. Security decisions link directly to business priorities and acceptable risk levels. Each control has a clear owner, review cycle, and response plan. This reduces surprises and limits the impact of incidents when issues occur.",
      tag: "Resilience",
      svgComponent: <SecurityWaveSVG />,
    },
    {
      title: "Technology Execution",
      description: "Technology execution ensures systems work reliably as change increases. Platforms follow clear build, release, and run standards. Ownership stays consistent across development and operations to avoid gaps. This keeps delivery steady and reduces failures during growth.",
      tag: "Scalability",
      svgComponent: <TechnologyExecution />,
    },
    {
      title: "Workforce Readiness",
      description: "Workforce readiness prepares teams for real operating conditions. Roles and escalation paths stay clear before pressure hits. Training reflects actual scenarios instead of theory. Teams respond faster and make better decisions during incidents.",
      tag: "Alignment",
      svgComponent: <WorkforceReadinessSVG />,
    },
    {
      title: "Operational Control",
      description: "Operational control brings structure to daily execution. Decisions follow defined paths instead of informal coordination. Signals focus on risk, progress, and dependencies. Work becomes predictable and less reactive over time.",
      tag:"Governance",
      image: "/Operational1.png",
    },
    {
      title: "Revenue Enablement",
      description: "Revenue enablement connects execution quality to business results. Technical priorities reflect revenue impact and customer trust. Launches follow readiness checks and clear success measures. Growth stays protected as execution becomes disciplined.",
      tag: "Sustainability",
      svgComponent: <RevenueEnablement />,
    },
  ];

  const scrollToSection = (i: number) => {
    document.querySelectorAll("[data-ownership-section]")[i]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative">
      <div className="sticky top-0 z-50 h-px w-full mt-30 border-t border-color bg-black">
        <div className="mx-8 h-full" />
      </div>

      <div className="mx-auto w-full relative">

        {/* ══ DESKTOP lg+ ══ */}
        <div className="hidden lg:flex lg:flex-row relative">

          {/* Fixed-width left spacer col — 10% */}
          <div className="w-[10%] shrink-0 relative">
            <div className="sticky top-0 h-screen border-r border-color" />
          </div>

          {/* Sticky sidebar — 25% */}
          <div className="w-[25%] shrink-0 relative">
            {/* Grid border that spans full height */}
            <div className="absolute inset-0 border-r border-color pointer-events-none" />
            {/* Sticky content */}
            <aside className="sticky top-0 h-screen z-10 p-12 flex flex-col">
              <PlusHeading text="OWNERSHIP" />
              <ul className="mt-20 space-y-6">
                {sections.map((item, idx) => (
                  <li key={idx} onClick={() => scrollToSection(idx)}
                    className={`text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer ${activeIndex === idx ? "text-white font-medium" : "text-white/40 hover:text-white/70"}`}>
                    {item.title}
                  </li>
                ))}
              </ul>
              <div className="mt-auto "><PartialOutlineBtn text="Explore Responsibility" /></div>
            </aside>
          </div>

          {/* Scrollable main content — 55% */}
          <main className="w-[55%] shrink-0 relative z-10">
            <div className="absolute inset-0 border-r border-color pointer-events-none" />
            {sections.map((item, index) => (
              <div key={item.title} data-ownership-section>
                <OwnershipSection {...item} isLast={index === sections.length - 1} index={index} setActiveIndex={setActiveIndex} />
              </div>
            ))}
          </main>

          {/* Right spacer — 10% */}
          <div className="w-[10%] shrink-0" />
        </div>

        {/* ══ TABLET sm–lg ══ */}
        <div className="hidden sm:flex lg:hidden flex-row relative">
          {/* Sticky sidebar — 30% */}
          <div className="w-[30%] shrink-0 relative">
            <div className="absolute inset-0 border-r border-color pointer-events-none" />
            <aside className="sticky top-0 h-screen z-10 px-6 pt-10 pb-6 flex flex-col">
              <PlusHeading text="OWNERSHIP" />
              <ul className="mt-10 space-y-4">
                {sections.map((item, idx) => (
                  <li key={idx} onClick={() => scrollToSection(idx)}
                    className={`text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${activeIndex === idx ? "text-white font-medium" : "text-white/40 hover:text-white/70"}`}>
                    {item.title}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pb-8"><PartialOutlineBtn text="Explore More" /></div>
            </aside>
          </div>
          {/* Scrollable main — 70% */}
          <main className="w-[70%] shrink-0 relative z-10">
            {sections.map((item, index) => (
              <div key={item.title} data-ownership-section>
                <OwnershipSection {...item} isLast={index === sections.length - 1} index={index} setActiveIndex={setActiveIndex} />
              </div>
            ))}
          </main>
        </div>

        {/* ══ MOBILE <sm ══ */}
        <div className="sm:hidden">
          <div className="px-10 pt-8 pb-4 border-b border-white/10">
            <PlusHeading text="OWNERSHIP" />
          </div>
          <div className="py-2">
            {sections.map((item, index) => (
              <div key={item.title} data-ownership-section>
                <OwnershipSection {...item} isLast={index === sections.length - 1} index={index} setActiveIndex={setActiveIndex} />
              </div>
            ))}
          </div>
          <div className="px-10 pb-10"><PartialOutlineBtn text="Explore More" /></div>
        </div>

      </div>

      <div className="relative h-px w-full">
        <div className="mx-10 h-full bg-white/10" />
      </div>
    </section>
  );
}