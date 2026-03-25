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

function IsometricHoverGrid({ cellW = 100, cellH = 60, interactive = true }: { cellW?: number; cellH?: number; interactive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef    = useRef<number | null>(null);
  const cellCenter = (col: number, row: number, oX: number, oY: number) => ({ x: oX + col * cellW + (row % 2 === 0 ? 0 : cellW / 2), y: oY + row * (cellH / 2) });
  const inDiamond  = (px: number, py: number, cx: number, cy: number) => Math.abs(px - cx) / (cellW / 2) + Math.abs(py - cy) / (cellH / 2) <= 1;
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
          const target  = hovered ? 1 : 0;
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
    try { offCtx.drawImage(imgEl, 0, 0, W, H); const { data } = offCtx.getImageData(0, 0, W, H); const pts: typeof particlesRef.current = []; for (let y = 0; y < H; y += SPACING) for (let x = 0; x < W; x += SPACING) { const i = (y * W + x) * 4, b = (data[i] + data[i+1] + data[i+2]) / 3; if (b > THRESHOLD) pts.push({ x, y, baseY: y, vy: 0, dy: 0, size: Math.random()*0.8+0.4, currentAlpha: (b/255)*0.85 }); } particlesRef.current = pts; } catch { particlesRef.current = []; }
  }, [imgEl]);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d")!;
    const loop = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); const mx = mouseRef.current.x, my = mouseRef.current.y; const moved = Math.sqrt((mx - lastMouseRef.current.x)**2 + (my - lastMouseRef.current.y)**2); if (moved > 4 && mx > 0) { ripplesRef.current.push({ x: mx, y: my, t: 0, strength: Math.min(moved/8, 3) }); lastMouseRef.current = { x: mx, y: my }; } ripplesRef.current = ripplesRef.current.filter(r => r.t < 80); for (const r of ripplesRef.current) r.t++; for (const p of particlesRef.current) { let fy = 0; for (const r of ripplesRef.current) { const dx = p.x-r.x, dy = p.baseY-r.y, dist = Math.sqrt(dx*dx+dy*dy); const rr = r.t*3.5, rw = 40, dfr = Math.abs(dist-rr); if (dfr < rw && dist < RIPPLE_RADIUS+rr) { const wave = Math.cos((dfr/rw)*Math.PI*0.5), decay = Math.max(0,1-r.t/70); fy += (dist < rr ? -1:1) * wave * decay * r.strength * 6; } } p.vy += fy*0.4 + (-p.dy)*0.18; p.vy *= 0.80; p.dy += p.vy; p.dy = Math.max(-18, Math.min(18, p.dy)); const drawY = p.baseY+p.dy, da = Math.min(1, p.currentAlpha+(Math.abs(p.dy)/18)*0.5); if (Math.abs(p.dy) > 1) { ctx.beginPath(); ctx.arc(p.x, drawY, p.size*(1+Math.abs(p.dy)/8), 0, Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${da*0.2})`; ctx.fill(); } ctx.beginPath(); ctx.arc(p.x, drawY, p.size, 0, Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${da})`; ctx.fill(); } rafRef.current = requestAnimationFrame(loop); };
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

