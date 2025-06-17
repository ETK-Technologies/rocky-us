export const BlogSectionFallback = () => (
  <div className="py-14 md:py-24">
    <div className="max-w-[1184px] mx-auto px-5 sectionWidth:px-0">
      <div className="mb-10 md:mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Learn More From Our Blog
        </h2>
        <p className="text-lg md:text-xl text-[#6B6967]">Recent articles</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-[250px] rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 w-1/4 mb-2"></div>
            <div className="bg-gray-200 h-6 mb-2"></div>
            <div className="bg-gray-200 h-4 mb-4"></div>
            <div className="bg-gray-200 h-8 w-1/3 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
