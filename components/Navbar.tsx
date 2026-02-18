"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Operating Model", href: "/how-ascella-operates" },
  { label: "Execution Arms", href: "/execution-arms" },
  { label: "Organisations", href: "/who-we-work-with" },
  { label: "Startups", href: "/startups" },
  { label: "Careers", href: "/careers" },
];

// ── Arrow icon (↗) used on each nav link row ──
const ArrowIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-60"
  >
    <path
      d="M4 14L14 4M14 4H6M14 4V12"
      stroke="white"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── X close icon ──
const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3L17 17M17 3L3 17"
      stroke="white"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

// ── Custom Menu Icon (corner brackets + X pattern) ──
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="29"
    height="29"
    viewBox="0 0 29 29"
    fill="none"
  >
    {/* Corner bracket — bottom-left */}
    <path d="M0.25 22.8055V26.4352V28.25H6.00941" stroke="white" strokeWidth="0.5" />
    {/* Corner bracket — top-left */}
    <path d="M0.25 5.69446V2.06483V0.250013H6.00941" stroke="white" strokeWidth="0.5" />
    {/* Corner bracket — bottom-right */}
    <path d="M27.7681 22.8055V26.4352V28.25H22.0087" stroke="white" strokeWidth="0.5" />
    {/* Corner bracket — top-right */}
    <path d="M27.7681 5.69446V2.06483V0.250013H22.0087" stroke="white" strokeWidth="0.5" />
    {/* X strokes */}
    <path d="M6.24566 6.75L13.498 14.0022" stroke="white" strokeWidth="0.5" />
    <line x1="12.6402" y1="13.1443" x2="20.6402" y2="21.1443" stroke="white" strokeWidth="0.5" />
    <path d="M12.2864 15.0021L20.75 6.53873" stroke="white" strokeWidth="0.5" />
    <line x1="6.14427" y1="21.1443" x2="14.1443" y2="13.1443" stroke="white" strokeWidth="0.5" />
  </svg>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 w-full bg-black z-50 border-b border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 sm:h-20">
          <div className="flex justify-between items-center h-full">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Ascella Logo"
                width={90}
                height={32}
                priority
                className="w-20 sm:w-24 h-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center font-medium">
              <div className="w-px mx-3 h-5 rotate-30 bg-gray-400/40" />
              {navLinks.map((link, index) => (
                <div key={link.href} className="flex items-center text-white">
                  <Link
                    href={link.href}
                    className="px-2 hover:scale-[1.1] transition ease-in"
                  >
                    {link.label}
                  </Link>
                  {index !== navLinks.length - 1 && (
                    <div className="w-px mx-3 h-5 rotate-30 bg-white/40" />
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <Link
              href="/connect"
              className="hidden md:flex group items-center gap-3 font-medium text-white ml-6"
            >
              <span>Connect</span>
              <span className="w-5 h-5 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 14 14"
                  className="rounded-sm bg-white p-1 transition-transform group-hover:scale-[1.4] text-black"
                >
                  <path
                    d="M3 11L11 3M11 3H5M11 3V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>

            {/* Mobile Hamburger — custom icon */}
            <button
              className="md:hidden flex items-center px-2 py-1 text-white"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* ── FULL-SCREEN MOBILE DRAWER OVERLAY ── */}
      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Panel — slides in from left */}
      <div
        className={`fixed top-0 left-0 z-[70] h-full w-[85vw] max-w-[393px] bg-black flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ── Top bar: Logo + Close ── */}
        <div className="flex items-center justify-between px-7 pt-7 pb-6">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              src="/logo.png"
              alt="Ascella Logo"
              width={90}
              height={32}
              className="w-20 h-auto"
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center border border-[#3D3D3D] rounded-sm"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Tagline ── */}
        <div className="px-7 pb-6">
          <p className="text-[11px] text-gray-500 font-light leading-relaxed tracking-wide">
            Excellence In Execution<br />
            Precision In Performance
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="mx-7 border-t border-[#2a2a2a]" />

        {/* ── Nav Links ── */}
        <nav className="flex flex-col flex-1 px-7 pt-2 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between py-6 border-b border-[#2a2a2a] transition-colors hover:text-gray-300"
            >
              <span className="text-[22px] text-white font-light tracking-tight">
                {link.label}
              </span>
              <ArrowIcon />
            </Link>
          ))}
          {/* Final border after last item */}
          <div className="border-b border-[#2a2a2a]" />
        </nav>

        {/* ── Bottom CTA Button ── */}
        <div className="px-7 py-8">
          <Link
            href="/connect"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-3 w-full py-4 bg-[#111] border border-[#3D3D3D] text-white text-[14px] font-light tracking-widest uppercase hover:bg-[#1a1a1a] transition-colors"
          >
            <span>Engage With Us</span>
            {/* Dots icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="3"  cy="9" r="1.5" fill="white" opacity="0.6" />
              <circle cx="9"  cy="9" r="1.5" fill="white" opacity="0.6" />
              <circle cx="15" cy="9" r="1.5" fill="white" opacity="0.6" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;