"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PartialOutlineBtn from "../btns/PartialOutlineBtn";

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
  { id: 1, title: "Senior UI/UX Designer", company: "Ascella Group", description, status: "Expired position", experience: "3 years Experience", image: "/Jobs/job.png" },
  { id: 2, title: "Senior UI/UX Designer", company: "Ascella Group", description, status: "Open position", experience: "3 years Experience", image: "/Jobs/job.png" },
  { id: 3, title: "Senior UI/UX Designer", company: "Ascella Group", description, status: "Open position", experience: "3 years Experience", image: "/Jobs/job.png" },

  { id: 4, title: "Senior UI/UX Designer", company: "Ascella Infosec", description, status: "Expired position", experience: "3 years Experience", image: "/Jobs/job.png" },
  { id: 5, title: "Senior UI/UX Designer", company: "Ascella Infosec", description, status: "Open position", experience: "3 years Experience", image: "/Jobs/job.png" },

  { id: 6, title: "Role Title", company: "Ascella Softwarelabs", description, status: "Open position", experience: "3 years Experience", image: "/Jobs/job.png" },
  { id: 7, title: "Role Title", company: "Ascella Softwarelabs", description, status: "Open position", experience: "3 years Experience", image: "/Jobs/job.png" },
  { id: 8, title: "Role Title", company: "Ascella Softwarelabs", description, status: "Open position", experience: "3 years Experience", image: "/Jobs/job.png" },

  { id: 9, title: "HR", company: "Ascella Staffing", description, status: "Open position", experience: "3 years Experience", image: "/Jobs/job.png" },

  { id: 10, title: "Role Title", company: "Ascella Engage", description, status: "Expired position", experience: "3 years Experience", image: "/Jobs/job.png" },
  { id: 11, title: "Role Title", company: "Ascella Engage", description, status: "Expired position", experience: "3 years Experience", image: "/Jobs/job.png" },

  { id: 12, title: "Role Title", company: "Ascella Forge", description, status: "Expired position", experience: "3 years Experience", image: "/Jobs/job.png" },
  { id: 13, title: "Role Title", company: "Ascella Forge", description, status: "Expired position", experience: "3 years Experience", image: "/Jobs/job.png" },
  { id: 14, title: "Role Title", company: "Ascella Forge", description, status: "Expired position", experience: "3 years Experience", image: "/Jobs/job.png" },
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
      {/* Filter */}
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

      {/* Grouped Jobs */}
      <div className="space-y-20 mx-auto max-w-7xl">
        <AnimatePresence>
          {Object.entries(groupedJobs).map(([company, jobs]) => (
            <motion.div
              key={company}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >

              <h2 className="text-xl mb-8">{company}</h2>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.4,
                      ease: "linear",
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                    }}
                    className="group p-6 border border-transparent hover:border-color transition"
                  >

                    <div className="relative h-40 mb-4">
                      <Image
                        src={job.image}
                        alt={job.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover opacity-50"
                      />
                      {(job.status==="Expired position") && (
                      <div className="absolute top-15 left-30">
                        <PartialOutlineBtn text="Expired" bgColor="transparent" borderColor="white" hoverBgColor="transparent" hoverTextColor="white"/>
                      </div>
                    )}
                    </div>
                    

                    <div className="flex justify-between my-5">
                      <h3 className="text-b1">{job.title}</h3>
                      <p className="text-b1">{job.company}</p>
                    </div>

                    <p className="text-b3 text-gray-200 mb-5">
                      {job.description}
                    </p>

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

                    {(job.status === "Open position") && (
                      <PartialOutlineBtn text="Apply Now"/>
                    )}
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
