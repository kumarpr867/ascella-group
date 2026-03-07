import ExecutionLayer from "@/components/executionArmsPages/ExecutionLayer";
import ExecutionTogether from "@/components/executionArmsPages/ExecutionTogether";
import Introduction from "@/components/executionArmsPages/Introduction";
import Role from "@/components/executionArmsPages/Role";
import Faq from "@/components/Faq";
import Engagement from "@/components/executionArmsPages/Engagement";
import { executionArmsFaqs } from "@/data/faqs/executionArmsFaq";


export default function ExecutionArms(){
    return (
        <>
            <ExecutionLayer />
            <Introduction/>
            <Role/>
            <ExecutionTogether/>
            <Faq faqs={executionArmsFaqs} description={"Ascella delivers structured execution across security, technology, workforce, operations, and growth within a unified governance framework."}/>
            <Engagement/>
        </>
    );
}