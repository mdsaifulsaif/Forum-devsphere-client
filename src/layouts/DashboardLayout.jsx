import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaBars, FaTimes, FaUser, FaPlus, FaList } from "react-icons/fa";
import Logo from "../Components/Logo";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <div
        className={`md:w-64 w-full bg-white border-r md:block ${
          isOpen ? "block" : "hidden"
        } md:relative absolute z-50`}
      >
        <div className="p-4 flex justify-between items-center border-b md:hidden">
          <h2 className="text-xl font-bold text-[#129990]">Dashboard</h2>
          <button onClick={() => setIsOpen(false)} className="text-xl">
            <FaTimes />
          </button>
        </div>

        {/* Manual Nav Items */}
        <div className="p-4 space-y-3">
          <div className="">
            <Logo />
          </div>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-[#129990] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaUser />
            <span>My Profile</span>
          </NavLink>

          <NavLink
            to="/dashboard/add-post"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-[#129990] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaPlus />
            <span>Add Post</span>
          </NavLink>

          <NavLink
            to="/dashboard/my-posts"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-[#129990] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaList />
            <span>My Posts</span>
          </NavLink>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 relative">
        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl absolute top-4 left-4 z-40 bg-white shadow-md p-2 rounded-full"
        >
          <FaBars />
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
