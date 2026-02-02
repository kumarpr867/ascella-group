import Hero from "@/components/landingPage/Hero";
import ExecutionProblemSection from "@/components/landingPage/ExecutionProblem";
import Programme from "@/components/landingPage/Programme";
import Ownership from "@/components/landingPage/Ownership";
import Arms from "@/components/landingPage/Arms";
import HowWeOperate from "@/components/landingPage/HowWeOperate";
import Engagement from "@/components/landingPage/Engagement";
import Faq from "@/components/Faq";


export default function Home() {
  return (
    <div>
      <Hero />
      <ExecutionProblemSection />
      <Programme />
      <Ownership />
      {/* <Arms /> */}
      <HowWeOperate />
      <Faq />
      <Engagement />
    </div>
  );
}
