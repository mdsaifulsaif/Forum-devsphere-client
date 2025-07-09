import { NavLink } from "react-router";
import { FaUserShield, FaUsers, FaBullhorn, FaFlag } from "react-icons/fa";

const AdminSidebarLinks = ({ setIsOpen }) => {
  return (
    <>
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
        to="/dashboard/admin/reported-comments"
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
        to="/dashboard/admin/announcement"
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
  );
};

export default AdminSidebarLinks;
