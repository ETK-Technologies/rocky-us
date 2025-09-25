export default function BlogPageSkeleton() {
    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Skeleton */}
                <div className="mb-[30px]">
                    <div className="h-[60px] bg-gray-200 rounded-lg animate-pulse mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>

                {/* Category Filters Skeleton */}
                <div className="flex justify-start flex-nowrap items-center gap-3 mb-8">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="h-12 w-24 bg-gray-200 rounded-full animate-pulse"
                        ></div>
                    ))}
                </div>

                {/* Featured Articles Skeleton */}
                <section className="mb-16">
                    <div className="bg-white rounded-lg overflow-hidden">
                        <div className="md:flex">
                            {/* Main featured article skeleton */}
                            <div className="md:w-2/3 pl-0 p-6">
                                <div className="space-y-4">
                                    <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                                </div>
                            </div>

                            {/* Sidebar articles skeleton */}
                            <div className="md:w-1/3 p-6 md:pl-0">
                                <div className="space-y-6">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="space-y-3">
                                            <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                                            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Latest Articles Skeleton */}
                <section className="mb-16">
                    <div className="h-10 bg-gray-200 rounded animate-pulse w-32 mb-8"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="space-y-3">
                                <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                            </div>
                        ))}
                    </div>

                    {/* Load more button skeleton */}
                    <div className="text-center">
                        <div className="h-12 bg-gray-200 rounded-full animate-pulse w-48 mx-auto"></div>
                    </div>
                </section>

                {/* Newsletter skeleton */}
                <div className="text-center py-8">
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-96 mx-auto mb-4"></div>
                    <div className="h-12 bg-gray-200 rounded-full animate-pulse w-60 mx-auto"></div>
                </div>
            </div>
        </main>
    );
}
