"use client"
import React from 'react';

const RadarCanvas: React.FC<{ fillHeight?: boolean }> = ({ fillHeight = false }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouseRef = React.useRef<{ x: number; y: number } | null>(null);
  const isHoveredRef = React.useRef(false);
  const currentAngleRef = React.useRef((135 * Math.PI) / 180);
  const targetsRef = React.useRef([
    { angle: 0.5,  radius: 0.83, timer: 0,    interval: 4   },
    { angle: 2.3,  radius: 0.57, timer: -1.5, interval: 5   },
    { angle: 4.1,  radius: 0.47, timer: -2,   interval: 4.5 },
  ]);
  const lastTimeRef = React.useRef(0);
  const animRef = React.useRef(0);

  const draw = React.useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const delta = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
    lastTimeRef.current = timestamp;

    const W = container.clientWidth;
    const H = container.clientHeight;

    if (!W || !H) { animRef.current = requestAnimationFrame(draw); return; }

    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const maxR = fillHeight ? H / 2 : W / 2 - 24;
    const cx = fillHeight ? (W / 2 - maxR * 0.08) : W / 2;
    const cy = H / 2;

    ctx.beginPath();
    ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, maxR * 0.66, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    for (let i = 0; i < 80; i++) {
      const theta = (i / 80) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(theta) * maxR * 0.83, cy + Math.sin(theta) * maxR * 0.83, maxR * 0.0078, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fill();
    }

    for (let i = 0; i < 56; i++) {
      const theta = (i / 56) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(theta) * maxR * 0.47, cy + Math.sin(theta) * maxR * 0.47, maxR * 0.0078, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fill();
    }

    [0.16, 0.25, 0.36, 0.50].forEach((fr, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * fr, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.16 - i * 0.02})`;
      ctx.lineWidth = 1.1;
      ctx.stroke();
    });

    ctx.beginPath();
    ctx.arc(cx, cy, maxR * 0.019, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, cy - maxR);
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth = maxR * 0.003;
    ctx.stroke();

    if (isHoveredRef.current && mouseRef.current) {
      const mx = mouseRef.current.x - cx;
      const my = mouseRef.current.y - cy;
      const targetAngle = Math.atan2(my, mx);
      let diff = targetAngle - currentAngleRef.current;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      currentAngleRef.current += diff * Math.min(delta * 8, 1);
    } else {
      currentAngleRef.current -= 0.3 * delta;
    }

    const dotCount = 38;
    for (let i = 0; i < dotCount; i++) {
      const t = (i / (dotCount - 1)) * maxR;
      const px = cx + Math.cos(currentAngleRef.current) * t;
      const py = cy + Math.sin(currentAngleRef.current) * t;
      ctx.beginPath();
      ctx.arc(px, py, maxR * 0.0064, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.28 + (i / dotCount) * 0.15})`;
      ctx.fill();
    }

    const elapsed = timestamp / 1000;
    targetsRef.current.forEach((target) => {
      if (elapsed - target.timer >= target.interval) {
        target.timer = elapsed;
        target.angle = Math.random() * Math.PI * 2;
      }
      const r = maxR * target.radius;
      const px = cx + Math.cos(target.angle) * r;
      const py = cy + Math.sin(target.angle) * r;
      const s = maxR * 0.032;
      const since = elapsed - target.timer;
      const opacity = since < 0.3 ? since / 0.3 : 1;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px - s / 2, py - s / 2, s, s);
      ctx.restore();
    });

    animRef.current = requestAnimationFrame(draw);
  }, [fillHeight]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      isHoveredRef.current = true;
    };
    const onLeave = () => { isHoveredRef.current = false; };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [draw]);

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0 }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
};

const Delivery = () => {
  return (
    <section className="w-full border-y border-color my-20">

      {/* ===================== DESKTOP (lg+) ===================== */}
      <div className="hidden lg:flex flex-row w-full min-h-[90vh]">
        <div className="w-1/2 flex flex-col justify-between pl-30 pr-16 py-12">
          <div className="max-w-[360px]">
            <h3 className="text-3xl font-light leading-tight mb-2 tracking-tight">
              Delivery is organised through governed pods under central oversight.
            </h3>
            <p className="text-b2 text-[12px] text-gray-200 leading-relaxed">
              Teams operate within small, accountable pods aligned to specific execution outcomes.
              Pods are coordinated through Ascella's governance layer, performance measurement
              frameworks, and escalation structures. Collaboration across execution arms occurs
              through defined operating pathways.
            </p>
          </div>
          <div className="flex items-center gap-4 pt-30 max-w-[360px]">
            <div className="border border-white/25 rounded-full w-11 h-11 flex items-center justify-center text-xl shrink-0">
              ↗
            </div>
            <span className="text-lg font-light">Pods execute. Governance coordinates.</span>
          </div>
        </div>
        <div className="w-1/2 relative self-stretch">
          {/* right-10 = 40px matching footer desktop mx-10 */}
          <div className="absolute inset-0 right-10">
            <RadarCanvas fillHeight={true} />
          </div>
        </div>
      </div>

      {/* ===================== MOBILE (< lg) ===================== */}
      {/* ONLY CHANGE: px-6 → px-10 and mx-6 → mx-10 to match footer */}
      <div className="lg:hidden flex flex-col w-full">

        {/* Content block */}
        <div className="px-10 pt-10 pb-8">
          <h3 className="text-2xl font-light leading-tight mb-5 tracking-tight">
            Delivery is organised through governed pods under central oversight.
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Teams operate within small, accountable pods aligned to specific execution outcomes.
            Pods are coordinated through Ascella's governance layer, performance measurement
            frameworks, and escalation structures. Collaboration across execution arms occurs
            through defined operating pathways.
          </p>
        </div>

        {/* Circle block — square, with horizontal margin */}
        <div className="mx-10 relative" style={{ aspectRatio: '1 / 1' }}>
          <RadarCanvas fillHeight={false} />
        </div>

        {/* Full-width divider */}
        <div className="w-full border-t border-white/15 mt-8" />

        {/* Pods execute row */}
        <div className="flex items-center gap-4 px-10 py-6">
          <div className="border border-white/25 rounded-full w-10 h-10 flex items-center justify-center text-lg shrink-0">
            ↗
          </div>
          <span className="text-base font-light">Pods execute. Governance coordinates.</span>
        </div>

        {/* Bottom divider */}
        <div className="w-full border-t border-white/15" />

      </div>

    </section>
  );
};

export default Delivery;