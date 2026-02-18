'use client';

import React, { useState } from 'react';


const Isometric3DBox = ({
  className,
  opacity = 1,
  style,
}: {
  className?: string;
  opacity?: number;
  style?: React.CSSProperties;
}) => (
  <svg
    className={`${className} transform rotate-180`}
    width="128"
    height="75"
    viewBox="0 0 128 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity, ...style }}
  >
    <path
      d="M1 37.5V45L63.5 82L63.5 74.5L1 37.5Z"
      fill="white"
      fillOpacity="0.08"
      stroke="white"
      strokeOpacity="0.05"
    />
    <path
      d="M127 37.5V45L63.5 82L63.5 74.5L127 37.5Z"
      fill="white"
      fillOpacity="0.12"
      stroke="white"
      strokeOpacity="0.05"
    />
    <path
      d="M0.993164 37.498L16.251 46.3672L63.5049 74.4209L110.751 47.3418L127.011 37.5137C116.274 31.4326 100.696 22.4984 87.6855 14.9199C70.7188 4.91406 63.9238 0.624023 63.9238 0.624023L0.993164 37.498Z"
      stroke="white"
      strokeOpacity="0.12"
    />
  </svg>
);

// ─────────────────────────────────────────────
// CONTACT SECTION
// ─────────────────────────────────────────────
type ContactSectionProps = {
  title: string;
  subtitle: string;
  email?: { value: string };
  contact?: { values: string[] };
  location?: { address: string; postalCode: string };
  workHours?: { hours: string };
};

