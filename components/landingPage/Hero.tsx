"use client";
import PlusHeading from "../headings/PlusHeading";
import OutlineBtn from "../btns/OutlineBtn";
import { cubicBezier, motion, type Variants } from "motion/react";
import Globe3D from "./Globe3D";

const EASE = cubicBezier(0.33, 1, 0.68, 1);

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.8,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: EASE,
    },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.6,
      ease: EASE,
    },
  },
};

const scaleX: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 2.6,
      ease: EASE,
    },
  },
};

const globeAnim = {
  hidden: { y: -40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 2.4,
      ease: EASE,
    },
  },
};


export default function Hero() {
  return (
    <section className="relative md:h-screen overflow-hidden bg-bg">
      <div className="desktop hidden md:block">
        <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-linear-to-t from-black via-black/80 to-transparent z-2 pointer-events-none" />

        <motion.div
          variants={globeAnim}
          initial="hidden"
          animate="visible"
          className="absolute inset-x-0 top-[18vh] flex items-center justify-center z-2"
        >
          <div className="w-[70vw] max-w-[900px] aspect-square">
            <Globe3D />
          </div>
        </motion.div>


        {/* Bottom mask */}
        <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-linear-to-t from-black via-black/80 to-transparent z-2 pointer-events-none" />

        {/* Top info row */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="absolute inset-x-0 top-[10vh] z-5 pointer-events-none"
        >
          <div className="hidden md:flex mx-auto max-w-7xl px-6 gap-10 justify-between">

            <motion.div variants={fadeUp} className="flex max-w-md gap-10">
              <p className="text-[14px] shrink-0 tracking-widest uppercase">
                Clear Ownership
              </p>
              <p className="text-b3 text-gray-300 leading-snug">
                Defined responsibilities across teams ensure accountability at every
                stage, reducing confusion and accelerating decision-making.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex max-w-md gap-10">
              <p className="text-[14px] shrink-0 tracking-widest uppercase">
                Unified Control
              </p>
              <p className="text-b3 text-gray-300 leading-snug">
                Integrated oversight across strategy, technology, and operations
                provides a single source of truth and stronger organizational alignment.
              </p>
            </motion.div>

          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="hidden md:block absolute inset-x-0 top-[30vh] z-5 pointer-events-none"
        >
          <div className="mx-auto max-w-7xl px-6 flex flex-col">

            <motion.div variants={fadeUp} className="flex flex-col max-w-xs gap-2">
              <p className="text-[14px] shrink-0 tracking-widest uppercase">
                Calm Execution
              </p>
              <div className="border-l border-color h-10" />
              <p className="text-[12px] pr-32 text-gray-300 leading-snug">
                Structured processes and leadership ensure steady, predictable delivery.
              </p>
            </motion.div>

          </div>
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="absolute inset-x-0 md:bottom-[22vh] z-5 pointer-events-none  "
        >
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between gap-5">

            <motion.h2 variants={fadeUp} className="text-gray-300 text-[36px] xl:text-[48px]">
              A Unified <br />
              <span className="text-white">Operating Group</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="flex flex-col justify-end gap-4 max-w-md z-5">
              <p className="text-b3 leading-tight">
                Complex organisations slow down when execution scatters across teams
                and vendors. Control weakens as decisions lose a clear owner and
                accountability spreads thin. Ascella Group brings structure to
                execution by aligning responsibility, governance, and delivery under
                one operating layer.
              </p>

              <div className="hidden md:flex justify-end">
                <OutlineBtn text="Engage With Us" />
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="absolute inset-x-0 bottom-20 z-5"
        >
          <motion.div
            variants={scaleX}
            className="w-full border-t border-color origin-left"
          />

          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-7xl px-4 sm:px-6 pt-4 flex items-center justify-center lg:justify-between md:justify-around"
          >
            <motion.div variants={fadeUp} className="hidden xl:block">
              <PlusHeading text="Security and risk managed with clear ownership" size="b2" />
            </motion.div>

            <motion.div variants={fadeUp} className="hidden md:block">
              <PlusHeading text="Technology and platforms delivered with control" size="b2" />
            </motion.div>

            <motion.div variants={fadeUp}>
              <PlusHeading text="Operations and growth aligned under one structure" size="b2" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>


      <div className="mobile py-10 md:hidden flex flex-col justify-between h-[100vh]">

        <motion.div variants={container} initial="hidden" animate="visible">
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-5">

            <motion.h2 variants={fadeUp} className="text-gray-300 text-[36px]">
              A Unified <br />
              <span className="text-white">Operating Group</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-b3 leading-tight">
              Complex organisations slow down when execution scatters across teams and vendors. Control weakens as decisions lose a clear owner and accountability spreads thin. Ascella Group brings structure to execution by aligning responsibility, governance, and delivery under one operating layer.
            </motion.p>

          </div>
        </motion.div>

        <motion.div
          variants={globeAnim}
          initial="hidden"
          animate="visible"
          className="flex justify-center z-0"
        >
          <div className="w-[85vw] max-w-[600px] aspect-square">
            <Globe3D />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex w-full justify-center">
          <OutlineBtn text="Engage With Us" />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="border-t border-color p-5 my-6 flex justify-center">
          <PlusHeading text="Operations and growth aligned under one structure" size="b2" />
        </motion.div>
      </div>

    </section>
  );
}
