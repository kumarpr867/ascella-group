'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';

// ── Google Sheets Web App URL ─────────────────────────────────────────────────
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxMj27RQ5tvoPHk4L_xN7pJ4XMxXOqKT7lYAXWvu7zaZI0561P3KE35PXAThEk-MaTL/exec';

// ── LocalStorage helpers ──────────────────────────────────────────────────────
const LS_KEY = 'ascella_form_submissions';

type FormSubmission = {
  id: string;
  submittedAt: string;
  fullName: string;
  orgName: string;
  role: string;
  email: string;
  orgSize: string;
  primaryNeeds: string[];
  challenge: string;
};

function saveSubmission(data: Omit<FormSubmission, 'id' | 'submittedAt'>) {
  try {
    const existing: FormSubmission[] = JSON.parse(localStorage.getItem(LS_KEY) ?? '[]');
    const entry: FormSubmission = {
      ...data,
      id: Date.now().toString(),
      submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    };
    existing.unshift(entry);
    localStorage.setItem(LS_KEY, JSON.stringify(existing));
    return true;
  } catch { return false; }
}

// ── Google Sheets sync ────────────────────────────────────────────────────────
async function syncToGoogleSheets(entry: FormSubmission): Promise<void> {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    console.log('[Ascella] Synced to Google Sheets:', entry.id);
  } catch (err) {
    console.error('[Ascella] Google Sheets sync failed:', err);
  }
}

// ── Toast Notification ────────────────────────────────────────────────────────
const Toast: React.FC<{ show: boolean }> = ({ show }) => (
  <div
    style={{
      position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
      background: '#ffffff', color: '#000000', padding: '10px 20px',
      fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em',
      borderRadius: '2px', boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
      opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(-12px)',
      transition: 'opacity 0.3s ease, transform 0.3s ease', pointerEvents: 'none',
    }}
  >
    Form Submitted
  </div>
);

// ── Animated Submit Button ────────────────────────────────────────────────────
const SubmitButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="relative w-max px-6 py-2 text-xs overflow-hidden transition-all duration-300"
      style={{ minWidth: '90px', color: hovered ? '#000' : '#fff', background: hovered ? '#fff' : 'transparent', border: 'none', outline: 'none' }}>
      <span className="absolute top-0 left-0 border-t border-l border-gray-400 transition-all duration-300"
        style={{ width: hovered ? '0' : '8px', height: hovered ? '0' : '8px', pointerEvents: 'none' }} />
      <span className="absolute top-0 right-0 border-t border-r border-gray-400 transition-all duration-300"
        style={{ width: hovered ? '0' : '8px', height: hovered ? '0' : '8px', pointerEvents: 'none' }} />
      <span className="absolute bottom-0 left-0 border-b border-l border-gray-400 transition-all duration-300"
        style={{ width: hovered ? '0' : '8px', height: hovered ? '0' : '8px', pointerEvents: 'none' }} />
      <span className="absolute bottom-0 right-0 border-b border-r border-gray-400 transition-all duration-300"
        style={{ width: hovered ? '0' : '8px', height: hovered ? '0' : '8px', pointerEvents: 'none' }} />
      <span className="relative z-10 tracking-wide">Submit</span>
    </button>
  );
};

// ── Org Size Selector ─────────────────────────────────────────────────────────
const ORG_SIZES = ['0–20', '21–50', '51–100', '101–500', '500+'];

const OrgSizeSelector: React.FC<{ value: string; onChange: (v: string) => void; small?: boolean; error?: boolean }> = ({
  value, onChange, small = false, error = false,
}) => (
  <div className="flex flex-wrap gap-1.5">
    {ORG_SIZES.map((size) => {
      const sel = value === size;
      return (
        <button key={size} type="button" onClick={() => onChange(size)}
          className={`transition-all duration-200 rounded border tracking-wide
            ${small ? 'px-2 py-1 text-[10px]' : 'px-2.5 py-1.5 text-[11px]'}
            ${sel ? 'border-gray-400 bg-white text-black'
              : error ? 'border-gray-400 text-gray-300 bg-transparent hover:border-gray-400 hover:text-white'
                : 'border-gray-400 bg-transparent text-gray-300 hover:border-gray-400 hover:text-white'}`}>
          {size}
        </button>
      );
    })}
  </div>
);

// ── Primary Need Checkboxes ───────────────────────────────────────────────────
const PRIMARY_NEEDS = ['Cyber Security', 'Custom Technology', 'Staffing & Manpower', 'Sales & Marketing'];

