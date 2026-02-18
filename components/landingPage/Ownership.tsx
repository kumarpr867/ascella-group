"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import PlusHeading from "../headings/PlusHeading";
import PartialOutlineBtn from "../btns/PartialOutlineBtn";

// Image fades up on enter
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

// Text fades up slightly after image
const fadeUpDelayed: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut", delay: 0.2 },
  },
};

// ─── OwnershipSection ────────────────────────────────────────────────────────
// Parallax REMOVED — image and content sit in normal document flow so they
// never overlap on any screen size when scrolling.
function OwnershipSection({
  title,
  description,
  tag,
  image,
  isLast,
  index,
  setActiveIndex,
}: {
  title: string;
  description: string;
  tag?: string;
  image: string;
  isLast: boolean;
  index: number;
  setActiveIndex: (n: number) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.2 });

  useEffect(() => {
    if (isInView) setActiveIndex(index);
  }, [isInView, index, setActiveIndex]);

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-start
        mx-0 my-0
        pt-6 pb-10 px-5
        sm:pt-8 sm:pb-16 sm:px-8
        md:pt-12 md:pb-24 md:px-12
        lg:pt-16 lg:pb-32 lg:px-16
      "
    >
      {/* Image — fades up, stays in flow (no y-transform while scrolling) */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full flex justify-center
          mb-10 sm:mb-16 md:mb-20 lg:mb-24
        "
      >
        <Image
          src={image}
          alt={title}
          width={550}
          height={550}
          className="opacity-90 object-contain
            w-[180px] h-[180px]
            sm:w-[280px] sm:h-[280px]
            md:w-[380px] md:h-[380px]
            lg:w-[480px] lg:h-[480px]
            xl:w-[550px] xl:h-[550px]
          "
        />
      </motion.div>

      {/* Text content */}
      <motion.div
        variants={fadeUpDelayed}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full max-w-xl"
      >
        <h3
          className="font-light tracking-tight
            text-2xl sm:text-3xl lg:text-4xl
            mb-4 sm:mb-6 lg:mb-8
          "
        >
          {title}
        </h3>
        <p
          className="text-white/50 leading-relaxed
            text-sm sm:text-base
            mb-4 sm:mb-6 lg:mb-8
          "
        >
          {description}
        </p>
        {tag && (
          <div className="text-xs sm:text-sm tracking-widest text-white/80">
            {tag}
          </div>
        )}
      </motion.div>

      {/* Section divider — all devices */}
      {!isLast && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      )}
    </div>
  );
}

