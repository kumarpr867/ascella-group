import { slideInFromBottom, slideInFromLeft, slideInFromRight } from "@/utils/motion";
import Reveal from "@/utils/Reveal";
import Heading from "../headings/Heading";
import Image from "next/image";

export default function OperatingGroup() {
    return (
        <section className="mt-20 border-y border-color">
            <div className="flex flex-col gap-10 py-10 lg:py-25">
                <div className="mx-auto max-w-7xl px-10 xl:px-0 flex flex-col md:flex-row justify-between gap-5 ">
                    <Reveal variants={slideInFromLeft(0.1)}  className="flex flex-col gap-6 md:w-1/2">
                        <Heading text="Introduction" />
                        <h3 className="text-[18px] md:text-[36px]">What an Operating Group Means</h3>
                        <p className="text-b3 ">Most organisations combine vendors and internal teams to move work forward, while an operating group establishes structure, authority, and accountability before execution begins.</p>
                    </Reveal>
                    <Reveal variants={slideInFromRight(0.1)}  className="flex flex-col justify-between">
                        <div className=""></div>
                        <p className="text-b3">Ascella Group holds<br />operating authority</p>
                    </Reveal>
                </div>

                <Reveal variants={slideInFromBottom(0.1)}  className="mx-10 xl:mx-auto max-w-7xl border border-color flex-col flex-center gap-16 xl:px-10 py-10">
                    <h4 className="text-[16px] md:text-[24px]">Ascella Group holds operating authority</h4>

                    {/* Image */}
                    <div className="hidden lg:block relative w-full h-52">
                        <Image
                            src="/howAscellaOperates/flowChart.svg"
                            alt="Operating model diagram"
                            fill
                        />
                    </div>
                    <div className="lg:hidden block relative w-full h-[500px]">
                        <Image
                            src="/howAscellaOperates/flowChartVertical.svg"
                            alt="Operating model diagram"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Bottom Text */}
                    <h4 className="text-[16px] md:text-[24px]">Execution arms deliver outcomes</h4>
                </Reveal>
            </div>
        </section>
    )
}