const PrimaryNeedCheckboxes: React.FC<{ values: string[]; onChange: (v: string[]) => void; small?: boolean; error?: boolean }> = ({
  values, onChange, small = false, error = false,
}) => {
  const toggle = (need: string) =>
    onChange(values.includes(need) ? values.filter((v) => v !== need) : [...values, need]);
  return (
    <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
      {PRIMARY_NEEDS.map((need) => {
        const checked = values.includes(need);
        return (
          <label key={need} className="flex items-center gap-1.5 cursor-pointer group" onClick={() => toggle(need)}>
            <span className={`flex-shrink-0 rounded-sm border transition-all duration-150
              ${small ? 'w-3 h-3' : 'w-3.5 h-3.5'}
              ${checked ? 'border-gray-400 bg-white'
                : error ? 'border-red-500 bg-transparent group-hover:border-gray-400'
                  : 'border-gray-400 bg-transparent group-hover:border-gray-300'}`}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {checked && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path d="M1 3L3 5L7 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className={`group-hover:text-white transition-colors whitespace-nowrap text-[11px]
              ${error && !checked ? 'text-gray-300' : 'text-gray-300'}`}>
              {need}
            </span>
          </label>
        );
      })}
    </div>
  );
};

// ── Role Searchable Dropdown ──────────────────────────────────────────────────
const ALL_ROLES = [
  'Chief Technology Officer (CTO)', 'Chief Information Officer (CIO)', 'Chief Digital Officer (CDO)',
  'Chief Information Security Officer (CISO)', 'VP of Engineering', 'VP of Product',
  'Director of Technology', 'Director of IT', 'Head of Cybersecurity', 'Head of Cloud Infrastructure',
  'Head of Data Engineering', 'Head of Software Development', 'Software Engineering Manager',
  'Solutions Architect', 'Enterprise Architect', 'DevOps Lead', 'IT Manager', 'Systems Administrator',
  'Chief Executive Officer (CEO)', 'Chief Operating Officer (COO)', 'Chief Financial Officer (CFO)',
  'Chief Revenue Officer (CRO)', 'Chief Marketing Officer (CMO)', 'Chief People Officer (CPO)',
  'Chief Strategy Officer (CSO)', 'Managing Director', 'General Manager', 'VP of Operations',
  'VP of Sales', 'VP of Business Development', 'VP of Marketing', 'VP of Finance',
  'Director of Operations', 'Director of Sales', 'Director of Business Development',
  'Director of Finance', 'Director of Marketing', 'Director of Human Resources',
  'Head of Strategy', 'Head of Partnerships', 'Head of Growth', 'Head of Customer Success',
  'Operations Manager', 'Business Development Manager', 'Sales Manager', 'Account Manager',
  'Project Manager', 'Program Manager', 'Product Manager', 'Marketing Manager',
  'Principal Consultant', 'Senior Consultant', 'Management Consultant', 'Strategy Consultant',
  'Technology Consultant', 'Business Analyst', 'Data Analyst', 'Financial Analyst',
  'Founder', 'Co-Founder', 'Owner', 'Partner', 'Managing Partner',
];

const RoleDropdown: React.FC<{ value: string; onChange: (v: string) => void; small?: boolean; error?: boolean }> = ({
  value, onChange, small = false, error = false,
}) => {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { if (!value) setQuery(''); }, [value]);

  const filtered = query.length < 1
    ? ALL_ROLES
    : ALL_ROLES.filter(r => r.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        if (!ALL_ROLES.includes(query)) setQuery(value);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [query, value]);

  const select = (role: string) => { onChange(role); setQuery(role); setOpen(false); };

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        placeholder="Search role or position..."
        value={query}
        onFocus={() => setOpen(true)}
        onChange={e => { setQuery(e.target.value); onChange(''); setOpen(true); }}
        autoComplete="off"
        className={`bg-transparent border px-2 py-1.5 rounded w-full focus:outline-none text-xs text-white placeholder-gray-300 transition-colors duration-200
          ${error && !value ? 'border-red-500' : 'border-gray-400'}`}
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600" style={{ fontSize: '9px' }}>▾</span>
      {open && filtered.length > 0 && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-[#0d0d0d] border border-gray-400 rounded overflow-y-auto" style={{ maxHeight: '160px' }}>
          {filtered.map(role => (
            <div key={role} onMouseDown={() => select(role)}
              className={`px-3 py-1.5 text-[11px] cursor-pointer transition-colors
                ${role === value ? 'bg-white text-black' : 'text-gray-300 hover:bg-[#1a1a1a] hover:text-white'}`}>
              {role}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Validation helpers ────────────────────────────────────────────────────────
const validate = {
  fullName: (v: string) => !v.trim() ? 'Full name is required' : v.trim().length < 2 ? 'Enter a valid name' : !/^[a-zA-Z\s'.\-]+$/.test(v.trim()) ? 'Name should only contain letters' : '',
  orgName: (v: string) => !v.trim() ? 'Organisation name is required' : '',
  role: (v: string) => !v.trim() ? 'Please select a role or position' : '',
  email: (v: string) => !v.trim() ? 'Email address is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email address' : '',
  orgSize: (v: string) => !v ? 'Please select an organisation size' : '',
  needs: (v: string[]) => v.length === 0 ? 'Select at least one operating need' : '',
};

// ── Shared AlignmentForm ──────────────────────────────────────────────────────
type AlignmentFormProps = { small?: boolean; onSubmit: (data: Omit<FormSubmission, 'id' | 'submittedAt'>) => void };

const AlignmentForm: React.FC<AlignmentFormProps> = ({ small = false, onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [orgSize, setOrgSize] = useState('');
  const [needs, setNeeds] = useState<string[]>([]);
  const [challenge, setChallenge] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const lbl = `${small ? 'text-xs' : 'text-[12px]'} text-white`;
  const inp = `bg-transparent border px-2 py-1.5 rounded w-full focus:outline-none text-xs text-white placeholder-gray-300 transition-colors duration-200`;
  const err = (k: string) => submitted && errors[k]
    ? <p className="text-[10px] text-red-400 mt-0.5">{errors[k]}</p> : null;

  const handleSubmit = () => {
    setSubmitted(true);
    const errs = {
      fullName: validate.fullName(fullName), orgName: validate.orgName(orgName),
      role: validate.role(role), email: validate.email(email),
      orgSize: validate.orgSize(orgSize), needs: validate.needs(needs),
    };
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    onSubmit({ fullName, orgName, role, email, orgSize, primaryNeeds: needs, challenge });
    setFullName(''); setOrgName(''); setRole(''); setEmail('');
    setOrgSize(''); setNeeds([]); setChallenge('');
    setSubmitted(false); setErrors({});
  };

  return (
    <div className="grid grid-cols-2 gap-3">

      {/* Full Name */}
      <div className="flex flex-col gap-0.5">
        <label className={lbl}>Full Name <span className="text-red-300">*</span></label>
        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
          placeholder="Enter your name" autoComplete="name"
          className={`${inp} ${submitted && errors.fullName ? 'border-red-500' : 'border-gray-400'}`} />
        {err('fullName')}
      </div>

      {/* Organisation Name */}
      <div className="flex flex-col gap-0.5">
        <label className={lbl}>Organisation name <span className="text-red-300">*</span></label>
        <input type="text" value={orgName} onChange={e => setOrgName(e.target.value)}
          placeholder="Organisation name" autoComplete="organization"
          className={`${inp} ${submitted && errors.orgName ? 'border-red-500' : 'border-gray-400'}`} />
        {err('orgName')}
      </div>

      {/* Role — searchable dropdown */}
      <div className="flex flex-col gap-0.5">
        <label className={lbl}>Role / Position <span className="text-red-300">*</span></label>
        <RoleDropdown value={role} onChange={setRole} small={small} error={submitted && !!errors.role} />
        {err('role')}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-0.5">
        <label className={lbl}>Email address <span className="text-red-300">*</span></label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="you@company.com" autoComplete="email"
          className={`${inp} ${submitted && errors.email ? 'border-red-500' : 'border-gray-400'}`} />
        {err('email')}
      </div>

      {/* Organisation Size */}
      <div className="col-span-2 flex flex-col gap-1.5">
        <label className={lbl}>Organisation size <span className="text-red-300">*</span></label>
        <OrgSizeSelector value={orgSize} onChange={setOrgSize} small={small} error={submitted && !!errors.orgSize} />
        {err('orgSize')}
      </div>

      {/* Primary Operating Need */}
      <div className="col-span-2 flex flex-col gap-1.5">
        <label className={lbl}>Primary operating need <span className="text-red-300">*</span></label>
        <PrimaryNeedCheckboxes values={needs} onChange={setNeeds} small={small} error={submitted && !!errors.needs} />
        {err('needs')}
      </div>

      {/* Challenge — optional */}
      <div className="col-span-2 flex flex-col gap-0.5">
        <label className={`${lbl} flex items-center gap-1.5`}>
          Describe your challenge
          <span className="text-[9px] tracking-widest">(Optional)</span>
        </label>
        <textarea placeholder="Describe your current execution or operating challenge..."
          value={challenge} onChange={e => setChallenge(e.target.value)}
          className="bg-transparent border border-gray-400 px-2 py-2 rounded text-xs text-white focus:outline-none focus:border-gray-400 resize-none placeholder-gray-300 transition-colors duration-200"
          style={{ height: '68px' }} />
      </div>

      {/* Submit */}
      <div className="col-span-2 mt-3">
        <SubmitButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

// ── Scroll direction hook ─────────────────────────────────────────────────────
function useScrollDirection() {
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > lastY.current) setDirection('down');
    else if (latest < lastY.current) setDirection('up');
    lastY.current = latest;
  });
  return direction;
}

// ── Direction-aware reveal wrapper ────────────────────────────────────────────
const RevealOnScroll: React.FC<{ children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }> = ({
  children, delay = 0, className, style,
}) => {
  const direction = useScrollDirection();
  const variants = {
    hidden: { opacity: 0, y: direction === 'down' ? 50 : -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any, delay } },
  };
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={variants} className={className} style={style}>
      {children}
    </motion.div>
  );
};

// ── Isometric Grid ────────────────────────────────────────────────────────────
function IsometricHoverGrid({ cellW = 100, cellH = 60, interactive = true }: { cellW?: number; cellH?: number; interactive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);

  const cellCenter = (col: number, row: number, oX: number, oY: number) => ({
    x: oX + col * cellW + (row % 2 === 0 ? 0 : cellW / 2),
    y: oY + row * (cellH / 2),
  });
  const inDiamond = (px: number, py: number, cx: number, cy: number) =>
    Math.abs(px - cx) / (cellW / 2) + Math.abs(py - cy) / (cellH / 2) <= 1;

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    if (interactive) { canvas.addEventListener('mousemove', onMove); canvas.addEventListener('mouseleave', onLeave); }

    const alphaMap = new Map<string, number>();
    const loop = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const cols = Math.ceil(W / cellW) + 2, rows = Math.ceil(H / (cellH / 2)) + 2;
      const offsetX = -cellW / 2, offsetY = -cellH / 2;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const { x: cx, y: cy } = cellCenter(col, row, offsetX, offsetY);
          const key = `${col},${row}`;
          const hovered = interactive ? inDiamond(mx, my, cx, cy) : false;
          const target = hovered ? 1 : 0;
          const current = (alphaMap.get(key) ?? 0) + (target - (alphaMap.get(key) ?? 0)) * 0.1;
          alphaMap.set(key, current);
          ctx.beginPath();
          ctx.moveTo(cx, cy - cellH / 2); ctx.lineTo(cx + cellW / 2, cy);
          ctx.lineTo(cx, cy + cellH / 2); ctx.lineTo(cx - cellW / 2, cy);
          ctx.closePath();
          ctx.strokeStyle = `rgba(255,255,255,${0.06 + current * 0.12})`; ctx.lineWidth = 0.5; ctx.stroke();
          if (current > 0.005) { ctx.fillStyle = `rgba(163,163,163,${current * 0.25})`; ctx.fill(); }
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener('resize', resize);
      if (interactive) { canvas.removeEventListener('mousemove', onMove); canvas.removeEventListener('mouseleave', onLeave); }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cellW, cellH, interactive]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: interactive ? 'auto' : 'none', cursor: interactive ? 'crosshair' : 'default' }} />;
}

interface IsoBoxProps { src?: string; cellW: number; cellH: number; col: number; row: number; opacity?: number; zIndex?: number; }
const IsoBox: React.FC<IsoBoxProps> = ({ src = '/vector 55.png', cellW, cellH, col, row, opacity = 0.9, zIndex = 10 }) => {
  const cx = (-cellW / 2) + col * cellW + (row % 2 === 0 ? 0 : cellW / 2);
  const cy = (-cellH / 2) + row * (cellH / 2);
  return <img src={src} alt="" style={{ position: 'absolute', left: cx, top: cy, width: cellW, height: cellH, transform: 'translate(-50%,-50%)', objectFit: 'fill', opacity, pointerEvents: 'none', mixBlendMode: 'screen', zIndex }} />;
};

// ── Hoverable Grid Cell ───────────────────────────────────────────────────────
// FIX: React state se hover track karo — direct DOM manipulation ki jagah
// Ye ensure karta hai ki motion.div ke saath bhi hover 100% reliable rahe
const HoverCell: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style = {} }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative ${className}`}
      style={{
        ...style,
        background: hovered ? 'rgba(61,61,61,0.42)' : 'transparent',
        transition: 'background 300ms ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
};

// ── Contact Section (Desktop) ─────────────────────────────────────────────────
type ContactSectionProps = {
  title: string; subtitle: string;
  email?: { value: string }; contact?: { values: string[] };
  location?: { address: string; postalCode: string }; workHours?: { hours: string };
};
const ContactSection: React.FC<ContactSectionProps> = ({ title, subtitle, email, contact, location, workHours }) => (
  <div className="w-full bg-black text-white overflow-hidden">
    <div className="relative border-b border-gray-400 flex items-end overflow-hidden" style={{ height: '500px' }}>
      <div className="absolute inset-0" style={{ WebkitMaskImage: 'radial-gradient(ellipse 75% 80% at 42% 48%, black 5%, transparent 75%)', maskImage: 'radial-gradient(ellipse 75% 80% at 42% 48%, black 5%, transparent 75%)', pointerEvents: 'auto' }}>
        <IsometricHoverGrid cellW={100} cellH={60} interactive={true} />
      </div>
      <IsoBox cellW={100} cellH={60} col={1} row={5} opacity={0.55} zIndex={10} />
      <IsoBox cellW={100} cellH={60} col={4} row={5} opacity={0.9} zIndex={10} />
      <div className="relative z-20 pl-15 pointer-events-none pb-10">
        <h3 className="text-[45px] mb-2 tracking-tighter leading-tight max-w-xl">{title}</h3>
        <p className="text-gray-300 text-lg max-w-sm">{subtitle}</p>
      </div>
    </div>
    <div className="w-full flex bg-black border-b border-gray-400">
      {/* Left info column */}
      <div className="flex-1 border-r border-gray-400 flex flex-col overflow-hidden" style={{ height: '271px' }}>
        {/* Email box */}
        <HoverCell className="flex-1 px-6 flex flex-col justify-center cursor-default">
          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-300 mb-2 block">Email</span>
          <div className="text-[13px] font-light truncate">{email?.value ? email.value.split('\n')[0] : ''}</div>
        </HoverCell>
        <div className="w-full border-t border-gray-400" />
        {/* Contact box */}
        <HoverCell className="flex-1 px-6 flex flex-col justify-center cursor-default">
          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-300 mb-2 block">Contact</span>
          <div className="space-y-1">{(contact?.values ?? []).slice(0, 2).map((v, i) => <p key={i} style={{ fontSize: '13px', fontWeight: 300, lineHeight: '1.4' }}>{v}</p>)}</div>
        </HoverCell>
      </div>
      {/* Center image */}
      <div className="flex items-center justify-center border-r border-gray-400 bg-[#030303] flex-shrink-0" style={{ width: '256px', height: '271px' }}>
        <img src="/Rectangle 9476.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      {/* Right info column */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ height: '271px' }}>
        {/* Location box */}
        <HoverCell className="flex-1 px-6 flex flex-col justify-center cursor-default">
          <span className="text-[9px] uppercase text-gray-300 tracking-[0.2em] mb-2 block">Location</span>
          <p className="text-[12px] leading-snug">{location?.address ?? ''}</p>
          <p className="text-[11px] mt-1">{location?.postalCode}</p>
        </HoverCell>
        <div className="w-full border-t border-gray-400" />
        {/* Work Hours box */}
        <HoverCell className="flex-1 px-6 flex flex-col justify-center cursor-default">
          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-300 mb-2 block">Work Hours</span>
          <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: '1.4' }}>{workHours?.hours}</p>
        </HoverCell>
      </div>
    </div>
  </div>
);

// ── Mobile Contact Section ────────────────────────────────────────────────────
type MobileContactSectionProps = {
  title: string; subtitle: string;
  email?: { value: string }; contact?: { values: string[] };
  location?: { address: string; postalCode: string }; workHours?: { hours: string };
  onSubmit: (data: Omit<FormSubmission, 'id' | 'submittedAt'>) => void;
};
const MobileContactSection: React.FC<MobileContactSectionProps> = ({ title, subtitle, email, contact, location, workHours, onSubmit }) => (
  <div className="block lg:hidden w-full bg-black text-white">
    <div className="w-full border-b border-gray-400 overflow-hidden relative" style={{ height: '260px' }}>
      <div className="absolute inset-0 z-0" style={{ WebkitMaskImage: 'radial-gradient(ellipse 80% 85% at 42% 48%, black 5%, transparent 78%)', maskImage: 'radial-gradient(ellipse 80% 85% at 42% 48%, black 5%, transparent 78%)', pointerEvents: 'none' }}>
        <IsometricHoverGrid cellW={60} cellH={36} interactive={false} />
      </div>
      <IsoBox cellW={60} cellH={36} col={1} row={5} opacity={0.5} zIndex={2} />
      <IsoBox cellW={60} cellH={36} col={4} row={5} opacity={0.9} zIndex={2} />
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 40%, transparent 100%)' }}>
        <h3 className="text-[22px] font-light leading-snug tracking-tight mb-1">{title}</h3>
        <p className="text-gray-400 text-[13px]">{subtitle}</p>
      </div>
    </div>

    {/* Email section */}
    <div className="w-full border-b border-gray-400 px-5 py-5">
      <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-2 block">Email</span>
      {(email?.value ?? '').split('\n').map((v, i) => <p key={i} className="text-[13px] font-light">{v}</p>)}
    </div>

    <div className="w-full border-b border-gray-400 px-5 py-5">
      <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-2 block">Contact</span>
      {(contact?.values ?? []).map((v, i) => <p key={i} className="text-[13px] font-light">{v}</p>)}
    </div>
    <div className="w-full border-b border-gray-400 bg-[#030303] overflow-hidden" style={{ height: '200px' }}>
      <img src="/Rectangle 9476.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
    <div className="w-full border-b border-gray-400 px-5 py-5">
      <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-2 block">Location</span>
      <p className="text-[13px] leading-snug">{location?.address ?? ''}</p>
      <p className="text-[12px] mt-1 text-gray-400">{location?.postalCode}</p>
    </div>
    <div className="w-full border-b border-gray-400 px-5 py-5">
      <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-2 block">Work Hours</span>
      <p className="text-[13px] font-light">{workHours?.hours}</p>
    </div>
    <div className="w-full px-5 py-7">
      <h5 className="text-xl font-light mb-2">Provide operating context to initiate alignment.</h5>
      <p className="text-gray-400 text-xs mb-5">This form captures high-level operating information required to initiate an alignment conversation.</p>
      <div className="border-t border-gray-400 w-[calc(100%+2.5rem)] -mx-5 mb-6" />
      <AlignmentForm small onSubmit={onSubmit} />
    </div>
  </div>
);

// ── Desktop Accordion Item ────────────────────────────────────────────────────
type AccordionItemProps = { title: string; index?: string; description?: string; open?: boolean; onMouseEnter?: () => void; };
const AccordionItem: React.FC<AccordionItemProps> = ({ title, index, description, open = false, onMouseEnter }) => (
  <div onMouseEnter={onMouseEnter} className={`border-b border-gray-400 py-10 px-6 md:px-12 cursor-pointer transition-colors duration-500 ${open ? ' ' : 'hover:bg-[#050505]'}`}>
    <div className="flex justify-between items-start">
      <div className="max-w-xl">
        <h4 className={`text-xl md:text-2xl font-light transition-colors ${open ? 'text-white' : 'text-gray-300'}`}>
          {title}{open && <span className="text-white ml-2">•</span>}
        </h4>
        <div className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          {description && <p className="text-sm text-white leading-relaxed">{description}</p>}
        </div>
      </div>
      <div className={`text-2xl font-light tracking-tighter transition-colors ${open ? 'text-white' : 'text-gray-300'}`}>{index}</div>
    </div>
  </div>
);

// ── Icon SVGs ─────────────────────────────────────────────────────────────────
const Icon2 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
    <path d="M39.7154 12.4714L49.6871 29.7428L39.715 47.0156L19.7703 47.0153L9.7986 29.7438L19.7702 12.4702L39.7154 12.4714Z" stroke="#3D3D3D" />
    <circle cx="29.5" cy="29.5" r="29" stroke="#3D3D3D" /><circle cx="29.5" cy="29.5" r="4" fill="white" stroke="#3D3D3D" />
  </svg>
);
const Icon3 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
    <circle cx="29.5" cy="29.5" r="29" stroke="#3D3D3D" /><circle cx="29.5" cy="29.5" r="19" stroke="#3D3D3D" />
    <path d="M29.5 10.5C30.0026 10.5 30.5951 10.8657 31.2246 11.8096C31.8416 12.7348 32.4174 14.1067 32.9082 15.8467C33.8879 19.32 34.5 24.1477 34.5 29.5C34.5 34.8523 33.8879 39.68 32.9082 43.1533C32.4174 44.8933 31.8416 46.2652 31.2246 47.1904C30.5951 48.1343 30.0026 48.5 29.5 48.5C28.9974 48.5 28.4049 48.1343 27.7754 47.1904C27.1584 46.2652 26.5826 44.8933 26.0918 43.1533C25.1121 39.68 24.5 34.8523 24.5 29.5C24.5 24.1477 25.1121 19.32 26.0918 15.8467C26.5826 14.1067 27.1584 12.7348 27.7754 11.8096C28.4049 10.8657 28.9974 10.5 29.5 10.5Z" stroke="#3D3D3D" />
    <path d="M10.5 29.5C10.5 28.9974 10.8657 28.4049 11.8096 27.7754C12.7348 27.1584 14.1067 26.5826 15.8467 26.0918C19.32 25.1121 24.1477 24.5 29.5 24.5C34.8523 24.5 39.68 25.1121 43.1533 26.0918C44.8933 26.5826 46.2652 27.1584 47.1904 27.7754C48.1343 28.4049 48.5 28.9974 48.5 29.5C48.5 30.0025 48.1343 30.5951 47.1904 31.2246C46.2652 31.8416 44.8933 32.4174 43.1533 32.9082C39.68 33.8879 34.8523 34.5 29.5 34.5C24.1477 34.5 19.32 33.8879 15.8467 32.9082C14.1067 32.4174 12.7348 31.8416 11.8096 31.2246C10.8657 30.5951 10.5 30.0026 10.5 29.5Z" stroke="#3D3D3D" />
  </svg>
);
const Icon4 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
    <circle cx="29.5" cy="29.5" r="29" stroke="#3D3D3D" /><circle cx="24" cy="30" r="23.5" stroke="#3D3D3D" />
    <circle cx="17.5" cy="29.5" r="17" stroke="#3D3D3D" /><circle cx="10" cy="28" r="9.5" stroke="#3D3D3D" />
  </svg>
);
const Icon5 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
    <circle cx="29.5" cy="29.5" r="29" stroke="#3D3D3D" />
    <path d="M29.5 9.5C30.1676 9.5 30.8925 9.92752 31.6299 10.9111C32.3606 11.8859 33.0398 13.3282 33.6191 15.1553C34.7761 18.804 35.5 23.8758 35.5 29.5C35.5 35.1242 34.7761 40.196 33.6191 43.8447C33.0398 45.6718 32.3606 47.1141 31.6299 48.0889C30.8925 49.0725 30.1676 49.5 29.5 49.5C28.8324 49.5 28.1075 49.0725 27.3701 48.0889C26.6394 47.1141 25.9602 45.6718 25.3809 43.8447C24.2239 40.196 23.5 35.1242 23.5 29.5C23.5 23.8758 24.2239 18.804 25.3809 15.1553C25.9602 13.3282 26.6394 11.8859 27.3701 10.9111C28.1075 9.92752 28.8324 9.5 29.5 9.5Z" stroke="#3D3D3D" />
    <path d="M9.5 29.5C9.5 28.8324 9.92752 28.1075 10.9111 27.3701C11.8859 26.6394 13.3282 25.9602 15.1553 25.3809C18.804 24.2239 23.8758 23.5 29.5 23.5C35.1242 23.5 40.196 24.2239 43.8447 25.3809C45.6718 25.9602 47.1141 26.6394 48.0889 27.3701C49.0725 28.1075 49.5 28.8324 49.5 29.5C49.5 30.1676 49.0725 30.8925 48.0889 31.6299C47.1141 32.3606 45.6718 33.0398 43.8447 33.6191C40.196 34.7761 35.1242 35.5 29.5 35.5C23.8758 35.5 18.804 34.7761 15.1553 33.6191C13.3282 33.0398 11.8859 32.3606 10.9111 31.6299C9.92752 30.8925 9.5 30.1676 9.5 29.5Z" stroke="#3D3D3D" />
    <path d="M15.3579 43.6422C14.8859 43.1701 14.6756 42.3552 14.8497 41.1383C15.0223 39.9323 15.5619 38.4322 16.4442 36.7306C18.2061 33.3325 21.2806 29.2343 25.2574 25.2574C29.2343 21.2805 33.3325 18.2061 36.7307 16.4441C38.4323 15.5618 39.9323 15.0223 41.1383 14.8497C42.3553 14.6755 43.1702 14.8858 43.6422 15.3579C44.1143 15.83 44.3246 16.6449 44.1504 17.8618C43.9779 19.0678 43.4383 20.5678 42.556 22.2695C40.794 25.6676 37.7196 29.7658 33.7427 33.7427C29.7658 37.7196 25.6676 40.794 22.2695 42.556C20.5679 43.4383 19.0678 43.9778 17.8618 44.1504C16.6449 44.3245 15.83 44.1142 15.3579 43.6422Z" stroke="#3D3D3D" />
    <path d="M43.642 43.6422C43.17 44.1142 42.3551 44.3245 41.1382 44.1504C39.9322 43.9778 38.4321 43.4383 36.7305 42.556C33.3324 40.794 29.2342 37.7196 25.2573 33.7427C21.2804 29.7658 18.206 25.6676 16.444 22.2695C15.5617 20.5678 15.0221 19.0678 14.8495 17.8618C14.6754 16.6449 14.8857 15.83 15.3578 15.3579C15.8298 14.8858 16.6447 14.6755 17.8617 14.8497C19.0677 15.0223 20.5677 15.5618 22.2693 16.4441C25.6675 18.2061 29.7657 21.2805 33.7426 25.2574C37.7194 29.2343 40.7939 33.3325 42.5558 36.7306C43.4381 38.4322 43.9777 39.9323 44.1503 41.1383C44.3244 42.3552 44.1141 43.1701 43.642 43.6422Z" stroke="#3D3D3D" />
  </svg>
);
const Icon6 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
    <circle cx="29.5" cy="29.5" r="29" stroke="#3D3D3D" />
    <circle cx="30" cy="24" r="11.5" stroke="#3D3D3D" /><circle cx="37" cy="33" r="11.5" stroke="#3D3D3D" /><circle cx="22" cy="33" r="11.5" stroke="#3D3D3D" />
  </svg>
);

