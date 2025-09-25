export default function BlogCardSkeleton({ variant = "default" }) {
    if (variant === "featured") {
        return (
            <div className="bg-white rounded-lg overflow-hidden animate-pulse">
                <div className="bg-gray-200 rounded-lg aspect-video mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="flex gap-2 mt-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </div>
            </div>
        );
    }

    if (variant === "sidebar") {
        return (
            <div className="bg-white rounded-lg overflow-hidden animate-pulse">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Default skeleton
    return (
        <div className="bg-white rounded-lg overflow-hidden animate-pulse">
            <div className="bg-gray-200 aspect-video"></div>
            <div className="p-4">
                <div className="h-5 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="space-y-2 mb-3">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                </div>
                <div className="flex gap-2">
                    <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-5 bg-gray-200 rounded-full w-20"></div>
                </div>
            </div>
        </div>
    );
}
