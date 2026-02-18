import Hero from "@/components/landingPage/Hero";
import ExecutionProblemSection from "@/components/landingPage/ExecutionReality";
import Ownership from "@/components/landingPage/Ownership";
import Arms from "@/components/landingPage/Arms";
import HowWeOperate from "@/components/landingPage/HowWeOperate";
import Faq from "@/components/Faq";
import Engagement from "@/components/landingPage/Engagement";
import Prog from "@/components/landingPage/Prog";
import WhoWeWorkWith from "@/components/landingPage/WhoWeWorkWith";


export default function Home() {
  return (
    <div>
      <Hero />
      <ExecutionProblemSection />
      <Prog />
      <Ownership />
      <Arms /> 
      <HowWeOperate />
      <WhoWeWorkWith />
      <Faq />
      <Engagement />
    </div>
  );
}
