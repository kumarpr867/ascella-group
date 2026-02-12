import PrecisionGrid from "../textures/PrecisionGrid";
import Image from "next/image";

export default function NotCapabilityProblem() {
    return (
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
                            Execution is not a capability problem. <span className="text-gray-200"> It is a structure problem. Organisations succeed or fail based on how execution </span>is governed, aligned, and controlled at scale.</span>
                    </div>
                </div>
                <div className="relative grid grid-cols-2 h-24 sm:h-32 lg:h-40 w-full">

                    <div className="relative h-32 w-full">
                        <Image
                            src="/howAscellaOperates/NotCapabilityProblem/left.svg"
                            alt=""
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="relative h-32 w-full">
                        <Image
                            src="/howAscellaOperates/NotCapabilityProblem/right.svg"
                            alt=""
                            fill
                            className="object-contain"
                        />
                    </div>

                </div>
            </div>

        </section>
    )
}
