"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import { slideInFromLeft, slideInFromRight } from "@/utils/motion";
import Reveal from "@/utils/Reveal";
import PlusHeading from "../headings/PlusHeading";
import PartialOutlineBtn from "../btns/PartialOutlineBtn";

interface OrganisationType {
  title: string;
  subHeading: string;
  engagementFocus: string;
  typicalNeed: string;
  icon?: ReactNode;
}

const ORGANISATION_TYPES: OrganisationType[] = [
  {
    title: "Regulated Industries",
    subHeading:
      "Organisations operating under regulatory, compliance, and audit constraints.",
    engagementFocus:
      "Embedding governance, security, and accountability structures that meet regulatory and operational requirements",
    typicalNeed:
      "Controlled execution environments where risk and compliance cannot be managed reactively.",
    icon: <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="11.8936" y="6.53198" width="44.5745" height="44.5745" stroke="white" />
      <rect x="0.5" y="17.9255" width="44.5745" height="44.5745" stroke="white" />
      <rect x="46.0742" y="0.5" width="16.4255" height="16.4255" stroke="white" />
    </svg>

  },
  {
    title: "Venture-Backed Scale-Ups",
    subHeading:
      "High-growth companies transitioning from founder-led execution to structured operations. ",
    engagementFocus:
      "Introducing governance, accountability, and scalable operating structures without slowing momentum.",
    typicalNeed:
      "Moving from speed-driven execution to repeatable, controlled delivery.",
    icon: <svg width="73" height="46" viewBox="0 0 73 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="27.5" y="0.5" width="44.5745" height="44.5745" rx="22.2872" stroke="white" />
      <rect x="0.5" y="0.925537" width="44.5745" height="44.5745" rx="22.2872" stroke="white" />
    </svg>

  },
  {
    title: "Enterprises",
    subHeading:
      "Large organisations managing complex teams, systems, and multi-layered operations.",
    engagementFocus:
      "Maintaining alignment, oversight, and execution control across distributed structures.",
    typicalNeed:
      "Preventing execution drift as scale, process, and stakeholder layers increase.",
    icon: <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14.5" y="14.5" width="29" height="29" rx="14.5" stroke="white" />
      <rect x="17.5" y="22.5" width="19" height="19" rx="9.5" stroke="white" />
      <rect x="0.5" y="0.5" width="57" height="57" rx="6.5" stroke="white" />
    </svg>

  },
  {
    title: "Startups Programme",
    subHeading:
      "Early-stage companies preparing for scale and operational maturity.",
    engagementFocus:
      "Providing structured operating frameworks through a defined programme pathway.",
    typicalNeed:
      "Building execution discipline early to avoid structural debt later.",
  },
];


export default function OrganisationTypes() {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <section className="">
      <div className="lg:px-25 lg:py-32 w-screen">
        <div className="mb-20 flex justify-between items-center">
          <Reveal variants={slideInFromLeft(0.2)}>
            <p className="text-sm max-w-xs leading-loose">
              Ascella works with organisations where execution quality depends on structure, not improvisation.
            </p>
          </Reveal>
          <Reveal variants={slideInFromRight(0.2)}>
            <PlusHeading text="Organisation Types">
            <p className="text-3xl max-w-2xl leading-snug mt-10">
              Ascella partners with organisations where operating structure, governance, and accountability determine long-term execution success.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col">
          {ORGANISATION_TYPES.map((type, index) => {
            const isActive = activeRow === index;

            return (
              <div
                key={type.title}
                onMouseEnter={() => setActiveRow(index)}
                onMouseLeave={() => setActiveRow(null)}
                className="relative grid grid-cols-1 lg:grid-cols-[1fr_172px_1fr] gap-y-10 lg:gap-x-20 mx-auto py-10 lg:py-16 border-t  border-color overflow-visible"

              >
                <div className="flex flex-col gap-5">
                  <h2 className={`text-2xl transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-40"}`}>
                    {type.title}
                  </h2>
                  <h3 className="leading-tight text-gray-200">{type.subHeading}</h3>
                  <div>
                    <h4 className="text-sm">Engagement Focus</h4>
                    <p className="font-light text-gray-200 text-sm leading-tight pr-14">{type.engagementFocus}</p>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className={`absolute left-0 right-0 -top-25 h-56
                          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                          ${isActive
                        ? "opacity-100 scale-100 [clip-path:inset(0%)]"
                        : "opacity-0 scale-[0.92] [clip-path:inset(50%)]"
                      }`}
                  >
                    <Image src={"/whoWeWorkWith/floating.png"} alt="" fill className="object-cover"/>
                  </div>
                </div>

                <div className="relative w-full lg:w-md flex flex-col gap-6 lg:gap-10">

                  <div className="flex items-center">
                    {type.icon ? (
                      type.icon
                    ) : (
                      <PartialOutlineBtn
                        text="View Startup Programme"
                      />
                    )}
                  </div>

                  <div className="pl-0 lg:pl-10">

                    <h2 className="text-xl">Typical Need</h2>
                    <p className="font-light text-gray-200 text-sm leading-tight lg:pr-14">{type.typicalNeed}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="border-t border-color" />
        </div>
      </div>
    </section>
  );
}

