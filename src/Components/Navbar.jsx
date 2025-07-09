import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaBell, FaTimes } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import logo from "../assets/Images/logo.jpg";
import { AuthContext } from "../context/AuthContext/AuthContext";
import Logo from "./Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, LogoutUser } = use(AuthContext);

  // handle Logout
  const handleLogout = () => {
    LogoutUser();
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-[#129990]">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/membership" className="hover:text-[#129990]">
          Membership
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium">
          {navLinks}
          <li>
            <FaBell className="text-lg hover:text-[#129990]" />
          </li>
          {user ? (
            <div className="relative group">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2 hidden group-hover:block z-50">
                <li className="font-semibold text-sm px-2 py-1">
                  {user.displayName}
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
                    className="block px-2 py-1 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <li>
              <Link
                // to="/join"
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
                  <button>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/join"
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
