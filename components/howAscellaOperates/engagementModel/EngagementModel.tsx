"use client";

import { useState } from "react";
import Image from "next/image";
import PlusHeading from "../../headings/PlusHeading";
import { SECTIONS, EngagementLabel, EngagementSection } from "./data";
import EngagementMenu from "./EngagementMenu";
import { useEffect, useRef } from "react";
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
    if (isInView) {
      onEnterView(section.label);
    }
  }, [isInView, section.label, onEnterView]);

  return (
    <div
      ref={ref}
      id={section.label}
      className="flex justify-between mb-32 scroll-mt-40"
    >
      <div className="max-w-sm flex flex-col gap-5 mt-32">
        <h5>{section.title}</h5>
        <p className="text-b2 text-gray-300">{section.description}</p>
      </div>

      {/* Image */}
      <div className="flex flex-col gap-5">
        <h3>[0{index + 1}]</h3>
        <div className="relative w-[400px] h-[500px]">
          <Image
            src={section.image}
            alt={section.title}
            fill={true}
          />
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

  const section = SECTIONS.find(s => s.label === active)!;

  return (
    <section className="m-20 xl:m-30">
      {/* Header */}
      <header className="flex flex-col gap-6 w-2xl mb-20">
        <PlusHeading text="ENGAGEMENT MODELS" />
        <h3 className="font-light">Engagement structures are shaped around operating alignment, shared accountability, and controlled execution rather than isolated task delivery.</h3>
        <p className="text-b1 font-extralight">
          Ascella engagements are structured around operating alignment, where ownership, governance, and measurement are defined before delivery begins so execution remains controlled and accountable instead of transactional and fragmented.
        </p>
      </header>

      <div className="flex gap-20 items-start">
        <div className="flex-1 pr-4">
          {SECTIONS.map((section, index) => (
            <ScrollSection
              key={section.label}
              section={section}
              index={index}
              onEnterView={setActive}
            />
          ))}
        </div>

        {/* Sticky menu */}
        <aside className="sticky top-30 self-start h-fit">
          <EngagementMenu
            items={MENU_ITEMS}
            active={active}
            onChange={(label) => {
              setActive(label);
              document
                .getElementById(label)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </aside>
      </div>




    </section>
  );
}
