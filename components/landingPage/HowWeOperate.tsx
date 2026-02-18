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
        </svg>
        ,
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
        </svg>
        ,
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
]

export default function HowWeOperate() {
    return (
        <section className="mx-auto max-w-7xl flex flex-center leading-tight gap-25  py-20">
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="flex flex-center">
                <Image src="/HowWeOperate.png" alt="How We Operate" width={550} height={350} />
            </motion.div>

            <div className="flex flex-col justify-between">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex flex-col gap-4"
                >
                    <PlusHeading text="How We Operate" />
                    <p className="font-light text-4xl text-white">
                        Control is designed in,<br />
                        not enforced later
                    </p>
                    <p className="text-gray-100 font-light max-w-lg">
                        Ascella establishes governance, accountability, and measurement before execution begins—ensuring delivery remains controlled, predictable, and aligned as organisations scale.
                    </p>
                </motion.div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    {points.map((point, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
                            className="flex flex-col gap-2.5 bg-gray-500 p-6 rounded-2xl"
                        >
                            <div className="flex justify-between w-full">
                                <div aria-hidden="true">{point.svg}</div>
                                <span className="text-xl font-thin">{point.count}</span>
                            </div>
                            <h4 className="leading-tight font-light text-2xl">{point.heading}</h4>
                            <p className="text-gray-300 max-w-xs">{point.description}</p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
