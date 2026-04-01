"use client";

import React, { useEffect, useRef } from "react";
import Heading from "../executionArmsPages/headings/Heading";
import { motion, type Variants } from "motion/react";
import Reveal from "@/utils/Reveal";
import { slideInFromBottom, slideInFromLeft, slideInFromRight } from "@/utils/motion";

const container: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
};
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
};
const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
};

// ── Diffuse Ownership ─────────────────────────────────────────────────────────
function DiffuseOwnershipIcon() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number | null>(null);
    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext("2d")!;
        const cx = 74.5, cy = 74.5;
        const circles = [
            { r: 74, dotR: 4, speed: 0.003, a: Math.atan2(124 - cy, 129 - cx) },
            { r: 54, dotR: 4, speed: -0.004, a: Math.atan2(71 - cy, 44 - cx) },
            { r: 31, dotR: 4, speed: 0.005, a: Math.atan2(21 - cy, 76 - cx) },
        ];
        const extra = { r: 74, dotR: 4, speed: 0.003, a: Math.atan2(105 - cy, 7 - cx) };
        const angles = circles.map(c => c.a);
        let ea = extra.a;
        const draw = () => {
            ctx.clearRect(0, 0, 149, 149);
            ctx.strokeStyle = "white"; ctx.lineWidth = 1;
            [74, 54, 31].forEach(r => { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); });
            ctx.fillStyle = "white";
            circles.forEach((c, i) => {
                angles[i] += c.speed;
                ctx.beginPath(); ctx.arc(cx + c.r * Math.cos(angles[i]), cy + c.r * Math.sin(angles[i]), c.dotR, 0, Math.PI * 2); ctx.fill();
            });
            ea -= extra.speed;
            ctx.beginPath(); ctx.arc(cx + extra.r * Math.cos(ea), cy + extra.r * Math.sin(ea), extra.dotR, 0, Math.PI * 2); ctx.fill();
            rafRef.current = requestAnimationFrame(draw);
        };
        rafRef.current = requestAnimationFrame(draw);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, []);
    return <canvas ref={canvasRef} width={149} height={149} style={{ display: "block" }} />;
}

