import React from "react";
import { Link } from "react-router"; // or "react-router" if you're using Remix
import { FaBan } from "react-icons/fa";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md text-center max-w-md">
        <FaBan className="text-6xl text-red-500 mb-4 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-[#129990] text-white rounded hover:bg-[#0e7f7f] transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
