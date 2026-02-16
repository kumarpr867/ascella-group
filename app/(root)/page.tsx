import Hero from "@/components/landingPage/Hero";
import ExecutionProblemSection from "@/components/landingPage/ExecutionReality";
import Programme from "@/components/landingPage/Programme";
import Ownership from "@/components/landingPage/Ownership";
import Arms from "@/components/landingPage/Arms";
import HowWeOperate from "@/components/landingPage/HowWeOperate";
import Faq from "@/components/Faq";
import Engagement from "@/components/landingPage/Engagement";
import WhoWeWorkWith from "@/components/whoWeWorkWith/WhoWeWorkWith";


export default function Home() {
  return (
    <div>
      <Hero />
      <ExecutionProblemSection />
      <Programme />
      <Ownership />
      <Arms /> 
      <HowWeOperate />
      <WhoWeWorkWith />
      <Faq />
      <Engagement />
    </div>
  );
}
