import { Suspense } from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-semibold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
        >
          Return to Homepage
        </Link>
      </div>
    </Suspense>
  );
}
