import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-9xl font-extrabold text-red-500 mb-6">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Oops! Page Not Found
      </p>
      <p className="mb-8 text-gray-600 dark:text-gray-400 max-w-md text-center">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Go to Homepage
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
