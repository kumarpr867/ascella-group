import Image from "next/image"
import PlusHeading from "../headings/PlusHeading"
import PrecisionGrid from "../textures/PrecisionGrid"

export default function ExecutionPods() {
  return (
    <section className="m:20 xl:m-30">
      <div className="relative min-h-screen overflow-hidden">

        <PrecisionGrid />

        <div className="bg-gray-500 flex">
          <div className="flex-col w-2xl">
            <div className="div">
              <Image src="/OperatingStructure/PodCircle.svg" alt={"cirlce image"} width={400} height={400} />
            </div>
            <div className="flex flex-col gap-2 p-20 w-3/4">
              <h5 className="text-2xl">Operational Effect</h5>
              <p className="text-gray-300 text-b2">Pods allow execution capacity to scale or  adapt without introducing new management layers, vendor complexity, or diffusion of accountability.</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 pr-15 py-10 max-w-1/2">
            <div>
              <PlusHeading text="EXECUTION PODS" size="b1" />
            </div>
            <h3>Execution pods provide<span className="text-gray-200"> flexible delivery without introducing fragmentation.</span></h3>
            <p className="font-extralight text-b2">Execution is delivered through specialised pods assembled per engagement.Pods operate inside Ascella’s governance framework, not as independent units.This ensures flexibility in capability deployment while maintaining central oversight and accountability.</p>
            <div className="p-10 z-10 bg-white/70 text-gray-500 rounded-xl flex flex-col gap-5">
              <div className="flex gap-5">
                <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="14" y="21" width="7" height="7" fill="#3D3D3D" />
                  <rect x="21" y="7" width="7" height="7" fill="#3D3D3D" />
                  <rect x="21" y="14" width="7" height="7" fill="#3D3D3D" />
                  <rect x="28" y="7" width="7" height="7" fill="#3D3D3D" />
                  <rect x="7" y="14" width="7" height="7" fill="#3D3D3D" />
                  <rect y="14" width="7" height="7" fill="#3D3D3D" />
                  <rect x="7" width="7" height="7" fill="#3D3D3D" />
                  <rect x="14" y="7" width="7" height="7" fill="#3D3D3D" />
                  <rect x="21" width="7" height="7" fill="#3D3D3D" />
                </svg>
                <h4>In the Ascella model:</h4>
              </div>
              <div className="md:w-sm">
                <h5 className="mb-2">Small and accountable</h5>
                <p className="leading-5 text-b3">Pods remain intentionally compact to preserve clarity of ownership, communication, and responsibility.</p>
              </div>
              <div className="md:w-sm">
                <h5 className="mb-2">Outcome-focused </h5>
                <p className="leading-5 text-b3">Each pod is aligned to defined objectives, performance indicators, and delivery expectations.</p>
              </div>
              <div className="md:w-sm">
                <h5 className="mb-2">Aligned to central oversight</h5>
                <p className="leading-5 text-b3">Pods execute work while Ascella Group retains governance, measurement, and escalation control.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
