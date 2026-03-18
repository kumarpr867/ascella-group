"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import OutlineBtn from "./btns/OutlineBtn";

const navLinks = [
  { label: "Operating Model", href: "/how-ascella-operates" },
  { label: "Execution Arms", href: "/execution-arms" },
  { label: "Organisations", href: "/who-we-work-with" },
  { label: "Startups", href: "/startups" },
  {
    label: "Insights",
    children: [
      { label: "Case Studies", href: "/insights/case-studies" },
      { label: "Blogs", href: "/insights/blogs" },
    ],
  },
  {
    label: "Careers",
    children: [
      { label: "Life at Ascella", href: "/careers" },
      { label: "Explore Opportunities", href: "/JD-Page" },
    ],
  },
];

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

      // If we have started a loading sequence, complete it after a short delay
      if (loading) {
        if (completeTimeout.current) clearTimeout(completeTimeout.current);
        completeTimeout.current = setTimeout(() => {
          completeLoading();
        }, 80);
      } else {
        completeLoading();
      }
    }
  }, [pathname, loading]);

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
      className="fixed top-0 left-0 w-full pointer-events-none"
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

  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const desktopRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);
  useEffect(() => {
    if (!menuOpen) {
      setOpenMobileDropdown(null);
    }
  }, [menuOpen]);

  

  return (
    <>
      {/* ── Blue Page Loading Bar ── */}
      <PageLoadingBar />

      <motion.header
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="bg-black fixed top-0 left-0 w-full z-50"
      >
        <div className="mx-10 lg:mx-20 xl:mx-24 h-15">
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
                      className={`px-2 text-b2 flex items-center gap-1 transition-colors ${isActive ? "text-white" : "text-gray-200 hover:text-white"
                        }`}
                      aria-haspopup={link.children ? "menu" : undefined}
                      aria-expanded={link.children ? isOpen : undefined}
                    >
                      {link.href ? (
                        <Link href={link.href}>{link.label}</Link>
                      ) : (
                        <span>{link.label}</span>
                      )}

                      {link.children && (
                        <svg
                          className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
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
                                  className={`block px-5 py-3 text-sm transition-colors ${childActive
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
              <div
                style={{ width: 30, height: 30, padding: 0 }}
                className="relative flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="10.25" y1="1.09278e-08" x2="10.25" y2="7" stroke="white" stroke-width="0.5" />
                  <line x1="10.25" y1="13" x2="10.25" y2="20" stroke="white" stroke-width="0.5" />
                  <line x1="13" y1="9.75" x2="20" y2="9.75" stroke="white" stroke-width="0.5" />
                  <line y1="9.75" x2="7" y2="9.75" stroke="white" stroke-width="0.5" />
                </svg>

                <span className={`absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-gray-300`} />
                <span className={`absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-gray-300`} />
                <span className={`absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-gray-300`} />
                <span className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-gray-300`} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── FULL-SCREEN MOBILE DRAWER OVERLAY ── */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 left-0 z-[70] h-full w-[85vw] max-w-[393px] bg-black flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"
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
            className="w-9 h-9 flex items-center justify-center"
            aria-label="Close menu"
          >
            <div
              style={{ width: 30, height: 30, padding: 0 }}
              className="relative flex items-center justify-center"
            >
              <svg viewBox="0 0 29 29" fill="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.24773 7.35784L14.5001 14.61" stroke="white" stroke-width="0.8" />
                <line x1="13.6422" y1="13.7521" x2="21.6422" y2="21.7521" stroke="white" stroke-width="0.8" />
                <path d="M13.2887 15.61L21.7523 7.14657" stroke="white" stroke-width="0.8" />
                <line x1="7.14659" y1="21.7521" x2="15.1466" y2="13.7521" stroke="white" stroke-width="0.8" />
              </svg>



              <span className={`absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-gray-300`} />
              <span className={`absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-gray-300`} />
              <span className={`absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-gray-300`} />
              <span className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-gray-300`} />
            </div>
          </button>
        </div>

        {/* Tagline */}
        <div className="px-7 pb-6">
          <p className="text-[12px] font-light leading-relaxed tracking-wide">
            Excellence In Execution<br />
            Precision In Performance
          </p>
        </div>

        {/* Divider */}
        <div className="mx-7 border-t border-color" />

        {/* Nav Links mobile */}
        <nav className="flex flex-col flex-1 px-7 pt-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isOpen = openMobileDropdown === link.label;
            const isActive = pathname === link.href || link.children?.some((child) => pathname === child.href);

            return (
              <div key={link.label} className="border-b border-color">

                {link.href && !link.children ? (
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-4"
                  >
                    <span className={`text-[16px] font-light tracking-tight ${isActive ? "text-white" : "text-gray-200"}`}>
                      {link.label}
                    </span>

                    <svg width="12" height="12" viewBox="0 0 15 16" fill="none">
                      <path
                        d="M1.5 14.25L14 0.25M14 0.25H0M14 0.25V15.25"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </Link>
                ) : (
                  <div className="flex items-center justify-between py-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMobileDropdown(isOpen ? null : link.label);
                      }}
                      className="w-full flex items-center justify-between"
                    >
                      <span className={`text-[16px] font-light tracking-tight ${isActive ? "text-white" : "text-gray-200"}`}>
                        {link.label}
                      </span>
                      <svg
                        className={`w-4 h-4 text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                          }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5 7l5 6 5-6H5z" />
                      </svg>
                    </button>
                  </div>
                )}

                <AnimatePresence>
                  {link.children && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {link.children.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => {
                              setMenuOpen(false);
                              setOpenMobileDropdown(null);
                            }}
                            className={`block pl-6 py-3 text-[16px] transition-colors ${childActive
                                ? "text-white"
                                : "text-gray-400 hover:text-white"
                              }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <div className="border-b border-[#2a2a2a]" />
        </nav>

        {/* Bottom CTA */}
        <div className="px-7 pb-8">
          <OutlineBtn text="Engage With Us" />
        </div>
      </div>
    </>
  );
};

export default Navbar;