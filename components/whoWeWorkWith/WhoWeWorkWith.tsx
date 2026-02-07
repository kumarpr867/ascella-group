import Image from "next/image"
import PlusHeading from "../headings/PlusHeading"

export default function WhoWeWorkWith() {
  return (
    <section className="border-y border-color">
      <div className="mx-4 lg:mx-25">
        <div className="grid grid-cols-1 lg:grid-cols-2 border-x border-color">

          {/* LEFT PANEL */}
          <div
            className="
              grid
              grid-cols-1 lg:grid-cols-2
              grid-rows-auto
              lg:grid-rows-[minmax(220px,auto)_1fr_minmax(140px,auto)]
              lg:border-r border-color
            "
          >

            {/* Title */}
            <div className="border-b border-color px-6 py-12 lg:px-8 lg:py-28">
              <h1 className="text-4xl lg:text-5xl leading-tight">
                Who We<br /> <span className="text-gray-200">Work With</span>
              </h1>
              <p className="mt-6 text-sm font-light max-w-xs">
                We work with organisations that require structured execution,
                governance, & accountability at scale.
              </p>
            </div>

            {/* Empty cell (desktop only) */}
            <div className="hidden lg:block border-l border-b border-color" />

            {/* Engagement note */}
            <div className="border-b border-color px-6 py-8 lg:px-8 flex items-center gap-6">
              <svg
                width="43"
                height="43"
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.25"
                  y="0.25"
                  width="42.5"
                  height="42.5"
                  rx="21.25"
                  stroke="white"
                  strokeOpacity="0.5"
                  strokeWidth="0.5"
                />
                <path
                  d="M15.5 28L28 14M28 14H14M28 14V29"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </svg>

              <p className="text-sm">
                Engagements are selective by design.
              </p>
            </div>

            {/* Paragraph */}
            <div className="border-b lg:border-l border-color px-6 py-8 lg:p-10 flex items-center">
              <p className="text-sm text-gray-100 max-w-md">
                We partner with organisations where operational control,
                risk management, and execution quality are business-critical.
              </p>
            </div>

            {/* Scroll down */}
            <div className="px-6 py-10 lg:p-10 flex items-end">
              <PlusHeading text="Scroll Down" size="md" />
            </div>

            {/* Rock */}
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

          {/* RIGHT PANEL */}
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
