'use client';

import Image from "next/image";
import PlusHeading from "../headings/PlusHeading";
import { motion } from "motion/react";

const points = [
    {
        svg: <svg width="42" height="28" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="14" y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="14" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="21" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="35" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="28" y="6" width="7" height="7" className="fill-gray-400" />
            <rect y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="7" y="21" width="7" height="7" className="fill-gray-400" />
            <rect y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="7" width="7" height="7" className="fill-gray-400" />
        </svg>,
        count: "01",
        heading: "Structured authority",
        description: "Decision ownership stays defined from the start, with clear authority and outcome responsibility assigned to specific roles instead of shared committees."
    },
    {
        svg: <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="14" width="7" height="7" className="fill-gray-400" />
            <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="21" y="14" width="7" height="7" className="fill-gray-400" />
            <rect y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="14" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="14" y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="27" y="7" width="7" height="7" className="fill-gray-400" />
        </svg>,
        count: "02",
        heading: "Outcome pods",
        description: "Small cross functional teams own defined results within a shared operating system, which reduces handoffs and keeps accountability intact throughout delivery."
    },
    {
        svg: <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="14" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="21" y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="28" y="14" width="7" height="7" className="fill-gray-400" />
            <rect y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="7" y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="7" y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="14" width="7" height="7" className="fill-gray-400" />
        </svg>,
        count: "03",
        heading: "Operational signals",
        description: "Progress, risk, and dependencies remain visible through a small set of consistent signals that surface issues early and trigger action."
    },
    {
        svg: <svg width="35" height="21" viewBox="0 0 35 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="14" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="28" y="7" width="7" height="7" className="fill-gray-400" />
            <rect y="14" width="7" height="7" className="fill-gray-400" />
            <rect width="7" height="7" className="fill-gray-400" />
            <rect x="7" y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="14" width="7" height="7" className="fill-gray-400" />
        </svg>,
        count: "04",
        heading: "Built in security",
        description: "Risk consideration stays embedded in planning and execution workflows, which reduces exposure and prevents last minute controls or reactive fixes."
    }
];

export default function HowWeOperate() {
    return (
        <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

            {/* ── Mobile layout: heading block first, then cards, then image ── */}
            {/* ── Desktop layout: image left | content+cards right (side-by-side) ── */}

            {/* Desktop wrapper — hidden on mobile, flex on lg+ */}
            <div className="hidden lg:flex items-start gap-16 xl:gap-24">

                {/* Left: image */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex-shrink-0 flex items-center justify-center"
                >
                    <Image
                        src="/HowWeOperate.png"
                        alt="How We Operate"
                        width={550}
                        height={550}
                        className="w-[420px] xl:w-[500px] object-contain"
                    />
                </motion.div>

                {/* Right: text + cards */}
                <div className="flex flex-col justify-between gap-10 flex-1 min-w-0">
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="flex flex-col gap-4"
                    >
                        <PlusHeading text="How We Operate" />
                        <p className="font-light text-3xl xl:text-4xl text-white leading-tight">
                            Control is designed in,<br />
                            not enforced later
                        </p>
                        <p className="text-gray-100 font-light max-w-lg">
                            Ascella establishes governance, accountability, and measurement before execution begins—ensuring delivery remains controlled, predictable, and aligned as organisations scale.
                        </p>
                    </motion.div>

                    <ul className="grid grid-cols-2 gap-5">
                        {points.map((point, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
                                className="flex flex-col gap-2.5 bg-gray-500 p-5 xl:p-6 rounded-2xl"
                            >
                                <div className="flex justify-between w-full items-start">
                                    <div aria-hidden="true">{point.svg}</div>
                                    <span className="text-xl font-thin">{point.count}</span>
                                </div>
                                <h4 className="leading-tight font-light text-xl xl:text-2xl">{point.heading}</h4>
                                <p className="text-gray-300 text-sm xl:text-base">{point.description}</p>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ── Mobile layout (< lg) — single column, image in middle like screenshot ── */}
            <div className="flex flex-col gap-6 lg:hidden">

                {/* 1. Heading block */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex flex-col gap-3"
                >
                    <PlusHeading text="How We Operate" />
                    <p className="font-light text-3xl text-white leading-tight">
                        Control is built before<br />
                        work begins
                    </p>
                    <p className="text-gray-100 font-light text-sm">
                        Ascella establishes governance, accountability, and measurement before execution begins—ensuring delivery remains controlled, predictable, and aligned as organisations scale.
                    </p>
                </motion.div>

                {/* 2. First two cards */}
                <ul className="flex flex-col gap-4">
                    {points.slice(0, 2).map((point, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                            className="flex flex-col gap-2 bg-gray-500 p-5 rounded-2xl"
                        >
                            <div className="flex justify-between w-full items-start">
                                <div aria-hidden="true">{point.svg}</div>
                                <span className="text-lg font-thin">{point.count}</span>
                            </div>
                            <h4 className="leading-tight font-light text-xl">{point.heading}</h4>
                            <p className="text-gray-300 text-sm">{point.description}</p>
                        </motion.li>
                    ))}
                </ul>

                {/* 3. Image — appears between card 02 and 03, matching the screenshot */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex justify-center"
                >
                    <Image
                        src="/HowWeOperate.png"
                        alt="How We Operate"
                        width={400}
                        height={400}
                        className="w-full max-w-xs sm:max-w-sm object-contain"
                    />
                </motion.div>

                {/* 4. Last two cards */}
                <ul className="flex flex-col gap-4">
                    {points.slice(2).map((point, index) => (
                        <motion.li
                            key={index + 2}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                            className="flex flex-col gap-2 bg-gray-500 p-5 rounded-2xl"
                        >
                            <div className="flex justify-between w-full items-start">
                                <div aria-hidden="true">{point.svg}</div>
                                <span className="text-lg font-thin">{point.count}</span>
                            </div>
                            <h4 className="leading-tight font-light text-xl">{point.heading}</h4>
                            <p className="text-gray-300 text-sm">{point.description}</p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}