'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

// ══════════════════════════════════════════════════════════════════════════════
// WAVE CANVAS
// ══════════════════════════════════════════════════════════════════════════════
const SPACING   = 3;
const THRESHOLD = 8;

function WaveCanvas({ imgEl }: { imgEl: HTMLImageElement | null }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const ripplesRef   = useRef<{ x: number; y: number; t: number; strength: number }[]>([]);
  const particlesRef = useRef<
    { x: number; y: number; phase: number; amp: number; size: number; alpha: number }[]
  >([]);
  const rafRef       = useRef<number | null>(null);
  const lastMouseRef = useRef({ x: -9999, y: -9999 });
  const frameRef     = useRef(0);

  const buildParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgEl) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const W = canvas.width, H = canvas.height;
    if (!W || !H) return;
    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const offCtx = off.getContext('2d')!;
    try {
      offCtx.drawImage(imgEl, 0, 0, W, H);
      const { data } = offCtx.getImageData(0, 0, W, H);
      const pts: typeof particlesRef.current = [];
      for (let y = 0; y < H; y += SPACING) {
        for (let x = 0; x < W; x += SPACING) {
          const i = (y * W + x) * 4;
          const brightness = (data[i] + data[i+1] + data[i+2]) / 3;
          if (data[i+3] < 10 || brightness <= THRESHOLD) continue;
          pts.push({ x, y, phase: x*0.04+y*0.04, amp: 0, size: Math.random()*0.8+0.3, alpha: (brightness/255)*0.55 });
        }
      }
      particlesRef.current = pts;
    } catch { particlesRef.current = []; }
  }, [imgEl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const loop = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const lx = lastMouseRef.current.x, ly = lastMouseRef.current.y;
      const moved = Math.sqrt((mx-lx)**2+(my-ly)**2);
      if (moved > 6 && mx > 0) {
        ripplesRef.current.push({ x:mx, y:my, t:0, strength: Math.min(moved/12,1.5) });
        lastMouseRef.current = { x:mx, y:my };
      }
      ripplesRef.current = ripplesRef.current.filter(r => r.t < 120);
      for (const r of ripplesRef.current) r.t++;
      const hasRipples = ripplesRef.current.length > 0;
      for (const p of particlesRef.current) {
        if (!hasRipples && p.amp < 0.005) continue;
        let tAmp = 0;
        for (const r of ripplesRef.current) {
          const dist = Math.sqrt((p.x-r.x)**2+(p.y-r.y)**2);
          const ff = dist - r.t*3;
          if (ff > -20 && ff < 60) {
            const t = Math.max(0,1-ff/60);
            tAmp += t*t*(3-2*t)*Math.max(0,1-r.t/110)*r.strength*6;
          }
        }
        p.amp = tAmp > p.amp ? p.amp+(tAmp-p.amp)*0.25 : p.amp*0.93;
        if (p.amp < 0.005) continue;
        const dy = Math.sin(frameRef.current*0.06-p.phase)*Math.min(p.amp,1.8);
        ctx.beginPath();
        ctx.arc(p.x, p.y+dy, p.size, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${Math.min(p.alpha*2.5+p.amp*0.18,1)})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX-r.left, y = e.clientY-r.top;
      mouseRef.current = (x>=0&&x<=r.width&&y>=0&&y<=r.height) ? {x,y} : {x:-9999,y:-9999};
      if (mouseRef.current.x < 0) lastMouseRef.current = {x:-9999,y:-9999};
    };
    const onTouch = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect(), t = e.touches[0];
      if (!t) return;
      const x = t.clientX-r.left, y = t.clientY-r.top;
      if (x>=0&&x<=r.width&&y>=0&&y<=r.height) mouseRef.current = {x,y};
    };
    window.addEventListener('mousemove', onMove);
    canvas.addEventListener('touchmove', onTouch, {passive:true});
    const ro = new ResizeObserver(buildParticles);
    ro.observe(canvas);
    if (imgEl) { if (imgEl.complete) buildParticles(); else imgEl.addEventListener('load', buildParticles); }
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('touchmove', onTouch);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (imgEl) imgEl.removeEventListener('load', buildParticles);
    };
  }, [buildParticles, imgEl]);

  return <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'auto',cursor:'crosshair',zIndex:20}} />;
}

