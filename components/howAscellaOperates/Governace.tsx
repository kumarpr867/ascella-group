"use client"
import { useEffect, useRef, useState } from "react";
import OutlineBtn from "../btns/OutlineBtn";
import Heading from "../headings/Heading";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "@/utils/Reveal";
import { slideInFromBottom, slideInFromLeft, slideInFromRight } from "@/utils/motion";

const points = [
    {
        svg: (
            <svg width="42" height="28" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </svg>
        ),
        count: "01",
        heading: "Decision and approval design",
        description: "Clear decision ownership, approval layers, and authority limits are established early so execution moves without confusion, delays, or overlapping mandates.",
    },
    {
        svg: (
            <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="14" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="14" width="7" height="7" className="fill-gray-400" />
                <rect y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="14" y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="14" y="21" width="7" height="7" className="fill-gray-400" />
                <rect x="27" y="7" width="7" height="7" className="fill-gray-400" />
            </svg>
        ),
        count: "02",
        heading: "Escalation and risk control",
        description: "Defined escalation routes and review checkpoints ensure risks surface quickly and reach accountable decision holders before impact spreads.",
    },
    {
        svg: (
            <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="21" width="7" height="7" className="fill-gray-400" />
                <rect x="28" y="14" width="7" height="7" className="fill-gray-400" />
                <rect y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="7" y="21" width="7" height="7" className="fill-gray-400" />
                <rect x="7" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="14" width="7" height="7" className="fill-gray-400" />
            </svg>
        ),
        count: "03",
        heading: "Performance and outcome tracking",
        description: "KPIs, SLAs, and outcome thresholds are agreed at the outset to maintain visibility into progress, quality, and operational stability.",
    },
    {
        svg: (
            <svg width="35" height="21" viewBox="0 0 35 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7" y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="14" y="21" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="28" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="7" y="14" width="7" height="7" className="fill-gray-400" />
                <rect y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="7" width="7" height="7" className="fill-gray-400" />
                <rect x="14" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="21" width="7" height="7" className="fill-gray-400" />
            </svg>
        ),
        count: "04",
        heading: "Compliance and oversight alignment",
        description: "Governance structures are aligned with regulatory, audit, and security requirements from the start so delivery remains controlled under external scrutiny.",
    },
];

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0
    })
};

