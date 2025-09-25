import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Blog Post Not Found
                </h1>
                <p className="text-gray-600 mb-8">
                    The blog post you're looking for doesn't exist or may have been moved.
                </p>
                <div className="space-y-4">
                    <Link
                        href="/blog"
                        className="block w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                        Back to Blogs
                    </Link>
                    <Link
                        href="/"
                        className="block w-full bg-white text-gray-700 py-3 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
