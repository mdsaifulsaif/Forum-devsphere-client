import React from "react";
import logo from "../assets/Images/logo.jpg";
import { Link } from "react-router";

function Logo() {
  return (
    <div>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-semibold text-[#129990]">DevSphere</span>
      </Link>
    </div>
  );
}

export default Logo;