// ── Priority Drift ────────────────────────────────────────────────────────────
function PriorityDriftIcon() {
    const lines: [number, number, number, number][] = [
        [75.7985, 3.15, 75.7985, 39.8183],
        [75.7985, 148.455, 75.7985, 111.787],
        [3.15, 75.8064, 39.8183, 75.8064],
        [148.455, 75.8064, 111.787, 75.8064],
        [24.1791, 126.933, 50.1075, 101.005],
        [127.42, 24.6819, 101.244, 50.3628],
        [127.173, 127.181, 101.244, 101.252],
        [24.179, 24.6819, 50.1074, 50.6103],
        [138.719, 112.134, 107.138, 93.4966],
        [44.6363, 57.8155, 13.0556, 39.1783],
        [12.8807, 112.134, 44.4613, 93.4966],
        [106.963, 57.8155, 138.544, 39.1783],
        [39.4733, 138.726, 57.5043, 106.796],
        [93.7918, 44.6443, 111.823, 12.7137],
        [39.4733, 12.8887, 57.5043, 44.8194],
        [93.7918, 106.971, 111.823, 138.902],
        [5.57723, 57.1745, 40.9292, 66.9171],
        [110.58, 85.0364, 145.932, 94.779],
        [5.64883, 94.7089, 41.1455, 85.5072],
        [110.545, 66.4459, 146.041, 57.2442],
        [56.7952, 145.93, 66.7247, 110.63],
        [85.2125, 41.0761, 95.1421, 5.77617],
        [94.1202, 146.112, 85.2124, 110.541],
        [66.7256, 40.9861, 57.8178, 5.41456],
    ];

    return (
        <svg width="152" height="152" viewBox="0 0 152 152" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="75.393" cy="76.2078" r="23.1609" stroke="white" strokeWidth="0.7" />
            <polygon points="75.7985,0 73.7777,3.5 77.8192,3.5" fill="white" />
            <polygon points="75.7985,42.9683 77.8192,39.4683 73.7777,39.4683" fill="white" />
            <polygon points="75.7985,108.637 73.7777,112.137 77.8192,112.137" fill="white" />
            <polygon points="75.7985,151.605 77.8192,148.105 73.7777,148.105" fill="white" />
            <polygon points="0,75.8064 3.5,77.8271 3.5,73.7857" fill="white" />
            <polygon points="42.9683,75.8064 39.4683,73.7857 39.4683,77.8271" fill="white" />
            <polygon points="108.637,75.8064 112.137,77.8271 112.137,73.7857" fill="white" />
            <polygon points="151.605,75.8064 148.105,73.7857 148.105,77.8271" fill="white" />
            <path d="M22.1992 129.408L26.103 128.362L23.2452 125.504L22.1992 129.408Z M52.5824 99.0249L48.6786 100.071L51.5364 102.929L52.5824 99.0249Z" fill="white" />
            <path d="M99.0168 52.5902L102.921 51.5442L100.063 48.6865L99.0168 52.5902Z M129.4 22.2071L125.496 23.2531L128.354 26.1108L129.4 22.2071Z" fill="white" />
            <path d="M129.4 129.408L128.354 125.504L125.496 128.362L129.4 129.408Z M99.017 99.0249L100.063 102.929L102.921 100.071L99.017 99.0249Z" fill="white" />
            <path d="M52.5823 52.5902L51.5363 48.6865L48.6785 51.5442L52.5823 52.5902Z M22.1991 22.2071L23.2451 26.1108L26.1029 23.2531L22.1991 22.2071Z" fill="white" />
            <path d="M141.447 113.709L139.426 110.209L137.405 113.709L141.447 113.709Z M104.235 92.2247L106.256 95.7247L108.276 92.2247L104.235 92.2247Z" fill="white" />
            <path d="M47.3643 59.3905L45.3435 55.8905L43.3228 59.3905L47.3643 59.3905Z M10.1527 37.9064L12.1734 41.4064L14.1941 37.9064L10.1527 37.9064Z" fill="white" />
            <path d="M10.1527 113.709L12.1734 110.209L14.1942 113.709L10.1527 113.709Z M47.3643 92.2247L45.3436 95.7247L43.3229 92.2247L47.3643 92.2247Z" fill="white" />
            <path d="M104.235 59.3905L106.256 55.8905L108.276 59.3905L104.235 59.3905Z M141.447 37.9064L139.426 41.4064L137.405 37.9064L141.447 37.9064Z" fill="white" />
            <path d="M37.8983 141.454L37.8983 137.413L41.3983 139.434L37.8983 141.454Z M59.3824 104.243L59.3824 108.284L55.8824 106.264L59.3824 104.243Z" fill="white" />
            <path d="M92.2168 47.3723L92.2168 43.3309L95.7168 45.3516L92.2168 47.3723Z M113.701 10.1607L113.701 14.2022L110.201 12.1814L113.701 10.1607Z" fill="white" />
            <path d="M37.8983 10.1608L37.8983 14.2022L41.3983 12.1815L37.8983 10.1608Z M59.3824 47.3724L59.3824 43.3309L55.8824 45.3516L59.3824 47.3724Z" fill="white" />
            <path d="M92.2168 104.243L92.2168 108.284L95.7168 106.264L92.2168 104.243Z M113.701 141.455L113.701 137.413L110.201 139.434L113.701 141.455Z" fill="white" />
            <path d="M2.53259 56.3666L5.39727 59.2174L6.43378 55.3111L2.53259 56.3666Z M44.0637 67.3866L41.199 64.5359L40.1625 68.4421L44.0637 67.3866Z" fill="white" />
            <path d="M107.536 84.2285L110.4 87.0793L111.437 83.173L107.536 84.2285Z M149.067 95.2486L146.202 92.3978L145.166 96.3041L149.067 95.2486Z" fill="white" />
            <path d="M2.6073 95.5284L6.51249 96.569L5.46106 92.6667L2.6073 95.5284Z M44.0959 84.3498L40.1908 83.3092L41.2422 87.2115L44.0959 84.3498Z" fill="white" />
            <path d="M107.503 67.2654L111.408 68.306L110.357 64.4037L107.503 67.2654Z M148.992 56.0867L145.087 55.0461L146.138 58.9484L148.992 56.0867Z" fill="white" />
            <path d="M55.9712 148.971L58.8371 146.121L54.9364 145.064L55.9712 148.971Z M67.2109 107.499L64.345 110.348L68.2457 111.405L67.2109 107.499Z" fill="white" />
            <path d="M84.3885 44.1165L87.2545 41.2669L83.3537 40.2097L84.3885 44.1165Z M95.6282 2.64429L92.7623 5.49384L96.6631 6.55101L95.6282 2.64429Z" fill="white" />
            <path d="M94.9146 149.16L95.9874 145.264L92.0765 146.283L94.9146 149.16Z M84.0794 107.581L83.0066 111.477L86.9174 110.458L84.0794 107.581Z" fill="white" />
            <path d="M67.5199 44.0343L68.5927 40.1378L64.6819 41.157L67.5199 44.0343Z M56.6848 2.45461L55.6119 6.35107L59.5228 5.33195L56.6848 2.45461Z" fill="white" />
            {lines.map(([x1, y1, x2, y2], i) => {
                const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                const dur = (3 + (i % 7) * 0.4).toFixed(1) + "s";
                const delay = -((i * 0.37 + (i % 3) * 0.6) % 3).toFixed(2) + "s";
                return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeDasharray={`${len} ${len + 1}`}>
                        <animate attributeName="stroke-dashoffset" from={len} to={-len} dur={dur} begin={delay} repeatCount="indefinite" calcMode="linear" />
                    </line>
                );
            })}
        </svg>
    );
}

