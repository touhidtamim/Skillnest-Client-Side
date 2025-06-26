import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-4 py-8">
      {/* Image at the top */}
      <div className="mb-8 w-[50%]">
        <img
          src="https://i.postimg.cc/y6hY60Lc/vecteezy-404-landing-page-6549647.jpg"
          alt="404 illustration"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Error title */}
      <p className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Oops! Page Not Found
      </p>

      {/* Explanation text */}
      <p className="mb-8 text-gray-600 dark:text-gray-400 max-w-md text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>

      {/* Navigation buttons */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-800 transition"
        >
          Go to Homepage
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="px-6 cursor-pointer py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
