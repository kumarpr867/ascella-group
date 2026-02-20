import Image from 'next/image';

const items = [
  { label: "Accountability", icon: "/howAscellaOperates/accountability.svg" },
  { label: "Assemble Pods", icon: "/howAscellaOperates/pods.png" },
  { label: "Performance", icon: "/howAscellaOperates/performance.png" },
  { label: "Embed Security", icon: "/howAscellaOperates/security.png" },
  { label: "Controlled Execution", icon: "/howAscellaOperates/execution.png" },
];

export default function OperatingStructure() {
  return (
    <section className="border-y border-color">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-24 flex flex-col md:flex-row border-x-0 lg:border-x border-color gap-8 md:gap-0">

        {/* top */}
        <div className="flex flex-col gap-5 pb-6 md:pb-10 w-full md:w-1/2">
          <h2 className='text-2xl md:text-5xl'>
            A unified model built for accountable
            <span className="text-gray-300"> execution at scale.</span>
          </h2>
          <p className="text-[14px] text-left w-1/2">Ownership, governance, and delivery aligned before work begins.</p>
        </div>
        <div className="absolute inset-0 flex justify-end pointer-events-none">
          <div className="grid-bg w-1/2 h-full -z-1"></div>
        </div>

      </div>

      {/* flow chart */}
      <div className="border-t border-color ">

        
        {/* xl screen */}
        <div className='hidden mx-auto max-w-7xl px-4 sm:px-6 py-10 xl:flex items-center justify-around  border-x-0 lg:border-x  border-color '>
          <div className="flex flex-col items-center py-8 ">
            <p className={"text-b3 mb-6"}>Governance</p>
            <div className={"w-full h-40 flex items-center justify-center"}>
              <Image
                src={"/howAscellaOperates/governace.svg"}
                alt={"governance"}
                width={80}
                height={80}
              />
              <div className='w-10 bg-gray-400 h-1'></div>
            </div>
          </div>
          <div className="grid grid-cols-5 text-center">
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center py-8 "
                >
                  <p className={"text-b3 mb-6"} >{item.label}</p>

                  <div className={` w-48 h-40 flex items-center justify-center border-y border-color
              ${index == 0 ? "border-l" : ""} ${index == 4 ? "border-r" : ""}`}>
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={80}
                      height={80}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-center py-8 ">
            <p className={"text-b3 mb-6"}>Outcome Stability</p>
            <div className={"w-full h-40 flex items-center justify-center"}>
              <div className='w-10 bg-gray-400 h-1'></div>
              <Image
                src={"/howAscellaOperates/outcome.png"}
                alt={"Outcome Stability"}
                width={80}
                height={80}
              />
            </div>
          </div>
        </div>






        {/* md and smaller */}

        <div className="grid grid-cols-2 xl:hidden border-b border-color">
          <div className="flex items-center mx-5 border-x border-color w-full">
            <div className='border-r border-color w-full'>
              <div className={"w-full h-40 flex items-center justify-center"}>
                <Image
                  src={"/howAscellaOperates/governace.svg"}
                  alt={"governance"}
                  width={80}
                  height={80}
                />
                <p className={"text-b3 mb-6"}>Governance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
