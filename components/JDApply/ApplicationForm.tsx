"use client";

import PartialOutlineBtn from "../btns/PartialOutlineBtn";

export default function ApplicationForm() {
    return (
        <section className="relative border-y border-color my-5">

            <div className="relative">
                <div className="grid grid-cols-[96px_420px_1fr_96px] relative min-h-screen">

                    {/* Vertical grid lines */}
                    <div className="absolute inset-0 grid grid-cols-[96px_420px_1fr_96px] pointer-events-none z-0">
                        <div className="border-r border-color" />
                        <div className="border-r border-color" />
                        <div className="border-r border-color" />
                        <div />
                    </div>


                    {/* LEFT COLUMN */}

                   <aside className="relative col-start-2">
                        <div className="sticky top-0 w-full max-w-md">
                            <div className="border-b border-color p-5">
                                <button className="mb-6 flex items-center gap-2 text-b2 text-gray-200 hover:text-white transition">
                                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                        <path
                                            d="M11.707 4.85355H0.707031M0.707031 4.85355L5.20703 0.353546M0.707031 4.85355L5.20703 9.35355"
                                            stroke="currentColor"
                                        />
                                    </svg>
                                    <p className="text-b3">See all jobs</p>
                                </button>

                                <h5 className="mb-2 tracking-wide">APPLY FOR THIS ROLE</h5>

                                <p className="text-b3 text-gray-100 w-xs">
                                    Applications are reviewed through Ascella's structured evaluation
                                    and alignment process.
                                </p>
                            </div>
                            <form className="space-y-5 p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Full Name" />
                                    <Input label="Email" type="email" />
                                    <Input label="Phone Number" />
                                    <Input label="Current Location" />
                                </div>

                                <Input label="Current role / professional title" />

                                <Textarea
                                    label="Operating background"
                                    placeholder="Describe the operating environments you have worked within, including governance, accountability structures, and delivery models."
                                />

                                <Textarea
                                    label="Why are you applying for this role?"
                                    placeholder="Explain how your experience aligns with the responsibilities and operating context of this role."
                                />

                                <div>
                                    <label className="block text-b2 mb-2 text-gray-300">
                                        Upload CV
                                    </label>
                                    <label className="inline-flex cursor-pointer items-center justify-center text-b2  bg-gray-500 border border-color rounded-lg px-4 py-4 text-gray-100 placeholder:text-gray-300 outline-none hover:border-gray-200 transition resize-none ">
                                        Upload File
                                        <input type="file" className="hidden" />
                                    </label>
                                </div>

                                {/* Submit */}
                                <div className="pt-6">
                                    <PartialOutlineBtn text="Submit" />
                                </div>
                            </form>
                        </div>
                    </aside>

                    {/* RIGHT COLUMN */}
                    <main className="relative col-start-3 px-15 py-20">
                        <div>
                            <div className="max-w-lg">
                                <h3 className="mb-10">Security Governance Lead</h3>

                                <div className="flex flex-wrap justify-between gap-y-2 text-b3 mb-10">
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
                            </div>
                            <div className="flex items-center justify-between mb-10">
                                <h4>Job Description</h4>
                                <span className="text-b3 text-gray-200">
                                    Posted on <span className="text-white">06 Feb 2026</span>
                                </span>
                            </div>

                            <div className="mb-10">
                                <div className="text-b1 uppercase">ROLE OVERVIEW</div>
                                <p className="text-b3 text-gray-200">This role operates within Ascella’s governed execution environment and contributes directly to delivery accountability, risk management, and operating control.
                                    The role is designed for professionals experienced in structured operating models and accountability-led execution.</p>
                            </div>

                            <Section title="Scope of Responsibility">
                                <ul>
                                    <li>Ownership of defined execution outcomes within the assigned delivery domain</li>
                                    <li>Contribution to operating governance and oversight mechanisms</li>
                                    <li>Participation in escalation and risk management processes</li>
                                    <li>Coordination with cross-unit delivery teams and internal stakeholders</li>
                                </ul>
                            </Section>

                            <Section title="Accountability Expectations">
                                <ul>
                                    <li>Clear ownership of assigned delivery outcomes</li>
                                    <li>Participation in performance and delivery reviews</li>
                                    <li>Alignment with documented operating and governance requirements</li>
                                    <li>Active involvement in escalation and decision processes</li>
                                </ul>
                            </Section>

                            <Section title="Operating Context">
                                This role operates inside Ascella’s controlled delivery structure under
                                central oversight. Work is coordinated across portfolios and internal
                                stakeholders, with decision rights and escalation paths defined prior to
                                delivery initiation.
                            </Section>

                            <Section title="Reporting & Governance Structure">
                                <ul>
                                    <li>Reports to assigned delivery governance lead</li>
                                    <li>Aligned to central delivery oversight</li>
                                    <li>Participates in structured review and escalation forums</li>
                                </ul>
                            </Section>

                            <Section title="Experience & Capability Requirements">
                                <ul>
                                    <li>Experience operating within structured delivery environments</li>
                                    <li>Exposure to accountability-based governance models</li>
                                    <li>Ability to operate autonomously within defined constraints</li>
                                    <li>Comfort working under defined governance and reporting structures</li>
                                </ul>
                            </Section>

                            <Section title="Additional Information">
                                This role is part of Ascella’s execution arm structure and operates under
                                the Group’s accountability framework.
                            </Section>
                        </div>
                    </main>
                </div>
            </div>

        </section>
    );
}

type InputProps = {
    label: string;
    type?: string;
};

function Input({ label, type = "text" }: InputProps) {
    return (
        <div>
            <label className="block text-b2 mb-2 text-gray-100">{label}</label>
            <input
                type={type}
                className="w-full bg-gray-500 border border-color rounded-lg px-4 py-4 text-b2 outline-none focus:border-gray-200 transition"
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
            <label className="block text-b2 mb-2 text-gray-100">{label}</label>
            <textarea
                rows={5}
                placeholder={placeholder}
                className="w-full  bg-gray-500 border border-color rounded-lg px-4 py-2 text-b2 text-gray-100 placeholder:text-gray-400 outline-none focus:border-gray-200 transition resize-none"
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
            <div className="text-b1 tracking-wide uppercase mb-4">
                {title}
            </div>

            <div
                className="
                    text-b2 text-gray-200 leading-relaxed

                    [&>ul]:list-disc
                    [&>ul]:pl-6
                    [&>ul]:space-y-2

                    [&>ul>li]:marker:text-gray-400
                "
            >
                {children}
            </div>
        </section>
    );
}

