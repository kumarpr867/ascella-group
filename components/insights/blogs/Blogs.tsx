"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { slugify } from "@/utils/slugify";
import { blogs } from "@/data/blogs";


const categories = [
    "All",
    "Cybersecurity",
    "Technology",
    "AI",
    "Staffing",
    "Marketing",
    "Sales",
];
export default function Blogs() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [showFilter, setShowFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const BLOGS_PER_PAGE = 6;

    const filtered = blogs.filter((item) => {
        const matchesSearch = item.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" || item.category === category;

        return matchesSearch && matchesCategory;
    });

    const featured = filtered.filter((item) => item.featured);
    const allStudies = filtered.filter((item) => !item.featured);
    const isFilteredCategory = category !== "All";
    const dataToPaginate = filtered.filter((item) => !item.featured);

    const totalPages = Math.ceil(dataToPaginate.length / BLOGS_PER_PAGE);

    const paginatedBlogs = dataToPaginate.slice(
        (currentPage - 1) * BLOGS_PER_PAGE,
        currentPage * BLOGS_PER_PAGE
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [currentPage])
    useEffect(() => {
        setCurrentPage(1);
    }, [search, category]);
    return (
        <section className="mb-20">

            {/* Top Search + Filter */}
            <div className="flex items-center justify-between border-b border-color mb-10">
                <div className="max-w-7xl xl:mx-auto mx-10  py-4 flex justify-between items-center w-full">
                    {/* search bar */}
                    <div className="relative w-52 md:w-72  ">
                        <input
                            type="text"
                            placeholder="Search by Title"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-500 backdrop-blur-md  
                   text-white text-sm pr-10 pl-4 py-2  
                   placeholder-gray-100
                   focus:outline-none focus:ring-2 focus:ring-white/20 
                   focus:border-white/40
                   transition-all duration-300"
                        />

                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-100 cursor-pointer">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 13 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.60243 0C10.4044 0 12.6765 2.27134 12.6766 5.07324L12.6698 5.33496C12.5338 8.0155 10.3168 10.1475 7.60243 10.1475L7.34168 10.1406C6.22226 10.0839 5.19933 9.66332 4.38661 8.99609L0.853402 12.5303C0.658178 12.7253 0.341595 12.7253 0.146371 12.5303C-0.0488408 12.3351 -0.0487399 12.0185 0.146371 11.8232L3.67957 8.28906C2.9612 7.41355 2.52918 6.29405 2.52918 5.07324C2.52934 2.27144 4.80062 0.000152035 7.60243 0ZM7.60243 1C5.3529 1.00015 3.52934 2.82372 3.52918 5.07324C3.52918 7.32289 5.35281 9.14731 7.60243 9.14746C9.85217 9.14746 11.6766 7.32299 11.6766 5.07324C11.6765 2.82363 9.85208 1 7.60243 1Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                    </div>

                    {/* filter */}
                    <div className="relative">

                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
                        >
                            <span className="flex items-center justify-center">
                                <span className="hidden md:inline">Filter by Category</span>
                                <span className="md:hidden">Filter</span>

                                <svg
                                    className="ml-2"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.6829 6.20798H4.44628M1.53894 6.20798H0.349609M1.53894 6.20798C1.53894 5.82253 1.69206 5.45287 1.96461 5.18031C2.23717 4.90776 2.60683 4.75464 2.99228 4.75464C3.37772 4.75464 3.74739 4.90776 4.01994 5.18031C4.29249 5.45287 4.44561 5.82253 4.44561 6.20798C4.44561 6.59342 4.29249 6.96308 4.01994 7.23564C3.74739 7.50819 3.37772 7.66131 2.99228 7.66131C2.60683 7.66131 2.23717 7.50819 1.96461 7.23564C1.69206 6.96308 1.53894 6.59342 1.53894 6.20798ZM12.6829 10.6126H8.85094M8.85094 10.6126C8.85094 10.9982 8.69746 11.3683 8.42484 11.6409C8.15223 11.9135 7.78248 12.0666 7.39694 12.0666C7.01149 12.0666 6.64183 11.9129 6.36928 11.6403C6.09673 11.3678 5.94361 10.9981 5.94361 10.6126M8.85094 10.6126C8.85094 10.2271 8.69746 9.85769 8.42484 9.58508C8.15223 9.31246 7.78248 9.15931 7.39694 9.15931C7.01149 9.15931 6.64183 9.31243 6.36928 9.58498C6.09673 9.85753 5.94361 10.2272 5.94361 10.6126M5.94361 10.6126H0.349609M12.6829 1.80331H10.6129M7.70561 1.80331H0.349609M7.70561 1.80331C7.70561 1.41786 7.85873 1.0482 8.13128 0.775647C8.40383 0.503094 8.77349 0.349976 9.15894 0.349976C9.3498 0.349976 9.53878 0.387567 9.71511 0.460604C9.89144 0.533641 10.0517 0.640693 10.1866 0.775647C10.3216 0.910602 10.4286 1.07082 10.5016 1.24714C10.5747 1.42347 10.6123 1.61245 10.6123 1.80331C10.6123 1.99416 10.5747 2.18315 10.5016 2.35948C10.4286 2.5358 10.3216 2.69602 10.1866 2.83097C10.0517 2.96593 9.89144 3.07298 9.71511 3.14601C9.53878 3.21905 9.3498 3.25664 9.15894 3.25664C8.77349 3.25664 8.40383 3.10352 8.13128 2.83097C7.85873 2.55842 7.70561 2.18876 7.70561 1.80331Z"
                                        stroke="white"
                                        strokeWidth="0.7"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </button>

                        <AnimatePresence>
                            {showFilter && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25 }}
                                    className="absolute right-0 mt-4 px-4 w-52 bg-gray-500 backdrop-blur-md border border-color rounded-2xl shadow-2xl overflow-hidden z-50">
                                    {categories.map((cat, index) => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                setCategory(cat);
                                                setShowFilter(false);
                                            }}
                                            className={`w-full text-center py-2 text-[16px] text-lg transition-all duration-200 ${index !== categories.length - 1 ? "border-b border-white/10" : ""} 
                                            ${category === cat ? "text-white" : "text-white/35 hover:text-white"}`}>
                                            {cat}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>
            </div>

            <div className="max-w-7xl xl:mx-auto mx-10">

                {/* Featured Section */}
                {!isFilteredCategory && featured.length > 0 && (
                    <>
                        <h2 className="text-lg mb-8">Featured Blogs</h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 pb-10 mb-10 border-b border-color  ">
                            {featured.map((item) => (
                                <CaseCard key={item.id} item={item} variant="featured" />
                            ))}
                        </div>

                    </>
                )}

                {/* All Blogs */}
                <h2 className="text-lg mb-8">
                    {isFilteredCategory ? `${category} Blogs` : "All Blogs"}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {paginatedBlogs.map((item) => (
                        <CaseCard key={item.id} item={item} variant="default" />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-6 mt-20 text-sm text-white/60">

                        {/* Previous */}
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="flex items-center gap-2 hover:text-white disabled:opacity-30"
                        >
                            ← Previous
                        </button>

                        {/* Page numbers */}
                        <div className="flex items-center gap-3">
                            {getPagination(currentPage, totalPages).map((page, index) =>
                                page === "..." ? (
                                    <span key={index}>...</span>
                                ) : (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(page as number)}
                                        className={`transition ${currentPage === page
                                                ? "text-white"
                                                : "hover:text-white"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )
                            )}
                        </div>

                        {/* Next */}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="flex items-center gap-2 hover:text-white disabled:opacity-30"
                        >
                            Next →
                        </button>

                    </div>
                )}

            </div>
        </section>
    );
}

function CaseCard({
    item,
    variant = "default",
}: {
    item: (typeof blogs)[number]
    variant?: "default" | "featured"
}) {

    const isFeatured = variant === "featured"

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className={`group ${isFeatured ? "flex gap-4 md:block" : "block"}`}
        >

            {/* Image */}
            <div className={`relative overflow-hidden border border-color ${isFeatured ? "hidden md:block w-full h-56 mb-4" : "w-full h-56 mb-4"}`}>
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 "
                />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-1">

                {/* Title + Date */}
                <div className="flex justify-between gap-6 mb-2">
                    <p className="md:w-2/3 text-[14px] md:text-[16px] line-clamp-2">
                        {item.title}
                    </p>

                    <span className="hidden md:block text-[12px]">
                        {item.date}
                    </span>
                </div>

                {/* Description */}
                <p className="text-gray-200 text-[12px] md:text-[14px] line-clamp-2 md:line-clamp-3 mb-3">
                    {item.description}
                </p>

                {/* Button */}
                <div className="flex justify-between items-center">
                    <Link href={`/insights/blogs/${slugify(item.title)}`}>
                        <button className="self-start text-xs border border-white/40 px-2 md:px-4 py-1 md:py-2 hover:bg-white hover:text-black transition">
                            Read Now
                        </button>
                    </Link>


                    <span className="md:hidden text-[12px] whitespace-nowrap">
                        {item.date}
                    </span>
                </div>

            </div>
        </motion.div>
    )
}
function getPagination(current: number, total: number) {
    const delta = 1
    const range: (number | string)[] = []
    const rangeWithDots: (number | string)[] = []

    let l

    for (let i = 1; i <= total; i++) {
        if (
            i === 1 ||
            i === total ||
            (i >= current - delta && i <= current + delta)
        ) {
            range.push(i)
        }
    }

    for (let i of range) {
        if (l) {
            if ((i as number) - l === 2) {
                rangeWithDots.push(l + 1)
            } else if ((i as number) - l !== 1) {
                rangeWithDots.push("...")
            }
        }

        rangeWithDots.push(i)
        l = i as number
    }

    return rangeWithDots
}