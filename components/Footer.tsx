import PartialOutlineBtn from "./btns/PartialOutlineBtn"
import Link from "next/link"
import Image from "next/image"
import { slideInFromBottom } from "@/utils/motion"
import Reveal from "@/utils/Reveal"

const ArrowIcon = () => (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.353539" y1="8.64645" x2="8.35354" y2="0.646447" stroke="white" />
        <line x1="0.707092" y1="0.5" x2="8.70709" y2="0.500001" stroke="white" />
        <line x1="8.20709" y1="9" x2="8.20709" y2="1" stroke="white" />
    </svg>
)

type FooterSection = {
    title: string
    items: { label: string; href: string }[]
    bordered: boolean
}

const footerSections: FooterSection[] = [
    {
        title: "Pages",
        items: [
            { label: "Operating Model ", href: "/how-ascella-operates" },
            { label: "Organisations", href: "/who-we-work-with" },
            { label: "Execution Arms", href: "/execution-arms" },
            { label: "Startups", href: "/startups" },
            { label: "Insights", href: "/insights/blogs" },
            { label: "Careers", href: "/careers" },
        ],
        bordered: true,
    },
    {
        title: "Contact",
        items: [
            { label: "hello@ascella.group", href: "mailto:hello@ascella.group" },
            { label: "ascella.group", href: "https://ascella.group" },
            { label: "+91 16045 10860", href: "tel:+911604510860" },
        ],
        bordered: true,
    },
    {
        title: "Follow Us",
        items: [
            { label: "Instagram", href: "https://instagram.com" },
            { label: "LinkedIn", href: "https://www.linkedin.com/company/ascella-group/posts/?feedView=all" },
        ],
        bordered: true,
    },
    {
        title: "Privacy",
        items: [
            { label: "Terms of Service", href: "https://instagram.com" },
            { label: "Privacy Policy", href: "https://linkedin.com" },
            { label: "Copyright", href: "/" },
        ],
        bordered: false,
    }
]

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="mb-2 lg:mb-10 w-full">
            <div className="border-b lg:border-b-0 border-t border-color">

                {/* Mobile Join Us */}
                <div className="lg:hidden border-b border-color">
                    <div className="flex flex-col mx-10 py-4 px-5 border-x border-color">
                        <label className="text-base md:text-lg tracking-widest uppercase mb-2">
                            Let's get started
                        </label>
                        <div className="flex sm:flex-row border border-white rounded overflow-hidden">
                            <input
                                type="email"
                                placeholder="Email"
                                className="flex-1 bg-white text-black px-4 py-2 text-b3 outline-none placeholder:text-gray-400"
                            />
                            <PartialOutlineBtn
                                size="sm"
                                text="Join Us"
                                textColor="text-white"
                                bgColor="bg-black"
                                borderColor="border-white"
                                hoverBgColor="hover:bg-white"
                                hoverTextColor="hover:text-black"
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:mx-20 xl:mx-24 flex flex-col sm:flex-row">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-4">

                        {/* Pages */}
                        {footerSections.filter(s => s.title === "Pages").map((section) => {
                            const originalIndex = footerSections.findIndex(s => s.title === section.title)
                            return (
                                <Reveal key={section.title} variants={slideInFromBottom(originalIndex * 0.12)}
                                    className="py-4 px-5 lg:py-7 lg:px-2 xl:p-8 border-x border-color mx-10 lg:mx-0 border-b lg:border-b-0 sm:border-r border-color"
                                >
                                    <p className="text-base md:text-md lg:text-xl mb-3 md:mb-4 uppercase">
                                        {section.title}
                                    </p>
                                    {/* Pages: 2 col grid, right col right-aligned on mobile */}
                                    <ul className="text-b3 md:text-b2 text-gray-100 grid grid-cols-2 gap-x-2 gap-y-2">
                                        {section.items.map((item, idx) => (
                                            <li key={idx} className={idx % 2 === 1 ? "flex justify-end lg:justify-start" : ""}>
                                                <Link
                                                    href={item.href}
                                                    className="group inline-flex items-center gap-2.5 hover:text-white transition-colors duration-200"
                                                    {...(item.href.startsWith("http") || item.href.startsWith("mailto")
                                                        ? { target: "_blank", rel: "noopener noreferrer" }
                                                        : {})}
                                                >
                                                    {item.label}
                                                    <ArrowIcon />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </Reveal>
                            )
                        })}

                        {/* Contact + Follow Us: side by side on mobile, no border between them */}
                        <div className="lg:contents mx-10 lg:mx-0 border-x border-color border-b lg:border-b-0 flex flex-row">
                            {footerSections.filter(s => s.title === "Contact" || s.title === "Follow Us").map((section, i) => {
                                const originalIndex = footerSections.findIndex(s => s.title === section.title)
                                const isFollowUs = section.title === "Follow Us"
                                return (
                                    <Reveal key={section.title} variants={slideInFromBottom(originalIndex * 0.12)}
                                        className={`flex-1 py-4 px-5 lg:py-7 lg:px-2 xl:p-8 lg:border-x lg:mx-0 lg:border-b-0 border-color sm:border-r border-color`}
                                    >
                                        <p className={`text-base md:text-md lg:text-xl mb-3 md:mb-4 uppercase ${isFollowUs ? "text-right lg:text-left" : ""}`}>
                                            {section.title}
                                        </p>
                                        <ul className={`text-b3 md:text-b2 text-gray-100 space-y-2 ${isFollowUs ? "flex flex-col items-end lg:items-start" : ""}`}>
                                            {section.items.map((item, idx) => (
                                                <li key={idx}>
                                                    <Link
                                                        href={item.href}
                                                        className="group inline-flex items-center gap-2.5 hover:text-white transition-colors duration-200"
                                                        {...(item.href.startsWith("http") || item.href.startsWith("mailto")
                                                            ? { target: "_blank", rel: "noopener noreferrer" }
                                                            : {})}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </Reveal>
                                )
                            })}
                        </div>

                        {/* Privacy */}
                        {footerSections.filter(s => s.title === "Privacy").map((section) => {
                            const originalIndex = footerSections.findIndex(s => s.title === section.title)
                            return (
                                <Reveal key={section.title} variants={slideInFromBottom(originalIndex * 0.12)}
                                    className="py-4 px-5 lg:py-7 lg:px-2 xl:p-8 border-x border-color mx-10 lg:mx-0 border-b-0"
                                >
                                    <p className="text-base md:text-md lg:text-xl mb-3 md:mb-4 uppercase">
                                        {section.title}
                                    </p>
                                    <ul className="text-b3 md:text-b2 text-gray-100 space-y-2">
                                        {section.items.map((item, idx) => (
                                            <li key={idx}>
                                                <Link
                                                    href={item.href}
                                                    className="group inline-flex items-center gap-2.5 w-full hover:text-white transition-colors duration-200"
                                                    {...(item.href.startsWith("http") || item.href.startsWith("mailto")
                                                        ? { target: "_blank", rel: "noopener noreferrer" }
                                                        : {})}
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </Reveal>
                            )
                        })}

                    </div>
                </div>
            </div>

            <Reveal variants={slideInFromBottom(0.1)} className="block lg:hidden mx-10 border-x border-color">
                <div className="flex flex-col px-5 py-4">
                    <h4 className="text[36px] md:text-[64px] leading-tight mb-1">
                        Control. Structure. Execution.
                    </h4>
                    <p className="text-b3 text-gray-100">
                        A unified operating group delivering security, technology,
                        workforce, operations, and revenue under a single governance
                        framework.
                    </p>
                </div>
            </Reveal>
            <Reveal variants={slideInFromBottom(0.1)} className="border-t border-color">
                <div className="block lg:hidden mx-10 border-x border-color">
                    <div className="flex items-center justify-between px-5 py-4">
                        <Image src={"/logo2.png"} alt={""} width={30} height={30} />
                        <p className="text-[12px] text-gray-100">
                            Copyright @ {year} Ascella Group
                        </p>
                    </div>
                </div>
            </Reveal>

            <Reveal variants={slideInFromBottom(0.1)} className="hidden lg:block mx-10 lg:mx-20 xl:mx-24 border-x border-color">
                <div className="px-5 py-4 md:p-10 flex flex-col lg:flex-row justify-between gap-8 md:gap-6">
                    <div>
                        <div className="flex flex-col mb-10 md:mb-20">
                            <h3 className="text[36px] md:text-[52px] leading-tight mb-2">
                                Control. Structure. Execution.
                            </h3>
                            <p className="text-b3 text-gray-100 w-2/3">
                                A unified operating group delivering security, technology, workforce, operations, and revenue under a single governance framework.
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col items-start lg:items-end justify-between w-full max-w-xs mt-8 lg:mt-0">
                        <div className="flex flex-col items-start lg:items-end gap-4">
                            <Link href="/" className="flex items-center gap-2">
                                <Image
                                    src="/logo.svg"
                                    alt="Logo"
                                    width={96}
                                    height={32}
                                    priority
                                    unoptimized
                                    className="w-20 sm:w-24 h-auto"
                                />
                            </Link>
                            <div className="flex flex-col w-full max-w-md">
                                <label className="text-base md:text-lg tracking-widest uppercase mb-2">
                                    Let's get started
                                </label>
                                <div className="flex flex-col sm:flex-row border border-white rounded overflow-hidden">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="flex-1 bg-white text-black px-4 py-2 text-xs md:text-sm outline-none placeholder:text-gray-400"
                                    />
                                    <PartialOutlineBtn
                                        text="Join Us"
                                        textColor="text-white"
                                        bgColor="bg-black"
                                        borderColor="border-black"
                                        hoverBgColor="hover:bg-white"
                                        hoverTextColor="hover:text-black"
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-b3 text-gray-300 mt-4">
                            Copyright @ {year} Ascella Group
                        </p>
                    </div>
                </div>
            </Reveal>

            <div className="w-full border-t border-color"></div>
        </footer>
    )
}

export default Footer