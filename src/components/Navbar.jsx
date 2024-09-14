import React, { useState } from "react";
import { Link } from "react-router-dom";
import Status_loged from "./Status_loged";
import logo from "../assets/logo_official.png"; // Adjust path as necessary
import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full h-16 fixed top-0 left-0 z-50 bg-white">
      {/* Main Container for Navbar with 5rem left and right padding */}
      <div className="flex items-center justify-between pl-5 pr-5 md:pl-10 md:pr-10 lg:pl-20 lg:pr-20 h-full w-full max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="w-36 h-16 md:w-36 md:h-20 flex-shrink-0">
          <img src='lg.png' alt="Logo" className="w-full h-full" />
        </div>

        {/* Navigation Links (centered) */}
        <div className="hidden md:flex justify-center flex-grow">
          <ul className="flex list-none gap-8 text-gray-900">
            <li>
              <Link
                to="/"
                className="text-gray-900 no-underline "
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/program"
                className="text-gray-900 no-underline "
              >
                PROGRAMS
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-900 no-underline "
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <Link
                to="/landing"
                className="text-gray-900 no-underline "
              >
                TRAINING
              </Link>
            </li>
          </ul>
        </div>

        {/* Status/Logged User Component */}
        <div className="hidden md:flex justify-end flex-shrink-0">
          <Status_loged/>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? (
              <IoMdClose className="text-gray-900 text-3xl" />
            ) : (
              <LuMenu className="text-gray-900 text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-white`}
      >
        <ul className="flex flex-col list-none gap-5 text-gray-900 p-4">
          <li>
            <Link
              to="/"
              className="text-gray-900 no-underline "
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/program"
              className="text-gray-900 no-underline "
            >
              PROGRAMS
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-900 no-underline "
            >
              ABOUT US
            </Link>
          </li>
          <li>
            <Link
              to="/landing"
              className="text-gray-900 no-underline "
            >
              TRAINING
            </Link>
          </li>
          <li>
            <Status_loged/>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
