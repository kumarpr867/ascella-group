"use client"
import Image from 'next/image';
import { SpiderNetwork } from './Spider';
import { Canvas } from '@react-three/fiber';

const items = [
  { label: "Accountability", icon: "/howAscellaOperates/accountability.svg" },
  { label: "Assemble Pods", icon: "/howAscellaOperates/pods.png" },
  { label: "Performance", icon: "/howAscellaOperates/performance.png" },
  { label: "Embed Security", icon: "/howAscellaOperates/security.png" },
  { label: "Controlled Execution", icon: "/howAscellaOperates/execution.png" },
];

export default function OperatingStructure() {
  const gridItems = [
    {
      label: 'Governance',
      src: '/howAscellaOperates/governace.svg',
      width: 69,
      height: 70
    },
    {
      label: 'Accountability',
      src: '/howAscellaOperates/accountability.svg',
      width: 80,
      height: 80
    },
    {
      label: 'Assemble Pods',
      src: '/howAscellaOperates/pods.png',
      width: 69,
      height: 70
    },
    {
      label: 'Performance',
      src: '/howAscellaOperates/performance.png',
      width: 88,
      height: 52
    },
    {
      label: 'Embed Security',
      src: '/howAscellaOperates/security.png',
      width: 63,
      height: 73
    },
    {
      label: 'Controlled Execution',
      src: '/howAscellaOperates/execution.png',
      width: 65,
      height: 45
    },
  ];

  return (
    <section className="border-y border-color">
      <div className="hidden md:flex relative mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-24 flex-col md:flex-row border-x-0 lg:border-x border-color gap-8 md:gap-0">

        {/* top */}
        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <h2 className='text-2xl md:text-5xl'>
            A unified model built for accountable
            <span className="text-gray-300"> execution at scale.</span>
          </h2>
          <p className="text-[14px] text-left w-1/2">Ownership, governance, and delivery aligned before work begins.</p>
        </div>
      </div>

      {/* flow chart */}
      <div className="border-t border-color ">


        {/* xl screen */}
        <div className='hidden mx-auto max-w-7xl px-4 sm:px-6 py-10 xl:flex items-center justify-around  border-x-0 xl:border-x  border-color '>
          <div className="flex flex-col items-center py-8 ">
            <p className={"text-b3 mb-6"}>Governance</p>
            <div className={"w-full h-40 flex items-center justify-center"}>
              <Image
                src={"/howAscellaOperates/governace.svg"}
                alt={"governance"}
                width={80}
                height={80}
              />
              <div className='w-10 bg-gray-400 h-1'></div>
            </div>
          </div>
          <div className="grid grid-cols-5 text-center">
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center py-8 "
                >
                  <p className={"text-b3 mb-6"} >{item.label}</p>

                  <div className={` w-48 h-40 flex items-center justify-center border-y border-color
              ${index == 0 ? "border-l" : ""} ${index == 4 ? "border-r" : ""}`}>
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={80}
                      height={80}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-center py-8 ">
            <p className={"text-b3 mb-6"}>Outcome Stability</p>
            <div className={"w-full h-40 flex items-center justify-center"}>
              <div className='w-10 bg-gray-400 h-1'></div>
              <Image
                src={"/howAscellaOperates/outcome.png"}
                alt={"Outcome Stability"}
                width={80}
                height={80}
              />
            </div>
          </div>
        </div>





      </div>

      {/* ─────────────────────────────────────────
          MOBILE VIEW — naya, image ke jaisa
      ───────────────────────────────────────── */}
      <div className="block xl:hidden ">

        {/* Hero text */}
        <div
          className="relative max-w-7xl mx-auto px-5 py-24 border-b border-color overflow-hidden"
        >
          {/* Subtle diagonal lines background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(
                150deg,
                rgba(255,255,255,0.04) 0px,
                rgba(255,255,255,0.04) 1px,
                transparent 1px,
                transparent 38px
              )`,
            }}
          />
          <h4
            className="relative font-normal leading-tight"
          >
            <span className="text-white">A unified model built for accountable </span>
            <span className="text-[#6E6E6E]">execution at scale.</span>
          </h4>
          <p
            className="relative mt-4 text-white text-[12px] leading-3.25"
          >
            Ownership, governance, and <br /> delivery aligned before work begins.
          </p>
        </div>

        {/* 2-column icon grid — 3 rows */}
        <div className="px-5 border-b border-color">
          <div className="grid grid-cols-2 border-x border-color">
            {gridItems.map((item, i) => (
              <div
                key={item.label}
                className={[
                  'relative flex flex-col items-center justify-center gap-3 py-6',
                  i % 2 === 0 ? 'border-r border-color' : '',
                  i < 4 ? 'border-b border-color' : '',
                ].join(' ')}
              >
                <div className="flex items-center justify-center">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={item.width}
                    height={item.height}
                    style={{ objectFit: 'contain' }}
                  />
                </div>

                <span
                  className="text-[#6E6E6E] text-[12px] leading-[13px] text-center px-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Outcome Stability — full width centred */}
        <div className="px-5 border-b border-color">
          <div className="flex flex-col items-center justify-center py-6 gap-3 border-x border-color">
            <div className="flex items-center justify-center" style={{ minHeight: 80 }}>
              <Image
                src="/howAscellaoperates/outcome.png"
                alt="Outcome Stability"
                width={73}
                height={75}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <span
              className="text-white text-[12px] leading-[13px]"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Outcome Stability
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}