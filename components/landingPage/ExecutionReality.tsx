import React from "react";
import PlusHeading from "../headings/PlusHeading";

type ProblemItem = {
    title: string;
    subHeading: string;
    description: string;
    icon: React.ReactNode;
};

const items: ProblemItem[] = [
    {
        title: "Diffuse Ownership",
        subHeading: "No single accountable owner",
        description:
            "Work moves across roles and partners without a clear decision holder, forcing coordination to replace authority and causing outcomes to drift despite visible activity.",
        icon: (
            <svg width="122" height="122" viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="49" y="0.5" width="24" height="121" stroke="white" />
                <rect x="0.5" y="73" width="24" height="121" transform="rotate(-90 0.5 73)" stroke="white" />
                <rect x="25" y="96.5" width="71" height="72" transform="rotate(-90 25 96.5)" stroke="white" />
            </svg>
        ),
    },
    {
        title: "Priority Drift",
        subHeading: "Effort without shared direction",
        description:
            "Teams execute against local goals instead of common outcomes. Work advances in parallel but pulls in different directions. Results weaken as alignment stays informal.",
        icon: (
            <svg width="123" height="123" viewBox="0 0 123 123" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="122" height="122" stroke="white" />
                <rect x="2.18172" y="61.5" width="83.8711" height="83.8711" transform="rotate(-45 2.18172 61.5)" stroke="white" />
                <rect x="31.1827" y="61.5" width="42.8582" height="42.8582" transform="rotate(-45 31.1827 61.5)" stroke="white" />
                <rect x="46.2071" y="61.5" width="21.6105" height="21.6105" transform="rotate(-45 46.2071 61.5)" stroke="white" />
                <rect x="31.4873" y="31.5" width="60" height="60" stroke="white" />
                <rect x="46.4873" y="46.5" width="30" height="30" stroke="white" />
                <rect x="0.5" y="-0.5" width="14" height="14" transform="matrix(1 0 0 -1 53.9873 68)" stroke="white" />
            </svg>
        ),
    },
    {
        title: "Leadership Drain",
        subHeading: "Focus lost to coordination",
        description:
            "Senior leaders spend time resolving handoffs and conflicts. Strategic work gives way to operational fixes. Energy drains as execution lacks structure.",
        icon: (
            <svg width="124" height="123" viewBox="0 0 124 123" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="61.5" cy="61.5" r="61" stroke="white" />
                <circle cx="61.5" cy="61.5" r="25" stroke="white" />
                <line x1="62.5" y1="2.18557e-08" x2="62.5" y2="123" stroke="white" />
                <line x1="0.495117" y1="60.9951" x2="123.495" y2="60.9951" stroke="white" />
                <line x1="18.1513" y1="104.63" x2="44.1513" y2="78.6301" stroke="white" />
                <line x1="78.6464" y1="43.6464" x2="104.646" y2="17.6464" stroke="white" />
                <line x1="44.1513" y1="44.3702" x2="18.1513" y2="18.3702" stroke="white" />
                <line x1="104.646" y1="105.354" x2="78.6464" y2="79.3536" stroke="white" />
            </svg>

        ),
    },
];

export default function ExecutionProblemSection() {
    return (
        <section className="py-24">
            <div className="border-b border-gray-400 lg:px-15">
                <div className="flex flex-col md:flex-row md:justify-between gap-12 pb-12 px-20">
                    <p className="max-w-md text-b3 leading-relaxed">
                        Execution breaks when responsibility spreads across teams, vendors, and functions. Work continues, effort stays high, yet outcomes drift. Decisions slow, risks surface late, and delivery feels unstable. The failure sits in structure and ownership, not effort or intent.
                    </p>

                    <h3 className="max-w-lg text-right">
                        <span className="text-white">The Execution Problem </span>
                        <span className="text-gray-200">
                            Modern Organisations Face
                        </span>
                    </h3>
                </div>
            </div>

            <div className="border-b border-gray-400 lg:px-15">
                <div className="flex items-center gap-3 py-8 px-20 tracking-widest uppercase ">
                    <PlusHeading text="Execution Policy" size="b1" plusSize="lg"/> 
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-400 lg:px-15">
                {items.map((item, index) => (
                    <div
                        key={item.title}
                        className={`px-20 py-25 min-h-105 flex flex-col border-gray-400 ${index !== 0 ? "md:border-l border-t md:border-t-0" : ""}`}
                    >
                        <div className="pb-10 border-b border-gray-400">
                            {item.icon}
                        </div>

                        <h4 className="mb-2 mt-6 ">
                            {item.title}
                        </h4>

                        <div className="w-10 h-px mb-4" />
                        <p className="text-b1 mb-4 text-gray-100 font-thin" >
                            {item.subHeading}
                        </p>

                        <p className="text-b3 leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