const RADIUS = 80, LERP = 0.13;
function ParticleCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null), mouseRef = useRef({ x: -9999, y: -9999 }), particlesRef = useRef<{ x: number; y: number; baseAlpha: number; currentAlpha: number; size: number }[]>([]), rafRef = useRef<number | null>(null);
  const buildParticles = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas || !imgEl) return;
    const rect = canvas.getBoundingClientRect(); canvas.width = rect.width; canvas.height = rect.height;
    const W = canvas.width, H = canvas.height; if (W === 0 || H === 0) return;
    const off = document.createElement("canvas"); off.width = W; off.height = H; const offCtx = off.getContext("2d")!;
    try { offCtx.drawImage(imgEl, 0, 0, W, H); const { data } = offCtx.getImageData(0, 0, W, H); const pts: typeof particlesRef.current = []; for (let y = 0; y < H; y += SPACING) for (let x = 0; x < W; x += SPACING) { const i=(y*W+x)*4, b=(data[i]+data[i+1]+data[i+2])/3; if (b>THRESHOLD) pts.push({ x, y, baseAlpha:0, currentAlpha:0, size:Math.random()*0.8+0.4 }); } particlesRef.current = pts; } catch { particlesRef.current = []; }
  }, [imgEl]);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d")!;
    const loop = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); const mx = mouseRef.current.x, my = mouseRef.current.y; for (const p of particlesRef.current) { const dx=p.x-mx, dy=p.y-my, dist=Math.sqrt(dx*dx+dy*dy), t=Math.max(0,1-dist/RADIUS), ease=t*t*(3-2*t); p.currentAlpha += (ease-p.currentAlpha)*LERP; if (p.currentAlpha < 0.005) continue; if (ease > 0.03) { ctx.beginPath(); ctx.arc(p.x,p.y,p.size*(1+ease*5),0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${p.currentAlpha*0.22})`; ctx.fill(); } ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${Math.min(1,p.currentAlpha)})`; ctx.fill(); } rafRef.current = requestAnimationFrame(loop); };
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
  const dist = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x2-x1)**2 + (y2-y1)**2);
  return (
    <div className={className} style={{ position:"relative", display:"inline-block", width:"100%", height:"100%" }}>
      <style>{`
        @keyframes wf-line { 0% { stroke-dashoffset: var(--L); opacity: 0; } 3% { opacity: 1; } 40% { stroke-dashoffset: 0; opacity: 1; } 52% { stroke-dashoffset: 0; opacity: 1; } 90% { stroke-dashoffset: calc(-1 * var(--L)); opacity: 1; } 95%, 100% { stroke-dashoffset: calc(-1 * var(--L)); opacity: 0; } }
        @keyframes wf-head { 0%, 38% { opacity: 0; } 43% { opacity: 1; } 52% { opacity: 1; } 88%, 100% { opacity: 0; } }
      `}</style>
      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"100%" }}>
        <path fill="white" d="M195.088 138.247L194.839 137.813L146.46 165.677L146.71 166.111L146.959 166.544L195.338 138.68L195.088 138.247ZM146.71 166.111H146.21V243.819H146.71H147.21V166.111H146.71ZM313.01 231.951L313.259 231.518L249.763 194.946L249.513 195.38L249.264 195.813L312.76 232.384L313.01 231.951ZM195.088 226.726L194.839 226.293L185.767 231.518L186.017 231.951L186.267 232.384L195.338 227.16L195.088 226.726ZM249.513 195.38L249.264 194.946L194.839 226.293L195.088 226.726L195.338 227.16L249.763 195.813L249.513 195.38ZM249.513 195.38H250.013V138.247H249.513H249.013V195.38H249.513ZM195.088 138.247H194.588V169.593H195.088H195.588V138.247H195.088ZM195.088 169.593H194.588V226.726H195.088H195.588V169.593H195.088ZM249.513 138.247L249.264 137.813L194.839 169.16L195.088 169.593L195.338 170.027L249.763 138.68L249.513 138.247ZM170.899 124.315L170.649 124.748L194.839 138.68L195.088 138.247L195.338 137.813L171.148 123.882L170.899 124.315ZM170.899 124.315L171.148 124.748L199.369 108.494L199.119 108.061L198.87 107.628L170.649 123.882L170.899 124.315ZM249.513 137.086L249.763 137.519L309.161 103.308L308.911 102.875L308.662 102.442L249.264 136.652L249.513 137.086ZM199.119 108.061L198.87 108.494L242.209 133.456L242.458 133.022L242.708 132.589L199.369 107.628L199.119 108.061ZM242.458 133.022L242.209 133.456L249.264 137.519L249.513 137.086L249.763 136.652L242.708 132.589L242.458 133.022ZM242.458 133.022H242.958V57.811H242.458H241.958V133.022H242.458ZM273.703 39.8156L273.453 40.2489L289.579 49.5369L289.829 49.1036L290.078 48.6703L273.952 39.3824L273.703 39.8156ZM289.829 49.1036L289.579 48.6703L259.343 66.0852L259.592 66.5185L259.842 66.9518L290.078 49.5369L289.829 49.1036ZM242.458 57.811L242.708 58.2443L243.716 57.6638L243.466 57.2305L243.217 56.7973L242.209 57.3778L242.458 57.811ZM243.466 57.2305L243.716 57.6638L273.952 40.2489L273.703 39.8156L273.453 39.3824L243.217 56.7973L243.466 57.2305ZM259.592 66.5185L259.842 66.0852L243.716 56.7973L243.466 57.2305L243.217 57.6638L259.343 66.9518L259.592 66.5185ZM259.592 66.5185H259.092V102.05H259.592H260.092V66.5185H259.592ZM259.592 102.05H259.092V169.593H259.592H260.092V102.05H259.592ZM259.592 102.05L259.842 101.617L210.962 73.4646L210.713 73.8978L210.463 74.3311L259.343 102.484L259.592 102.05ZM273.703 39.8156H274.203V0.5H273.703H273.203V39.8156H273.703ZM289.829 183.492L289.579 183.059L273.453 192.347L273.703 192.78L273.952 193.213L290.078 183.925L289.829 183.492ZM289.829 49.1036H289.329V183.492H289.829H290.329V49.1036H289.829ZM289.829 183.492L290.078 183.925L322.33 165.349L322.081 164.916L321.831 164.483L289.579 183.059L289.829 183.492ZM322.081 209.634H322.581V164.916H322.081H321.581V209.634H322.081ZM322.081 88.9796H321.581V137.086H322.081H322.581V88.9796H322.081ZM322.081 137.086H321.581V209.634H322.081H322.581V137.086H322.081ZM322.081 164.916H322.581V137.086H322.081H321.581V164.916H322.081ZM322.081 137.086L322.33 137.519L372.724 108.494L372.475 108.061L372.225 107.628L321.831 136.652L322.081 137.086ZM372.475 108.061H371.975V195.38H372.475H372.975V108.061H372.475ZM372.475 195.38L372.734 194.952L322.339 164.488L322.081 164.916L321.822 165.344L372.216 195.807L372.475 195.38ZM372.475 195.38L372.225 195.813L422.619 224.838L422.869 224.404L423.118 223.971L372.724 194.946L372.475 195.38ZM322.081 283.031H321.581V307.162H322.081H322.581V283.031H322.081ZM322.081 283.031L322.33 282.598L313.259 277.374L313.01 277.807L312.76 278.24L321.831 283.465L322.081 283.031ZM313.01 277.807H313.51V231.951H313.01H312.51V231.951H313.01ZM313.01 277.807H312.51V344.364H313.01H313.51V277.807H313.01ZM249.513 268.522L249.763 268.955L313.259 232.384L313.01 231.951L312.76 231.518L249.264 268.089L249.513 268.522ZM186.017 231.951L185.767 232.384L249.264 268.955L249.513 268.522L249.763 268.089L186.267 231.518L186.017 231.951ZM249.513 268.522L249.264 268.955L282.524 288.112L282.773 287.679L283.023 287.245L249.763 268.089L249.513 268.522ZM202.143 323.386H201.643V369.5H202.143H202.643V323.386H202.143ZM202.143 323.386L202.393 322.952L155.022 295.669L154.773 296.102L154.523 296.535L201.894 323.819L202.143 323.386ZM154.773 296.102H154.273V332.298H154.773H155.273V296.102H154.773ZM249.513 296.102L249.264 295.669L201.894 322.952L202.143 323.386L202.393 323.819L249.763 296.535L249.513 296.102ZM249.513 296.102H249.013V338.331H249.513H250.013V296.102H249.513ZM249.513 268.522H249.013V296.102H249.513H250.013V268.522H249.513ZM202.143 268.819L201.894 269.252L249.264 296.535L249.513 296.102L249.763 295.669L202.393 268.386L202.143 268.819ZM186.017 278.107L186.267 278.54L202.393 269.252L202.143 268.819L201.894 268.386L185.767 277.674L186.017 278.107ZM186.017 231.951H185.517V278.107H186.017H186.517V231.951H186.017ZM146.71 243.819L146.46 244.252L163.917 254.307L164.166 253.873L164.416 253.44L146.959 243.386L146.71 243.819ZM154.773 296.102L155.022 296.535L164.416 291.125L164.166 290.692L163.917 290.259L154.523 295.669L154.773 296.102ZM164.166 290.692L164.416 291.125L186.267 278.54L186.017 278.107L185.767 277.674L163.917 290.259L164.166 290.692ZM164.166 253.873H163.666V290.692H164.166H164.666V253.873H164.166ZM164.166 253.873L163.917 253.44L95.0582 293.1L95.3077 293.533L95.5573 293.966L164.416 254.307L164.166 253.873ZM95.3077 293.533L95.5573 293.1L26.6987 253.44L26.4491 253.873L26.1996 254.307L95.0582 293.966L95.3077 293.533ZM26.4491 253.873L26.674 254.32L98.5563 218.124L98.3314 217.677L98.1065 217.231L26.2243 253.427L26.4491 253.873ZM98.3314 217.677L98.0937 218.117L146.472 244.259L146.71 243.819L146.947 243.379L98.5691 217.237L98.3314 217.677ZM26.4491 253.873L26.1996 253.44L0.250575 268.386L0.500122 268.819L0.74967 269.252L26.6987 254.307L26.4491 253.873ZM146.71 243.819H147.21V141H146.71H146.21V243.819H146.71ZM146.71 166.111L146.959 165.677L98.5809 137.813L98.3314 138.247L98.0818 138.68L146.46 166.544L146.71 166.111ZM98.3314 138.247L98.5809 138.68L146.959 110.816L146.71 110.383L146.46 109.95L98.0818 137.813L98.3314 138.247ZM146.71 110.383L146.46 110.816L170.649 124.748L170.899 124.315L171.148 123.882L146.959 109.95L146.71 110.383ZM146.71 110.383H147.21V31.6689H146.71H146.21V110.383H146.71ZM146.71 31.6689L146.46 31.2357L111.184 51.553L111.434 51.9863L111.683 52.4196L146.959 32.1022L146.71 31.6689ZM199.119 108.061H199.619V36.6962H199.119H198.619V108.061H199.119ZM249.513 137.086H249.013V195.38H249.513H250.013V137.086H249.513ZM222.301 178.465L222.037 178.889L249.249 195.804L249.513 195.38L249.777 194.955L222.565 178.04L222.301 178.465ZM313.01 231.951L313.259 232.384L345.025 214.089L344.775 213.655L344.526 213.222L312.76 231.518L313.01 231.951ZM422.869 224.404L422.617 223.972L388.35 243.905L388.601 244.338L388.852 244.77L423.12 224.837L422.869 224.404ZM388.601 244.338L388.35 243.905L321.829 282.599L322.081 283.031L322.332 283.464L388.852 244.77L388.601 244.338ZM388.601 244.338H388.101V310.178H388.601H389.101V244.338H388.601ZM388.601 244.338L388.318 244.75L490.114 314.613L490.397 314.2L490.68 313.788L388.884 243.925L388.601 244.338ZM422.869 224.404L422.619 224.838L475.53 255.312L475.78 254.879L476.029 254.445L423.118 223.971L422.869 224.404ZM422.869 224.404H423.369V108.061H422.869H422.369V224.404H422.869ZM422.869 108.061L423.118 108.494L473.512 79.4693L473.263 79.0361L473.013 78.6028L422.619 107.628L422.869 108.061ZM473.263 79.0361L473.514 78.6037L423.12 49.3347L422.869 49.767L422.618 50.1994L473.012 79.4684L473.263 79.0361ZM372.475 80.936H371.975V108.061H372.475H372.975V80.936H372.475ZM422.869 108.061L423.118 107.628L374.315 79.5189L374.065 79.9522L373.816 80.3855L422.619 108.494L422.869 108.061ZM374.065 79.9522L374.315 79.5189L349.543 65.2514L349.294 65.6847L349.044 66.118L373.816 80.3855L374.065 79.9522ZM422.869 49.767L422.606 49.3418L373.802 79.527L374.065 79.9522L374.328 80.3774L423.132 50.1923L422.869 49.767ZM374.065 79.9522L373.802 79.527L372.212 80.5107L372.475 80.936L372.738 81.3612L374.328 80.3774L374.065 79.9522ZM473.263 79.0361L473.512 79.4693L524.331 50.2003L524.081 49.767L523.831 49.3338L473.013 78.6028L473.263 79.0361ZM473.263 221.699L473.013 221.266L462.935 227.071L463.184 227.504L463.434 227.937L473.512 222.132L473.263 221.699ZM473.263 221.699L473.512 222.132L513.828 198.912L513.578 198.479L513.329 198.046L473.013 221.266L473.263 221.699ZM473.263 221.699L473.013 222.132L626.635 310.612L626.885 310.178L627.134 309.745L473.512 221.266L473.263 221.699ZM473.263 79.0361H472.763V142.268H473.263H473.763V79.0361H473.263ZM473.263 142.268H472.763V221.699H473.263H473.763V142.268H473.263ZM473.263 142.268L473.512 142.702L631.75 51.5637L631.5 51.1304L631.251 50.6972L473.013 141.835L473.263 142.268ZM98.3314 138.247L98.0818 137.813L97.3296 138.247L98.0818 138.68L98.3314 138.247Z"/>
        {WF_ARROWS.map(({ id, x1, y1, x2, y2, pts, dur, del }) => {
          const L = dist(x1, y1, x2, y2);
          return (
            <g key={id}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="0.75" style={{ strokeDasharray: L, strokeDashoffset: L, animation: `wf-line ${dur}s ${del}s infinite linear`, ["--L" as string]: L }} />
              <polygon points={pts} fill="white" style={{ opacity: 0, animation: `wf-head ${dur}s ${del}s infinite linear` }} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── OwnershipSection — DESKTOP VARIANT ──────────────────────────────────────
function OwnershipSectionDesktop({
  title, description, tag, image, svgComponent,
}: {
  title: string; description: string; tag?: string; image?: string;
  svgComponent?: React.ReactNode;
}) {
  return (
    <div
      className="w-full bg-black"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          flex: '1 1 auto',
          minHeight: 0,
          overflow: 'visible',
        }}
      >
        <div style={{
          width:  'min(45vh, 420px, 80%)',
          height: 'min(45vh, 420px)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
        }}>
          {svgComponent ? svgComponent : image ? (
            <ParticleImage src={image} alt={title} useRipple={false} className="w-full h-full" />
          ) : null}
        </div>
      </motion.div>

      <motion.div
        variants={fadeUpDelayed} initial="hidden" whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        style={{
          flexShrink: 0,
          width: '100%',
          paddingLeft: 'clamp(2rem, 5vw, 4rem)',
          paddingRight: 'clamp(2rem, 5vw, 4rem)',
          paddingBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
          marginTop: '16px',
        }}
      >
        <h3 style={{
          fontWeight: 300,
          letterSpacing: '-0.02em',
          fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
          marginBottom: 'clamp(0.3rem, 0.8vh, 0.6rem)',
          lineHeight: 1.2,
        }}>
          {title}
        </h3>
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.6,
          fontSize: 'clamp(0.75rem, 1.05vw, 0.9rem)',
          marginBottom: '0.4rem',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical' as any,
          overflow: 'hidden',
        }}>
          {description}
        </p>
        {tag && (
          <div style={{
            fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.8)',
          }}>
            #{tag}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── OwnershipSection — MOBILE/TABLET VARIANT ────────────────────────────────
function OwnershipSection({
  title, description, tag, image, svgComponent, isLast, index, setActiveIndex,
}: {
  title: string; description: string; tag?: string; image?: string;
  svgComponent?: React.ReactNode; isLast: boolean; index: number; setActiveIndex: (n: number) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.2 });
  useEffect(() => { if (isInView) setActiveIndex(index); }, [isInView, index, setActiveIndex]);
  return (
    <div ref={ref} className="relative flex flex-col sm:min-h-screen" style={{ overflow: "visible" }}>
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="ownership-img-wrap flex justify-center items-center lg:pt-16" style={{ overflow: "visible", paddingLeft: "2rem", paddingRight: "2rem" }}>
        {svgComponent ? (
          <div className="ownership-visual" style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}>{svgComponent}</div>
        ) : image ? (
          <ParticleImage src={image} alt={title} useRipple={false} className="ownership-visual" />
        ) : null}
      </motion.div>
      <motion.div variants={fadeUpDelayed} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="w-full max-w-xl ownership-content" style={{ flexShrink: 0 }}>
        <h3 className="font-light tracking-tight text-2xl sm:text-3xl mb-4 sm:mb-5">{title}</h3>
        <p className="text-white/50 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">{description}</p>
        {tag && <div className="text-xs sm:text-sm tracking-widest text-white/80">#{tag}</div>}
      </motion.div>
      <style>{`
        @media (max-width: 639px) {
          .ownership-img-wrap { height: auto !important; min-height: 300px; padding-top: 3rem !important; padding-bottom: 2rem; padding-left: 0 !important; padding-right: 0 !important; overflow: visible !important; display: flex !important; justify-content: center !important; align-items: center !important; }
          .ownership-visual { width: 75vw !important; height: 75vw !important; max-height: 300px !important; max-width: 300px !important; overflow: visible !important; margin: 0 auto !important; }
          .ownership-content { padding: 1rem 1.25rem 2.5rem 1.25rem; }
        }
        @media (min-width: 640px) {
          .ownership-img-wrap { height: calc(100vh - 280px); }
          .ownership-visual { width: min(420px, 55vw) !important; height: min(420px, calc(100vh - 320px)) !important; }
          .ownership-content { padding: 1.5rem 2rem 2.5rem 3.5rem; }
        }
      `}</style>
    </div>
  );
}


// ─── DesktopSlideshowMain ─────────────────────────────────────────────────────
function DesktopSlideshowMain({
  sections, activeIndex, setActiveIndex, onGoToRef, onResetRef,
}: {
  sections: { title: string; description: string; tag?: string; image?: string; svgComponent?: React.ReactNode }[];
  activeIndex: number;
  setActiveIndex: (n: number) => void;
  onGoToRef: React.MutableRefObject<((i: number) => void) | null>;
  onResetRef: React.MutableRefObject<(() => void) | null>;
}) {
  const containerRef      = useRef<HTMLDivElement>(null);
  const currentRef        = useRef(0);
  const lastScrollTime    = useRef(0);
  const seenAll           = useRef(false);
  const visitedRef        = useRef<Set<number>>(new Set([0]));
  const isTransitioning   = useRef(false);
  const transitionTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(sections.length - 1, next));
    if (clamped === currentRef.current) return;
    currentRef.current = clamped;
    visitedRef.current.add(clamped);
    if (visitedRef.current.size >= sections.length) seenAll.current = true;

    isTransitioning.current = true;
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => { isTransitioning.current = false; }, 850);

    setActiveIndex(clamped);
  }, [sections.length, setActiveIndex]);

  const reset = useCallback(() => {
    currentRef.current  = 0;
    seenAll.current     = false;
    visitedRef.current  = new Set([0]);
    isTransitioning.current = false;
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    setActiveIndex(0);
  }, [setActiveIndex]);

  useEffect(() => {
    onGoToRef.current   = goTo;
    onResetRef.current  = reset;
    return () => { if (transitionTimer.current) clearTimeout(transitionTimer.current); };
  }, [goTo, reset, onGoToRef, onResetRef]);

  useEffect(() => {
    currentRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp   = e.deltaY < 0;
      const isFirst = currentRef.current === 0;
      const isLast  = currentRef.current === sections.length - 1;

      if (isTransitioning.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (isFirst && isScrollingUp) {
        if (seenAll.current) return;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (isLast && isScrollingDown) {
        if (seenAll.current) return;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastScrollTime.current < 900) return;
      if (Math.abs(e.deltaY) < 10) return;

      lastScrollTime.current = now;

      if (isScrollingDown) goTo(currentRef.current + 1);
      else                 goTo(currentRef.current - 1);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [goTo, sections.length]);

  return (
    <main
      ref={containerRef}
      className="flex-1 relative z-10"
      style={{
        height: '100vh',
        overflow: 'hidden',
        position: 'sticky',
        top: 0,
      }}
    >
      {sections.map((item, index) => (
        <div
          key={item.title}
          data-ownership-section
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '100vh',
            transform: `translateY(${(index - activeIndex) * 100}%)`,
            transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: index === activeIndex ? 20 : 10,
            backgroundColor: '#000',
          }}
        >
          <OwnershipSectionDesktop {...item} />
        </div>
      ))}
    </main>
  );
}


