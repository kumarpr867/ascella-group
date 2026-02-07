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
import PlusHeading from "../../headings/PlusHeading";
import { SECTIONS, EngagementLabel } from "./data";

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

    // 🔹 Parallax
    const sectionRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const imageY = reduceMotion
        ? 0
        : useTransform(scrollYProgress, [0, 1], [-40, 40]);

    const textY = reduceMotion
        ? 0
        : useTransform(scrollYProgress, [0, 1], [12, -12]);

    //   // 🔹 Auto rotate
    //   newFunction();

    // 🔹 Resume on scroll
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


    return (
        <section className="m-20 xl:m-30">
            {/* Header */}
            <header className="flex flex-col gap-6 md:w-1/2 mb-20">
                <PlusHeading text="ENGAGEMENT MODELS" size="md" />
                <h1 className="text-3xl leading-tight">
                    Engagement structures are{" "}
                    <span className="text-gray-200">
                        designed for operational alignment
                    </span>
                    , not transactional delivery.
                </h1>
                <p className="font-extralight">
                    Ascella engagements are structured based on organisational maturity,
                    execution complexity, and governance need.
                </p>
            </header>

            {/* Content */}
            <div ref={sectionRef} className="relative h-[300vh]">
                <div className="sticky top-24 flex justify-between items-start gap-12">
                    {/* Text */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={section.label}
                            style={{ y: textY }}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="max-w-sm min-h-[220px] flex flex-col gap-5 will-change-transform"
                        >
                            <h2 className="text-xl">{section.title}</h2>
                            <p className="text-sm text-gray-300">{section.description}</p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Image */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={section.image}
                            style={{ y: imageY }}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="flex flex-col gap-5 will-change-transform"
                        >
                            <h1 className="text-3xl">
                                [0{MENU_ITEMS.indexOf(active) + 1}]
                            </h1>
                            <Image
                                src={section.image}
                                alt={section.title}
                                width={300}
                                height={600}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Menu */}
                    <nav className="menu text-2xl flex flex-col gap-2">
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

    function newFunction() {
        useEffect(() => {
            if (isPaused) return;

            const interval = setInterval(() => {
                setActive((prev) => {
                    const i = MENU_ITEMS.indexOf(prev);
                    return MENU_ITEMS[(i + 1) % MENU_ITEMS.length];
                });
            }, 5000);

            return () => clearInterval(interval);
        }, [isPaused]);
    }
}
