'use client';

import { useRef } from 'react';
import Image from 'next/image';
import PartialOutlineBtn from '../btns/PartialOutlineBtn';
import PlusHeading from '../headings/PlusHeading';

export default function Ownership() {
    const rightRef = useRef<HTMLDivElement | null>(null);

    return (
        <section className="relative bg-black text-white">
            <div className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid grid-cols-[260px_1fr] gap-24 items-start">
                    <aside className="sticky top-32 self-start border-r border-color pr-6">
                        <PlusHeading text="Ownership" />

                        <ul className="space-y-4 text-sm my-10">
                            <li className="text-white font-medium">Security & Risk Posture</li>
                            <li className="text-white/50 hover:text-white transition">
                                Technology Execution
                            </li>
                            <li className="text-white/50 hover:text-white transition">
                                Workforce Readiness
                            </li>
                            <li className="text-white/50 hover:text-white transition">
                                Operational Control
                            </li>
                            <li className="text-white/50 hover:text-white transition">
                                Revenue Enablement
                            </li>
                        </ul>

                        <PartialOutlineBtn />
                    </aside>

                    {/* RIGHT */}
                    <div
                        ref={rightRef}
                        className="sticky top-32 self-start h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain pr-6 space-y-24"
                    >

                        <Section
                            image="/Security.png"
                            title="Security & Risk Posture"
                            description="We assess every aspect of your technical risk by identifying,
              prioritizing, and addressing vulnerabilities."
                        />

                        <Section
                            image="/Technology.png"
                            title="Technology Execution"
                            description="We execute delivery of robust, scalable technology solutions."
                        />

                        <Section
                            image="/Workforce.png"
                            title="Workforce Readiness"
                            description="We prepare teams to operate and scale complex systems."
                        />

                        <Section
                            image="/Operational.png"
                            title="Operational Control"
                            description="We establish clarity, ownership, and operational confidence."
                        />

                        <Section
                            image="/Technology.png"
                            title="Revenue Enablement"
                            description="We align technology execution with commercial outcomes."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Section({
    image,
    title,
    description,
}: {
    image: string;
    title: string;
    description: string;
}) {
    return (
        <div className="pt-2 flex flex-col items-center text-center">
            <Image src={image} alt={title} width={500} height={250} />
            <h3 className="text-2xl mb-4 mt-6">{title}</h3>
            <p className="max-w-xl text-white/60">{description}</p>
        </div>
    );
}
