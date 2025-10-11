"use client";
import Link from "next/link";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const BlockedPage = ({ blockedPath }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <FaExclamationTriangle className="text-6xl text-yellow-500" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Available
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          The page you're trying to access ({blockedPath}) is currently not
          available. This feature may be under development or temporarily
          disabled.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <FaHome className="text-lg" />
          Back to Home
        </Link>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 mt-6">
          If you believe this is an error, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default BlockedPage;
