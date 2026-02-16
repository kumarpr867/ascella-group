import PartialOutlineBtn from "../btns/PartialOutlineBtn";
import PrecisionGrid from "../textures/PrecisionGrid";
import Image from "next/image";

export default function NotCapabilityProblem() {
    return (
<<<<<<< HEAD
        <section className="m-20 xl:m-28">
            <div className="mx-10 lg:mx-25 overflow-hidden">
                <div className="relative bg-gray-500">
                    <PrecisionGrid />
                    <div className="px-6 sm:px-10 lg:px-32 py-15">
                        <svg width="100" height="42" viewBox="0 0 182 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="182" y1="21.25" x2="42" y2="21.25" stroke="white" stroke-width="0.5" stroke-dasharray="2 2" />
                            <circle cx="21" cy="21" r="20.75" transform="matrix(-1 0 0 1 42 0)" fill="#0D0D0D" stroke="white" stroke-width="0.5" stroke-dasharray="3 3" />
                        </svg>
                        <span className="text-2xl leading-relaxed sm:leading-normal ">
                            Execution is not a capability problem. <span className="text-gray-300"> It is a structure problem. Organisations succeed or fail based on how execution </span>is governed, aligned, and controlled at scale.</span>
                    </div>
=======
        <section className="m-20 xl:m-30">

            <div className="relative  overflow-hidden">
                
                <div className="bg-gray-400 m-10">
                    <p className="">Execution is not a capability problem. It is a structure problem. Organisations succeed or fail based on how execution is governed, aligned, and controlled at scale.</p>
>>>>>>> c178cdc (working on same looks like UI)
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
