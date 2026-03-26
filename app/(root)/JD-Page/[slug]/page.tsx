"use client";

import OutlineBtn from "@/components/btns/OutlineBtn";
import { slideInFromBottom } from "@/utils/motion";
import Reveal from "@/utils/Reveal";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ApplicationForm() {
    const router = useRouter();

    return (
        <section className="relative border-y border-color mb-20">
            <div className="md:mx-10 lg:mx-20 xl:mx-24 md:border-x border-color px-10 lg:px-0">
                <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[450px_1fr] lg:gap-16">

                    {/* LEFT COLUMN */}
                    <aside className="order-2 pb-10 lg:order-1 lg:border-r border-color">
                        <div className="w-full lg:sticky lg:top-10">
                            <Reveal variants={slideInFromBottom(0.2)} className="lg:border-b border-color  pb-4">
                                <button
                                    onClick={() => router.push("/JD-Page")}
                                    className="hidden lg:flex w-full py-6 lg:px-4 mb-4 border-b border-color items-center gap-2 text-b2 text-gray-100 hover:text-white transition">
                                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                        <path
                                            d="M11.707 4.85355H0.707031M0.707031 4.85355L5.20703 0.353546M0.707031 4.85355L5.20703 9.35355"
                                            stroke="currentColor"
                                        />
                                    </svg>
                                    <p className="text-b3">See all jobs</p>
                                </button>
                                <div className="lg:px-4 mb-4">
                                    <Image
                                        src="/logo.svg"
                                        alt="Logo" width={120} height={80} />
                                </div>

                                <h5 className="mb-2 lg:px-4">APPLY FOR THIS ROLE</h5>

                                <p className="text-b3 text-gray-100 lg:px-4">
                                    Applications are reviewed through Ascella's structured evaluation
                                    and alignment process.
                                </p>
                            </Reveal>

                            <form className="space-y-2 mt-4 lg:mt-0 lg:px-4 pt-4">
                                <Reveal variants={slideInFromBottom(0.4)} className="grid grid-cols-2 gap-2">
                                    <Input label="Full Name" />
                                    <Input label="Email" type="email" />
                                    <Input label="Phone Number" />
                                    <Input label="Current Location" />
                                </Reveal>

                                <Reveal variants={slideInFromBottom(0.6)}>
                                    <Input label="Current role / professional title" />
                                </Reveal>

                                <Reveal variants={slideInFromBottom(0.8)}>
                                    <Textarea
                                        label="Operating background"
                                        placeholder="Describe the operating environments you have worked within, including governance, accountability structures, and delivery models."
                                    />
                                </Reveal>

                                <Reveal variants={slideInFromBottom(1)}>
                                    <Textarea
                                        label="Why are you applying for this role?"
                                        placeholder="Explain how your experience aligns with the responsibilities and operating context of this role."
                                    />
                                </Reveal>

                                <Reveal variants={slideInFromBottom(0.2)}>
                                    <Input label="CV Link" />
                                </Reveal>
                                {/* Submit */}
                                <Reveal variants={slideInFromBottom(0.4)}>
                                    <div className="pt-2">
                                        <OutlineBtn text="Submit" size="md" color="white" />
                                    </div>
                                </Reveal>
                            </form>
                        </div>
                    </aside>

                    {/* RIGHT COLUMN */}
                    <main className="order-1 lg:order-2 py-16 lg:py-10 lg:pr-16">
                        <div>
                            <div className="">
                                <Reveal variants={slideInFromBottom(0.2)}>
                                    <button
                                        onClick={() => router.push("/JD-Page")}
                                        className="lg:hidden flex mb-6 items-center gap-2 text-b2 text-gray-200 hover:text-white transition">
                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                            <path
                                                d="M11.707 4.85355H0.707031M0.707031 4.85355L5.20703 0.353546M0.707031 4.85355L5.20703 9.35355"
                                                stroke="currentColor"
                                            />
                                        </svg>
                                        <p className="text-b3">See all jobs</p>
                                    </button>
                                </Reveal>
                                <Reveal variants={slideInFromBottom(0.4)} className="flex gap-2 sm:items-center justify-between mb-10">
                                    <h3 className="text-[20px] lg:text-[36px] lg:mb-10">Security Governance Lead</h3>
                                    <span className="text-b3 text-gray-200">
                                        Posted on <span className="text-white">06 Feb 2026</span>
                                    </span>
                                </Reveal>

                                <Reveal variants={slideInFromBottom(0.6)}>
                                    <div className="flex  flex-wrap justify-between gap-y-2 text-b3 mb-10">
                                        <div>
                                            <span className="text-b3 text-gray-300">Operating entity</span>
                                            <div className="text-b2 uppercase">ASCELLA INFOSEC</div>
                                        </div>
                                        <div>
                                            <span className="text-b3 text-gray-300">Working model</span>
                                            <div>REMOTE</div>
                                        </div>
                                        <div>
                                            <span className="text-b3 text-gray-300">Role type</span>
                                            <div>FULL TIME</div>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                            <Reveal variants={slideInFromBottom(0.8)}>
                                    <h3 className="text-[20px] lg:text-[36px]">Job Description</h3>
                            </Reveal>
                            <Reveal variants={slideInFromBottom(1)} className="mb-10">
                                <div className="lg:block hidden text-b1 uppercase">ROLE OVERVIEW</div>
                                <p className="text-b3 text-gray-100">This role operates within Ascella’s governed execution environment and contributes directly to delivery accountability, risk management, and operating control.
                                    The role is designed for professionals experienced in structured operating models and accountability-led execution.</p>
                            </Reveal>
                            <Reveal variants={slideInFromBottom(1.2)}>
                                <Section title="Scope of Responsibility">
                                    <ul>
                                        <li>Ownership of defined execution outcomes within the assigned delivery domain</li>
                                        <li>Contribution to operating governance and oversight mechanisms</li>
                                        <li>Participation in escalation and risk management processes</li>
                                        <li>Coordination with cross-unit delivery teams and internal stakeholders</li>
                                    </ul>
                                </Section>
                            </Reveal>
                            <Reveal variants={slideInFromBottom(1.4)}>
                                <Section title="Accountability Expectations">
                                    <ul>
                                        <li>Clear ownership of assigned delivery outcomes</li>
                                        <li>Participation in performance and delivery reviews</li>
                                        <li>Alignment with documented operating and governance requirements</li>
                                        <li>Active involvement in escalation and decision processes</li>
                                    </ul>
                                </Section>
                            </Reveal>
                            <Reveal variants={slideInFromBottom(0.2)}>
                                <Section title="Operating Context">
                                    This role operates inside Ascella’s controlled delivery structure under
                                    central oversight. Work is coordinated across portfolios and internal
                                    stakeholders, with decision rights and escalation paths defined prior to
                                    delivery initiation.
                                </Section>
                            </Reveal>
                            <Reveal variants={slideInFromBottom(0.6)}>
                                <Section title="Reporting & Governance Structure">
                                    <ul>
                                        <li>Reports to assigned delivery governance lead</li>
                                        <li>Aligned to central delivery oversight</li>
                                        <li>Participates in structured review and escalation forums</li>
                                    </ul>
                                </Section>
                            </Reveal>
                            <Reveal variants={slideInFromBottom(0.8)}>
                                <Section title="Experience & Capability Requirements">
                                    <ul>
                                        <li>Experience operating within structured delivery environments</li>
                                        <li>Exposure to accountability-based governance models</li>
                                        <li>Ability to operate autonomously within defined constraints</li>
                                        <li>Comfort working under defined governance and reporting structures</li>
                                    </ul>
                                </Section>
                            </Reveal>
                            <Reveal variants={slideInFromBottom(1)}>
                                <Section title="Additional Information">
                                    This role is part of Ascella’s execution arm structure and operates under
                                    the Group’s accountability framework.
                                </Section>
                            </Reveal>
                        </div>
                    </main>
                </div>
            </div >

        </section >
    );
}

