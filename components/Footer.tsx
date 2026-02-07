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
        <footer className="mb-10 lg:mb-2">
            <div className="border-y border-color">
                <div className="flex mx-4 lg:mx-25 border-x border-color">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 ">
                        {footerSections.map((section, i) => (
                            <div
                                key={i}
                                className={`p-6 lg:p-10 border-b sm:border-b-0 ${section.bordered ? "sm:border-r border-color" : ""}`}
                            >
                                <p className="text-md lg:text-xl mb-4 uppercase">
                                    {section.title}
                                </p>

                                <ul className="space-y-2 text-sm text-gray-100">
                                    {section.items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div className="border-x  border-color mx-4 lg:mx-25">
                {/* Bottom section */}
                <div className="p-10 flex flex-col lg:flex-row justify-between gap-6">

                    {/* Left */}
                    <div className="max-w-2xl">
                        <div className="flex flex-col mb-24">
                            <h2 className="text-3xl lg:text-5xl leading-tight mb-2">
                                Control.Structure.Execution.
                            </h2>
                            <p className="text-sm text-gray-200">
                                A unified operating group delivering security, technology,
                                workforce, operations, and revenue under a single governance
                                framework.
                            </p>
                        </div>

                        <div className="flex flex-col max-w-md">
                            <label className="text-lg md:text-xl tracking-widest uppercase">
                                Join Us
                            </label>

                            <div className="flex border border-white">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="flex-1 bg-white text-black px-4 py-2 text-sm outline-none placeholder:text-gray-400"
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

                    <div className="flex flex-col items-start lg:items-end justify-between">
                        <img
                            src="/logo.png"
                            alt="Ascella Group Logo"
                            width={140}
                            height={50}
                        />
                        <p className="text-xs text-gray-300">
                            Copyright © Ascella Group
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
