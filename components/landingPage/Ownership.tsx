"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import PlusHeading from "../headings/PlusHeading";
import PartialOutlineBtn from "../btns/PartialOutlineBtn";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.5 },
  },
};


// OwnershipSection: renders each section, tracks in-view and scroll transform
function OwnershipSection({
  title,
  description,
  tag,
  image,
  isLast,
  index,
  setActiveIndex,
}: {
  title: string;
  description: string;
  tag?: string;
  image: string;
  isLast: boolean;
  index: number;
  setActiveIndex: (n: number) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.2 });

  useEffect(() => {
    if (isInView) setActiveIndex(index);
  }, [isInView, index, setActiveIndex]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 40%"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative py-32 px-16 flex flex-col items-start"
    >
      <motion.div
        style={{ y: imageY }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full flex justify-center mb-24 will-change-transform"
      >
        <Image src={image} alt={title} width={550} height={550} className="opacity-90 object-contain" />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full max-w-xl">
        <h3 className="text-4xl font-light mb-8 tracking-tight">{title}</h3>
        <p className="text-white/50 text-base leading-relaxed mb-8">{description}</p>
        {tag && <div className="text-sm tracking-widest text-white/80">{tag}</div>}
      </motion.div>

      {!isLast && <div className="absolute bottom-0 left-6 right-6 h-px bg-white/10" />}
    </motion.div>
  );
}

export default function Ownership() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = [
    {
      title: "Security & Risk Posture",
      description: "Security and risk posture focuses on keeping organisational risk visible and controlled...",
      tag: "#Resilience",
      image: "/Security.png"
    },
    {
      title: "Technology Execution",
      description: "Technology execution ensures systems work reliably as change increases...",
      tag: "#Scalability",
      image: "/Technology.png"
    },
    {
      title: "Workforce Readiness",
      description: "Workforce readiness prepares teams for real operating conditions. Roles and escalation paths stay clear before pressure hits. Training reflects actual scenarios instead of theory. Teams respond faster and make better decisions during incidents.",
      tag: "#Alignment",
      image: "/Workforce.png"
    },
    {
      title: "Operational Control",
      description: "Operational control brings structure to daily execution. Decisions follow defined paths instead of informal coordination. Signals focus on risk, progress, and dependencies. Work becomes predictable and less reactive over time.",
      image: "/Operational.png"
    },
    {
      title: "Revenue Enablement",
      description: "Revenue enablement connects execution quality to business results. Technical priorities reflect revenue impact and customer trust. Launches follow readiness checks and clear success measures. Growth stays protected as execution becomes disciplined.",
      tag: "#Sustainability",
      image: "/Revenue.png"
    }
  ];

  const scrollToSection = (index: number) => {
    const sectionElements = document.querySelectorAll('main > div');
    sectionElements[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative">
      <div className="relative h-px w-full mt-30 border-t border-color">
        <div className="mx-8 h-full" />
      </div>
      <div className="mx-auto w-full relative">
        <div className="grid grid-cols-[10%_25%_55%_10%] relative">
          <div className="absolute inset-0 flex pointer-events-none z-0">
            <div className="h-full w-[10%] border-r border-color" />
            <div className="h-full w-[25%] border-r border-color" />
            <div className="h-full w-[55%] border-r border-color" />
          </div>

          <div className="z-10 h-full" />

          <aside className="relative z-10 p-12">
            <div className="sticky top-24">
              <PlusHeading text="OWNERSHIP" />
              <ul className="mt-20 space-y-6">
                {sections.map((item, idx) => (
                  <li 
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                      activeIndex === idx ? 'text-white font-medium' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>

              <div className="mt-32">
                <PartialOutlineBtn text="Explore More" />
              </div>
            </div>
          </aside>


          <main className="relative z-10">
            {sections.map((item, index) => (
              <OwnershipSection
                key={item.title}
                title={item.title}
                description={item.description}
                tag={item.tag}
                image={item.image}
                isLast={index === sections.length - 1}
                index={index}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </main>



          <div className="z-10 h-full" />
        </div>
      </div>


      <div className="relative h-px w-full">
        <div className="mx-8 h-full bg-white/10" />
      </div>
    </section>
  );
}

