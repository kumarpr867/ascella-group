'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, animate, useInView } from "motion/react"
import { useRef } from "react"
import OutlineBtn from '../btns/OutlineBtn';
import Heading from '@/components/headings/Heading';
import { useRouter } from "next/navigation";

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

    const router = useRouter();
    const [paused, setPaused] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    const controlsRef = useRef<any>(null)

    useEffect(() => {
        if (paused) {
            controlsRef.current?.stop()
            return
        }

        const remaining = AUTO_DURATION * (1 - progress / 100)

        controlsRef.current = animate(progress, 100, {
            duration: remaining,
            ease: [0, 0, 1, 1],
            onUpdate: (latest) => setProgress(latest),
            onComplete: () => {
                setProgress(0)
                setActiveIndex((prev) => (prev + 1) % cards.length)
            }
        })

        return () => controlsRef.current?.stop()

    }, [paused, activeIndex])

    const card = cards[activeIndex]

    return (
        <motion.section
            ref={sectionRef}
            className='relative my-10 border-y border-color py-20 overflow-hidden'
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as any }}
        >
            <div className="absolute top-40 left-1/2 -translate-x-1/2 w-2/3 h-full">
                <svg width="1050" height="613" viewBox="0 0 1050 613" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 655.608 0)" stroke="url(#paint0_linear_152_2570)" stroke-opacity="0.06" stroke-dasharray="2 2" />
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 721.389 36)" stroke="url(#paint1_linear_152_2570)" stroke-opacity="0.06" stroke-dasharray="2 2" />
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 787.169 72)" stroke="url(#paint2_linear_152_2570)" stroke-opacity="0.12" stroke-dasharray="2 2" />
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 852.95 108)" stroke="url(#paint3_linear_152_2570)" stroke-opacity="0.12" stroke-dasharray="2 2" />
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 918.73 144)" stroke="url(#paint4_linear_152_2570)" stroke-opacity="0.12" stroke-dasharray="2 2" />
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 984.51 180)" stroke="url(#paint5_linear_152_2570)" stroke-opacity="0.06" stroke-dasharray="2 2" />
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 1048.8 228)" stroke="url(#paint6_linear_152_2570)" stroke-opacity="0.06" stroke-dasharray="2 2" />
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 393.982 0)" stroke="url(#paint7_linear_152_2570)" stroke-opacity="0.02" stroke-dasharray="2 2" />
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 328.201 36)" stroke="url(#paint8_linear_152_2570)" stroke-opacity="0.04" stroke-dasharray="2 2" />
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 262.421 72)" stroke="url(#paint9_linear_152_2570)" stroke-opacity="0.12" stroke-dasharray="2 2" />
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 196.641 108)" stroke="url(#paint10_linear_152_2570)" stroke-opacity="0.12" stroke-dasharray="2 2" />
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 130.861 144)" stroke="url(#paint11_linear_152_2570)" stroke-opacity="0.12" stroke-dasharray="2 2" />
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 65.0801 180)" stroke="url(#paint12_linear_152_2570)" stroke-opacity="0.04" stroke-dasharray="2 2" />
                    <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 0.794922 228)" stroke="url(#paint13_linear_152_2570)" stroke-opacity="0.02" stroke-dasharray="2 2" />
                    <path d="M587.803 263.498L572.545 272.367L572.541 272.369L525.291 300.421L478.045 273.342L461.785 263.514C472.522 257.433 488.1 248.498 501.11 240.92C507.767 237.043 513.754 233.519 518.077 230.914C520.238 229.612 521.987 228.538 523.197 227.763C523.801 227.376 524.277 227.06 524.604 226.826C524.705 226.754 524.794 226.685 524.872 226.624L587.803 263.498Z" stroke="white" stroke-opacity="0.12" />
                    <path d="M841.803 263.498L826.545 272.367L826.541 272.369L779.291 300.421L732.045 273.342L715.785 263.514C726.522 257.433 742.1 248.498 755.11 240.92C761.767 237.043 767.754 233.519 772.077 230.914C774.238 229.612 775.987 228.538 777.197 227.763C777.801 227.376 778.277 227.06 778.604 226.826C778.705 226.754 778.794 226.685 778.872 226.624L841.803 263.498Z" stroke="url(#paint14_linear_152_2570)" stroke-opacity="0.12" />
                    <defs>
                        <linearGradient id="paint0_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint3_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint4_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint5_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint6_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint7_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint8_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint9_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint10_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint11_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint12_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint13_linear_152_2570" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="0.5" stop-color="white" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="paint14_linear_152_2570" x1="714.796" y1="262.5" x2="835.796" y2="266.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" />
                            <stop offset="1" stop-color="white" stop-opacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

            </div>
            <div className="flex flex-col h-auto lg:h-screen">

                {/* ── Header ── */}
                <motion.div
                    className="flex flex-col items-center text-center px-4 pt-12 sm:pt-16 lg:pt-20 pb-32 lg:pb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <Heading text='Who We Work With' />
                    <h3 className='w-full sm:w-3/4 lg:w-1/2 my-5 text-[16px] lg:text-[24px] leading-snug'>
                        Organisations that require control, accountability, and structured execution at scale
                    </h3>
                    <OutlineBtn text='Engage With Us' color='white'
                        onClick={() => {
                            router.push("/engageWithUs");
                        }} />
                </motion.div>
                {/* ── Card Area ── */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.12
                            }
                        }
                    }}
                    className="flex-1 flex items-start sm:items-center justify-center px-4 sm:px-6 lg:px-8 pb-4 ">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            onMouseDown={(e) => {
                                if (e.button === 0) setPaused(true)
                            }}
                            onMouseUp={() => setPaused(false)}
                            onMouseLeave={() => setPaused(false)}
                            onTouchStart={() => setPaused(true)}
                            onTouchEnd={() => setPaused(false)}
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col items-center gap-4 w-full"
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
                                <h4 className="text-[20px] lg:text-[24px] capitalize">{card.title}</h4>
                            </motion.div>

                            {/* ── Progress Bar ── */}
                            <div className="relative w-full flex justify-center my-6 ">
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
                            <motion.div
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: { staggerChildren: 0.14 }
                                    }
                                }}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="flex flex-col w-full max-w-xs sm:max-w-sm lg:max-w-md text-center px-2 sm:px-0"
                            >

                                <motion.h5
                                    variants={{
                                        hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
                                        visible: { opacity: 1, y: 0, filter: "blur(0px)" }
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className="leading-snug mb-3 sm:mb-4 text-[20px] uppercase"
                                >
                                    {card.heading}
                                </motion.h5>

                                <motion.p
                                    variants={{
                                        hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
                                        visible: { opacity: 1, y: 0, filter: "blur(0px)" }
                                    }}
                                    transition={{ duration: 0.6 }}
                                    className="text-[12px]"
                                >
                                    {card.description}
                                </motion.p>

                            </motion.div>


                        </motion.div>
                    </AnimatePresence>

                </motion.div>
            </div>

        </motion.section >
    )
}