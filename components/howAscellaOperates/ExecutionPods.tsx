import Image from "next/image"
import PlusHeading from "../headings/Heading"
import PrecisionGrid from "../textures/PrecisionGrid"
import Heading from "../headings/Heading"
import ParticleSphere from "./ParticleSphere"
import ParticleGlobeScene from "./ParticleGlobeScene"
import Reveal from "@/utils/Reveal"
import { slideInFromBottom } from "@/utils/motion"

export default function ExecutionPods() {
  return (
    <section className="my-24 xl:mx-24">
      <div className="relative z-30 overflow-hidden">

        <PrecisionGrid />
        <Image src="/howAscellaOperates/blur.png"
          alt={""} className="object-contain absolute inset-0 opacity-50 " fill />
        <div className="bg-gray-500 flex justify-between">
          <Reveal variants={slideInFromBottom(0.1)}  className="hidden lg:flex flex-col justify-center max-w-lg xl:max-w-3xl gap-10 items-center">
            <div className="hidden md:block lg:w-[300px] xl:w-[400px] h-[450px] xl:h-[450px] ">
              <ParticleGlobeScene />
            </div>
            <div className="flex flex-col items-start xl:pr-64 lg:pl-20 pb-10">
              <h5>Operational Effect</h5>
              <p className="text-gray-300 text-b2 text-left">Pods expand or contract based on scope while maintaining clear ownership, defined decision paths, and consistent oversight across all execution activity.</p>
            </div>
          </Reveal>
          <Reveal variants={slideInFromBottom(0.4)}  className="flex flex-col items-center lg:items-start justify-between gap-6 p-10">
            <div>
              <Heading text="EXECUTION PODS" />
            </div>
            <div className="text-[24px] lg:text-[30px] text-center lg:text-left leading-6 md:leading-8">Execution pods enable <span className="text-gray-200 ">scalable delivery while preserving central control and accountability.</span></div>
            <p className="font-extralight text-b2 text-center lg:text-left">Specialised pods are assembled per engagement and operate within Ascella’s governance framework, ensuring flexibility in capability deployment without creating independent silos or fragmented authority.</p>

            {/* image for smaller screen */}
            {/* <div className="lg:hidden flex items-center justify-center z-1 w-full h-[400px]">
              <ParticleGlobeScene />
            </div> */}
            <div className="p-5 md:p-10 z-10 w-full bg-white/70 text-gray-500 rounded-xl flex flex-col gap-5">
              <div className="flex gap-2 md:gap-5 items-center">
                <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <h4 className="text-[24px] md:text-[28px]">In the Ascella model:</h4>
              </div>
              <div className="lg:w-md">
                <h5 className="text-[16px] md:text-[20px] mb-2">Small and accountable</h5>
                <p className="leading-5 text-[12px]">Pods remain intentionally compact to protect clarity of responsibility, fast communication, and direct ownership of outcomes.</p>
              </div>
              <div className="lg:w-md">
                <h5 className="text-[16px] md:text-[20px] mb-2">Outcome aligned </h5>
                <p className="leading-5 text-[12px]">Each pod works against defined objectives, measurable indicators, and agreed delivery expectations tied to business impact.</p>
              </div>
              <div className="lg:w-md">
                <h5 className="text-[16px] md:text-[20px] mb-2">Governed centrally</h5>
                <p className="leading-5 text-[12px]">Pods execute within Ascella’s control structure where governance, performance tracking, and escalation authority remain unified and visible.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
