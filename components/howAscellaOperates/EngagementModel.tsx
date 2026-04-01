"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import Image from "next/image";
import { SECTIONS, EngagementLabel } from "../../data/EngagementModelData";
import Heading from "../executionArmsPages/headings/Heading";
import { slideInFromBottom } from "@/utils/motion";
import Reveal from "@/utils/Reveal";

const MENU_ITEMS: EngagementLabel[] = [
    "Operation",
    "Pod deployment",
    "Integration",
    "Support",
];

export default function Em3() {
    const [active, setActive] = useState<EngagementLabel>("Operation");
    const [isPaused, setIsPaused] = useState(false);

    const section = SECTIONS.find((s) => s.label === active)!;


    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const imageY = 0;
    const textY = 0;

    useEffect(() => {
        const onScroll = () => setIsPaused(false);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleClick = (item: EngagementLabel) => {
        if (item === active) setIsPaused(false);
        else {
            setActive(item);
            setIsPaused(true);
        }
    };

    useEffect(() => {
        return scrollYProgress.on("change", (v) => {
            const index = Math.round(v * (MENU_ITEMS.length - 1));
            const clampedIndex = Math.max(0, Math.min(index, MENU_ITEMS.length - 1));
            setActive(MENU_ITEMS[clampedIndex]);
        });
    }, [scrollYProgress]);
    // AUTO ROTATE (Mobile Only)
    useEffect(() => {
        const isMobile = window.innerWidth < 1024;
        if (!isMobile) return;
        if (isPaused) return;

        const interval = setInterval(() => {
            setActive((prev) => {
                const currentIndex = MENU_ITEMS.indexOf(prev);
                const nextIndex = (currentIndex + 1) % MENU_ITEMS.length;
                return MENU_ITEMS[nextIndex];
            });
        }, 4000); // 4 seconds

        return () => clearInterval(interval);
    }, [active, isPaused]);

    return (
        <section className="mx-10 lg:mx-20 xl:mx-24">
            <Reveal variants={slideInFromBottom(0.1)} className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start lg:w-[75%] mb-4 md:mb-10 lg:mb-20">
                <Heading text="ENGAGEMENT MODELS" />
                <h1 className="text-[24px] lg:text-[36px] text-center lg:text-left">
                    Engagement structures are shaped around operating alignment, shared accountability, and controlled execution rather than isolated task delivery.
                </h1>
                <p className="font-extralight text-[14px] md:text-[16px] lg:text-base text-center lg:text-left">
                    Ascella engagements are structured around operating alignment, where ownership, governance, and measurement are defined before delivery begins so execution remains controlled and accountable instead of transactional and fragmented.
                </p>
            </Reveal>

            {/* MOBILE AUTO VERSION */}
            <Reveal variants={slideInFromBottom(0.1)} className="flex flex-col items-center gap-8 md:hidden">

                {/* Menu */}
                <nav className="flex flex-col gap-2">
                    {MENU_ITEMS.map((item, index) => (
                        <button
                            key={item}
                            onClick={() => handleClick(item)}
                            className={`text-left transition-colors ${active === item
                                ? "text-white text-[14px]"
                                : "text-gray-300 text-[12px]"
                                }`}
                        >
                            [{String(index + 1).padStart(2, "0")}] {item}
                        </button>
                    ))}
                </nav>

                {/* Animated Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={section.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center gap-6 text-center"
                    >
                        <div className="relative w-full h-[200px]">
                            <Image
                                src={section.image}
                                alt={section.title}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="flex flex-col gap-4 max-w-md">
                            <h2 className="text-xl">{section.title}</h2>
                            <p className="text-b3 text-gray-200">
                                {section.description}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </Reveal>

            {/* DESKTOP STICKY SCROLL VERSION */}
            <div
                ref={sectionRef}
                className="relative h-[300vh] hidden md:block"
            >
                <div className="sticky top-0 grid grid-cols-3 md:gap-16 lg:gap-32 w-full justify-center items-center h-screen">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={section.label}
                            style={{ y: textY }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.25, 0.8, 0.25, 1],
                                delay: 0.05
                            }}
                            className="max-w-sm flex flex-col gap-5"
                        >
                            <h4>{section.title}</h4>
                            <p className="text-[14px] text-gray-200">
                                {section.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={section.image}
                            style={{ y: imageY }}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.25, 0.8, 0.25, 1],
                                delay: 0.1
                            }}
                            className="flex flex-col items-center gap-5"
                        >
                            <div className="w-full flex gap-2">
                                <h1 className="text-3xl">
                                    [{String(MENU_ITEMS.indexOf(active) + 1).padStart(2, "0")}]
                                </h1>
                            </div>

                            <div className="relative w-full h-[500px]">
                                <Image
                                    src={section.image}
                                    alt={section.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <nav className="flex flex-col gap-2">
                        {MENU_ITEMS.map((item) => (
                            <button
                                key={item}
                                onClick={() => handleClick(item)}
                                className={`text-left transition-colors ${active === item
                                    ? "text-white lg:text-[36px] text-[24px]"
                                    : "text-gray-300 hover:text-gray-100 lg:text-[24px] text-[16px]"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </section>
    );
}