// ══════════════════════════════════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════════════════════════════════
const styles = `

  /* ══════════════════════════════════════════
     SHARED / RESET
  ══════════════════════════════════════════ */
  .ctrl-section { position:relative; width:100%; background:#000; color:#fff; }

  /* ══════════════════════════════════════════
     DESKTOP (≥ 641px)
     - Section height = exactly 100vh (navbar is outside this section, above it)
     - So: section fills remaining viewport after navbar
     - Main content frame = 100vh - navbar(80px) - footer(100px)
     - Footer = bottom 100px of section
  ══════════════════════════════════════════ */
  @media (min-width:641px) {
    .ctrl-section {
      display:flex;
      flex-direction:column;
      /* Fill exactly the viewport height minus the navbar */
      height:calc(100vh - 80px);
      overflow:hidden;
    }

    .d-gl-top   { position:absolute; top:0; left:0; right:0; height:1px; background:rgba(255,255,255,.2); z-index:50; }
    .d-gl-foot  { position:absolute; bottom:100px; left:0; right:0; height:1px; background:rgba(255,255,255,.2); z-index:50; }
    .d-gl-left  { position:absolute; top:0; bottom:0; left:96px; width:1px; background:rgba(255,255,255,.2); z-index:50; }
    .d-gl-right { position:absolute; top:0; bottom:0; right:96px; width:1px; background:rgba(255,255,255,.2); z-index:50; }

    .d-globe-container {
      position:absolute;
      left:96px;
      bottom:100px;
      top:0;
      right:50%;
      overflow:hidden;
      z-index:10;
    }

    .d-globe-wrapper {
      position:absolute;
      width:761px;
      height:677px;
      bottom:-60px;
      left:-320px;
      transform:rotate(158.67deg);
    }

    /* Content layer fills the section minus footer */
    .d-content {
      position:relative;
      z-index:40;
      display:flex;
      flex-direction:column;
      /* Main area = full section height minus footer 100px */
      height:calc(100vh - 80px - 100px);
      flex-shrink:0;
      pointer-events:none;
    }

    .d-main {
      flex:1;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:flex-end;
      padding:0 160px;
    }

    .d-inner { max-width:900px; padding-right:176px; }

    .d-h2 {
      font-size:clamp(32px,3.5vw,48px);
      font-weight:300;
      line-height:1.05;
      letter-spacing:-.02em;
    }
    .d-indent { padding-left:96px; display:block; }

    .d-subrow {
      margin-top:32px;
      display:flex;
      align-items:center;
      justify-content:flex-end;
      gap:32px;
      pointer-events:auto;
      cursor:pointer;
    }
    .d-subtext {
      font-size:10px;
      color:rgba(255,255,255,.5);
      max-width:300px;
      line-height:1.6;
      text-transform:uppercase;
      letter-spacing:.2em;
    }
    .d-arrow {
      flex-shrink:0;
      width:40px; height:40px;
      border:1px solid rgba(255,255,255,.2);
      border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      transition:background .7s, color .7s;
    }
    .d-subrow:hover .d-arrow { background:#fff; color:#000; }

    /* Footer — exactly 100px, pinned at the bottom of the section */
    .d-footer {
      height:100px;
      flex-shrink:0;
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:0 128px;
      pointer-events:auto;
      position:relative;
      z-index:50;
    }
    .d-engage {
      padding:16px 32px;
      border:1px solid rgba(255,255,255,.15);
      font-size:10px;
      letter-spacing:.4em;
      text-transform:uppercase;
      background:transparent;
      color:#fff;
      cursor:pointer;
      white-space:nowrap;
      transition:background .3s, color .3s;
    }
    .d-engage:hover { background:#fff; color:#000; }
    .d-ascella {
      font-size:9px;
      letter-spacing:.1em;
      max-width:220px;
      text-align:left;
      
      line-height:1.5;
      color:rgba(255,255,255,.45);
    }

    /* Hide mobile elements */
    .m-layout { display:none !important; }
  }

  /* ══════════════════════════════════════════
     TABLET tweaks (641px – 1023px)
  ══════════════════════════════════════════ */
  @media (min-width:641px) and (max-width:1023px) {
    .d-gl-left  { left:40px; }
    .d-gl-right { right:40px; }
    .d-globe-container { left:40px; right:55%; bottom:100px; top:0; }
    .d-globe-wrapper   { width:560px; height:500px; bottom:-40px; left:-220px; }
    .d-main  { padding:0 60px; }
    .d-inner { padding-right:40px; }
    .d-indent { padding-left:60px; }
    .d-footer { padding:0 48px; }
  }

  /* ══════════════════════════════════════════
     LARGE DESKTOP ≥ 1440px
  ══════════════════════════════════════════ */
  @media (min-width:1440px) {
    .d-gl-left  { left:120px; }
    .d-gl-right { right:120px; }
    .d-globe-container { left:120px; right:50%; bottom:100px; top:0; }
    .d-globe-wrapper   { width:900px; height:800px; bottom:-280px; left:-380px; }
    .d-footer { padding:0 160px; }
  }

  /* ══════════════════════════════════════════
     MOBILE (≤ 640px)
  ══════════════════════════════════════════ */
  @media (max-width:640px) {

    .d-gl-top, .d-gl-foot, .d-gl-left, .d-gl-right,
    .d-globe-container, .d-content, .d-footer { display:none !important; }

    .m-layout {
      display:flex;
      flex-direction:column;
      width:100%;
    }

    .m-line {
      width:100%;
      height:1px;
      background:rgba(255,255,255,.22);
      flex-shrink:0;
    }

    .m-text-block { padding:28px 28px 20px 28px; }

    .m-h2 {
      font-size:22px;
      font-weight:300;
      line-height:1.15;
      letter-spacing:-.01em;
      text-align:left;
      margin:0;
    }
    .m-h2-center { display:block; text-align:center; }
    .m-dim { color:rgba(255,255,255,.28); }

    .m-subrow {
      margin-top:18px;
      margin-left:30px;
      display:flex;
      align-items:center;
      gap:12px;
      cursor:pointer;
    }
    .m-subtext {
      font-size:8px;
      line-height:1.65;
      text-transform:uppercase;
      letter-spacing:.18em;
      flex:1;
      color:rgba(255,255,255,.65);
    }
    .m-arrow {
      flex-shrink:0;
      width:32px; height:32px;
      border:1px solid rgba(255,255,255,.25);
      border-radius:50%;
      display:flex; align-items:center; justify-content:center;
    }

    .m-engage-zone {
      display:flex;
      align-items:center;
      justify-content:center;
      padding:24px 0 20px 0;
    }
    .m-engage-btn {
      display:flex;
      align-items:center;
      justify-content:center;
      gap:8px;
      padding:12px 28px;
      border:1px solid rgba(255,255,255,.45);
      font-size:8px;
      letter-spacing:.38em;
      text-transform:uppercase;
      background:transparent;
      color:#fff;
      cursor:pointer;
      white-space:nowrap;
      transition:background .3s, color .3s;
    }
    .m-engage-btn:hover { background:#fff; color:#000; }
    .m-engage-btn svg { display:block; }

    .m-globe-block {
      width:100%;
      height:260px;
      position:relative;
      overflow:visible;
    }
    .m-globe-wrapper {
      position:absolute;
      width:260px; height:260px;
      top:0; left:50%;
      transform:translateX(-50%) rotate(158.67deg);
    }

    .m-double-line-gap { height:32px; width:100%; flex-shrink:0; }

    .m-ascella { padding:16px 28px 28px 28px; }
    .m-ascella p {
      font-size:10px;
      letter-spacing:.13em;
      line-height:1.75;
    
      color:rgba(255,255,255,.45);
      text-align:left;
      margin:0;
    }
  }

  .dim { color:rgba(255,255,255,.3); }
`;

