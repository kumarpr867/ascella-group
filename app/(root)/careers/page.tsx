import Work from "@/components/careerPage/Work"
import Roles from "@/components/careerPage/Roles"
import Professionals from "@/components/careerPage/Professionals"
import Delivery from "@/components/careerPage/Delivery"
import Current from "@/components/careerPage/Current"
import Applications from "@/components/careerPage/Applications"
import EngagementBegins from "@/components/whoWeWorkWith/EngagementBegins"

export default function Careers(){
    return (
        <>
            <Work />
            <Roles/>
            <Professionals />
            <Delivery/>
            <Current/>
            <Applications/>
            <EngagementBegins/>
        </>
    );
}