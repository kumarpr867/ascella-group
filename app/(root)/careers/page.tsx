import Work from "@/components/careerPage/Work"
import Roles from "@/components/careerPage/Roles"
import Professionals from "@/components/careerPage/Professionals"
import Delivery from "@/components/careerPage/Delivery"
import Current from "@/components/careerPage/Current"
import Applications from "@/components/careerPage/Applications"

import StructuredDesigned from "@/components/careerPage/StructuredDesigned"
import Faq from "@/components/Faq"
import { careersFaqs } from "@/data/faqs/careersFaqs"

export default function Careers(){
    return (
        <>
            <Work />
            <Roles/>
            <Professionals />
            <Delivery/>
            <Current/>
            <Applications/>
            <StructuredDesigned/>
            <Faq faqs={careersFaqs} description="These questions outline how careers at Ascella are structured, how roles operate within governance-led environments, and what candidates should expect." />
        </>
    );
}