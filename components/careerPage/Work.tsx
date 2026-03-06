import Image from "next/image";

export default function Work() {
  return (
    <section className="overflow-hidden">
      {/* Top Border */}
      <div className="border-t border-color">

        {/* Text Section */}
        <div className="grid grid-cols-[60px_1fr_60px] md:grid-cols-[100px_1fr_100px]">
          <div className="sm:border-r border-color" />

          <div className="sm:border-r border-color sm:px-6 py-16 md:px-12 md:py-16">
            <div className="hidden lg:flex flex-col md:flex-row md:justify-between md:items-start gap-8">

              {/* Left Side: Headline */}
              <div className="max-w-sm xl:max-w-3xl pt-20">
                <h2 className="text-[36px] lg:text-[48px] leading-[1.1] tracking-tight">
                  Work within a governance-led
                </h2>

                {/* Icon and Operating Environment - Gap fixed */}
                <div className="flex items-center justify-start gap-3 pl-30 mt-1 group">
                  <div className="border border-white/20 rounded-full p-2 md:p-3 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-[#6E6E6E] text-[36px] lg:text-[48px] font-medium leading-[1.1] tracking-tight group-hover:text-white transition-colors">
                    operating environment
                  </span>
                </div>
              </div>

              {/* Right Side: Paragraph */}
              <div className="md:w-[280px] pt-30">
                <p className="text-[12px] md:text-[11px]  tracking-widest leading-relaxed text-white/40 uppercase">
                  Ascella roles operate inside defined accountability,
                  structured execution, and central oversight frameworks.
                </p>
              </div>
            </div>

            <div className="flex lg:hidden flex-col md:w-2/3 gap-5">
              <h4>Work within a governance-led operating environment</h4>
              <div className="flex gap-2 items-center">
                <div className="w-24">
                  <svg viewBox="0 0 61 61" fill="true" xmlns="http://www.w3.org/2000/svg">
                  <rect x="60.4576" y="30.4056" width="42.5" height="42.5" rx="21.25" transform="rotate(135 60.4576 30.4056)" stroke="white" stroke-opacity="0.5" stroke-width="0.5" />
                  <path d="M30.9059 21.4056L31.1129 40.3051M31.1129 40.3051L41.9059 30.9056M31.1129 40.3051L19.9059 30.9056" stroke="white" stroke-width="0.5" />
                </svg>
                </div>
              <p className="text-b3 pr-10">Ascella roles operate inside defined accountability, structured execution, and central oversight frameworks.</p>
              </div>
            </div>
          </div>
          <div />
        </div>

        {/* Horizontal Line - No Margin */}
        <div className="border-t border-color" />

        {/* Image Section - Rotation Removed & Height Reduced */}
        <div className="grid grid-cols-[60px_1fr_60px] md:grid-cols-[100px_1fr_100px]">
          <div className="border-r border-color" />

          {/* Height adjusted to h-[350px] for a cleaner look */}
          <div className="border-r border-color h-[250px] md:h-[440px] relative bg-[#0A0A0A] overflow-hidden">
            <Image
              src="/work.svg"
              alt="Work visual"
              fill
              className="object-cover object-center" // 'object-cover' ensures it fills the div without distortion
              priority
            />
          </div>

          <div />
        </div>

        {/* Bottom Border */}
        <div className="border-t border-color" />
      </div>
    </section>
  );
}