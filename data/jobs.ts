export type Job = {
  id: number;
  slug: string;
  title: string;
  company: string;
  description: string;
  status: "Open position" | "Expired position";
  experience: string;
  image: string;
};
const description =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.";

export const jobs: Job[] = [
  { id: 1, slug: "senior-ui-ux-designer-1", title: "Senior UI/UX Designer", company: "Ascella Group", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 2, slug: "senior-ui-ux-designer-2", title: "Senior UI/UX Designer", company: "Ascella Group", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 3, slug: "senior-ui-ux-designer-3", title: "Senior UI/UX Designer", company: "Ascella Group", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 4, slug: "senior-ui-ux-designer-4", title: "Senior UI/UX Designer", company: "Ascella Infosec", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 5, slug: "senior-ui-ux-designer-5", title: "Senior UI/UX Designer", company: "Ascella Infosec", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 6, slug: "role-title-6", title: "Role Title", company: "Ascella Softwarelabs", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 7, slug: "role-title-7", title: "Role Title", company: "Ascella Softwarelabs", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 8, slug: "role-title-8", title: "Role Title", company: "Ascella Softwarelabs", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 9, slug: "hr-9", title: "HR", company: "Ascella Staffing", description, status: "Open position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 10, slug: "role-title-10", title: "Role Title", company: "Ascella Engage", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 11, slug: "role-title-11", title: "Role Title", company: "Ascella Engage", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 12, slug: "role-title-12", title: "Role Title", company: "Ascella Forge", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 13, slug: "role-title-13", title: "Role Title", company: "Ascella Forge", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },
  { id: 14, slug: "role-title-14", title: "Role Title", company: "Ascella Forge", description, status: "Expired position", experience: "3 years Experience", image: "/jd/job.png" },
];