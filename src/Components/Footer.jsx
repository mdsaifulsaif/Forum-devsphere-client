import React from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";
import logo from "../assets/Images/logo.jpg"; // replace with your logo path

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-10 pb-4">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Logo & Info */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-semibold text-[#129990]">
              DevSphere
            </span>
          </Link>
          <p className="mt-4 text-sm text-gray-300">
            Empowering discussion and knowledge sharing through a modern forum
            experience.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#129990]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/join" className="hover:text-white">
                Join Us
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#129990]">Contact</h3>
          <div className="flex items-center gap-3 text-gray-300 mb-2">
            <MdEmail className="text-xl" />
            <a href="mailto:yourmail@example.com" className="hover:text-white">
              devsphere@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-gray-300 mb-4">
            <FaWhatsapp className="text-xl" />
            <a
              href="https://wa.me/8801XXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              +8801727841555
            </a>
          </div>

          <div className="flex gap-4 mt-4 text-xl text-gray-400">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 text-sm text-gray-400 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Forum. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
