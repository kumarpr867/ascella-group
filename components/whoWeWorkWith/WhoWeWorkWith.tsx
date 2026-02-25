"use client"

import Image from "next/image"
import PlusHeading from "../headings/Heading"
import EnterpriseStartupSystem from "./EnterpriseStartupSystem"
import Heading from "../headings/Heading"

// ── Shared config ─────────────────────────────────────────────────────────────
const SPACING   = 3;
const THRESHOLD = 10;

// ── BRIGHTNESS canvas (rock) ──────────────────────────────────────────────────
const B_RADIUS = 90;
const B_LERP   = 0.13;

interface BParticle {
  x: number; y: number;
  currentAlpha: number;
  size: number;
}

function BrightnessCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<BParticle[]>([]);
  const rafRef       = useRef<number | null>(null);

  const build = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgEl) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width; canvas.height = rect.height;
    const W = canvas.width, H = canvas.height;
    if (!W || !H) return;
    const off = document.createElement("canvas");
    off.width = W; off.height = H;
    const oc = off.getContext("2d")!;
    try {
      oc.drawImage(imgEl, 0, 0, W, H);
      const { data } = oc.getImageData(0, 0, W, H);
      const pts: BParticle[] = [];
      for (let y = 0; y < H; y += SPACING)
        for (let x = 0; x < W; x += SPACING) {
          const i = (y * W + x) * 4;
          if ((data[i] + data[i+1] + data[i+2]) / 3 > THRESHOLD)
            pts.push({ x, y, currentAlpha: 0, size: Math.random() * 1.0 + 0.5 });
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
      for (const p of particlesRef.current) {
        const dx = p.x - mx, dy = p.y - my;
        const t  = Math.max(0, 1 - Math.sqrt(dx*dx+dy*dy) / B_RADIUS);
        const e  = t * t * (3 - 2 * t);
        p.currentAlpha += (e - p.currentAlpha) * B_LERP;
        if (p.currentAlpha < 0.008) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + e * 7), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.currentAlpha * 0.38})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, p.currentAlpha * 1.8)})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    const onMove  = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    if (imgEl) { if (imgEl.complete) build(); else imgEl.addEventListener("load", build); }
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (imgEl) imgEl.removeEventListener("load", build);
    };
  }, [build, imgEl]);

  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"auto", zIndex:10, cursor:"crosshair" }} />;
}

// ── SEGMENT LIFT canvas (sphere) ──────────────────────────────────────────────
// The ring has 11 segments arranged in a circle.
// Each particle belongs to the nearest segment by angle from ring center.
// On hover, particles in the hovered segment gently lift outward (away from center).

const NUM_SEGMENTS  = 11;
const SEG_LERP      = 0.09;   // how fast segment lifts / returns
const LIFT_AMOUNT   = 10;     // px — how far segment moves outward
const HOVER_DIST    = 55;     // px — how close cursor must be to a particle to activate segment

interface SParticle {
  ox: number; oy: number;   // origin
  x:  number; y:  number;   // current (animated)
  // outward direction from ring center (unit vector)
  nx: number; ny: number;
  segIdx: number;           // which of the 11 segments this belongs to
  size: number;
}

interface Segment {
  lift:       number;   // current lift amount (0 → LIFT_AMOUNT)
  targetLift: number;   // 0 = resting, LIFT_AMOUNT = hovered
}

function SegmentLiftCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<SParticle[]>([]);
  const segmentsRef  = useRef<Segment[]>(
    Array.from({ length: NUM_SEGMENTS }, () => ({ lift: 0, targetLift: 0 }))
  );
  const rafRef = useRef<number | null>(null);

  const build = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgEl) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width; canvas.height = rect.height;
    const W = canvas.width, H = canvas.height;
    if (!W || !H) return;

    // Ring center — image center
    const cx = W / 2, cy = H / 2;

    const off = document.createElement("canvas");
    off.width = W; off.height = H;
    const oc = off.getContext("2d")!;
    try {
      oc.drawImage(imgEl, 0, 0, W, H);
      const { data } = oc.getImageData(0, 0, W, H);
      const pts: SParticle[] = [];

      for (let y = 0; y < H; y += SPACING) {
        for (let x = 0; x < W; x += SPACING) {
          const i = (y * W + x) * 4;
          if ((data[i] + data[i+1] + data[i+2]) / 3 <= THRESHOLD) continue;

          // Angle from center → determines segment
          const dx    = x - cx;
          const dy    = y - cy;
          const angle = Math.atan2(dy, dx); // -π to π
          // Normalise to 0..1 then map to segment index
          const norm   = (angle + Math.PI) / (2 * Math.PI); // 0..1
          const segIdx = Math.floor(norm * NUM_SEGMENTS) % NUM_SEGMENTS;

          // Outward unit vector from center
          const dist = Math.sqrt(dx*dx + dy*dy) || 1;

          pts.push({
            ox: x, oy: y,
            x,  y,
            nx: dx / dist,
            ny: dy / dist,
            segIdx,
            size: Math.random() * 1.0 + 0.5,
          });
        }
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

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const segs = segmentsRef.current;

      // ── Determine which segment the cursor is hovering ──────────
      // Find closest particle to cursor; activate its segment
      let hoveredSeg = -1;
      let minDist    = HOVER_DIST;

      for (const p of particlesRef.current) {
        const dx   = p.ox - mx;
        const dy   = p.oy - my;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < minDist) {
          minDist    = dist;
          hoveredSeg = p.segIdx;
        }
      }

      // Update segment targets
      for (let s = 0; s < NUM_SEGMENTS; s++) {
        segs[s].targetLift = s === hoveredSeg ? LIFT_AMOUNT : 0;
        segs[s].lift += (segs[s].targetLift - segs[s].lift) * SEG_LERP;
      }

      // ── Draw particles displaced by their segment's lift ─────────
      for (const p of particlesRef.current) {
        const lift = segs[p.segIdx].lift;
        p.x = p.ox + p.nx * lift;
        p.y = p.oy + p.ny * lift;

        // Skip if at origin and no lift
        if (lift < 0.3 && Math.abs(p.x - p.ox) < 0.3) continue;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const onMove  = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    if (imgEl) { if (imgEl.complete) build(); else imgEl.addEventListener("load", build); }
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (imgEl) imgEl.removeEventListener("load", build);
    };
  }, [build, imgEl]);

  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"auto", zIndex:10, cursor:"crosshair" }} />;
}

// ── Generic wrapper ───────────────────────────────────────────────────────────
function ParticleImage({
  src, alt, width, height, className, style, mode,
}: {
  src: string; alt: string; width?: number; height?: number;
  className?: string; style?: React.CSSProperties; mode: "brightness" | "segment-lift";
}) {
  const wrapRef           = useRef<HTMLDivElement>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current?.querySelector("img") as HTMLImageElement | null;
    if (el) setImgEl(el);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative", display: "inline-block", ...style }}>
      <Image
        src={src} alt={alt}
        width={width} height={height}
        crossOrigin="anonymous"
        className={className}
      />
      {mode === "brightness"
        ? <BrightnessCanvas    imgEl={imgEl} />
        : <SegmentLiftCanvas   imgEl={imgEl} />
      }
    </div>
  );
}

// ── WhoWeWorkWith ─────────────────────────────────────────────────────────────
export default function WhoWeWorkWith() {
  return (
    <section className="border-y border-color">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 border-x border-color">
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-auto lg:grid-rows-[minmax(220px,auto)_1fr_minmax(140px,auto)] lg:border-r border-color">


            <div className="border-b border-color px-6 py-6 lg:px-8 lg:py-10">
              <h2 className="leading">
                Who We <span className="text-gray-200">Work With</span>
              </h2>
              <p className="mt-6 text-b2 font-light max-w-xs">
                Ascella partners with organisations where execution quality, governance discipline, and accountable ownership are business-critical rather than optional.
              </p>
            </div>


            <div className="hidden lg:block border-l border-b border-color" />


            <div className="border-b border-color px-6 py-8 lg:px-8 flex items-center gap-6">
              <div className="flex flex-center border border-color p-3 rounded-4xl hover:scale-110 transition">
                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 14.25L14 0.25M14 0.25H0M14 0.25V15.25" stroke="white" strokeWidth="1" />
                </svg>
              </div>
              <p className="text-b2">Engagements are selective by design.</p>
            </div>

            <div className="border-b lg:border-l border-color px-6 py-8 lg:p-10 flex items-center">
              <p className="text-b2 text-gray-100 max-w-md">
                Work begins only where leadership recognises that structure, oversight, and measurable control determine long-term outcomes.
              </p>
            </div>

            <div className="px-6 py-10 lg:p-10 flex items-end">
              <Heading text="Scroll Down"/>
            </div>

            <div className="lg:border-l border-color px-6 py-10 lg:p-10 flex items-end justify-end">
              <ParticleImage
                src="/whoWeWorkWith/rock.png"
                alt="Rock texture"
                width={180}
                height={180}
                className="opacity-80"
                mode="brightness"
              />
            </div>
          </div>


          <div className="flex items-center justify-center p-10 h-full w-full">
            <EnterpriseStartupSystem />
          </div>

        </div>
      </div>
    </section>
  )
}