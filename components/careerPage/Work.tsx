import Image from "next/image";

export default function Work() {
  return (
    <section className="bg-black text-white font-sans">
      <div className="border-t border-b border-[#1e1e1e]">
        
        {/* ===== ROW 1 ===== */}
        <div className="grid grid-cols-[5%_90%_5%] relative">
          {/* Left spacer */}
          <div className="border-r border-[#1e1e1e]" />

          {/* Main Content Area */}
          <div className="border-r border-[#1e1e1e] px-10 py-20">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8">
              
              {/* Left Side: Headings */}
              <div className="max-w-2xl">
                <h1 className="text-2xl md:text-5xl font-medium leading-tight">
                  Work within a governance-led
                </h1>

            <div className="flex items-center justify-start gap-20 mt-2 group cursor-default">
  
  {/* Hover Icon Container */}
  <div className="border border-gray-400 rounded-full p-3 transition-all duration-300 group-hover:border-white group-hover:bg-white/10 shrink-0">
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      className="text-gray-400 transition-colors duration-300 group-hover:text-white"
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  </div>
  
  {/* Text with large spacing from icon */}
  <span className="text-gray-400 text-4xl md:text-5xl font-medium leading-tight transition-colors duration-300 group-hover:text-white">
    operating environment
  </span>
</div>
              </div>

              {/* Right Side: Description */}
              <div className="md:text-right">
                <p className="max-w-[280px] text-[10px] uppercase tracking-wider leading-relaxed text-white/60 ml-auto">
                  Ascella roles operate inside defined accountability,
                  structured execution, and central oversight frameworks.
                </p>
              </div>
            </div>
          </div>

          {/* Right spacer */}
          <div />
        </div>

        {/* Horizontal divider */}
        <div className="border-t border-[#1e1e1e]" />

        {/* ===== ROW 2 ===== */}
        <div className="grid grid-cols-[5%_90%_5%]">
          <div className="border-r border-[#1e1e1e]" />
          <div className="border-r border-[#1e1e1e] h-[450px] relative overflow-hidden">
            <Image
              src="/work.png"
              alt="Work visual"
              fill
              className="object-cover rotate-180 scale-110"
              priority
            />
          </div>
          <div />
        </div>

      </div>
    </section>
  );
}