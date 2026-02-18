import PartialOutlineBtn from "../btns/PartialOutlineBtn";

export default function StructuredDesigned() {
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
    <div className="flex flex-col items-center text-center gap-6 mb-24">
      <h3 className="font-light">
        WORKING AT ASCELLA IS STRUCTURED BY DESIGN.
      </h3>
      <p className="text-b2 max-w-1/2">
       Ascella offers an operating environment for professionals who value clarity, discipline, and accountability in execution.
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
      <div className="absolute uppercase text-[36px] text-gray-200 left-0 top-1/2 w-full border-b border-color -translate-y-25">
        Single point of contact 
      </div>
      <div className="absolute uppercase text-[36px] h-12 left-0 top-1/2 w-full -translate-y-12 border-b border-color flex justify-between items-baseline">
        <div>
          for career-related 
        </div>
        <div className="text-[24px]">Email- A@ascella.group</div>
      </div>
      <div className="absolute  text-[24px] left-0 top-1/2 w-full text-gray-200 border-b border-color flex justify-between">
        <div className="text-[36px]"> communication</div>
        <div>All career coordination is managed centrally.</div>
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
    <div className="max-w-md flex flex-center flex-col gap-2">
      <p className="text-b1 text-gray-200 text-center">
        Career-related enquiries are coordinated centrally to ensure consistency, confidentiality, and structured handling of all applications and role-related communication.
      </p>
      <div>
        <PartialOutlineBtn text="Be a part of ascella" />
      </div>
    </div>
  );
}
