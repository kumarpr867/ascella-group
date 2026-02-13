import Faq from "@/components/Faq";
import Accountability from "@/components/howAscellaOperates/Accountability";
import DayZero from "@/components/howAscellaOperates/DayZero";
import Em3 from "@/components/howAscellaOperates/engagementModel/Em3";
import EMII from "@/components/howAscellaOperates/engagementModel/EMII";
import EngagementModel from "@/components/howAscellaOperates/engagementModel/EngagementModel";
import ExecutionPods from "@/components/howAscellaOperates/ExecutionPods";
import Governace from "@/components/howAscellaOperates/Governace";
import NotCapabilityProblem from "@/components/howAscellaOperates/NotCapabilityProblem";
import OperatingGroup from "@/components/howAscellaOperates/OperatingGroup";
import OperatingStructure from "@/components/howAscellaOperates/OperatingStructure";

export default function HowAscellaOperate() {
  return (
    <>
      <OperatingStructure />
      <OperatingGroup />
      <Accountability />
      <Governace />
      <ExecutionPods />
      <DayZero />
      <EngagementModel />
      <Faq />
      <NotCapabilityProblem />
    </>
  )
}
