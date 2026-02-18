import PartialOutlineBtn from "../btns/PartialOutlineBtn";
import PrecisionGrid from "../textures/PrecisionGrid";
import Image from "next/image";

export default function NotCapabilityProblem() {
    return (
<<<<<<< HEAD
        <section className="m-20 xl:m-30">

            <div className="relative  overflow-hidden">
                
                <div className="bg-gray-400 m-10">
                    <p className="">Execution is not a capability problem. It is a structure problem. Organisations succeed or fail based on how execution is governed, aligned, and controlled at scale.</p>
=======
        <section className="m-20 xl:m-28">
            <div className="mx-10 lg:mx-25 overflow-hidden">
                <div className="relative bg-gray-500">
                    <PrecisionGrid />
                    <div className="px-6 sm:px-10 lg:px-32 py-15 ">
                            <p className="text-[36px] leading-10"> Execution rarely fails from lack of talent but from fragmented ownership<span className="text-gray-300"> and unclear control. Organisations rise or fall on how authority, accountability, and decision flow are structured as scale increases.</span></p>
                    </div>
>>>>>>> a19ec7e4b85e71cc1ad7b27ca31149049a18e767
                </div>
                <div className="flex items-stretch">
                    <div className="relative w-1/4 h-[300px]">
                        <Image
                            src="/howAscellaOperates/NotCapabilityProblem/left.svg"
                            alt=""
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="relative w-3/4 h-[300px] overflow-hidden">
                        <Image
                            src="/howAscellaOperates/NotCapabilityProblem/right.svg"
                            alt=""
                            fill
                            className="object-cover z-0"
                        />
                        <div className="absolute inset-0 z-10 flex flex-col justify-center px-10">
                            <div className="flex flex-col items-center">
                                <p className="text-b1 max-w-md">
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
