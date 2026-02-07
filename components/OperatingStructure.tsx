import Image from 'next/image';

export default function OperatingStructure() {
  return (
    <section className="border-y border-color">
      <div className="mx-2 sm:mx-6 md:mx-10 lg:mx-24 px-4 py-8 md:px-10 md:py-14 flex flex-col md:flex-row border-x border-color gap-8 md:gap-0">
        <div className="flex flex-col gap-5 pb-6 md:pb-10 w-full md:w-1/2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-300">
            <span className="text-white">An operating <br className='hidden sm:block'/> structure</span> designed to <br className='hidden sm:block'/>maintain control at scale.
          </h1>
          <p className="text-xs sm:text-sm">Governance, accountability, and execution structured before delivery begins.</p>
        </div>
      </div>
      <div className="border-t border-color">
        <div className="mx-2 sm:mx-6 md:mx-10 lg:mx-24 px-2 py-6 md:px-8 md:py-10 border-x border-color">
          <div className="text-gray-300 flex flex-wrap justify-between gap-2 text-xs sm:text-sm md:text-base">
            <span className="text-white">Governance</span>
            <span>Accountability</span>
            <span>Assemble Pods</span>
            <span>Embed Security</span>
            <span>Controlled Execution</span>
            <span className="text-white">Outcome Stability</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center mt-6 gap-4">
            <span>
              <Image src={'/howweoperate/governace.svg'} alt={''} width={80} height={80} className="w-16 h-16 sm:w-20 sm:h-20" />
            </span>
            <div className="flex flex-row flex-wrap items-center border border-color gap-2 p-2 rounded-md">
              <span>
                <Image src={'/howweoperate/accountability.svg'} alt={''} width={70} height={70} className="w-12 h-12 sm:w-16 sm:h-16" />
              </span>
              <span>
                <Image src={'/howweoperate/pods.png'} alt={''} width={70} height={70} className="w-12 h-12 sm:w-16 sm:h-16" />
              </span>
              <span>
                <Image src={'/howweoperate/security.png'} alt={''} width={70} height={70} className="w-12 h-12 sm:w-16 sm:h-16" />
              </span>
              <span>
                <Image src={'/howweoperate/execution.png'} alt={''} width={70} height={70} className="w-12 h-12 sm:w-16 sm:h-16" />
              </span>
            </div>
            <span>
              <Image src={'/howweoperate/outcome.png'} alt={''} width={80} height={80} className="w-16 h-16 sm:w-20 sm:h-20" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
