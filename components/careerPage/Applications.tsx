import React from 'react';

const Applications: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans flex flex-col items-center">
      
      {/* 1. Top Horizontal Grid Line (Starts from 0 to Full Width) */}
      <div className="w-full h-[1px] bg-zinc-800/50  mb-10"></div>

      {/* Header Section */}
      <div className="w-full max-w-5xl mb-16 self-start pl-30">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 border border-zinc-500 flex items-center justify-center rotate-45">
            <div className="w-1.5 h-1.5 bg-white"></div>
          </div>
          <h2 className="text-zinc-400 text-[10px] tracking-[0.4em] uppercase font-bold">Application Process</h2>
        </div>
        <h1 className="text-5xl font-light mb-5 leading-tight max-w-4xl text-zinc-100">
          Applications follow a structured evaluation and alignment process designed to ensure operating and accountability fit.
        </h1>
        <p className="text-zinc-500 text-base max-w-2xl leading-relaxed">
          The objective of the process is not only to <br/>
          evaluate experience, but to confirm readiness
          <br/> to operate within structured delivery models
          <br/> and defined decision frameworks.
        </p>
      </div>

      {/* Main Flowchart Container */}
      <div className="flex flex-col items-center w-full max-w-6xl px-4 pb-20">
        
        {/* Step 1: Initial Flow */}
        <Pill label="Application" active />
        <VerticalLine height="h-10" />
        <Pill label="Submit application" />
        <VerticalLine height="h-10" />
        <Pill label="Initial review" />
        
        {/* Section 1 - Branches */}
        <div className="w-full">
          <ConnectorSVG />
          <div className="grid grid-cols-3 gap-12">
            <InfoBox title="Operating fit" items={["Experience in environments", "Comfort with models"]} />
            <InfoBox title="Execution maturity" items={["Delivery ownership history", "Risk and escalation", "Cross-team coordination"]} />
            <InfoBox title="Role alignment" items={["Scope responsibility match", "Decision authority", "Reporting structure"]} />
          </div>
        </div>

        <VerticalLine height="h-24" />

        {/* Step 2: Mid Flow */}
        <Pill label="Structured conversations" />

        <div className="w-full">
          <ConnectorSVG />
          <div className="grid grid-cols-3 gap-12">
            <InfoBox title="Accountability expectations" items={["Ownership of outcomes", "Measurement approach"]} />
            <InfoBox title="Operating discipline" items={["Documentation habits", "Process adherence", "Change control"]} />
            <InfoBox title="Execution context" items={["Pod-based delivery", "Multi-stakeholder", "Regulated operations"]} />
          </div>
        </div>

        <VerticalLine height="h-24" />

        {/* Step 3: Final Flow */}
        <Pill label="Final alignment" />
        
        <div className="w-full">
          <ConnectorSVG />
          <div className="grid grid-cols-3 gap-12">
            <InfoBox title="Role scope confirmation" items={["What the role owns", "What the role does not own"]} />
            <InfoBox title="Reporting structure" items={["Reporting line", "Escalation path", "Oversight ownership"]} />
            <InfoBox title="Decision authority" items={["Approval rights", "Delegation limits"]} />
          </div>
        </div>

        <VerticalLine height="h-20" />
        <Pill label="Onboarding" />
        
        {/* Onboarding Details */}
        <div className="mt-6 flex flex-col items-center w-full max-w-[380px]">
          <VerticalLine height="h-8" />
          <div className="bg-zinc-900/20 border border-zinc-800/60 p-6 rounded-lg w-full backdrop-blur-sm">
            <ul className="space-y-4">
              <li className="text-xs text-zinc-400 flex items-start gap-3">
                <span className="text-white mt-1.5 w-1 h-1 bg-zinc-400 rounded-full flex-shrink-0"></span>
                Governance orientation
              </li>
              <li className="text-xs text-zinc-400 flex items-start gap-3">
                <span className="text-white mt-1.5 w-1 h-1 bg-zinc-400 rounded-full flex-shrink-0"></span>
                Pod and team integration
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const ConnectorSVG: React.FC = () => (
  <svg className="w-full h-16" viewBox="0 0 1200 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Central connection from above */}
    <line x1="600" y1="0" x2="600" y2="24" stroke="#3f3f46" strokeWidth="1"/>
    
    {/* The horizontal bridge with rounded corners */}
    <path d="M200 48 V 40 Q 200 24 216 24 H 584 Q 600 24 600 24 H 984 Q 1000 24 1000 40 V 48" 
          stroke="#3f3f46" strokeWidth="1" fill="none" />
    
    {/* Middle straight line */}
    <line x1="600" y1="24" x2="600" y2="64" stroke="#3f3f46" strokeWidth="1"/>
    
    {/* Side tips to hit the pills below */}
    <line x1="200" y1="48" x2="200" y2="64" stroke="#3f3f46" strokeWidth="1"/>
    <line x1="1000" y1="48" x2="1000" y2="64" stroke="#3f3f46" strokeWidth="1"/>
  </svg>
);

const InfoBox: React.FC<{ title?: string; items: string[] }> = ({ title, items }) => (
  <div className="flex flex-col items-center w-full">
    {title && (
      <div className="border border-zinc-800 px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest mb-6 bg-black font-semibold z-10 text-zinc-200">
        {title}
      </div>
    )}
    <div className="bg-zinc-900/30 border border-zinc-800/50 p-6 rounded-md w-full shadow-xl">
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="text-[11px] text-zinc-500 flex items-start gap-3 leading-snug">
            <span className="text-zinc-600 mt-1.5 w-1 h-1 bg-zinc-600 rounded-full flex-shrink-0"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Pill: React.FC<{ label: string; active?: boolean }> = ({ label, active = false }) => (
  <div className={`px-12 py-3 rounded-full border border-zinc-800 text-[12px] font-bold uppercase tracking-[0.2em] z-10 transition-all
    ${active ? 'bg-white text-black border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-black text-zinc-100'}`}>
    {label}
  </div>
);

const VerticalLine: React.FC<{ height?: string }> = ({ height = "h-12" }) => (
  <div className={`${height} w-[1px] bg-zinc-800`} />
);


export default Applications;