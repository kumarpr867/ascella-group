import Controlled from "@/components/startups/Controlled"
import ProgrammEmbedded from "@/components/startups/ProgrammEmbedded"
import Eligibility from "@/components/startups/Eligibility"
import Focuses from "@/components/startups/Focuses"
import GovernanceModel from "@/components/startups/GovernanceModel"
import Alignments from "@/components/startups/Alignments"
import Faq from "@/components/Faq"
import { startupFaqs } from "@/data/faqs/startupFaq"


export default function startups() {
  return (
    <>
    <Controlled/>
    <ProgrammEmbedded/>
    <Eligibility/>
    <Focuses/>
    <GovernanceModel/>
    <Alignments/>
    <Faq faqs={startupFaqs} description={"Key questions about the Startups Programme, eligibility, structure, and how operating discipline is embedded before scale introduces structural complexity."}/>
    
    </>
  )
}
