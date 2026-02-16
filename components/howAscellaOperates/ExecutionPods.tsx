import Image from "next/image"
import PlusHeading from "../headings/PlusHeading"
import PrecisionGrid from "../textures/PrecisionGrid"

export default function ExecutionPods() {
  return (
    <section className="m:20 xl:m-30">
      <div className="relative min-h-screen overflow-hidden">

        <PrecisionGrid />

        <div className="bg-gray-500 flex">
          <div className="flex-col w-2xl justify-between">
            <div>
              <Image src="/OperatingStructure/PodCircle.svg" alt={"cirlce image"} width={500} height={500} />
            </div>
            <div className="flex flex-col gap-2 p-20 w-3/4">
              <h5>Operational Effect</h5>
              <p className="text-gray-300 text-b2">Pods expand or contract based on scope while maintaining clear ownership, defined decision paths, and consistent oversight across all execution activity.</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 pr-15 py-10 max-w-1/2">
            <div>
              <PlusHeading text="EXECUTION PODS" size="b1" plusSize="lg" />
            </div>
            <div><span className="text-4xl font-normal leading-9">Execution pods enable </span><span className="text-neutral-500 text-4xl font-normal font-['Montserrat'] leading-9">scalable delivery while preserving central control and accountability.<br /></span></div>
            <p className="font-extralight text-b2">Specialised pods are assembled per engagement and operate within Ascella’s governance framework, ensuring flexibility in capability deployment without creating independent silos or fragmented authority.</p>
            <div className="p-10 z-10 bg-white/70 text-gray-500 rounded-xl flex flex-col gap-5">
              <div className="flex gap-5">
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
                <h4>In the Ascella model:</h4>
              </div>
              <div className="md:w-sm">
                <h5 className="mb-2">Small and accountable</h5>
                <p className="leading-5 text-b3">Pods remain intentionally compact to protect clarity of responsibility, fast communication, and direct ownership of outcomes.</p>
              </div>
              <div className="md:w-sm">
                <h5 className="mb-2">Outcome aligned </h5>
                <p className="leading-5 text-b3">Each pod works against defined objectives, measurable indicators, and agreed delivery expectations tied to business impact.</p>
              </div>
              <div className="md:w-sm">
                <h5 className="mb-2">Governed centrally</h5>
                <p className="leading-5 text-b3">Pods execute within Ascella’s control structure where governance, performance tracking, and escalation authority remain unified and visible.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
