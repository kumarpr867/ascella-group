import PartialOutlineBtn from "../btns/PartialOutlineBtn";
import PrecisionGrid from "../textures/PrecisionGrid";
import Image from "next/image";

export default function NotCapabilityProblem() {
    return (
        <section className="mx-auto max-w-7xl px-10 my-30">
            <div className="overflow-hidden">
                <div className="relative bg-gray-500">
                    <PrecisionGrid />
                    <div className="px-6 sm:px-10 lg:px-24 py-15 ">
                            <p className="text-[24px] xl:text-[36px] leading-7 lg:leading-12"> Execution rarely fails from lack of talent but from fragmented ownership<span className="text-gray-300"> and unclear control. Organisations rise or fall on how authority, accountability, and decision flow are structured as scale increases.</span></p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-stretch">
                    <div className="relative md:w-1/4 h-[350px] sm:h-[500px] md:h-[300px]">
                        <Image
                            src="/howAscellaOperates/NotCapabilityProblem/left.svg"
                            alt=""
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="relative md:w-3/4 h-[300px] overflow-hidden">
                        <Image
                            src="/howAscellaOperates/NotCapabilityProblem/right.svg"
                            alt=""
                            fill
                            className="object-cover z-0"
                        />
                        <div className="absolute inset-0 z-10 flex flex-col justify-center px-10">
                            <div className="flex flex-col items-center">
                                <p className="text-[16px] text-center max-w-md">
                                    Execution fails when structure fails. Discover Ascella's execution arms
                                    purpose-built to govern, align, and scale enterprise operations.
                                </p>

                                <div className="mt-6">
                                    <PartialOutlineBtn text="View Execution Arms" bgColor="white" borderColor="black" />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}
