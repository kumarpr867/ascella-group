import Image from "next/image";

export default function Work() {
  return (
    <section className="bg-black text-white font-sans overflow-hidden">
      {/* Top Border */}
      <div className="border-t border-white/10">
        
        {/* Text Section */}
        <div className="grid grid-cols-[60px_1fr_60px] md:grid-cols-[100px_1fr_100px]">
          <div className="border-r border-white/10" />

          <div className="border-r border-white/10 px-6 py-16 md:px-12 md:py-16">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
              
              {/* Left Side: Headline */}
              <div className="max-w-3xl pt-20">
                <h2 className="text-[32px] md:text-[48px] leading-[1.1] tracking-tight">
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
                  <span className="text-[#6E6E6E] text-[32px] md:text-[48px] font-medium leading-[1.1] tracking-tight group-hover:text-white transition-colors">
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
          </div>
          <div />
        </div>

        {/* Horizontal Line - No Margin */}
        <div className="border-t border-white/10" />

        {/* Image Section - Rotation Removed & Height Reduced */}
        <div className="grid grid-cols-[60px_1fr_60px] md:grid-cols-[100px_1fr_100px]">
          <div className="border-r border-white/10" />
          
          {/* Height adjusted to h-[350px] for a cleaner look */}
          <div className="border-r border-white/10 h-[250px] md:h-[440px] relative bg-[#0A0A0A] overflow-hidden">
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
        <div className="border-t border-white/10" />
      </div>
    </section>
  );
}