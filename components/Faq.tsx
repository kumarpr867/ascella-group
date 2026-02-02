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

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  return (
    <section className="px-30 p-1 0 lg:py-30 grid lg:grid-cols-3 auto-rows-fr">
      <div className="flex flex-col gap-4 py-10 max-w-2xs">
        <PlusHeading text="FAQs" size="lg" />
        <h1 className="text-3xl">
          Frequently <br /> Asked Questions
        </h1>
        <p className="font-extralight text-white/50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ipsa id nobis rerum praesentium quos beatae minima asperiores possimus.
        </p>
      </div>

      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={index}
            className="group relative flex p-10 border border-color text-left overflow-hidden justify-between"
          >
            <Image
              src="/FaqCube.svg"
              alt="FAQ Cube"
              width={180}
              height={180}
              className={`absolute bottom-10 right-0 z-0 pointer-events-none 
                transition-opacity duration-300 ${isOpen ? "opacity-10" : "opacity-15"} group-hover:opacity-10`}  

            />
            <div className="relative z-10 w-3/4 h-40">
              <h2
                className={`
                          absolute left-0 bottom-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                          ${isOpen ? "-translate-y-24": "translate-y-0"}
                          group-hover:-translate-y-24
                        `}
              >
                {faq.question}
              </h2>


              <p
                className={`absolute left-0 bottom-0 text-sm text-white/50 tight transition-all duration-400 ease-in-out  ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} group-hover:opacity-100 group-hover:translate-y-0`}
              >
                {faq.answer}
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-label="Toggle answer"
              className="flex "
            >
              <Arrow />
            </button>
          </div>
        );
      })}



    </section >
  );
}