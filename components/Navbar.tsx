"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback, useTransition, memo } from "react";
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
const PageLoadingBar = memo(() => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevPathname = useRef(pathname);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const completeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLoading = useCallback(() => {
    setLoading(true);
    setProgress(40);
  }, []);

  const completeLoading = useCallback(() => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    if (completeTimeout.current) clearTimeout(completeTimeout.current);
    setProgress(100);
    setLoading(false);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      if (loading) {
        if (completeTimeout.current) clearTimeout(completeTimeout.current);
        completeTimeout.current = setTimeout(() => {
          completeLoading();
        }, 50);
      } else {
        completeLoading();
      }
    }
  }, [pathname, loading, completeLoading]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      const isInternal = href.startsWith("/") && !href.startsWith("//");
      if (!isInternal) return;
      if (href === pathname) return;
      startLoading();
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname, startLoading]);

  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (completeTimeout.current) clearTimeout(completeTimeout.current);
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full pointer-events-none" style={{ height: "2px", zIndex: 9999 }}>
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          transition: progress === 100 ? "width 0.15s ease-out" : "width 0.1s ease-out",
          background: "linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)",
          boxShadow: "0 0 10px 1px rgba(59,130,246,0.7)",
        }}
      />
    </div>
  );
});

const Navbar = () => {
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const _isPending = useTransition()[0];
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const scrollTimeout = useRef<NodeJS.Timeout | number | null>(null);

  // Hide navbar while the user is actively scrolling; show it after short pause
  const handleScroll = useCallback(() => {
    setShowNavbar(false);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = window.setTimeout(() => {
      setShowNavbar(true);
    }, 220); // show on scroll stop after 220ms
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (desktopRef.current && !desktopRef.current.contains(event.target as Node)) setOpenDesktopDropdown(null);
  }, []);

  const handleDesktopDropdown = useCallback((label: string, hasChildren: boolean) => {
    if (!hasChildren) return;
    setOpenDesktopDropdown((prev) => (prev === label ? null : label));
  }, []);

  const handleMobileDropdown = useCallback((label: string) => {
    setOpenMobileDropdown((prev) => (prev === label ? null : label));
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setOpenMobileDropdown(null);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    
    // Cleanup: Always reset on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) setOpenMobileDropdown(null);
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      // Emergency reset if component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <PageLoadingBar />

      <motion.header
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="bg-black fixed top-0 left-0 w-full z-50"
      >
        <div className="mx-10 lg:mx-20 xl:mx-24 h-15">
          <div className="flex justify-between items-center h-full">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Logo" width={90} height={32} priority unoptimized className="w-20 sm:w-24 h-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center font-medium relative">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href || link.children?.some((child) => pathname === child.href);
                const isOpen = openDesktopDropdown === link.label;
                return (
                  <div
                    key={link.label}
                    className="relative flex items-center text-white"
                    ref={isOpen ? desktopRef : null}
                  >
                    <button
                      onClick={() => handleDesktopDropdown(link.label, !!link.children)}
                      className={`px-2 text-b2 flex items-center gap-1 transition-colors ${isActive ? "text-white" : "text-gray-200 hover:text-white"}`}
                      aria-haspopup={link.children ? "menu" : undefined}
                      aria-expanded={link.children ? isOpen : undefined}
                    >
                      {link.href ? <Link href={link.href}>{link.label}</Link> : <span>{link.label}</span>}
                      {link.children && (
                        <svg
                          className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                                  prefetch={true}
                                  onClick={() => {
                                    setOpenDesktopDropdown(null);
                                  }}
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

            <Link href="/engageWithUs" className="hidden lg:flex group items-center gap-3 font-medium text-white ml-6">
              <span>Connect</span>
              <span className="w-5 h-5 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 14 14" className="rounded-sm bg-white p-1 transition-transform ease-in-out duration-300 group-hover:scale-[1.4] text-black">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            <button className="lg:hidden flex items-center px-2 py-1 text-white" onClick={toggleMenu}>
              <div style={{ width: 30, height: 30 }} className="relative flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <line x1="10.25" y1="0" x2="10.25" y2="7" stroke="white" strokeWidth="0.5" />
                  <line x1="10.25" y1="13" x2="10.25" y2="20" stroke="white" strokeWidth="0.5" />
                  <line x1="13" y1="9.75" x2="20" y2="9.75" stroke="white" strokeWidth="0.5" />
                  <line y1="9.75" x2="7" y2="9.75" stroke="white" strokeWidth="0.5" />
                </svg>
                <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-gray-300" />
                <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-gray-300" />
                <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-gray-300" />
                <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-gray-300" />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <div onClick={closeMenu} className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />

      {/* Drawer Panel - Right side */}
      <div className={`fixed top-0 right-0 z-[70] h-full w-[85vw] max-w-[393px] bg-black flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Top bar */}
        <div className="flex items-center justify-between px-7 pt-7 pb-6">
          <Link href="/" onClick={closeMenu}>
            <Image src="/logo.svg" alt="Logo" width={90} height={32} unoptimized className="w-20 h-auto" />
          </Link>
          <button onClick={closeMenu} className="w-9 h-9 flex items-center justify-center">
            <div style={{ width: 30, height: 30 }} className="relative flex items-center justify-center">
              <svg viewBox="0 0 29 29" fill="true">
                <path d="M7.24773 7.35784L14.5001 14.61" stroke="white" strokeWidth="0.8" />
                <line x1="13.6422" y1="13.7521" x2="21.6422" y2="21.7521" stroke="white" strokeWidth="0.8" />
                <path d="M13.2887 15.61L21.7523 7.14657" stroke="white" strokeWidth="0.8" />
                <line x1="7.14659" y1="21.7521" x2="15.1466" y2="13.7521" stroke="white" strokeWidth="0.8" />
              </svg>
              <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-gray-300" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-gray-300" />
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-gray-300" />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-gray-300" />
            </div>
          </button>
        </div>

        <div className="px-7 pb-6">
          <p className="text-[12px] font-light leading-relaxed tracking-wide text-left">
            Excellence In Execution<br />
            Precision In Performance
          </p>
        </div>

        <div className="mx-7 border-t border-color" />

        <nav className="flex flex-col flex-1 px-7 pt-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isOpen = openMobileDropdown === link.label;
            const isActive = pathname === link.href || link.children?.some((child) => pathname === child.href);

            return (
              <div key={link.label} className={`border-b border-color transition-colors ${isActive ? "bg-white/10" : ""}`}>
                {link.href && !link.children ? (
                  <Link href={link.href} onClick={closeMenu} className="flex items-center justify-between py-4 text-left">
                    <span className={`text-[16px] font-light tracking-tight ${isActive ? "text-white" : "text-gray-200"}`}>{link.label}</span>
                    <svg width="12" height="12" viewBox="0 0 15 16" fill="none">
                      <path d="M1.5 14.25L14 0.25M14 0.25H0M14 0.25V15.25" stroke="white" strokeWidth="0.5" />
                    </svg>
                  </Link>
                ) : (
                  <div className="py-4">
                    <button onClick={() => handleMobileDropdown(link.label)} className="w-full flex items-center justify-between text-left">
                      <span className={`text-[16px] font-light tracking-tight ${isActive ? "text-white" : "text-gray-200"}`}>{link.label}</span>
                      <svg className={`w-4 h-4 text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 7l5 6 5-6H5z" />
                      </svg>
                    </button>
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
                              onClick={(e) => {
                                e.preventDefault();
                                closeMenu();
                                window.location.href = child.href;
                              }}
                              className={`block pl-6 py-3 text-[16px] transition-colors text-left ${pathname === child.href ? "text-white bg-white/10" : "text-gray-400 hover:text-white"}`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="px-7 pb-8 flex justify-start">
          <OutlineBtn text="Engage With Us" />
        </div>
      </div>
    </>
  );
};

export default memo(Navbar);