type AccordionData = { id: string; title: string; description: string };

// ── Mobile Accordion Item ─────────────────────────────────────────────────────
type MobileAccItemProps = { title: string; index?: string; description?: string; open?: boolean; onClick?: () => void; };
const MobileAccItem: React.FC<MobileAccItemProps> = ({ title, index, description, open = false, onClick }) => (
  <div onClick={onClick} className={`border-b border-gray-400 py-5 px-6 cursor-pointer transition-colors duration-300 ${open ? 'bg-[#0A0C10]' : ''}`}>
    <div className="flex justify-between items-start gap-3">
      <div className="flex-1">
        <h4 className={`text-sm font-light leading-snug transition-colors ${open ? 'text-white' : 'text-gray-200'}`}>
          {title}{open && <span className="ml-2 text-white">•</span>}
        </h4>
        <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
          {description && <p className="text-xs text-gray-300 leading-relaxed">{description}</p>}
        </div>
      </div>
      <span className={`text-xs font-light tracking-tighter shrink-0 mt-0.5 transition-colors ${open ? 'text-white' : ''}`}>{index}</span>
    </div>
  </div>
);

// ── Mobile Sections ───────────────────────────────────────────────────────────
const mobileSlidesData = [
  { icon: <Icon2 />, label: 'Operating structure and decision ownership' },
  { icon: <Icon4 />, label: 'Accountability and escalation models' },
  { icon: <Icon5 />, label: 'Current execution challenges and constraints' },
  { icon: <Icon3 />, label: 'Risk, regulatory, and security considerations' },
  { icon: <Icon6 />, label: 'Readiness for governed execution' },
];

