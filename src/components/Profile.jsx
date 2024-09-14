import React from "react";
import { Link } from "react-router-dom";

function Profile({ handleprofile }) {
  function Logout() {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  }

  return (
    <>
      {/* Overlay for mobile screens */}
      <div className="fixed inset-0 z-50 bg-[rgba(50,49,49,0.5)] md:hidden flex items-start justify-center" onClick={handleprofile}>
        <div className="relative bg-white py-5 px-4 rounded-md shadow-lg w-80 max-w-xs mt-16">
          {/* Triangle arrow */}
          <div className="absolute top-[-10px] right-4 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white"></div>

          {/* Profile content */}
          <Link
            to="/StudentCourse"
            className="block text-base hover:text-[#ea7b30] hover:underline mb-2"
          >
            Dashboard
          </Link>
          <div className="block text-base hover:text-[#ea7b30] hover:underline mb-2">
            Account
          </div>
          <div className="block text-base hover:text-[#ea7b30] hover:underline mb-2">
            Support
          </div>
          <div
            onClick={Logout}
            className="block text-base cursor-pointer hover:text-[#ea7b30] hover:underline"
          >
            Sign out
          </div>
        </div>
      </div>

      {/* Display the profile component on the right side for larger screens */}
      <div className="fixed top-0 right-0 z-50 hidden md:flex items-start justify-center w-[50%] h-full bg-transparent"  onClick={handleprofile}>
        <div className="relative bg-white py-4 px-4 rounded-md shadow-lg w-56 max-w-xs mt-20 ml-60">
          {/* Triangle arrow */}
          <div className="absolute top-[-10px] left-[calc(100%-2rem)] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white"></div>

          {/* Profile content */}
          <Link
            to="/StudentCourse"
            className="block text-base hover:text-[#ea7b30] hover:underline mb-2"
          >
            Dashboard
          </Link>
          <div className="block text-base hover:text-[#ea7b30] hover:underline mb-2">
            Account
          </div>
          <div className="block text-base hover:text-[#ea7b30] hover:underline mb-2">
            Support
          </div>
          <div
            onClick={Logout}
            className="block text-base cursor-pointer hover:text-[#ea7b30] hover:underline"
          >
            Sign out
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
