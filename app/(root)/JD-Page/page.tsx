import Faq from "@/components/Faq";
import GeneralApplication from "@/components/JDPage/GeneralApplication";
import Hero from "@/components/JDPage/Hero";
import JobsSection from "@/components/JDPage/JobsSection";

export default function page() {
  return (
    <section>
        <Hero/>
        <JobsSection/>
        <GeneralApplication/>
        <Faq />
    </section>
  )
}
