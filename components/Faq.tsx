"use client";

import { useState } from "react";
import Image from "next/image";
import Heading from "./headings/Heading";
import ArrowButton from "./btns/Arrow";

type FAQ = {
  question: string;
  answer: string;
};

type Props = {
  faqs: FAQ[];
  description: string;
};

export default function Faq({ faqs, description }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {/* DESKTOP */}
      <section className="px-10 hidden md:grid mx-auto max-w-7xl py-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[0.5fr]">
        <div className="flex flex-col gap-4 py-6 row-span-2 max-w-md md:max-w-xs">
          <Heading text="FAQs" />
          <h3>Frequently Asked Questions</h3>
          <p className="text-[16px] text-gray-200">{description}</p>
        </div>

        {faqs.map((faq, index) => {
          const isHovered = hoveredIndex === index;
          const isOpen = activeIndex === index;
          const isExpanded = isHovered || isOpen;

          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => toggle(index)}
              className={`group cursor-pointer relative min-h-56 xl:min-h-48 flex flex-col border transition-all duration-500 ${isExpanded ? "border-white/20 bg-white/5" : "border-color"
                }`}
            >
              <Image
                src="/FaqCube.svg"
                alt="FAQ Cube"
                width={120}
                height={120}
                className={`absolute bottom-0 pointer-events-none transition-opacity duration-500
                ${isExpanded ? "opacity-10" : "opacity-15"}
                ${index % 2 !== 0 ? "left-1 -scale-x-100" : "right-1"}`}
              />

              <div className="relative z-10 h-full p-4 md:p-6 lg:mr-10">
                {/* Question Bottom */}
                <h6
                  className={`md:absolute md:bottom-8 md:left-8 md:right-10 transition-all duration-500 ${isExpanded
                      ? "md:opacity-0 md:translate-y-2"
                      : "opacity-100"
                    }`}
                >
                  {faq.question}
                </h6>

                {/* Question Top */}
                <h6
                  className={`hidden md:block md:absolute md:top-8 md:left-8 md:right-10 transition-all duration-500 ${isExpanded
                      ? "opacity-100"
                      : "opacity-0 -translate-y-4"
                    }`}
                >
                  {faq.question}
                </h6>

                {/* Answer */}
                <p
                  className={`absolute top-20 left-8 right-10 text-b3 text-white transition-all duration-500 delay-100 ${isExpanded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* MOBILE */}
      <section className="px-10 block md:hidden mx-auto max-w-7xl py-16">
        <div className="flex flex-col gap-4 mb-4 max-w-md">
          <Heading text="FAQs" />
          <h4>Frequently Asked Questions</h4>
          <p className="text-[12px] text-gray-200">
            {description}
          </p>
        </div>

        <div className="flex flex-col divide-y divide-white/10">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div key={index} className="py-6">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h6 className="pr-6">{faq.question}</h6>

                  <div
                    className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""
                      }`}
                  >
                    <ArrowButton />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ${isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-b3 text-white/80">{faq.answer}</p>
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