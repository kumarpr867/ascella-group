"use client"

import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"

const ParticleSphere = dynamic(() => import("./ParticleSphere"), {
    ssr: false
})

export default function Engagement() {
    return (
        <section className="flex flex-col">
            <div className="border-y border-color">
                <div className="mx-auto max-w-7xl py-15 border-x border-color"></div>
            </div>
            <div className="mx-auto w-full max-w-7xl flex flex-col py-10 px-4 sm:px-6 md:px-15 border-x border-color">
                <div className="flex justify-center md:justify-between mb-10 md:mb-15">
                    <h1 className="uppercase text-xl sm:text-2xl text-gray-200 text-thin text-center md:text-left">
                        <span className="text-white">Initiate an</span> alignment-led <br /> engagement process.
                    </h1>
                    <div className="hidden md:flex flex-col font-light">
                        <Link href={"/"}>hello@ascella.group</Link>
                        <p>+91 16045 10860</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-20">
                    <div className="w-full md:w-1/2 flex flex-col gap-10 md:gap-20 items-center md:items-start md:justify-between">
                        <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[350px] lg:h-[350px]">
                            <ParticleSphere />
                        </div>


                        <div className="grid grid-cols-2 justify-between px-5 gap-5 md:gap-32">
                            <div className="flex flex-col gap-5">
                                <h3 className="text-[14px] text-left leading-tight min-h-10">Not sure where <br /> to begin?</h3>
                                <p className="font-thin leading-tight min-h-20">Initial engagement focuses on alignment, not sales discussions.</p>

                                <Link href={"/"}
                                    className="block md:hidden"
                                >hello@ascella.group</Link>
                            </div>
                            <div className="flex flex-col gap-5">
                                <h3 className="text-[14px] text-left leading-tight min-h-10">Begin alignment Execution follows.</h3>
                                <p className="font-thin leading-tight min-h-20">The first step focuses on clarity and fit.</p>

                                <p className="block md:hidden">+91 16045 10860</p>
                            </div>
                        </div>
                    </div>

                    <form className="w-full md:max-w-md space-y-4 sm:space-y-5">

                        <div>
                            <label className="block text-sm text-white font-light mb-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white font-light mb-1">Organisation</label>
                            <input
                                type="text"
                                className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white font-light mb-1">Role / Position</label>
                            <input
                                type="text"
                                className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white font-light mb-1">Email Address</label>
                            <input
                                type="email"
                                className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white font-light mb-1">Organisation Type</label>
                            <select
                                defaultValue=""
                                className="w-full bg-gray-500 px-4 py-3 focus:outline-none focus:border-white transition"
                            >
                                <option value="" disabled></option>
                                <option>Something</option>
                                <option>Something</option>
                                <option>Something</option>
                                <option>Something</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-white font-light mb-1">
                                Describe your current operating or execution challenge
                            </label>
                            <textarea
                                rows={4}
                                className="w-full bg-gray-500 px-4 py-3 resize-none focus:outline-none focus:border-white transition"
                            />
                        </div>

                        <button
                            type="submit"
                            className="border border-white px-6 py-2 text-sm hover:bg-white hover:text-black transition"
                        >
                            Consult Now
                        </button>

                    </form>
                </div>
            </div>
            <div className="border-t border-color">
                <div className="mx-auto max-w-7xl py-15 border-x border-color"></div>
            </div>
        </section>
    )
}