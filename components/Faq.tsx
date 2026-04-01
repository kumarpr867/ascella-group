"use client";

import { useState } from "react";
import Image from "next/image";
import Heading from "./executionArmsPages/headings/Heading";
import ArrowButton from "./btns/Arrow";
import { motion } from "framer-motion";
import Reveal from "@/utils/Reveal";
import { slideInFromBottom } from "@/utils/motion";

type FAQ = {
  question: string;
  answer: string;
};

type Props = {
  faqs: FAQ[];
  description: string;
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.001
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98] as any
    }
  }
};

export default function Faq({ faqs, description }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1] as any, duration: 0.8 } },
  };

  return (
    <>
      {/* DESKTOP */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="hidden md:grid mx-10 lg:mx-20 xl:mx-24 py-8 md:py-16 lg:py-16 xl:py-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[0.5fr]"
      >
        <Reveal variants={slideInFromBottom(0.3)}
          className="flex flex-col gap-4 py-6 row-span-2 max-w-md md:max-w-xs"
        >
          <Heading text="FAQs" />
          <h3>Frequently Asked Questions</h3>
          <p className="text-[16px] text-gray-200">{description}</p>
        </Reveal>

        {faqs.map((faq, index) => {
          const isHovered = hoveredIndex === index;
          const isOpen = activeIndex === index;
          const isExpanded = isHovered || isOpen; // Click aur Hover dono handle ho rahe hain

          return (
            <motion.div
              key={index}
              variants={item}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => toggle(index)}
              className={`group cursor-pointer relative min-h-56 xl:min-h-48 flex flex-col border transition-all duration-500 ${isExpanded ? "border-white/20 bg-white/5" : "border-color"}`}
            >
              <Image
                src="/FaqCube.svg"
                alt="FAQ Cube"
                width={120}
                height={120}
                className={`absolute bottom-0 pointer-events-none transition-opacity duration-500 ${isExpanded ? "opacity-10" : "opacity-15"} ${index % 2 !== 0 ? "left-1 -scale-x-100" : "right-1"}`}
              />

              {/* Responsive Icon: Hover aur Click dono pe rotate hoga */}
              <div 
                className={`absolute top-8 right-8 z-20 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] ${isExpanded ? "rotate-0" : "rotate-90"}`}
              >
                <ArrowButton />
              </div>

              <div className="relative z-10 h-full p-4 md:p-6 lg:mr-10">
                <motion.h6
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isExpanded ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="md:absolute md:bottom-8 md:left-8 md:right-10"
                >
                  {faq.question}
                </motion.h6>

                <motion.h6
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : -10 }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:block md:absolute md:top-8 md:left-8 md:right-10"
                >
                  {faq.question}
                </motion.h6>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 20 }}
                  transition={{ delay: 0.1 }}
                  className="absolute top-20 left-8 right-10 text-b3 text-white"
                >
                  {faq.answer}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </motion.section>

      {/* MOBILE */}
      <section className="px-10 block md:hidden mx-auto max-w-7xl py-16">
        <div className="flex flex-col gap-4 mb-4 max-w-md">
          <Heading text="FAQs" />
          <h4>Frequently Asked Questions</h4>
          <p className="text-[12px] text-gray-200">{description}</p>
        </div>

        <div className="flex flex-col divide-y divide-white/10">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className="py-6">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h6 className="pr-6">{faq.question}</h6>

                    <div
                      className={`transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-90"}`}
                    >
                      <ArrowButton />
                    </div>
                  </button>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 20
                    }}  
                    className="grid mt-4"
                  >
                    <div className="overflow-hidden">
                      <p className="text-b3 text-white/80">{faq.answer}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}