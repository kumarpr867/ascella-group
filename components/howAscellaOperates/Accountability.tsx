"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlusHeading from "../headings/PlusHeading";

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
          <div className="flex justify-between items-center my-6">
            <h4>In conventional models:</h4> <p className="text-b2">[ Risk increases ]</p>
          </div>
          <p className="text-b2 text-gray-200  mb-4">
            Accountability is implied rather than explicitly assigned, leaving
            responsibility dependent on coordination habits instead of defined
            authority and measurable ownership.
          </p>
        </div>
        <div className="flex justify-between items-center my-6">
          <h4>In the Ascella model: </h4><p className="text-b1">[ Risk increases ]</p>
        </div>
        <p className="text-b2 text-gray-200  mb-4">
          Accountability is architected into the operating system with named
          decision rights, outcome ownership, and structured oversight embedded
          before execution begins.
        </p>

        <p className="mt-6">
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
          <div className="flex justify-between mb-5 justify-between items-center my-6">
            <h4>In conventional models:</h4> <p className="text-b2">[ Risk increases ]</p>
          </div>
          <p className="text-b2 text-gray-200  mb-4">
            Multiple leaders share influence over the same workstreams, approvals
            overlap, and escalation routes remain informal, creating confusion when
            priorities conflict or delivery pressure rises.
          </p>
        </div>

        <div className="flex justify-between items-center my-6">
          <h4>In the Ascella model: </h4><p className="text-b1">[ Risk increases ]</p>
        </div>
        <p className="text-b2 text-gray-200  mb-4">
          Each execution domain has a single accountable owner supported by
          defined reporting lines, formal approval gates, and documented
          escalation pathways that maintain clarity under scale.
        </p>

        <p className="mt-6">
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
          <div className="flex justify-between mb-5 justify-between items-center my-6">
            <h4>In conventional models:</h4> <p className="text-b2">[ Risk increases ]</p>
          </div>
          <p className="text-b2 text-gray-200  mb-4">
            Delayed decisions, duplicated effort, silent risk accumulation, and
            reactive firefighting emerge when no single authority governs execution
            end to end.
          </p>
        </div>
        <div className="flex justify-between items-center my-6">
          <h4>In the Ascella model: </h4><p className="text-b1">[ Risk increases ]</p>
        </div>
        <p className="text-b2 text-gray-200 mb-4">
          Clear ownership eliminates ambiguity, accelerates decision velocity,
          reduces operational friction, and ensures risk is surfaced early within
          controlled governance boundaries.
        </p>

        <p className="mt-6">
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
            <h4>In conventional models:</h4> <p className="text-b2">[ Risk increases ]</p>
          </div>
          <p className="text-b2 text-gray-200 mb-4">
            Work is divided across teams, vendors, and functions without a single
            accountable authority for outcomes, creating blurred ownership, slow
            decisions, and unmanaged operational exposure as complexity increases.
          </p>

          <p className="text-b1 mb-4">
            Execution spreads across multiple contributors → Accountability
            fragments → Risk compounds over time.
          </p>
        </div>
        <div className="flex justify-between items-center my-6">
          <h4>In the Ascella model: </h4><p className="text-b1">[ Risk increases ]</p>
        </div>
        <p className="opacity-70 mb-4">
          Workstreams operate through defined governance channels where one
          authority retains accountability for outcomes, escalation paths are
          explicit, and performance oversight remains continuous as execution
          scales.
        </p>

        <p className="mt-6">
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
        className={`w-full text-left p-4 transition-colors duration-300 ${titleClass}`}
        whileTap={{ scale: 0.98 }}
      >
        <motion.h5
          animate={{
            x: isActive ? 6 : 0,
            opacity: isActive ? 1 : 0.75,
          }}
          transition={{ duration: 0.3 }}
        >
          {item.title}
        </motion.h5>
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


      <div className="py-10 px-10 lg:px-24 border-b border-color">
        <PlusHeading text="Accountability Principle" size="b1" />
      </div>
      <div className=" px-10 lg:px-24">
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_240px_1.2fr] min-h-[520px]">


          <div className="flex flex-col justify-between sticky">
            <div></div>
            <div className="pb-10">
              <h3>The Single <br /> Accountability Principle </h3>
              <p className="text-b1 leading-tight mt-2 max-w-xs">
                A governance model designed to eliminate ownership gaps in execution.
              </p>
            </div>
          </div>

          <div className="space-y-4">
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
          </div>

          <div className="relative border-x border-color h-full min-h-[500px]">
            <div className="relative h-full">
              {SECTIONS.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  active={active}
                  onToggle={toggle}
                  isLast={index === SECTIONS.length - 1}
                />
              ))}
            </div>

          </div>
          {/* <div className="relative border-x border-color min-h-[520px] bg-gray-500">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 p-6"
              >
                {SECTIONS.find((s) => s.id === active)?.content}
              </motion.div>
            </AnimatePresence>
          </div> */}
        </div>
      </div>
      {/* Mobile accordion */}
      <div className="lg:hidden mt-20 px-6 space-y-4">
        {SECTIONS.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            active={active}
            onToggle={toggle}
            titleClass="text-lg"
          />
        ))}
      </div>
    </section>
  );
}
