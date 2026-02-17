import Link from "next/link"
import Image from "next/image"

export default function Engagement (){
    return (
        <section className="flex flex-col">
            <div className=" border-y border-color ">
                <div className="mx-25 py-15 border-x border-color"></div>
            </div>
            <div className="flex flex-col mx:15 lg:mx-25 p-15 border-x border-color">
                <div className="flex justify-between mb-15">
                    <h1 className="uppercase text-2xl text-gray-200 text-thin"><span className="text-white">Initiate an</span> alignment-led <br/> engagement process.</h1>
                    <div className="flex flex-col font-light">
                        <Link href={"/"}>hello@ascellagroup.com</Link>
                        <p>+91 999 999 9990</p>
                    </div>
                </div>
                <div className="flex justify-between gap-20">
                    <div className="w-1/2 flex flex-col justify-between">
                        <Image src="/engagement.png" alt="How We Operate" width={200} height={100} />
                        <div className="flex justify-between px-10 gap-15">
                            <div className="flex flex-col text-left gap-5">
                                <h3 className="text-lg">Not sure where <br /> to begin?</h3>
                                <p className="font-thin">Initial engagement focuses on alignment, not sales discussions.</p>
                            </div>
                            <div className="flex flex-col text-left gap-5">
                                <h3 className="text-lg">Begin alignment Execution follows.</h3>
                                <p className="font-thin">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. </p>
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
                <div className="mx-25 py-15 border-x border-color"></div>
            </div>
        </section>
    )
}
