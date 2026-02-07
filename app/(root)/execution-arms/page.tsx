import ExecutionLayer from "@/components/executionArmsPages/ExecutionLayer";
import ExecutionTogether from "@/components/executionArmsPages/ExecutionTogether";
import Introduction from "@/components/executionArmsPages/Introduction";
import Role from "@/components/executionArmsPages/Role";
import Faq from "@/components/Faq";
import Engagement from "@/components/executionArmsPages/Engagement";


export default function ExecutionArms(){
    return (
        <>
            <ExecutionLayer />
            <Introduction/>
            <Role/>
            <ExecutionTogether/>
            <Faq/>
            <Engagement/>
        </>
    );
}