"use client";

import { useState } from "react";
import CategoryBtn from "./CategoryBtn";

const CategoryBtnsWrapper = ({
  categories,
  selectedCategoryId,
  onCategoryClick,
  loading,
}) => {
  return (
    <div>
      {loading ? (
        <div className="w-20 h-10 bg-gray-100 rounded animate-pulse rounded-full"></div>
      ) : (
        <div className="flex flex-wrap gap-4 animate-fade duration-2">
          <CategoryBtn
            key="0"
            onClick={onCategoryClick}
            isSelected={selectedCategoryId === "0"}
            category={{ name: "All", id: "0", slug: "all" }}
          ></CategoryBtn>
          {categories.map((category) => (
            <CategoryBtn
              onClick={onCategoryClick}
              key={category.id}
              isSelected={selectedCategoryId === category.id}
              category={category}
            ></CategoryBtn>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBtnsWrapper;
