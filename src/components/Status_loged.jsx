import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const Status_loged = () => {
  const [profile, setProfile] = useState(false);
  const handleprofile = () => {
    setProfile(!profile);
  };

  let userToken = JSON.parse(localStorage.getItem("userToken"));
  let username = userToken?.user?.lastname;
  let role = userToken?.user?.role;

  if (role === undefined) {
    return (
      <div className="flex md:hidden lg:flex items-center">
        <Link to="/login" title="Login">
          <button className="bg-[#ea7b30] text-white rounded-lg border border-transparent py-2 px-4 text-sm md:text-base cursor-pointer transition-colors duration-300 hover:bg-[#4f1930]">
            Login
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex md:hidden lg:flex items-center">
        {profile && <Profile handleprofile={handleprofile} />}
        <div className="flex items-center gap-2 md:gap-3">
          <img
            src="profile.png"
            className="w-8 h-8 md:w-9 md:h-9 rounded-full cursor-pointer"
            onClick={handleprofile}
            alt="Profile"
          />
          <div
            className="text-sm md:text-base cursor-pointer"
            onClick={handleprofile}
          >
            {username || "Guest"}
          </div>
          <RiArrowDropDownLine
            className="text-xl md:text-2xl cursor-pointer"
            onClick={handleprofile}
          />
        </div>
      </div>
    );
  }
};

export default Status_loged;
