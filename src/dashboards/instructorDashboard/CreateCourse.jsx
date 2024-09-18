import React from "react";
import { IoCloseSharp } from "react-icons/io5";
function CreateCourse({ handleCourseModal }) {
  let userToken = JSON.parse(localStorage.getItem("userToken"));
  let token = userToken?.access_token;
  let username = userToken?.user?.lastname;
  let usernames = userToken?.user?.firstname;
  let email = userToken?.user?.email;
  let role = userToken?.user?.role;
  let dept = userToken?.user?.instructor_department;
  console.log("ddddddddddddd",dept);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 mx-4 sm:mx-0">
        <div className="flex flex-row items-center justify-between">
          <div className="text-2xl font-extralight mb-6 ">Create Course</div>
          <IoCloseSharp
            className="text-2xl font-bold cursor-pointer"
            onClick={handleCourseModal}
          />
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="courseTitle"
              className="mb-1 font-light text-gray-700"
            >
              Course Title
            </label>
            <input
              type="text"
              id="courseTitle"
              className="border border-gray-300 p-2 rounded-lg text-base w-full h-10"
              placeholder="Enter course title"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="program" className="mb-1 font-light text-gray-700">
              Program
            </label>
            <input
              type="text"
              name="program"
              value={dept}
              className="border border-gray-300 p-2 rounded-lg text-base w-full h-10"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="videos" className="mb-1 font-light text-gray-700">
              Videos
            </label>
            <input
              type="file"
              id="videos"
              className="border border-gray-300 rounded-lg text-base w-full h-10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="documents"
              className="mb-1 font-light text-gray-700"
            >
              Documents
            </label>
            <input
              type="file"
              id="documents"
              className="border border-gray-300 rounded-lg text-base w-full h-10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="images" className="mb-1 font-light text-gray-700">
              Images
            </label>
            <input
              type="file"
              id="images"
              className="border border-gray-300 rounded-lg text-base w-full h-10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          <div className="flex flex-col col-span-1 md:col-span-2">
            <label
              htmlFor="courseContent"
              className="mb-1 font-light text-gray-700"
            >
              Course Content
            </label>
            <textarea
              id="courseContent"
              rows="4"
              className="border border-gray-300 p-2 rounded-lg text-base w-full h-28 resize-none"
              placeholder="Enter course content"
            ></textarea>
          </div>

          <div className="flex justify-end col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              className="bg-[#ea7b30] text-white py-2 px-4 rounded-lg hover:bg-[#d96d1e] text-base"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
