import PartialOutlineBtn from "./btns/PartialOutlineBtn"

type FooterSection = {
    title: string
    items: string[]
    bordered: boolean
}

const footerSections: FooterSection[] = [
    {
        title: "Pages",
        items: [
            "Operating Model ",
            "Execution Arms",
            "Organisations",
            "Startups",
        ],
        bordered: true,
    },
    {
        title: "Contact",
        items: [
            "hq@ascellagroup.com",
            "Ascella.in",
            "Organisations",
        ],
        bordered: true,
    },
    {
        title: "Follow Us",
        items: [
            "Instagram",
            "LinkedIn",
            "Twitter",
        ],
        bordered: false,
    },
]

const Footer = () => {
    return (
        <footer className="mb-20 lg:mb-2 w-full">
            <div className="border-y border-color">
                <div className="flex flex-col sm:flex-row mx-2 sm:mx-6 lg:mx-24 border-x border-color">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-3">
                        {footerSections.map((section, i) => (
                            <div
                                key={i}
                                className={`p-4 md:p-6 lg:p-10 border-b sm:border-b-0 ${section.bordered ? "sm:border-r border-color" : ""}`}
                            >
                                <p className="text-base md:text-md lg:text-xl mb-3 md:mb-4 uppercase">
                                    {section.title}
                                </p>
                                <ul className="space-y-2 text-xs md:text-sm text-gray-100">
                                    {section.items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-x border-color mx-2 sm:mx-6 lg:mx-24 ">
                {/* Bottom section */}
                <div className="p-6 md:p-10 flex flex-col lg:flex-row justify-between gap-8 md:gap-6">
                    {/* Left */}
                    <div className="max-w-2xl w-full">
                        <div className="flex flex-col mb-10 md:mb-20">
                            <h2 className="text-2xl md:text-3xl lg:text-5xl leading-tight mb-2">
                                Control. Structure. Execution.
                            </h2>
                            <p className="text-xs md:text-sm text-gray-200">
                                A unified operating group delivering security, technology,
                                workforce, operations, and revenue under a single governance
                                framework.
                            </p>
                        </div>
                        <div className="flex flex-col max-w-md w-full">
                            <label className="text-base md:text-lg tracking-widest uppercase mb-2">
                                Join Us
                            </label>
                            <div className="flex flex-col sm:flex-row border border-white rounded overflow-hidden">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="flex-1 bg-white text-black px-4 py-2 text-xs md:text-sm outline-none placeholder:text-gray-400"
                                />
                                <PartialOutlineBtn
                                    text="Consult Now"
                                    bgColor="bg-white"
                                    textColor="text-black"
                                    hoverBgColor="hover:bg-black"
                                    hoverTextColor="hover:text-white"
                                    borderColor="border-black"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start lg:items-end justify-between w-full max-w-xs mt-8 lg:mt-0">
                        <img
                            src="/logo.png"
                            alt="Ascella Group Logo"
                            width={120}
                            height={40}
                            className="w-24 md:w-32 h-auto"
                        />
                        <p className="text-xs text-gray-300 mt-2 lg:mt-4">
                            Copyright @ Ascella Group
                        </p>
                    </div>
                </div>
            </div>

            {/* Edge-to-edge horizontal line */}
            <div className="w-full border-t border-color"></div>

            {/* 15px pure black gap below the line */}
            <div className="h-[70px] bg-black w-full"></div>
        </footer>
    )
}

export default Footer