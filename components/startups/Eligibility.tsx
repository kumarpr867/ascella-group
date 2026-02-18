"use client";

import React, { useEffect, useRef } from "react";
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

    // ✅ Cast to CanvasRenderingContext2D so TypeScript doesn't lose narrowing inside closures
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

    // ── Precompute ring radii ──
    const numRings = 32;
    const ringRadii: number[] = [];
    for (let i = 0; i <= numRings; i++) {
      const fraction = i / numRings;
      const theta = fraction * totalTheta;
      ringRadii.push(R(theta));
    }

    // ── Traveling dots state ──
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

    // ── Mouse hover detection ──
    const handleMouseMove = (e: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const handleMouseLeave = (): void => {
      mouseRef.current = null;
    };

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
        if (dist >= ringRadii[i - 1] && dist <= ringRadii[i]) {
          ringIdx = i;
          break;
        }
      }
      if (ringIdx === -1) return null;

      let angle = Math.atan2(dy, dx) + Math.PI / 2;
      if (angle < 0) angle += Math.PI * 2;
      if (angle >= Math.PI * 2) angle -= Math.PI * 2;
      const spokeIdx = Math.floor((angle / (Math.PI * 2)) * numSpokes);

      return { ringIdx, spokeIdx };
    }

    function draw(): void {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);

      const hoveredCell = getHoveredCell();

      // ── HOVERED CELL FILL (drawn BEFORE rings/spokes) ──
      if (hoveredCell) {
        const { ringIdx, spokeIdx } = hoveredCell;
        const rInner = ringRadii[ringIdx - 1];
        const rOuter = ringRadii[ringIdx];
        const angleStart = (spokeIdx / numSpokes) * Math.PI * 2 - Math.PI / 2;
        const angleEnd = ((spokeIdx + 1) / numSpokes) * Math.PI * 2 - Math.PI / 2;

        // Soft fill
        ctx.fillStyle = "rgba(255,255,255,0.07)";
        ctx.beginPath();
        ctx.arc(cx, cy, rOuter, angleStart, angleEnd);
        ctx.arc(cx, cy, rInner, angleEnd, angleStart, true);
        ctx.closePath();
        ctx.fill();

        // Glow passes
        for (let g = 1; g <= 5; g++) {
          ctx.strokeStyle = `rgba(255,255,255,${0.18 / g})`;
          ctx.lineWidth = g * 3;
          ctx.beginPath();
          ctx.arc(cx, cy, rOuter, angleStart, angleEnd);
          ctx.arc(cx, cy, rInner, angleEnd, angleStart, true);
          ctx.closePath();
          ctx.stroke();
        }

        // Crisp bright border
        ctx.strokeStyle = "rgba(255,255,255,0.55)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, rOuter, angleStart, angleEnd);
        ctx.arc(cx, cy, rInner, angleEnd, angleStart, true);
        ctx.closePath();
        ctx.stroke();
      }

      // ── CONCENTRIC ARC RINGS ──
      for (let i = 0; i <= numRings; i++) {
        const fraction = i / numRings;
        const r = ringRadii[i];
        const opacity = 0.18 + fraction * 0.65;
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = fraction > 0.9 ? 0.9 : 0.6;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── RADIAL SPOKES ──
      for (let i = 0; i < numSpokes; i++) {
        const angle = (i / numSpokes) * Math.PI * 2 - Math.PI / 2;
        const rInner = R(0) * 0.3;
        const rOuter = R(totalTheta);
        ctx.strokeStyle = "rgba(255,255,255,0.22)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(cx + rInner * Math.cos(angle), cy + rInner * Math.sin(angle));
        ctx.lineTo(cx + rOuter * Math.cos(angle), cy + rOuter * Math.sin(angle));
        ctx.stroke();
      }

      // ── SPIRAL CURVE ──
      const spiralSegs = 600;
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      for (let s = 0; s <= spiralSegs; s++) {
        const theta = (s / spiralSegs) * totalTheta;
        const r = R(theta);
        const x = cx + r * Math.cos(theta - Math.PI / 2);
        const y = cy + r * Math.sin(theta - Math.PI / 2);
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // ── TRAVELING DOTS along spiral ──
      for (let i = dots.length - 1; i >= 0; i--) {
        const dot = dots[i];
        dot.progress += dot.speed;

        if (dot.progress > 1) {
          dots.splice(i, 1);
          continue;
        }

        const theta = dot.progress * totalTheta;
        const r = R(theta);
        const x = cx + r * Math.cos(theta - Math.PI / 2);
        const y = cy + r * Math.sin(theta - Math.PI / 2);

        const fadeIn = Math.min(dot.progress / 0.05, 1);
        const fadeOut = Math.min((1 - dot.progress) / 0.08, 1);
        const alpha = dot.opacity * fadeIn * fadeOut;

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

      // ── CENTER STARBURST ──
      const numStar = 28;
      const starOuter = R(Math.PI * 0.6);
      for (let i = 0; i < numStar; i++) {
        const angle = (i / numStar) * Math.PI * 2;
        const opacity = 0.7 + 0.3 * Math.abs(Math.sin(i));
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx + 2 * Math.cos(angle), cy + 2 * Math.sin(angle));
        ctx.lineTo(cx + starOuter * Math.cos(angle), cy + starOuter * Math.sin(angle));
        ctx.stroke();
      }

      // ── CENTER GLOW ──
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.3, "rgba(255,255,255,0.6)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      // Spawn logic
      spawnTimer++;
      if (spawnTimer >= SPAWN_INTERVAL) {
        spawnDot();
        spawnTimer = 0;
      }

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
  const criteria = [
    { id: "01", text: "Minimum 8 team members" },
    { id: "02", text: "Raised less than $1M in total funding" },
    { id: "03", text: "Annual Recurring Revenue (ARR) below $2M" },
  ];

  return (
    <section className="min-h-screen w-full bg-black text-white py-20 px-6 md:px-12 lg:px-24 flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── Left: Spiral ── */}
        <div className="flex flex-col gap-4">
          <div style={{ width: 480, height: 433, flexShrink: 0 }}>
            <SpiralCanvas />
          </div>
          <p className="text-gray-400 text-lg md:text-xl">
            <span className="text-white">Engagement</span>{" "}
            is selective by design.
          </p>
        </div>

        {/* ── Right: Content ── */}
        <div className="flex flex-col space-y-8">

          {/* Label */}
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-gray-400 font-semibold">
            <Plus size={14} className="text-white" />
            <span>ELIGIBILITY CRITERIA</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-light leading-tight max-w-xl">
            The programme is{" "}
            <span className="text-gray-400">designed</span> for startups
            preparing for structured, accountable execution at scale.
          </h2>

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
              <div className="grid grid-cols-3 gap-1 h-fit pt-1 opacity-40">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-white" />
                ))}
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                To qualify for the Ascella for Startups program,{" "}
                <br className="hidden md:block" />
                your startup should meet the following:
              </p>
            </div>

            {/* Criteria list */}
            <div className="space-y-0">
              {criteria.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center py-6 ${
                    index !== criteria.length - 1 ? "border-b" : ""
                  }`}
                  style={
                    index !== criteria.length - 1
                      ? { borderColor: "rgba(255,255,255,0.08)" }
                      : {}
                  }
                >
                  <span className="font-mono text-sm mr-8 text-gray-500">
                    {item.id}
                  </span>
                  <span className="text-base md:text-lg font-light">
                    {item.text}
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