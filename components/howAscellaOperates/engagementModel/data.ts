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
    title: "Operating structure design and oversight",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    image: "/howAscellaOperates/engagementModels/operation.png",
  },
  {
    label: "Pod deployment",
    title: "Embedded execution pod deployment",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    image: "/howAscellaOperates/engagementModels/pod.png",
  },
  {
    label: "Integration",
    title: "Governance and accountability integration",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    image: "/howAscellaOperates/engagementModels/integration.png",
  },
  {
    label: "Support",
    title: "Scale-readiness and transformation support",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    image: "/howAscellaOperates/engagementModels/support.png",
  },
];
