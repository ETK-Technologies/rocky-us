"use client";

export default function RelatedArticles({ blog }) {
    // This would typically fetch related articles based on the current blog
    // For now, we'll show a promotional section as shown in the design

    return (
        <div className="space-y-6">
            {/* Promotional Section */}
            <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center">
                    {/* Product Image Placeholder */}
                    <div className="bg-gray-200 rounded-lg w-24 h-24 mx-auto mb-4 flex items-center justify-center text-gray-500 text-xs">
                        Product
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Get Obvious Results Within 3 Weeks
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">
                        Lorem ipsum dolor sit amet consectetur.
                    </p>

                    <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                        Get Started →
                    </button>
                </div>
            </div>

            {/* Related Articles Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Related Articles
                </h3>

                <div className="space-y-4">
                    {/* This would be populated with actual related articles */}
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-sm">
                            Related articles will appear here
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
