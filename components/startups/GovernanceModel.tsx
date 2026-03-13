"use client";
import React from 'react';
import Reveal from "@/utils/Reveal";
import { slideInFromBottom } from "@/utils/motion";

const GovernanceModel = () => {
  const sideWidth = "w-[8.33%]";
  const colWidth = "w-[20.83%]";
  const rowHeight = "h-[300px]";

  // Base Class for Circle
  const circleBaseClass = "absolute rounded-[611px] w-[41.66vw] h-[600px] border border-gray-400/40";

  return (
    <>
      <style>{`
        /* ── MOBILE RESPONSIVE (max-width: 768px) ── */
        @media (max-width: 768px) {
          .gov-wrapper {
            overflow-x: hidden;
          }

          /* TOP BANNER */
          .gov-top-banner {
            padding-top: 48px !important;
            padding-bottom: 48px !important;
          }
          .gov-top-banner .bracket-left,
          .gov-top-banner .bracket-right {
            font-size: 36px !important;
          }
          .gov-top-banner p {
            font-size: 11px !important;
            max-width: 220px !important;
          }

          /* HIDE desktop grid layout rows */
          .gov-row-1,
          .gov-row-2 {
            display: none !important;
          }

          /* MOBILE LAYOUT */
          .gov-mobile {
            display: flex !important;
          }

          /* LAST BORDER LINE */
          .gov-bottom-border {
            display: block !important;
          }
        }

        /* Hide mobile layout on desktop */
        .gov-mobile {
          display: none;
        }
        .gov-bottom-border-mobile {
          display: none;
        }

        @media (max-width: 768px) {
          .gov-bottom-border-mobile {
            display: block !important;
          }
        }
      `}</style>

      <div className="gov-wrapper bg-black text-white min-h-screen w-full font-sans overflow-hidden relative">

        {/* ── TOP SECTION ── */}
        <Reveal variants={slideInFromBottom(0.1)} className="w-full">
          <div className="gov-top-banner w-full flex justify-center pt-24 pb-32">
            <div className="flex items-center space-x-6">
              <span className="bracket-left text-white text-6xl font-light opacity-80">[</span>
              <p className="text-[13px] tracking-wide text-center font-sans text-gray-200 max-w-[280px] leading-relaxed">
                Support embeds execution discipline, <br />
                not short-term delivery assistance.
              </p>
              <span className="bracket-right text-white text-6xl font-light opacity-60">]</span>
            </div>
          </div>
        </Reveal>

        {/* ── HEADING OVERLAY (desktop only) ── */}
        <div className="absolute z-30 flex flex-col items-center text-center pointer-events-none w-[30%] hidden md:flex"
             style={{ top: '600px', left: '29.16%', transform: 'translate(-50%, -50%)' }}>
          <Reveal variants={slideInFromBottom(0.2)}>
            <div className="py-1 mb-4 bg-black">
              <span className="text-[9px] tracking-[0.3em] uppercase text-white">Governance Model</span>
            </div>
            <h2 className="text-3xl font-light leading-tight">
              Governance is introduced early to keep execution controlled as complexity grows.
            </h2>
          </Reveal>
        </div>

        {/* ══════════════════════════════════════
            DESKTOP ROWS (hidden on mobile)
        ══════════════════════════════════════ */}

        {/* Row 1 */}
        <div className={`gov-row-1 w-full border-t border-gray-400 flex ${rowHeight} relative z-10`}>
          <div className={`${sideWidth} border-r border-gray-400`}></div>
          <div className={`${colWidth} border-r border-gray-400 relative overflow-hidden`}>
            <div className={`${circleBaseClass} top-0 left-0`}></div>
          </div>
          <div className={`${colWidth} border-r border-gray-400 relative overflow-hidden`}>
            <div
              className={`${circleBaseClass} top-0 left-[-100%]`}
              style={{ background: 'linear-gradient(190deg, #D9D9D9 -216%, #000 30.2%)' }}
            ></div>
          </div>
          <div className={`${colWidth} border-r border-gray-400`}></div>
          <div className={`${colWidth} border-r border-gray-400 pt-30 pr-4 pl-4`}>
            <Reveal variants={slideInFromBottom(0.3)}>
              <h3 className="text-xl font-[20px] mb-6">Operating Framework</h3>
              <p className="text-gray-200 text-b3 leading-relaxed">
                Startups in the programme operate within Ascella's governance framework from the outset. <br />
                Decision rights, accountability paths, and escalation mechanisms are established before execution expands across teams, systems, or external partners.
              </p>
            </Reveal>
          </div>
          <div className={`${sideWidth}`}></div>
        </div>

        {/* Row 2 */}
        <div className={`gov-row-2 w-full border-t border-gray-400 flex ${rowHeight} relative z-10`}>
          <div className={`${sideWidth} border-r border-gray-400`}></div>
          <div className={`${colWidth} border-r border-gray-400 relative overflow-hidden`}>
            <div
              className={`${circleBaseClass} top-[-300px] left-0`}
              style={{ background: 'linear-gradient(10deg, #D9D9D9 -180%, #000 35%)' }}
            ></div>
          </div>
          <div className={`${colWidth} border-r border-gray-400 relative overflow-hidden p-8 flex flex-col justify-end`}>
            <div className={`${circleBaseClass} top-[-300px] left-[-100%]`}></div>
          </div>
          <div className={`${colWidth} border-r border-gray-400 pt-30 pl-4`}>
            <Reveal variants={slideInFromBottom(0.4)} className="relative z-20">
              <h3 className="text-xl font-normal mb-6">Progressive Introduction</h3>
              <p className="text-gray-200 text-b3 pr-3">
                Governance structures are introduced gradually as scale increases. Early-stage flexibility is preserved while accountability and oversight mature in parallel with organisational growth.
              </p>
            </Reveal>
          </div>
          <div className={`${colWidth} border-r border-gray-400 p-8 flex flex-col justify-end`}>
            <Reveal variants={slideInFromBottom(0.5)}>
              <span className="text-lg text-gray-300 leading-snug">
                Execution remains adaptable to evolving startup environments. Accountability, ownership, and oversight remain clearly defined at every stage.
              </span>
            </Reveal>
          </div>
          <div className={`${sideWidth}`}></div>
        </div>

        <div className="w-full border-t border-gray-400 hidden md:block"></div>

        {/* ══════════════════════════════════════
            MOBILE LAYOUT
        ══════════════════════════════════════ */}
        <div className="gov-mobile flex-col w-full relative">

          {/* Vertical guide lines */}
          <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
            <div className="absolute top-0 bottom-0 border-l border-gray-400" style={{ left: '12%' }}></div>
            <div className="absolute top-0 bottom-0 border-r border-gray-400" style={{ right: '12%' }}></div>
          </div>

          <div className="w-full border-t border-gray-400 relative z-10"></div>

          {/* ── CIRCLE SECTION ── */}
          <div className="relative z-10 w-full overflow-hidden" style={{ height: '76vw' }}>
            <Reveal variants={slideInFromBottom(0.1)} className="w-full h-full">
              <div
                className="absolute border border-gray-300"
                style={{
                  left: '12%',
                  width: '76%',
                  paddingBottom: '76%',
                  top: '0px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(170deg, #1a1a1a -10%, #000000 55%)',
                }}
              ></div>

              {/* HORIZONTAL divider */}
              <div
                className="absolute z-10"
                style={{
                  top: '38vw',
                  left: '12%',
                  width: '76%',
                  height: '1px',
                  backgroundColor: 'rgba(156,163,175,0.5)',
                }}
              ></div>

              {/* VERTICAL divider */}
              <div
                className="absolute z-10"
                style={{
                  top: '0',
                  left: '50%',
                  width: '1px',
                  height: '76vw',
                  backgroundColor: 'rgba(156,163,175,0.5)',
                }}
              ></div>

              {/* Mobile Heading Overlay */}
              <div
                className="absolute z-20 flex flex-col items-center text-center w-full"
                style={{ top: '30%', transform: 'translateY(-50%)' }}
              >
                <div className="px-3 py-7 ">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-white">Governance Model</span>
                </div>
                <h2 className="leading-tight text-white" style={{ fontSize: '3.4vw', maxWidth: '70%' }}>
                  <span className="text-white">Governance is introduced early </span>
                  <span className="text-white/40">to keep execution controlled as complexity grows.</span>
                </h2>
              </div>
            </Reveal>
          </div>

          <div className="relative z-10 w-full" style={{ paddingLeft: '12%', paddingRight: '12%' }}>
            <div className="border-t border-gray-400 w-full"></div>
          </div>

          <div className="h-8 relative z-10"></div>

          <div className="relative z-10 w-full" style={{ paddingLeft: '12%', paddingRight: '12%' }}>
            <div className="border-t border-gray-400 w-full"></div>
          </div>

          {/* ── Operating Framework ── */}
          <Reveal variants={slideInFromBottom(0.2)}>
            <div
              className="relative z-10 py-8"
              style={{ paddingLeft: 'calc(12% + 16px)', paddingRight: 'calc(12% + 16px)' }}
            >
              <h3 className="text-lg mb-4 text-white">Operating Framework</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Startups in the programme operate within Ascella's governance framework from the outset.
              </p>
              <p className="text-gray-300 text-xs text-montserrat leading-relaxed mt-3">
                Decision rights, accountability paths, and escalation mechanisms are established before execution expands across teams, systems, or external partners.
              </p>
            </div>
          </Reveal>

          <div className="relative z-10 w-full" style={{ paddingLeft: '12%', paddingRight: '12%' }}>
            <div className="border-t border-gray-400 w-full"></div>
          </div>

          {/* ── Progressive Introduction ── */}
          <Reveal variants={slideInFromBottom(0.3)}>
            <div
              className="relative z-10 py-8"
              style={{ paddingLeft: 'calc(12% + 16px)', paddingRight: 'calc(12% + 16px)' }}
            >
              <h3 className="text-lg font-normal mb-4 text-white">Progressive Introduction.</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Startups in the programme operate within Ascella's governance framework from the outset.
              </p>
              <p className="text-gray-300 text-xs leading-relaxed mt-3">
                Decision rights, accountability paths, and escalation mechanisms are established before execution expands across teams, systems, or external partners.
              </p>
            </div>
          </Reveal>

          <div className="relative z-10 w-full" style={{ paddingLeft: '12%', paddingRight: '12%' }}>
            <div className="border-t border-gray-400 w-full"></div>
          </div>

          {/* ── Execution Remains ── */}
          <Reveal variants={slideInFromBottom(0.4)}>
            <div
              className="relative z-10 py-8"
              style={{ paddingLeft: 'calc(12% + 16px)', paddingRight: 'calc(12% + 16px)' }}
            >
              <p className="text-gray-300 text-xs leading-relaxed">
                Execution remains adaptable to evolving startup environments. Accountability, ownership, and oversight remain clearly defined at every stage.
              </p>
            </div>
          </Reveal>

          <div className="relative z-10 w-full" style={{ paddingLeft: '12%', paddingRight: '12%' }}>
            <div className="border-t border-gray-400 w-full"></div>
          </div>

        </div>
      </div>
    </>
  );
};

export default GovernanceModel;