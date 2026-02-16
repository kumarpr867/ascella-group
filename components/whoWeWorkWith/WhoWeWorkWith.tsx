import Image from "next/image"
import PlusHeading from "../headings/PlusHeading"

export default function WhoWeWorkWith() {
  return (
    <section className="border-y border-color">
      <div className="mx-4 lg:mx-25">
        <div className="grid grid-cols-1 lg:grid-cols-2 border-x border-color">
          <div
            className="
              grid
              grid-cols-1 lg:grid-cols-2
              grid-rows-auto
              lg:grid-rows-[minmax(220px,auto)_1fr_minmax(140px,auto)]
              lg:border-r border-color
            "
          >

            
            <div className="border-b border-color px-6 py-12 lg:px-8 lg:py-28">
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


              <p className="text-b2">
                Engagements are selective by design.
              </p>
            </div>

            
            <div className="border-b lg:border-l border-color px-6 py-8 lg:p-10 flex items-center">
              <p className="text-b2 text-gray-100 max-w-md">
                Work begins only where leadership recognises that structure, oversight, and measurable control determine long-term outcomes.

              </p>
            </div>

            
            <div className="px-6 py-10 lg:p-10 flex items-end">
              <PlusHeading text="Scroll Down" size="b1" />
            </div>

            
            <div className="lg:border-l border-color px-6 py-10 lg:p-10 flex items-end justify-end">
              <Image
                src="/whoWeWorkWith/rock.png"
                alt="Rock texture"
                width={180}
                height={180}
                className="opacity-80"
              />
            </div>
          </div>

          
          <div className="flex items-center justify-center p-10 lg:p-20">
            <Image
              src="/whoWeWorkWith/sphere.png"
              alt="Abstract sphere"
              width={520}
              height={520}
              className="max-w-[320px] lg:max-w-full h-auto"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  )
}
