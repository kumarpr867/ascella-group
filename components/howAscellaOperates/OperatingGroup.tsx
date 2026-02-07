import PlusHeading from "../headings/PlusHeading";
import Image from "next/image";
export default function OperatingGroup() {
    return (
        <section className="my-20 border-y border-color px-5 lg:px-20 ">
            <div className="flex flex-col gap-10 px-5 py-10 lg:px-10 lg:py-25">
                <div className="flex justify-between gap-70">
                    <div className="flex flex-col gap-4 md:w-1/2">
                        <PlusHeading text="Introduction" size="lg" />
                        <h1 className="text-3xl">What an <span className="text-gray-300" >Operating Group</span> Is</h1>
                        <p className="text-gray-300 text-sm">Most organisations assemble vendors, internal teams, and consultants to execute work.An operating group is different.</p>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className=""></div>
                        <p className="text-gray-300 text-sm">Execution is coordinated. <br /> Accountability remains singular.</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col items-center justify-between gap-10 p-5 lg:p-20 border border-color">
                        <h2 className="text-xl">Ascella Group sits above execution.</h2>
                        <Image src="/howAscellaOperates/flowChart.svg" alt="" width={500} height={100}/>
                        <div className="text-sm font-light">
                            <p className="text-lg leading-tight">It <span className="text-gray-300"> designs the governance, accountability, and operating structure </span>that execution happens within.</p><br />
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between  gap-10 p-5 lg:p-20 border border-color">
                        <h2 className="text-xl">Execution arms deliver work.</h2>
                        <Image src="/howAscellaOperates/c.svg" alt="" width={500} height={100}/>
                        <div className="text-sm font-light">
                            <p className="text-lg leading-tight">Ascella Group retains ownership of <span className="text-gray-300">how that work is controlled.</span></p><br />
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
