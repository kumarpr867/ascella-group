"use client"
import React, { useEffect, useRef, useState } from 'react';
import Reveal from "@/utils/Reveal";
import { slideInFromBottom } from "@/utils/motion";

// ── Alignments ka apna dedicated Google Sheet ─────────────────────────────────
const ALIGNMENTS_SHEET_URL = "https://script.google.com/macros/s/AKfycbxLHoR0MO8gg2EA5hOYtPP3C_pnntrgxCQGkCclsE0yCuiyjSQx_e3H7sYHbQMxXLXWAQ/exec";

// ── Isometric Grid — same as ContextsPage ────────────────────────────────────
function IsometricHoverGrid({
  cellW = 100,
  cellH = 60,
  interactive = true,
}: {
  cellW?: number;
  cellH?: number;
  interactive?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef    = useRef<number | null>(null);

  const cellCenter = (col: number, row: number, oX: number, oY: number) => ({
    x: oX + col * cellW + (row % 2 === 0 ? 0 : cellW / 2),
    y: oY + row * (cellH / 2),
  });

  const inDiamond = (px: number, py: number, cx: number, cy: number) =>
    Math.abs(px - cx) / (cellW / 2) + Math.abs(py - cy) / (cellH / 2) <= 1;

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    if (interactive) {
      canvas.addEventListener('mousemove', onMove);
      canvas.addEventListener('mouseleave', onLeave);
    }

    const alphaMap = new Map<string, number>();

    const loop = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const cols   = Math.ceil(W / cellW) + 2;
      const rows   = Math.ceil(H / (cellH / 2)) + 2;
      const offsetX = -cellW / 2, offsetY = -cellH / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const { x: cx, y: cy } = cellCenter(col, row, offsetX, offsetY);
          const key = `${col},${row}`;

          const hovered = interactive ? inDiamond(mx, my, cx, cy) : false;
          const target  = hovered ? 1 : 0;
          const current = (alphaMap.get(key) ?? 0) + (target - (alphaMap.get(key) ?? 0)) * 0.1;
          alphaMap.set(key, current);

          ctx.beginPath();
          ctx.moveTo(cx,             cy - cellH / 2);
          ctx.lineTo(cx + cellW / 2, cy);
          ctx.lineTo(cx,             cy + cellH / 2);
          ctx.lineTo(cx - cellW / 2, cy);
          ctx.closePath();

          ctx.strokeStyle = `rgba(255,255,255,${0.06 + current * 0.12})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();

          if (current > 0.005) {
            ctx.fillStyle = `rgba(163,163,163,${current * 0.25})`;
            ctx.fill();
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      if (interactive) {
        canvas.removeEventListener('mousemove', onMove);
        canvas.removeEventListener('mouseleave', onLeave);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cellW, cellH, interactive]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: interactive ? 'auto' : 'none',
        cursor:        interactive ? 'crosshair' : 'default',
      }}
    />
  );
}

// ── IsoBox — vector55.png snapped to a grid cell ─────────────────────────────
interface IsoBoxProps {
  src?: string;
  cellW: number;
  cellH: number;
  col: number;
  row: number;
  opacity?: number;
}
const IsoBox: React.FC<IsoBoxProps> = ({
  src = '/vector 55.png',
  cellW, cellH, col, row,
  opacity = 0.9,
}) => {
  const offsetX = -cellW / 2;
  const offsetY = -cellH / 2;
  const cx = offsetX + col * cellW + (row % 2 === 0 ? 0 : cellW / 2);
  const cy = offsetY + row * (cellH / 2);

  return (
    <img
      src={src}
      alt=""
      style={{
        position:      'absolute',
        left:           cx,
        top:            cy,
        width:          cellW,
        height:         cellH,
        transform:      'translate(-50%, -50%)',
        objectFit:      'fill',
        opacity,
        pointerEvents: 'none',
        mixBlendMode:   'screen',
        zIndex:         10,
      }}
    />
  );
};

// ── Shared input class helper ─────────────────────────────────────────────────
const inputCls = (hasError?: boolean) =>
  `w-full bg-[#0A0A0A] border ${hasError ? 'border-red-500/60' : 'border-[#2a2a2a]'} px-2 py-[7px] rounded-md text-xs outline-none focus:border-white/40 transition-colors text-white placeholder-white/30`;

// ── Types ─────────────────────────────────────────────────────────────────────
interface Step1Data { fullName: string; role: string; phone: string; email: string; }
interface Step2Data {
  companyName: string; website: string; registeredAddress: string;
  teamMembers: string; fundingRaised: string; annualRevenue: string; startupDescription: string;
}
interface Step3Data { areas: string[]; challenges: string; }

// ── Validation ────────────────────────────────────────────────────────────────
const validateStep1 = (data: Step1Data): Partial<Step1Data> => {
  const e: Partial<Step1Data> = {};
  if (!data.role.trim()) e.role = 'Role / Title is required.';
  if (!data.phone.trim()) e.phone = 'Phone number is required.';
  if (!data.email.trim()) e.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email address.';
  return e;
};

const validateStep2 = (data: Step2Data): Partial<Step2Data> => {
  const e: Partial<Step2Data> = {};
  if (!data.companyName.trim()) e.companyName = 'Company name is required.';
  if (!data.registeredAddress.trim()) e.registeredAddress = 'Registered address is required.';
  if (!data.teamMembers.trim()) e.teamMembers = 'Number of team members is required.';
  if (!data.fundingRaised.trim()) e.fundingRaised = 'Please select a funding option.';
  if (!data.annualRevenue.trim()) e.annualRevenue = 'Annual revenue is required.';
  if (!data.startupDescription.trim()) e.startupDescription = 'Please describe your startup.';
  return e;
};

const validateStep3 = (data: Step3Data): { areas?: string } => {
  if (data.areas.length === 0) return { areas: 'Please select at least one area.' };
  return {};
};

// ── Constants ─────────────────────────────────────────────────────────────────
const FUNDING_OPTIONS = [
  'Not Raised', 'To Be Raised', 'Less Than 100K',
  '100K to 200K', '200K to 500K', '500K to 1M', 'More Than 1M',
];

const AREAS = [
  'Cybersecurity (Ascella Infosec)',
  'Software Development & Cloud (Ascella Software Labs)',
  'HR & Staffing (Ascella Staffing)',
  'BPO, Sales, Project Management (Ascella Engage)',
  'Marketing & Growth (Ascella Forge)',
];

// ── Main Component ─────────────────────────────────────────────────────────────
const Alignments = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [step1Data, setStep1Data] = useState<Step1Data>({ fullName: '', role: '', phone: '', email: '' });
  const [step2Data, setStep2Data] = useState<Step2Data>({
    companyName: '', website: '', registeredAddress: '',
    teamMembers: '', fundingRaised: '', annualRevenue: '', startupDescription: '',
  });
  const [step3Data, setStep3Data] = useState<Step3Data>({ areas: [], challenges: '' });

  const [step1Errors, setStep1Errors] = useState<Partial<Step1Data>>({});
  const [step2Errors, setStep2Errors] = useState<Partial<Step2Data>>({});
  const [step3Errors, setStep3Errors] = useState<{ areas?: string }>({});

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateStep1(step1Data);
    if (Object.keys(errors).length > 0) { setStep1Errors(errors); return; }
    setStep1Errors({});
    setCurrentStep(2);
  };

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateStep2(step2Data);
    if (Object.keys(errors).length > 0) { setStep2Errors(errors); return; }
    setStep2Errors({});
    setCurrentStep(3);
  };

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateStep3(step3Data);
    if (Object.keys(errors).length > 0) { setStep3Errors(errors); return; }
    setStep3Errors({});
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        id:                 `ALN-${Date.now()}`,
        submittedAt:        new Date().toISOString(),
        // Step 1
        fullName:           step1Data.fullName,
        role:               step1Data.role,
        phone:              step1Data.phone,
        email:              step1Data.email,
        // Step 2
        companyName:        step2Data.companyName,
        website:            step2Data.website,
        registeredAddress:  step2Data.registeredAddress,
        teamMembers:        step2Data.teamMembers,
        fundingRaised:      step2Data.fundingRaised,
        annualRevenue:      step2Data.annualRevenue,
        startupDescription: step2Data.startupDescription,
        // Step 3
        areas:              step3Data.areas,
        challenges:         step3Data.challenges,
      };

      // Apna dedicated sheet — koi routing logic nahi, seedha jaata hai
      await fetch(ALIGNMENTS_SHEET_URL, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body:    JSON.stringify(payload),
      });

      // no-cors mein response nahi milta, assume success
      setCurrentStep(4);
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleArea = (area: string) => {
    const newAreas = step3Data.areas.includes(area)
      ? step3Data.areas.filter(a => a !== area)
      : [...step3Data.areas, area];
    setStep3Data({ ...step3Data, areas: newAreas });
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center py-20 font-sans overflow-hidden relative">

      {/* Header Section */}
      <div className="flex flex-col items-center w-full max-w-[720px] text-center px-4 z-10 relative">
        <Reveal variants={slideInFromBottom(0.1)}>
          <header className="flex flex-col gap-6">
            <h3 className="text-[28px] md:text-[36px] lg:text-[40px] leading-[1.1] tracking-tight">
              Alignment is the first step toward structured execution readiness.
            </h3>
            <p className="text-white/60 text-sm md:text-base max-w-[500px] mx-auto leading-relaxed">
              The Startups Programme begins with an alignment conversation focused on
              operating context, accountability expectations, and readiness for governed execution.
            </p>
          </header>
        </Reveal>
      </div>

      {/* ── Desktop grid (md and above) ─────────────────────────────────────── */}
      <Reveal variants={slideInFromBottom(0.2)} className="relative my-[-20px] hidden md:block">
        <div
          style={{
            width:  '720px',
            height: '160px',
            WebkitMaskImage: [
              'linear-gradient(to right,  transparent 0%, black 12%, black 88%, transparent 100%)',
              'linear-gradient(to bottom, transparent 0%, black 20%, black 75%, transparent 100%)',
            ].join(', '),
            maskImage: [
              'linear-gradient(to right,  transparent 0%, black 12%, black 88%, transparent 100%)',
              'linear-gradient(to bottom, transparent 0%, black 20%, black 75%, transparent 100%)',
            ].join(', '),
            WebkitMaskComposite: 'destination-in',
            maskComposite:       'intersect',
          }}
        >
          <IsometricHoverGrid cellW={100} cellH={60} interactive={true} />

          {/* left tile — slightly faded */}
          <IsoBox cellW={100} cellH={60} col={2} row={3} opacity={0.45} />
          {/* centre tile — most prominent */}
          <IsoBox cellW={100} cellH={60} col={4} row={3} opacity={0.9} />
          {/* right tile — slightly faded */}
          <IsoBox cellW={100} cellH={60} col={6} row={3} opacity={0.45} />
        </div>
      </Reveal>

      {/* ── Mobile grid (below md) ───────────────────────────────────────────── */}
      <Reveal variants={slideInFromBottom(0.2)} className="relative my-[-20px] block md:hidden w-full">
        <div
          style={{
            height: '140px',
            WebkitMaskImage: [
              'linear-gradient(to right,  transparent 0%, black 8%, black 92%, transparent 100%)',
              'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
            ].join(', '),
            maskImage: [
              'linear-gradient(to right,  transparent 0%, black 8%, black 92%, transparent 100%)',
              'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
            ].join(', '),
            WebkitMaskComposite: 'destination-in',
            maskComposite:       'intersect',
          }}
        >
          <IsometricHoverGrid cellW={60} cellH={36} interactive={false} />

          <IsoBox cellW={60} cellH={36} col={2} row={4} opacity={0.45} />
          <IsoBox cellW={60} cellH={36} col={4} row={4} opacity={0.9} />
          <IsoBox cellW={60} cellH={36} col={6} row={4} opacity={0.45} />
        </div>
      </Reveal>

      {/* ── FORM CONTAINER BOX ── */}
      <Reveal variants={slideInFromBottom(0.3)} className="w-full flex justify-center">
        <div
          className="
            w-full
            mx-10 md:mx-auto
            max-w-[calc(100%-80px)] md:max-w-[480px]
            border border-[#3D3D3D] rounded-[8px]
            bg-[#000]/90 backdrop-blur-md
            flex flex-col items-center
            px-5 md:px-[60px]
            z-20 relative
            mt-[10px]
          "
          style={{ paddingTop: '24px', paddingBottom: '24px' }}
        >
          {/* Step indicator */}
          {currentStep < 4 && (
            <div className="w-full flex items-center gap-2 mb-4">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div
                    className={`text-xs font-medium transition-colors ${
                      currentStep === step ? 'text-white' : currentStep > step ? 'text-white/50' : 'text-white/20'
                    }`}
                  >
                    Step {step}
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-px transition-colors ${currentStep > step ? 'bg-white/40' : 'bg-white/10'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Top Icon — original image-1.png, unchanged */}
          <div className="mb- flex justify-center">
            <img src="/image-1.png" alt="Icon" className="w-14 h-14 md:w-20 md:h-20 object-contain" />
          </div>

          {/* Form Content */}
          <div className="w-full flex flex-col gap-4 text-center">
            {currentStep < 4 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-xl md:text-2xl font-normal tracking-tight text-white/90">
                  Let's Get You Started
                </h3>
                <p className="text-white/40 text-xs md:text-sm max-w-[340px] mx-auto leading-relaxed">
                  Fill out the form below and we'll get in touch to explore how Ascella can help power your success
                </p>
              </div>
            )}

            {/* ── STEP 1 ── */}
            {currentStep === 1 && (
              <form className="flex flex-col gap-3 text-left mt-1" onSubmit={handleStep1Next} noValidate>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={step1Data.fullName}
                  onChange={e => setStep1Data({ ...step1Data, fullName: e.target.value })}
                  className={inputCls()}
                />
                <div>
                  <input
                    type="text"
                    placeholder="Your Role / Title *"
                    value={step1Data.role}
                    onChange={e => setStep1Data({ ...step1Data, role: e.target.value })}
                    className={inputCls(!!step1Errors.role)}
                  />
                  {step1Errors.role && <p className="text-red-400 text-[10px] mt-1 pl-1">{step1Errors.role}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={step1Data.phone}
                    onChange={e => setStep1Data({ ...step1Data, phone: e.target.value })}
                    className={inputCls(!!step1Errors.phone)}
                  />
                  {step1Errors.phone && <p className="text-red-400 text-[10px] mt-1 pl-1">{step1Errors.phone}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={step1Data.email}
                    onChange={e => setStep1Data({ ...step1Data, email: e.target.value })}
                    className={inputCls(!!step1Errors.email)}
                  />
                  {step1Errors.email && <p className="text-red-400 text-[10px] mt-1 pl-1">{step1Errors.email}</p>}
                </div>

                <div className="mt-5 flex justify-center">
                  <button
                    type="submit"
                    className="bg-white text-black font-semibold py-2.5 px-10 rounded-md hover:bg-gray-200 transition-all active:scale-[0.98] text-sm"
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {/* ── STEP 2 ── */}
            {currentStep === 2 && (
              <form className="flex flex-col gap-2.5 text-left mt-1" onSubmit={handleStep2Next} noValidate>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Company Name *"
                      value={step2Data.companyName}
                      onChange={e => setStep2Data({ ...step2Data, companyName: e.target.value })}
                      className={inputCls(!!step2Errors.companyName)}
                    />
                    {step2Errors.companyName && <p className="text-red-400 text-[10px] mt-1 pl-1">{step2Errors.companyName}</p>}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Website (if available)"
                      value={step2Data.website}
                      onChange={e => setStep2Data({ ...step2Data, website: e.target.value })}
                      className={inputCls()}
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Registered Address *"
                    value={step2Data.registeredAddress}
                    onChange={e => setStep2Data({ ...step2Data, registeredAddress: e.target.value })}
                    className={inputCls(!!step2Errors.registeredAddress)}
                  />
                  {step2Errors.registeredAddress && <p className="text-red-400 text-[10px] mt-1 pl-1">{step2Errors.registeredAddress}</p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Number of Team Members *"
                      value={step2Data.teamMembers}
                      onChange={e => setStep2Data({ ...step2Data, teamMembers: e.target.value })}
                      className={inputCls(!!step2Errors.teamMembers)}
                    />
                    {step2Errors.teamMembers && <p className="text-red-400 text-[10px] mt-1 pl-1">{step2Errors.teamMembers}</p>}
                  </div>
                  <div className="flex-1 relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(v => !v)}
                      className={`w-full bg-[#0A0A0A] border ${step2Errors.fundingRaised ? 'border-red-500/60' : 'border-[#2a2a2a]'} px-2 py-[7px] rounded-md text-xs outline-none focus:border-white/40 transition-colors text-left flex items-center justify-between`}
                    >
                      <span className={step2Data.fundingRaised ? 'text-white' : 'text-white/30'}>
                        {step2Data.fundingRaised || 'Funding Raised (USD) *'}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 text-white/40 transition-transform flex-shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {step2Errors.fundingRaised && <p className="text-red-400 text-[10px] mt-1 pl-1">{step2Errors.fundingRaised}</p>}
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-[#111] border border-[#2a2a2a] rounded-md z-50 overflow-hidden">
                        {FUNDING_OPTIONS.map(opt => (
                          <button
                            key={opt}
                            type="button"
                            className="w-full text-left px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition-colors"
                            onClick={() => {
                              setStep2Data({ ...step2Data, fundingRaised: opt });
                              setDropdownOpen(false);
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Annual Revenue or ARR (USD) *"
                    value={step2Data.annualRevenue}
                    onChange={e => setStep2Data({ ...step2Data, annualRevenue: e.target.value })}
                    className={inputCls(!!step2Errors.annualRevenue)}
                  />
                  {step2Errors.annualRevenue && <p className="text-red-400 text-[10px] mt-1 pl-1">{step2Errors.annualRevenue}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Briefly Describe Your Startup *"
                    value={step2Data.startupDescription}
                    onChange={e => setStep2Data({ ...step2Data, startupDescription: e.target.value })}
                    className={inputCls(!!step2Errors.startupDescription)}
                  />
                  {step2Errors.startupDescription && <p className="text-red-400 text-[10px] mt-1 pl-1">{step2Errors.startupDescription}</p>}
                </div>

                <div className="mt-3 flex flex-col items-center gap-3">
                  <button
                    type="submit"
                    className="w-full bg-white text-black font-semibold py-2.5 px-10 rounded-md hover:bg-gray-200 transition-all active:scale-[0.98] text-sm"
                  >
                    Next
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-white/50 text-xs hover:text-white/80 transition-colors flex items-center gap-1"
                  >
                    ← Back
                  </button>
                </div>
              </form>
            )}

            {/* ── STEP 3 ── */}
            {currentStep === 3 && (
              <form className="flex flex-col gap-3 text-left mt-1" onSubmit={handleStep3Submit} noValidate>
                <div>
                  <p className="text-white/70 text-xs mb-2.5">Which Areas Are You Interested In? (multi-select)</p>
                  <div className="flex flex-col gap-2">
                    {AREAS.map(area => (
                      <label
                        key={area}
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => toggleArea(area)}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                            step3Data.areas.includes(area)
                              ? 'border-white bg-white'
                              : 'border-white/30 group-hover:border-white/60'
                          }`}
                        >
                          {step3Data.areas.includes(area) && (
                            <div className="w-1.5 h-1.5 rounded-full bg-black" />
                          )}
                        </div>
                        <span className={`text-xs transition-colors ${
                          step3Data.areas.includes(area) ? 'text-white' : 'text-white/50 group-hover:text-white/80'
                        }`}>
                          {area}
                        </span>
                      </label>
                    ))}
                  </div>
                  {step3Errors.areas && <p className="text-red-400 text-[10px] mt-2 pl-1">{step3Errors.areas}</p>}
                </div>

                <div>
                  <p className="text-white/70 text-xs mb-1.5">What Challenges Are You Facing Right Now?</p>
                  <input
                    type="text"
                    value={step3Data.challenges}
                    onChange={e => setStep3Data({ ...step3Data, challenges: e.target.value })}
                    className={inputCls()}
                  />
                </div>

                {submitError && (
                  <p className="text-red-400 text-[10px] text-center">{submitError}</p>
                )}

                <div className="mt-3 flex flex-col items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-semibold py-2.5 px-10 rounded-md hover:bg-gray-200 transition-all active:scale-[0.98] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                  <p className="text-white/30 text-[10px] text-center leading-relaxed">
                    We've combined these capabilities under one roof to help startups grow faster, safer, and smarter.
                  </p>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setCurrentStep(2)}
                    className="text-white/50 text-xs hover:text-white/80 transition-colors flex items-center gap-1 disabled:opacity-40"
                  >
                    ← Back
                  </button>
                </div>
              </form>
            )}

            {/* ── STEP 4 — Success ── */}
            {currentStep === 4 && (
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <h3 className="text-xl md:text-2xl font-normal tracking-tight text-white/90">
                  Application Submitted!
                </h3>
                <p className="text-white/40 text-xs md:text-sm max-w-[300px] leading-relaxed">
                  Thank you for reaching out. We'll review your details and get in touch shortly to begin the alignment process.
                </p>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      {/* Bottom divider */}
      <div className="w-full border-t border-white/20 mt-[50px]" />
    </div>
  );
};

export default Alignments;