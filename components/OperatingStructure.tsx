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
          <div className="text-gray-300 flex justify-between">
            <span className="text-white">Governance</span>
            <span>Accountability</span>
            <span>Assemble Pods</span>
            <span>Embed Security</span>
            <span>Controlled Execution</span>
            <span className="text-white">Outcome Stability</span>
          </div>
          <div className="flex flex-cols flex-center">
            <div className="">
              <span>
                <Image src={'/howweoperate/governace.svg'} alt={''} width={100} height={100} />
              </span>
              <div className="flex items-center border border-color">
                <span>
                  <Image src={'/howweoperate/accountability.svg'} alt={''} width={100} height={100} />
                </span>
                <span>
                  <Image src={'/howweoperate/pods.png'} alt={''} width={100} height={100} />
                </span>
                <span>
                  <Image src={'/howweoperate/security.png'} alt={''} width={100} height={100} />
                </span>
                <span>
                  <Image src={'/howweoperate/execution.png'} alt={''} width={100} height={100} />
                </span>
              </div>
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
