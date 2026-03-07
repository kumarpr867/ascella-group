import Hero from "@/components/landingPage/Hero";
import ExecutionProblemSection from "@/components/landingPage/ExecutionReality";
import Ownership from "@/components/landingPage/Ownership";
import Arms from "@/components/landingPage/Arms";
import HowWeOperate from "@/components/landingPage/HowWeOperate";
import Faq from "@/components/Faq";
import Engagement from "@/components/landingPage/Engagement";
import Prog from "@/components/landingPage/Prog";
import WhoWeWorkWith from "@/components/landingPage/whoWeWorkWith";
import { landingPageFaqs } from "@/data/faqs/LandingPageFaqs";


export default function Home() {
  return (
    <div>
      <Hero />
      <ExecutionProblemSection />
      <Prog />
      <Ownership />
      <Arms /> 
      <HowWeOperate />
      <WhoWeWorkWith/>
      <Faq faqs={landingPageFaqs} description="Common questions about how Ascella works, what it owns, and how engagements run. Written to help assess fit and set expectations early." />
      <Engagement />
    </div>
  );
}
