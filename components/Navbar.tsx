"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Operating Model", href: "/operating-model" },
  { label: "Execution Arms", href: "/execution-arms" },
  { label: "Organisations", href: "/organisations" },
  { label: "Startups", href: "/startups" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="mx-auto max-w-7xl px-4 sm:px-6 py-3 h-16 sm:h-20 w-full">
      <div className="flex justify-between items-center h-full">
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
          <div className="w-px mx-3 h-5 rotate-30 origin-center bg-gray-200"></div>
          {navLinks.map((link, index) => (
            <div key={link.href} className="flex items-center text-white">
              <Link
                href={link.href}
                className="px-2 hover:scale-[1.1] transition ease-in"
              >
                {link.label}
              </Link>
              {index !== navLinks.length - 1 && (
                <div className="w-px mx-3 h-5 rotate-30 origin-center bg-gray-200"></div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center px-2 py-1 border border-white rounded text-white"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link
          href="/connect"
          className="hidden md:flex group items-center gap-3 font-medium text-white hover:scale-105 duration-200 ml-6"
        >
          <span>Connect</span>
          <span className="w-5 h-5 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
              className="rounded-sm bg-white p-1 transition-transform duration-200 ease-out group-hover:scale-[1.5]"
            >
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="#000000"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black border-t border-white z-50 flex flex-col items-center py-4 gap-2 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block w-full text-center py-2 text-white text-lg border-b border-white/10 last:border-b-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/connect"
            className="block w-full text-center py-2 text-white text-lg mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Connect
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
