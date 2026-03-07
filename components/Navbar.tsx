"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Operating Model", href: "/how-ascella-operates" },
  { label: "Execution Arms", href: "/execution-arms" },
  { label: "Organisations", href: "/who-we-work-with" },
  { label: "Startups", href: "/startups" },
  {
    label: "Insights ",
    href: "/insights/case-studies",
    children: [
      { label: "Case Studies", href: "/insights/case-studies" },
      { label: "Blogs", href: "/insights/blogs" },
    ],
  },
  {
    label: "Careers ",
    href: "/careers",
    children: [
      { label: "Life at Ascella", href: "/careers" },
      { label: "Explore Opportunities", href: "/JD-Page" },
    ],
  },
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
    <path d="M0.25 22.8055V26.4352V28.25H6.00941" stroke="white" strokeWidth="0.5" />
    <path d="M0.25 5.69446V2.06483V0.250013H6.00941" stroke="white" strokeWidth="0.5" />
    <path d="M27.7681 22.8055V26.4352V28.25H22.0087" stroke="white" strokeWidth="0.5" />
    <path d="M27.7681 5.69446V2.06483V0.250013H22.0087" stroke="white" strokeWidth="0.5" />
    <path d="M6.24566 6.75L13.498 14.0022" stroke="white" strokeWidth="0.5" />
    <line x1="12.6402" y1="13.1443" x2="20.6402" y2="21.1443" stroke="white" strokeWidth="0.5" />
    <path d="M12.2864 15.0021L20.75 6.53873" stroke="white" strokeWidth="0.5" />
    <line x1="6.14427" y1="21.1443" x2="14.1443" y2="13.1443" stroke="white" strokeWidth="0.5" />
  </svg>
);

