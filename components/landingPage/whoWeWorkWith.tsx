'use client'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from "motion/react"
import PlusHeading from "@/components/headings/PlusHeading";
import OutlineBtn from '../btns/OutlineBtn';

const cards = [
  {
    title: "Startups",
    heading: "Early teams need speed without long term damage. ",
    description:
      "Lightweight structure prevents chaos as headcount and complexity grow. Execution stays focused while foundations remain strong.",
    svg: <svg width="43" height="28" viewBox="0 0 43 28" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    heading: "Growth exposes gaps in ownership and execution discipline. ",
    description:
      "Structured decision paths protect speed while reducing breakage. Founders gain clarity as scale becomes manageable.",
    svg: <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    heading: "Built for environments where risk tolerance stays low. ",
    description:
      "Controls, ownership, and review cycles align with regulatory expectations. Operations remain steady under audits, incidents, and external scrutiny.",
    svg: <svg width="43" height="28" viewBox="0 0 43 28" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    heading: "Large organisations face fragmentation across teams and vendors. ",
    description:
      "Central operating control restores alignment and accountability. Delivery becomes predictable instead of reactive.",
    svg: <svg width="42" height="28" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default function WhoWeWorkWith() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  useEffect(() => {
    return scrollYProgress.on("change", (v) => console.log(v));
  }, [scrollYProgress]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${cards.length * 30}%`]
  )

  return (
    <section className='my-20' >
      <div className='flex flex-col items-center text-center '>
        <PlusHeading text='Who We Work With' size='b1' />
        <h3 className='w-1/2'>Organisations that require control, accountability, and structured execution at scale</h3>
      </div>
      <div
        ref={targetRef}
        className="relative"
        style={{ height: `${cards.length * 70}vh` }}
      >


        <div className="sticky top-0 flex items-center h-screen overflow-hidden ">
          <motion.div style={{ x }} className="flex will-change-transform">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group relative shrink-0 w-screen shrink-0 h-fit items-center gap-10 p-8 flex flex-col">
                <div className='flex gap-4'>
                  {card.svg}
                  <h4>{card.title}</h4>
                </div>
                <div className="relative w-full flex justify-center my-12">
                  <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-full z-0" width="1142" height="14" viewBox="0 0 1142 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line opacity="0.3" y1="7" x2="1142" y2="7" stroke="url(#paint0_linear_1155_799)" stroke-width="3" />
                    <line x1="9.00006" y1="7" x2="461" y2="7.00004" stroke="url(#paint1_linear_1155_799)" stroke-width="3" />
                    <rect x="459.5" y="7" width="9.89929" height="9.89929" transform="rotate(-45 459.5 7)" fill="white" />
                    <rect x="463.5" y="7" width="4.24243" height="4.24243" transform="rotate(-45 463.5 7)" fill="black" />
                    <defs>
                      <linearGradient id="paint0_linear_1155_799" x1="0" y1="9" x2="1142" y2="9" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#3D3D3D" stop-opacity="0" />
                        <stop offset="0.5" stop-color="#3D3D3D" />
                        <stop offset="1" stop-color="#3D3D3D" stop-opacity="0" />
                      </linearGradient>
                      <linearGradient id="paint1_linear_1155_799" x1="9.00006" y1="9" x2="461" y2="9.00004" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" stop-opacity="0" />
                        <stop offset="1" stop-color="white" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="relative z-10">
                    <OutlineBtn text="Engage With Us" />
                  </div>
                </div>

                <div >
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
    </section>

  )
}

function Card({ card }: any) {
  return (
    <div
      className="group relative shrink-0 w-[20rem] h-[30rem] overflow-hidden bg-blue-200">
      <div style={{ backgroundImage: `url(${card.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110">
      </div>
    </div>
  )
} 