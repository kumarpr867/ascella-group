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

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex relative min-h-screen p-12 overflow-hidden flex-col items-start bg-black text-white">
        {/* Background */}
        <div className="absolute left-[-140px] top-[20%] w-3/4 h-full opacity-30 pointer-events-none z-0">
          <Image
            src="/current.png"
            alt="Background Decoration"
            fill
            className="object-contain object-left-top"
            priority
          />
        </div>

        {/* Header */}
        <div className="relative z-10 mb-16 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-200 mb-4">
            Roles & Opportunities
          </p>

          <h2 className="text-5xl font-light leading-tight">
            Current openings are{" "}
            <span className="text-gray-200">aligned to</span>
            <br />
            execution and governance needs.
          </h2>
        </div>

        {/* Grid */}
        <div className="relative z-10 w-full flex justify-end">
          <div className="grid grid-cols-3 gap-6">
            {gridData.map((item) => (
              <div
                key={item.id}
                className={`p-8 w-[289px] h-[270px] flex flex-col justify-between transition-all duration-300 ${
                  item.empty
                    ? "bg-transparent"
                    : "bg-black/60 backdrop-blur-md border border-neutral-800"
                }`}
              >
                {!item.empty && (
                  <>
                    <div className="space-y-6">
                      <div className="opacity-80">{item.icon}</div>
                      <h3 className="text-xl font-medium leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-200 leading-relaxed">
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
      <section className="lg:hidden relative bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-200 mb-4">
              Roles & Opportunities
            </p>

            <h2 className="text-3xl md:text-4xl font-light leading-tight">
              Current openings are{" "}
              <span className="text-gray-200">aligned to</span>
              <br className="hidden sm:block" />
              execution and governance needs.
            </h2>
          </div>

          {/* Image */}
          <div className="relative border border-neutral-800 min-h-[260px] mb-6">
            <Image
              src="/current.png"
              alt="Decorative Image"
              fill
              className="object-contain"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gridData
              .filter((item) => !item.empty)
              .map((item) => (
                <div
                  key={item.id}
                  className="p-6 min-h-[200px] flex flex-col justify-between bg-black/60 backdrop-blur-md border border-neutral-800 rounded-sm"
                >
                  <div className="space-y-6">
                    <div className="opacity-80">{item.icon}</div>
                    <h3 className="text-lg font-medium leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed">
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