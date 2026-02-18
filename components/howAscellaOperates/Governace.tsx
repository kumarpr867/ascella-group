"use client"
import OutlineBtn from "../btns/OutlineBtn";
import PlusHeading from "../headings/PlusHeading";
import Image from "next/image"

const points = [
    {
        svg: (
            <svg width="42" height="28" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7" y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="14" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="14" y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="35" y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="28" y="6" width="7" height="7" className="fill-gray-400" />
                <rect y="21" width="7" height="7" className="fill-gray-400" />
                <rect x="7" y="21" width="7" height="7" className="fill-gray-400" />
                <rect y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="7" width="7" height="7" className="fill-gray-400" />
            </svg>
        ),
        count: "01",
<<<<<<< HEAD
        heading: "Decision and approval structures",
        description: "Clear decision rights and approval pathways are defined to prevent delays and ambiguity.",
    },
    {
        svg: (
            <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="14" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="14" width="7" height="7" className="fill-gray-400" />
                <rect y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="14" y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="14" y="21" width="7" height="7" className="fill-gray-400" />
                <rect x="27" y="7" width="7" height="7" className="fill-gray-400" />
            </svg>
        ),
        count: "02",
        heading: "Escalation and risk pathways",
        description: "Structured escalation routes ensure risks are surfaced early and addressed through defined authority channels.",
    },
    {
        svg: (
            <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="21" width="7" height="7" className="fill-gray-400" />
                <rect x="28" y="14" width="7" height="7" className="fill-gray-400" />
                <rect y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="7" y="21" width="7" height="7" className="fill-gray-400" />
                <rect x="7" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="14" width="7" height="7" className="fill-gray-400" />
            </svg>
        ),
        count: "03",
        heading: "Performance measurement frameworks",
        description: "KPIs and SLAs are agreed upfront to maintain visibility into progress, quality, and delivery health.",
    },
    {
        svg: (
            <svg width="35" height="21" viewBox="0 0 35 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7" y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="14" y="21" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="21" y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="28" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="7" y="14" width="7" height="7" className="fill-gray-400" />
                <rect y="14" width="7" height="7" className="fill-gray-400" />
                <rect x="7" width="7" height="7" className="fill-gray-400" />
                <rect x="14" y="7" width="7" height="7" className="fill-gray-400" />
                <rect x="21" width="7" height="7" className="fill-gray-400" />
            </svg>
        ),
        count: "04",
        heading: "Governance frameworks",
        description: "Governance frameworks align with regulatory, security, and audit requirements from the outset.",
    },
];
=======
        heading: "Decision and approval design",
        description: "Clear decision ownership, approval layers, and authority limits are established early so execution moves without confusion, delays, or overlapping mandates."
    },
    {
        svg: <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="21" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="21" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="27" y="7" width="7" height="7" fill="#3D3D3D" />
        </svg>
        ,
        count: "01",
        heading: "Escalation and risk control",
        description: "Defined escalation routes and review checkpoints ensure risks surface quickly and reach accountable decision holders before impact spreads."
    },
    {
        svg: <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="14" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="21" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="21" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="28" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="7" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="7" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" width="7" height="7" fill="#3D3D3D" />
        </svg>
        ,
        count: "01",
        heading: "Performance and outcome tracking",
        description: "KPIs, SLAs, and outcome thresholds are agreed at the outset to maintain visibility into progress, quality, and operational stability."
    },
    {
        svg: <svg width="35" height="21" viewBox="0 0 35 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="21" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="28" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect y="14" width="7" height="7" fill="#3D3D3D" />
            <rect width="7" height="7" fill="#3D3D3D" />
            <rect x="7" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" width="7" height="7" fill="#3D3D3D" />
        </svg>,
        count: "01",
        heading: "Compliance and oversight alignment",
        description: "Governance structures are aligned with regulatory, audit, and security requirements from the start so delivery remains controlled under external scrutiny."
    }
]
>>>>>>> a19ec7e4b85e71cc1ad7b27ca31149049a18e767

export default function Governace() {
    return (
        <section className="flex flex-col p-15 lg:p-25">
            <div className="flex flex-col gap-12 mb-20">
                <div className="flex flex-col gap-5 max-w-3xl leading-relaxed">
                    <PlusHeading text="GOVERNANCE & OVERSIGHT" size="b1" />
                    <h3>Governance operates as the control layer that keeps execution aligned, accountable, <span className="text-gray-300">and auditable as organisations grow in size and structural complexity.</span>
                    </h3>
                </div>
                <div className="flex justify-between gap-48">
                    <p className="font-extralight text-sm">Ascella Group defines decision rights, approval hierarchies, escalation paths, and oversight mechanisms before execution begins so every initiative runs within clear authority, measurable checkpoints, and structured accountability rather than informal coordination.
                    </p>
                    <p>As organisations expand across multiple teams and external partners, governance prevents ownership from diffusing, ensures risks surface early through defined review cycles, and keeps execution stable instead of reactive as operational pressure increases.</p>
                </div>
            </div>

            <div className="flex flex-center leading-tight gap-48 border-y border-color py-15">
                <div className="flex flex-col justify-between gap-32">
                    <Image src="/HowWeOperate.png" alt="How We Operate" width={450} height={250} />
                    <div className="flex flex-col gap-5">
                        <Image src={"/OperatingStructure/GovernaceStar.svg"} alt="starimage" width={80} height={80}/>
                        <h5 className="text-gray-300" >Governance is designed in, not <br />  enforced later.</h5>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                        <h3>Before execution</h3>
                        <p className="text-gray-300 font-light max-w-lg">
                            Begins, Ascella establishes
                        </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        {points.map((point, index) => (
                            <div key={index} className="flex flex-col gap-2.5 bg-card p-6 rounded-2xl">
                                <div className="flex justify-between w-full">
                                    <div className="mb-4">{point.svg}</div>
                                    <span className="text-xl font-thin mb-2">{point.count}</span>
                                </div>
                                <h5 className="leading-tight mb-2">{point.heading}</h5>
                                <p className="text-gray-300 text-b3 max-w-xs">{point.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-center">
                <div className=" w-0.5 h-10 bg-gray-400">
                </div>
                <OutlineBtn text="Explore With Us"/>
            </div>

        </section>
    )
}
