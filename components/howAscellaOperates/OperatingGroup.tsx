import Heading from "../headings/Heading";
import Image from "next/image";

export default function OperatingGroup() {
    return (
        <section className="mt-20 border-y border-color">
            <div className="flex flex-col gap-10 py-10 lg:py-25">
                <div className="mx-auto max-w-7xl px-5 md:px-5 xl:px-0 flex flex-col md:flex-row justify-between gap-5 ">
                    <div className="flex flex-col gap-6 md:w-1/2">
                        <Heading text="Introduction" />
                        <h3 className="text-[18px] md:text-[36px]">What an Operating Group Means</h3>
                        <p className="text-b3 ">Most organisations combine vendors and internal teams to move work forward, while an operating group establishes structure, authority, and accountability before execution begins.</p>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className=""></div>
                        <p className="text-b3">Ascella Group holds<br />operating authority</p>
                    </div>
                </div>


                <div className="hidden lg:block mx-auto max-w-7xl px-5 md:px-10 py-10 border border-color">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <h4>
                            Ascella Group holds operating authority
                        </h4>
                        <h4 >
                            Execution arms deliver outcomes
                        </h4>
                    </div>

                    <div className="relative w-full h-[250px] md:h-[350px] mb-12">
                        <Image
                            src="/howAscellaOperates/flowChart.svg"
                            alt="Operating model diagram"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Bottom Text Blocks */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

                        <div>
                            <p className="mb-5">
                                Ascella Group defines governance,
                                <span className="text-neutral-500">
                                    {" "}decision rights, & accountability across security, technology, workforce, & growth
                                </span>
                                {" "}so all execution flows through a single structured model.
                            </p>
                            <p className="text-b3">
                                Operating structure is designed first, roles are aligned to outcomes, and escalation paths are defined clearly so delivery stays controlled as complexity increases.
                            </p>
                        </div>

                        <div>
                            <p className="mb-5">
                                Execution units operate within the
                                <span className="text-neutral-500">
                                    {" "}framework set by Ascella, carrying responsibility for delivery
                                </span>
                                {" "}while remaining aligned to shared priorities and defined control paths.
                            </p>
                            <p className="text-b3">
                                Accountability remains centralised, oversight stays consistent, and results are measured against agreed impact rather than isolated task completion.
                            </p>
                        </div>

                    </div>
                </div>
                <div className="flex flex-col lg:hidden mx-auto max-w-7xl px-5 py-10 border border-color">
                    <div className="flex flex-col gap-4">
                        <h6>Ascella Group holds operating authority</h6>
                        <div>
                            <p className="text-b3">
                                Ascella Group defines governance,
                                <span className="text-gray-300">
                                    {" "}decision rights, & accountability across security, technology, workforce, & growth
                                </span>
                                {" "}so all execution flows through a single structured model.
                            </p>
                            <p className="mt-2 text-b3">
                                Operating structure is designed first, roles are aligned to outcomes, and escalation paths are defined clearly so delivery stays controlled as complexity increases.
                            </p>
                        </div>

                    </div>
                    <div className="relative w-full h-[650px] mb-12">
                        <Image
                            src="/howAscellaOperates/flowChartVertical.svg"
                            alt="Operating model diagram"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h6> Execution arms deliver outcomes</h6>
                        <div>
                            <p className="text-b3">
                                Execution units operate within the
                                <span className="text-neutral-500">
                                    {" "}framework set by Ascella, carrying responsibility for delivery
                                </span>
                                {" "}while remaining aligned to shared priorities and defined control paths.
                            </p>
                            <p className="mt-2 text-b3">
                                Accountability remains centralised, oversight stays consistent, and results are measured against agreed impact rather than isolated task completion.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
