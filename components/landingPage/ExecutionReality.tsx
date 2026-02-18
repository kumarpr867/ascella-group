"use client";

import React from "react";
import PlusHeading from "../headings/PlusHeading";
import { motion, type Variants } from "motion/react";

const container: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.1,
        },
    },
};


const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 28,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8 },
    },
};


type ProblemItem = {
    title: string;
    subHeading: string;
    description: string;
    icon: React.ReactNode;
};

const items: ProblemItem[] = [
    {
        title: "Diffuse Ownership",
        subHeading: "No single accountable owner",
        description:
            "Work moves across roles and partners without a clear decision holder, forcing coordination to replace authority and causing outcomes to drift despite visible activity.",
        icon: (
            <svg width="149" height="149" viewBox="0 0 149 149" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="74.5" cy="74.5" r="74" stroke="white" />
                <circle cx="74.5" cy="74.5" r="54" stroke="white" />
                <circle cx="74.5" cy="74.5" r="31" stroke="white" />
                <circle cx="129" cy="124" r="4" fill="white" />
                <circle cx="44" cy="71" r="4" fill="white" />
                <circle cx="76" cy="21" r="4" fill="white" />
                <circle cx="7" cy="105" r="4" fill="white" />
            </svg>

        ),
    },
    {
        title: "Priority Drift",
        subHeading: "Effort without shared direction",
        description:
            "Teams execute against local goals instead of common outcomes. Work advances in parallel but pulls in different directions. Results weaken as alignment stays informal.",
        icon: (
            <svg width="152" height="152" viewBox="0 0 152 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="75.393" cy="76.2078" r="23.1609" stroke="white" stroke-width="0.7" />
                <path d="M75.7985 0L73.7777 3.5L77.8192 3.5L75.7985 0ZM75.7985 42.9683L77.8192 39.4683L73.7777 39.4683L75.7985 42.9683ZM75.7985 3.15L75.4485 3.15L75.4485 39.8183L75.7985 39.8183L76.1485 39.8183L76.1485 3.15L75.7985 3.15Z" fill="white" />
                <path d="M75.7985 108.637L73.7777 112.137L77.8192 112.137L75.7985 108.637ZM75.7985 151.605L77.8192 148.105L73.7777 148.105L75.7985 151.605ZM75.7985 111.787L75.4485 111.787L75.4485 148.455L75.7985 148.455L76.1485 148.455L76.1485 111.787L75.7985 111.787Z" fill="white" />
                <path d="M0 75.8064L3.5 77.8271L3.5 73.7857L0 75.8064ZM42.9683 75.8064L39.4683 73.7857L39.4683 77.8271L42.9683 75.8064ZM3.15 75.8064L3.15 76.1564L39.8183 76.1564V75.8064V75.4564L3.15 75.4564L3.15 75.8064Z" fill="white" />
                <path d="M108.637 75.8064L112.137 77.8271L112.137 73.7857L108.637 75.8064ZM151.605 75.8064L148.105 73.7857V77.8271L151.605 75.8064ZM111.787 75.8064V76.1564L148.455 76.1564V75.8064V75.4564L111.787 75.4564V75.8064Z" fill="white" />
                <path d="M22.1992 129.408L26.103 128.362L23.2452 125.504L22.1992 129.408ZM52.5824 99.0249L48.6786 100.071L51.5364 102.929L52.5824 99.0249ZM24.4266 127.181L24.6741 127.428L50.6025 101.5L50.355 101.252L50.1075 101.005L24.1791 126.933L24.4266 127.181Z" fill="white" />
                <path d="M99.0168 52.5902L102.921 51.5442L100.063 48.6865L99.0168 52.5902ZM129.4 22.2071L125.496 23.2531L128.354 26.1108L129.4 22.2071ZM101.244 50.3628L101.492 50.6103L127.42 24.6819L127.173 24.4345L126.925 24.187L100.997 50.1153L101.244 50.3628Z" fill="white" />
                <path d="M129.4 129.408L128.354 125.504L125.496 128.362L129.4 129.408ZM99.017 99.0249L100.063 102.929L102.921 100.071L99.017 99.0249ZM127.173 127.181L127.42 126.933L101.492 101.005L101.244 101.252L100.997 101.5L126.925 127.428L127.173 127.181Z" fill="white" />
                <path d="M52.5823 52.5902L51.5363 48.6865L48.6785 51.5442L52.5823 52.5902ZM22.1991 22.2071L23.2451 26.1108L26.1029 23.2531L22.1991 22.2071ZM50.3549 50.3628L50.6024 50.1153L24.674 24.187L24.4265 24.4345L24.179 24.6819L50.1074 50.6103L50.3549 50.3628Z" fill="white" />
                <path d="M141.447 113.709L139.426 110.209L137.405 113.709L141.447 113.709ZM104.235 92.2247L106.256 95.7247L108.276 92.2247L104.235 92.2247ZM138.719 112.134L138.894 111.831L107.138 93.4966L106.963 93.7997L106.788 94.1028L138.544 112.437L138.719 112.134Z" fill="white" />
                <path d="M47.3643 59.3905L45.3435 55.8905L43.3228 59.3905L47.3643 59.3905ZM10.1527 37.9064L12.1734 41.4064L14.1941 37.9064L10.1527 37.9064ZM44.6363 57.8155L44.8113 57.5124L13.0556 39.1783L12.8806 39.4814L12.7056 39.7845L44.4613 58.1186L44.6363 57.8155Z" fill="white" />
                <path d="M10.1527 113.709L12.1734 110.209L14.1942 113.709L10.1527 113.709ZM47.3643 92.2247L45.3436 95.7247L43.3229 92.2247L47.3643 92.2247ZM12.8807 112.134L12.7057 111.831L44.4613 93.4966L44.6363 93.7997L44.8113 94.1028L13.0557 112.437L12.8807 112.134Z" fill="white" />
                <path d="M104.235 59.3905L106.256 55.8905L108.276 59.3905L104.235 59.3905ZM141.447 37.9064L139.426 41.4064L137.405 37.9064L141.447 37.9064ZM106.963 57.8155L106.788 57.5124L138.544 39.1783L138.719 39.4814L138.894 39.7845L107.138 58.1186L106.963 57.8155Z" fill="white" />
                <path d="M37.8983 141.454L37.8983 137.413L41.3983 139.434L37.8983 141.454ZM59.3824 104.243L59.3824 108.284L55.8824 106.264L59.3824 104.243ZM39.4733 138.726L39.1702 138.551L57.5043 106.796L57.8074 106.971L58.1106 107.146L39.7764 138.901L39.4733 138.726Z" fill="white" />
                <path d="M92.2168 47.3723L92.2168 43.3309L95.7168 45.3516L92.2168 47.3723ZM113.701 10.1607L113.701 14.2022L110.201 12.1814L113.701 10.1607ZM93.7918 44.6443L93.4887 44.4693L111.823 12.7137L112.126 12.8887L112.429 13.0637L94.0949 44.8193L93.7918 44.6443Z" fill="white" />
                <path d="M37.8983 10.1608L37.8983 14.2022L41.3983 12.1815L37.8983 10.1608ZM59.3824 47.3724L59.3824 43.3309L55.8824 45.3516L59.3824 47.3724ZM39.4733 12.8887L39.1702 13.0637L57.5043 44.8194L57.8074 44.6444L58.1106 44.4694L39.7764 12.7137L39.4733 12.8887Z" fill="white" />
                <path d="M92.2168 104.243L92.2168 108.284L95.7168 106.264L92.2168 104.243ZM113.701 141.455L113.701 137.413L110.201 139.434L113.701 141.455ZM93.7918 106.971L93.4887 107.146L111.823 138.902L112.126 138.727L112.429 138.552L94.0949 106.796L93.7918 106.971Z" fill="white" />
                <path d="M2.53259 56.3666L5.39727 59.2174L6.43378 55.3111L2.53259 56.3666ZM44.0637 67.3866L41.199 64.5359L40.1625 68.4421L44.0637 67.3866ZM5.57723 57.1745L5.48747 57.5128L40.9292 66.9171L41.019 66.5788L41.1088 66.2405L5.667 56.8362L5.57723 57.1745Z" fill="white" />
                <path d="M107.536 84.2285L110.4 87.0793L111.437 83.173L107.536 84.2285ZM149.067 95.2486L146.202 92.3978L145.166 96.3041L149.067 95.2486ZM110.58 85.0364L110.491 85.3747L145.932 94.779L146.022 94.4407L146.112 94.1024L110.67 84.6981L110.58 85.0364Z" fill="white" />
                <path d="M2.6073 95.5284L6.51249 96.569L5.46106 92.6667L2.6073 95.5284ZM44.0959 84.3498L40.1908 83.3092L41.2422 87.2115L44.0959 84.3498ZM5.64883 94.7089L5.73989 95.0469L41.1455 85.5072L41.0544 85.1693L40.9634 84.8313L5.55777 94.371L5.64883 94.7089Z" fill="white" />
                <path d="M107.503 67.2654L111.408 68.306L110.357 64.4037L107.503 67.2654ZM148.992 56.0867L145.087 55.0461L146.138 58.9484L148.992 56.0867ZM110.545 66.4459L110.636 66.7838L146.041 57.2442L145.95 56.9062L145.859 56.5683L110.454 66.1079L110.545 66.4459Z" fill="white" />
                <path d="M55.9712 148.971L58.8371 146.121L54.9364 145.064L55.9712 148.971ZM67.2109 107.499L64.345 110.348L68.2457 111.405L67.2109 107.499ZM56.7952 145.93L57.133 146.022L66.7247 110.63L66.3869 110.539L66.0491 110.447L56.4574 145.839L56.7952 145.93Z" fill="white" />
                <path d="M84.3885 44.1165L87.2545 41.2669L83.3537 40.2097L84.3885 44.1165ZM95.6282 2.64429L92.7623 5.49384L96.6631 6.55101L95.6282 2.64429ZM85.2125 41.0761L85.5503 41.1677L95.1421 5.77617L94.8043 5.68462L94.4664 5.59306L84.8747 40.9846L85.2125 41.0761Z" fill="white" />
                <path d="M94.9146 149.16L95.9874 145.264L92.0765 146.283L94.9146 149.16ZM84.0794 107.581L83.0066 111.477L86.9174 110.458L84.0794 107.581ZM94.1202 146.112L94.4589 146.024L85.2124 110.541L84.8737 110.629L84.535 110.717L93.7815 146.2L94.1202 146.112Z" fill="white" />
                <path d="M67.5199 44.0343L68.5927 40.1378L64.6819 41.157L67.5199 44.0343ZM56.6848 2.45461L55.6119 6.35107L59.5228 5.33195L56.6848 2.45461ZM66.7256 40.9861L67.0643 40.8978L57.8178 5.41456L57.4791 5.50282L57.1404 5.59108L66.3869 41.0744L66.7256 40.9861Z" fill="white" />
            </svg>

        ),
    },
    {
        title: "Leadership Drain",
        subHeading: "Focus lost to coordination",
        description:
            "Senior leaders spend time resolving handoffs and conflicts. Strategic work gives way to operational fixes. Energy drains as execution lacks structure.",
        icon: (
            <svg width="147" height="172" viewBox="0 0 147 172" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M134.41 23.5H12.5898L73.5 0.53418L134.41 23.5Z" stroke="white" />
                <path d="M135.601 45.25H11.3994L73.5 0.615234L135.601 45.25Z" stroke="white" />
                <path d="M136.036 70.75H10.9639L73.5 0.75L136.036 70.75Z" stroke="white" />
                <path d="M136.251 101.5H10.749L73.5 0.943359L136.251 101.5Z" stroke="white" />
                <path d="M136.348 128.5H10.6523L73.5 1.12988L136.348 128.5Z" stroke="white" />
                <path d="M73.5 2V128" stroke="white" />
            </svg>


        ),
    },
];

