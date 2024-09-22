import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import { Notify } from "notiflix";
import { MdOutlinePlayLesson } from "react-icons/md";
import { MdOutlineNotificationsNone } from "react-icons/md";
function CreateCourse() {
  const [loading, setLoading] = useState(false); // Loading state
  const [validationError, setValidationError] = useState(""); // State for validation error

  let userToken = JSON.parse(localStorage.getItem("userToken"));
  let token = userToken?.access_token;
  let username = userToken?.user?.lastname;
  let usernames = userToken?.user?.firstname;
  let email = userToken?.user?.email;
  let role = userToken?.user?.role;
  let dept = userToken?.user?.instructor_department;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 const onsubmit = async (data) => {
   setLoading(true);
   setValidationError("");

   const passhint = JSON.parse(localStorage.getItem("userToken"));
   const key = passhint?.user?.tokens?.accessToken;

   const {
     courseTitle,
     videos,
     documents,
     images,
     courseContent,
     program_title,
   } = data;

   if (program_title !== dept) {
     setValidationError(
       `The selected program title must match your department: ${dept}`
     );
     setLoading(false);
     return;
   }

   const formData = new FormData();
   formData.append("videos", videos[0]);
   formData.append("documents", documents[0]);
   formData.append("images", images[0]);
   formData.append("courseContent", courseContent);
   formData.append("program_title", program_title);
   formData.append("courseTitle", courseTitle);

   try {
     const res = await axios.post(
       `https://future-focus-rwanada.onrender.com/course/createCourse`,
       formData,
       {
         headers: {
           "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${key}`,
         },
       }
     );

     // Check if the response contains a success message
     if (res.data && res.data.message === "Success") {
       Notify.success("Course created successfully!");
       reset(); // Reset the form fields
     } else {
       Notify.failure("Failed to create course. Please try again.");
     }
   } catch (error) {
     console.log(error);
     Notify.failure("An error occurred. Please try again.");
   } finally {
     setLoading(false);
   }
 };



  return (
    <div className=" ml-52 pt-24 pb-12">
      <div className="pl-8 pb-2 text-2xl">
        Welcome Dear Instructor {username}{" "}
      </div>

      <div className="flex flex-row items-center gap-2 pl-7">
        <MdOutlineNotificationsNone className="text-orange-500" />
        <div>
          Your department is {dept}. Please select it carefully when filling out
          the form. If it's not listed, contact the administrator.
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 mx-4 sm:mx-0">
        <div className="flex flex-row items-center justify-between">
          <div className="text-2xl font-extralight mb-6 ">Create Course</div>
          <MdOutlinePlayLesson className="text-2xl  cursor-pointer text-gray-300" />
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit(onsubmit)}
        >
          <div className="flex flex-col">
            <label
              htmlFor="courseTitle"
              className="mb-1 font-light text-gray-700"
            >
              Course Title
            </label>
            <input
              type="text"
              name="courseTitle"
              className="border border-gray-300 p-2 rounded-lg text-base w-full h-10"
              placeholder="Enter course title"
              {...register("courseTitle", { required: true })}
            />
            {errors.courseTitle && (
              <p className="text-red-500 text-sm">Course title is required.</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="program" className="mb-1 font-light text-gray-700">
              Program
            </label>
            <select
              type="text"
              name="program_title"
              {...register("program_title", { required: true })}
              className="border border-gray-300 p-2 rounded-lg text-base w-full h-10"
            >
              <option value="">Select Program title</option>
              <option value="Robotics">Robotics</option>
              <option value="Electronics & Embedded Systems">
                Electronics & Embedded Systems
              </option>
              <option value="Computer Programming">Computer Programming</option>
              <option value="3D Designing & 3D Printing">
                3D Designing & 3D Printing
              </option>
              <option value="Mathematics of Problems Solving">
                Mathematics of Problems Solving
              </option>
            </select>
            {errors.program_title && (
              <p className="text-red-500 text-sm">Program title is required.</p>
            )}
            {validationError && (
              <p className="text-red-500 text-sm">{validationError}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="videos" className="mb-1 font-light text-gray-700">
              Videos
            </label>
            <input
              type="file"
              name="videos"
              {...register("videos", { required: true })}
              className="border border-gray-300 rounded-lg text-base w-full h-10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {errors.videos && (
              <p className="text-red-500 text-sm">Videos are required.</p>
            )}
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
              name="documents"
              {...register("documents", { required: true })}
              className="border border-gray-300 rounded-lg text-base w-full h-10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {errors.documents && (
              <p className="text-red-500 text-sm">Documents are required.</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="images" className="mb-1 font-light text-gray-700">
              Images
            </label>
            <input
              type="file"
              name="images"
              {...register("images", { required: true })}
              className="border border-gray-300 rounded-lg text-base w-full h-10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {errors.images && (
              <p className="text-red-500 text-sm">Images are required.</p>
            )}
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
              {...register("courseContent", { required: true })}
            ></textarea>
            {errors.courseContent && (
              <p className="text-red-500 text-sm">
                Course content is required.
              </p>
            )}
          </div>

          <div className="flex justify-end col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              className={`bg-[#ea7b30] text-white py-2 px-4 rounded-lg text-base ${
                loading ? "cursor-pointer" : "hover:bg-[#4f1930]"
              }`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Creating..." : "Create"} {/* Show loading text */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
