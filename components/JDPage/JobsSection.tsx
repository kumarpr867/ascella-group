  "use client";

  import { useState, useRef } from "react";
  import Image from "next/image";
  import { motion, AnimatePresence, Variants } from "motion/react";
  import PartialOutlineBtn from "../btns/PartialOutlineBtn";
  import { useRouter } from "next/navigation";
  import { slideInFromLeft } from "@/utils/motion";
  import Reveal from "@/utils/Reveal";
  import { jobs } from "@/data/jobs";
  import type { Job } from "@/data/jobs";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: -2, scale: 0.5 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: {
      opacity: 0,
      y: 2,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const companies = [
    "All roles",
    "Ascella Group",
    "Ascella Infosec",
    "Ascella Softwarelabs",
    "Ascella Staffing",
    "Ascella Engage",
    "Ascella Forge",
  ];


  export default function JobsSection() {
    const router = useRouter();
    const statuses = ["All", "Active", "Inactive"];

    const [activeCompany, setActiveCompany] = useState("All roles");
    const [activeStatus, setActiveStatus] = useState("All");
    const [showFilter, setShowFilter] = useState(false);

    const scrollTabsRef = useRef<HTMLDivElement>(null);

    const normalize = (value: string) => value.toLowerCase().trim();

    const visibleJobs = jobs.filter((job) => {
      const companyMatch =
        activeCompany === "All roles" ||
        normalize(job.company) === normalize(activeCompany);
      const statusMatch =
        activeStatus === "All" ||
        (activeStatus === "Active" && job.status === "Open position") ||
        (activeStatus === "Inactive" && job.status === "Expired position");
      return companyMatch && statusMatch;
    });

    const groupedJobs = visibleJobs.reduce<Record<string, Job[]>>((acc, job) => {
      if (!acc[job.company]) acc[job.company] = [];
      acc[job.company].push(job);
      return acc;
    }, {});

    const scrollableCompanies = companies.filter((c) => c !== "All roles");

    // Navigate to JD-Apply page (used for both Apply button and image click)
    const handleNavigateToApply = (job: Job) => {
      router.push(`/JD-Page/${job.slug}`);
    };

    return (
      <section className="my-2">
        <motion.div layout>

          {/* ─── DESKTOP TAB BAR ─── */}
          <div className="hidden lg:flex items-center border-b border-color py-2">
            <Reveal variants={slideInFromLeft(0.2)} className="flex items-center justify-between w-full mx-20">
              {companies.map((company) => (
                <button
                  key={company}
                  onClick={() => setActiveCompany(company)}
                  className={`relative whitespace-nowrap text-sm sm:text-base pb-2 transition ${activeCompany === company ? "text-white" : "text-white/50 hover:text-white"
                    }`}
                >
                  {company}
                  {activeCompany === company && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 -bottom-2 h-0.5 w-full bg-white"
                    />
                  )}
                </button>
              ))}
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 text-gray-100 hover:text-white text-sm pb-2"
              >
                Filter
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.7087 9.99999H7.41283M3.77866 9.99999H2.29199M3.77866 9.99999C3.77866 9.51818 3.97006 9.0561 4.31075 8.71541C4.65144 8.37472 5.11352 8.18332 5.59533 8.18332C6.07714 8.18332 6.53921 8.37472 6.8799 8.71541C7.22059 9.0561 7.41199 9.51818 7.41199 9.99999C7.41199 10.4818 7.22059 10.9439 6.8799 11.2846C6.53921 11.6253 6.07714 11.8167 5.59533 11.8167C5.11352 11.8167 4.65144 11.6253 4.31075 11.2846C3.97006 10.9439 3.77866 10.4818 3.77866 9.99999ZM17.7087 15.5058H12.9187M12.9187 15.5058C12.9187 15.9877 12.7268 16.4503 12.386 16.7911C12.0453 17.1319 11.5831 17.3233 11.1012 17.3233C10.6193 17.3233 10.1573 17.1311 9.81658 16.7904C9.47589 16.4497 9.28449 15.9876 9.28449 15.5058M12.9187 15.5058C12.9187 15.0239 12.7268 14.5621 12.386 14.2214C12.0453 13.8806 11.5831 13.6892 11.1012 13.6892C10.6193 13.6892 10.1573 13.8806 9.81658 14.2212C9.47589 14.5619 9.28449 15.024 9.28449 15.5058M9.28449 15.5058H2.29199M17.7087 4.49416H15.1212M11.487 4.49416H2.29199M11.487 4.49416C11.487 4.01235 11.6784 3.55027 12.0191 3.20958C12.3598 2.86889 12.8218 2.67749 13.3037 2.67749C13.5422 2.67749 13.7785 2.72448 13.9989 2.81578C14.2193 2.90707 14.4195 3.04089 14.5882 3.20958C14.7569 3.37827 14.8907 3.57854 14.982 3.79895C15.0733 4.01936 15.1203 4.25559 15.1203 4.49416C15.1203 4.73272 15.0733 4.96896 14.982 5.18937C14.8907 5.40977 14.7569 5.61004 14.5882 5.77873C14.4195 5.94743 14.2193 6.08124 13.9989 6.17254C13.7785 6.26383 13.5422 6.31082 13.3037 6.31082C12.8218 6.11943 12.3598 6.11943 12.0191 5.77873C11.6784 5.43804 11.487 4.97597 11.487 4.49416Z" stroke="white" strokeWidth="0.7" strokeMiterlimit="10" strokeLinecap="round" />
                </svg>
              </button>
            </Reveal>
          </div>

          {/* ─── MOBILE TAB BAR ─── */}
          <div className="flex lg:hidden items-center border-b border-color">
            <button
              onClick={() => { setActiveCompany("All roles"); setShowFilter(false); }}
              className={`relative shrink-0 whitespace-nowrap text-sm pb-3 pt-2 pl-6 pr-3 transition ${activeCompany === "All roles" ? "text-white" : "text-white/50"
                }`}
            >
              All roles
              {activeCompany === "All roles" && (
                <motion.div
                  layoutId="mobileActiveTab"
                  className="absolute left-0 -bottom-[1px] h-0.5 w-full bg-white"
                />
              )}
            </button>

            <div className="shrink-0 w-px h-4 bg-white/20 mx-2" />

            <div
              ref={scrollTabsRef}
              className="flex-1 flex items-center overflow-x-auto gap-5 pb-3 pt-2 scrollbar-hide"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {scrollableCompanies.map((company) => (
                <button
                  key={company}
                  onClick={() => setActiveCompany(company)}
                  className={`relative shrink-0 whitespace-nowrap text-sm transition ${activeCompany === company ? "text-white" : "text-white/50"
                    }`}
                >
                  {company}
                  {activeCompany === company && (
                    <motion.div
                      layoutId="mobileActiveTab"
                      className="absolute left-0 -bottom-3 h-0.5 w-full bg-white"
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFilter(!showFilter)}
              className="shrink-0 flex items-center gap-1 text-white/70 hover:text-white pr-5 pl-3 pb-3 pt-2"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.7087 9.99999H7.41283M3.77866 9.99999H2.29199M3.77866 9.99999C3.77866 9.51818 3.97006 9.0561 4.31075 8.71541C4.65144 8.37472 5.11352 8.18332 5.59533 8.18332C6.07714 8.18332 6.53921 8.37472 6.8799 8.71541C7.22059 9.0561 7.41199 9.51818 7.41199 9.99999C7.41199 10.4818 7.22059 10.9439 6.8799 11.2846C6.53921 11.6253 6.07714 11.8167 5.59533 11.8167C5.11352 11.8167 4.65144 11.6253 4.31075 11.2846C3.97006 10.9439 3.77866 10.4818 3.77866 9.99999ZM17.7087 15.5058H12.9187M12.9187 15.5058C12.9187 15.9877 12.7268 16.4503 12.386 16.7911C12.0453 17.1319 11.5831 17.3233 11.1012 17.3233C10.6193 17.3233 10.1573 17.1311 9.81658 16.7904C9.47589 16.4497 9.28449 15.9876 9.28449 15.5058M12.9187 15.5058C12.9187 15.0239 12.7268 14.5621 12.386 14.2214C12.0453 13.8806 11.5831 13.6892 11.1012 13.6892C10.6193 13.6892 10.1573 13.8806 9.81658 14.2212C9.47589 14.5619 9.28449 15.024 9.28449 15.5058M9.28449 15.5058H2.29199M17.7087 4.49416H15.1212M11.487 4.49416H2.29199M11.487 4.49416C11.487 4.01235 11.6784 3.55027 12.0191 3.20958C12.3598 2.86889 12.8218 2.67749 13.3037 2.67749C13.5422 2.67749 13.7785 2.72448 13.9989 2.81578C14.2193 2.90707 14.4195 3.04089 14.5882 3.20958C14.7569 3.37827 14.8907 3.57854 14.982 3.79895C15.0733 4.01936 15.1203 4.25559 15.1203 4.49416C15.1203 4.73272 15.0733 4.96896 14.982 5.18937C14.8907 5.40977 14.7569 5.61004 14.5882 5.77873C14.4195 5.94743 14.2193 6.08124 13.9989 6.17254C13.7785 6.26383 13.5422 6.31082 13.3037 6.31082C12.8218 6.31082 12.3598 6.11943 12.0191 5.77873C11.6784 5.43804 11.487 4.97597 11.487 4.49416Z" stroke="white" strokeWidth="0.7" strokeMiterlimit="10" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* ─── FILTER PANEL ─── */}
          <AnimatePresence mode="popLayout">
            {showFilter && (
              <motion.div
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden border-b border-color py-4 space-y-10"
              >
                <div className="mx-10 lg:mx-20">
                  <div>
                    <h3 className="text-[16px] text-gray-100 mb-2">Status</h3>
                    <div className="flex flex-wrap gap-3">
                      {statuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => setActiveStatus(status)}
                          className={`px-4 py-1 rounded-xl text-[12px] transition ${activeStatus === status
                            ? "bg-white text-black"
                            : "bg-gray-500 text-white/70 hover:bg-gray-400"
                            }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── JOB CARDS ─── */}
          <div className="space-y-20 mx-10 lg:mx-20 xl:mx-24 my-10">
            <AnimatePresence mode="wait">
              {visibleJobs.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-20"
                >
                  <h3 className="text-xl text-white mb-4">No positions available</h3>
                  <p className="text-gray-100 mb-6">
                    There are currently no jobs matching your selected filters.
                  </p>
                  <button
                    onClick={() => { setActiveCompany("All roles"); setActiveStatus("All"); }}
                    className="px-4 py-2 border border-gray-300 rounded-2xl text-white hover:bg-white hover:text-black transition"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                Object.entries(groupedJobs).map(([company, jobs]) => (
                  <motion.div
                    key={company}
                    layout
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="space-y-6"
                  >
                    <h5 className="md:ml-5 text[2] mb-8">{company}</h5>

                    {/* 
                      GRID:
                      - Mobile: 2 columns
                      - md: 2 columns
                      - lg: 3 columns
                    */}
                    <div className="grid grid-cols-2 gap-4 md:gap-12 xl:gap-16 md:grid-cols-2 lg:grid-cols-3 md:px-5">
                      {jobs.map((job) => (
                        <motion.div
                          key={job.id}
                          variants={cardVariants}
                          whileHover="hover"
                          className="flex flex-col"
                        >
                          {/* 
                            ─── IMAGE BLOCK (shared between mobile & desktop) ───
                            - Clickable on ALL devices → navigates to /JD-Apply
                            - Badges overlaid on top-left (years) and top-right (status)
                            - Expired: dimmer opacity + "Expired" center overlay (desktop only, mobile just dimmer)
                          */}
                          <div
                            className="relative h-32 sm:h-36 md:h-40 mb-3 cursor-pointer"
                            onClick={() => handleNavigateToApply(job)}
                          >
                            <Image
                              src={job.image}
                              alt={job.title}
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                              className={`border border-color object-cover pointer-events-none ${job.status === "Open position" ? "opacity-50" : "opacity-20"
                                }`}
                            />

                            {/* Expired overlay — desktop only */}
                            {job.status === "Expired position" && (
                              <div className="absolute inset-0 hidden md:flex items-center justify-center z-10">
                                <PartialOutlineBtn
                                  text="Expired"
                                  bgColor="transparent"
                                  borderColor="white"
                                  hoverBgColor="transparent"
                                  hoverTextColor="white"
                                />
                              </div>
                            )}

                            {/* ── MOBILE BADGES (overlaid on image) ── */}
                            <div className="flex md:hidden absolute inset-x-0 bottom-0 justify-between items-end px-2 pb-2 z-10">
                              {/* Years badge — bottom-left */}
                              <span className="text-[10px] text-white bg-black/60 border border-white/30 px-2 py-0.5 rounded-sm">
                                {job.experience.replace(" Experience", "")}
                              </span>
                              {/* Status badge — bottom-right */}
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-sm border ${job.status === "Open position"
                                  ? "text-white bg-black/60 border-white/30"
                                  : "text-white/60 bg-black/60 border-white/20"
                                  }`}
                              >
                                {job.status === "Open position" ? "Open" : "Expired"}
                              </span>
                            </div>
                          </div>

                          {/* ── CARD BODY ── */}
                          {/* Mobile layout */}
                          <div className="flex flex-col md:hidden flex-1">
                            {/* Job title — left aligned, max 2 lines */}
                            <h3
                              className={`text-[13px] font-medium leading-tight line-clamp-2 mb-1 ${job.status === "Open position" ? "text-white" : "text-gray-400"
                                }`}
                            >
                              {job.title}
                            </h3>
                            {/* Company name */}
                            <p className="text-[11px] text-white/50 mb-3">{job.company}</p>

                            {/* Apply button — small, white bg, black text */}
                            {job.status === "Open position" ? (
                              <button
                                onClick={() => handleNavigateToApply(job)}
                                className="self-start text-[11px] font-medium bg-white text-black px-3 py-1 rounded-sm hover:bg-white/90 transition"
                              >
                                Apply Now
                              </button>
                            ) : (
                              <button
                                disabled
                                className="self-start text-[11px] font-medium bg-white/10 text-white/40 px-3 py-1 rounded-sm cursor-not-allowed"
                              >
                                Expired
                              </button>
                            )}
                          </div>

                          {/* Desktop layout (unchanged) */}
                          <div className="hidden md:flex flex-col flex-1">
                            <div className="flex flex-row items-center justify-between my-3">
                              <h3 className={`text-[16px] ${job.status === "Open position" ? "text-white" : "text-gray-200"}`}>
                                {job.title}
                              </h3>
                              <p className="text-b1">{job.company}</p>
                            </div>

                            <p className="text-b3 text-gray-200 mb-5 leading-tight">{job.description}</p>

                            <div className="flex justify-start items-center gap-3 mb-6">
                              <span
                                className={`text-b3 px-4 py-1 rounded-2xl ${job.status === "Open position"
                                  ? "bg-white text-black font-bold"
                                  : "bg-gray-500"
                                  }`}
                              >
                                {job.status}
                              </span>
                              <span className="text-b3 bg-gray-500 px-4 py-1 rounded-2xl">
                                {job.experience}
                              </span>
                            </div>

                            {job.status === "Open position" ? (
                              <PartialOutlineBtn
                                text="Apply Now"
                                onClick={() => handleNavigateToApply(job)}
                              />
                            ) : (
                              <PartialOutlineBtn
                                text="Expired"
                                hoverBgColor="black"
                                hoverTextColor="black"
                              />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    );
  }