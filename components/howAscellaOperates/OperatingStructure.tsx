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
      <div className="hidden md:flex relative mx-auto max-w-7xl px-10 py-10 md:py-24 flex-col md:flex-row border-x-0 lg:border-x border-color gap-8 md:gap-0">

        {/* top */}
        <div className="relavtive flex flex-col gap-5 w-full lg:w-2/3 xl:w-1/2">
          <h2 className='text-2xl md:text-5xl'>
            A unified model built for accountable
            <span className="text-gray-300"> execution at scale.</span>
          </h2>
          <p className="text-[14px] text-left w-1/2">Ownership, governance, and delivery aligned before work begins.</p>
        </div>
        <div className="absolute -z-1 right-0 top-0.5">
          <svg width="830" height="587" viewBox="0 0 830 587" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 393.982 -26)" stroke="url(#paint0_linear_790_1251)" strokeOpacity="0.06" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 328.202 10)" stroke="url(#paint1_linear_790_1251)" strokeOpacity="0.06" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 262.422 46)" stroke="url(#paint2_linear_790_1251)" strokeOpacity="0.12" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 196.642 82)" stroke="url(#paint3_linear_790_1251)" strokeOpacity="0.12" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 130.861 118)" stroke="url(#paint4_linear_790_1251)" strokeOpacity="0.12" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 65.0811 154)" stroke="url(#paint5_linear_790_1251)" strokeOpacity="0.06" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 0.794922 202)" stroke="url(#paint6_linear_790_1251)" strokeOpacity="0.06" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 655.608 -26)" stroke="url(#paint7_linear_790_1251)" strokeOpacity="0.02" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 721.389 10)" stroke="url(#paint8_linear_790_1251)" strokeOpacity="0.04" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 787.169 46)" stroke="url(#paint9_linear_790_1251)" strokeOpacity="0.12" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 852.949 82)" stroke="url(#paint10_linear_790_1251)" strokeOpacity="0.12" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 918.729 118)" stroke="url(#paint11_linear_790_1251)" strokeOpacity="0.12" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 984.51 154)" stroke="url(#paint12_linear_790_1251)" strokeOpacity="0.04" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 1048.79 202)" stroke="url(#paint13_linear_790_1251)" strokeOpacity="0.02" strokeDasharray="2 2" />
            <path d="M461.788 237.498L477.046 246.367L477.05 246.369L524.3 274.421L571.546 247.342L587.806 237.514C577.069 231.433 561.491 222.498 548.48 214.92C541.824 211.043 535.837 207.519 531.514 204.914C529.353 203.612 527.604 202.538 526.394 201.763C525.79 201.376 525.314 201.06 524.986 200.826C524.886 200.754 524.796 200.685 524.719 200.624L461.788 237.498Z" stroke="white" stroke-opacity="0.12" />
            <path d="M207.788 237.498L223.046 246.367L223.05 246.369L270.3 274.421L317.546 247.342L333.806 237.514C323.069 231.433 307.491 222.498 294.48 214.92C287.824 211.043 281.837 207.519 277.514 204.914C275.353 203.612 273.604 202.538 272.394 201.763C271.79 201.376 271.314 201.06 270.986 200.826C270.886 200.754 270.796 200.685 270.719 200.624L207.788 237.498Z" stroke="url(#paint14_linear_790_1251)" stroke-opacity="0.12" />
            <defs>
              <linearGradient id="paint0_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint1_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint2_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint3_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint4_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint5_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint6_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint7_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint8_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint9_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint10_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint11_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint12_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint13_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" />
              </linearGradient>
              <linearGradient id="paint14_linear_790_1251" x1="334.795" y1="236.5" x2="213.795" y2="240.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* flow chart */}
      <div className="border-t border-color ">


        {/* xl screen */}
        <div className='hidden mx-auto max-w-7xl px-10 py-10 xl:flex items-center justify-around  border-x-0 xl:border-x  border-color '>
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
          className="relative max-w-7xl mx-auto px-10 py-24 border-b border-color overflow-hidden"
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
            <span className="text-gray-300">execution at scale.</span>
          </h4>
          <p
            className="relative mt-4 text-white text-[12px] leading-3.25"
          >
            Ownership, governance, and <br /> delivery aligned before work begins.
          </p>
        </div>

        {/* 2-column icon grid — 3 rows */}
        <div className="px-10 border-b border-color">
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
        <div className="px-10 border-b border-color">
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