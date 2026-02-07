import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Operating Model", href: "/how-ascella-operates" },
  { label: "Execution Arms", href: "/execution-arms" },
  { label: "Organisations", href: "/who-we-work-with" },
  { label: "Startups", href: "/startups" },
];

const Navbar = () => {
  return (
    <header className="mx-auto max-w-7xl px-6 py-3  h-20 w-full ">
      <div className="flex justify-between">
        <Link href="/" className="flex-center gap-2">
          <Image
            src="/logo.png" 
            alt="Ascella Logo"
            width={100}
            height={32}
            priority
          />
        </Link>

        <nav className="flex-center font-medium">

          <div className="w-px m-5 h-5 rotate-30 origin-center bg-gray-200"></div>

          {navLinks.map((link, index) => (
            < div key={link.href} className="flex-center text-white">
              <Link
                href={link.href}
                className=" hover:scale-[1.1] transition ease-in"
              >
                {link.label}
              </Link>

              {index !== navLinks.length - 1 && (
                <div className="w-px m-5 h-5 rotate-30 origin-center bg-gray-200"></div>
              )}
            </div>
          ))}
        </nav>

        <Link
          href="/connect"
          className="group flex-center gap-3 font-medium text-white hover:scale-105 duration-200">
          <span>Connect</span>

          <span className="w-5 h-5 flex-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
              className="
                rounded-sm bg-white p-1
                transition-transform duration-200 ease-out
                group-hover:scale-[1.5]
              "
            >
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="#000000"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
