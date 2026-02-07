"use client"
import OutlineBtn from "../btns/OutlineBtn";
import PlusHeading from "../headings/PlusHeading";
import Image from "next/image"

const points = [
    {
        svg: <svg width="42" height="28" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="14" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="21" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="35" y="14" width="7" height="7" fill="#3D3D3D" />
            <rect x="28" y="6" width="7" height="7" fill="#3D3D3D" />
            <rect y="21" width="7" height="7" fill="#3D3D3D" />
            <rect x="7" y="21" width="7" height="7" fill="#3D3D3D" />
            <rect y="7" width="7" height="7" fill="#3D3D3D" />
            <rect x="7" width="7" height="7" fill="#3D3D3D" />
        </svg>,
        count: "01",
        heading: "Decision and approval structures",
        description: "Clear decision rights and approval pathways are defined to prevent delays and ambiguity."
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
        heading: "Escalation and risk pathways",
        description: "Structured escalation routes ensure risks are surfaced early and addressed through defined authority channels."
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
        heading: "Performance measurement frameworks",
        description: "KPIs and SLAs are agreed upfront to maintain visibility into progress, quality, and delivery health."
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
        heading: "Audit and compliance alignment",
        description: "Governance frameworks align with regulatory, security, and audit requirements from the outset."
    }
]

export default function Governace() {
    return (
        <section className="flex flex-col p-15 lg:p-25">
            <div className="flex flex-col gap-12 mb-20">
                <div className="flex flex-col gap-5 max-w-2xl leading-relaxed">
                    <PlusHeading text="GOVERNANCE & OVERSIGHT" size="xl" />
                    <p className="2xl md:text-3xl">Governance is the operating system that keeps execution controlled, aligned, and auditable at scale. <span className="text-gray-300">It defines how decisions are made, how risks are surfaced, and how accountability is maintained. </span>
                    </p>
                </div>
                <div className="flex justify-between gap-48">
                    <p className="font-extralight text-sm">Ascella Group designs governance before execution begins. Decision rights, approval structures, escalation paths, and oversight mechanisms are established
                        upfront, ensuring every activity operates within a defined and controlled environment.
                    </p>
                    <p>As organisations grow, execution spans multiple teams, external partners, and layered decision-making structures. Without governance, coordination becomes informal, accountability diffuses, and operational risk increases quietly over time.</p>
                </div>
            </div>

            <div className="flex flex-center leading-tight gap-48 border-y border-color py-15">
                <div className="flex flex-col justify-between gap-32">
                    <Image src="/HowWeOperate.png" alt="How We Operate" width={450} height={250} />
                    <div className="flex flex-col gap-5">
                        <Image src={"/OperatingStructure/GovernaceStar.svg"} alt="starimage" width={80} height={80}/>
                        <p className="text-gray-300" >Governance is designed in, not <br />  enforced later.</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                        <h1 className="2xl md:text-3xl">Before execution</h1>
                        <p className="text-gray-300 font-light max-w-lg">
                            Begins, Ascella establishes
                        </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        {points.map((point, index) => (
                            <div key={index} className="flex flex-col gap-2.5 bg-gray-500 p-6 rounded-2xl">
                                <div className="flex justify-between w-full">
                                    <div className="mb-4">{point.svg}</div>
                                    <span className="text-xl font-thin mb-2">{point.count}</span>
                                </div>
                                <h4 className="leading-tight text-xl mb-2">{point.heading}</h4>
                                <p className="text-gray-300 text-sm max-w-xs">{point.description}</p>
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
