import PartialOutlineBtn from "../btns/PartialOutlineBtn";

export default function EngagementBegins() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-25 my-30">
      <HeaderSection />
      <ArchitectureDiagram />
      <ExploreNowBtn />
    </section>
  );
}

function HeaderSection() {
  return (
    <div className="flex flex-col items-center text-center gap-4 mb-24">
      <h3 className="font-light">
        Engagement begins with <br />
        alignment, not sales conversations.
      </h3>
      <p className="text-b2 text-gray-300">
        Ascella engagements start by understanding operating <br />
        context, accountability needs, and execution structure.
      </p>
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="relative w-full h-[700px] mx-auto overflow-hidden">
      <div className="absolute inset-0">
        <VerticalLine />
        <HorizontalText />
        <DiagonalLines />
        
      </div>
    </div>
  );
}

function VerticalLine() {
  return (
    <div className="absolute left-1/2 top-0 h-full w-px bg-gray-400 -translate-x-1/2" />
    
  );
}

function HorizontalText() {
  return (
    <>
      <div className="absolute uppercase text-[36px] text-gray-200 left-0 top-1/2 w-full border-b border-color -translate-y-25" >
        Structure first.
      </div>
      <div className="absolute uppercase text-[36px] h-12 left-0 top-1/2 w-full -translate-y-12 border-b border-color flex justify-between items-baseline">
        <div>
          Execution follows.
        </div>
        <div className="text-[24px] ">Ready to align operating</div>
      </div>
      <div className="absolute uppercase text-[24px] left-0 top-1/2 w-full text-gray-200 border-b border-color flex justify-between " >
        <div className=""></div>
        <div className="">structure and execution control? </div>
      </div>
    </>
  );
}

function DiagonalLines() {
  return (
    <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/2 w-full h-px bg-gray-400 rotate-45 origin-center" />
        <div className="absolute left-0 top-1/2 w-full h-px bg-gray-400 -rotate-45 origin-center" />
      </div>
    </div>
  );
}

function ExploreNowBtn() {
  return (
    <div className="max-w-md">
       <p className="text-b1 text-gray-200  w-md text-center absolute left-[570] bottom-10 ">
        Engage Ascella Group to initiate an alignment-led engagement
        process designed for long-term operational stability.
      </p>
      <PartialOutlineBtn text="Engage With Us" />
    </div>
  );
}