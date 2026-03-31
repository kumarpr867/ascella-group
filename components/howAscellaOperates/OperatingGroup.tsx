import { slideInFromBottom, slideInFromLeft, slideInFromRight } from "@/utils/motion";
import Reveal from "@/utils/Reveal";
import Heading from "../headings/Heading";
import Image from "next/image";
import Flowchart from "./flowchart";

export default function OperatingGroup() {
    return (
        <section className="mt-20 border-y border-color">
            <div className="flex flex-col py-10 lg:py-25 overflow-x-hidden">
                <div className="mx-10 lg:mx-20 xl:mx-24 flex flex-col md:flex-row text-center md:text-left justify-between gap-5 ">
                    <Reveal variants={slideInFromLeft(0.1)} className="flex flex-col items-center md:items-start gap-6">
                        <Heading text="Introduction" />
                        <h3 className="text-[18px] md:text-[36px]">What an Operating Group Means</h3>
                        <p className="text-b3 md:w-2/3">Most organisations combine vendors and internal teams to move work forward, while an operating group establishes structure, authority, and accountability before execution begins.</p>
                    </Reveal>
                    <Reveal variants={slideInFromRight(0.1)} className="hidden md:flex flex-col justify-between">
                        <div className=""></div>
                        <p className="text-b3 text-gray-200 md:text-white">Ascella Group holds operating authority</p>
                    </Reveal>
                </div>

                <Reveal variants={slideInFromBottom(0.1)} className="lg:hidden mx-10 lg:mx-20 xl:mx-24 mt-6 lg:py-10 flex flex-col items-center">
                    <div className="text-b2 text-center">Ascella Group holds <br /> operating authority</div>
                    <div className="relative w-full h-[350px] md:h-[600px]">
                        <Image
                            src="/howAscellaOperates/fv.png"
                            alt="Operating model diagram"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="text-b2 text-center w-xs">Execution arms <br /> deliver outcomes</div>
                </Reveal>
                <Reveal variants={slideInFromBottom(0.1)} className="relative hidden lg:block  mx-10 lg:mx-20 xl:mx-24 mt-6 lg:py-20 flex flex-col md:flex-row items-center border border-color">
                    <Flowchart />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-between w-full px-10 xl:px-24">
                        <div className="text-b2 text-center">Ascella Group holds <br /> operating authority</div>
                        <div className="text-b2 text-center">Execution arms <br /> deliver outcomes</div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
