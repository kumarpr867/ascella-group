import PlusHeading from "../headings/PlusHeading";
import Image from "next/image";
export default function OperatingGroup() {
    return (
        <section className="mt-20 border-y border-color px-5 lg:px-20 ">
            <div className="flex flex-col gap-10 px-5 py-10 lg:px-10 lg:py-25">
                <div className="flex justify-between gap-70">
                    <div className="flex flex-col gap-4 md:w-1/2">
                        <PlusHeading text="Introduction" size="b1"plusSize="lg"/>
                        <h3>What an Operating Group Means</h3>
                        <p className="text-b3 ">Most organisations combine vendors and internal teams to move work forward, while an operating group establishes structure, authority, and accountability before execution begins.</p>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className=""></div>
                        <p className="text-b3">Ascella Group holds<br />operating authority</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col items-center justify-between gap-10 p-5 lg:p-20 border border-color">
                        <h4>Ascella Group holds operating authority</h4>
                        <Image src="/howAscellaOperates/flowChart.svg" alt="" width={500} height={100}/>
                        <div className="flex gap-10 flex-col">
                            <div className="w-[494px] h-16 justify-start mb-5"><span className=" leading-5">Ascella Group defines governance, </span><span className="text-neutral-500 text-base font-normal font-['Montserrat'] leading-5">decision rights, & accountability across security, technology, workforce, & growth</span><span className="leading-5"> so all execution flows through a single structured model.<br/></span></div>
                           <p className="text-b3">Operating structure is designed first, roles are aligned to outcomes, and escalation paths are defined clearly so delivery stays controlled as complexity increases.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between  gap-10 p-5 lg:p-20 border border-color">
                        <h4>Execution arms deliver work.</h4>
                        <Image src="/howAscellaOperates/c.svg" alt="" width={500} height={100}/>
                        <div className="flex gap-10 flex-col">
                            <div className="w-[460px] h-14 justify-start mb-5"><span className="leading-5">Execution units operate within the </span><span className="text-neutral-500 leading-5">framework set by Ascella, carrying responsibility for delivery</span><span className="text-white "> while remaining aligned to shared priorities and defined control paths.<br/></span></div>
                            <p className="text-b3">Accountability remains centralised, oversight stays consistent, and results are measured against agreed impact rather than isolated task completion.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
