'use client';

import React, { useState } from 'react';

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

export default function Focuses() {
 const [activeIndex, setActiveIndex] = useState<number | null>(null);

 const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

        .focuses-section * {
          box-sizing: border-box;
        }

        .focuses-section {
          width: 100%;
          background: #000;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
        }

        /* ── Top edge-to-edge line ── */
        .top-line {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.10);
        }

        /* ── Header block ── */
        .header-wrapper {
          width: 100%;
          padding: 0 48px;
        }
        @media (max-width: 768px) {
          .header-wrapper { padding: 0 20px; }
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
        @media (max-width: 768px) {
          .header-inner {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 40px 0 48px;
          }
        }

        .header-left p {
          font-size: 10px;
          letter-spacing: 0.3em;
          line-height: 1.8;
          color: rgba(255,255,255,0.55);
          max-width: 320px;
          font-weight: 300;
        }
        @media (max-width: 768px) {
          .header-left p { max-width: 100%; }
        }

        .header-right {
          text-align: right;
        }
        @media (max-width: 768px) {
          .header-right { text-align: left; }
        }

        .header-right h3 {
          font-size: clamp(22px, 3vw, 38px);
          font-weight: 400;
          letter-spacing: -0.04em;
          line-height: 1.08;
          margin: 0;
        }

        .header-right .line-white { color: #fff; display: block; }
        .header-right .line-muted { color: #555; display: block; }

        /* ── Accordion ── */
        .accordion-wrapper {
          width: 100%;
        }

        .accordion-item {
          width: 100%;
          border-top: 1px solid rgba(255,255,255,0.10);
          cursor: pointer;
          transition: background 0.4s ease;
        }
        .accordion-item:last-child {
          border-bottom: 1px solid rgba(255,255,255,0.10);
        }
        .accordion-item:hover {
          background: rgba(255,255,255,0.02);
        }

        .accordion-content-wrapper {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 48px;
        }
        @media (max-width: 768px) {
          .accordion-content-wrapper { padding: 0 20px; }
        }

        .accordion-row {
          display: grid;
          grid-template-columns: 120px 1fr 120px;
          align-items: center;
          padding: 36px 0;
          gap: 16px;
          transition: padding 0.5s ease;
        }
        @media (max-width: 1024px) {
          .accordion-row {
            grid-template-columns: 72px 1fr 72px;
          }
        }
        @media (max-width: 768px) {
          .accordion-row {
            grid-template-columns: 1fr;
            padding: 28px 0;
            gap: 8px;
          }
        }

        .acc-id {
          font-size: clamp(14px, 1.6vw, 22px);
          font-weight: 300;
          transition: opacity 0.4s ease;
          user-select: none;
          white-space: nowrap;
        }
        .acc-id-right { text-align: right; }
        .acc-id.inactive { opacity: 0.18; }
        .acc-id.active   { opacity: 1; }

        @media (max-width: 768px) {
          .acc-id-left  { display: none; }
          .acc-id-right { display: none; }
        }

        .acc-center {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media (max-width: 768px) {
          .acc-center { align-items: flex-start; }
        }

        .acc-title-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .acc-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22d3ee;
          transition: transform 0.4s ease, opacity 0.4s ease;
          flex-shrink: 0;
        }
        .acc-dot.hidden-dot {
          transform: scale(0);
          opacity: 0;
        }
        .acc-dot.visible-dot {
          transform: scale(1);
          opacity: 1;
        }

        .acc-title {
          font-size: clamp(20px, 2.6vw, 36px);
          letter-spacing: -0.07em;
          line-height: 1;
          transition: color 0.4s ease, font-weight 0.4s ease;
          user-select: none;
        }
        .acc-title.inactive { color: #404040; font-weight: 300; }
        .acc-title.active   { color: #fff;    font-weight: 400; }

        @media (max-width: 768px) {
          .acc-title { font-size: clamp(18px, 5.5vw, 28px); }
        }

        /* Mobile id shown below title */
        .acc-id-mobile {
          display: none;
          font-size: 10px;
          letter-spacing: 0.25em;
          color: #333;
          margin-top: 4px;
        }
        @media (max-width: 768px) {
          .acc-id-mobile { display: block; }
        }

        /* Description expand */
        .acc-desc-wrap {
          overflow: hidden;
          transition: max-height 0.65s ease, opacity 0.65s ease, margin-top 0.65s ease;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .acc-desc-wrap.closed {
          max-height: 0;
          opacity: 0;
          margin-top: 0;
        }
        .acc-desc-wrap.open {
          max-height: 200px;
          opacity: 1;
          margin-top: 24px;
        }
        @media (max-width: 768px) {
          .acc-desc-wrap { justify-content: flex-start; }
          .acc-desc-wrap.open { margin-top: 16px; }
        }

        .acc-desc {
          max-width: 480px;
          text-align: center;
          font-size: clamp(11px, 1.1vw, 13px);
          color: rgba(255,255,255,0.45);
          line-height: 1.75;
          font-weight: 300;
          letter-spacing: 0.02em;
          padding: 0 16px;
          border-left: 1px solid rgba(255,255,255,0.07);
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        @media (max-width: 768px) {
          .acc-desc {
            text-align: left;
            max-width: 100%;
            padding: 0 0 0 12px;
            border-right: none;
            border-left: 1px solid rgba(255,255,255,0.12);
          }
        }

        /* Arrow indicator on mobile */
        .acc-arrow {
          display: none;
          margin-left: auto;
          font-size: 16px;
          color: rgba(255,255,255,0.3);
          transition: transform 0.4s ease, color 0.4s ease;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .acc-arrow { display: block; }
        }
        .acc-arrow.rotated { transform: rotate(180deg); color: #22d3ee; }
      `}</style>

      <section className="focuses-section">
        {/* Top edge-to-edge line */}
        <div className="top-line" />

        {/* Header */}
        <div className="header-wrapper">
          <div className="header-inner">
            <div className="header-left">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              </p>
            </div>
            <div className="header-right">
              <h3>
                <span className="line-white">The Startups Programme embeds</span>
                <span className="line-muted">
                  embedding operating discipline{' '}
                  <br />
                  before scale introduces complexity.
                </span>
              </h3>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="accordion-wrapper">
          {focusData.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={item.id}
                className="accordion-item"
                onClick={() => handleToggle(index)}
                role="button"
                aria-expanded={isActive}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleToggle(index)}
              >
                <div className="accordion-content-wrapper">
                  <div className="accordion-row">

                    {/* Left ID */}
                    <span className={`acc-id acc-id-left ${isActive ? 'active' : 'inactive'}`}>
                      [{item.id}]
                    </span>

                    {/* Center */}
                    <div className="acc-center">
                      <div className="acc-title-row">
                        {/* Left dot */}
                        <span className={`acc-dot ${isActive ? 'visible-dot' : 'hidden-dot'}`} />

                        <h3 className={`acc-title ${isActive ? 'active' : 'inactive'}`}>
                          {item.title}
                        </h3>

                        {/* Right dot */}
                        <span className={`acc-dot ${isActive ? 'visible-dot' : 'hidden-dot'}`} />

                        {/* Mobile arrow */}
                        <span className={`acc-arrow ${isActive ? 'rotated' : ''}`}>▾</span>
                      </div>

                      {/* Mobile id */}
                      <span className="acc-id-mobile">[{item.id}]</span>

                      {/* Description */}
                      <div className={`acc-desc-wrap ${isActive ? 'open' : 'closed'}`}>
                        <p className="acc-desc">{item.description}</p>
                      </div>
                    </div>

                    {/* Right ID */}
                    <span className={`acc-id acc-id-right ${isActive ? 'active' : 'inactive'}`}>
                      [{item.id}]
                    </span>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}