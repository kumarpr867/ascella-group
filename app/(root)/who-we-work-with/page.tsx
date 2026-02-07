import Faq from "@/components/Faq";
import EngagementPrinciple from "@/components/whoWeWorkWith/EngagementPrinciple";
import OrganisationTypes from "@/components/whoWeWorkWith/OrganisationTypes";
import WhoWeWorkWith from "@/components/whoWeWorkWith/WhoWeWorkWith";

export default function page() {
  return (
    <>
        <WhoWeWorkWith/>
        <EngagementPrinciple />
        <OrganisationTypes />
        <Faq />
    </>
  )
}