// ── Page Loading Bar ──
const PageLoadingBar = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevPathname = useRef(pathname);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const completeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLoading = () => {
    setLoading(true);
    setProgress(0);

    // Animate progress from 0 → ~85% smoothly, simulating load
    let current = 0;
    progressInterval.current = setInterval(() => {
      current += Math.random() * 8 + 2; // random increments for realistic feel
      if (current >= 85) {
        current = 85;
        if (progressInterval.current) clearInterval(progressInterval.current);
      }
      setProgress(current);
    }, 120);
  };

  const completeLoading = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    setProgress(100);
    completeTimeout.current = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 400);
  };

  // Watch for route change (pathname change = page loaded)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      completeLoading();
    }
  }, [pathname]);

  // Intercept all <a> clicks to trigger loading start
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Only trigger for internal links (not external, not hash-only)
      const isInternal =
        href.startsWith("/") && !href.startsWith("//");
      if (!isInternal) return;

      // Don't trigger if same page
      if (href === pathname) return;

      startLoading();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (completeTimeout.current) clearTimeout(completeTimeout.current);
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full z-[100] pointer-events-none"
      style={{ height: "2px" }}
    >
      {/* Track */}
      <div className="absolute inset-0 bg-transparent" />

      {/* Progress bar */}
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          transition:
            progress === 100
              ? "width 0.2s ease-out"
              : "width 0.12s ease-out",
          background: "linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)",
          boxShadow: "0 0 10px 1px rgba(59,130,246,0.7)",
          position: "relative",
        }}
      >
        {/* Glowing leading edge */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "80px",
            height: "4px",
            background:
              "linear-gradient(90deg, transparent, rgba(147,197,253,0.9))",
            borderRadius: "2px",
            filter: "blur(2px)",
          }}
        />

        {/* Grid lines overlay — subtle vertical dashes across bar */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0px, transparent 18px, rgba(255,255,255,0.12) 18px, rgba(255,255,255,0.12) 19px)",
          }}
        />
      </div>

      {/* Fade out on complete */}
      {progress === 100 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            animation: "fadeOut 0.4s ease-out forwards",
          }}
        />
      )}

      <style>{`
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const Navbar = () => {
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const desktopRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopRef.current &&
        !desktopRef.current.contains(event.target as Node)
      ) {
        setOpenDesktopDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ── Blue Page Loading Bar ── */}
      <PageLoadingBar />

      <header className="top-0 w-full bg-black z-50">
        <div className="mx-auto max-w-7xl px-10 sm:px-6 h-16 sm:h-20">
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
            <nav className="hidden lg:flex items-center font-medium relative">
              <div className="w-px mx-3 h-5 rotate-30 bg-gray-200" />

              {navLinks.map((link, index) => {
                const isActive =
                  pathname === link.href ||
                  link.children?.some((child) => pathname === child.href);

                const isOpen = openDesktopDropdown === link.label;

                return (
                  <div
                    key={link.label}
                    className="relative flex items-center text-white"
                    ref={isOpen ? desktopRef : null}
                  >
                    <button
                      onClick={() =>
                        link.children
                          ? setOpenDesktopDropdown(isOpen ? null : link.label)
                          : null
                      }
                      className={`px-2 text-b2 flex items-center gap-1 transition-colors ${
                        isActive ? "text-white" : "text-gray-200 hover:text-white"
                      }`}
                      aria-haspopup={link.children ? "menu" : undefined}
                      aria-expanded={link.children ? isOpen : undefined}
                    >
                      <Link href={link.href}>{link.label}</Link>

                      {link.children && (
                        <svg
                          className={`w-3 h-3 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M5 7l5 6 5-6H5z" />
                        </svg>
                      )}
                    </button>

                    {/* Blur Glass Animated Dropdown */}
                    <AnimatePresence>
                      {link.children && isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute left-0 top-full mt-3 w-max overflow-hidden z-50"
                        >
                          <div className="bg-white/5 backdrop-blur-xl border border-color rounded-xl shadow-2xl">
                            {link.children.map((child) => {
                              const childActive = pathname === child.href;
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setOpenDesktopDropdown(null)}
                                  className={`block px-5 py-3 text-sm transition-colors ${
                                    childActive
                                      ? "text-white bg-white/10"
                                      : "text-gray-300 hover:text-white hover:bg-white/10"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {index !== navLinks.length - 1 && (
                      <div className="w-px mx-3 h-5 rotate-30 bg-gray-200" />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <Link
              href="/engageWithUs"
              className="hidden lg:flex group items-center gap-3 font-medium text-white ml-6"
            >
              <span>Connect</span>
              <span className="w-5 h-5 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 14 14"
                  className="rounded-sm bg-white p-1 transition-transform ease-in-out duration-300 group-hover:scale-[1.4] text-black"
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

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex items-center px-2 py-1 text-white"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* ── FULL-SCREEN MOBILE DRAWER OVERLAY ── */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 left-0 z-[70] h-full w-[85vw] max-w-[393px] bg-black flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top bar */}
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

        {/* Tagline */}
        <div className="px-7 pb-6">
          <p className="text-[11px] text-gray-500 font-light leading-relaxed tracking-wide">
            Excellence In Execution<br />
            Precision In Performance
          </p>
        </div>

        {/* Divider */}
        <div className="mx-7 border-t border-[#2a2a2a]" />

        {/* Nav Links */}
        <nav className="flex flex-col flex-1 px-7 pt-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isOpen = openMobileDropdown === link.label;

            return (
              <div key={link.label} className="border-b border-[#2a2a2a]">
                <div
                  className="flex items-center justify-between py-6 cursor-pointer"
                  onClick={() => {
                    if (link.children) {
                      setOpenMobileDropdown(isOpen ? null : link.label);
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                >
                  <Link
                    href={link.href}
                    className="text-[22px] text-white font-light tracking-tight"
                  >
                    {link.label}
                  </Link>

                  {link.children ? (
                    <svg
                      className={`w-4 h-4 text-white transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 7l5 6 5-6H5z" />
                    </svg>
                  ) : (
                    <ArrowIcon />
                  )}
                </div>

                <AnimatePresence>
                  {link.children && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => {
                            setMenuOpen(false);
                            setOpenMobileDropdown(null);
                          }}
                          className="block pl-6 py-3 text-[16px] text-gray-400 hover:text-white transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <div className="border-b border-[#2a2a2a]" />
        </nav>

        {/* Bottom CTA */}
        <div className="px-7 py-8">
          <Link
            href="/connect"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-3 w-full py-4 bg-[#111] border border-[#3D3D3D] text-white text-[14px] font-light tracking-widest uppercase hover:bg-[#1a1a1a] transition-colors"
          >
            <span>Engage With Us</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="3" cy="9" r="1.5" fill="white" opacity="0.6" />
              <circle cx="9" cy="9" r="1.5" fill="white" opacity="0.6" />
              <circle cx="15" cy="9" r="1.5" fill="white" opacity="0.6" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;