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

export default function JobsSection() {
  const [activeCompany, setActiveCompany] = useState("All roles");
  const normalize = (value: string) =>
    value.toLowerCase().trim();

  const visibleJobs =
    activeCompany === "All roles"
      ? jobs
      : jobs.filter(
        (job) =>
          normalize(job.company) === normalize(activeCompany)
      );


  const groupedJobs = visibleJobs.reduce<Record<string, Job[]>>((acc, job) => {
    acc[job.company] = acc[job.company] || [];
    acc[job.company].push(job);
    return acc;
  }, {});


  return (
    <section className="my-5">
      
      <div className="flex items-center justify-between gap-6 border-b  border-color px-25 pb-4 mb-14">
        {companies.map((company) => (
          <button
            key={company}
            onClick={() => setActiveCompany(company)}
            className={`text-b1 transition ${activeCompany === company
              ? "text-white scale-[1.1]"
              : "text-white/50 hover:text-white"
              }`}
          >
            {company}
          </button>
        ))}
      </div>

      <div className="space-y-20 mx-auto max-w-7xl">
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
                    className="group p-6 border border-transparent hover:border-color transition"
                  >
                    <div className="relative h-40 mb-4">
                      <Image
                        src={job.image}
                        alt={job.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className={`border border-color object-cover pointer-events-none ${job.status === "Open position"? "opacity-50" : "opacity-20"}`}
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
