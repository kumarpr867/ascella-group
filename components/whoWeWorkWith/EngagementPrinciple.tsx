import Image from "next/image"
import Heading from "../headings/Heading"

export default function EngagementPrinciple() {
  return (
    <section className="my-20">
      <div className="mx-auto max-w-7xl px-10 py-12 lg:py-25">
        <Heading text="Engagement Principle" />

        <h3 className="mt-6 leading-tight xl:pr-96 text-[16px] md:text-[24px] lg:text-[36px] ">
          Ascella partners where<span className="text-gray-300"> structured execution, measurable ownership, and disciplined governance are essential to sustained performance at scale.
          </span>
        </h3>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-y border-color min-h-96">

        <div className="border-b lg:border-r border-color flex flex-col justify-center gap-2 px-10 py-15 md:p-12 lg:p-18">
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
            Engagements start with defined authority and operating clarity
          </h5>
          <p className="text-b3 text-gray-200 max-w-xs">
            Scope, decision rights, escalation paths, and accountability structures are established before delivery begins to eliminate ambiguity and prevent fragmented execution.
          </p>
        </div>

        <div className="relative border-b lg:border-r border-color min-h-72 ">
          <Image
            src="/whoWeWorkWith/one.png"
            alt="Abstract cube"
            fill={true}
          />
        </div>

        <div className="border-b lg:border-r border-color flex flex-col justify-center gap-2 px-10 py-15 md:p-12 lg:p-18">
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
            Engagements are formed where complexity demands control

          </h5>
          <p className="text-b3 text-gray-200 max-w-xs">
            Multi-team coordination, regulatory pressure, distributed vendors, or rapid growth create environments where informal execution introduces measurable risk.

          </p>
        </div>

        <div className="relative border-b lg:border-r border-color min-h-72 ">
          <Image
            src="/whoWeWorkWith/two.png"
            alt="Abstract structure"
            fill={true}
          />
        </div>

        <div className="border-b lg:border-r border-color flex flex-col justify-center gap-2 px-10 py-15 md:p-15 lg:p-18">
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
            Engagements are built for durable control, not temporary support
          </h5>
          <p className="text-b3 text-gray-200 max-w-xs">
            Operating frameworks are designed to remain effective as scale increases, ensuring stability, resilience, and performance continuity over time.
          </p>
        </div>


        <div className="relative border-b lg:border-r border-color min-h-72 ">
          <Image
            src="/whoWeWorkWith/three.png"
            alt="Abstract layers"
            fill={true}
          />
        </div>

      </div>

    </section>
  )
}
