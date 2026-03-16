"use client"

import Image from "next/image"
import EnterpriseStartupSystem from "./EnterpriseStartupSystem"
import PlusText from "../headings/PlusText"
import { useRouter } from "next/navigation";
import Reveal from "@/utils/Reveal";
import { slideInFromLeft, slideInFromRight } from "@/utils/motion";


export default function WhoWeWorkWith() {
  const router = useRouter();
  return (
    <>
      <section className="hidden lg:block border-y border-color">
        <div className="mx-10 lg:mx-20 xl:mx-24">
          <div className="grid grid-cols-1 md:grid-cols-2 border-x border-color">
            <div className="grid grid-cols-1 lg:grid-cols-2 md:border-r border-color">


              <Reveal variants={slideInFromLeft(0.1)} className="border-b border-color flex flex-col lg:items-center justify-center px-6 py-6">
                <h2 className="">
                  Who We <span className="text-gray-200">Work With</span>
                </h2>
                <p className="mt-6 text-b2 font-light max-w-xs">
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
                <p className="text-b2 text-gray-100 max-w-md">
                  Work begins only where leadership recognises that structure, oversight, and measurable control determine long-term outcomes.
                </p>
              </Reveal>

              <Reveal variants={slideInFromLeft(0.5)} className="px-6 py-10 lg:p-10 flex items-end opacity-50">
                <PlusText text="Scroll Down"  />
              </Reveal>

              <Reveal variants={slideInFromLeft(0.6)} className="relative lg:border-l border-color">
                <Image
                  src="/whoWeWorkWith/map.svg"
                  alt="Map"
                  fill
                  className="object-cover object-center"
                />
              </Reveal>
            </div>


            <Reveal variants={slideInFromRight(0.7)} className="flex items-center justify-center p-10 h-full w-full">
              <EnterpriseStartupSystem />
            </Reveal>

          </div>
        </div>
      </section>


      <section className="my-10 flex flex-col lg:hidden">

        <div className="px-10 ">
          <h3>
            Who We  <span className="text-gray-200"> Work With</span>
          </h3>
          <p className="mt-6 text-b2 font-light md:pr-20">
            Ascella partners with organisations where execution quality, governance discipline, and accountable ownership are business-critical rather than optional.
          </p>
        </div>

        <div className="flex items-center justify-center p-5">
          <EnterpriseStartupSystem />
        </div>
        <p className="text-b3 px-10">We partners with organisations where operational control, risk management, and execution quality are business-critical. </p>
        <div className="border border-color p-3 m-10 flex items-center justify-center gap-4 bg-gray-500">
          <button onClick={()=>  router.push("/JD-Page")} className="flex flex-center border border-white4 p-3 rounded-4xl hover:scale-110 transition">
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 14.25L14 0.25M14 0.25H0M14 0.25V15.25" stroke="white" strokeWidth="1" />
            </svg>
          </button>
          <p className="text-[14px]">Engagements are selective by design.</p>
        </div>
      </section>
    </>
  )
}