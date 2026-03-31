"use client"

import Image from "next/image"
import EnterpriseStartupSystem from "./EnterpriseStartupSystem"
import PlusText from "../headings/PlusText"
import { useRouter } from "next/navigation";
import Reveal from "@/utils/Reveal";
import { slideInFromBottom, slideInFromLeft, slideInFromRight } from "@/utils/motion";
import { motion } from "motion/react";


export default function WhoWeWorkWith() {
  const router = useRouter();
  return (
    <>
      <section className="hidden md:block border-y border-color">
        <div className="mx-10 xl:mx-24">
          <div className="h-[90vh] grid grid-cols-2 lg:grid-cols-[60%_40%] xl:grid-cols-[55%_45%] border-x border-color">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[55%_20%_25%] md:border-r border-color">

              <Reveal variants={slideInFromLeft(0.1)} className="border-b border-color flex flex-col lg:items-center justify-center px-6 ">
                <h2 className="">
                  Who We <span className="text-gray-200">Work With</span>
                </h2>
                <p className="mt-6 text-b3 font-light ">
                  Ascella partners with organisations where execution quality, governance discipline, and accountable ownership are business-critical rather than optional.
                </p>
              </Reveal>


              <Reveal variants={slideInFromLeft(0.2)} className="hidden lg:block border-l border-b border-color" children={undefined} />
              <Reveal variants={slideInFromLeft(0.3)} className="border-b border-color px-6 py-6 lg:py-0 flex items-center gap-4">
                <button onClick={() => router.push("/engageWithUs")} className="flex flex-center border border-color p-3 rounded-4xl hover:scale-110 transition">
                  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 14.25L14 0.25M14 0.25H0M14 0.25V15.25" stroke="white" strokeWidth="1" />
                  </svg>
                </button>
                <p className="text-[14px]">Engagements are selective by design.</p>
              </Reveal>

              <Reveal variants={slideInFromLeft(0.4)} className="border-b lg:border-l border-color px-6 py-6 lg:py-0 flex items-center">
                <p className="text-b3 text-gray-100 max-w-md">
                  Work begins only where leadership recognises that structure, oversight, and measurable control determine long-term outcomes.
                </p>
              </Reveal>

              <Reveal
                variants={slideInFromLeft(0.5)}
                className="hidden lg:block px-6 opacity-50"
              >
                <div className="flex items-end h-full pb-4 gap-2">

                  <motion.svg
                    width="15"
                    height="15"
                    viewBox="0 0 23 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ y: [10, 0, 10] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      d="M11.1606 0.00274594L11.3676 18.9022M11.3676 18.9022L22.1606 9.50275M11.3676 18.9022L0.160645 9.50275"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                  </motion.svg>

                  <p className="text-[14px]">Scroll Down</p>
                </div>
              </Reveal>

              <Reveal variants={slideInFromLeft(0.6)} className="hidden lg:block relative lg:border-l border-color">
                <Image
                  src="/whoWeWorkWith/map.svg"
                  alt="Map"
                  fill
                  className="object-cover object-center"
                />
              </Reveal>
            </div>


            <Reveal variants={slideInFromRight(0.7)} className="lg:hidden grid grid-cols-1 ">
              <div className="flex items-center justify-center">
                <EnterpriseStartupSystem />
              </div>
              <div className="relative w-full">
                <Image
                  src="/whoWeWorkWith/map.svg"
                  alt="Map"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </Reveal>

            <Reveal variants={slideInFromRight(0.7)} className="hidden lg:block px-2 flex items-center justify-center h-full w-full">
              <EnterpriseStartupSystem />
            </Reveal>

          </div>
        </div>
      </section>


      <section className="flex flex-col items-center md:hidden mt-10">

        <Reveal variants={(slideInFromBottom(0.1))} className="px-10 flex flex-col">
          <h3>Who We</h3>
          <h3 className="text-gray-200"> Work With</h3>
          <p className="mt-6 text-b2 lg:max-w-xl">
            Ascella partners with organisations where execution quality, governance discipline, and accountable ownership are business-critical rather than optional.
          </p>
        </Reveal>

        <Reveal variants={slideInFromBottom(0.2)} className="flex items-center justify-center">
          <EnterpriseStartupSystem />
        </Reveal>
        <Reveal variants={slideInFromBottom(0.3)} className=" px-10 text-center">
          <p className="text-b2">Engagements are selective by design.</p>
          <p className="text-b3 text-gray-200">Work begins only where leadership recognises that structure, oversight, and measurable control determine long-term outcomes.</p>
        </Reveal>
      </section>
    </>
  )
}