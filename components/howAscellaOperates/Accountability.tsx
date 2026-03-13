"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Heading from "../headings/Heading";
import { slideInFromBottom } from "@/utils/motion";
import Reveal from "@/utils/Reveal";

type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <div className="border-b border-color">
          <div className=" flex flex-col sm:flex-row justify-between sm:items-center my-6">
            <h4 className="text-[16px] lg:text-[24px] font-light">In conventional models:</h4> <p className="text-[16px] font">[ Risk increases ]</p>
          </div>
          <p className="text-b2 text-gray-200  mb-4">
            Accountability is implied rather than explicitly assigned, leaving
            responsibility dependent on coordination habits instead of defined
            authority and measurable ownership.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center my-6">
          <h4 className="text-[16px] lg:text-[24px] font-light">In the Ascella model: </h4><p className="text-[16px] font">[ Risk is controlled ]</p>
        </div>
        <p className="text-b2 text-gray-200  mb-4">
          Accountability is architected into the operating system with named
          decision rights, outcome ownership, and structured oversight embedded
          before execution begins.
        </p>

        <p className="text-b2 lg:text-b1 mt-6">
          Accountability shifts from assumed responsibility → to designed authority.
        </p>
      </>
    ),
  },
  {
    id: "accountability",
    title: "Accountability Structure",
    content: (
      <>
        <div className="border-b border-color">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center my-6">
            <h4 className="text-[16px] lg:text-[24px] font-light">In conventional models:</h4> <p className="text-[16px] font">[ Risk increases ]</p>
          </div>
          <p className="text-b2 text-gray-200  mb-4">
            Multiple leaders share influence over the same workstreams, approvals
            overlap, and escalation routes remain informal, creating confusion when
            priorities conflict or delivery pressure rises.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:items-center my-6">
          <h4 className="text-[16px] lg:text-[24px] font-light">In the Ascella model: </h4><p className="text-[16px] font">[ Risk is controlled ]</p>
        </div>
        <p className="text-b2 text-gray-200  mb-4">
          Each execution domain has a single accountable owner supported by
          defined reporting lines, formal approval gates, and documented
          escalation pathways that maintain clarity under scale.
        </p>

        <p className="text-b2 lg:text-b1 mt-6">
          Shared influence → Singular ownership → Structured escalation.
        </p>
      </>
    ),
  },
  {
    id: "prevents",
    title: "What This Prevents",
    content: (
      <>
        <div className="border-b border-color">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center my-6">
            <h4 className="text-[16px] lg:text-[24px] font-light">In conventional models:</h4> <p className="text-[16px] font">[ Risk increases ]</p>
          </div>
          <p className="text-b2 text-gray-200  mb-4">
            Delayed decisions, duplicated effort, silent risk accumulation, and
            reactive firefighting emerge when no single authority governs execution
            end to end.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center my-6">
          <h4 className="text-[16px] lg:text-[24px] font-light">In the Ascella model: </h4><p className="text-[16px] font">[ Risk is controlled ]</p>
        </div>
        <p className="text-b2 text-gray-200 mb-4">
          Clear ownership eliminates ambiguity, accelerates decision velocity,
          reduces operational friction, and ensures risk is surfaced early within
          controlled governance boundaries.
        </p>

        <p className="text-b2 lg:text-b1 mt-6">
          Ambiguity reduces → Alignment increases → Risk is contained.
        </p>
      </>
    ),
  },
  {
    id: "reality",
    title: "Operational Reality",
    content: (
      <>
        <div className="border-b border-color">
          <div className="flex justify-between mb-5 items-center my-6">
            <h4 className="text-[16px] lg:text-[24px] font-light">In conventional models:</h4> <p className="text-[16px] font">[ Risk increases ]</p>
          </div>
          <p className="text-b2 text-gray-200 mb-4">
            Work is divided across teams, vendors, and functions without a single
            accountable authority for outcomes, creating blurred ownership, slow
            decisions, and unmanaged operational exposure as complexity increases.
          </p>

          <p className="text-b2 lg:text-b1 mb-4">
            Execution spreads across multiple contributors → Accountability
            fragments → Risk compounds over time.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center my-6">
          <h4 className="text-[16px] lg:text-[24px] font-light">In the Ascella model: </h4><p className="text-[16px] font">[ Risk is controlled ]</p>
        </div>
        <p className="text-b2 text-gray-200 mb-4">
          Workstreams operate through defined governance channels where one
          authority retains accountability for outcomes, escalation paths are
          explicit, and performance oversight remains continuous as execution
          scales.
        </p>

        <p className="text-b2 lg:text-b1 mt-6">
          Execution is distributed → Accountability remains singular → Risk stays controlled.
        </p>
      </>
    ),
  },
];

