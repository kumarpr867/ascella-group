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
      "No. Ascella retains governance and accountability over execution rather than offering advisory-only support.",
  },
  {
    question: "Are services selected individually?",
    answer:
      "No. Engagements are structured around operating needs, not standalone service selection.",
  },
  {
    question: "Does Ascella replace internal teams?",
    answer:
      "No. Ascella structures and governs execution while working alongside internal teams and embedded pods.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  return (
    <section className="px-20 lg:px-50 p-1 0 lg:py-30 grid md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
      <div className="flex flex-col gap-4 py-10 max-w-2xs">
        <PlusHeading text="FAQs" size="lg" />
        <h1 className="text-3xl">
          Frequently Asked Questions
        </h1>
        <p className="font-extralight text-white/50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ipsa id nobis rerum praesentium quos beatae minima asperiores possimus.
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


            className={`group relative min-h-80 flex flex-col border transition-all duration-500 ${isExpanded ? "border-white/20 bg-white/5" : "border-color"}
        `}
          >
            <Image
              src="/FaqCube.svg"
              alt="FAQ Cube"
              width={180}
              height={180}
              className={`absolute top-20 right-1 pointer-events-none transition-opacity duration-500
            ${isExpanded ? "opacity-10" : "opacity-15"}
          `}
            />

            <div className="relative z-10 h-full p-6  lg:mr-15">
              {/* bottom question */}
              <h2
                className={`lg:absolute lg:bottom-10 lg:left-10 lg:right-20 text-md lg:text-lg font-medium transition-all duration-500 ease-out ${isExpanded? "lg:opacity-0 lg:translate-y-2 lg:pointer-events-none":"opacity-100 translate-y-0"}`}>
                {faq.question}
              </h2>
              {/* top question */}
              <h2
                className={`hidden lg:block lg:absolute lg:top-10 lg:left-10 lg:right-20 text-xl font-medium transition-all duration-500 ease-out ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
              >
                {faq.question}
              </h2>
 
              <div
                className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-96" : "max-h-0"}`}></div>
              <p className={`absolute bottom-10 left-10 right-20 text-sm text-white/50 transition-all duration-500 delay-100 ease-cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
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




    </section >
  );
}