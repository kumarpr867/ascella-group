import Image from 'next/image';

export default function OperatingStructure() {
  return (
    <section className="border-y border-color">
      <div className="relative sm:mx-6 md:mx-10 lg:mx-24 px-4 py-10 md:px-10 md:py-24 flex flex-col md:flex-row border-x border-color gap-8 md:gap-0">
        <div className="flex flex-col gap-5 pb-6 md:pb-10 w-full md:w-1/2">
          <h2 >
            A unified model built for accountable
            <span className="text-gray-300"> execution at scale.</span>
          </h2>
          <p className="text-b2 w-1/2">Ownership, governance, and delivery aligned before work begins.</p>
        </div>
        <div className="absolute inset-0 flex justify-end pointer-events-none">
          <div className="grid-bg w-1/2 h-full"></div>
        </div>

      </div>
      <div className="border-t border-color">
        <div className="mx-2 sm:mx-6 md:mx-10 lg:mx-24 px-2 py-6 md:px-8 md:py-10 border-x border-color">
          <div className="text-b3 text-gray-300 flex flex-wrap justify-between gap-2 text-xs sm:text-sm md:text-base">
            <span className="text-white">Governance</span>
            <span>Accountability</span>
            <span>Assemble Pods</span>
            <span>Performance</span>
            <span>Embed Security</span>
            <span>Controlled Execution</span>
            <span className="text-white">Outcome Stability</span>
          </div>
          <div className="flex flex-cols flex-center items-center m-10">
            <div className="flex w-full justify-evenly items-center">
              <span>
                <Image src={'/howAscellaOperates/governace.svg'} alt={''} width={100} height={100} />
              </span>
              <div className="flex flex-center line h-0.5 w-10  bg-gray-400"></div>
              <div className="flex w-full items-center justify-between border border-color p-6">
                <span>
                  <Image src={'/howAscellaOperates/accountability.svg'} alt={''} width={100} height={100} />
                </span>
                <span>
                  <Image src={'/howAscellaOperates/pods.png'} alt={''} width={100} height={100} />
                </span>
                <span>
                  <Image src={'/howAscellaOperates/performance.png'} alt={''} width={100} height={100} />
                </span>
                <span>
                  <Image src={'/howAscellaOperates/security.png'} alt={''} width={100} height={100} />
                </span>
                <span>
                  <Image src={'/howAscellaOperates/execution.png'} alt={''} width={100} height={100} />
                </span>
              </div>

              <div className="flex flex-center line h-0.5 w-15 bg-gray-400"></div>
              <span>
                <Image src={'/howweoperate/outcome.png'} alt={''} width={100} height={100} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
