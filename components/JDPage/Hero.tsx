'use client';
import React, { useEffect, useRef } from 'react';

function IsometricHoverGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef    = useRef<number | null>(null);

  const CELL_W = 100;
  const CELL_H = 60;

  const cellCenter = (col: number, row: number, offsetX: number, offsetY: number) => {
    const x = offsetX + col * CELL_W + (row % 2 === 0 ? 0 : CELL_W / 2);
    const y = offsetY + row * (CELL_H / 2);
    return { x, y };
  };

  const inDiamond = (px: number, py: number, cx: number, cy: number) => {
    const dx = Math.abs(px - cx) / (CELL_W / 2);
    const dy = Math.abs(py - cy) / (CELL_H / 2);
    return dx + dy <= 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    const alphaMap = new Map<string, number>();

    const loop = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const cols = Math.ceil(W / CELL_W) + 2;
      const rows = Math.ceil(H / (CELL_H / 2)) + 2;
      const offsetX = -CELL_W / 2;
      const offsetY = -CELL_H / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const { x: cx, y: cy } = cellCenter(col, row, offsetX, offsetY);
          const key = `${col},${row}`;

          const hovered = inDiamond(mx, my, cx, cy);
          const target  = hovered ? 1 : 0;
          const current = (alphaMap.get(key) ?? 0) + (target - (alphaMap.get(key) ?? 0)) * 0.1;
          alphaMap.set(key, current);

          ctx.beginPath();
          ctx.moveTo(cx,              cy - CELL_H / 2);
          ctx.lineTo(cx + CELL_W / 2, cy);
          ctx.lineTo(cx,              cy + CELL_H / 2);
          ctx.lineTo(cx - CELL_W / 2, cy);
          ctx.closePath();

          ctx.strokeStyle = `rgba(255,255,255,${0.06 + current * 0.12})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();

          if (current > 0.005) {
            ctx.fillStyle = `rgba(163,163,163,${current * 0.25})`;
            ctx.fill();
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'auto',
        cursor:        'crosshair',
      }}
    />
  );
}

export default function Hero() {
    return (
        <section className="border-y border-color">
            <div className="relative flex flex-col gap-10 max-w-7xl mx-10 xl:mx-auto sm:px-10 py-20 md:border-x border-color overflow-hidden">

                {/* ── Isometric grid — right side only, replaces old SVG ── */}
                <div
                    className="absolute"
                    style={{
                        top:    0,
                        bottom: 0,
                        right:  '-5px',
                        left:   '30%',
                        zIndex: 0,
                        WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 55% 50%, black 5%, transparent 72%)',
                        maskImage:       'radial-gradient(ellipse 90% 85% at 55% 50%, black 5%, transparent 72%)',
                        pointerEvents:   'auto',
                    }}
                >
                    <IsometricHoverGrid />

                    {/* Vector image 1 */}
                    <img
                        src="/vector 55.png"
                        alt=""
                        style={{
                            position:      'absolute',
                            left:          '150px',
                            top:           '90px',
                            width:         '100px',
                            height:        '60px',
                            transform:     'translate(-50%, -50%)',
                            objectFit:     'fill',
                            opacity:       0.9,
                            pointerEvents: 'none',
                            mixBlendMode:  'screen',
                        }}
                    />

                    {/* Vector image 2 */}
                    <img
                        src="/vector 55.png"
                        alt=""
                        style={{
                            position:      'absolute',
                            left:          '350px',
                            top:           '90px',
                            width:         '100px',
                            height:        '60px',
                            transform:     'translate(-50%, -50%)',
                            objectFit:     'fill',
                            opacity:       1,
                            pointerEvents: 'none',
                            mixBlendMode:  'screen',
                        }}
                    />
                </div>

                {/* Content */}
                <h2 className="relative z-10 text-[16px] sm:text-[36px] lg:text-[48px]">Open roles within Ascella's <br />governed execution environment</h2>
                <p className="relative z-10 text-b3 w-xs">All roles operate within defined accountability structures, governance frameworks, and controlled delivery environments.</p>
            </div>
        </section>
    )
}