// ── Leadership Drain ──────────────────────────────────────────────────────────
function LeadershipDrainIcon() {
    const triangles = [
        { d: "M136.348 128.5H10.6523L73.5 1.12988L136.348 128.5Z", delay: 0 },
        { d: "M136.251 101.5H10.749L73.5 0.943359L136.251 101.5Z", delay: 0.7 },
        { d: "M136.036 70.75H10.9639L73.5 0.75L136.036 70.75Z", delay: 1.4 },
        { d: "M135.601 45.25H11.3994L73.5 0.615234L135.601 45.25Z", delay: 2.1 },
        { d: "M134.41 23.5H12.5898L73.5 0.53418L134.41 23.5Z", delay: 2.8 },
    ];

    const totalCycle = 6;

    return (
        <svg width="147" height="172" viewBox="0 0 147 172" fill="none" xmlns="http://www.w3.org/2000/svg">
            <style>{`
                @keyframes triReveal {
                    0%   { opacity: 0; }
                    8%   { opacity: 1; }
                    75%  { opacity: 1; }
                    90%  { opacity: 0; }
                    100% { opacity: 0; }
                }
            `}</style>

            {triangles.map((t, i) => (
                <path
                    key={i}
                    d={t.d}
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                    style={{
                        opacity: 0,
                        animation: `triReveal ${totalCycle}s ease-in-out infinite`,
                        animationDelay: `${t.delay}s`,
                    }}
                />
            ))}

            <path d="M73.5 2V128" stroke="white" strokeWidth="1" />
        </svg>
    );
}

// ── Items ─────────────────────────────────────────────────────────────────────
type ProblemItem = {
    title: string;
    subHeading: string;
    description: string;
    icon: React.ReactNode;
};

const items: ProblemItem[] = [
    {
        title: "Diffuse Ownership",
        subHeading: "No single accountable owner",
        description: "Work moves across roles and partners without a clear decision holder, forcing coordination to replace authority and causing outcomes to drift despite visible activity.",
        icon: <DiffuseOwnershipIcon />,
    },
    {
        title: "Priority Drift",
        subHeading: "Effort without shared direction",
        description: "Teams execute against local goals instead of common outcomes. Work advances in parallel but pulls in different directions. Results weaken as alignment stays informal.",
        icon: <PriorityDriftIcon />,
    },
    {
        title: "Leadership Drain",
        subHeading: "Focus lost to coordination",
        description: "Senior leaders spend time resolving handoffs and conflicts. Strategic work gives way to operational fixes. Energy drains as execution lacks structure.",
        icon: <LeadershipDrainIcon />,
    },
];

