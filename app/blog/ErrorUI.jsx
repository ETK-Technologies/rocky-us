'use client';

export default function ErrorUI({ error }) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
                <div className="mb-6">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Something went wrong
                </h1>

                <p className="text-gray-600 mb-6">
                    {error?.message === "API endpoint not found: Please check your BASE_URL"
                        ? "We're having trouble connecting to our blog service. This might be a temporary issue."
                        : "We're having trouble loading the blogs. Please try again later."}
                </p>

                <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
                >
                    Refresh page
                </button>

                {process.env.NODE_ENV === 'development' && (
                    <details className="mt-6 text-left">
                        <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                            Error details (development only)
                        </summary>
                        <pre className="mt-2 text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto">
                            {error?.message || 'Unknown error'}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
}
