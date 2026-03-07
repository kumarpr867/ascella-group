"use client";

import { useState, useEffect, useRef } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { SECTIONS, EngagementLabel } from "./data";
import Heading from "../../headings/Heading";

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
    const reduceMotion = useReducedMotion();

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
        <section className="mx-auto max-w-7xl px-10 my-24">
            <header className="flex flex-col gap-6 lg:w-1/2 mb-16 lg:mb-20">
                <Heading text="ENGAGEMENT MODELS" />
                <h1 className="text-[24px] lg:text-[36px] ">
                    Engagement structures are designed for operational alignment, not transactional delivery.
                </h1>
                <p className="font-extralight text-[14px] md:text-[16px] lg:text-base">
                    Ascella engagements are structured based on organisational maturity, execution complexity, and governance need.
                </p>
            </header>

            {/* MOBILE AUTO VERSION */}
            <div className="flex flex-col items-center gap-8 md:hidden">

                {/* Menu */}
                <nav className="flex flex-col gap-2 text-lg">
                    {MENU_ITEMS.map((item, index) => (
                        <button
                            key={item}
                            onClick={() => handleClick(item)}
                            className={`text-left transition-colors ${active === item
                                    ? "text-white"
                                    : "text-gray-400"
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
                        <div className="relative w-full h-[260px]">
                            <Image
                                src={section.image}
                                alt={section.title}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="flex flex-col gap-4 max-w-md">
                            <h2 className="text-xl">{section.title}</h2>
                            <p className="text-sm text-gray-300">
                                {section.description}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* DESKTOP STICKY SCROLL VERSION */}
            <div
                ref={sectionRef}
                className="relative h-[300vh] hidden md:block"
            >
                <div className="sticky top-24 grid grid-cols-3 md:gap-16 lg:gap-32 w-full justify-center items-center">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={section.label}
                            style={{ y: textY }}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="max-w-sm flex flex-col gap-5"
                        >
                            <h2 className="text-xl">{section.title}</h2>
                            <p className="text-sm text-gray-300">
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
                            transition={{ duration: 0.35, ease: "easeOut" }}
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

                    <nav className="text-2xl flex flex-col gap-2">
                        {MENU_ITEMS.map((item) => (
                            <button
                                key={item}
                                onClick={() => handleClick(item)}
                                className={`text-left transition-colors ${active === item
                                    ? "text-white"
                                    : "text-gray-300 hover:text-gray-100"
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
