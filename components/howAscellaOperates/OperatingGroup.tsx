import { slideInFromBottom, slideInFromLeft, slideInFromRight } from "@/utils/motion";
import Reveal from "@/utils/Reveal";
import Heading from "../headings/Heading";
import Image from "next/image";

export default function OperatingGroup() {
    return (
        <section className="mt-20 border-y border-color">
            <div className="flex flex-col gap-10 py-10 lg:py-25">
                <div className="mx-10 lg:mx-20 xl:mx-24 flex flex-col md:flex-row text-center md:text-left justify-between gap-5 ">
                    <Reveal variants={slideInFromLeft(0.1)} className="flex flex-col items-center md:items-start gap-6">
                        <Heading text="Introduction" />
                        <h3 className="text-[18px] md:text-[36px]">What an Operating Group Means</h3>
                        <p className="text-b3 md:w-2/3">Most organisations combine vendors and internal teams to move work forward, while an operating group establishes structure, authority, and accountability before execution begins.</p>
                    </Reveal>
                    <Reveal variants={slideInFromRight(0.1)} className="flex flex-col justify-between">
                        <div className=""></div>
                        <p className="text-b3 text-gray-200 md:text-white">Ascella Group holds operating authority</p>
                    </Reveal>
                </div>

                <Reveal variants={slideInFromBottom(0.1)} className="mx-10 lg:mx-20 xl:mx-24 border border-color flex-col items-center justify-center gap-10 px-4 xl:px-10 py-4 lg:py-10">
                    <div className="flex justify-center md:justify-between">
                        <h5 className="text-[14px] lg:text-[20px] text-center">Ascella Group holds operating authority</h5>
                        <h5 className="hidden md:block text-[14px] lg:text-[20px] text-center">Execution arms deliver outcomes</h5>
                    </div>
                    {/* Image */}
                    <div className="relative w-full h-[450px] sm:h-[500px] md:h-52 my-10 flex items-center justify-center">
                        <div className="hidden md:block">
                            <Image
                                src="/howAscellaOperates/flowChart.svg"
                                alt="Operating model diagram"
                                fill
                            />
                        </div>
                        <div className="md:hidden">
                            <Image
                                src="/howAscellaOperates/flowChartVertical.svg"
                                alt="Operating model diagram"
                                fill
                            />
                        </div>
                    </div>

                    {/* Bottom Text */}
                    <h4 className="block md:hidden text-[14px] text-center">Execution arms deliver outcomes</h4>
                </Reveal>
            </div>
        </section>
    )
}
