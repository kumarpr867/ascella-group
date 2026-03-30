import Image from "next/image"
import Heading from "../headings/Heading"
import Reveal from "@/utils/Reveal"
import { slideInFromLeft } from "@/utils/motion"
import EngPrincMob from "./EngPrincMob"

export default function EngagementPrinciple() {
  return (
    <section className="my-20">
      <Reveal variants={slideInFromLeft(0.1)} className="mx-10 xl:mx-24 md:pb-12 lg:pb-24">
        <div className="flex justify-center md:justify-start">
          <Heading text="Engagement Principle" />
        </div>

        <h3 className="mt-6 leading-tight xl:pr-96 text-[16px] md:text-[24px] lg:text-[36px] text-center md:text-left">
          Ascella partners where<span className="text-gray-200"> structured execution, measurable ownership, and disciplined governance are essential to sustained performance at scale.
          </span>
        </h3>

      </Reveal>

      <div className="hidden md:grid mx-10 xl:mx-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-color ">

        {/* 1st */}
        <Reveal variants={slideInFromLeft(0.2)} className="border-b lg:border-r border-color flex flex-col justify-center gap-2 px-10 py-10 md:p-8 :p-10">
          <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="14" y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="28" width="7" height="7" className="fill-gray-400" />
            <rect y="14" width="7" height="7" className="fill-gray-400" />
            <rect width="7" height="7" className="fill-gray-400" />
            <rect x="7" y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="14" width="7" height="7" className="fill-gray-400" />
          </svg>
          <h5 className=" tracking-wide mt-5 text-[16px] md:text-[16px] lg:text-[20px]">
            Work begins with defined authority and operating clarity
          </h5>
          <p className="text-b3 text-gray-200 md:max-w-xs">
            Scope, decision rights, escalation paths, and accountability structures are established upfront to eliminate ambiguity. This ensures every stakeholder understands their role, decisions move without friction, and coordination does not replace ownership as delivery progresses.
          </p>
        </Reveal>

        <Reveal variants={slideInFromLeft(0.3)} className="relative border-b lg:border-r border-color min-h-72 ">
          <Image
            src="/whoWeWorkWith/one.png"
            alt="Abstract cube"
            fill={true}
          />
        </Reveal>
        {/* 2nd */}
        <Reveal variants={slideInFromLeft(0.4)} className="border-b border-color flex flex-col justify-center gap-2 px-10 py-10 md:p-8 :p-10">
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" width="7" height="7" className="fill-gray-400" />
            <rect x="21" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="14" y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="28" y="7" width="7" height="7" className="fill-gray-400" />
            <rect y="21" width="7" height="7" className="fill-gray-400" />
            <rect y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="7" y="28" width="7" height="7" className="fill-gray-400" />
            <rect x="14" y="7" width="7" height="7" className="fill-gray-400" />
          </svg>

          <h5 className=" tracking-wide mt-5 text-[16px] md:text-[16px] lg:text-[20px]">
            Complex environments require structured control
          </h5>
          <p className="text-b3 text-gray-200 md:max-w-xs">
            Multi-team coordination, regulatory pressure, distributed vendors, and rapid growth introduce layers of complexity that cannot be managed informally. Structured control ensures alignment across functions, reduces operational risk, and maintains consistency in how decisions are made and executed.
          </p>
        </Reveal>

        <Reveal variants={slideInFromLeft(0.5)} className="relative border-b lg:border-r border-color min-h-72 ">
          <Image
            src="/whoWeWorkWith/two.png"
            alt="Abstract structure"
            fill={true}
          />
        </Reveal>

        {/* 3rd */}
        <Reveal variants={slideInFromLeft(0.6)} className="border-b lg:border-r border-color flex flex-col justify-center gap-2 px-10 py-10 md:p-8 lg:p-10">
          <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="14" width="7" height="7" className="fill-gray-400" />
            <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
            <rect x="14" y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="28" width="7" height="7" className="fill-gray-400" />
            <rect y="14" width="7" height="7" className="fill-gray-400" />
            <rect width="7" height="7" className="fill-gray-400" />
            <rect x="7" y="21" width="7" height="7" className="fill-gray-400" />
            <rect x="14" width="7" height="7" className="fill-gray-400" />
          </svg>


          <h5 className=" tracking-wide mt-5 text-[16px] md:text-[16px] lg:text-[20px]">
            Built for durability, not temporary support
          </h5>
          <p className="text-b3 text-gray-200 md:max-w-xs">
            Operating structures are designed to remain effective as scale increases, ensuring stability, resilience, and continuity over time. The focus is on systems that hold under pressure, adapt without breaking, and sustain performance beyond immediate delivery cycles.
          </p>
        </Reveal>


        <Reveal variants={slideInFromLeft(0.7)} className="relative border-b border-color min-h-72 ">
          <Image
            src="/whoWeWorkWith/three.png"
            alt="Abstract layers"
            fill={true}
          />
        </Reveal>

      </div>

      <span className="md:hidden">
        <EngPrincMob />
      </span>

    </section>
  )
}
