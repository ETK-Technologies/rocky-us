export default function SearchResultSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-b border-[#E2E2E1] pb-6">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-20 bg-gray-100 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