function AccordionItem({
  item,
  active,
  onToggle,
  titleClass = "",
  showContent = true,
  isLast = false,
}: {
  item: Section;
  active: string;
  onToggle: (id: string) => void;
  titleClass?: string;
  showContent?: boolean;
  isLast?: boolean;
}) {
  const isActive = active === item.id;
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const handleHover = () => {
    hoverTimer.current = setTimeout(() => {
      onToggle(item.id);
    }, 200); // adjust delay here
  };

  const cancelHover = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
  };
  return (
    <motion.div
      layout
      transition={{
        layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      className={`${isLast ? "" : "border-b border-color"}`}
    >
      <motion.button
        onClick={() => onToggle(item.id)}
        onMouseEnter={handleHover}
        onMouseLeave={cancelHover}
        className={`group w-full text-left p-4 transition-colors duration-300 ${titleClass} flex justify-between items-center`}
        whileTap={{ scale: 0.98 }}
      >
        <motion.h5
          className={
            showContent
              ? "text-[16px] lg:text-[24px]"
              : "text-[12px] lg:text-[20px] tracking-wide"
          }
          animate={{
            x: isActive ? 6 : 0,
            opacity: isActive ? 1 : 0.75,
          }}
          transition={{ duration: 0.3 }}
        >
          {item.title}
        </motion.h5>
        {showContent && (
          <div
            className={`
      relative flex items-center justify-center h-3 w-3
      transition-transform duration-300 ease-out
      ${isActive ? "rotate-45" : ""}
      group-hover:scale-125
    `}
          >
            <span className="absolute w-full h-px bg-current" />
            <span className="absolute h-full w-px bg-current" />
          </div>
        )}
      </motion.button>

      {showContent && (
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key="content"
              layout
              initial={{
                height: 0,
                opacity: 0,
                y: -10,
                filter: "blur(6px)"
              }}
              animate={{
                height: "auto",
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                height: 0,
                opacity: 0,
                y: -6,
                filter: "blur(4px)"
              }}
              transition={{
                height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.25 },
                y: { duration: 0.35 },
              }}
              className="overflow-hidden bg-gray-500"
            >
              <div className="p-5">
                {item.content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}



export default function Accountability() {
  const [active, setActive] = useState<string>("overview");

  const toggle = (id: string) => {
    setActive((prev) => (prev === id ? "" : id));
  };

  return (
    <section className="border-b border-color min-h-[720px] lg:min-h-[640px]">
      <div className="py-10 xl:py-10 xl:border-b border-color">
        <Reveal variants={slideInFromBottom(0.1)} className="mx-auto max-w-7xl px-10 xl:px-0">
          <Heading text="Accountability Principle" />
        </Reveal>
      </div>
      <div className="hidden xl:block mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_240px_1.2fr] min-h-[520px]">
          <div className="absolute top-0 left-0">
            <svg width="874" height="613" viewBox="0 0 874 613" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 218.187 0)" stroke="url(#paint0_linear_1715_794)" stroke-opacity="0.06" stroke-dasharray="2 2" />
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 152.406 36)" stroke="url(#paint1_linear_1715_794)" stroke-opacity="0.06" stroke-dasharray="2 2" />
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 86.6257 72)" stroke="url(#paint2_linear_1715_794)" stroke-opacity="0.12" stroke-dasharray="2 2" />
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 20.8453 108)" stroke="url(#paint3_linear_1715_794)" stroke-opacity="0.12" stroke-dasharray="2 2" />
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 -44.9351 144)" stroke="url(#paint4_linear_1715_794)" stroke-opacity="0.12" stroke-dasharray="2 2" />
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 -110.715 180)" stroke="url(#paint5_linear_1715_794)" stroke-opacity="0.06" stroke-dasharray="2 2" />
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 -175.001 228)" stroke="url(#paint6_linear_1715_794)" stroke-opacity="0.06" stroke-dasharray="2 2" />
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 479.813 0)" stroke="url(#paint7_linear_1715_794)" stroke-opacity="0.02" stroke-dasharray="2 2" />
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 545.594 36)" stroke="url(#paint8_linear_1715_794)" stroke-opacity="0.04" stroke-dasharray="2 2" />
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 611.374 72)" stroke="url(#paint9_linear_1715_794)" stroke-opacity="0.12" stroke-dasharray="2 2" />
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 677.154 108)" stroke="url(#paint10_linear_1715_794)" stroke-opacity="0.12" stroke-dasharray="2 2" />
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 742.934 144)" stroke="url(#paint11_linear_1715_794)" stroke-opacity="0.12" stroke-dasharray="2 2" />
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 808.715 180)" stroke="url(#paint12_linear_1715_794)" stroke-opacity="0.04" stroke-dasharray="2 2" />
              <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 873 228)" stroke="url(#paint13_linear_1715_794)" stroke-opacity="0.02" stroke-dasharray="2 2" />
              <path d="M285.995 263.498L301.253 272.367L301.257 272.369L348.507 300.421L395.753 273.342L412.013 263.514C401.276 257.433 385.698 248.498 372.688 240.92C366.031 237.043 360.044 233.519 355.721 230.914C353.56 229.612 351.811 228.538 350.601 227.763C349.997 227.376 349.521 227.06 349.193 226.826C349.093 226.754 349.004 226.685 348.926 226.624L285.995 263.498Z" stroke="white" stroke-opacity="0.12" />
              <path d="M31.9951 263.498L47.2529 272.367L47.2568 272.369L94.5068 300.421L141.753 273.342L158.013 263.514C147.276 257.433 131.698 248.498 118.688 240.92C112.031 237.043 106.044 233.519 101.721 230.914C99.5596 229.612 97.8106 228.538 96.6006 227.763C95.9967 227.376 95.5206 227.06 95.1934 226.826C95.0926 226.754 95.0035 226.685 94.9258 226.624L31.9951 263.498Z" stroke="url(#paint14_linear_1715_794)" stroke-opacity="0.12" />
              <defs>
                <linearGradient id="paint0_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint1_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint2_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint3_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint4_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint5_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint6_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint7_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint8_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint9_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint10_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint11_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint12_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint13_linear_1715_794" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" />
                </linearGradient>
                <linearGradient id="paint14_linear_1715_794" x1="159.002" y1="262.5" x2="38.0019" y2="266.5" gradientUnits="userSpaceOnUse">
                  <stop stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>

          </div>
          <Reveal variants={slideInFromBottom(0.1)} className="flex flex-col justify-between sticky">
            <div></div>
            <div className="pb-10">
              <h3>The Single <br /> Accountability Principle </h3>
              <p className="text-b2 text-gray-200  mb-4">
                A structural governance approach that assigns one clearly defined accountable authority to every execution domain, ensuring decisions, outcomes, and risk ownership remain unambiguous as scale increases.
              </p>
            </div>
          </Reveal>

          <Reveal variants={slideInFromBottom(0.1)} className="space-y-4">
            {SECTIONS.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                active={active}
                onToggle={setActive}
                showContent={false}
                titleClass={active === item.id ? "text-white" : "text-gray-200"}
              />
            ))}
          </Reveal>

          <div className="relative border-x border-color h-full min-h-[500px]">
            <Reveal variants={slideInFromBottom(0.1)} className="relative h-full">
              {SECTIONS.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  active={active}
                  onToggle={toggle}
                  isLast={index === SECTIONS.length - 1}
                />
              ))}
            </Reveal>

          </div>
        </div>
      </div>

      {/* Mobile accordion */}
      <div className="xl:hidden mb-20 px-10 space-y-4">
        <div className="pb-4">
          <h4>The Single <br /> Accountability Principle </h4>
          <p className="text-b2 leading-tight mt-4 ">
            A structural governance approach that assigns one clearly defined accountable authority to every execution domain, ensuring decisions, outcomes, and risk ownership remain unambiguous as scale increases.
          </p>
        </div>
        {SECTIONS.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            active={active}
            onToggle={toggle}
            titleClass="text-b1"
          />
        ))}
      </div>
    </section>
  );
}
