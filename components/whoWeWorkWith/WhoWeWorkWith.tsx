"use client"

import Image from "next/image"
import EnterpriseStartupSystem from "./EnterpriseStartupSystem"
import PlusText from "../headings/PlusText"


export default function WhoWeWorkWith() {
  return (
    <>
    <section className="hidden md:block border-y border-color">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 border-x border-color">
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-auto lg:grid-rows-[minmax(220px,auto)_1fr_minmax(200px,auto)] md:border-r border-color">


            <div className="border-b border-color px-6 py-6 lg:px-8 lg:py-10">
              <h2 className="leading">
                Who We <span className="text-gray-200">Work With</span>
              </h2>
              <p className="mt-6 text-b2 font-light max-w-xs">
                Ascella partners with organisations where execution quality, governance discipline, and accountable ownership are business-critical rather than optional.
              </p>
            </div>


            <div className="hidden lg:block border-l border-b border-color" />


            <div className="border-b border-color px-6 py-8 lg:px-8 flex items-center gap-6">
              <div className="flex flex-center border border-color p-3 rounded-4xl hover:scale-110 transition">
                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 14.25L14 0.25M14 0.25H0M14 0.25V15.25" stroke="white" strokeWidth="1" />
                </svg>
              </div>
              <p className="text-[14px]">Engagements are selective by design.</p>
            </div>

            <div className="border-b lg:border-l border-color px-6 py-8 lg:p-10 flex items-center">
              <p className="text-b2 text-gray-100 max-w-md">
                Work begins only where leadership recognises that structure, oversight, and measurable control determine long-term outcomes.
              </p>
            </div>

            <div className="px-6 py-10 lg:p-10 flex items-end">
              <PlusText text="Scroll Down"/>
            </div>

            <div className="relative lg:border-l border-color">
              <Image
                src="/whoWeWorkWith/map.svg"
                alt="Map"
                fill  
                className="object-cover object-center"
              />
            </div>
          </div>


          <div className="flex items-center justify-center p-10 h-full w-full">
            <EnterpriseStartupSystem />
          </div>

        </div>
      </div>
    </section>


    <section className="my-10 flex flex-col md:hidden">
      
            <div className="px-5 ">
              <h3>
                Who We <span className="text-gray-200"> Work With</span>
              </h3>
              <p className="mt-6 text-b2 font-light md:pr-20">
                Ascella partners with organisations where execution quality, governance discipline, and accountable ownership are business-critical rather than optional.
              </p>
            </div>
            
          <div className="flex items-center justify-center p-5">
            <EnterpriseStartupSystem />
          </div>
          <p className="text-b3 px-5">We partners with organisations where operational control, risk management, and execution quality are business-critical. </p>
            <div className="border border-color p-3 m-5 flex items-center justify-center gap-4 bg-gray-500">
              <div className="flex flex-center border border-white4 p-3 rounded-4xl hover:scale-110 transition">
                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 14.25L14 0.25M14 0.25H0M14 0.25V15.25" stroke="white" strokeWidth="1" />
                </svg>
              </div>
              <p className="text-[14px]">Engagements are selective by design.</p>
            </div>
    </section>
    </>
  )
}