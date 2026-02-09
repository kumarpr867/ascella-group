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
            <PlusHeading text="Clear Ownership" />
            <PlusHeading text="Calm Execution" />
          </div>

          <div className="text-b2">
            <PlusHeading text="Unified Control" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[22vh] z-5">
        <div className="mx-auto max-w-7xl px-6 flex justify-between gap-12">
          <h2 className="text-gray-300">A Unified <br /><span className="text-white"> Operating Group
          </span> </h2>

          <div className="flex flex-col justify-end gap-4 max-w-md text-gray-200 text-right ">
            <p className="text-b2 leading-tight">
              Complex organisations slow down when execution scatters across teams and vendors. Control weakens as decisions lose a clear owner and accountability spreads thin. Ascella Group brings structure to execution by aligning responsibility, governance, and delivery under one operating layer.
            </p>
            <div className="flex justify-end">
              <OutlineBtn text="Engage With Us" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-bg z-5 pointer-events-none" />

      <div className="absolute inset-x-0 bottom-20 z-5">
        <div className="w-full border-t border-gray-400" />
        <div className="text-md mx-auto max-w-7xl px-6 pt-4 flex justify-between  ">
          <PlusHeading text=" Security and risk managed with clear ownership" />
          <PlusHeading text=" Technology and platforms delivered with control" />
          <PlusHeading text="Operations and growth aligned under one structure" />
        </div>
      </div>
    </section>
  );
}