export default function ExecutionProblemSection() {
    return (
        <section className="my-24 border-b border-color">
            <motion.div
                className="border-b border-color lg:px-15"
                variants={container}
                style={{ willChange: "transform" }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="hidden md:flex mx-auto max-w-7xl sm:px-6 flex-col md:flex-row md:justify-between gap-12 pb-12 px-20">
                    <motion.p
                        variants={fadeUp}
                        style={{ willChange: "transform" }}
                        className="max-w-md text-b3 leading-relaxed"
                    >
                        Execution breaks when responsibility spreads across teams, vendors, and functions. Work continues, effort stays high, yet outcomes drift. Decisions slow, risks surface late, and delivery feels unstable. The failure sits in structure and ownership, not effort or intent.
                    </motion.p>

                    <motion.h3
                        variants={fadeUp}
                        style={{ willChange: "transform" }}
                        className="max-w-lg text-right"
                    >
                        <span className="text-white">The Execution Problem </span>
                        <span className="text-gray-400">
                            Modern Organisations Face
                        </span>
                    </motion.h3>
                </div>
                {/* for small screen  */}
                <div className="md:hidden flex mx-auto max-w-7xl flex-col md:justify-between gap-12 pb-12 px-10">
                    <motion.h3
                        variants={fadeUp}
                        style={{ willChange: "transform" }}
                    >
                        <span className="text-white">The Execution Problem </span>
                        <span className="text-gray-400">
                            Modern Organisations Face
                        </span>
                    </motion.h3>

                    <motion.p
                        variants={fadeUp}
                        style={{ willChange: "transform" }}
                        className="max-w-md text-b3 leading-relaxed"
                    >
                        Execution breaks when responsibility spreads across teams, vendors, and functions. Work continues, effort stays high, yet outcomes drift. Decisions slow, risks surface late, and delivery feels unstable. The failure sits in structure and ownership, not effort or intent.
                    </motion.p>
                </div>
            </motion.div>


            <motion.div
                className="border-b border-color"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.div
                    variants={fadeIn}
                    style={{ willChange: "transform" }}
                    className="mx-auto max-w-7xl px-10 flex items-center py-8">
                    <PlusHeading text="Execution Policy" size="b1" plusSize="lg" />
                </motion.div>
            </motion.div>


            <motion.div
                className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 "
                variants={container}
                style={{ willChange: "transform" }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
            >

                {items.map((item, index) => (
                    <motion.div
                        key={item.title}
                        variants={fadeUp}
                        style={{ willChange: "transform" }}
                        className={`py-24 min-h-105 flex flex-col border-color ${index !== 0 ? "md:border-l border-t md:border-t-0" : ""} px-10`}
                    >
                        <motion.div
                            variants={fadeIn}
                            style={{ willChange: "transform" }}
                            className="pb-10 border-b border-color h-[200px]"
                        >
                            {item.icon}
                        </motion.div>

                        <h4 className="mb-2 mt-6">{item.title}</h4>

                        <div className="w-10 h-px mb-4" />

                        <p className="text-b1 mb-4 text-gray-100 font-thin">
                            {item.subHeading}
                        </p>

                        <p className="text-b3 leading-relaxed">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
