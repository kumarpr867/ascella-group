"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import PlusHeading from "../../headings/PlusHeading";
import { SECTIONS, EngagementLabel, EngagementSection } from "./data";
import EngagementMenu from "./EngagementMenu";
import { useInView } from "framer-motion";

function ScrollSection({
  section,
  index,
  onEnterView,
}: {
  section: EngagementSection;
  index: number;
  onEnterView: (label: EngagementLabel) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, {
    margin: "-40% 0px -40% 0px",
  });

  useEffect(() => {
    if (isInView) onEnterView(section.label);
  }, [isInView, section.label, onEnterView]);

  return (
    <div
      ref={ref}
      id={section.label}
      className="flex justify-between mb-32 scroll-mt-40"
    >
      <div className="max-w-sm flex flex-col gap-5">
        <h2 className="text-xl">{section.title}</h2>
        <p className="text-sm text-gray-300">{section.description}</p>
      </div>

      <div className="flex flex-col gap-5">
        <h3>[0{index + 1}]</h3>
        <div className="relative w-[400px] h-[500px]">
          <Image src={section.image} alt={section.title} fill={true} />
        </div>
      </div>
    </div>
  );
}

const MENU_ITEMS: EngagementLabel[] = [
  "Operation",
  "Pod deployment",
  "Integration",
  "Support",
];

export default function EngagementModel() {
  const [active, setActive] = useState<EngagementLabel>("Operation");

  return (
    <section className="m-20 xl:m-30">
      <header className="flex flex-col gap-6 md:w-1/2 mb-20">
        <PlusHeading text="ENGAGEMENT MODELS" size="b2" />
        <h1 className="text-3xl leading-tight">
          Engagement structures are <span className="text-gray-200">designed for operational alignment</span>, not transactional delivery.
        </h1>
        <p className="font-extralight">
          Ascella engagements are structured based on organisational maturity, execution complexity, and governance need.
        </p>
      </header>

      <div className="flex gap-20 items-start">
        <div className="flex-1 pr-4">
          {SECTIONS.map((section, index) => (
            <ScrollSection key={section.label} section={section} index={index} onEnterView={setActive} />
          ))}
        </div>

        <aside className="sticky top-20 self-start h-fit">
          <EngagementMenu
            items={MENU_ITEMS}
            active={active}
            onChange={(label) => {
              setActive(label);
              document.getElementById(label)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </aside>
      </div>
    </section>
  );
}
