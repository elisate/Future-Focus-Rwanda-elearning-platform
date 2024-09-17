import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiMessage } from "react-icons/bi";
import { IoIosList } from "react-icons/io";
import { mycontext } from "../../fetch/ContextProvider";

function NavbarI() {
  const { contact } = mycontext();

  return (
    <div className="flex flex-row gap-1 items-center bg-gray-100 h-20 sm:ml-48 ml-0 fixed border-b border-gray-600 w-full sm:w-[85%] sm:pr-8 pr-4">
      {/* Empty space to push items to the right */}
      <div className="flex-grow"></div>

      {/* Notification Icon */}
      

      {/* Message Icon */}
      

      {/* List Icon */}
      <div className="relative mx-2 text-xl text-gray-700">
        <IoIosList />
      </div>

      {/* Profile Picture */}
      <div className="profile">
        <img
          className="w-10 h-10 rounded-full"
          src="profile.png"
          alt="Profile"
        />
      </div>
    </div>
  );
}

export default NavbarI;
