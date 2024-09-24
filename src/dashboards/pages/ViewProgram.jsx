import React from "react";
import { FaTimes } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { IoListOutline } from "react-icons/io5";

function ViewProgram({ program, onClose }) {
  if (!program) return null; // Ensure program is provided

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay (dark background with opacity) */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="bg-white w-full max-w-sm sm:max-w-md p-4 rounded-lg shadow-lg z-50 mx-4 sm:mx-auto">
        {/* Modal header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-row items-center gap-1 text-base font-normal">
            <IoListOutline />
            <span>Program Details</span>
          </div>
          <FaTimes
            className="cursor-pointer text-gray-500 hover:text-gray-700 text-sm"
            onClick={onClose}
          />
        </div>

        {/* Display program details */}
        <div className="space-y-3">
          {/* Image */}
          <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center">
            {program.images ? (
              <img
                src={program.images}
                alt="Program"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image Available</span>
            )}
          </div>

          {/* Program Title */}
          <div>
            <strong className="font-medium text-sm">Program Title:</strong>{" "}
            {program.program_title || "N/A"}
          </div>

          {/* Description */}
          <div>
            <strong className="font-medium text-sm">Description:</strong>{" "}
            {program.programContent || "N/A"}
          </div>

          <div>
            {/* <div className="flex flex-row gap-1 items-center">
              <GrStatusGood
                className={`${
                  program.status === "active"
                    ? "text-green-500"
                    : "text-red-500"
                } text-sm`}
              />
              <span className="text-sm">{program.status || "Unknown"}</span>
            </div> */}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            type="button"
            className="w-full sm:w-auto  bg-red-500 hover:bg-red-400 text-white rounded-lg py-1 px-3 text-xs md:text-sm cursor-pointer transition-colors duration-300 "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewProgram;
