"use client";

import Link from "next/link";
import { useState } from "react";

export default function CategoryFilters({
    categories = [],
    selectedCategoryId,
    loading = false,
    showAllBlogs = true,
}) {
    const [clickedCategory, setClickedCategory] = useState(null);

    const handleCategoryClick = (categoryId) => {
        setClickedCategory(categoryId);
    };

    if (loading) {
        return (
            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
                    ></div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex justify-start flex-nowrap items-center gap-3 mb-4 md:mb-8 snap-x snap-mandatory overflow-x-auto no-scrollbar">
            {showAllBlogs ? (
                <>
                    {/* <Link
                        href={`/blog/all?category=${selectedCategoryId}`}
                        onClick={() => handleCategoryClick("0")}
                        className={`px-6 py-3 rounded-full text-sm whitespace-nowrap transition-colors flex items-center justify-center gap-2 ${selectedCategoryId === "0"
                            ? "bg-gray-900 text-white"
                            : "bg-[#0000000A] text-[#4E4E4E] hover:bg-black hover:text-white"
                            }`}
                    >
                        {clickedCategory === "0" && (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        All {selectedCategoryId !== "0" && categories.find(cat => cat.id.toString() === selectedCategoryId)?.name} articles
                    </Link> */}
                    <Link href="/blog" className={`px-6 py-3 rounded-full text-sm whitespace-nowrap transition-colors flex items-center justify-center gap-2 ${selectedCategoryId === "0"
                        ? "bg-gray-900 text-white"
                        : "bg-[#0000000A] text-[#4E4E4E] hover:bg-black hover:text-white"
                        }`}>
                        All Articles
                    </Link>
                </>
            ) : (
                categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/blog/category/${category.slug}`}
                        onClick={() => handleCategoryClick(category.id.toString())}
                        className={`px-6 py-3 rounded-full text-sm whitespace-nowrap transition-colors flex items-center justify-center gap-2 ${selectedCategoryId === category.id.toString()
                            ? "bg-black text-white"
                            : "bg-[#0000000A] text-[#4E4E4E] leading-[140%] hover:bg-black hover:text-white"
                            }`}
                    >
                        {clickedCategory === category.id.toString() && (
                            <div className={`w-4 h-4 border-2 rounded-full animate-spin ${selectedCategoryId === category.id.toString()
                                ? "border-white border-t-transparent"
                                : "border-gray-600 border-t-transparent"
                                }`}></div>
                        )}
                        {category.name}
                    </Link>
                ))
            )}
        </div>
    );
}