// ─── MobileSlideshowMain ──────────────────────────────────────────────────────
function MobileSlideshowMain({
  sections, activeIndex, setActiveIndex, onResetRef,
}: {
  sections: { title: string; description: string; tag?: string; image?: string; svgComponent?: React.ReactNode }[];
  activeIndex: number;
  setActiveIndex: (n: number) => void;
  onResetRef: React.MutableRefObject<(() => void) | null>;
}) {
  const containerRef    = useRef<HTMLDivElement>(null);
  const currentRef      = useRef(0);
  const lastScrollTime  = useRef(0);
  const seenAll         = useRef(false);
  const visitedRef      = useRef<Set<number>>(new Set([0]));
  const touchStartY     = useRef(0);
  const isTransitioning = useRef(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(sections.length - 1, next));
    if (clamped === currentRef.current) return;
    currentRef.current = clamped;
    visitedRef.current.add(clamped);
    if (visitedRef.current.size >= sections.length) seenAll.current = true;

    isTransitioning.current = true;
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => { isTransitioning.current = false; }, 850);

    setActiveIndex(clamped);
  }, [sections.length, setActiveIndex]);

  const reset = useCallback(() => {
    currentRef.current      = 0;
    seenAll.current         = false;
    visitedRef.current      = new Set([0]);
    isTransitioning.current = false;
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    setActiveIndex(0);
  }, [setActiveIndex]);

  useEffect(() => {
    onResetRef.current = reset;
    return () => { if (transitionTimer.current) clearTimeout(transitionTimer.current); };
  }, [reset, onResetRef]);

  useEffect(() => { currentRef.current = activeIndex; }, [activeIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const isDown  = e.deltaY > 0;
      const isUp    = e.deltaY < 0;
      const isFirst = currentRef.current === 0;
      const isLast  = currentRef.current === sections.length - 1;

      if (isTransitioning.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (isFirst && isUp) {
        if (seenAll.current) return;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (isLast && isDown) {
        if (seenAll.current) return;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      const now = Date.now();
      if (now - lastScrollTime.current < 900) return;
      if (Math.abs(e.deltaY) < 10) return;
      lastScrollTime.current = now;
      if (isDown) goTo(currentRef.current + 1);
      else        goTo(currentRef.current - 1);
    };

    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      if (isTransitioning.current) return;
      const diff    = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      const isDown  = diff > 0;
      const isFirst = currentRef.current === 0;
      const isLast  = currentRef.current === sections.length - 1;

      if (isFirst && !isDown) {
        if (seenAll.current) return;
        return;
      }

      if (isLast && isDown && seenAll.current) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 900) return;
      lastScrollTime.current = now;
      if (isDown) goTo(currentRef.current + 1);
      else        goTo(currentRef.current - 1);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [goTo, sections.length]);

  return (
    <div
      ref={containerRef}
      style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}
    >
      {sections.map((item, index) => (
        <div
          key={item.title}
          data-ownership-section
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '100vh',
            transform: `translateY(${(index - activeIndex) * 100}%)`,
            transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: index === activeIndex ? 20 : 10,
            backgroundColor: '#000',
          }}
        >
          <OwnershipSection
            {...item}
            isLast={index === sections.length - 1}
            index={index}
            setActiveIndex={setActiveIndex}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Ownership (main export) ──────────────────────────────────────────────────
export default function Ownership() {
  const [activeIndex, setActiveIndex] = useState(0);
  const goToRef   = useRef<((i: number) => void) | null>(null);
  const resetRef  = useRef<(() => void) | null>(null);
  const sectionEl = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionEl.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (resetRef.current) resetRef.current();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const sections: { title: string; description: string; tag?: string; image?: string; svgComponent?: React.ReactNode }[] = [
    { title: "Security & Risk Posture", description: "Security and risk posture focuses on keeping organisational risk visible and controlled. Security decisions link directly to business priorities and acceptable risk levels. Each control has a clear owner, review cycle, and response plan. This reduces surprises and limits the impact of incidents when issues occur.", svgComponent: <SecurityWaveSVG /> },
    { title: "Technology Execution", description: "Technology execution ensures systems work reliably as change increases. Platforms follow clear build, release, and run standards. Ownership stays consistent across development and operations to avoid gaps. This keeps delivery steady and reduces failures during growth.", svgComponent: <TechnologyExecution /> },
    { title: "Workforce Readiness", description: "Workforce readiness prepares teams for real operating conditions. Roles and escalation paths stay clear before pressure hits. Training reflects actual scenarios instead of theory. Teams respond faster and make better decisions during incidents.", svgComponent: <WorkforceReadinessSVG /> },
    { title: "Operational Control", description: "Operational control brings structure to daily execution. Decisions follow defined paths instead of informal coordination. Signals focus on risk, progress, and dependencies. Work becomes predictable and less reactive over time.", image: "/Operational1.png" },
    { title: "Revenue Enablement", description: "Revenue enablement connects execution quality to business results. Technical priorities reflect revenue impact and customer trust. Launches follow readiness checks and clear success measures. Growth stays protected as execution becomes disciplined.", svgComponent: <RevenueEnablement /> },
  ];

  const scrollToSection = (i: number) => {
    if (goToRef.current) goToRef.current(i);
  };

  return (
    <section ref={sectionEl} className="relative">
      <div className="sticky top-0 z-50 h-px w-full md:mt-30 border-t border-color bg-black">
        <div className="mx-10 lg:mx-20 xl:mx-24 h-full" />
      </div>

      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-10 xl:px-24 relative">

        {/* ══ DESKTOP lg+ ══ */}
        <div className="hidden lg:flex lg:flex-row relative border-x border-color">

          {/* ── LEFT SIDEBAR ── */}
          <div className="w-[32%] shrink-0 relative">
            <div className="absolute inset-0 border-r border-color pointer-events-none" />
            <aside className="sticky top-0 h-screen z-10 px-10 flex flex-col" style={{ paddingTop: 0 }}>
              <div style={{ paddingTop: 'clamp(3.5rem, 8vh, 6rem)' }}>
                <PlusHeading text="OWNERSHIP" />
              </div>
              <ul className="mt-20 space-y-6">
                {sections.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer ${activeIndex === idx ? "text-white font-medium" : "text-white/40 hover:text-white/70"}`}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
              <div className="flex-1 flex items-center justify-center">
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: '200px', height: '100px',
                    WebkitMaskImage: 'radial-gradient(ellipse 82% 75% at 50% 55%, black 25%, transparent 100%)',
                    maskImage: 'radial-gradient(ellipse 82% 75% at 50% 55%, black 25%, transparent 100%)',
                  }}
                >
                  <IsometricHoverGrid cellW={80} cellH={48} interactive={true} />
                  <IsoBox cellW={80} cellH={48} col={1} row={2} opacity={0.55} />
                  <IsoBox cellW={80} cellH={48} col={2} row={2} opacity={0.9}  />
                </div>
              </div>
              <div className="mb-12">
                <Link href="/execution-arms"><PartialOutlineBtn text="Explore Execution Arms" /></Link>
              </div>
            </aside>
          </div>

          {/* ── RIGHT MAIN ── */}
          <DesktopSlideshowMain
            sections={sections}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onGoToRef={goToRef}
            onResetRef={resetRef}
          />
        </div>

        {/* ══ TABLET sm–lg ══ */}
        <div className="hidden sm:flex lg:hidden flex-row relative border-x border-color">
          <div className="w-[30%] shrink-0 relative">
            <div className="absolute inset-0 border-r border-color pointer-events-none" />
            <aside className="sticky top-0 h-screen z-10 px-6 pb-6 flex flex-col" style={{ paddingTop: 0 }}>
              <div style={{ paddingTop: 'clamp(2.5rem, 6vh, 4rem)' }}>
                <PlusHeading text="OWNERSHIP" />
              </div>
              <ul className="mt-10 space-y-4">
                {sections.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${activeIndex === idx ? "text-white font-medium" : "text-white/40 hover:text-white/70"}`}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
              <div className="flex-1 flex items-center justify-center">
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: '140px', height: '80px',
                    WebkitMaskImage: 'radial-gradient(ellipse 82% 75% at 50% 55%, black 25%, transparent 100%)',
                    maskImage: 'radial-gradient(ellipse 82% 75% at 50% 55%, black 25%, transparent 100%)',
                  }}
                >
                  <IsometricHoverGrid cellW={60} cellH={36} interactive={true} />
                  <IsoBox cellW={60} cellH={36} col={1} row={2} opacity={0.55} />
                  <IsoBox cellW={60} cellH={36} col={2} row={2} opacity={0.9}  />
                </div>
              </div>
              <div className="pb-8">
                <Link href="/execution-arms"><PartialOutlineBtn text="Explore Execution Arms" /></Link>
              </div>
            </aside>
          </div>
          <main className="flex-1 relative z-10">
            {sections.map((item, index) => (
              <div key={item.title} data-ownership-section>
                <OwnershipSection {...item} isLast={index === sections.length - 1} index={index} setActiveIndex={setActiveIndex} />
              </div>
            ))}
          </main>
        </div>

        {/* ══ MOBILE <sm ══
            CHANGES (only 2):
            1. pt-0 instead of pt-8 — removes top margin above OWNERSHIP
            2. flex justify-center — centers the OWNERSHIP heading
        */}
        <div className="sm:hidden">
          <div className="w-full border-b border-white/10 px-4 pt-[10px] pb-4 flex justify-center">
            <PlusHeading text="OWNERSHIP" />
          </div>
          <div>
            {sections.map((item, index) => (
              <div
                key={item.title}
                className="border-b border-white/10 px-5 pt-8 pb-6 flex flex-col items-center gap-4"
              >
                <div style={{ width: '68vw', height: '56vw', maxWidth: 280, maxHeight: 240, flexShrink: 0 }}>
                  {item.svgComponent ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.svgComponent}
                    </div>
                  ) : item.image ? (
                    <ParticleImage src={item.image} alt={item.title} useRipple={false} className="w-full h-full" />
                  ) : null}
                </div>
                <div className="w-full">
                  <h3 className="font-light tracking-tight text-xl mb-3 leading-snug">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm">{item.description}</p>
                  {item.tag && <div className="mt-3 text-xs tracking-widest text-white/70">#{item.tag}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="relative h-px w-full bg-white/10" />
    </section>
  );
}