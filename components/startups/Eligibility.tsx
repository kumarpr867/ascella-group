"use client";

import React, { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

// ─── Nautilus Spiral – pure 2D Canvas ────────────────────────────────────────

interface Dot {
  progress: number;
  speed: number;
  opacity: number;
  size: number;
}

const SpiralCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const W = 480;
    const H = 433;
    canvas.width = W;
    canvas.height = H;

    const cx = W * 0.47;
    const cy = H * 0.50;

    const a = 1.8;
    const b = 0.29;
    const totalTurns = 3.5;
    const totalTheta = Math.PI * 2 * totalTurns;

    const rMax = a * Math.exp(b * totalTheta);
    const scale = 205 / rMax;
    const R = (theta: number): number => a * Math.exp(b * theta) * scale;

    const numRings = 32;
    const ringRadii: number[] = [];
    for (let i = 0; i <= numRings; i++) {
      ringRadii.push(R((i / numRings) * totalTheta));
    }

    const dots: Dot[] = [];
    const MAX_DOTS = 18;

    function spawnDot(): void {
      if (dots.length < MAX_DOTS) {
        dots.push({
          progress: 0,
          speed: 0.0008 + Math.random() * 0.0012,
          opacity: 0.6 + Math.random() * 0.4,
          size: 1.5 + Math.random() * 2,
        });
      }
    }

    let spawnTimer = 0;
    const SPAWN_INTERVAL = 40;
    const numSpokes = 34;

    const handleMouseMove = (e: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * (W / rect.width),
        y: (e.clientY - rect.top) * (H / rect.height),
      };
    };
    const handleMouseLeave = (): void => { mouseRef.current = null; };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    function getHoveredCell(): { ringIdx: number; spokeIdx: number } | null {
      const mouse = mouseRef.current;
      if (!mouse) return null;
      const dx = mouse.x - cx;
      const dy = mouse.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < ringRadii[0] * 0.5 || dist > ringRadii[numRings] * 1.05) return null;
      let ringIdx = -1;
      for (let i = 1; i <= numRings; i++) {
        if (dist >= ringRadii[i - 1] && dist <= ringRadii[i]) { ringIdx = i; break; }
      }
      if (ringIdx === -1) return null;
      let angle = Math.atan2(dy, dx) + Math.PI / 2;
      if (angle < 0) angle += Math.PI * 2;
      if (angle >= Math.PI * 2) angle -= Math.PI * 2;
      return { ringIdx, spokeIdx: Math.floor((angle / (Math.PI * 2)) * numSpokes) };
    }

    function draw(): void {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);

      const hoveredCell = getHoveredCell();

      if (hoveredCell) {
        const { ringIdx, spokeIdx } = hoveredCell;
        const rInner = ringRadii[ringIdx - 1];
        const rOuter = ringRadii[ringIdx];
        const angleStart = (spokeIdx / numSpokes) * Math.PI * 2 - Math.PI / 2;
        const angleEnd = ((spokeIdx + 1) / numSpokes) * Math.PI * 2 - Math.PI / 2;
        ctx.fillStyle = "rgba(255,255,255,0.07)";
        ctx.beginPath();
        ctx.arc(cx, cy, rOuter, angleStart, angleEnd);
        ctx.arc(cx, cy, rInner, angleEnd, angleStart, true);
        ctx.closePath();
        ctx.fill();
        for (let g = 1; g <= 5; g++) {
          ctx.strokeStyle = `rgba(255,255,255,${0.18 / g})`;
          ctx.lineWidth = g * 3;
          ctx.beginPath();
          ctx.arc(cx, cy, rOuter, angleStart, angleEnd);
          ctx.arc(cx, cy, rInner, angleEnd, angleStart, true);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.strokeStyle = "rgba(255,255,255,0.55)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, rOuter, angleStart, angleEnd);
        ctx.arc(cx, cy, rInner, angleEnd, angleStart, true);
        ctx.closePath();
        ctx.stroke();
      }

      for (let i = 0; i <= numRings; i++) {
        const fraction = i / numRings;
        ctx.strokeStyle = `rgba(255,255,255,${0.18 + fraction * 0.65})`;
        ctx.lineWidth = fraction > 0.9 ? 0.9 : 0.6;
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadii[i], 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < numSpokes; i++) {
        const angle = (i / numSpokes) * Math.PI * 2 - Math.PI / 2;
        ctx.strokeStyle = "rgba(255,255,255,0.22)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(cx + R(0) * 0.3 * Math.cos(angle), cy + R(0) * 0.3 * Math.sin(angle));
        ctx.lineTo(cx + R(totalTheta) * Math.cos(angle), cy + R(totalTheta) * Math.sin(angle));
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      for (let s = 0; s <= 600; s++) {
        const theta = (s / 600) * totalTheta;
        const r = R(theta);
        const x = cx + r * Math.cos(theta - Math.PI / 2);
        const y = cy + r * Math.sin(theta - Math.PI / 2);
        s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      for (let i = dots.length - 1; i >= 0; i--) {
        const dot = dots[i];
        dot.progress += dot.speed;
        if (dot.progress > 1) { dots.splice(i, 1); continue; }
        const theta = dot.progress * totalTheta;
        const r = R(theta);
        const x = cx + r * Math.cos(theta - Math.PI / 2);
        const y = cy + r * Math.sin(theta - Math.PI / 2);
        const alpha = dot.opacity * Math.min(dot.progress / 0.05, 1) * Math.min((1 - dot.progress) / 0.08, 1);
        const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, dot.size * 4);
        glowGrad.addColorStop(0, `rgba(255,255,255,${alpha})`);
        glowGrad.addColorStop(0.4, `rgba(255,255,255,${alpha * 0.4})`);
        glowGrad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(x, y, dot.size * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      }

      const starOuter = R(Math.PI * 0.6);
      for (let i = 0; i < 28; i++) {
        const angle = (i / 28) * Math.PI * 2;
        ctx.strokeStyle = `rgba(255,255,255,${0.7 + 0.3 * Math.abs(Math.sin(i))})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx + 2 * Math.cos(angle), cy + 2 * Math.sin(angle));
        ctx.lineTo(cx + starOuter * Math.cos(angle), cy + starOuter * Math.sin(angle));
        ctx.stroke();
      }

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.3, "rgba(255,255,255,0.6)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      spawnTimer++;
      if (spawnTimer >= SPAWN_INTERVAL) { spawnDot(); spawnTimer = 0; }
      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 480, height: 433, display: "block", cursor: "crosshair" }}
    />
  );
};

// ─── Eligibility Section ──────────────────────────────────────────────────────

export default function Eligibility() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const criteria = [
    { id: "01", text: "Minimum 8 team members" },
    { id: "02", text: "Raised less than $1M in total funding" },
    { id: "03", text: "Annual Recurring Revenue (ARR) below $2M" },
  ];

  return (
    <section className="w-full h-screen overflow-hidden bg-black text-white flex items-center px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── Left: Spiral ── */}
        <div className="flex flex-col gap-4">
          <div style={{ width: 480, height: 433, flexShrink: 0 }}>
            <SpiralCanvas />
          </div>
          <p className="text-gray-400 pt-[85px] text-lg md:text-xl">
            <span className="text-white">Engagement</span>{" "}
            is selective by design.
          </p>
        </div>

        {/* ── Right: Content ── */}
        <div className="flex flex-col space-y-8">

          {/* Label */}
          <div className="flex items-center gap-1 text-1xl tracking-[0.2em]  ">
            <svg width="12" height="12" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="10.833" width="4.33333" height="10.8333" fill="white"/>
<rect x="10.833" y="15.1666" width="4.33333" height="10.8333" fill="white"/>
<rect x="15.167" y="10.8334" width="10.8333" height="4.33333" fill="white"/>
<rect y="10.8334" width="10.8333" height="4.33333" fill="white"/>
</svg>

            <span >ELIGIBILITY CRITERIA</span>
          </div>

          {/* Heading */}
          <h3 className="text-3xl md:text-3xl leading-tight max-w-xl">
            The programme is designed{" "}
            <span className="text-gray-400">for startups
            preparing for structured, accountable execution at scale.
            </span> 
          </h3>

          {/* Card */}
          <div
            className="backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Card header */}
            <div className="flex gap-4 mb-8">
             <svg width="42" height="28" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="7" y="14" width="7" height="7" fill="#3D3D3D"/>
<rect x="14" y="7" width="7" height="7" fill="#3D3D3D"/>
<rect x="14" y="14" width="7" height="7" fill="#3D3D3D"/>
<rect x="21" y="14" width="7" height="7" fill="#3D3D3D"/>
<rect x="35" y="14" width="7" height="7" fill="#3D3D3D"/>
<rect x="28" y="6" width="7" height="7" fill="#3D3D3D"/>
<rect y="21" width="7" height="7" fill="#3D3D3D"/>
<rect x="7" y="21" width="7" height="7" fill="#3D3D3D"/>
<rect y="7" width="7" height="7" fill="#3D3D3D"/>
<rect x="7" width="7" height="7" fill="#3D3D3D"/>
</svg>

              <h5 className=" text-sm md:text-base leading-relaxed">
                To qualify for the Ascella for Startups program,{" "}
                <br className="hidden md:block" />
                your startup should meet the following:
              </h5>
            </div>

            {/* Criteria list */}
            <div className="space-y-0">
              {criteria.map((item, index) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`flex items-center py-6 relative overflow-hidden ${
                    index !== criteria.length - 1 ? "border-b" : ""
                  }`}
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    paddingLeft: hoveredRow === index ? "10px" : "0px",
                    cursor: "default",
                    transition: "padding-left 0.35s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  {/* Slide-in hover fill */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, transparent 80%)",
                      transform: hoveredRow === index ? "translateX(0)" : "translateX(-100%)",
                      transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />

                  {/* Number */}
                  <span
                    className=" text-sm relative"
                    style={{
                      width: "36px",
                      flexShrink: 0,
                      color: hoveredRow === index ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.3)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {item.id}
                  </span>

                  {/* Vertical bar */}
                 

                  {/* Text */}
                  <span
                    className="text-base md:text-lg  relative"
                    style={{
                      color: hoveredRow === index ? "rgba(255,255,255,255)" : "rgba(255,255,255,0.75)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {item.text}
                  </span>

                  {/* Arrow */}
                  <span
                    className="ml-auto relative font-mono text-xs"
                    style={{
                      color: hoveredRow === index ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0)",
                      transform: hoveredRow === index ? "translateX(0)" : "translateX(-8px)",
                      transition: "color 0.3s ease, transform 0.3s ease",
                    }}
                  >
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}