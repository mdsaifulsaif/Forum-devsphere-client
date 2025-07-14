import React, { use, useContext, useState } from "react";
import { Link, NavLink } from "react-router"; // ✅ fix router import
import { FaBars, FaBell, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext/AuthContext";
import Logo from "./Logo";
import NotificationIcon from "./NotificationIcon";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "./LoadingPage";
import axios from "axios";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import useUserRole from "../Hooks/useUserRole";

const Navbar = () => {
  const axiosSecure = UseAxiosSecure();
  const { role } = useUserRole();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // ✅ new state
  const { user, LogoutUser } = useContext(AuthContext);

  // ✅ Fetch user info
  const { isLoading: userlod, data: userInfo = {} } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/usersbyemail?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleLogout = () => {
    LogoutUser();
  };

  if (userlod) {
    <LoadingPage />;
  }

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-[#129990]">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/payment/${userInfo._id}`}
          className="hover:text-[#129990]"
        >
          Membership
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium">
          {navLinks}
          <li>
            {/* <FaBell className="text-lg hover:text-[#129990]" /> */}
            <NotificationIcon />
          </li>
          {user ? (
            <div className="relative">
              <img
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} // ✅ toggle click
                src={user?.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer border-2 border-[#129990]"
              />

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2 z-50">
                  <li className="font-semibold text-sm px-2 py-1">
                    {user?.displayName}
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-2 py-1 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-2 py-1 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <li>
              <Link
                to="/joinus"
                className="px-4 py-1 bg-[#129990] text-white rounded hover:bg-opacity-90"
              >
                Join Us
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="space-y-3 font-medium">
            {navLinks}
            <li>
              <FaBell className="inline mr-2" /> Notifications
            </li>
            {user ? (
              <>
                <li className="font-semibold">{user.displayName}</li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/joinus"
                  className="block px-4 py-2 bg-[#129990] text-white rounded hover:bg-opacity-90 text-center"
                >
                  Join Us
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
