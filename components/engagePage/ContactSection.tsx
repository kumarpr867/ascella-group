import React from "react";

type ContactSectionProps = {
  title: string;
  subtitle: string;
  email?: { value: string };
  contact?: { values: string[] };
  location?: { address: string; postalCode: string };
  workHours?: { hours: string };
};

const Isometric3DBox = ({ className, opacity = 1, style }: { className?: string; opacity?: number; style?: React.CSSProperties }) => (
  <svg 
    className={`${className} transform rotate-180`} 
    width="128" height="75" viewBox="0 0 128 75" 
    fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ opacity, ...style }}
  >
    <path d="M1 37.5V45L63.5 82L63.5 74.5L1 37.5Z" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.05" />
    <path d="M127 37.5V45L63.5 82L63.5 74.5L127 37.5Z" fill="white" fillOpacity="0.12" stroke="white" strokeOpacity="0.05" />
    <path d="M0.993164 37.498L16.251 46.3672L63.5049 74.4209L110.751 47.3418L127.011 37.5137C116.274 31.4326 100.696 22.4984 87.6855 14.9199C70.7188 4.91406 63.9238 0.624023 63.9238 0.624023L0.993164 37.498Z" stroke="white" strokeOpacity="0.12" />
  </svg>
);

const ContactSection: React.FC<ContactSectionProps> = ({
  title, subtitle, email, contact, location, workHours,
}) => {
  return (
    <div className="w-full bg-black text-white font-sans border-x border-zinc-900 overflow-hidden">
      
      {/* ROW 1: Header Section */}
      <div className="relative h-[500px] border-y border-zinc-900 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.04]" 
          style={{ backgroundImage: `linear-gradient(30deg, #555 1px, transparent 1px), linear-gradient(-30deg, #555 1px, transparent 1px)`, backgroundSize: '64px 110px' }} 
        />
        <div className="relative z-10 pl-16 pointer-events-none">
          <h2 className="text-[52px] font-light mb-4 tracking-tighter leading-tight max-w-2xl">{title}</h2>
          <p className="text-zinc-600 text-lg font-light max-w-sm">{subtitle}</p>
        </div>

        {/* Isometric Overlays (Top Layer) - 12 Boxes Attached */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute top-[10%] left-[2%]">
            <Isometric3DBox className="absolute top-0 left-0 scale-125" opacity={0.5} />
            <Isometric3DBox className="absolute top-[37px] left-[63px]" opacity={0.4} />
            <Isometric3DBox className="absolute top-[74px] left-[126px]" opacity={0.3} />
            {[...Array(9)].map((_, i) => (
              <Isometric3DBox 
                key={i}
                className="absolute" 
                style={{ top: `${(i+3)*37}px`, left: `${(i+3)*63}px` }} 
                opacity={0.03} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: Uniform 256x271 Grid Boxes */}
      <div className="flex flex-wrap md:flex-nowrap justify-center bg-black border-b border-zinc-900">
        
        {/* LEFT COLUMN (256x271) */}
        <div className="border-r border-zinc-900/50 flex flex-col overflow-hidden" style={{ width: '256px', height: '271px' }}>
          <div className="flex-1 p-6 flex flex-col justify-center border-b border-zinc-900/30">
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-2 block">Email</span>
            <div className="text-[13px] font-light truncate">{email?.value ? email.value.split("\n")[0] : ''}</div>
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-2 block">Contact</span>
            <div className="text-[13px] font-light space-y-0.5">{(contact?.values ?? []).slice(0, 2).map((v, i) => <p key={i}>{v}</p>)}</div>
          </div>
        </div>

        {/* CENTER COLUMN (256x271) */}
        <div className="flex items-center justify-center border-r border-zinc-900/50 bg-[#030303]" style={{ width: '256px', height: '271px' }}>
          <div 
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid #3D3D3D',
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.54) 0%, rgba(0, 0, 0, 0.54) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.04) 100%), url('/Rectangle 9476.svg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>

        {/* RIGHT COLUMN (256x271) */}
        <div className="flex flex-col overflow-hidden" style={{ width: '256px', height: '271px' }}>
          <div className="flex-1 p-6 flex flex-col justify-center border-b border-zinc-900/30">
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-2 block">Location</span>
            <p className="text-[12px] font-light leading-snug">{location?.address ? `${location.address.substring(0, 50)}...` : ''}</p>
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-2 block">Work Hours</span>
            <p className="text-[13px] font-light">{workHours?.hours}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactSection;