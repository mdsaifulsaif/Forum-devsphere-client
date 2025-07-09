import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3 text-[#129990] animate-pulse">
        <FaSpinner className="text-5xl animate-spin" />
        <p className="text-lg font-medium">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