const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  subtitle,
  email,
  contact,
  location,
  workHours,
}) => {
  return (
    <div className="w-full bg-black text-white font-sans overflow-hidden">
      {/* Header */}
      <div
        className="relative h-[500px] border-b border-[#3D3D3D] flex items-center overflow-hidden"
        style={{ borderTop: 'none' }}
      >
        <div
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(30deg, #555 1px, transparent 1px), linear-gradient(-30deg, #555 1px, transparent 1px)`,
            backgroundSize: '64px 110px',
          }}
        />
        <div className="relative z-10 pl-15 pointer-events-none">
          <h2 className="text-[52px] font-light mb-4 tracking-tighter leading-tight max-w-2xl">
            {title}
          </h2>
          <p className="text-zinc-600 text-lg font-light max-w-sm">{subtitle}</p>
        </div>
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute top-[10%] left-[2%]">
            <Isometric3DBox className="absolute top-0 left-0 scale-125" opacity={0.5} />
            <Isometric3DBox className="absolute top-[37px] left-[63px]" opacity={0.4} />
            <Isometric3DBox className="absolute top-[74px] left-[126px]" opacity={0.3} />
            {[...Array(9)].map((_, i) => (
              <Isometric3DBox
                key={i}
                className="absolute"
                style={{ top: `${(i + 3) * 37}px`, left: `${(i + 3) * 63}px` }}
                opacity={0.03}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grid Boxes */}
      <div className="flex flex-wrap md:flex-nowrap justify-center bg-black border-b border-[#3D3D3D]">
        {/* Left */}
        <div
          className="border-r border-[#3D3D3D] flex flex-col overflow-hidden"
          style={{ width: '256px', height: '271px' }}
        >
          <div className="flex-1 p-6 flex flex-col justify-center border-b border-[#3D3D3D]">
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-2 block">
              Email
            </span>
            <div className="text-[13px] font-light truncate">
              {email?.value ? email.value.split('\n')[0] : ''}
            </div>
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-2 block">
              Contact
            </span>
            <div className="text-[13px] font-light space-y-0.5">
              {(contact?.values ?? []).slice(0, 2).map((v, i) => (
                <p key={i}>{v}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Center */}
        <div
          className="flex items-center justify-center border-r border-[#3D3D3D] bg-[#030303]"
          style={{ width: '256px', height: '271px' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid #3D3D3D',
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.54) 0%, rgba(0,0,0,0.54) 100%), linear-gradient(0deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 100%)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        {/* Right */}
        <div className="flex flex-col overflow-hidden" style={{ width: '256px', height: '271px' }}>
          <div className="flex-1 p-6 flex flex-col justify-center border-b border-[#3D3D3D]">
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-2 block">
              Location
            </span>
            <p className="text-[12px] font-light leading-snug">
              {location?.address ?? ''}
            </p>
            <p className="text-[11px] text-zinc-600 mt-1">{location?.postalCode}</p>
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-2 block">
              Work Hours
            </span>
            <p className="text-[13px] font-light">{workHours?.hours}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ACCORDION ITEM
// ─────────────────────────────────────────────
type AccordionItemProps = {
  title: string;
  index?: string;
  description?: string;
  open?: boolean;
  onMouseEnter?: () => void;
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  index,
  description,
  open = false,
  onMouseEnter,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className={`border-b border-[#3D3D3D] py-10 px-6 md:px-12 cursor-pointer transition-colors duration-500 ${
        open ? 'bg-[#0A0C10]' : 'hover:bg-[#050505]'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="max-w-xl">
          <h4
            className={`text-xl md:text-2xl font-light transition-colors ${
              open ? 'text-white' : 'text-gray-500'
            }`}
          >
            {title}
            {open && <span className="text-white ml-2">•</span>}
          </h4>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              open ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            {description && (
              <p className="text-sm text-white leading-relaxed">{description}</p>
            )}
          </div>
        </div>
        <div
          className={`text-2xl font-light tracking-tighter transition-colors ${
            open ? 'text-white' : 'text-gray-500'
          }`}
        >
          {index}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ICON SVGS
// ─────────────────────────────────────────────
const Icon2 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
    <path
      d="M39.7154 12.4714L49.6871 29.7428L39.715 47.0156L19.7703 47.0153L9.7986 29.7438L19.7702 12.4702L39.7154 12.4714Z"
      stroke="#3D3D3D"
    />
    <circle cx="29.5" cy="29.5" r="29" stroke="#3D3D3D" />
    <circle cx="29.5" cy="29.5" r="4" fill="white" stroke="#3D3D3D" />
  </svg>
);

const Icon3 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
    <circle cx="29.5" cy="29.5" r="29" stroke="#3D3D3D" />
    <circle cx="29.5" cy="29.5" r="19" stroke="#3D3D3D" />
    <path
      d="M29.5 10.5C30.0026 10.5 30.5951 10.8657 31.2246 11.8096C31.8416 12.7348 32.4174 14.1067 32.9082 15.8467C33.8879 19.32 34.5 24.1477 34.5 29.5C34.5 34.8523 33.8879 39.68 32.9082 43.1533C32.4174 44.8933 31.8416 46.2652 31.2246 47.1904C30.5951 48.1343 30.0026 48.5 29.5 48.5C28.9974 48.5 28.4049 48.1343 27.7754 47.1904C27.1584 46.2652 26.5826 44.8933 26.0918 43.1533C25.1121 39.68 24.5 34.8523 24.5 29.5C24.5 24.1477 25.1121 19.32 26.0918 15.8467C26.5826 14.1067 27.1584 12.7348 27.7754 11.8096C28.4049 10.8657 28.9974 10.5 29.5 10.5Z"
      stroke="#3D3D3D"
    />
    <path
      d="M10.5 29.5C10.5 28.9974 10.8657 28.4049 11.8096 27.7754C12.7348 27.1584 14.1067 26.5826 15.8467 26.0918C19.32 25.1121 24.1477 24.5 29.5 24.5C34.8523 24.5 39.68 25.1121 43.1533 26.0918C44.8933 26.5826 46.2652 27.1584 47.1904 27.7754C48.1343 28.4049 48.5 28.9974 48.5 29.5C48.5 30.0025 48.1343 30.5951 47.1904 31.2246C46.2652 31.8416 44.8933 32.4174 43.1533 32.9082C39.68 33.8879 34.8523 34.5 29.5 34.5C24.1477 34.5 19.32 33.8879 15.8467 32.9082C14.1067 32.4174 12.7348 31.8416 11.8096 31.2246C10.8657 30.5951 10.5 30.0026 10.5 29.5Z"
      stroke="#3D3D3D"
    />
  </svg>
);

const Icon4 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
    <circle cx="29.5" cy="29.5" r="29" stroke="#3D3D3D" />
    <circle cx="24" cy="30" r="23.5" stroke="#3D3D3D" />
    <circle cx="17.5" cy="29.5" r="17" stroke="#3D3D3D" />
    <circle cx="10" cy="28" r="9.5" stroke="#3D3D3D" />
  </svg>
);

const Icon5 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
    <circle cx="29.5" cy="29.5" r="29" stroke="#3D3D3D" />
    <path
      d="M29.5 9.5C30.1676 9.5 30.8925 9.92752 31.6299 10.9111C32.3606 11.8859 33.0398 13.3282 33.6191 15.1553C34.7761 18.804 35.5 23.8758 35.5 29.5C35.5 35.1242 34.7761 40.196 33.6191 43.8447C33.0398 45.6718 32.3606 47.1141 31.6299 48.0889C30.8925 49.0725 30.1676 49.5 29.5 49.5C28.8324 49.5 28.1075 49.0725 27.3701 48.0889C26.6394 47.1141 25.9602 45.6718 25.3809 43.8447C24.2239 40.196 23.5 35.1242 23.5 29.5C23.5 23.8758 24.2239 18.804 25.3809 15.1553C25.9602 13.3282 26.6394 11.8859 27.3701 10.9111C28.1075 9.92752 28.8324 9.5 29.5 9.5Z"
      stroke="#3D3D3D"
    />
    <path
      d="M9.5 29.5C9.5 28.8324 9.92752 28.1075 10.9111 27.3701C11.8859 26.6394 13.3282 25.9602 15.1553 25.3809C18.804 24.2239 23.8758 23.5 29.5 23.5C35.1242 23.5 40.196 24.2239 43.8447 25.3809C45.6718 25.9602 47.1141 26.6394 48.0889 27.3701C49.0725 28.1075 49.5 28.8324 49.5 29.5C49.5 30.1676 49.0725 30.8925 48.0889 31.6299C47.1141 32.3606 45.6718 33.0398 43.8447 33.6191C40.196 34.7761 35.1242 35.5 29.5 35.5C23.8758 35.5 18.804 34.7761 15.1553 33.6191C13.3282 33.0398 11.8859 32.3606 10.9111 31.6299C9.92752 30.8925 9.5 30.1676 9.5 29.5Z"
      stroke="#3D3D3D"
    />
    <path
      d="M15.3579 43.6422C14.8859 43.1701 14.6756 42.3552 14.8497 41.1383C15.0223 39.9323 15.5619 38.4322 16.4442 36.7306C18.2061 33.3325 21.2806 29.2343 25.2574 25.2574C29.2343 21.2805 33.3325 18.2061 36.7307 16.4441C38.4323 15.5618 39.9323 15.0223 41.1383 14.8497C42.3553 14.6755 43.1702 14.8858 43.6422 15.3579C44.1143 15.83 44.3246 16.6449 44.1504 17.8618C43.9779 19.0678 43.4383 20.5678 42.556 22.2695C40.794 25.6676 37.7196 29.7658 33.7427 33.7427C29.7658 37.7196 25.6676 40.794 22.2695 42.556C20.5679 43.4383 19.0678 43.9778 17.8618 44.1504C16.6449 44.3245 15.83 44.1142 15.3579 43.6422Z"
      stroke="#3D3D3D"
    />
    <path
      d="M43.642 43.6422C43.17 44.1142 42.3551 44.3245 41.1382 44.1504C39.9322 43.9778 38.4321 43.4383 36.7305 42.556C33.3324 40.794 29.2342 37.7196 25.2573 33.7427C21.2804 29.7658 18.206 25.6676 16.444 22.2695C15.5617 20.5678 15.0221 19.0678 14.8495 17.8618C14.6754 16.6449 14.8857 15.83 15.3578 15.3579C15.8298 14.8858 16.6447 14.6755 17.8617 14.8497C19.0677 15.0223 20.5677 15.5618 22.2693 16.4441C25.6675 18.2061 29.7657 21.2805 33.7426 25.2574C37.7194 29.2343 40.7939 33.3325 42.5558 36.7306C43.4381 38.4322 43.9777 39.9323 44.1503 41.1383C44.3244 42.3552 44.1141 43.1701 43.642 43.6422Z"
      stroke="#3D3D3D"
    />
  </svg>
);

const Icon6 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
    <circle cx="29.5" cy="29.5" r="29" stroke="#3D3D3D" />
    <circle cx="30" cy="24" r="11.5" stroke="#3D3D3D" />
    <circle cx="37" cy="33" r="11.5" stroke="#3D3D3D" />
    <circle cx="22" cy="33" r="11.5" stroke="#3D3D3D" />
  </svg>
);

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
const ContextsPage = () => {
  const [openAccordion, setOpenAccordion] = useState<string>('01');

  const boxBase =
    'w-full md:w-[293px] h-[257px] border-b border-[#3D3D3D] p-8 flex flex-col justify-between items-start';
  const textStyle =
    "w-[164px] text-white font-['Montserrat'] text-[14px] font-normal leading-[16px] tracking-[-0.14px]";
  const overlayCardStyle =
    'w-full md:w-[289px] h-[109px] rounded-[6px] border border-[#3D3D3D] bg-[rgba(13,13,13,0.50)] backdrop-blur-[20.95px] p-4 flex flex-col justify-center';

  const accordionData = [
    {
      id: '01',
      title: 'Review and context assessment',
      description:
        'Your submission is reviewed to understand operating complexity, execution readiness, and governance requirements.',
    },
    {
      id: '02',
      title: 'Alignment conversation',
      description:
        'Discussion with stakeholders to understand current state, challenges, and alignment requirements for execution.',
    },
    {
      id: '03',
      title: 'Engagement pathway definition',
      description:
        'Clear roadmap defining phases, milestones, deliverables, and engagement model for successful execution.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white md:pl-25 md:pr-25 font-sans">
      {/*
        Two-column layout:
        - Left  (2/6): sticky, stays fixed while right scrolls
        - Right (4/6): normal flow, scrolls with the page
        Parent uses `items-start` so sticky works correctly
      */}
      <div className="relative w-full border border-[#3D3D3D] flex flex-col lg:flex-row items-start">

        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(61,61,61,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(61,61,61,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* ── LEFT COLUMN — STICKY FORM ── */}
        <div className="relative z-10 w-full lg:w-2/6 border-b lg:border-b-0 lg:border-r border-[#3D3D3D] p-7 flex flex-col bg-black lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          
          <header className="max-w-md">
            <h5 className="text-2xl font-light mb-3">
              Provide operating context to <br /> initiate alignment.
            </h5>
            <p className="text-gray-400 text-sm mb-1">
              This form captures high-level operating information required to initiate an alignment
              conversation.
            </p>
          </header>

          <div className="border-t border-[#3D3D3D] w-[calc(100%+3.5rem)] -mx-7 my-4" />

          <div className="pt-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-white">Full Name</label>
                <input
                  type="text"
                  className="bg-transparent border border-gray-800 p-2 rounded text-sm text-white focus:outline-none focus:border-gray-600"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-white">Organisation name</label>
                <input
                  type="text"
                  className="bg-transparent border border-gray-800 p-2 rounded text-sm text-white focus:outline-none focus:border-gray-600"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-white">Role / position</label>
                <input
                  type="text"
                  className="bg-transparent border border-gray-800 p-2 rounded text-sm text-white focus:outline-none focus:border-gray-600"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-white">Email address</label>
                <input
                  type="email"
                  className="bg-transparent border border-gray-800 p-2 rounded text-sm text-white focus:outline-none focus:border-gray-600"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-xs text-white">Organisation type</label>
                <select className="bg-transparent border border-gray-800 p-2 rounded text-sm text-gray-400 focus:outline-none appearance-none">
                  <option>Select...</option>
                </select>
              </div>

              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-xs text-white">Primary operating need</label>
                <select className="bg-transparent border border-gray-800 p-2 rounded text-sm text-gray-400 focus:outline-none appearance-none">
                  <option>Select...</option>
                </select>
              </div>

              <div className="md:col-span-2 flex flex-col gap-1">
                <textarea
                  placeholder="Describe your current execution or operating challenge..."
                  className="bg-transparent border border-gray-800 p-3 rounded h-20 text-sm text-white focus:outline-none focus:border-gray-600 resize-none placeholder-gray-700"
                />
              </div>

              <div className="col-span-1 mt-2">
                <button className="relative group w-max px-6 py-2 text-white text-sm">
                  <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white" />
                  <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white" />
                  <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white" />
                  Submit
                </button>
              </div>
            </form>

            <div className="mt-8 border-t border-[#3D3D3D] w-[calc(100%+3.5rem)] -mx-7" />
          </div>
        </div>

        {/* ── RIGHT COLUMN — SCROLLABLE CONTENT ── */}
        <div className="relative z-10 w-full lg:w-4/6 flex flex-col bg-black">

          {/* HERO */}
          <div className="min-h-[500px] md:h-[735px] relative p-6 md:p-15 flex flex-col justify-center border-b border-[#3D3D3D]">
            <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
              <img src="/engagement1.png" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 mb-12">
              <h2 className="text-4xl md:text-6xl font-normal leading-tight">
                Engagement begins <br />
                with <span className="text-gray-400">operating alignment.</span>
              </h2>
              <p className="text-lg md:text-xl mt-4 font-light text-gray-400">
                Not delivery discussions.
              </p>
            </div>

            <div className="relative z-20 flex flex-col md:flex-row gap-4">
              <div className={overlayCardStyle}>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                  Initial alignment focus
                </span>
                <p className="text-[13px] leading-tight text-white font-light">
                  The first interaction is designed to understand your operating environment,
                  governance maturity, and execution constraints.
                </p>
              </div>
              <div className={overlayCardStyle}>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                  Objective
                </span>
                <p className="text-[13px] leading-tight text-white font-light">
                  The objective is to determine whether a structured operating engagement is
                  appropriate.
                </p>
              </div>
            </div>
          </div>

          {/* WHAT ALIGNMENT COVERS */}
          <div className="w-full">
            <div className="px-6 md:px-12 pt-16 pb-6">
              <h3 className="text-3xl md:text-4xl font-light">What alignment typically covers</h3>
            </div>

            <div className="flex flex-wrap border-t border-[#3D3D3D]">
              <div
                className={`${boxBase} md:border-r border-[#3D3D3D] items-center justify-center pt-12 overflow-hidden`}
              >
                <img
                  src="/alignment.png"
                  alt="Alignment Symbol"
                  className="w-[293px] h-[257px] object-cover"
                />
              </div>
              <div className={`${boxBase} pt-26 md:border-r border-[#3D3D3D]`}>
                <Icon2 />
                <p className={textStyle}>Operating structure and decision ownership</p>
              </div>
              <div className={`${boxBase} pt-26`}>
                <Icon4 />
                <p className={textStyle}>Accountability and escalation models</p>
              </div>
              <div className={`${boxBase} pt-26 md:border-r border-[#3D3D3D]`}>
                <Icon5 />
                <p className={textStyle}>
                  Current execution challenges <br /> and constraints
                </p>
              </div>
              <div className={`${boxBase} pt-26 md:border-r border-[#3D3D3D]`}>
                <Icon3 />
                <p className={textStyle}>Risk, regulatory, and security considerations</p>
              </div>
              <div className={`${boxBase} pt-26`}>
                <Icon6 />
                <p className={textStyle}>Readiness for governed execution</p>
              </div>
            </div>
          </div>

          {/* ACCORDION — WHAT HAPPENS NEXT */}
          <div className="border-t border-[#3D3D3D] w-full">
            <div className="px-6 md:px-12 py-12">
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-8">
                <span className="text-lg">✚</span>
                <span className="uppercase tracking-[0.3em]">WHAT HAPPENS NEXT</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-light max-w-2xl leading-[1.1]">
                Each engagement progresses through a defined alignment pathway.
              </h3>
            </div>

            <div className="border-t border-[#3D3D3D]">
              {accordionData.map((item) => (
                <AccordionItem
                  key={item.id}
                  title={item.title}
                  index={`[${item.id}]`}
                  description={item.description}
                  open={openAccordion === item.id}
                  onMouseEnter={() => setOpenAccordion(item.id)}
                />
              ))}

              <div className="py-8 px-6 md:px-12">
                <p className="text-sm text-gray-300 font-light">
                  No engagement proceeds without operating alignment.
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT SECTION */}
          <div className="border-t border-[#3D3D3D]">
            <ContactSection
              title="Single point of contact for engagement coordination"
              subtitle="All engagement coordination is managed centrally."
              email={{ value: 'ag@ascella.in\nhello@ascellagroup.com' }}
              contact={{ values: ['+91 94545 10860', '+91 94699 40969'] }}
              location={{
                address: '3rd Floor, SCO-5(S), Sector 34B, Chandigarh',
                postalCode: '160022',
              }}
              workHours={{ hours: 'Mon - Sat: 9:00 - 18:00' }}
            />
          </div>

          {/* BOTTOM DECOR BAR */}
          <div className="w-full border-t border-[#3D3D3D] flex h-16">
            <div className="w-1/6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextsPage;