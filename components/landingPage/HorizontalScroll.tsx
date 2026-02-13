'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from "motion/react"
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
    title: "Venture-backed scale-ups-ups",
    heading: "Growth exposes gaps in ownership and execution discipline.",
    description:
      "Structured decision paths protect speed while reducing breakage. Founders gain clarity as scale becomes manageable.",
    svg: <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
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

export default function HorizontalScroll() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(cards.length - 1) * 30}%`]
  )

  return (
    <section className='my-20'>
      <div
        ref={targetRef}
        className="relative"
        style={{ height: `${cards.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
          <div className="flex flex-col items-center text-center pt-20 pb-10">
            <PlusHeading text='Who We Work With' size='b1' />
            <h3 className='w-1/2 mb-6 mt-4'>
              Organisations that require control, accountability, and structured execution at scale
            </h3>
            <OutlineBtn text='Engage With Us' color='white' />
          </div>


          <div className="flex-1 flex items-center">
            <motion.div style={{ x }} className="flex will-change-transform">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="group relative shrink-0 w-screen h-fit items-center gap-10 p-8 flex flex-col"
                >
                  <div className='flex gap-4'>
                    {card.svg}
                    <h4>{card.title}</h4>
                  </div>
                  {/* Loader Line (per card) */}
                  <div className="relative w-full flex justify-center my-12">
                    <div className="w-full max-w-[1142px] h-1 bg-gray-500 relative overflow-hidden">
                      <CardProgress
                        scrollYProgress={scrollYProgress}
                        index={index}
                        total={cards.length}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col w-sm">
                      <h5 className="leading-snug mb-4">
                        {card.heading}
                      </h5>
                      <p className="text-b3 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  )
}

function CardProgress({ scrollYProgress, index, total }: any) {
  const segment = 1 / total;

  const progress = useTransform(scrollYProgress, (value: number) => {
    const start = segment * index;
    const end = start + segment;
    const raw = (value - start) / segment;
    return Math.min(Math.max(raw, 0), 1);
  });

  return (
    <motion.div
      style={{ scaleX: progress }}
      className="absolute left-0 top-0 h-full w-full bg-white origin-left"
    />
  );
}






