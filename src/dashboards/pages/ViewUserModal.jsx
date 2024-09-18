import React from "react";
import { FaTimes } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { IoListOutline } from "react-icons/io5";

function ViewUserModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full z-50">
      {/* Overlay (dark background with opacity) */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content (white background) */}
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg z-50 mx-4 sm:mx-0 sm:w-96">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-row items-center gap-1 text-lg font-light">
            <IoListOutline />
            <div>User Details</div>
          </div>
          <FaTimes className="cursor-pointer font-light" onClick={onClose} />
        </div>
        <div className="space-y-2">
          <div>
            <strong className="font-normal">Firstname: {user.firstname}</strong>
          </div>
          <div>
            <strong className="font-normal">Lastname: {user.lastname}</strong>
          </div>
          <div>
            <strong className="font-normal">Email: {user.email}</strong>
          </div>
          <div>
            <strong className="font-normal">Gender: {user.gender}</strong>
          </div>
          <div>
            <strong className="font-normal">Status :</strong>
            <div className="flex flex-row gap-1  items-center">
              <GrStatusGood className="text-green-500" />
              <div>
                {" "}
                {user.role === "isInstructor" && user.instructor_department
                  ? ` Role: ${user.role} , Department: ${user.instructor_department}`
                  : user.role}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            className="bg-green-500 text-white rounded-lg border border-transparent py-2 px-4 text-sm md:text-base cursor-pointer transition-colors duration-300 hover:bg-green-700"
          >
            activate
          </button>
          <button
            type="button"
            className="bg-[#4f1930] text-white rounded-lg border border-transparent py-2 px-4 text-sm md:text-base cursor-pointer transition-colors duration-300 hover:bg-[#7f2a4f]"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewUserModal;