// ─── Ownership ───────────────────────────────────────────────────────────────
export default function Ownership() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = [
    {
      title: "Security & Risk Posture",
      description:
        "Security and risk posture focuses on keeping organisational risk visible and controlled. Security decisions link directly to business priorities and acceptable risk levels. Each control has a clear owner, review cycle, and response plan. This reduces surprises and limits the impact of incidents when issues occur.",
      tag: "#Resilience",
      image: "/Security.png",
    },
    {
      title: "Technology Execution",
      description:
        "Technology execution ensures systems work reliably as change increases. Platforms follow clear build, release, and run standards. Ownership stays consistent across development and operations to avoid gaps. This keeps delivery steady and reduces failures during growth.",
      tag: "#Scalability",
      image: "/Technology.png",
    },
    {
      title: "Workforce Readiness",
      description:
        "Workforce readiness prepares teams for real operating conditions. Roles and escalation paths stay clear before pressure hits. Training reflects actual scenarios instead of theory. Teams respond faster and make better decisions during incidents.",
      tag: "#Alignment",
      image: "/Workforce.png",
    },
    {
      title: "Operational Control",
      description:
        "Operational control brings structure to daily execution. Decisions follow defined paths instead of informal coordination. Signals focus on risk, progress, and dependencies. Work becomes predictable and less reactive over time.",
      image: "/Operational.png",
    },
    {
      title: "Revenue Enablement",
      description:
        "Revenue enablement connects execution quality to business results. Technical priorities reflect revenue impact and customer trust. Launches follow readiness checks and clear success measures. Growth stays protected as execution becomes disciplined.",
      tag: "#Sustainability",
      image: "/Revenue.png",
    },
  ];

  const scrollToSection = (index: number) => {
    const els = document.querySelectorAll("[data-ownership-section]");
    els[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative">
      {/* Top border */}
      <div className="relative h-px w-full mt-30 border-t border-color">
        <div className="mx-8 h-full" />
      </div>

      <div className="mx-auto w-full relative">

        {/* ══════════════════════════════════════════════════════════
            DESKTOP  lg+  — 4-column grid, sticky nav sidebar
        ══════════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid lg:grid-cols-[10%_25%_55%_10%] relative">
          {/* Vertical rule lines */}
          <div className="absolute inset-0 flex pointer-events-none z-0">
            <div className="h-full w-[10%] border-r border-color" />
            <div className="h-full w-[25%] border-r border-color" />
            <div className="h-full w-[55%] border-r border-color" />
          </div>

          <div className="z-10 h-full" />

          {/* Sticky sidebar */}
          <aside className="relative z-10 p-12">
            <div className="sticky top-24">
              <PlusHeading text="OWNERSHIP" />
              <ul className="mt-20 space-y-6">
                {sections.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? "text-white font-medium"
                        : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
              <div className="mt-32">
                <PartialOutlineBtn text="Explore More" />
              </div>
            </div>
          </aside>

          {/* Main scrolling content */}
          <main className="relative z-10">
            {sections.map((item, index) => (
              <div key={item.title} data-ownership-section>
                <OwnershipSection
                  title={item.title}
                  description={item.description}
                  tag={item.tag}
                  image={item.image}
                  isLast={index === sections.length - 1}
                  index={index}
                  setActiveIndex={setActiveIndex}
                />
              </div>
            ))}
          </main>

          <div className="z-10 h-full" />
        </div>

        {/* ══════════════════════════════════════════════════════════
            TABLET  sm–lg  — 2-column with compact sticky sidebar
        ══════════════════════════════════════════════════════════ */}
        <div className="hidden sm:grid lg:hidden grid-cols-[30%_70%] relative">
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="h-full w-[30%] border-r border-color" />
          </div>

          <aside className="relative z-10 px-6 pt-10 pb-6">
            <div className="sticky top-20">
              <PlusHeading text="OWNERSHIP" />
              <ul className="mt-10 space-y-4">
                {sections.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? "text-white font-medium"
                        : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
              <div className="mt-12">
                <PartialOutlineBtn text="Explore More" />
              </div>
            </div>
          </aside>

          <main className="relative z-10">
            {sections.map((item, index) => (
              <div key={item.title} data-ownership-section>
                <OwnershipSection
                  title={item.title}
                  description={item.description}
                  tag={item.tag}
                  image={item.image}
                  isLast={index === sections.length - 1}
                  index={index}
                  setActiveIndex={setActiveIndex}
                />
              </div>
            ))}
          </main>
        </div>

        {/* ══════════════════════════════════════════════════════════
            MOBILE  <sm  — stacked cards + horizontal scroll nav
        ══════════════════════════════════════════════════════════ */}
        <div className="sm:hidden">
          {/* Header */}
          <div className="px-4 pt-8 pb-4 border-b border-white/10">
            <PlusHeading text="OWNERSHIP" />
          </div>

          {/* Stacked section cards */}
          <div className="py-2">
            {sections.map((item, index) => (
              <div key={item.title} data-ownership-section>
                <OwnershipSection
                  title={item.title}
                  description={item.description}
                  tag={item.tag}
                  image={item.image}
                  isLast={index === sections.length - 1}
                  index={index}
                  setActiveIndex={setActiveIndex}
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="px-4 pb-10">
            <PartialOutlineBtn text="Explore More" />
          </div>
        </div>

      </div>

      {/* Bottom border */}
      <div className="relative h-px w-full">
        <div className="mx-8 h-full bg-white/10" />
      </div>
    </section>
  );
}