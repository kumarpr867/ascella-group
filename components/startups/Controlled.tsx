'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

// ══════════════════════════════════════════════════════════════════════════════
// WAVE CANVAS — smooth water surface wave, no scatter
// Key idea: each particle oscillates with sin wave, amplitude grows near cursor
// and travels outward like real water ripple
// ══════════════════════════════════════════════════════════════════════════════
const SPACING   = 3;
const THRESHOLD = 8;

function WaveCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const ripplesRef   = useRef<{ x: number; y: number; t: number; strength: number }[]>([]);
  const particlesRef = useRef<
    {
      x: number;
      y: number;
      phase: number; // unique phase per particle for organic feel
      amp: number;   // current amplitude — smoothly grows/fades
      size: number;
      alpha: number;
    }[]
  >([]);
  const rafRef       = useRef<number | null>(null);
  const lastMouseRef = useRef({ x: -9999, y: -9999 });
  const frameRef     = useRef(0);

  const buildParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgEl) return;

    const rect    = canvas.getBoundingClientRect();
    canvas.width  = rect.width;
    canvas.height = rect.height;

    const W = canvas.width;
    const H = canvas.height;
    if (W === 0 || H === 0) return;

    const off    = document.createElement('canvas');
    off.width    = W;
    off.height   = H;
    const offCtx = off.getContext('2d')!;

    try {
      offCtx.drawImage(imgEl, 0, 0, W, H);
      const { data } = offCtx.getImageData(0, 0, W, H);
      const pts: typeof particlesRef.current = [];

      for (let y = 0; y < H; y += SPACING) {
        for (let x = 0; x < W; x += SPACING) {
          const i          = (y * W + x) * 4;
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const a          = data[i + 3];
          if (a < 10 || brightness <= THRESHOLD) continue;

          pts.push({
            x,
            y,
            phase: (x * 0.04) + (y * 0.04), // spatial phase — makes wave travel
            amp:   0,
            size:  Math.random() * 0.8 + 0.3,
            alpha: (brightness / 255) * 0.55,
          });
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
    const ctx = canvas.getContext('2d')!;

    const loop = () => {
      frameRef.current += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Spawn ripple only when mouse actually moves
      const lx    = lastMouseRef.current.x;
      const ly    = lastMouseRef.current.y;
      const moved = Math.sqrt((mx - lx) ** 2 + (my - ly) ** 2);
      if (moved > 6 && mx > 0) {
        ripplesRef.current.push({
          x:        mx,
          y:        my,
          t:        0,
          strength: Math.min(moved / 12, 1.5),
        });
        lastMouseRef.current = { x: mx, y: my };
      }

      // Kill old ripples
      ripplesRef.current = ripplesRef.current.filter((r) => r.t < 120);
      for (const r of ripplesRef.current) r.t += 1;

      const hasRipples = ripplesRef.current.length > 0;

      for (const p of particlesRef.current) {
        // Skip if no ripples and amplitude is dead
        if (!hasRipples && p.amp < 0.005) continue;

        // Calculate target amplitude from all ripples
        let targetAmp = 0;
        for (const r of ripplesRef.current) {
          const dx   = p.x - r.x;
          const dy   = p.y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Ring expands outward at speed 3px/frame
          const ringFront = r.t * 3;
          const ringWidth = 60;
          const fromFront = dist - ringFront;

          // Only particles just ahead of and behind the ring front are affected
          if (fromFront > -20 && fromFront < ringWidth) {
            // Smooth bell curve across ring width
            const t        = Math.max(0, 1 - fromFront / ringWidth);
            const envelope = t * t * (3 - 2 * t); // smoothstep
            const decay    = Math.max(0, 1 - r.t / 110);
            targetAmp     += envelope * decay * r.strength * 6;
          }
        }

        // Amplitude: rise quickly, fall slowly (natural wave damping)
        if (targetAmp > p.amp) {
          p.amp += (targetAmp - p.amp) * 0.25;
        } else {
          p.amp *= 0.93; // exponential decay — smooth fade out
        }

        if (p.amp < 0.005) continue;

        // Pure sinusoidal wave — spatial phase makes it TRAVEL not just pulse
        // p.phase encodes position so wave propagates like real water
        const t    = frameRef.current * 0.06;
        const wave = Math.sin(t - p.phase);
        const dy   = wave * Math.min(p.amp, 3.5); // max 3.5px — no big scatter

        // Draw at offset position — same size, no glow
        ctx.beginPath();
        ctx.arc(p.x, p.y + dy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.min(p.alpha + p.amp * 0.05, 0.9)})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    // Window-level mouse tracking — bypasses any overlapping divs
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current     = { x: -9999, y: -9999 };
        lastMouseRef.current = { x: -9999, y: -9999 };
      }
    };

    window.addEventListener('mousemove', onMove);

    const ro = new ResizeObserver(buildParticles);
    ro.observe(canvas);

    if (imgEl) {
      if (imgEl.complete) buildParticles();
      else imgEl.addEventListener('load', buildParticles);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (imgEl) imgEl.removeEventListener('load', buildParticles);
    };
  }, [buildParticles, imgEl]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        20,
      }}
    />
  );
}

