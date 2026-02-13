"use client";

import { useState } from "react";
import Arrow from "./btns/Arrow";
import PlusHeading from "./headings/PlusHeading";
import Image from "next/image";

const faqs = [
  {
    question: "What is Ascella Group?",
    answer:
      "Ascella Group is a unified operating authority that designs and governs execution across security, technology, workforce, operations, and revenue.",
  },
  {
    question: "Is Ascella a consulting firm?",
    answer:
      "Ascella is not a consulting firm. Work does not stop at advice or recommendations. Responsibility extends into execution, governance, and outcomes.",
  },
  {
    question: "Is Ascella an agency or vendor?",
    answer:
      "Ascella is not positioned as an agency or a service vendor. Execution happens under a single operating authority with ownership retained through delivery.",
  },
  {
    question: "Does Ascella replace internal teams?",
    answer:
      "Ascella does not replace internal teams. It provides structure, decision clarity, and control so internal teams can execute more effectively.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  return (
    <section className="sm:px-6 md:px-10 md:py-20 lg:px-28 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
      <div className="flex flex-col gap-4 py-6   max-w-md md:max-w-xs">
        <PlusHeading text="FAQs" size="b1" plusSize="lg" />
        <h3>Frequently Asked Questions</h3>
        <p className="text-b1">
          Common questions about how Ascella works, what it owns, and how engagements run. Written to help assess fit and set expectations early.
        </p>
      </div>

      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;
        const isHovered = hoveredIndex === index;
        const isExpanded = isOpen || (!isOpen && isHovered);

        return (
          <div
            key={index}
            onMouseEnter={() => {
              if (activeIndex !== index) setHoveredIndex(index);
            }}
            onMouseLeave={() => {
              if (activeIndex !== index) setHoveredIndex(null);
            }}
            className={`group relative min-h-60 md:min-h-80 flex flex-col border transition-all duration-500 ${isExpanded ? "border-white/20 bg-white/5" : "border-color"}`}
          >
            <Image
              src="/FaqCube.svg"
              alt="FAQ Cube"
              width={200}
              height={200}
              className={`absolute top-20 right-1 pointer-events-none transition-opacity duration-500 ${isExpanded ? "opacity-10" : "opacity-15"}`}
            />
            <div className="relative z-10 h-full p-4 md:p-6 lg:mr-10">
              {/* bottom question */}
              <h5
                className={`md:absolute md:bottom-8 md:left-8 md:right-10 transition-all duration-500 ease-out ${isExpanded? "md:opacity-0 md:translate-y-2 md:pointer-events-none":"opacity-100 translate-y-0"}`}
              >
                {faq.question}
              </h5>
              {/* top question */}
              <h5
                className={`hidden md:block md:absolute md:top-8 md:left-8 md:right-10 transition-all duration-500 ease-out ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
              >
                {faq.question}
              </h5>
              <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-96" : "max-h-0"}`}></div>
              <p className={`absolute bottom-8 left-8 right-10 text-b1 text-white transition-all duration-500 delay-100 ease-cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                {faq.answer}
              </p>
            </div>
            {/* Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle(index);
              }}
              aria-expanded={isOpen}
              className={`absolute top-6 right-6 z-20 transition-transform duration-500 ${isOpen ? "rotate-90" : ""}
    `}
            >
              <Arrow />
            </button>
          </div>
        );
      })}
    </section>
  );
}