import Link from "next/link"
import Image from "next/image"

export default function Engagement() {
    return (
        <section className="flex flex-col">
            <div className="border-y border-color ">
                <div className="mx-auto max-w-7xl py-15 border-x border-color"></div>
            </div>
            <div className="mx-auto max-w-7xl flex flex-col py-10 md:p-15 border-x border-color">
                <div className="flex justify-center md:justify-between mb-15">
                    <h1 className="uppercase text-2xl text-gray-200 text-thin"><span className="text-white">Initiate an</span> alignment-led <br /> engagement process.</h1>
                    <div className="hidden md:flex flex-col font-light">
                        <Link href={"/"}>hello@ascella.group</Link>
                        <p>+91 16045 10860</p>
                    </div>
                </div>
                <div className="flex  flex-col md:flex-row items-center justify-center md:justify-between gap-20">
                    <div className="md:w-1/2 flex flex-col gap-20 items-center md:items-start md:justify-between">
                        <div className="relative w-[250px] h-[250px] lg:w-[350px] md:h-[350px]">
                            <Image src={"/engagementCircle.svg"} fill alt={""} />
                        </div>
                        <div className="flex justify-between px-10 gap-20 md:gap-32">
                            <div className="flex flex-col text-left gap-5">
                                <h3 className="text-b2 leading-tight">Not sure where <br /> to begin?</h3>
                                <p className="font-thin leading-tight">Initial engagement focuses on alignment, not sales discussions.</p>

                                <Link href={"/"}
                                className="block md:hidden"
                                >hello@ascella.group</Link>
                            </div>
                            <div className="flex flex-col text-left gap-5">
                                <h3 className="text-b2 leading-tight">Begin alignment Execution follows.</h3>
                                <p className="font-thin leading-tight">The first step focuses on clarity and fit.</p>

                                <p className="block md:hidden">+91 16045 10860</p>
                            </div>
                        </div>
                    </div>
                    <form className="w-full max-w-md space-y-5">

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
                                className="w-full bg-gray-500  px-4 py-3 focus:outline-none focus:border-white transition"
                            >
                                <option value="" disabled>
                                </option>
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
            <div className="border-t border-color ">
                <div className="mx-auto max-w-7xl py-15 border-x border-color"></div>
            </div>
        </section>
    )
}
