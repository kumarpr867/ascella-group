"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SECTIONS } from "@/data/EngagementModelData";
import { motion, AnimatePresence } from "framer-motion";
import { slideInFromBottom } from "@/utils/motion";
import Reveal from "@/utils/Reveal";
import Heading from "../headings/Heading";

export default function EngagementModels() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const sections = Array.from(
                containerRef.current.querySelectorAll(".step")
            );

            const scrollMiddle = window.innerHeight / 2;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();

                if (rect.top <= scrollMiddle && rect.bottom >= scrollMiddle) {
                    setActiveIndex(index);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        if (!containerRef.current) return;

        const sections = Array.from(
            containerRef.current.querySelectorAll(".step")
        );

        const scrollMiddle = window.innerHeight / 2;

        for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();

            if (rect.top <= scrollMiddle && rect.bottom >= scrollMiddle) {
                if (activeIndex !== i) {
                    setActiveIndex(i);
                }
                break; // ✅ STOP after first match
            }
        }
    };

    return (


        <section ref={containerRef} className="relative bg-black text-white">

<div className="sticky top-0 z-30 bg-black">
  <Reveal
    variants={slideInFromBottom(0.1)}
    className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start lg:w-[75%] mb-4 md:mb-10 lg:mb-20 px-10 lg:px-0 pt-10 pb-6"
  >
    <Heading ="ENGAGEMENT MODELS" />

    <h1 className="text-[24px] lg:text-[36px] text-center lg:text-left">
      Engagement structures are shaped around operating alignment, shared accountability, and controlled execution rather than isolated task delivery.
    </h1>

    <p className="font-extralight text-[14px] md:text-[16px] lg:text-base text-center lg:text-left">
      Ascella engagements are structured around operating alignment, where ownership, governance, and measurement are defined before delivery begins so execution remains controlled and accountable instead of transactional and fragmented.
    </p>
  </Reveal>
</div>

            {/* ✅ STICKY CONTENT */}
            <div className="sticky top-[220px] h-[calc(100vh-220px)] flex">

                {/* LEFT MENU */}
                <div className="w-1/4 flex flex-col justify-center pl-10">
                    {SECTIONS.map((item, index) => (
                        <div
                            key={item.label}
                            className={`mb-4 transition ${activeIndex === index ? "text-white" : "text-gray-500"
                                }`}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>

                {/* CENTER IMAGE */}
                <div className="w-2/4 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={SECTIONS[activeIndex].image}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Image
                                src={SECTIONS[activeIndex].image}
                                alt=""
                                width={400}
                                height={400}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT CONTENT */}
                <div className="w-1/4 flex flex-col justify-center pr-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={SECTIONS[activeIndex].title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <h3 className="text-xl mb-4">
                                {SECTIONS[activeIndex].title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {SECTIONS[activeIndex].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>


            {/* ✅ SCROLL STEPS */}
            <div className="absolute top-0 left-0 w-full">
                {SECTIONS.map((_, i) => (
                    <div key={i} className="step h-screen" />
                ))}
            </div>

        </section>
    );
}