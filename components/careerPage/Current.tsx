"use client";

import React from "react";
import Image from "next/image";
import { LayoutGrid, Target, Settings, ShieldCheck } from "lucide-react";

const CurrentOpenings = () => {
  const gridData = [
    { id: 1, empty: true },
    {
      id: 2,
      title: "Scope of responsibility",
      icon: <Target className="w-6 h-6 text-gray-200" />,
      description:
        "The outcomes the role owns, the decisions it is accountable for, and the execution areas it governs.",
    },
    {
      id: 3,
      title: "Accountability expectations",
      icon: <ShieldCheck className="w-6 h-6 text-gray-200" />,
      description:
        "How responsibility is measured, how delivery is reviewed, and how performance aligns with operating objectives.",
    },
    {
      id: 4,
      title: "Operating context",
      icon: <LayoutGrid className="w-6 h-6 text-gray-200" />,
      description:
        "The execution environment, pod structure, and cross-functional dependencies in which the role operates.",
    },
    { id: 5, empty: true },
    {
      id: 6,
      title: "Reporting and governance structure",
      icon: <Settings className="w-6 h-6 text-gray-200" />,
      description:
        "How the role fits within Ascella's oversight framework, including escalation paths and decision authority.",
    },
  ];

  const cards = gridData.filter((item) => !item.empty);

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex h-screen px-10 overflow-hidden flex-col justify-center bg-black text-white relative -mt-20">
        {/* Background */}
        <div className="absolute left-[-100px] top-[20%] w-2/3 h-4/5 opacity-30 pointer-events-none z-0">
          <Image
            src="/current.png"
            alt="Background Decoration"
            fill
            className="object-contain object-left-top"
            priority
          />
        </div>

        {/* Header */}
        <div className="relative z-10 mb-5 pl-40 max-w-7xl mx-auto w-full mb-5">
          <p className="text-b2 text-[14px] uppercase tracking-[0.3em] text-gray-200 ">
            Roles & Opportunities
          </p>

          <h3 className="text-4xl  leading-tight">
            Current openings are{" "}
            <span className="text-gray-200">aligned to</span>
            <br />
            <span className="pl-40">execution and governance needs.</span>
          </h3>
        </div>

        {/* Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-end">
          <div className="grid grid-cols-3 gap-2">
            {gridData.map((item) => (
              <div
                key={item.id}
                className={`p-6 w-[260px] h-[220px] flex flex-col justify-between transition-all duration-300 ${
                  item.empty
                    ? "bg-transparent"
                    : "bg-black/60 backdrop-blur-md border border-neutral-800"
                }`}
              >
                {!item.empty && (
                  <>
                    <div className="space-y-10">
                      <div className="opacity-80">{item.icon}</div>
                      <h5 className="text-lg font-medium leading-snug">
                        {item.title}
                      </h5>
                    </div>

                    <p className="text-b3 text-[12px] text-gray-200 leading-relaxed">
                      {item.description}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MOBILE / TABLET ================= */}
      <section className="lg:hidden bg-black text-white overflow-hidden">
        {/* Top horizontal grid line */}
        <div className="border-t border-neutral-800 w-full" />

        {/* Content wrapper — same horizontal padding as FAQ mobile */}
        <div className="px-10 pt-[10px] pb-20">

          {/* Header */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-200 mb-3">
              Roles & Opportunities
            </p>
            <h3 className="text-3xl font-light leading-tight">
              Current openings are{" "}
              <span className="text-gray-400">aligned to</span>{" "}
              execution and governance needs.
            </h3>
          </div>

          {/* 5-row, 1-column grid */}
          <div className="grid grid-cols-1">

            {/* Row 1 — Image only */}
            <div className="relative border border-neutral-800 min-h-[260px]">
              <Image
                src="/current.png"
                alt="Decorative Image"
                fill
                className="object-contain"
              />
            </div>

            {/* Rows 2–5 — 4 Cards stacked */}
            {cards.map((item) => (
              <div
                key={item.id}
                className="p-6 min-h-[200px] flex flex-col justify-between border border-t-0 border-neutral-800"
              >
                <div className="space-y-6">
                  <div className="opacity-80">{item.icon}</div>
                  <h5 className="text-base font-medium leading-snug">
                    {item.title}
                  </h5>
                </div>

                <p className="text-[12px] text-gray-300 leading-relaxed mt-4">
                  {item.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
};

export default CurrentOpenings;