const MobileSections: React.FC<{ accordionData: AccordionData[] }> = ({ accordionData }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) setActiveSlide(p => diff > 0 ? Math.min(p + 1, mobileSlidesData.length - 1) : Math.max(p - 1, 0));
    touchStartX.current = null;
  };

  return (
    <div className="block lg:hidden w-full">
      <div className="w-full border-t border-gray-400 pt-8 pb-5 flex items-center justify-center">
        <h3 className="text-2xl font-light text-center">What alignment typically covers</h3>
      </div>
      <div className="w-full border-t border-gray-400 overflow-hidden" style={{ height: '240px' }}>
        <img src="/alignment2.png" alt="Alignment" className="w-full h-full object-cover" />
      </div>
      <div className="w-full border-t border-gray-400 flex flex-col items-center justify-center py-10 gap-5"
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ minHeight: '180px' }}>
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="flex items-center justify-center" key={`icon-${activeSlide}`}>{mobileSlidesData[activeSlide].icon}</div>
          <p key={`label-${activeSlide}`} className="text-[13px] text-white text-center font-light leading-snug px-8">{mobileSlidesData[activeSlide].label}</p>
        </div>
        <div className="flex items-center gap-[7px]">
          {mobileSlidesData.map((_, i) => (
            <button key={i} onClick={() => setActiveSlide(i)} className="rounded-full transition-all duration-300"
              style={{ width: i === activeSlide ? '8px' : '6px', height: i === activeSlide ? '8px' : '6px', background: i === activeSlide ? '#ffffff' : '#3a3a3a' }} />
          ))}
        </div>
      </div>
      <div className="w-full border-t border-gray-400" style={{ height: '44px' }} />
      <div className="w-full border-t border-gray-400 px-5 pt-7 pb-7">
        <div className="flex items-center gap-3 mb-4">
          <svg width="14" height="14" viewBox="0 0 26 26" fill="none">
            <rect x="10.833" width="4.33333" height="10.8333" fill="white" />
            <rect x="10.833" y="15.1666" width="4.33333" height="10.8333" fill="white" />
            <rect x="15.167" y="10.8334" width="10.8333" height="4.33333" fill="white" />
            <rect y="10.8334" width="10.8333" height="4.33333" fill="white" />
          </svg>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white font-light">WHAT HAPPENS NEXT</span>
        </div>
        <h3 className="text-[1.6rem] font-light leading-snug">Each engagement progresses through a defined alignment pathway.</h3>
      </div>
      <div className="w-full border-t border-gray-400">
        {accordionData.map((item) => (
          <MobileAccItem key={item.id} title={item.title} index={`[${item.id}]`} description={item.description}
            open={openItem === item.id} onClick={() => setOpenItem(p => p === item.id ? null : item.id)} />
        ))}
        <div className="px-5 py-5 border-t border-gray-400">
          <p className="text-xs">No engagement proceeds without operating alignment.</p>
        </div>
      </div>
    </div>
  );
};

