import Image from "next/image";
import PartialOutlineBtn from "../btns/PartialOutlineBtn";

export default function GeneralApplication() {
  return (
    <section className="p-20 flex flex-col items-center my-15 md:my-25 border border-color">
      <div className="flex lg:w-3xl flex-col gap-10 items-center px-10 text-center mb-16">
        <h3>Alignment is the first step toward structured execution readiness.</h3>
        <p className="text-b2 px-20 text-gray-100">
          The Startups Programme begins with an alignment conversation focused on
          operating context, accountability expectations, and readiness for
          governed execution.
        </p>
      </div>

      <div className="w-full max-w-xl border border-color rounded-lg p-10 flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image src="/jd/circle.png" alt="" width={70} height={70} />

          <h3 className="tracking-tighter text-gray-200">GENERAL APPLICATION</h3>

          <p className="text-b3 text-gray-200 px-20">
            This form is intended for candidates who wish to be considered for roles that are not currently listed.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-gray-500 border border-color rounded px-4 py-4 text-b text-white placeholder:text-gray-300 focus:outline-none focus:border-gray-200 hover:border-white transition hover:scale-105"
          />

          <input
            type="text"
            placeholder="Your Role / Title"
            className="w-full bg-gray-500 border border-color rounded px-4 py-4 text-b text-white placeholder:text-gray-300 focus:outline-none focus:border-gray-200 hover:border-white transition hover:scale-105"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full bg-gray-500 border border-color rounded px-4 py-4 text-b text-white placeholder:text-gray-300 focus:outline-none focus:border-gray-200 hover:border-white transition hover:scale-105"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-gray-500 border border-color rounded px-4 py-4 text-b text-white placeholder:text-gray-300 focus:outline-none focus:border-gray-200 hover:border-white transition hover:scale-105"
          />

          {/* Upload */}
          <label className="relative flex items-center justify-center h-20 w-50 rounded bg-gray-500 border border-color cursor-pointer hover:border-white transition hover:scale-105">
            <span className="text-b2 text-gray-200 ">Upload CV</span>

            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx"
            />
          </label>


          <button
            type="submit"
            className="mt-4 bg-gray-100 text-black py-3 rounded text-[20px] hover:bg-white  hover:scale-105 transition ease-in-out"
          >
            Submit
          </button>
        </form>

        {/* Footer note */}
        <p className="text-b2 text-gray-300 text-center tracking-tighter leading-snug">
          If you prefer not to complete the form, you may submit your profile directly by email. Please include your CV and a short summary of your operating background.
        </p>
        <div className="">
          <PartialOutlineBtn text="Email Us" />
        </div>
      </div>
    </section>
  );
}
