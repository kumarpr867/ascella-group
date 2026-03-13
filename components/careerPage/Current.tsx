"use client";

import React from "react";
import Image from "next/image";
import { LayoutGrid, Target, Settings, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

const CurrentOpenings = () => {
  const gridData = [
    { id: 1, empty: true },
    {
      id: 2,
      title: "Scope of responsibility",
      icon: <Target className="w-6 h-6 text-gray-200" />,
      description:
        "The outcomes the role owns, the decisions it is accountable for, and the execution areas it governs.",
    },
    {
      id: 3,
      title: "Accountability expectations",
      icon: <ShieldCheck className="w-6 h-6 text-gray-200" />,
      description:
        "How responsibility is measured, how delivery is reviewed, and how performance aligns with operating objectives.",
    },
    {
      id: 4,
      title: "Operating context",
      icon: <LayoutGrid className="w-6 h-6 text-gray-200" />,
      description:
        "The execution environment, pod structure, and cross-functional dependencies in which the role operates.",
    },
    { id: 5, empty: true },
    {
      id: 6,
      title: "Reporting and governance structure",
      icon: <Settings className="w-6 h-6 text-gray-200" />,
      description:
        "How the role fits within Ascella's oversight framework, including escalation paths and decision authority.",
    },
  ];

  const cards = gridData.filter((item) => !item.empty);

  // Animation Variants
  const revealLeft = {
    hidden: { opacity: 0, x: -70 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  const revealRight = {
    hidden: { opacity: 0, x: 70 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="overflow-hidden bg-black text-white">
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex h-screen px-10 flex-col justify-center relative -mt-20">
        
        {/* Background Image - Reveal Left */}
        <motion.div 
          className="absolute left-[-100px] top-[20%] w-2/3 h-4/5 opacity-30 pointer-events-none z-0"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 0.3, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
        >
          <Image
            src="/current.png"
            alt="Background Decoration"
            fill
            className="object-contain object-left-top"
            priority
          />
        </motion.div>

        {/* Header - Reveal Left */}
        <motion.div 
          className="relative z-10 mb-5 pl-40 max-w-7xl mx-auto w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealLeft}
        >
          <p className="text-b2 text-[14px] uppercase tracking-[0.3em] text-gray-200 ">
            Roles & Opportunities
          </p>

          <h3 className="text-4xl leading-tight">
            Current openings are{" "}
            <span className="text-gray-200">aligned to</span>
            <br />
            <span className="pl-40">execution and governance needs.</span>
          </h3>
        </motion.div>

        {/* Grid - Reveal Right with Stagger */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-end">
          <motion.div 
            className="grid grid-cols-3 gap-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {gridData.map((item) => (
              <motion.div
                key={item.id}
                variants={revealRight}
                className={`p-6 w-[260px] h-[220px] flex flex-col justify-between transition-all duration-300 ${
                  item.empty
                    ? "bg-transparent"
                    : "bg-black/60 backdrop-blur-md border border-neutral-800"
                }`}
              >
                {!item.empty && (
                  <>
                    <div className="space-y-10">
                      <div className="opacity-80">{item.icon}</div>
                      <h5 className="text-lg font-medium leading-snug">
                        {item.title}
                      </h5>
                    </div>

                    <p className="text-b3 text-[12px] text-gray-200 leading-relaxed">
                      {item.description}
                    </p>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ================= MOBILE / TABLET ================= */}
      <section className="lg:hidden bg-black text-white">
        <div className="border-t border-neutral-800 w-full" />

        <div className="px-10 pt-[10px] pb-20">
          {/* Header Mobile - Reveal Left */}
          <motion.div 
            className="mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealLeft}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gray-200 mb-3">
              Roles & Opportunities
            </p>
            <h3 className="text-3xl font-light leading-tight">
              Current openings are{" "}
              <span className="text-gray-400">aligned to</span>{" "}
              execution and governance needs.
            </h3>
          </motion.div>

          <div className="grid grid-cols-1">
            {/* Row 1 Image - Subtle Reveal */}
            <motion.div 
              className="relative border border-neutral-800 min-h-[260px]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/current.png"
                alt="Decorative Image"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Mobile Cards - Reveal Right Staggered */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {cards.map((item) => (
                <motion.div
                  key={item.id}
                  variants={revealRight}
                  className="p-6 min-h-[200px] flex flex-col justify-between border border-t-0 border-neutral-800"
                >
                  <div className="space-y-6">
                    <div className="opacity-80">{item.icon}</div>
                    <h5 className="text-base font-medium leading-snug">
                      {item.title}
                    </h5>
                  </div>

                  <p className="text-[12px] text-gray-300 leading-relaxed mt-4">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CurrentOpenings;