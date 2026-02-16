'use client';
import React from 'react';

const ProgramEmbedded = () => {
  const boxClass = "w-[442px] h-[450px] border-r border-b border-[#3D3D3D] p-10 flex flex-col justify-end relative bg-black";

  const shapes = [
    { t: 0, l: 0, o: 0.6 },
    { t: -37, l: -64, o: 0.2 },
    { t: -37, l: 64, o: 0.2 },
    { t: 37, l: -64, o: 0.2 },
    { t: 37, l: 64, o: 0.2 },
    { t: -74, l: 0, o: 0.1 },
    { t: 74, l: 0, o: 0.1 },
    { t: 0, l: -128, o: 0.1 },
    { t: 0, l: 128, o: 0.1 },
    { t: -74, l: -128, o: 0.05 },
    { t: -74, l: 128, o: 0.05 },
    { t: 74, l: -128, o: 0.05 },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center">
      
      {/* Top horizontal line - Edge to Edge */}
      <div className="w-full border-t border-[#3D3D3D]" />
      
      {/* Main Container */}
      <div className="w-[1325px] border-l border-[#3D3D3D] relative z-10">
        
        {/* --- TOP ROW (Hero Section) --- */}
        <div className="relative w-full h-[450px] border-b border-r border-[#3D3D3D] flex flex-col justify-end p-12 overflow-hidden">
          
          {/* --- ISOMETRIC BACKGROUND --- */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-x-[-10%] translate-y-[-10%]">
            <div className="relative">
              {shapes.map((s, i) => (
                <div 
                  key={i} 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ 
                    top: `${s.t}px`, 
                    left: `${s.l}px`, 
                    opacity: s.o 
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="128" height="75" viewBox="0 0 128 75" fill="none">
                    <path d="M0.993164 37.498L16.251 46.3672L16.2549 46.3691L63.5049 74.4209L110.751 47.3418L127.011 37.5137C116.274 31.4326 100.696 22.4984 87.6855 14.9199C81.0287 11.0425 75.0422 7.51858 70.7188 4.91406C68.5576 3.61216 66.8087 2.53765 65.5986 1.7627C64.9947 1.37594 64.5187 1.06045 64.1914 0.826172C64.0906 0.754039 64.0016 0.684992 63.9238 0.624023L0.993164 37.498Z" stroke="white" strokeOpacity="0.8"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-0 right-0 w-[300px] h-[200px] border-l border-b border-[#3D3D3D] z-10">
            <img 
              src="/Rectangle 9440.png" 
              alt="Grid Visual" 
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          <div className="max-w-2xl mb-4 relative z-20">
            <h2 className="text-[38px] font-light leading-[1.1] tracking-tight">
              The Startups Programme embeds
              <span className="block text-white/40">
                operating structure, governance, and accountability before scale begins.
              </span>
            </h2>
          </div>
        </div>

        {/* --- BOTTOM ROW (3 BOXES) --- */}
        <div className="flex w-full">
          
          {/* Box 1 */}
          <div className={boxClass}>
            <div className="absolute top-10 left-10">
              <img src="/group 1665 (2).svg" alt="icon" className="w-6 h-6" />
            </div>
            
            <div className="space-y-6">
              <h5 className="text-[20px] font-light leading-tight">
                Why operating structure is introduced early
              </h5>
              <div className="text-[13px] text-white/40 space-y-4 leading-relaxed max-w-[320px]">
                <p>Most early-stage companies prioritise product, growth, and funding.</p>
                <p>Operating structure — governance, accountability, and execution control — is often deferred until complexity forces reactive changes.</p>
                <p>Introducing structure early prevents execution debt.</p>
              </div>
            </div>
          </div>

          {/* Box 2 (Image Box) */}
          <div className={boxClass}>
            <img 
              src="/Rectangle 9444.png" 
              className="absolute inset-0 w-full h-full object-cover opacity-80" 
              alt="Execution structure"
            />
            <div className="relative z-10">
              <p className="text-[16px] font-light border-l border-white/40 pl-4">
                Early structure prevents <br /> later execution debt.
              </p>
            </div>
          </div>

          {/* Box 3 */}
          <div className={boxClass}>
            <div className="absolute top-10 left-10">
              <img src="/group 1670.svg" alt="icon" className="w-6 h-6" />
            </div>

            <div className="space-y-6">
              <h3 className="text-[22px] font-light leading-tight">
                How the programme supports controlled scale
              </h3>
              <div className="text-[13px] text-white/40 space-y-4 leading-relaxed max-w-[320px]">
                <p>The Startups Programme introduces governance models and execution discipline from the beginning.</p>
                <p>This ensures teams and systems remain aligned as the organisation grows.</p>
                <p>Scale becomes deliberate, not improvised.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom horizontal line - Edge to Edge */}
      <div className="w-full border-t border-[#3D3D3D]" />
      
    </section>
  );
};

export default ProgramEmbedded;