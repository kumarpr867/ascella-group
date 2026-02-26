"use client"

import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState, useCallback } from "react"

const ParticleSphere = dynamic(() => import("../howAscellaOperates/ParticleSphere"), { ssr: false })

// ── Config ────────────────────────────────────────────────────────────────────
const SPACING       = 3;
const THRESHOLD     = 10;
const HOVER_RADIUS  = 60;   // px — particles within this radius scatter on hover
const EXPLODE_FORCE = 4;    // how far they fly
const EXPLODE_DECAY = 0.85; // velocity decay per frame
const RETURN_LERP   = 0.08; // how fast they return to origin

interface Particle {
    ox: number; oy: number; // origin — never changes
    x:  number; y:  number; // current position
    vx: number; vy: number; // velocity
    size: number;
    scattered: boolean;
}

// ── ParticleCanvas ────────────────────────────────────────────────────────────
function ParticleCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
    const canvasRef    = useRef<HTMLCanvasElement>(null);
    const mouseRef     = useRef({ x: -9999, y: -9999 });
    const particlesRef = useRef<Particle[]>([]);
    const rafRef       = useRef<number | null>(null);

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
            const pts: Particle[] = [];

            for (let y = 0; y < H; y += SPACING) {
                for (let x = 0; x < W; x += SPACING) {
                    const i          = (y * W + x) * 4;
                    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    if (brightness > THRESHOLD) {
                        pts.push({
                            ox: x, oy: y,
                            x,     y,
                            vx: 0, vy: 0,
                            size: Math.random() * 1.0 + 0.5,
                            scattered: false,
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

                // ── Hover scatter: push away from cursor ──
                const dx   = p.ox - mx;
                const dy   = p.oy - my;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < HOVER_RADIUS) {
                    // Soft falloff — closer = more push
                    const falloff = 1 - dist / HOVER_RADIUS;
                    const len     = dist || 1;
                    // Add push velocity away from cursor each frame
                    p.vx += (dx / len) * EXPLODE_FORCE * falloff * 0.3;
                    p.vy += (dy / len) * EXPLODE_FORCE * falloff * 0.3;
                    p.scattered = true;
                }

                // Apply velocity + decay
                p.x  += p.vx;
                p.y  += p.vy;
                p.vx *= EXPLODE_DECAY;
                p.vy *= EXPLODE_DECAY;

                // Return to origin when cursor is far
                if (dist >= HOVER_RADIUS) {
                    p.x += (p.ox - p.x) * RETURN_LERP;
                    p.y += (p.oy - p.y) * RETURN_LERP;
                    if (Math.sqrt(p.vx * p.vx + p.vy * p.vy) < 0.05) {
                        p.scattered = false;
                    }
                }

                // Skip fully settled invisible particles
                const atOrigin = Math.abs(p.x - p.ox) < 0.3 && Math.abs(p.y - p.oy) < 0.3;
                if (!p.scattered && atOrigin) continue;

                // Draw — pure white, no brightness boost, no glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255,255,255,0.85)";
                ctx.fill();
            }

            rafRef.current = requestAnimationFrame(loop);
        };

        const onMove = (e: MouseEvent) => {
            const rect       = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 };
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

// ── ParticleImage ─────────────────────────────────────────────────────────────
function ParticleImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
    const wrapRef           = useRef<HTMLDivElement>(null);
    const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const el = wrap.querySelector("img") as HTMLImageElement | null;
        if (el) setImgEl(el);
    }, []);

    return (
        <div ref={wrapRef} className={className} style={{ position: "relative" }}>
            <Image
                src={src}
                fill
                alt={alt}
                crossOrigin="anonymous"
                style={{ objectFit: "contain" }}
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
                <div className="mx-auto max-w-7xl py-15 border-x border-color"></div>
            </div>
            <div className="mx-auto w-full max-w-7xl flex flex-col py-10 px-4 sm:px-6 md:px-15 border-x border-color">
                <div className="flex justify-center md:justify-between mb-10 md:mb-15">
                    <h1 className="uppercase text-xl sm:text-2xl text-gray-200 text-thin text-center md:text-left">
                        <span className="text-white">Initiate an</span> alignment-led <br /> engagement process.
                    </h1>
                    <div className="hidden md:flex flex-col font-light">
                        <Link href={"/"}>hello@ascella.group</Link>
                        <p>+91 16045 10860</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-20">
                    <div className="w-full md:w-1/2 flex flex-col gap-10 md:gap-20 items-center md:items-start md:justify-between">

                        <ParticleImage
                            src="/engagementCircle.svg"
                            alt="Engagement Circle"
                            className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[350px] lg:h-[350px]"
                        />

                        <div className="flex justify-between px-2 sm:px-6 gap-8 sm:gap-12 md:gap-16 w-full">
                            <div className="flex flex-col text-left gap-3 sm:gap-5 flex-1">
                                <h3 className="text-b2 leading-tight text-sm sm:text-base">Not sure where <br /> to begin?</h3>
                                <p className="font-thin leading-tight text-xs sm:text-sm">Initial engagement focuses on alignment, not sales discussions.</p>
                                <Link href={"/"} className="block md:hidden text-xs sm:text-sm">hello@ascella.group</Link>
                            </div>
                            <div className="flex flex-col gap-5">
                                <h3 className="text-[14px] text-left leading-tight min-h-10">Begin alignment Execution follows.</h3>
                                <p className="font-thin leading-tight min-h-20">The first step focuses on clarity and fit.</p>

                                <p className="block md:hidden">+91 16045 10860</p>
                            </div>
                        </div>
                    </div>

                    <form className="w-full md:max-w-md space-y-4 sm:space-y-5">
                        <div>
                            <label className="block text-sm text-white font-light mb-1">Full Name</label>
                            <input type="text" className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition" />
                        </div>
                        <div>
                            <label className="block text-sm text-white font-light mb-1">Organisation</label>
                            <input type="text" className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition" />
                        </div>
                        <div>
                            <label className="block text-sm text-white font-light mb-1">Role / Position</label>
                            <input type="text" className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition" />
                        </div>
                        <div>
                            <label className="block text-sm text-white font-light mb-1">Email Address</label>
                            <input type="email" className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition" />
                        </div>
                        <div>
                            <label className="block text-sm text-white font-light mb-1">Organisation Type</label>
                            <select defaultValue="" className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition">
                                <option value="" disabled></option>
                                <option>Something</option>
                                <option>Something</option>
                                <option>Something</option>
                                <option>Something</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-white font-light mb-1">
                                Describe your current operating or execution challenge
                            </label>
                            <textarea rows={4} className="w-full bg-gray-500 px-4 py-3 resize-none focus:outline-none focus:border-white transition" />
                        </div>
                        <button type="submit" className="border border-white px-6 py-2 text-sm hover:bg-white hover:text-black transition">
                            Consult Now
                        </button>
                    </form>
                </div>
            </div>
            <div className="border-t border-color">
                <div className="mx-auto max-w-7xl py-15 border-x border-color"></div>
            </div>
        </section>
    )
}