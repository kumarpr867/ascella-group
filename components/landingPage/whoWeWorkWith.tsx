'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, animate, useInView } from "motion/react"
import { useRef } from "react"
import PlusHeading from "@/components/headings/PlusHeading";
import OutlineBtn from '../btns/OutlineBtn';

const cards = [
    {
        title: "Startups",
        heading: "Early teams need speed without long term damage.",
        description:
            "Lightweight structure prevents chaos as headcount and complexity grow. Execution stays focused while foundations remain strong.",
        svg: <svg width="43" height="28" viewBox="0 0 43 28" fill="none">
            <rect x="15" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="8" width="7" height="7" fill="#3D3D3D" />
            <rect x="22" width="7" height="7" fill="#3D3D3D" />
            <rect x="22" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="29" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="29" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="36" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="8" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="36" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="15" y="7" width="7" height="7" fill="#3D3D3D" />
        </svg>
    },
    {
        title: "Venture-backed scale-ups",
        heading: "Growth exposes gaps in ownership and execution discipline.",
        description:
            "Structured decision paths protect speed while reducing breakage. Founders gain clarity as scale becomes manageable.",
        svg: <svg width="28" height="28" viewBox="0 0 35 35" fill="none">
            <rect x="7" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="21" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="21" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="28" y="13" width="7" height="7" fill="#3D3D3D" />
            <rect y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="28" width="7" height="7" fill="#3D3D3D" />
            <rect x="7" y="7" width="7" height="7" fill="#3D3D3D" />
        </svg>
    },
    {
        title: "Regulated organisations",
        heading: "Built for environments where risk tolerance stays low.",
        description:
            "Controls, ownership, and review cycles align with regulatory expectations. Operations remain steady under audits, incidents, and external scrutiny.",
        svg: <svg width="43" height="28" viewBox="0 0 43 28" fill="none">
            <rect x="15" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="8" width="7" height="7" fill="#3D3D3D" />
            <rect x="22" width="7" height="7" fill="#3D3D3D" />
            <rect x="22" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="29" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="29" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="36" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="8" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="36" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="15" y="7" width="7" height="7" fill="#3D3D3D" />
        </svg>
    },
    {
        title: "Enterprises",
        heading: "Large organisations face fragmentation across teams and vendors.",
        description:
            "Central operating control restores alignment and accountability. Delivery becomes predictable instead of reactive.",
        svg: <svg width="42" height="28" viewBox="0 0 42 28" fill="none">
            <rect x="7" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="21" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="35" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="28" y="6" width="7" height="7" fill="#3D3D3D" />
            <rect y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="7" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="7" width="7" height="7" fill="#3D3D3D" />
        </svg>
    }
]

const AUTO_DURATION = 5;

export default function WhoWeWorkWith() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    useEffect(() => {
        let controls: any

        const startTimer = () => {
            setProgress(0)
            controls = animate(0, 100, {
                duration: AUTO_DURATION,
                ease: "linear",
                onUpdate: (latest) => setProgress(latest),
                onComplete: () => {
                    setActiveIndex((prev) => (prev + 1) % cards.length)
                }
            })
        }

        startTimer()
        return () => controls?.stop()
    }, [activeIndex])

    const card = cards[activeIndex]

    return (
        <motion.section
            ref={sectionRef}
            className='my-8 sm:my-12 lg:my-16 overflow-hidden'
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: "easeOut" }}
        >
            {/* Top border — all devices */}
        <div className="w-full h-[1px] bg-white/20" />

        <div className="flex flex-col h-auto lg:h-screen">

                {/* ── Header ── */}
                <motion.div
                    className="flex flex-col items-center text-center px-4 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 lg:pb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <PlusHeading text='Who We Work With' size='b1' />
                    <h3 className='w-full sm:w-3/4 lg:w-1/2 mb-5 mt-4 text-xl sm:text-2xl lg:text-3xl leading-snug'>
                        Organisations that require control, accountability, and structured execution at scale
                    </h3>
                    <OutlineBtn text='Engage With Us' color='white' />
                </motion.div>

                {/* ── Card Area ── */}
                <div className="flex-1 flex items-start sm:items-center justify-center px-4 sm:px-6 lg:px-8 pb-4 sm:pb-0">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 w-full"
                        >

                            {/* Title + Icon */}
                            <motion.div
                                className='flex gap-3 sm:gap-4 items-center'
                                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                exit={{ opacity: 0, filter: "blur(20px)", y: -20 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="scale-90 sm:scale-100">{card.svg}</div>
                                <h4 className="text-base sm:text-lg lg:text-xl">{card.title}</h4>
                            </motion.div>

                            {/* ── Progress Bar ── */}
                            <div className="relative w-full flex justify-center my-3 sm:my-8 lg:my-12">
                                <div className="relative w-[280px] sm:w-full sm:max-w-xl lg:max-w-[1142px] h-[1px] bg-white/20">

                                    {/* Active progress line */}
                                    <div
                                        className="absolute left-0 top-0 h-full bg-white"
                                        style={{ width: `${progress}%` }}
                                    />

                                    {/* Diamond indicator */}
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                                        style={{ left: `${progress}%` }}
                                    >
                                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-[3px] sm:border-[4px] border-white rotate-45 bg-black" />
                                    </div>

                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col w-full max-w-xs sm:max-w-sm lg:max-w-md text-center px-2 sm:px-0">

                                <motion.h5
                                    initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                    exit={{ opacity: 0, filter: "blur(15px)", y: -15 }}
                                    transition={{ delay: 0.15, duration: 0.6 }}
                                    className="leading-snug mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl"
                                >
                                    {card.heading}
                                </motion.h5>

                                <motion.p
                                    initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                    exit={{ opacity: 0, filter: "blur(15px)", y: -15 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="text-sm sm:text-base leading-relaxed text-white/70"
                                >
                                    {card.description}
                                </motion.p>

                            </div>


                        </motion.div>
                    </AnimatePresence>

                </div>
            </div>

        {/* Bottom border — all devices */}
        <div className="w-full h-[1px] bg-white/20" />

        </motion.section>
    )
}