'use client';

import Image from 'next/image';
import PlusHeading from '../headings/PlusHeading';
import PartialOutlineBtn from '../btns/PartialOutlineBtn';

export default function Ownership() {
  const sections = [
    {
      title: "Security & Risk Posture",
      description: "We assume ownership of organisational risk by designing, governing, and enforcing security controls that reduce exposure and strengthen long-term resilience across systems, people, and processes.",
      tag: "#Resilience",
      image: "/Security.png"
    },
    {
      title: "Technology Execution",
      description: "We oversee the delivery of secure, scalable technology systems—ensuring architecture, engineering, and integrations perform reliably under growth, complexity, and regulatory pressure.",
      tag: "#Scalability",
      image: "/Technology.png"
    },
    {
        title: "Workforce Readiness",
        description:" Workforce readiness prepares teams for real operating conditions. Roles and escalation paths stay clear before pressure hits. Training reflects actual scenarios instead of theory. Teams respond faster and make better decisions during incidents.",
        tag: "#Alignment",
        image:"/Workforce.png"
    },
    {
        title:"Operational Control",
        description:"Operational control brings to daily execution. Decisions follow defined paths instead of informal coordination. Signals focus on risk, progress, and dependencies. Work becomes predictable and less reactive over time.",
        tag:"#Governance",
        image:"/Operational.png"
    },
    {
        title:"Revenue Enablement",
        description:"Revenue enablement connects execution quality to business results. Technical priorities reflect revenue impact and customer trust. Launches follow readiness checks and clear success measures. Growth stays protected as execution becomes disciplined.",
        tag:"#Sustainability",
        image: "/Revenue.png"
    }
  ];

  return (
    <section className="relative bg-black text-white">
      
     
      <div className="relative h-px w-full mt-30">
       
        <div className="mx-8 h-full bg-white/10" />
      </div>

      <div className="mx-auto w-full relative">
       
        <div className="grid grid-cols-[10%_25%_55%_10%] relative">
          
         
          <div className="absolute inset-0 flex pointer-events-none z-0">
            <div className="h-full w-[10%] border-r border-white/10" />
            <div className="h-full w-[25%] border-r border-white/10" />
            <div className="h-full w-[55%] border-r border-white/10" />
          </div>

          
          <div className="z-10 h-full" />

        
          <aside className="relative z-10 p-12">
            <div className="sticky top-24">
              <PlusHeading text="OWNERSHIP" />
              <ul className="mt-20 space-y-6">
                <li className="text-sm uppercase tracking-widest text-white font-medium cursor-pointer">Security & Risk Posture</li>
                <li className="text-sm uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer">Technology Execution</li>
                <li className="text-sm uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer">Workforce Readiness</li>
                <li className="text-sm uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer">Operational Control</li>
                <li className="text-sm uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer">Revenue Enablement</li>
              </ul>
              
              <div className="mt-32">
               
                <PartialOutlineBtn text="Explore More" />
              </div>
            </div>
          </aside>

         
          <main className="relative z-10">
            {sections.map((item, index) => (
              <div key={index} className="relative py-32 px-16 flex flex-col items-start">
                
                
                <div className="w-full flex justify-center mb-24">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={550}
                    height={550}
                    className="opacity-90 object-contain"
                  />
                </div>
                
                
                <div className="w-full max-w-xl">
                  <h3 className="text-4xl font-light mb-8 tracking-tight italic">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-base leading-relaxed mb-8">
                    {item.description}
                  </p>
                  <div className="text-sm font-mono tracking-widest text-white/80">
                    {item.tag}
                  </div>
                </div>

                
                {index !== sections.length - 1 && (
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-white/10" />
                )}
              </div>
            ))}
          </main>

       
          <div className="z-10 h-full" />
        </div>
      </div>

     
      <div className="relative h-px w-full">
        <div className="mx-8 h-full bg-white/10" />
      </div>

    </section>
  );
}