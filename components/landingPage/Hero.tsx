"use client";
import PlusHeading from "../headings/PlusHeading";
import OutlineBtn from "../btns/OutlineBtn";
import { motion, type Variants } from "motion/react";
import Globe3D from "./Globe3D";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
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

const stagger: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};


export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-bg">

      {/* Globe */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center z-1 overflow-hidden"
      >
        <div className="w-screen max-w-none h-screen flex items-center justify-center">
          <div className="w-full h-full">
            <Globe3D />
          </div>
        </div>
      </motion.div>


      
      <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-linear-to-t from-black via-black/80 to-transparent z-2 pointer-events-none" />

      {/* Top info row */}
      <motion.div
        className="absolute inset-x-0 top-[10vh] z-5"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex justify-between">
          <motion.div variants={fadeUp} className="space-y-1 text-md">
            <PlusHeading text="Clear Ownership" />
            <PlusHeading text="Calm Execution" />
          </motion.div>

          <motion.div variants={fadeUp} className="text-b2">
            <PlusHeading text="Unified Control" />
          </motion.div>
        </div>
      </motion.div>


      <motion.div
        className="absolute inset-x-0 bottom-[22vh] z-5"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex justify-between gap-12">

          <motion.h2 variants={fadeUp} className="text-gray-300">
            A Unified <br />
            <span className="text-white">Operating Group</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-end gap-4 max-w-md text-gray-200 text-right"
          >
            <p className="text-b2 leading-tight">
              Complex organisations slow down when execution scatters across teams and vendors...
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-end"
            >
              <OutlineBtn text="Engage With Us" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>


      <motion.div
        className="absolute inset-x-0 bottom-20 z-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full border-t border-color origin-left"
        />

        <motion.div
          className="text-b3 px-6 md:px-24 pt-4 flex justify-between"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <PlusHeading text="Security and risk managed with clear ownership" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <PlusHeading text="Technology and platforms delivered with control" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <PlusHeading text="Operations and growth aligned under one structure" />
          </motion.div>
        </motion.div>
      </motion.div>

    </section>
  );
}