// ── Page section ──────────────────────────────────────────────────────────────
export default function ExecutionProblem() {
    return (
        <section className="md:my-24 border-b border-color">

            {/* ══════════════════════════════════════════
                DESKTOP header (md+) — completely unchanged
            ══════════════════════════════════════════ */}
            <div className="md:border-b border-color">
                <div className="hidden md:flex mx-10 lg:mx-20 xl:mx-24 flex-col md:flex-row md:justify-between gap-12 pb-12 overflow-x-hidden">
                    <Reveal variants={slideInFromLeft(0.1)}>
                        <p className="max-w-md text-b3 leading-relaxed">
                            Execution breaks when responsibility spreads across teams, vendors, and
                            functions. Work continues, effort stays high, yet outcomes drift.
                            Decisions slow, risks surface late, and delivery feels unstable. The
                            failure sits in structure and ownership, not effort or intent.
                        </p>
                    </Reveal>
                    <Reveal variants={slideInFromRight(0.2)}>
                        <h3 className="max-w-lg text-right">
                            <span className="text-[18px] md:text-[36px] text-white">
                                The Execution Problem
                            </span>
                            <span className="text-gray-200"> Modern Organisations Face</span>
                        </h3>
                    </Reveal>
                </div>

                {/* ── MOBILE header: centered, 2-line heading only, left-right margin ── */}
                <div className="md:hidden mx-10 pt-8 pb-0 text-center">
                    <motion.h4 variants={fadeUp} style={{ willChange: "transform" }}>
                        <span className="text-white">The Execution Problem </span>
                        <span className="text-gray-200">Modern Organisations Face</span>
                    </motion.h4>
                </div>
            </div>

            {/* ══════════════════════════════════════════
                DESKTOP: Execution Policy heading bar — unchanged
            ══════════════════════════════════════════ */}
            <div className="hidden md:block border-b border-color">
                <Reveal variants={slideInFromBottom(0.1)}>
                    <div className="mx-10 lg:mx-20 xl:mx-24 md:px-10 flex items-center py-8">
                        <Heading text="Execution Policy" />
                    </div>
                </Reveal>
            </div>

            {/* ── MOBILE: Execution Policy — centered, 10px below header ── */}
            <div className="md:hidden mx-10 flex items-center justify-center mt-[10px] mb-8">
                <Heading text="Execution Policy" />
            </div>

            {/* ══════════════════════════════════════════
                DESKTOP grid (md+) — completely unchanged
            ══════════════════════════════════════════ */}
            <div className="hidden md:grid mx-10 lg:mx-20 xl:mx-24 grid-cols-1 md:grid-cols-3">
                {items.map((item, index) => (
                    <Reveal
                        key={item.title}
                        variants={slideInFromBottom(index * 0.15)}
                    >
                        <div
                            className={`
                                flex flex-col
                                transition-colors duration-300
                                hover:bg-white/5
                                md:px-10
                                py-10                                
                                ${index !== 2 ? "border-r md:border-r-0 border-color" : ""}
                            `}
                        >
                            {/* Icon — centered on desktop */}
                            <div className="pb-10 border-b border-color h-[200px] flex items-center justify-center md:justify-center">
                                {item.icon}
                            </div>

                            {/* Content — centered on desktop */}
                            <div className="flex flex-col items-start md:items-center md:text-center gap-4">
                                <h5 className="mb-4 mt-6">{item.title}</h5>
                                <p className="text-b1 font-thin">{item.subHeading}</p>
                                <p className="text-b3">{item.description}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

            {/* ══════════════════════════════════════════
                MOBILE items — centered stack
                Per item: SVG → Title → subHeading
                No description. No bottom margin after last item.
            ══════════════════════════════════════════ */}
            <div className="md:hidden mx-10 flex flex-col items-center pb-[20px]">
                {items.map((item, index) => (
                    <Reveal
                        key={item.title}
                        variants={slideInFromBottom(index * 0.15)}
                        className="w-full"
                    >
                        <div
                            className={`
                                flex flex-col items-center text-center
                                ${index !== items.length - 1 ? "mb-10" : "mb-0 pb-0"}
                            `}
                        >
                            {/* SVG icon */}
                            <div className="flex items-center justify-center mb-4">
                                {item.icon}
                            </div>
                            {/* Title */}
                            <h5 className="text-white mb-1">{item.title}</h5>
                            {/* SubHeading */}
                            <p className="text-b1 font-thin text-gray-300">{item.subHeading}</p>
                        </div>
                    </Reveal>
                ))}
            </div>

        </section>
    );
}