import Image from "next/image"
import PlusHeading from "../headings/PlusHeading"

export default function EngagementPrinciple() {
  return (
    <section>
      <div className="px-6 py-12 lg:px-25 lg:py-25">
        <PlusHeading text="Engagement Principle" size="md" />

        <p className="mt-6 max-w-3xl text-xl lg:text-3xl leading-tight">
          Ascella engages selectively where <span className="text-gray-200">execution requires governance,
            accountability, and operating control at scale.</span>
        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-2 border-y border-color min-h-130">


        <div className="border-b lg:border-r border-color flex flex-col justify-center gap-2 p-12">

          <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="21" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="28" width="7" height="7" fill="#3D3D3D" />
            <rect y="14" width="7" height="7" fill="#3D3D3D" />
            <rect width="7" height="7" fill="#3D3D3D" />
            <rect x="7" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" width="7" height="7" fill="#3D3D3D" />
          </svg>
          <h3 className=" tracking-wide mt-5">
            Engagements begin with clearly defined operating alignment and accountability structures.
          </h3>
          <p className="text-sm text-gray-200 max-w-xs">
            Before any execution starts, expectations, decision rights, and oversight mechanisms are established to prevent ambiguity later in delivery.
          </p>
        </div>

        <div className="border-b lg:border-r border-color flex items-center justify-center p-8">
          <Image
            src="/whoWeWorkWith/one.png"
            alt="Abstract cube"
            width={260}
            height={260}
            className="opacity-55"
          />
        </div>

        <div className="border-b lg:border-r border-color flex flex-col justify-center gap-2 p-12">

          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="21" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="28" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect y="21" width="7" height="7" fill="#3D3D3D" />
            <rect y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="7" y="28" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="7" width="7" height="7" fill="#3D3D3D" />
          </svg>

          <h3 className=" tracking-wide mt-5">
            Ascella engages where complexity, risk, or scale require structured operating discipline.
          </h3>
          <p className="text-sm text-gray-200 max-w-xs">
            Partnerships are formed when multi-team coordination, regulatory exposure, or growth introduce execution challenges that cannot be managed informally.
          </p>
        </div>

        <div className="border-b lg:border-r border-color flex items-center justify-center p-8">
          <Image
            src="/whoWeWorkWith/two.png"
            alt="Abstract structure"
            width={260}
            height={260}
            className="opacity-55"
          />
        </div>

        <div className="border-b lg:border-r border-color flex flex-col justify-center gap-2 p-12">

          <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="21" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="28" width="7" height="7" fill="#3D3D3D" />
            <rect y="14" width="7" height="7" fill="#3D3D3D" />
            <rect width="7" height="7" fill="#3D3D3D" />
            <rect x="7" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" width="7" height="7" fill="#3D3D3D" />
          </svg>


          <h3 className=" tracking-wide mt-5">
            Engagements are designed to create long-term control, not short-term delivery support.
          </h3>
          <p className="text-sm text-gray-200 max-w-xs">
            The objective is to embed enduring governance and execution frameworks that remain effective as organisations evolve.
          </p>
        </div>


        <div className="border-b border-color flex items-center justify-center p-8">
          <Image
            src="/whoWeWorkWith/three.png"
            alt="Abstract layers"
            width={260}
            height={260}
            className="opacity-55"
          />
        </div>

      </div>

    </section>
    // <section className="border-b border-color">
    //   <div className="mx-4 lg:mx-25">



    //   </div>
    // </section>
  )
}