type InputProps = {
    label: string;
    type?: string;
};

function Input({ label, type = "text" }: InputProps) {
    return (
        <div>
            <label className="block text-b3 mb-1">{label}</label>
            <input
                type={type}
                className="w-full bg-gray-500 border border-color rounded-lg p-2 text-b3 outline-none focus:border-gray-200 transition"
            />
        </div>
    );
}

type TextareaProps = {
    label: string;
    placeholder?: string;
};

function Textarea({ label, placeholder }: TextareaProps) {
    return (
        <div>
            <label className="block text-b3 mb-1">{label}</label>
            <textarea
                rows={3}
                placeholder={placeholder}
                className="w-full  bg-gray-500 border border-color rounded-lg p-2 text-b3 text-gray-100 placeholder:text-gray-300 outline-none focus:border-gray-200 transition resize-none"
            />
        </div>
    );
}
type SectionProps = {
    title: string;
    children: React.ReactNode;
};
function Section({ title, children }: SectionProps) {
    return (
        <section className="mb-10">
            <div className="text-[14px] tracking-wide uppercase mb-4">
                {title}
            </div>

            <div
                className="
                    text-b2 text-gray-100 leading-relaxed
                    [&>ul]:list-disc
                    [&>ul]:pl-6
                    [&>ul]:space-y-2
                    [&>ul>li]:marker:text-gray-100
                "
            >
                {children}
            </div>
        </section>
    );
}

