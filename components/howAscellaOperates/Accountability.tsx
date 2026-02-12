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
    content: "Short overview content goes here.",
  },
  {
    id: "accountability",
    title: "Accountability Structure",
    content: "4–5 lines explaining accountability structure.",
  },
  {
    id: "prevents",
    title: "What This Prevents",
    content: "4–5 lines describing what this prevents.",
  },
  {
    id: "reality",
    title: "Operational Reality",
    content: (
      <>
        <p className="mb-4">In conventional models:</p>
        <p className="opacity-70 mb-4">
          Execution is distributed. Accountability becomes unclear. Risk increases.
        </p>

        <p className="mb-4 mt-6">In the Ascella model:</p>
        <p className="opacity-70">
          Execution remains distributed, but accountability is singular. Risk is controlled.
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
      className={`${isLast ? "" : "border-b border-color"}`}
    >
      <button
        onClick={() => onToggle(item.id)}
        className={`w-full text-left p-4 transition-colors ${titleClass}`}
      >
        {item.title}
      </button>

      {showContent && (
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4 text-b1 opacity-70 bg-gray-500 p-5"
            >
              {item.content}
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
    <section className="border-b border-color">
      <div className="py-10 px-10 lg:px-24 border-b border-color">
        <PlusHeading text="Accountability Principle" size="b1" />
      </div>
      <div className=" px-10 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px_1.2fr]">

        <div className="flex flex-col justify-between ">
          <div></div>
          <div className="pb-10">
            <h3>The Single Accountability Principle </h3>
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

        <div className="space-y-4 border-x border-color ">
          {SECTIONS.map((item , index) => (
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