// ── ParticleGlobe ─────────────────────────────────────────────────────────────
function ParticleGlobe() {
  const wrapRef           = useRef<HTMLDivElement>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const el = wrap.querySelector('img') as HTMLImageElement | null;
    if (el) setImgEl(el);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position:  'absolute',
        width:     '761px',
        height:    '677px',
        top:       '30px',
        left:      '-200px',
        transform: 'rotate(158.67deg)',
      }}
    >
      {/* Original image — exactly same as before */}
      <img
        src="/globe2.png"
        alt="Globe Decor"
        crossOrigin="anonymous"
        className="absolute opacity-55 object-contain max-w-none"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      {/* Canvas overlay — transparent until hover triggers wave */}
      <WaveCanvas imgEl={imgEl} />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const Controlled = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col">

      {/* --- GRID LINES --- */}
      <div className="absolute left-0 w-full h-px bg-white/20 z-50" />
      <div className="absolute top-[100px] left-0 w-full h-px bg-white/20 z-50" />
      <div className="absolute bottom-[120px] left-0 w-full h-px bg-white/20 z-50" />
      <div className="absolute top-0 left-6 sm:left-10 lg:left-24 w-px h-full bg-white/20 z-50" />
      <div className="absolute top-0 right-6 sm:right-10 lg:right-24 w-px h-full bg-white/20 z-50" />

      {/* --- IMAGE CONTAINER --- */}
      <div className="absolute top-[100px] bottom-[120px] left-6 sm:left-10 lg:left-24 right-6 sm:right-10 lg:right-24 overflow-hidden z-10">
        <ParticleGlobe />
      </div>

      {/* --- CONTENT LAYER — pointer-events-none so mouse passes through --- */}
      <div className="relative z-40 flex flex-col h-screen pointer-events-none">

        <div className="h-[100px] w-full" />

        <div className="flex-grow flex flex-col justify-center items-end px-10 lg:px-40">
          <div className="max-w-4xl pr-45">
            <h2 className="text-[20px] md:text-[40px] lg:text-[48px] leading-[1.05] tracking-tight">
              Controlled execution <br />
            </h2>
            <h2 className="pl-25">units for <span className="text-white/30">complex</span></h2>
            <h2 className="pl-25 text-white/30">Opetating Environments</h2>

            <div className="mt-8 flex items-center justify-end gap-8 group cursor-pointer pointer-events-auto">
              <p className="text-[10px] text-white/50 max-w-[300px] leading-relaxed uppercase tracking-[0.2em] text-left">
                Early-stage execution succeeds or fails based on operating structure.
              </p>
              <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700">
                <span className="text-2xl font-light">↓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer — pointer-events-auto so buttons still work */}
        <div className="h-[100px] flex items-center justify-between px-8 lg:px-32 relative z-50 pointer-events-auto">
          <Link href="/engageWithUs">
            <button className="relative px-8 py-4 border border-white/10 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all">
              Engage With Us <span className="ml-2 opacity-30">:::</span>
            </button>
          </Link>
          <p className="hidden md:block text-[9px] tracking-[0.15em] max-w-[320px] text-right uppercase leading-tight">
            The Ascella Startups Programme embeds governance, accountability, and execution discipline before scale begins.
          </p>
        </div>
      </div>

    </section>
  );
};

export default Controlled;