// ── Main Component ─────────────────────────────────────────────────────────────
const Controlled = () => {
  const dGlobeRef = useRef<HTMLDivElement>(null);
  const [dImgEl, setDImgEl] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    const el = dGlobeRef.current?.querySelector('img') as HTMLImageElement | null;
    if (el) setDImgEl(el);
  }, []);

  const mGlobeRef = useRef<HTMLDivElement>(null);
  const [mImgEl, setMImgEl] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    const el = mGlobeRef.current?.querySelector('img') as HTMLImageElement | null;
    if (el) setMImgEl(el);
  }, []);

  return (
    <>
      <style>{styles}</style>

      <section className="ctrl-section">

        {/* ════════════════════════════════════════
            DESKTOP LAYOUT
        ════════════════════════════════════════ */}

        <div className="d-gl-top" />
        <div className="d-gl-foot" />
        <div className="d-gl-left" />
        <div className="d-gl-right" />

        <div className="d-globe-container">
          <div ref={dGlobeRef} className="d-globe-wrapper">
            <img
              src="/globe2.png"
              alt=""
              crossOrigin="anonymous"
              style={{
                position:'absolute',
                width:'100%',
                height:'100%',
                display:'block',
                opacity:0.55,
                objectFit:'contain'
              }}
            />
            <WaveCanvas imgEl={dImgEl} />
          </div>
        </div>

        {/* Main content */}
        <div className="d-content">
          <div className="d-main">
            <div className="d-inner">
              <h2 className="d-h2">
                Controlled execution
                <span className="d-indent">units for <span className="dim">complex</span></span>
                <span className="d-indent dim">operating environments</span>
              </h2>
              <div className="d-subrow">
                <p className="d-subtext">Early-stage execution succeeds or fails based on operating structure.</p>
                <div className="d-arrow"><span style={{fontSize:'20px',fontWeight:300}}>↓</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="d-footer">
          <Link href="/engageWithUs">
            <button className="d-engage">Engage With Us <span style={{marginLeft:'8px',opacity:.3}}>:::</span></button>
          </Link>
          <p className="d-ascella">The Ascella Startups Programme embeds governance, accountability, and execution discipline before scale begins.</p>
        </footer>

        {/* ════════════════════════════════════════
            MOBILE LAYOUT
        ════════════════════════════════════════ */}
        <div className="m-layout">

          <div className="m-line" />

          <div className="m-text-block">
            <h2 className="m-h2">
              Controlled execution
              <span className="m-h2-center">units for <span className="m-dim">complex</span></span>
              <span className="m-h2-center m-dim">operating environments</span>
            </h2>
            <div className="m-subrow">
              <p className="m-subtext">Early-stage execution succeeds or fails based on operating structure.</p>
              <div className="m-arrow"><span style={{fontSize:'16px',fontWeight:300}}>↓</span></div>
            </div>
          </div>

          <div className="m-engage-zone">
            <Link href="/engageWithUs">
              <button className="m-engage-btn">
                Engage With Us
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="2" height="2" fill="#3D3D3D"/>
                  <rect y="6" width="2" height="2" fill="#3D3D3D"/>
                  <rect x="6" y="6" width="2" height="2" fill="#3D3D3D"/>
                  <rect x="6" width="2" height="2" fill="#3D3D3D"/>
                  <rect x="12" y="6" width="2" height="2" fill="#3D3D3D"/>
                  <rect x="6" y="12" width="2" height="2" fill="#3D3D3D"/>
                  <rect x="12" y="12" width="2" height="2" fill="#3D3D3D"/>
                </svg>
              </button>
            </Link>
          </div>

          <div className="m-globe-block">
            <div ref={mGlobeRef} className="m-globe-wrapper">
              <img src="/globe2.png" alt="" crossOrigin="anonymous"
                style={{position:'absolute',width:'100%',height:'100%',display:'block',opacity:0.55,objectFit:'contain'}} />
              <WaveCanvas imgEl={mImgEl} />
            </div>
          </div>

          <div className="m-line" />
          <div className="m-double-line-gap" />
          <div className="m-line" />

          <div className="m-ascella">
            <p>The Ascella Startups Programme embeds governance, accountability, and execution discipline before scale begins.</p>
          </div>

        </div>

      </section>
    </>
  );
};

export default Controlled;