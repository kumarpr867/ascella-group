"use client";
import Image from "next/image";
import PlusHeading from "../headings/PlusHeading";
import OutlineBtn from "../btns/OutlineBtn";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-bg">

      {/* Globe */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-[15vh] z-1">
        <Image
          src="/globe.png"
          alt="Globe"
          width={800}
          height={1}
          priority
          className="object-contain"
        />
      </div>

      {/* Bottom mask */}
      <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-linear-to-t from-black via-black/80 to-transparent z-2 pointer-events-none" />

      {/* Top info row */}
      <div className="absolute inset-x-0 top-[10vh] z-5">
        <div className="mx-auto max-w-7xl px-6 flex justify-between  ">
          <div className="space-y-1 text-md">
            <PlusHeading text="Lorem ipsum dolor sit amet" />
            <PlusHeading text="Lorem ipsum dolor" />
          </div>

          <div className="text-md">
            <PlusHeading text="Lorem ipsum" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[22vh] z-5">
        <div className="mx-auto max-w-7xl px-6 flex justify-between gap-12">
          <div>
            <p className="text-5xl text-gray-300">A Unified</p>
            <h1 className="text-5xl font-medium  ">
              Operating Group
            </h1>
          </div>

          <div className="flex flex-col justify-end gap-4 max-w-90 text-gray-200 text-right ">
            <p className="text-b2">
              Security, technology, workforce, operations, and revenue delivered under a single governance and accountability framework.
            </p>
            <div className="flex justify-end">
              <OutlineBtn text="Engage With Us" />
            </div>
          </div>
        </div>
      </div>
      {/*footer background*/}
      <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-bg z-5 pointer-events-none" />

      {/* Bottom info row */}
      <div className="absolute inset-x-0 bottom-20 z-5">
        <div className="w-full border-t border-gray-400" />
        <div className="text-md mx-auto max-w-7xl pt-4 flex justify-between  ">
          <PlusHeading text="Security, technology, operations, & revenue" />
          <PlusHeading text="Security, technology, operations, & revenue" />
          <PlusHeading text="Security, technology, operations, & revenue" />
        </div>
      </div>
    </section>
  );
}
