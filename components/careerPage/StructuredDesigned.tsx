"use client";
import { useRouter } from "next/navigation";
import PartialOutlineBtn from "../btns/PartialOutlineBtn";
import { motion } from "motion/react";

export default function EngagementBegins() {
  const revealUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center mx-auto max-w-7xl px-10 xl:px-0 my-15 overflow-hidden">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp}>
        <HeaderSection />
      </motion.div>
      
      <ArchitectureDiagram />
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="z-10">
        <ExploreNowBtn />
      </motion.div>
    </section>
  );
}

function HeaderSection() {
  return (
    <div className="flex flex-col items-center text-center gap-6 mb-8 md:mb-20">
      <h3 className="text-[16px] sm:text-[24px] md:text-[36px] ">
        WORKING AT ASCELLA IS STRUCTURED BY DESIGN.
      </h3>
      <p className="text-[12px] sm:text-[16px] md:max-w-xl mx-auto">
        All applications, candidate correspondence, and role coordination are handled through a single governance-led process to ensure consistency, discretion, and accountability.
      </p>
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="relative w-full h-[500px] lg:h-[500px] mx-auto overflow-hidden">
      <div className="absolute inset-0">
        <VerticalLine />
        <HorizontalText />
        <DiagonalLines />
      </div>
    </div>
  );
}

function VerticalLine() {
  return (
    <motion.div 
      initial={{ scaleY: 0, originY: 1, opacity: 0 }} // originY: 1 ensures it starts from the bottom
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }}
      className="absolute left-1/2 top-0 h-full w-px bg-gray-400 -translate-x-1/2" 
    />
  );
}

function HorizontalText() {
  const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } }
  };

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}
          className="absolute uppercase lg:text-[16px] xl:text-[24px] text-gray-200 left-0 top-1/2 w-full border-b border-color -translate-y-12 xl:-translate-y-20"
        >
          Single point of contact
        </motion.div>

        <div className="absolute lg:text-[16px] xl:text-[24px] left-0 top-1/2 w-full -translate-y-6 xl:-translate-y-10 border-b border-color flex justify-between items-baseline">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft} className="uppercase">
            for career-related
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight} className="lg:text-[16px] xl:text-[24px]">
            Email: careers@ascella.group
          </motion.div>
        </div>

        <div className="absolute uppercase lg:text-[16px] xl:text-[24px] left-0 top-1/2 w-full text-gray-200 border-b border-color flex justify-between" >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft} className="text-white">
            communication
          </motion.div>
          
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden block">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="flex flex-col text-center items-center absolute uppercase lg:text-[16px] xl:text-[24px] left-0 top-0 w-full"
        >
          <motion.div variants={slideLeft} className="text-gray-200">Single point of contact</motion.div>
          <motion.div variants={slideRight}>for career-related <br />communication</motion.div>
        </motion.div>

        <div className="absolutetext-[14px] sm:text-[16px] text-gray-200 left-0 top-1/2 w-full h-10 border-b border-color -translate-y-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight} className="flex items-end w-full justify-center h-full uppercase ">
            Email: careers@ascella.group
          </motion.div>
        </div>
        <div className="absolute uppercase text-[14px] sm:text-[16px] left-0 top-1/2 w-full -translate-y-6 border-b border-color flex ">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft} className="w-full text-center">
             All career coordination is managed centrally.
          </motion.div>
        </div>
      </div>
    </>
  );
}

function DiagonalLines() {
  return (
    <div className="absolute left-1/2 top-1/2 w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="absolute inset-0"
      >
        <div className="absolute left-0 top-1/2 w-full h-px bg-gray-400 rotate-45 origin-center" />
        <div className="absolute left-0 top-1/2 w-full h-px bg-gray-400 -rotate-45 origin-center" />
      </motion.div>
    </div>
  );
}

function ExploreNowBtn() {
  const router = useRouter();
  return (
    <div className="max-w-md flex flex-center flex-col gap-4 mt-12">
      <p className="text-[12px] text-gray-200 text-center">
        Career enquiries are routed through a structured review framework to maintain clarity, control, and defined ownership across every interaction.
      </p>
      <div className="flex justify-center">
        <PartialOutlineBtn 
          text="Explore Opportunities"
          onClick={() => {
            router.push(`/JD-Page`);
          }} 
        />
      </div>
      <div className="absolute bottom-[-50px] w-screen h-[1px] bg-zinc-800/50 left-1/2 -translate-x-1/2"></div>
    </div>
  );
}