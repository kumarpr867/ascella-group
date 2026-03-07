import { slugify } from "@/utils/slugify";

interface CaseStudy {
    [x: string]: any;
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    category: string;
    featured?: boolean;
}


export const caseStudies: CaseStudy[] = [
    {
        id: 1,
        title: "CS Smart City AI Data Lake city analytics platform for traffic, safety, and urban data management lorem ipsum dolor sit ",
        description: "AI-powered smart city analytics platform for traffic, safety, and urban data management lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "12 Feb",
        category: "AI",
        featured: true,
    },
    {
        id: 2,
        title: "CS Enterprise Cyber Defense System  platform protecting enterprise infrastructure lorem ipsum dolor sit amet, ",
        description: "Real-time threat detection platform protecting enterprise infrastructure lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "18 Feb",
        category: "Cybersecurity",
        featured: true,
    },
    {
        id: 3,
        title: "CS Cloud Infrastructure Modernization e to scalable cloud architecture lorem ipsum dolor sit amet, consectetur ",
        description: "Migrated legacy infrastructure to scalable cloud architecture lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "20 Feb",
        category: "Technology",
        featured: true,
    },

    {
        id: 4,
        title: "CS AI Recruitment Automation Platform  with jobs using predictive hiring models lorem ipsum dolor sit amet, consectetur ",
        description: "AI engine matching candidates with jobs using predictive hiring models lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "22 Feb",
        category: "Staffing",
    },
    {
        id: 5,
        title: "CS Digital Marketing Performance Suite  optimizing campaign ROI lorem ipsum dolor sit amet, consectetur adipiscing ",
        description: "Marketing automation dashboard optimizing campaign ROI lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "25 Feb",
        category: "Marketing",
    },
    {
        id: 6,
        title: "CS Enterprise Sales Optimization gence and forecasting platform lorem ipsum dolor sit amet, consectetur adipiscing ",
        description: "AI-powered sales intelligence and forecasting platform lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "28 Feb",
        category: "Sales",
    },

    {
        id: 7,
        title: "CS AI Fraud Detection Engine els detecting financial fraud in real time lorem ipsum dolor sit amet, consectetur ",
        description: "Machine learning models detecting financial fraud in real time lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "03 Mar",
        category: "AI",
    },
    {
        id: 8,
        title: "CS Zero Trust Security Architecture amework based on zero trust principles lorem ipsum dolor sit amet, consectetur ",
        description: "Enterprise cybersecurity framework based on zero trust principles lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "05 Mar",
        category: "Cybersecurity",
    },
    {
        id: 9,
        title: "CS Enterprise Data Platform nabling analytics across multiple departments lorem ipsum dolor sit amet, consectetur ",
        description: "Unified data lake enabling analytics across multiple departments lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "08 Mar",
        category: "Technology",
    },
    {
        id: 10,
        title: "CS Global Talent Matching Platform form connecting companies with global talent lorem ipsum dolor sit amet, consectetur ",
        description: "AI-driven recruitment platform connecting companies with global talent lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "11 Mar",
        category: "Staffing",
    },
    {
        id: 11,
        title: "CS AI Customer Insights Engine ystem analyzing consumer behavior patterns lorem ipsum dolor sit amet, consectetur ",
        description: "Predictive analytics system analyzing consumer behavior patterns lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "14 Mar",
        category: "AI",
    },
    {
        id: 12,
        title: "CS Security Operations Automation se system for enterprise SOC teams lorem ipsum dolor sit amet, consectetur adipiscing ",
        description: "Automated incident response system for enterprise SOC teams lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "16 Mar",
        category: "Cybersecurity",
    },
    {
        id: 13,
        title: "CS E-commerce Growth Marketing Strategy increasing online conversion rates lorem ipsum dolor sit amet, consectetur ",
        description: "Digital marketing optimization increasing online conversion rates lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "19 Mar",
        category: "Marketing",
    },
    {
        id: 14,
        title: "CS B2B Sales Intelligence Platform ving pipeline forecasting accuracy lorem ipsum dolor sit amet, consectetur ",
        description: "Sales analytics tool improving pipeline forecasting accuracy lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "21 Mar",
        category: "Sales",
    },
    {
        id: 15,
        title: "CS AI-Driven Customer Support Bot automating customer support workflows lorem ipsum dolor sit amet, consectetur ",
        description: "Conversational AI system automating customer support workflows lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "24 Mar",
        category: "AI",
    },
    {
        id: 16,
        title: "CS The Definitive Guide to Securing Operational Technology (OT): Bridging the Air Gap",
        description: "Conversational AI system automating customer support workflows lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/insights/case.svg",
        date: "24 Mar",
        category: "AI",
    },
];

export const caseStudiesWithSlug = caseStudies.map((caseStudy) => ({
    ...caseStudy,
    slug: slugify(caseStudy.title),
}))