"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState, useCallback } from "react"
import Reveal from "@/utils/Reveal"
import { slideInFromBottom } from "@/utils/motion"

// ── Config (Slow & Smooth Tuning) ─────────────────────────────────────────────
const SPACING = 5;
const THRESHOLD = 10;
const HOVER_RADIUS = 100;
const EXPLODE_FORCE = 4;
const EXPLODE_DECAY = 0.94;
const RETURN_LERP = 0.02;
const CONNECT_DIST = 32;

interface Particle {
    ox: number; oy: number;
    cx: number; cy: number;
    x: number; y: number;
    vx: number; vy: number;
    size: number;
    phase: number;
}

// ── ParticleCanvas ────────────────────────────────────────────────────────────
function ParticleCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number | null>(null);
    const [mode, setMode] = useState<"image" | "circle">("image");

    useEffect(() => {
        const timer = setInterval(() => {
            setMode((prev) => (prev === "image" ? "circle" : "image"));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const buildParticles = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !imgEl) return;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const W = canvas.width;
        const H = canvas.height;
        const centerX = W / 2;
        const centerY = H / 2;
        const circleRadius = Math.min(W, H) / 3.4;

        const off = document.createElement("canvas");
        off.width = W;
        off.height = H;
        const offCtx = off.getContext("2d")!;

        try {
            // ✅ FIX: Image ko center mein scale karke draw karo
            const scale = Math.min(W / imgEl.naturalWidth, H / imgEl.naturalHeight);
            const iw = imgEl.naturalWidth * scale;
            const ih = imgEl.naturalHeight * scale;
            const ix = (W - iw) / 2;
            const iy = (H - ih) / 2;
            offCtx.drawImage(imgEl, ix, iy, iw, ih);

            const { data } = offCtx.getImageData(0, 0, W, H);
            const pts: Particle[] = [];

            for (let y = 0; y < H; y += SPACING) {
                for (let x = 0; x < W; x += SPACING) {
                    const i = (y * W + x) * 4;
                    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    if (brightness > THRESHOLD) {
                        const angle = Math.random() * Math.PI * 2;
                        const r = circleRadius + (Math.random() * 10 - 5);

                        pts.push({
                            ox: x, oy: y,
                            cx: centerX + Math.cos(angle) * r,
                            cy: centerY + Math.sin(angle) * r,
                            x: Math.random() * W,
                            y: Math.random() * H,
                            vx: 0, vy: 0,
                            size: 0.7,
                            phase: Math.random() * Math.PI * 2
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
        let time = 0;

        const loop = () => {
            time += 0.02;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const pts = particlesRef.current;

            for (let i = 0; i < pts.length; i++) {
                const p = pts[i];
                const tx = mode === "image" ? p.ox : p.cx;
                const ty = mode === "image" ? p.oy : p.cy;

                // Subtle floating movement
                const floatX = Math.sin(time + p.phase) * 0.8;
                const floatY = Math.cos(time + p.phase) * 0.8;

                // Smooth mouse interaction
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < HOVER_RADIUS) {
                    const force = (HOVER_RADIUS - dist) / HOVER_RADIUS;
                    p.vx += (dx / dist) * EXPLODE_FORCE * force * 0.15;
                    p.vy += (dy / dist) * EXPLODE_FORCE * force * 0.15;
                }

                p.vx *= EXPLODE_DECAY;
                p.vy *= EXPLODE_DECAY;

                p.x += (tx + floatX - p.x) * RETURN_LERP + p.vx;
                p.y += (ty + floatY - p.y) * RETURN_LERP + p.vy;

                // Net Connections (Spider-web style)
                for (let j = i + 1; j < pts.length; j++) {
                    const p2 = pts[j];
                    const ldx = p.x - p2.x;
                    const ldy = p.y - p2.y;
                    const ldistSq = ldx * ldx + ldy * ldy;

                    if (ldistSq < CONNECT_DIST * CONNECT_DIST) {
                        const opacity = (1 - Math.sqrt(ldistSq) / CONNECT_DIST) * 0.35;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.lineWidth = 0.4;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Draw Particle
                ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
            rafRef.current = requestAnimationFrame(loop);
        };

        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

        canvas.addEventListener("mousemove", onMove);
        canvas.addEventListener("mouseleave", onLeave);
        const ro = new ResizeObserver(buildParticles);
        ro.observe(canvas);
        if (imgEl?.complete) buildParticles();

        rafRef.current = requestAnimationFrame(loop);
        return () => {
            canvas.removeEventListener("mousemove", onMove);
            canvas.removeEventListener("mouseleave", onLeave);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            ro.disconnect();
        };
    }, [buildParticles, imgEl, mode]);

    return (
        // ✅ FIX: background transparent — black nahi aayega
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "auto",
                zIndex: 10,
                cursor: "crosshair",
                background: "transparent",
            }}
        />
    );
}

// ── ParticleImage ─────────────────────────────────────────────────────────────
function ParticleImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const el = wrap.querySelector("img") as HTMLImageElement | null;
        if (el) {
            // ✅ FIX: Image load hone ka wait karo phir set karo
            if (el.complete) {
                setImgEl(el);
            } else {
                el.onload = () => setImgEl(el);
            }
        }
    }, []);

    return (
        <div ref={wrapRef} className={className} style={{ position: "relative" }}>
            <Image
                src={src}
                fill
                alt={alt}
                crossOrigin="anonymous"
                style={{ objectFit: "contain", opacity: 0 }}
            />
            <ParticleCanvas imgEl={imgEl} />
        </div>
    );
}

// ── Engagement ────────────────────────────────────────────────────────────────
export default function Engagement() {
    return (
        <section className="flex flex-col">

            <div className="border-y border-color">
                <div className="xl:mx-auto mx-10 max-w-7xl py-15 border-x border-color"></div>
            </div>

            <div className="xl:mx-auto mx-10 full max-w-7xl flex flex-col py-10 px-4 sm:px-6 md:px-10 border-x border-color">
                <Reveal variants={slideInFromBottom(0.1)} className="flex justify-center md:justify-between mb-10ff">
                    <h1 className="uppercase text-[24px] lg:text-[36px] text-gray-200 text-thin text-center md:text-left">
                        <span className="text-white">Initiate an</span> alignment-led <br /> engagement process.
                    </h1>
                    <div className="hidden md:flex flex-col font-light">
                        <Link href={"/"}>hello@ascella.group</Link>
                        <p>+91 16045 10860</p>
                    </div>
                </Reveal>
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-20">
                    <div className="w-full xl:w-1/2 flex flex-col gap-10 md:gap-20 items-center md:items-start md:justify-between">

                        {/* ✅ FIX: ParticleSphere import aur use dono hataaye — sirf ParticleImage rahega */}
                        <ParticleImage
                            src="/engagementCircle.svg"
                            alt="Engagement Circle"
                            className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[350px] lg:h-[350px]"
                        />

                        <Reveal variants={slideInFromBottom(0.1)} className="grid grid-cols-2 justify-between sm:px-6 gap-8 xm:gap-20 md:gap-4 w-full">
                            <div className="flex flex-col text-left gap-3 sm:gap-5 flex-1">
                                <h3 className="text-[14px] text-left leading-tight min-h-10">Not sure where <br /> to begin?</h3>
                                <p className="font-thin leading-tight text-xs sm:text-sm min-h-10">Initial engagement focuses on alignment, not sales discussions.</p>
                                <Link href={"/"} className="block md:hidden text-xs sm:text-sm">hello@ascella.group</Link>
                            </div>

                            <div className="flex flex-col text-left gap-3 sm:gap-5 flex-1">
                                <h3 className="text-[14px] text-left leading-tight min-h-10">Begin alignment Execution follows.</h3>
                                <p className="font-thin leading-tight text-xs sm:text-sm min-h-10">The first step focuses on clarity and fit.</p>
                                <p className="block md:hidden text-xs sm:text-sm">+91 16045 10860</p>
                            </div>
                        </Reveal>
                    </div>

                    <form className="w-full md:max-w-md space-y-2 md:space-y-4">
                        <Reveal variants={slideInFromBottom(0.1)}>
                            <label className="block text-b2">Full Name</label>
                            <input type="text" className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition" />
                        </Reveal>
                        <Reveal variants={slideInFromBottom(0.1)}>
                            <label className="block text-b2">Organisation</label>
                            <input type="text" className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition" />
                        </Reveal>
                        <Reveal variants={slideInFromBottom(0.1)}>
                            <label className="block text-b2">Role / Position</label>
                            <input type="text" className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition" />
                        </Reveal>
                        <Reveal variants={slideInFromBottom(0.1)}>
                            <label className="block text-b2">Email Address</label>
                            <input type="email" className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition" />
                        </Reveal>
                        <Reveal variants={slideInFromBottom(0.1)} className="relative">
                            <label className="block text-b2">
                                Organisation Type
                            </label>
                            <select
                                defaultValue=""
                                className="w-full bg-gray-500 text-white px-4 py-3 pr-10 border border-transparent focus:outline-none hover:bg-gray-600 transition cursor-pointer"
                            >
                                <option value="" disabled>Select Organisation</option>
                                <option value="ascella-group">Ascella Group</option>
                                <option value="ascella-infosec">Ascella Infosec</option>
                                <option value="ascella-staffing">Ascella Staffing</option>
                                <option value="ascella-engage">Ascella Engage</option>
                                <option value="ascella-forge">Ascella Forge</option>
                            </select>
                        </Reveal>
                        <Reveal variants={slideInFromBottom(0.1)}>
                            <label className="block text-b2">
                                Describe your current operating or execution challenge
                            </label>
                            <textarea rows={3} className="w-full bg-gray-500 px-4 py-2 resize-none focus:outline-none focus:border-white transition" />
                        </Reveal>
                        <button type="submit" className="border border-white px-6 py-2 text-sm hover:bg-white hover:text-black transition">
                            Consult Now
                        </button>
                    </form>
                </div>
            </div>

            <div className="border-t border-color">
                <div className="xl:mx-auto mx-10 max-w-7xl py-15 border-x border-color"></div>
            </div>
        </section>
    )
}