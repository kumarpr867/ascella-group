"use client";

import React from 'react';
import { motion } from 'motion/react';

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Har element ke beech ka gap
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any as any } 
  },
};

const lineVariants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: { 
    scaleY: 1, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any as any } 
  },
};

const Applications: React.FC = () => {
  return (
    <div className="hidden lg:flex bg-black text-white min-h-screen font-sans flex-col items-center overflow-x-hidden">
      {/* Top Border Line */}
      <div className="w-full h-[1px] bg-zinc-800/50 mb-10"></div>

      {/* Header Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full max-w-5xl mb-16 self-start pl-30"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-3">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10.833" width="4.33333" height="10.8333" fill="white"/>
            <rect x="10.833" y="15.1667" width="4.33333" height="10.8333" fill="white"/>
            <rect x="15.167" y="10.8333" width="10.8333" height="4.33333" fill="white"/>
            <rect y="10.8333" width="10.8333" height="4.33333" fill="white"/>
          </svg>
          <h2 className=" text-[16px] tracking-[0.4em] uppercase">Application Process</h2>
        </motion.div>
        <motion.h3 variants={itemVariants} className="text-2.5xl mb-3 leading-tight max-w-[713px] ">
          Applications follow a structured evaluation and alignment process designed to ensure operating and accountability fit.
        </motion.h3>
        <motion.p variants={itemVariants} className="text-gray-300  max-w-2xl leading-relaxed">
          The objective of the process is not only to <br/>
          evaluate experience, but to confirm readiness
          <br /> to operate within structured delivery models
          <br /> and defined decision frameworks.
        </motion.p>
      </motion.div>

      {/* Process Tree Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="flex flex-col items-center w-full max-w-6xl px-4 pb-20 relative"
      >
        <motion.div variants={itemVariants}><Pill label="Application" active /></motion.div>
        <VerticalLine height="h-10" />
        <motion.div variants={itemVariants}><Pill label="Submit application" /></motion.div>
        <VerticalLine height="h-10" />
        <motion.div variants={itemVariants}><Pill label="Initial review" /></motion.div>

        {/* SECTION 1 */}
        <BranchConnector />
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-12 w-full items-stretch">
          <InfoBox title="Operating fit" items={["Experience in environments", "Comfort with models"]} />
          <InfoBox title="Execution maturity" items={["Delivery ownership history", "Risk and escalation", "Cross-team coordination"]} />
          <InfoBox title="Role alignment" items={["Scope responsibility match", "Decision authority", "Reporting structure"]} />
        </motion.div>

        {/* Connection to Structured Conversations */}
        <RightSideConnector />
        <motion.div variants={itemVariants}><Pill label="Structured conversations" /></motion.div>

        {/* SECTION 2 */}
        <BranchConnector />
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-12 w-full items-stretch">
          <InfoBox title="Accountability expectations" items={["Ownership of outcomes", "Measurement approach"]} />
          <InfoBox title="Operating discipline" items={["Documentation habits", "Process adherence", "Change control"]} />
          <InfoBox title="Execution context" items={["Pod-based delivery", "Multi-stakeholder", "Regulated operations"]} />
        </motion.div>

        {/* Connection to Final Alignment */}
        <RightSideConnector />
        <motion.div variants={itemVariants}><Pill label="Final alignment" /></motion.div>

        {/* SECTION 3 */}
        <BranchConnector />
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-12 w-full items-stretch">
          <InfoBox title="Role scope confirmation" items={["What the role owns", "What the role does not own"]} />
          <InfoBox title="Reporting structure" items={["Reporting line", "Escalation path", "Oversight ownership"]} />
          <InfoBox title="Decision authority" items={["Approval rights", "Delegation limits"]} />
        </motion.div>

        {/* Connection to Onboarding */}
        <RightSideConnector />
        <motion.div variants={itemVariants}><Pill label="Onboarding" /></motion.div>

        <div className="mt-0 flex flex-col items-center w-full max-w-[380px]">
          <VerticalLine height="h-8" />
          <motion.div variants={itemVariants} className="bg-zinc-900/30 border border-zinc-800/60 hover:bg-white hover:text-black hover:border-white p-6 rounded-lg w-full backdrop-blur-sm transition-all duration-300 group/footer">
            <ul className="space-y-2">
              <li className="text-xs flex items-start gap-3">
                <span className="mt-1.5 w-1 h-1 bg-zinc-400 group-hover/footer:bg-black rounded-full flex-shrink-0 transition-colors"></span>
                Governance orientation
              </li>
              <li className="text-xs flex items-start gap-3">
                <span className="mt-1.5 w-1 h-1 bg-zinc-400 group-hover/footer:bg-black rounded-full flex-shrink-0 transition-colors"></span>
                Pod and team integration
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="absolute bottom-0 w-screen h-[1px] bg-zinc-800/50 left-1/2 -translate-x-1/2"></div>
      </motion.div>
    </div>
  );
};

// --- Custom Components with SVG Animation ---

const RightSideConnector: React.FC = () => {
  return (
    <svg className="w-full" height="80" viewBox="0 0 1200 80" fill="none" preserveAspectRatio="none">
      <motion.path 
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
        d="M 1000 0 V 30 Q 1000 40 990 40 H 610 Q 600 40 600 50 V 80" 
        stroke="#52525b" 
        strokeWidth="1" 
        fill="none" 
      />
    </svg>
  );
};

const BranchConnector: React.FC = () => {
  return (
    <svg className="w-full" height="64" viewBox="0 0 1200 64" fill="none" preserveAspectRatio="none">
      <motion.line 
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        x1="600" y1="0" x2="600" y2="64" stroke="#52525b" strokeWidth="1"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        d="M 600 24 H 210 Q 200 24 200 34 V 64"
        stroke="#52525b" strokeWidth="1" fill="none"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        d="M 600 24 H 990 Q 1000 24 1000 34 V 64"
        stroke="#52525b" strokeWidth="1" fill="none"
      />
    </svg>
  );
};

const InfoBox: React.FC<{ title?: string; items: string[] }> = ({ title, items }) => (
  <div className="flex flex-col items-center w-full group flex-1">
    {title && (
      <div className="border border-zinc-800 group-hover:border-white group-hover:bg-white group-hover:text-black px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest mb-6 bg-black font-semibold z-10 transition-all duration-300">
        {title}
      </div>
    )}
    <div className="bg-zinc-900/30 border border-zinc-800/50 group-hover:bg-white p-6 rounded-md w-full h-full shadow-xl transition-all duration-300 flex items-center justify-center">
      <ul className="space-y-2 w-full">
        {items.map((item, i) => (
          <li key={i} className="text-[11px] text-zinc-400 group-hover:text-black flex items-start gap-1 leading-snug transition-colors duration-300">
            <span className="mt-1.5 w-1 h-1 bg-zinc-600 group-hover:bg-black rounded-full flex-shrink-0 transition-colors duration-300"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Pill: React.FC<{ label: string; active?: boolean }> = ({ label, active = false }) => (
  <div className={`px-12 py-3 rounded-full border text-[12px] uppercase tracking-[0.2em] z-10 transition-all duration-300 cursor-default
    ${active
      ? 'bg-white text-black border-transparent hover:bg-black hover:text-white hover:border-zinc-500 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
      : 'bg-black text-zinc-100 border-zinc-800 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]'
    }`}>
    {label}
  </div>
);

const VerticalLine: React.FC<{ height?: string }> = ({ height = "h-12" }) => (
  <motion.div 
    variants={lineVariants}
    className={`${height} w-[1px] bg-zinc-800`} 
  />
);

export default Applications;