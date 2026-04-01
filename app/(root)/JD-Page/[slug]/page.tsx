"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { slideInFromBottom } from "@/utils/motion";
import Reveal from "@/utils/Reveal";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { jobs } from "@/data/jobs";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw1ajViQ58mxRYh7qV9Ofovf3gqTdx6HP4lpVv9FbERnuKzj6vBhHK4rJm3KtYOFgMh7w/exec";

// ─── Top-right Toast ───────────────────────────────────────────
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 9999,
        background: "#111",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "10px",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        animation: "slideInToast 0.3s ease",
        minWidth: "280px",
        maxWidth: "360px",
      }}
    >
      {/* green tick */}
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#22c55e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div style={{ flex: 1 }}>
        <p style={{ color: "#fff", fontSize: "13px", fontWeight: 500, margin: 0 }}>Application Submitted</p>
        <p style={{ color: "#9ca3af", fontSize: "12px", margin: "2px 0 0" }}>{message}</p>
      </div>
      <button
        onClick={onClose}
        style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", padding: 0, fontSize: "16px" }}
      >
        ✕
      </button>
      <style>{`
        @keyframes slideInToast {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Field-level error map type ────────────────────────────────
type FormErrors = Partial<Record<
  "fullName" | "email" | "phoneNumber" | "currentLocation" | "currentRole" | "operatingBackground" | "whyApplying" | "cvLink",
  string
>>;

// ───────────────────────────────────────────────────────────────

export default function ApplicationForm() {
  const params = useParams();
  const slug = params?.slug as string;

  // FIX 1: Find job safely — avoids build-time undefined access on job.title
  const job = jobs.find((j) => j.slug === slug) ?? null;

  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [operatingBackground, setOperatingBackground] = useState("");
  const [whyApplying, setWhyApplying] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FIX 2: Field-level validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // FIX 3: Guard render — keeps TypeScript happy, avoids build error
  if (!slug || !job) return <div>Job not found</div>;

  // ── Validate all required fields ────────────────────────────
  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!fullName.trim())             e.fullName            = "Full Name is mandatory";
    if (!email.trim())                e.email               = "Email is mandatory";
    if (!phoneNumber.trim())          e.phoneNumber         = "Phone Number is mandatory";
    if (!currentLocation.trim())      e.currentLocation     = "Current Location is mandatory";
    if (!currentRole.trim())          e.currentRole         = "Current Role is mandatory";
    if (!operatingBackground.trim())  e.operatingBackground = "Operating Background is mandatory";
    if (!whyApplying.trim())          e.whyApplying         = "This field is mandatory";
    if (!cvLink.trim())               e.cvLink              = "CV Link is mandatory";
    return e;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Run validation before anything else
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop — don't submit
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          jobTitle: job?.title ?? "Unknown Role",
          fullName,
          email,
          phoneNumber,
          currentLocation,
          currentRole,
          operatingBackground,
          whyApplying,
          cvLink,
        }),
      });

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCurrentLocation("");
      setCurrentRole("");
      setOperatingBackground("");
      setWhyApplying("");
      setCvLink("");
      setShowToast(true);
    } catch (error) {
      alert("Submit error: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {showToast && (
        <Toast
          message="We'll review your application and get back to you."
          onClose={() => setShowToast(false)}
        />
      )}

      <section className="relative border-y border-color mb-20">
        <div className="md:mx-10 lg:mx-20 xl:mx-24 md:border-x border-color px-10 lg:px-0">
          <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[450px_1fr] lg:gap-16">

            {/* LEFT COLUMN */}
            <aside className="order-2 pb-10 lg:order-1 lg:border-r border-color">
              <div className="w-full lg:sticky lg:top-10">
                <Reveal variants={slideInFromBottom(0.2)} className="lg:border-b border-color pb-4">
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
                      alt="Logo"
                      width={120}
                      height={80}
                      style={{ height: "auto" }}
                    />
                  </div>
                  <h5 className="mb-2 lg:px-4">APPLY FOR THIS ROLE</h5>
                  <p className="text-b3 text-gray-100 lg:px-4">
                    Applications are reviewed through Ascella's structured evaluation
                    and alignment process.
                  </p>
                </Reveal>

                <form onSubmit={handleSubmit} className="space-y-2 mt-4 lg:mt-0 lg:px-4 pt-4">
                  <Reveal variants={slideInFromBottom(0.4)} className="grid grid-cols-2 gap-2">
                    <Input
                      label="Full Name"
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); setErrors((prev) => ({ ...prev, fullName: undefined })); }}
                      error={errors.fullName}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                      error={errors.email}
                    />
                    <Input
                      label="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => { setPhoneNumber(e.target.value); setErrors((prev) => ({ ...prev, phoneNumber: undefined })); }}
                      error={errors.phoneNumber}
                    />
                    <Input
                      label="Current Location"
                      value={currentLocation}
                      onChange={(e) => { setCurrentLocation(e.target.value); setErrors((prev) => ({ ...prev, currentLocation: undefined })); }}
                      error={errors.currentLocation}
                    />
                  </Reveal>

                  <Reveal variants={slideInFromBottom(0.6)}>
                    <Input
                      label="Current role / professional title"
                      value={currentRole}
                      onChange={(e) => { setCurrentRole(e.target.value); setErrors((prev) => ({ ...prev, currentRole: undefined })); }}
                      error={errors.currentRole}
                    />
                  </Reveal>

                  <Reveal variants={slideInFromBottom(0.8)}>
                    <Textarea
                      label="Operating background"
                      placeholder="Describe the operating environments you have worked within, including governance, accountability structures, and delivery models."
                      value={operatingBackground}
                      onChange={(e) => { setOperatingBackground(e.target.value); setErrors((prev) => ({ ...prev, operatingBackground: undefined })); }}
                      error={errors.operatingBackground}
                    />
                  </Reveal>

                  <Reveal variants={slideInFromBottom(1)}>
                    <Textarea
                      label="Why are you applying for this role?"
                      placeholder="Explain how your experience aligns with the responsibilities and operating context of this role."
                      value={whyApplying}
                      onChange={(e) => { setWhyApplying(e.target.value); setErrors((prev) => ({ ...prev, whyApplying: undefined })); }}
                      error={errors.whyApplying}
                    />
                  </Reveal>

                  <Reveal variants={slideInFromBottom(0.2)}>
                    <Input
                      label="CV Link"
                      value={cvLink}
                      onChange={(e) => { setCvLink(e.target.value); setErrors((prev) => ({ ...prev, cvLink: undefined })); }}
                      error={errors.cvLink}
                    />
                  </Reveal>

                  {/* ── Submit Button ── */}
                  <Reveal variants={slideInFromBottom(0.4)}>
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group flex items-center gap-3 border border-color transition-all duration-300 px-5 py-2.5 text-b3 text-white hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                        {!isSubmitting && (
                          <svg
                            className="transition-transform duration-300 group-hover:translate-x-1"
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                          >
                            <path
                              d="M0.293 4.85355H11.293M11.293 4.85355L6.793 0.353546M11.293 4.85355L6.793 9.35355"
                              stroke="currentColor"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </Reveal>
                </form>
              </div>
            </aside>

            {/* RIGHT COLUMN */}
            <main className="order-1 lg:order-2 py-16 lg:py-10 lg:pr-16">
              <div>
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
                  <h3 className="text-[20px] lg:text-[36px]">{job?.title ?? "Unknown Role"}</h3>
                  <span className="text-b3 text-gray-200">
                    Posted on <span className="text-white">06 Feb 2026</span>
                  </span>
                </Reveal>

                <Reveal variants={slideInFromBottom(0.6)}>
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
                </Reveal>

                <Reveal variants={slideInFromBottom(0.8)}>
                  <h3 className="text-[20px] lg:text-[36px]">Job Description</h3>
                </Reveal>
                <Reveal variants={slideInFromBottom(1)} className="mb-10">
                  <div className="lg:block hidden text-b1 uppercase">ROLE OVERVIEW</div>
                  <p className="text-b3 text-gray-100">
                    This role operates within Ascella's governed execution environment and contributes directly to delivery
                    accountability, risk management, and operating control. The role is designed for professionals experienced
                    in structured operating models and accountability-led execution.
                  </p>
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
                    This role operates inside Ascella's controlled delivery structure under central oversight. Work is
                    coordinated across portfolios and internal stakeholders, with decision rights and escalation paths
                    defined prior to delivery initiation.
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
                    This role is part of Ascella's execution arm structure and operates under the Group's accountability
                    framework.
                  </Section>
                </Reveal>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Input ─────────────────────────────────────────────────────
type InputProps = {
  label: string;
  type?: string;
  value?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Input({ label, type = "text", value, onChange, error }: InputProps) {
  return (
    <div>
      <label className="block text-b3 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full bg-gray-500 border rounded-lg p-2 text-b3 outline-none transition ${
          error ? "border-red-500 focus:border-red-400" : "border-color focus:border-gray-200"
        }`}
      />
      {error && <p className="text-red-400 text-[11px] mt-1">{error}</p>}
    </div>
  );
}

// ─── Textarea ──────────────────────────────────────────────────
type TextareaProps = {
  label: string;
  placeholder?: string;
  value?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

function Textarea({ label, placeholder, value, onChange, error }: TextareaProps) {
  return (
    <div>
      <label className="block text-b3 mb-1">{label}</label>
      <textarea
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-gray-500 border rounded-lg p-2 text-b3 text-gray-100 placeholder:text-gray-300 outline-none transition resize-none ${
          error ? "border-red-500 focus:border-red-400" : "border-color focus:border-gray-200"
        }`}
      />
      {error && <p className="text-red-400 text-[11px] mt-1">{error}</p>}
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────
type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-10">
      <div className="text-[14px] tracking-wide uppercase mb-4">{title}</div>
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