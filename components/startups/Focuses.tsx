'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

const focusData = [
  {
    id: '01',
    title: 'Operating Structure Design',
    description:
      'Governance, accountability, and oversight frameworks are designed before growth begins. This ensures decision rights, escalation paths, and ownership remain clear as teams and systems expand.',
  },
  {
    id: '02',
    title: 'Execution Pod Integration',
    description:
      'Standardizing how decentralized teams execute high-velocity tasks while maintaining alignment with core strategic objectives.',
  },
  {
    id: '03',
    title: 'Security & Risk Readiness',
    description:
      'Embedding automated compliance and threat detection into the architectural foundation to prevent technical debt.',
  },
  {
    id: '04',
    title: 'Scale-Readiness Planning',
    description:
      'Stress-testing operational workflows to ensure the infrastructure can handle 10x growth without performance degradation.',
  },
];

// Animation Variants
const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
  }
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
  }
};

export default function Focuses() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

        .focuses-section *,
        .focuses-section *::before,
        .focuses-section *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .focuses-section {
          width: 100%;
          background: #000;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
        }

        .top-line {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.10);
        }

        /* ══════════════════════════════════
            HEADER
        ══════════════════════════════════ */
        .header-wrapper {
          width: 100%;
          padding: 0 48px;
        }
        .header-inner {
          max-width: 1440px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          padding: 56px 0 64px;
          align-items: start;
        }
        .header-left p {
          font-size: 10px;
          letter-spacing: 0.3em;
          line-height: 1.8;
          color: white;
    
          max-width: 320px;
          font-weight: 300;
          margin-top: 15px;
          margin-left: 75px;
        }
        .header-right { text-align: right; }
        .header-right h3 {
          font-size: clamp(22px, 3vw, 38px);
          font-weight: 400;
          letter-spacing: -0.04em;
          line-height: 1.08;
          margin-right: 70px;
        }
        .header-right .line-white { color: #fff; display: block; }
        .header-right .line-muted { color: #555; display: block; }

        /* ══════════════════════════════════
            ACCORDION
        ══════════════════════════════════ */
        .accordion-wrapper { width: 100%; }

        .accordion-item {
          width: 100%;
          border-top: 1px solid rgba(255,255,255,0.10);
          cursor: pointer;
          transition: background 0.35s ease;
        }
        .accordion-item:last-child {
          border-bottom: 1px solid rgba(255,255,255,0.10);
        }
        .accordion-item:hover { background: rgba(255,255,255,0.02); }

        .accordion-content-wrapper {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .accordion-row {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 36px 0;
          width: 100%;
          min-height: 80px;
        }

        .acc-id-left {
          position: absolute;
          left: 30px;
          top: 50%;
          transform: translateY(-50%);
          font-size: clamp(14px, 1.5vw, 22px);
          font-weight: 300;
          white-space: nowrap;
          user-select: none;
          letter-spacing: 0.05em;
          transition: opacity 0.4s ease;
          line-height: 1;
        }
        .acc-id-right {
          position: absolute;
          right: 25px;
          top: 50%;
          transform: translateY(-50%);
          font-size: clamp(14px, 1.5vw, 22px);
          font-weight: 300;
          white-space: nowrap;
          user-select: none;
          letter-spacing: 0.05em;
          transition: opacity 0.4s ease;
          line-height: 1;
        }
        .acc-id-left.inactive,
        .acc-id-right.inactive { opacity: 0.18; }
        .acc-id-left.active,
        .acc-id-right.active   { opacity: 1; }

        .acc-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .acc-dot {
          border-radius: 50%;
          background: #22d3ee;
          flex-shrink: 0;
          transition: transform 0.4s ease, opacity 0.4s ease,
                      width 0.4s ease, height 0.4s ease;
        }
        .acc-dot.hidden-dot  { width: 0; height: 0; transform: scale(0); opacity: 0; }
        .acc-dot.visible-dot { width: 7px; height: 7px; transform: scale(1); opacity: 1; }

        .acc-title {
          font-size: clamp(20px, 2.6vw, 36px);
          letter-spacing: -0.06em;
          line-height: 1;
          user-select: none;
          transition: color 0.4s ease, font-weight 0.3s ease;
          text-align: center;
        }
        .acc-title.inactive { color: #3a3a3a; font-weight: 300; }
        .acc-title.active   { color: #fff;    font-weight: 400; }
        .accordion-item:hover .acc-title.inactive { color: #606060; }

        .acc-desc-outer {
          overflow: hidden;
          width: 100%;
          transition: max-height 0.60s cubic-bezier(0.4,0,0.2,1),
                      opacity     0.50s ease;
        }
        .acc-desc-outer.closed { max-height: 0;    opacity: 0; }
        .acc-desc-outer.open   { max-height: 260px; opacity: 1; }

        .acc-desc-inner {
          display: flex;
          justify-content: center;
          padding: 22px 0 38px;
        }

        .acc-desc {
          max-width: 500px;
          text-align: center;
          font-size: clamp(11px, 1vw, 13px);
          color: rgba(255,255,255,0.45);
          line-height: 1.8;
          font-weight: 300;
          letter-spacing: 0.02em;
          padding: 0 20px;
          border-left:  1px solid rgba(255,255,255,0.08);
          border-right: 1px solid rgba(255,255,255,0.08);
        }

        /* ══════════════════════════════════
            TABLET ≤ 1024px
        ══════════════════════════════════ */
        @media (max-width: 1024px) {
          .acc-title { font-size: clamp(16px, 2.2vw, 28px); }
        }

        /* ══════════════════════════════════
            MOBILE ≤ 768px
        ══════════════════════════════════ */
        @media (max-width: 768px) {
          .header-wrapper { padding: 0 40px; }
          .header-inner {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 32px 0 40px;
          }
          .header-left { display: none; }
          .header-right { text-align: left; }
          .header-right h3 {
            margin-right: 0;
            font-size: clamp(17px, 5vw, 26px);
          }

          .accordion-content-wrapper { padding: 0 40px; }

          .accordion-row {
            position: static;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 22px 0;
            min-height: unset;
            gap: 8px;
          }

          .acc-id-left {
            position: static;
            transform: none;
            font-size: 10px;
            letter-spacing: 0.02em;
            flex-shrink: 0;
          }
          .acc-id-right {
            position: static;
            transform: none;
            font-size: 10px;
            letter-spacing: 0.02em;
            flex-shrink: 0;
          }

          .acc-mobile-spacer {
            display: block !important;
            flex: 1;
            min-width: 0;
            height: 1px;
          }
          .acc-mobile-spacer.active-m { flex: 0; }

          .acc-title {
            font-size: clamp(13px, 4vw, 21px);
          }
          .acc-dot.visible-dot { width: 5px; height: 5px; }

          .acc-desc-inner { padding: 14px 0 26px; }
          .acc-desc {
            max-width: 100%;
            font-size: 11px;
            padding: 0 10px;
          }
        }

        /* ══════════════════════════════════
            VERY SMALL ≤ 400px
        ══════════════════════════════════ */
        @media (max-width: 400px) {
          .acc-title { font-size: clamp(11px, 3.6vw, 17px); }
          .acc-id-left,
          .acc-id-right { font-size: 9px; }
          .accordion-row { gap: 6px; }
        }
      `}</style>

      <section className="focuses-section">
        <div className="top-line" />

        {/* ── Header ── */}
        <div className="header-wrapper">
          <div className="header-inner">
            <motion.div 
              className="header-left"
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p>
                Early-stage teams often prioritise product velocity and fundraising momentum while postponing formal operating controls and governance clarity.
              </p>
            </motion.div>
            <motion.div 
              className="header-right"
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3>
                <span className="line-white">The Startups Programme embeds</span>
                <span className="line-muted">
                  embedding operating discipline{' '}
                  <br />
                  before scale introduces complexity.
                </span>
              </h3>
            </motion.div>
          </div>
        </div>

        {/* ── Accordion ── */}
        <div className="accordion-wrapper">
          {focusData.map((item, index) => {
            const isActive = activeIndex === index;
            const state = isActive ? 'active' : 'inactive';
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                className="accordion-item"
                variants={isEven ? slideFromLeft : slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                onClick={() => handleToggle(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                role="button"
                aria-expanded={isActive}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleToggle(index)}
              >
                <div className="accordion-content-wrapper">
                  <div className="accordion-row">

                    <span className={`acc-id-left ${state}`}>[{item.id}]</span>

                    <div
                      className={`acc-mobile-spacer ${isActive ? 'active-m' : ''}`}
                      style={{ display: 'none' }}
                    />

                    <div className="acc-title-group">
                      <span className={`acc-dot ${isActive ? 'visible-dot' : 'hidden-dot'}`} />
                      <h3 className={`acc-title ${state}`}>{item.title}</h3>
                      <span className={`acc-dot ${isActive ? 'visible-dot' : 'hidden-dot'}`} />
                    </div>

                    <div
                      className={`acc-mobile-spacer ${isActive ? 'active-m' : ''}`}
                      style={{ display: 'none' }}
                    />

                    <span className={`acc-id-right ${state}`}>[{item.id}]</span>

                  </div>

                  <div className={`acc-desc-outer ${isActive ? 'open' : 'closed'}`}>
                    <div className="acc-desc-inner">
                      <p className="acc-desc">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}