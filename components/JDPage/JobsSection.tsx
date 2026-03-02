"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import PartialOutlineBtn from "../btns/PartialOutlineBtn";

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.1,
    },
  },
};


const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -2,
    scale: 0.5,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
  hover: {
    y: -10,
    scale: 1.05,
    boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    y: 2,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};


type Job = {
  id: number;
  title: string;
  company: string;
  description: string;
  status: "Open position" | "Expired position";
  experience: string;
  image: string;
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

const description =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.";

const jobs: Job[] = [
  { id: 1, title: "Senior UI/UX Designer", company: "Ascella Group", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 2, title: "Senior UI/UX Designer", company: "Ascella Group", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 3, title: "Senior UI/UX Designer", company: "Ascella Group", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },

  { id: 4, title: "Senior UI/UX Designer", company: "Ascella Infosec", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 5, title: "Senior UI/UX Designer", company: "Ascella Infosec", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },

  { id: 6, title: "Role Title", company: "Ascella Softwarelabs", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 7, title: "Role Title", company: "Ascella Softwarelabs", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 8, title: "Role Title", company: "Ascella Softwarelabs", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },

  { id: 9, title: "HR", company: "Ascella Staffing", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },

  { id: 10, title: "Role Title", company: "Ascella Engage", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 11, title: "Role Title", company: "Ascella Engage", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },

  { id: 12, title: "Role Title", company: "Ascella Forge", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 13, title: "Role Title", company: "Ascella Forge", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 14, title: "Role Title", company: "Ascella Forge", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },
];

const roles = [
  "All roles",
  ...Array.from(new Set(jobs.map((job) => job.title))),
];

export default function JobsSection() {
  const [activeCompany, setActiveCompany] = useState("All roles");
  const [activeRole, setActiveRole] = useState("All roles");
  const [showFilter, setShowFilter] = useState(false);

  const normalize = (value: string) =>
    value.toLowerCase().trim();

  const visibleJobs = jobs.filter((job) => {
    const companyMatch =
      activeCompany === "All roles" ||
      normalize(job.company) === normalize(activeCompany);

    const roleMatch =
      activeRole === "All roles" ||
      normalize(job.title) === normalize(activeRole);

    return companyMatch && roleMatch;
  });
  const groupedJobs = visibleJobs.reduce<Record<string, Job[]>>(
    (acc, job) => {
      if (!acc[job.company]) {
        acc[job.company] = [];
      }
      acc[job.company].push(job);
      return acc;
    },
    {}
  );

  return (
    <section className="my-5">
      <div className="flex items-center border-b border-color xl:px-32 py-2 justify-between">
        {companies.map((company) => (
          <button
            key={company}
            onClick={() => setActiveCompany(company)}
            className={`relative whitespace-nowrap text-sm sm:text-base pb-2 transition ${activeCompany === company
              ? "text-white"
              : "text-white/50 hover:text-white"
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
        <div className="hidden">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm"
          >
            Filter <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.7087 9.99999H7.41283M3.77866 9.99999H2.29199M3.77866 9.99999C3.77866 9.51818 3.97006 9.0561 4.31075 8.71541C4.65144 8.37472 5.11352 8.18332 5.59533 8.18332C6.07714 8.18332 6.53921 8.37472 6.8799 8.71541C7.22059 9.0561 7.41199 9.51818 7.41199 9.99999C7.41199 10.4818 7.22059 10.9439 6.8799 11.2846C6.53921 11.6253 6.07714 11.8167 5.59533 11.8167C5.11352 11.8167 4.65144 11.6253 4.31075 11.2846C3.97006 10.9439 3.77866 10.4818 3.77866 9.99999ZM17.7087 15.5058H12.9187M12.9187 15.5058C12.9187 15.9877 12.7268 16.4503 12.386 16.7911C12.0453 17.1319 11.5831 17.3233 11.1012 17.3233C10.6193 17.3233 10.1573 17.1311 9.81658 16.7904C9.47589 16.4497 9.28449 15.9876 9.28449 15.5058M12.9187 15.5058C12.9187 15.0239 12.7268 14.5621 12.386 14.2214C12.0453 13.8806 11.5831 13.6892 11.1012 13.6892C10.6193 13.6892 10.1573 13.8806 9.81658 14.2212C9.47589 14.5619 9.28449 15.024 9.28449 15.5058M9.28449 15.5058H2.29199M17.7087 4.49416H15.1212M11.487 4.49416H2.29199M11.487 4.49416C11.487 4.01235 11.6784 3.55027 12.0191 3.20958C12.3598 2.86889 12.8218 2.67749 13.3037 2.67749C13.5422 2.67749 13.7785 2.72448 13.9989 2.81578C14.2193 2.90707 14.4195 3.04089 14.5882 3.20958C14.7569 3.37827 14.8907 3.57854 14.982 3.79895C15.0733 4.01936 15.1203 4.25559 15.1203 4.49416C15.1203 4.73272 15.0733 4.96896 14.982 5.18937C14.8907 5.40977 14.7569 5.61004 14.5882 5.77873C14.4195 5.94743 14.2193 6.08124 13.9989 6.17254C13.7785 6.26383 13.5422 6.31082 13.3037 6.31082C12.8218 6.31082 12.3598 6.11943 12.0191 5.77873C11.6784 5.43804 11.487 4.97597 11.487 4.49416Z" stroke="white" stroke-width="0.7" stroke-miterlimit="10" stroke-linecap="round" />
            </svg>


          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-color px-4 sm:px-6 lg:px-10 py-4 bg-black"
          >
            <div className="flex flex-wrap gap-3">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`px-4 py-1 rounded-full text-sm transition ${activeRole === role
                    ? "bg-white text-black"
                    : "bg-zinc-800 text-white/70 hover:bg-zinc-700"
                    }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-20 mx-auto max-w-7xl my-10">
        <AnimatePresence>
          {Object.entries(groupedJobs).map(([company, jobs]) => (
            <motion.div
              key={company}
              layout
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-6"
            >
              <h2 className="text-xl mb-8">{company}</h2>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <motion.div
                    key={job.id}
                    variants={cardVariants}
                    whileHover="hover"

                  >
                    <div className="relative h-40 mb-4">
                      <Image
                        src={job.image}
                        alt={job.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className={`border border-color object-cover pointer-events-none ${job.status === "Open position" ? "opacity-50" : "opacity-20"}`}
                      />

                      {job.status === "Expired position" && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <PartialOutlineBtn
                            text="Expired"
                            bgColor="transparent"
                            borderColor="white"
                            hoverBgColor="transparent"
                            hoverTextColor="white"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between my-5">
                      <h3 className="text-b1">{job.title}</h3>
                      <p className="text-b1">{job.company}</p>
                    </div>

                    <p className="text-b3 text-gray-200 mb-5">{job.description}</p>

                    <div className="flex items-center gap-3 mb-6">
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

                    {job.status === "Open position" && <PartialOutlineBtn text="Apply Now" />}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>


      </div>
    </section>
  );
}
