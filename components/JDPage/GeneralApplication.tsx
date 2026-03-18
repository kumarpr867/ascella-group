'use client';

import React, { useState } from 'react';
import Image from "next/image";
import PartialOutlineBtn from "../btns/PartialOutlineBtn";
import Reveal from "@/utils/Reveal";
import { slideInFromBottom } from "@/utils/motion";

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwivK_12Fkz-om9UzxFnW01ztizyvGD97Z-MYEmgXEJf7myibk_DwHg5vUqOFTfmZGH/exec';

const LS_KEY_GA = 'ascella_general_applications';

type GeneralAppSubmission = {
  id: string;
  submittedAt: string;
  fullName: string;
  role: string;
  phone: string;
  email: string;
  cvUrl: string;
  formType: 'general_application';
};

function saveToLocal(data: Omit<GeneralAppSubmission, 'id' | 'submittedAt' | 'formType'>) {
  try {
    const existing: GeneralAppSubmission[] = JSON.parse(localStorage.getItem(LS_KEY_GA) ?? '[]');
    const entry: GeneralAppSubmission = {
      ...data,
      formType: 'general_application',
      id: Date.now().toString(),
      submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    };
    existing.unshift(entry);
    localStorage.setItem(LS_KEY_GA, JSON.stringify(existing));
  } catch {}
}

async function syncToSheet2(entry: GeneralAppSubmission): Promise<void> {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
  } catch (err) {
    console.error('[Ascella] Sheet2 sync failed:', err);
  }
}

const Toast: React.FC<{ show: boolean }> = ({ show }) => (
  <div style={{
    position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
    background: '#ffffff', color: '#000000', padding: '10px 20px',
    fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em',
    borderRadius: '2px', boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
    opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(-12px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease', pointerEvents: 'none',
  }}>
    Application Submitted
  </div>
);

const validate = {
  fullName: (v: string) => !v.trim() ? 'Full name is required' : !/^[a-zA-Z\s'.\-]+$/.test(v.trim()) ? 'Name should only contain letters' : '',
  role:     (v: string) => !v.trim() ? 'Role / title is required' : '',
  phone:    (v: string) => !v.trim() ? 'Phone number is required' : !/^\+?[\d\s\-]{7,15}$/.test(v.trim()) ? 'Enter a valid phone number' : '',
  email:    (v: string) => !v.trim() ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email' : '',
  cvUrl:    (v: string) => v.trim() && !/^https?:\/\/.+/.test(v.trim()) ? 'Enter a valid URL starting with http(s)://' : '',
};

export default function GeneralApplication() {
  const [fullName, setFullName] = useState('');
  const [role,     setRole]     = useState('');
  const [phone,    setPhone]    = useState('');
  const [email,    setEmail]    = useState('');
  const [cvUrl,    setCvUrl]    = useState('');
  const [errors,    setErrors]    = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const inp = `w-full bg-gray-500 border border-color rounded p-2 md:p-4 text-b3 text-white placeholder:text-gray-100 focus:outline-none focus:border-gray-200 hover:border-white transition hover:scale-105`;
  const errInp = (k: string) => submitted && errors[k] ? 'border-red-500' : '';
  const errMsg = (k: string) => submitted && errors[k]
    ? <p className="text-[10px] text-red-400 mt-0.5 ml-1">{errors[k]}</p> : null;

  const handleSubmit = async () => {
    setSubmitted(true);
    const errs = {
      fullName: validate.fullName(fullName),
      role:     validate.role(role),
      phone:    validate.phone(phone),
      email:    validate.email(email),
      cvUrl:    validate.cvUrl(cvUrl),
    };
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setLoading(true);

    const entry: GeneralAppSubmission = {
      fullName, role, phone, email, cvUrl,
      formType: 'general_application',
      id: Date.now().toString(),
      submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    };

    saveToLocal({ fullName, role, phone, email, cvUrl });
    await syncToSheet2(entry);

    setLoading(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    setFullName(''); setRole(''); setPhone(''); setEmail(''); setCvUrl('');
    setSubmitted(false); setErrors({});
  };

  return (
    <>
      <Toast show={showToast} />
      <section className="py-20 flex flex-col items-center my-15 md:my-25 border border-color">
        <Reveal variants={slideInFromBottom(0.2)} className="flex lg:w-3xl flex-col gap-10 items-center px-10 text-center mb-16">
          <h3 className="text-[24px] md:text-[36px]">Alignment is the first step toward structured execution readiness.</h3>
          <p className="text-[12px] md:text-[14px] md:px-20 text-gray-100">
            The Startups Programme begins with an alignment conversation focused on operating context, accountability expectations, and readiness for governed execution.
          </p>
        </Reveal>

        <Reveal variants={slideInFromBottom(0.6)} className="max-w-xl border border-color rounded-lg p-5 m-10 md:p-10 flex flex-col gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <Image src="/jd/circle.png" alt="" width={70} height={70} />
            <h3 className="text-[16px] md:text[24px] lg:text-[36px] tracking-tighter text-gray-200">GENERAL APPLICATION</h3>
            <p className="text-[12px] text-gray-200 md:px-20">
              This form is intended for candidates who wish to be considered for roles that are not currently listed.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className={`${inp} ${errInp('fullName')}`} />
              {errMsg('fullName')}
            </div>
            <div>
              <input type="text" placeholder="Your Role / Title" value={role} onChange={e => setRole(e.target.value)} className={`${inp} ${errInp('role')}`} />
              {errMsg('role')}
            </div>
            <div>
              <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className={`${inp} ${errInp('phone')}`} />
              {errMsg('phone')}
            </div>
            <div>
              <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className={`${inp} ${errInp('email')}`} />
              {errMsg('email')}
            </div>
            <div>
              <input type="url" placeholder="Add CV URL" value={cvUrl} onChange={e => setCvUrl(e.target.value)} className={`${inp} ${errInp('cvUrl')}`} />
              {errMsg('cvUrl')}
            </div>

            <button type="button" onClick={handleSubmit} disabled={loading}
              className="mt-4 bg-gray-100 text-black py-1 md:py-3 rounded text-[16px] hover:bg-white hover:scale-105 transition ease-in-out disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>

          <p className="text-b3 text-gray-200 text-center tracking-tighter leading-snug">
            If you prefer not to complete the form, you may submit your profile directly by email. Please include your CV and a short summary of your operating background.
          </p>
          <div>
            <PartialOutlineBtn text="Email Us" />
          </div>
        </Reveal>
      </section>
    </>
  );
}