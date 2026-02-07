import Image from 'next/image';

export default function OperatingStructure() {
  return (
    <section className=" border-y border-color">
      <div className=" mx-10 lg:mx-25 p-10 lg:p-20 flex border-x border-color ">
        <div className="flex flex-col gap-5 pb-10  w-1/2">
          <h1 className="text-4xl text-gray-300">
            <span className="text-white">An operating <br /> structure</span> designed to <br />maintain control at scale.
          </h1>
          <p className="text-sm">Governance, accountability, and execution structured before delivery begins.</p>
        </div>
      </div>
      <div className="border-t border-color">
        <div className="mx-10 lg:mx-25 p-5 lg:p-10  border-x border-color">
          <div className="text-sm text-gray-300 flex justify-between">
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
                <Image src={'/howAscellaOperates/outcome.png'} alt={''} width={100} height={100} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
