"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
    {
        title: "Engagements begin with clearly defined operating alignment and accountability structures.",
        desc: "Before any execution starts, expectations, decision rights, and oversight mechanisms are established to prevent ambiguity later in delivery.",
        img: "/whoWeWorkWith/one.png",
        icon: <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="14" y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="28" width="7" height="7" className="fill-gray-400" />
            <rect y="14" width="7" height="7" className="fill-gray-400" />
            <rect width="7" height="7" className="fill-gray-400" />
            <rect x="7" y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="14" width="7" height="7" className="fill-gray-400" />
        </svg>
    },
    {
        title: "Engagements are formed where complexity demands control",
        desc: "Multi-team coordination, regulatory pressure, distributed vendors, or rapid growth create environments where informal execution introduces measurable risk.",
        img: "/whoWeWorkWith/two.png",
        icon: <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" width="7" height="7" className="fill-gray-400" />
            <rect x="21" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="14" y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="28" y="7" width="7" height="7" className="fill-gray-400" />
            <rect y="21" width="7" height="7" className="fill-gray-400" />
            <rect y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="7" y="28" width="7" height="7" className="fill-gray-400" />
            <rect x="14" y="7" width="7" height="7" className="fill-gray-400" />
        </svg>
    },
    {
        title: "Engagements are built for durable control, not temporary support",
        desc: "Operating frameworks are designed to remain effective as scale increases, ensuring stability and continuity over time.",
        img: "/whoWeWorkWith/three.png",
        icon: <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="14" y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="28" width="7" height="7" className="fill-gray-400" />
            <rect y="14" width="7" height="7" className="fill-gray-400" />
            <rect width="7" height="7" className="fill-gray-400" />
            <rect x="7" y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="14" width="7" height="7" className="fill-gray-400" />
        </svg>
    },
];
export default function EngPrincMob() {
    const [index, setIndex] = useState(0);

    const next = () => {
        setIndex((prev) => (prev + 1) % slides.length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="mx-6 mt-10">
            {/* Slide */}
            <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, info) => {
                            if (info.offset.x < -50) next();
                            if (info.offset.x > 50) prev();
                        }}
                        className="flex flex-col justify-center"
                    >
                        {/* Card */}
                        <div className="border border-color border-b-0 p-6 flex flex-col gap-4">
                            {slides[index].icon}
                            <h5 className=" tracking-wide mt-5 text-[16px]">
                                {slides[index].title}
                            </h5>
                            <p className="text-b3 text-gray-200">
                                {slides[index].desc}
                            </p>
                        </div>

                        {/* Image */}
                        <div className="relative h-52 w-full">
                            <Image
                                src={slides[index].img}
                                alt=""
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}