export default function Governace() {
    const router = useRouter();
    const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const paginate = (dir: number) => {
        setPage(([prev]) => [
            (prev + dir + points.length) % points.length,
            dir
        ]);
    };

    const swipeConfidenceThreshold = 60;

    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const startAutoSlide = () => {
        stopAutoSlide();
        timerRef.current = setInterval(() => {
            paginate(1);
        }, 5000);
    };

    const stopAutoSlide = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        startAutoSlide();
        return stopAutoSlide;
    }, []);
    return (
        <section className="flex flex-col my-24">
            {/* <div className="mx-10 lg:mx-20 xl:mx-24 flex flex-col gap-6 mb-20">
                <Reveal variants={slideInFromBottom(0.1)} className="flex flex-col items-center md:items-start gap-5 max-w-2xl">
                    <Heading text="Governance and Oversight" />
                    <h3 className="text-[14px] md:text-[20px] lg:text-[36px] text-center md:text-left">Governance operates as the control layer that keeps execution aligned, accountable, <span className="text-gray-300">and auditable as organisations grow in size and structural complexity.</span>
                    </h3>
                </Reveal>
                <Reveal variants={slideInFromBottom(0.1)} className="flex flex-col md:flex-row text-center md:text-left justify-between gap-6 md:gap-20 lg:gap-48">
                    <p className="font-extralight text-[12px] md:text-[16px]">Ascella Group defines decision rights, approval hierarchies, escalation paths, and oversight mechanisms before execution begins so every initiative runs within clear authority, measurable checkpoints, and structured accountability rather than informal coordination.
                    </p>
                    <p className="text-[12px] md:text-[16px]">As organisations expand across multiple teams and external partners, governance prevents ownership from diffusing, ensures risks surface early through defined review cycles, and keeps execution stable instead of reactive as operational pressure increases.</p>
                </Reveal>
            </div> */}

            <div className="mx-10 lg:mx-20 xl:mx-24 flex flex-col gap-6 md:mb-20">
                <Reveal variants={slideInFromBottom(0.1)} className="flex flex-col items-center md:items-start gap-5 max-w-5xl">
                    <Heading text="Governance and Oversight" />
                    <h3 className="text-[14px] md:text-[20px] lg:text-[36px] text-center md:text-left">Governance operates as the control layer that keeps execution aligned, accountable, <span className="text-gray-300">and auditable as organisations grow in size and structural complexity.</span>
                    </h3>
                </Reveal>
                <Reveal variants={slideInFromBottom(0.1)} className="flex flex-col text-center md:text-left justify-between gap-2 max-w-6xl">
                    <p className="text-[12px] md:text-[20px]">As organisations expand across multiple teams and external partners, governance prevents ownership from diffusing, ensures risks surface early through defined review cycles, and keeps execution stable instead of reactive as operational pressure increases.</p>
                    <p className="font-extralight text-[12px] md:text-[14px]">Ascella Group defines decision rights, approval hierarchies, escalation paths, and oversight mechanisms before execution begins so every initiative runs within clear authority, measurable checkpoints, and structured accountability rather than informal coordination.
                    </p>
                </Reveal>
            </div>

            <div className="mx-10 lg:mx-20 xl:mx-24 flex md:flex-row flex-col flex-center leading-tight gap-15 lg:gap-40 md:border-y border-color py-15 overflow-x-hidden">
                <Reveal variants={slideInFromLeft(0.1)} className="hidden md:flex flex-col">
                    <Image src="/HowWeOperate.png" alt="How We Operate" width={450} height={250} />
                    <div className="hidden md:flex items-center gap-5">
                        <div className="flex-center relative md:w-16 md:h-16">
                            <Image src={"/OperatingStructure/GovernaceStar.svg"} alt="starimage" fill />
                        </div>
                        <h5 className="text-gray-200" >Discipline is built in, <br /> not introduced later.</h5>
                    </div>
                </Reveal>
                <Reveal variants={slideInFromRight(0.1)} className="flex flex-col justify-between items-center md:items-start">
                    <h3 className="text-[24px] md:text-[36px]">Before execution</h3>
                    <p className="text-gray-200 font-light max-w-lg">
                        Ascella establishes
                    </p>
                    {/* Desktop Grid */}
                    <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mt-4 lg:mt-12">
                        {points.map((point, index) => (
                            <div key={index} className="flex flex-col gap-2.5 bg-gray-500 p-4 lg:p-6 rounded-2xl cursor-default transition-all duration-300 hover:scale-[1.03] group">
                                <div className="flex justify-between w-full">
                                    <div className="mb-4">{point.svg}</div>
                                    <span className="text-xl font-thin mb-2 transition-colors duration-300 group-hover:text-white">{point.count}</span>
                                </div>
                                <h5 className="leading-tight mb-2 transition-colors duration-300 group-hover:text-white">{point.heading}</h5>
                                <p className="text-gray-300 text-b3 max-w-sm lg:max-w-xs leading-tight transition-colors duration-300 group-hover:text-white">{point.description}</p>
                            </div>
                        ))}
                    </div>
                    {/* Mobile Carousel */}
                    <div className="md:hidden mt-10 relative overflow-hidden">
                        <AnimatePresence mode="wait" initial={false} custom={direction}>
                            <motion.div
                                key={page}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 220, damping: 30 },
                                    opacity: { duration: 0.25 },
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.25}
                                onDragStart={stopAutoSlide}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) paginate(1);
                                    else if (swipe > swipeConfidenceThreshold) paginate(-1);

                                    startAutoSlide();
                                }}
                                className="flex flex-col gap-3 bg-gray-500 p-6 rounded-2xl"
                            >
                                <div className="flex justify-between items-center md:items-start">
                                    {points[page].svg}
                                    <span className="text-lg font-thin">{points[page].count}</span>
                                </div>

                                <h5>{points[page].heading}</h5>
                                <p className="text-gray-200 text-[12px]">{points[page].description}</p>
                            </motion.div>
                        </AnimatePresence>

                        {/* dots */}
                        <div className="flex justify-center gap-2 mt-5">
                            {points.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setPage([i, i > page ? 1 : -1]);
                                        startAutoSlide();
                                    }}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === page ? "w-6 bg-white" : "w-2 bg-gray-500"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
            <Reveal variants={slideInFromBottom(0.1)} className="flex flex-col flex-center">
                <div className="w-full h-0.5 border-t border-gray-400 md:w-0.5 md:h-10 md:border-t-0 md:border-l md:border-gray-400">
                </div>
                <p className="md:hidden my-6 text-center text-b2 text-gray-300 px-10" > Discipline is built in, not introduced later</p>
                <OutlineBtn text="Explore With Us"
                    onClick={() => router.push("/execution-arms")} />
            </Reveal>

        </section>
    )
}
