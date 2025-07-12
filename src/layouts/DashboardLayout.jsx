import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaPlus,
  FaList,
  FaUserShield,
  FaUsers,
  FaBullhorn,
  FaFlag,
  FaTags,
} from "react-icons/fa";
import Logo from "../Components/Logo";
import AdminSidebarLinks from "../Components/AdminSidebarLinks";
import useUserRole from "../Hooks/useUserRole";
import LoadingPage from "../Components/LoadingPage";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return <LoadingPage />;
  }
  console.log(role);

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
          {/* for user  */}
          {role === "admin" ? (
            <>
              {/* for admin  */}
              {/* Admin Profile */}
              <NavLink
                to="/dashboard/admin-profile"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-[#129990] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaUserShield />
                <span>Admin Profile</span>
              </NavLink>
              {/* Manage Users */}
              <NavLink
                to="/dashboard/manage-users"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-[#129990] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaUsers />
                <span>Manage Users</span>
              </NavLink>
              {/* Reported Comments */}
              <NavLink
                to="/dashboard/reported-comments"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-[#129990] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaFlag />
                <span>Reported Activities</span>
              </NavLink>
              {/* Make Announcement */}
              <NavLink
                to="/dashboard/announcement"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-[#129990] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaBullhorn />
                <span>Make Announcement</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard/my-profile"
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
                to="/dashboard/addpost"
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
            </>
          )}

          {/* ========================================  */}
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
