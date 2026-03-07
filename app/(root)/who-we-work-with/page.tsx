import Faq from "@/components/Faq";
import EngagementBegins from "@/components/whoWeWorkWith/EngagementBegins";
import EngagementPrinciple from "@/components/whoWeWorkWith/EngagementPrinciple";
import OrganisationTypes from "@/components/whoWeWorkWith/OrganisationTypes";
import WhoWeWorkWith from "@/components/whoWeWorkWith/WhoWeWorkWith";
import { whoWeWorkWithFaqs } from "@/data/faqs/whoWeWorkWith";

export default function page() {
  return (
    <>
        <WhoWeWorkWith/>
        <EngagementPrinciple />
        <OrganisationTypes />
        <EngagementBegins />
        <Faq faqs={whoWeWorkWithFaqs} description="" />
    </>
  )
}