// ── Entry Animations ──────────────────────────────────────────────────────────
const slideFromLeft = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as any } } };
const slideFromRight = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as any } } };

// ── Main Page ─────────────────────────────────────────────────────────────────
const ContextsPage = () => {
  const [openAccordion, setOpenAccordion] = useState<string>('01');
  const [showToast, setShowToast] = useState(false);

  const handleFormSubmit = async (data: Omit<FormSubmission, 'id' | 'submittedAt'>) => {
    const entry: FormSubmission = {
      ...data,
      id: Date.now().toString(),
      submittedAt: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };
    saveSubmission(data);
    await syncToGoogleSheets(entry);
    console.log('[Ascella] Form Submitted:', entry);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const textStyle = "w-[164px] text-white font-['Montserrat'] text-[14px] font-normal leading-[16px] tracking-[-0.14px]";
  const overlayCard = 'w-full md:w-[289px] rounded-[6px] border border-gray-400 bg-[rgba(13,13,13,0.50)] backdrop-blur-[20.95px] p-4 flex flex-col justify-center';

  const accordionData: AccordionData[] = [
    { id: '01', title: 'Review and context assessment', description: 'Your submission is reviewed to understand operating complexity, execution readiness, and governance requirements.' },
    { id: '02', title: 'Alignment conversation', description: 'Discussion with stakeholders to understand current state, challenges, and alignment requirements for execution.' },
    { id: '03', title: 'Engagement pathway definition', description: 'Clear roadmap defining phases, milestones, deliverables, and engagement model for successful execution.' },
  ];

  return (
    <>
      <Toast show={showToast} />
      <div className="min-h-screen bg-black text-white">

        {/* ════════════ DESKTOP (lg+) ════════════ */}
        <div className="hidden lg:block mx-10 lg:mx-20 xl:mx-24 w-[calc(100%-4rem)] lg:w-[calc(100%-8rem)] xl:w-[calc(100%-12rem)]">
          <div className="relative w-full border border-gray-400 flex"
            style={{ backgroundImage: `linear-gradient(rgba(61,61,61,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(61,61,61,0.3) 1px,transparent 1px)`, backgroundSize: '40px 40px' }}>

            {/* ── LEFT COLUMN ── */}
            <motion.div initial="hidden" animate="visible" variants={slideFromLeft}
              className="bg-black border-r border-gray-400 flex-shrink-0" style={{ width: '40%' }}>
              <div className="sticky top-0 min-h-screen flex flex-col">
                <style>{`.lfc::-webkit-scrollbar{display:none}.lfc{scrollbar-width:none}`}</style>

                <div style={{ height: '64px', flexShrink: 0 }} />
                <div className="border-b border-gray-400 w-full" style={{ flexShrink: 0 }} />

                <div style={{ flexShrink: 0 }} className="px-6 pt-5 pb-4">
                  <Link href="/" aria-label="Go to home page" className="inline-block">
                    <Image
                      src="/logo.svg"
                      alt="Ascella Logo"
                      width={90}
                      height={32}
                      priority
                      className="w-20 sm:w-24 h-auto"
                    />
                  </Link>
                </div>

                <div className="lfc px-6 flex flex-col flex-1 overflow-y-auto">
                  <div>
                    <header className="max-w-md mt-6">
                      <h5 className="text-xl mb-2 font-light leading-snug">Provide operating context to <br /> initiate alignment.</h5>
                      <p className="text-gray-300 text-xs mb-1">This form captures high-level operating information required to initiate an alignment conversation.</p>
                    </header>
                    <div className="border-t border-gray-400 w-[calc(100%+3rem)] -mx-6 my-3" />
                    <div className="pt-3">
                      <AlignmentForm onSubmit={handleFormSubmit} />
                    </div>
                  </div>
                  <div className="flex-1" />
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col bg-black min-h-screen" style={{ flex: 1 }}>

              {/* HERO */}
              <motion.div initial="hidden" animate="visible" variants={slideFromRight}
                className="relative border-b border-gray-400 overflow-hidden flex-shrink-0" style={{ height: '87.8vh' }}>
                <img src="/engagement1.png" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.15 }} />
                <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-15">
                  <div className="mb-12 mt-50">
                    <h2 className="text-3xl md:text-5xl leading-tight">
                      Engagement begins <br />with <span className="text-gray-400">operating alignment.</span>
                    </h2>
                    <p className="text-lg md:text-xl mt-2 text-gray-400">Not delivery discussions.</p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className={overlayCard} style={{ height: '109px' }}>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Initial alignment focus</span>
                      <p className="text-[13px] leading-tight text-white font-light">The first interaction is designed to understand your operating environment, governance maturity, and execution constraints.</p>
                    </div>
                    <div className={overlayCard} style={{ height: '109px' }}>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Objective</span>
                      <p className="text-[13px] leading-tight text-white font-light">The objective is to determine whether a structured operating engagement is appropriate.</p>
                    </div>
                  </div>
                </div>
                {/* Scroll indicator */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
                  className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 select-none pointer-events-none">
                  <div style={{ position: 'relative', width: '64px', height: '64px' }}>
                    <motion.svg viewBox="0 0 64 64" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                      animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
                      <defs><path id="ctpath" d="M 32,32 m -22,0 a 22,22 0 1,1 44,0 a 22,22 0 1,1 -44,0" /></defs>
                      <text style={{ fontSize: '7.2px', fill: 'rgba(255,255,255,0.35)', letterSpacing: '2.6px', fontFamily: 'sans-serif' }}>
                        <textPath href="#ctpath"></textPath>
                      </text>
                    </motion.svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <motion.svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                        animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                        <path d="M7 1v12M2 8l5 5 5-5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Alignment grid heading */}
              <RevealOnScroll>
                <div className="px-3 md:px-12 pt-16 pb-16">
                  <h3 className="text-3xl md:text-4xl">What alignment typically covers</h3>
                </div>
              </RevealOnScroll>

              {/* Alignment grid — FIX: HoverCell use kiya har box mein */}
              <div className="w-full border-t border-gray-400" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>

                {/* Box 1 — image cell (no hover needed) */}
                <RevealOnScroll delay={0} className="relative border-r border-b border-gray-400 overflow-hidden" style={{ height: '257px', background: '#0a0a0a' }}>
                  <div className="absolute inset-0 z-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(60,60,60,0.55) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
                  <img src="/alignment2.png" alt="Alignment Symbol" className="absolute inset-0 w-full h-full object-contain z-20" style={{ padding: '24px' }} />
                </RevealOnScroll>

                {/* Box 2 */}
                <RevealOnScroll delay={0.1} className="border-r border-b border-gray-400" style={{ height: '257px' }}>
                  <HoverCell className="w-full h-full flex flex-col justify-end p-8">
                    <div className="flex flex-col gap-6"><Icon2 /><p className={textStyle}>Operating structure and decision ownership</p></div>
                  </HoverCell>
                </RevealOnScroll>

                {/* Box 3 */}
                <RevealOnScroll delay={0.2} className="border-b border-gray-400" style={{ height: '257px' }}>
                  <HoverCell className="w-full h-full flex flex-col justify-end p-8">
                    <div className="flex flex-col gap-6"><Icon4 /><p className={textStyle}>Accountability and escalation models</p></div>
                  </HoverCell>
                </RevealOnScroll>

                {/* Box 4 */}
                <RevealOnScroll delay={0.3} className="border-r border-b border-gray-400" style={{ height: '257px' }}>
                  <HoverCell className="w-full h-full flex flex-col justify-end p-8">
                    <div className="flex flex-col gap-6"><Icon5 /><p className={textStyle}>Current execution challenges and constraints</p></div>
                  </HoverCell>
                </RevealOnScroll>

                {/* Box 5 */}
                <RevealOnScroll delay={0.4} className="border-r border-b border-gray-400" style={{ height: '257px' }}>
                  <HoverCell className="w-full h-full flex flex-col justify-end p-8">
                    <div className="flex flex-col gap-6"><Icon3 /><p className={textStyle}>Risk, regulatory, and security considerations</p></div>
                  </HoverCell>
                </RevealOnScroll>

                {/* Box 6 */}
                <RevealOnScroll delay={0.5} className="border-b border-gray-400" style={{ height: '257px' }}>
                  <HoverCell className="w-full h-full flex flex-col justify-end p-8">
                    <div className="flex flex-col gap-6"><Icon6 /><p className={textStyle}>Readiness for governed execution</p></div>
                  </HoverCell>
                </RevealOnScroll>
              </div>

              {/* What Happens Next */}
              <RevealOnScroll className="border-t border-gray-400 w-full">
                <div className="px-6 md:px-12 py-12">
                  <div className="flex items-center gap-4 text-xs mb-8">
                    <svg width="12" height="12" viewBox="0 0 26 26" fill="none">
                      <rect x="10.833" width="4.33333" height="10.8333" fill="white" />
                      <rect x="10.833" y="15.1666" width="4.33333" height="10.8333" fill="white" />
                      <rect x="15.167" y="10.8334" width="10.8333" height="4.33333" fill="white" />
                      <rect y="10.8334" width="10.8333" height="4.33333" fill="white" />
                    </svg>
                    <span className="uppercase tracking-[0.3em]">WHAT HAPPENS NEXT</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl max-w-2xl leading-[1.1]">Each engagement progresses through a defined alignment pathway.</h3>
                </div>
                <div className="border-t border-gray-400">
                  {accordionData.map((item, i) => (
                    <RevealOnScroll key={item.id} delay={i * 0.1}>
                      <AccordionItem title={item.title} index={`[${item.id}]`} description={item.description}
                        open={openAccordion === item.id} onMouseEnter={() => setOpenAccordion(item.id)} />
                    </RevealOnScroll>
                  ))}
                  <RevealOnScroll delay={0.3} className="py-8 px-6 md:px-12">
                    <p className="text-sm">No engagement proceeds without operating alignment.</p>
                  </RevealOnScroll>
                </div>
              </RevealOnScroll>

              {/* Contact */}
              <RevealOnScroll className="border-t border-gray-400">
                <ContactSection
                  title="Single point of contact for engagement coordination"
                  subtitle="All engagement coordination is managed centrally."
                  email={{ value: 'hello@ascella.group' }}
                  contact={{ values: ['+91 16045 10860', 'Availability: 9:00 AM – 6:00 PM (IST / GMT+5:30)'] }}
                  location={{ address: '3rd Floor, SCO-50/51, Sector 34B, Chandigarh', postalCode: '160022' }}
                  workHours={{ hours: '24/7 availability' }}
                />
              </RevealOnScroll>

            </div>
          </div>
        </div>

        {/* ════════════ MOBILE (< lg) ════════════ */}
        <div className="block lg:hidden mx-10 border-x border-gray-400">
          <div className="w-full border-t border-gray-400" />
          <div className="relative border-b border-gray-400 overflow-hidden">
            <img src="/engagement1.png" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.15 }} />
            <div className="relative z-10 px-6 pt-8 pb-6">
              <h2 className="text-3xl font-normal leading-tight text-left">Engagement begins with <span className="text-gray-400">operating alignment.</span></h2>
              <p className="text-lg mt-3 font-light text-gray-400">Not delivery discussions.</p>
            </div>
            <div className="relative z-10 px-6 pb-8 flex flex-col gap-3">
              <div className={overlayCard} style={{ minHeight: '109px' }}>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Initial alignment focus</span>
                <p className="text-[13px] leading-tight text-white font-light">The first interaction is designed to understand your operating environment, governance maturity, and execution constraints.</p>
              </div>
              <div className={overlayCard} style={{ minHeight: '109px' }}>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Objective</span>
                <p className="text-[13px] leading-tight text-white font-light">The objective is to determine whether a structured operating engagement is appropriate.</p>
              </div>
            </div>
          </div>
          <MobileSections accordionData={accordionData} />

          <MobileContactSection
            title="Single point of contact for engagement coordination"
            subtitle="All engagement coordination is managed centrally."
            email={{ value: 'hello@ascella.group' }}
            contact={{ values: ['+91 94545 10860', '+91 94699 40969'] }}
            location={{ address: '3rd Floor, SCO-5(S), Sector 34B, Chandigarh', postalCode: '160022' }}
            workHours={{ hours: '24/7 availability' }}
            onSubmit={handleFormSubmit}
          />
        </div>

      </div>
    </>
  );
};

export default ContextsPage;