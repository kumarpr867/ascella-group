import Faq from "@/components/Faq";
import Accountability from "@/components/howAscellaOperates/Accountability";
import DayZero from "@/components/howAscellaOperates/DayZero";
import Em3 from "@/components/howAscellaOperates/engagementModel/Em3";
import ExecutionPods from "@/components/howAscellaOperates/ExecutionPods";
import Governace from "@/components/howAscellaOperates/Governace";
import NotCapabilityProblem from "@/components/howAscellaOperates/NotCapabilityProblem";
import OperatingGroup from "@/components/howAscellaOperates/OperatingGroup";
import OperatingStructure from "@/components/howAscellaOperates/OperatingStructure";
import { howAscellaOperatesFaqs } from "@/data/faqs/howAscellaOperatesFaq";

export default function HowAscellaOperate() {
  return (
    <>
      <OperatingStructure />
      <OperatingGroup />
      <Accountability />
      <Governace />
      <ExecutionPods />
      <DayZero />
      <Em3 />
      <Faq faqs={howAscellaOperatesFaqs} description="Clear answers to practical questions about engagement flow, decision authority, scope boundaries, and operating control" />
      <NotCapabilityProblem />
    </>
  )
}
