"use client";
import { useRouter } from "next/navigation";
import PartialOutlineBtn from "../btns/PartialOutlineBtn";

export default function EngagementBegins() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center mx-auto max-w-7xl px-10 xl:px-0 my-30">
      <HeaderSection />
      <ArchitectureDiagram />
      <ExploreNowBtn />
    </section>
  );
}

function HeaderSection() {
  return (
    <div className="flex flex-col items-center text-center gap-6 mb-12 md:mb-24">
      <h3 className="text-[20px] sm:text-[24px] md:text-[36px] font-light leading-normal">
        Engagement begins with <br />
        structural clarity, not transactional discussions.
      </h3>
      <p className="text-[12px] sm:text-[16px] md:max-w-1/2">
        Every partnership starts by defining operating context, ownership boundaries, and execution governance before any delivery commitments are made.
      </p>
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="relative w-full h-[500px] lg:h-[700px] mx-auto overflow-hidden mt-10">
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
      <div className="hidden lg:block">
        <div className="absolute uppercase lg:text-[16px] xl:text-[24px] text-gray-200 left-0 top-1/2 w-full border-b border-color -translate-y-12   xl:-translate-y-20" >
          OPERATING DESIGN FIRST.
        </div>
        <div className="absolute uppercase lg:text-[16px] xl:text-[24px] left-0 top-1/2 w-full -translate-y-6 xl:-translate-y-10 border-b border-color flex justify-between items-baseline">
          <div>
            CONTROLLED DELIVERY FOLLOWS.
          </div>
          <div className="lg:text-[16px] xl:text-[24px] ">READY TO ESTABLISH </div>
        </div>
        <div className="absolute uppercase lg:text-[16px] xl:text-[24px] left-0 top-1/2 w-full text-gray-200 border-b border-color flex justify-between " >
          <div className=""></div>
          <div className="">STRUCTURE AND ACCOUNTABILITY AT SCALE?</div>
        </div>
      </div>

      <div className="lg:hidden block">
        <div className="flex flex-col items-center absolute uppercase lg:text-[16px] xl:text-[24px] left-0 top-0 w-full">
          <div className=" text-gray-200" >
            OPERATING DESIGN FIRST.
          </div>

          <div>
            CONTROLLED DELIVERY FOLLOWS.
          </div>
        </div>

        <div className="absolute uppercase text-[14px] sm:text-[16px] text-gray-200 left-0 top-1/2 w-full h-10 border-b border-color -translate-y-20" >
          <div className="flex items-end w-full justify-center h-full z-1">
            READY TO ESTABLISH
          </div>
        </div>
        <div className="absolute uppercase text-[14px] sm:text-[16px] left-0 top-1/2 w-full -translate-y-6 border-b border-color flex ">
          <div className="hidden sm:flex items-center w-full justify-center z-2">
            STRUCTURE AND ACCOUNTABILITY AT SCALE?
          </div>
          <div className="sm:hidden flex items-center w-full justify-center z-2">
            STRUCTURE AND ACCOUNTABILITY
          </div>
        </div>
        <div className="absolute left-0 top-1/2 w-full h-8 sm:h-10 border-b border-color" >
          <div className="sm:hidden uppercase flex items-center w-full justify-center z-2 text-[14px] sm:text-[16px]">
            AT SCALE?
          </div>
        </div>
      </div>

    </>
  );
}

function DiagonalLines() {
  return (
    <div className="absolute left-1/2 top-1/2 w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/2 w-full h-px bg-gray-400 rotate-45 origin-center" />
        <div className="absolute left-0 top-1/2 w-full h-px bg-gray-400 -rotate-45 origin-center" />
      </div>
    </div>
  );
}

function ExploreNowBtn() {
  const router = useRouter();
  return (
    <div className="max-w-md flex flex-center flex-col gap-4">
      <p className="text-[12px] text-gray-200 text-center">
        Initiate an alignment-led engagement designed to embed governance, clarify authority, and stabilise execution before complexity increases.
      </p>
      <div>
        <PartialOutlineBtn text="Begin Alignment"
          onClick={() => {
            router.push(`/engageWithUs`);
          }} />
      </div>
    </div>
  );
}