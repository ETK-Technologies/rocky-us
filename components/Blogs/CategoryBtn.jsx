import Link from "next/link";

const CategoryBtn = ({ category, isSelected, onClick, loading = false }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-2 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center text-gray-700 text-sm font-normal">
      <Link 
        href="/blog" 
        className="hover:text-gray-900 transition-colors duration-200"
      >
        HOME
      </Link>
      <span className="mx-2 text-gray-700">/</span>
      <span className="text-gray-700">
        {typeof category === "string" ? category.toUpperCase() : category.name?.toUpperCase()}
      </span>
    </div>
  );
};

export default CategoryBtn;
