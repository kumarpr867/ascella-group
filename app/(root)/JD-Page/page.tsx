import Faq from "@/components/Faq";
import GeneralApplication from "@/components/JDPage/GeneralApplication";
import Hero from "@/components/JDPage/Hero";
import JobsSection from "@/components/JDPage/JobsSection";
import { jdPageFaqs } from "@/data/faqs/JDPageFaqs";

export default function page() {
  return (
    <section>
        <Hero/>
        <JobsSection/>
        <GeneralApplication/>
        <Faq faqs={jdPageFaqs} description="Find answers to common questions about open roles, the application process, and what to expect after applying." />
    </section>
  )
}
