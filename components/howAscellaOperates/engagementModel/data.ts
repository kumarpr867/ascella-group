export type EngagementLabel =
  | "Operation"
  | "Pod deployment"
  | "Integration"
  | "Support";

export type EngagementSection = {
  label: EngagementLabel;
  title: string;
  description: string;
  image: string;
};

export const SECTIONS : EngagementSection[] = [
  {
    label: "Operation",
    title: "Centralised operating authority",
    description: "Operational authority is defined before delivery begins so ownership, governance, and performance measurement stay aligned across security, technology, workforce, and growth.",
    image: "/howAscellaOperates/engagementModels/operation.png",
  },
  {
    label: "Pod deployment",
    title: "Outcome driven pods",
    description: "Specialised pods are assembled against defined outcomes, operating within Ascella’s central governance model to prevent fragmentation and protect accountability at scale.",
    image: "/howAscellaOperates/engagementModels/pod.png",
  },
  {
    label: "Integration",
    title: "Structured cross team alignment",
    description: "Internal teams, vendors, and execution arms operate through shared decision paths and oversight mechanisms so coordination remains structured and responsibility never diffuses.",
    image: "/howAscellaOperates/engagementModels/integration.png",
  },
  {
    label: "Support",
    title: "Ongoing governance oversight",
    description: "Ongoing oversight, performance review, and escalation control ensure delivery remains stable, auditable, and aligned to organisational objectives as complexity increases.",
    image: "/howAscellaOperates/engagementModels/support.png",
  },
];
