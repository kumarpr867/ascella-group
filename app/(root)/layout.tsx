import Footer from "@/components/Footer";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader/Loader";
import ScrollToTop from "@/components/ScrollToTop";
import { Montserrat } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        {/* <CustomCursor /> */}
        <Loader />
        <Navbar />
        <SmoothScroll>
            <main className="pt-16 sm:pt-20">
              {children}
            </main>
        </SmoothScroll>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
