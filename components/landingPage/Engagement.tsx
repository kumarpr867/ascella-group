"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Reveal from "@/utils/Reveal"
import { slideInFromBottom } from "@/utils/motion"

// ── Google Sheets Web App URL ─────────────────────────────────────────────────
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxMj27RQ5tvoPHk4L_xN7pJ4XMxXOqKT7lYAXWvu7zaZI0561P3KE35PXAThEk-MaTL/exec';

// ── Types ─────────────────────────────────────────────────────────────────────
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

// ── Validation helpers ────────────────────────────────────────────────────────
const validate = {
  fullName: (v: string) => !v.trim() ? 'Full name is required' : v.trim().length < 2 ? 'Enter a valid name' : !/^[a-zA-Z\s'.\-]+$/.test(v.trim()) ? 'Name should only contain letters' : '',
  orgName: (v: string) => !v.trim() ? 'Organisation name is required' : '',
  role: (v: string) => !v.trim() ? 'Please select a role or position' : '',
  email: (v: string) => !v.trim() ? 'Email address is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email address' : '',
  orgSize: (v: string) => !v ? 'Please select an organisation size' : '',
  needs: (v: string[]) => v.length === 0 ? 'Select at least one operating need' : '',
};

// ── Org Size Selector ─────────────────────────────────────────────────────────
const ORG_SIZES = ['0–20', '21–50', '51–100', '101–500', '500+'];

const OrgSizeSelector: React.FC<{ value: string; onChange: (v: string) => void; error?: boolean }> = ({
  value, onChange, error = false,
}) => (
  <div className="flex flex-wrap gap-1.5">
    {ORG_SIZES.map((size) => {
      const sel = value === size;
      return (
        <button key={size} type="button" onClick={() => onChange(size)}
          className={`px-3 py-1.5 text-[10px] transition-all duration-200 rounded border tracking-wide
            ${sel ? 'border-white bg-white text-black'
              : error ? 'border-gray-400 text-gray-300 bg-transparent hover:border-white hover:text-white hover:bg-white/10'
                : 'border-color bg-transparent text-gray-200 hover:border-white hover:text-white hover:bg-white/10'}`}>
          {size}
        </button>
      );
    })}
  </div>
);

// ── Primary Need Checkboxes ───────────────────────────────────────────────────
const PRIMARY_NEEDS = ['Cyber Security', 'Custom Technology', 'Staffing & Manpower', 'Sales & Marketing'];

const PrimaryNeedCheckboxes: React.FC<{ values: string[]; onChange: (v: string[]) => void; error?: boolean }> = ({
  values, onChange, error = false,
}) => {
  const toggle = (need: string) =>
    onChange(values.includes(need) ? values.filter((v) => v !== need) : [...values, need]);
  return (
    <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
      {PRIMARY_NEEDS.map((need) => {
        const checked = values.includes(need);
        return (
          <label key={need} className="flex items-center gap-1.5 cursor-pointer group" onClick={() => toggle(need)}>
            <span className={`flex-shrink-0 w-3 h-3 rounded-sm border transition-all duration-150
              ${checked ? 'border-white bg-white'
                : error ? 'border-red-500 bg-transparent group-hover:border-white group-hover:bg-white/10'
                  : 'border-color bg-transparent group-hover:border-gray-300 group-hover:bg-white/10'}`}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {checked && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path d="M1 3L3 5L7 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className="text-xs text-gray-300 group-hover:text-white transition-colors whitespace-nowrap">
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

const RoleDropdown: React.FC<{ value: string; onChange: (v: string) => void; error?: boolean }> = ({
  value, onChange, error = false,
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
        className={`w-full bg-gray-500 px-3 py-2 focus:outline-none focus:border-white hover:bg-gray-400 hover:border hover:border-white/30 hover:placeholder-white transition-all duration-200 text-white placeholder-gray-300 text-sm rounded-lg
          ${error && !value ? 'border border-red-500' : 'border border-gray-400'}`}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" style={{ fontSize: '10px' }}>▾</span>
      {open && filtered.length > 0 && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-gray-500 border border-[#3D3D3D] overflow-y-auto" style={{ maxHeight: '160px' }}>
          {filtered.map(role => (
            <div key={role} onMouseDown={() => select(role)}
              className={`px-4 py-2 text-[12px] cursor-pointer transition-colors
                ${role === value ? 'bg-white text-black' : 'text-gray-200 hover:bg-[#2a2a2a] hover:text-white'}`}>
              {role}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Dotted 3D Globe Canvas ────────────────────────────────────────────────────
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let animId: number
    let t = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener("resize", resize)

    const project = (lat: number, lon: number, rotY: number, cx: number, cy: number, R: number) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lon + rotY) * (Math.PI / 180)
      const x3 = R * Math.sin(phi) * Math.cos(theta)
      const y3 = R * Math.cos(phi)
      const z3 = R * Math.sin(phi) * Math.sin(theta)
      return { x: cx + x3, y: cy - y3, z: z3 }
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const W = rect.width
      const H = rect.height
      ctx.clearRect(0, 0, W, H)

      t += 0.003
      const rotY = -(t * (180 / Math.PI) * 0.45)
      const cx = W / 2
      const cy = H / 2
      const R = Math.min(W, H) * 0.44

      for (let lat = -80; lat <= 80; lat += 6) {
        const count = Math.max(4, Math.round(Math.cos((lat * Math.PI) / 180) * 58))
        for (let i = 0; i < count; i++) {
          const lon = -180 + (360 / count) * i
          const p = project(lat, lon, rotY, cx, cy, R)
          if (p.z < 0) continue
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(255,255,255,0.5)"
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", background: "transparent" }}
    />
  )
}

// ── Engagement ────────────────────────────────────────────────────────────────
export default function Engagement() {
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [orgSize, setOrgSize] = useState('');
  const [needs, setNeeds] = useState<string[]>([]);
  const [challenge, setChallenge] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const err = (k: string) => submitted && errors[k]
    ? <p className="text-[10px] text-red-400 mt-0.5">{errors[k]}</p> : null;

  const handleSubmit = async () => {
    setSubmitted(true);
    const errs = {
      fullName: validate.fullName(fullName), orgName: validate.orgName(orgName),
      role: validate.role(role), email: validate.email(email),
      orgSize: validate.orgSize(orgSize), needs: validate.needs(needs),
    };
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setLoading(true);
    const entry: FormSubmission = {
      fullName, orgName, role, email, orgSize,
      primaryNeeds: needs, challenge,
      id: Date.now().toString(),
      submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    };

    await syncToGoogleSheets(entry);
    console.log('[Ascella] Form Submitted:', entry);
    setLoading(false);

    // Reset
    setFullName(''); setOrgName(''); setRole(''); setEmail('');
    setOrgSize(''); setNeeds([]); setChallenge('');
    setSubmitted(false); setErrors({});
  };

  const lbl = "block text-b2 mb-0.5";
  const inp = `w-full bg-gray-500 px-3 py-2 focus:outline-none focus:border-white hover:bg-gray-400 hover:border hover:border-white/30 hover:placeholder-white transition-all duration-200 text-white placeholder-gray-300 text-sm`;

  return (
    <section className="flex flex-col border-t border-color mt-20">
      <div className="mx-10 lg:mx-20 xl:mx-24 flex flex-col py-4 px-5 md:p-20 border-x border-color">

        {/* ── Heading row: left-aligned on desktop, 2-line forced on mobile ── */}
        {/* FIX 1: Removed md:pl-[12%], lg:pl-[15%], xl:pl-[18%] — heading now left-aligns with content */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center md:items-start justify-between gap-10 md:gap-20">

          {/* ── Left column: Globe + Info cards ── */}
          <div className=" flex flex-col gap-10 md:gap-16  items-center md:justify-between">
            <h1 className="
            uppercase text-[20px] 
            md:text-[28px] 
            lg:text-[36px]
          ">Initiate an <span className="text-gray-200">alignment-led <br />
                engagement process.</span>
            </h1>
            <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[350px] lg:h-[270px] mx-auto">
              <GlobeCanvas />
            </div>

            {/* Info cards */}
            <Reveal variants={slideInFromBottom(0.1)} className="grid grid-cols-2 justify-between sm:px-6 md:px-0 gap-8 xm:gap-20 md:gap-4 w-full">
              <div className="flex flex-col text-left gap-3 sm:gap-5 flex-1 md:bg-[#111111] md:border md:border-[#2a2a2a] md:rounded-xl md:p-3 md:gap-2">
                <h3 className="text-[14px] text-left leading-tight min-h-10 md:min-h-0">Not sure where to begin?</h3>
                <p className=" leading-tight text-xs sm:text-sm min-h-10 md:min-h-0 md:text-gray-200">Initial engagement focuses on alignment, not sales discussions.</p>
                <Link href={"mailto:hello@ascella.group"} className="block md:hidden text-xs sm:text-sm">hello@ascella.group</Link>
              </div>
              <div className="flex flex-col text-left gap-3 sm:gap-5 flex-1 md:bg-[#111111] md:border md:border-[#2a2a2a] md:rounded-xl md:p-3 md:gap-2">
                <h3 className="text-[14px] text-left leading-tight min-h-10 md:min-h-0">Begin alignment Execution follows.</h3>
                <p className="leading-tight text-xs sm:text-sm min-h-10 md:min-h-0  md:text-gray-200">The first step focuses on clarity and fit.</p>
                <p className="block md:hidden text-xs sm:text-sm">+91 16045 10860</p>
              </div>
            </Reveal>

          </div>

          {/* ── Right column: Form ── */}
          <div className="flex flex-col justify-between h-full gap-4">

            <Reveal variants={slideInFromBottom(0.1)}>
              <label className={lbl}>Full Name</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                placeholder="Enter your name" autoComplete="name"
                className={`${inp} rounded-lg ${submitted && errors.fullName ? 'border border-red-500' : 'border border-gray-400'}`} />
              {err('fullName')}
            </Reveal>

            <Reveal variants={slideInFromBottom(0.1)}>
              <label className={lbl}>Organisation</label>
              <input type="text" value={orgName} onChange={e => setOrgName(e.target.value)}
                placeholder="Organisation name" autoComplete="organization"
                className={`${inp}  rounded-lg ${submitted && errors.orgName ? 'border border-red-500' : 'border border-gray-400 '}`} />
              {err('orgName')}
            </Reveal>

            {/* FIX 2: RoleDropdown now has border border-gray-400 (same as other inputs) via updated className inside RoleDropdown */}
            <Reveal variants={slideInFromBottom(0.1)}>
              <label className={lbl}  >Role / Position</label>
              <RoleDropdown value={role} onChange={setRole} error={submitted && !!errors.role} />
              {err('role')}
            </Reveal>

            <Reveal variants={slideInFromBottom(0.1)}>
              <label className={lbl}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com" autoComplete="email"
                className={`${inp}  rounded-lg ${submitted && errors.email ? 'border border-red-500' : 'border border-gray-400'}`} />
              {err('email')}
            </Reveal>

            <Reveal variants={slideInFromBottom(0.1)}>
              <label className={lbl}>Organisation Size</label>
              <OrgSizeSelector value={orgSize} onChange={setOrgSize} error={submitted && !!errors.orgSize} />
              {err('orgSize')}
            </Reveal>

            <Reveal variants={slideInFromBottom(0.1)}>
              <label className={lbl}>Primary Operating Need</label>
              <PrimaryNeedCheckboxes values={needs} onChange={setNeeds} error={submitted && !!errors.needs} />
              {err('needs')}
            </Reveal>

            <Reveal variants={slideInFromBottom(0.1)}>
              <label className={lbl}>
                Describe your current operating or execution challenge
              </label>
              <textarea rows={2} value={challenge} onChange={e => setChallenge(e.target.value)}
                placeholder="Describe your current execution or operating challenge..."
                className="w-full bg-gray-500 px-3 py-1.5 resize-none  rounded-lg focus:outline-none focus:border-white hover:bg-gray-400 hover:border hover:border-white/30 hover:placeholder-white transition-all duration-200 text-white placeholder-gray-300 text-sm border border-gray-400" />
            </Reveal>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="border border-white px-6 py-2 text-sm hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Consult Now'}
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}