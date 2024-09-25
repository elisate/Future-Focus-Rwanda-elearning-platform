import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify } from "notiflix";


function AddProgram({ handleProgram }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false); // State to track loading

  const onsubmit = async (data) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const token = userToken?.user?.tokens?.accessToken;
    const { images, program_title, programContent } = data;
    const formData = new FormData();

    try {
      setLoading(true); // Start loading
      formData.append("images", images[0]); // Ensure to get the file from the array
      formData.append("program_title", program_title);
      formData.append("programContent", programContent);

      const res = await axios.post(
        "https://future-focus-rwanada.onrender.com/program/createProgram",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Notify user of success
      Notify.success("Program added successfully!");
      reset();
    } catch (error) {
      console.log(error);
      // Notify user of error
      Notify.failure("Failed to add program. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[2000] bg-[rgba(50,49,49,0.5)]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-extralight">Add New Program</div>
          <div className="absolute top-4 right-4 text-2xl cursor-pointer hover:text-[#4f1930]">
            <IoClose onClick={handleProgram} />
          </div>
        </div>

        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-4">
            <label htmlFor="images" className="block font-semibold mb-2">
              Program Image
            </label>
            <input
              type="file"
              id="images"
              placeholder="Add program image"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
              {...register("images", { required: true })}
            />
            {errors.images && (
              <span className="text-red-500 text-sm">Image is required</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="program_title" className="block font-semibold mb-2">
              Program Title
            </label>
            <input
              type="text"
              id="program_title"
              placeholder="Enter program title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
              {...register("program_title", { required: true })}
            />
            {errors.program_title && (
              <span className="text-red-500 text-sm">Title is required</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="programContent"
              className="block font-semibold mb-2"
            >
              Program Content
            </label>
            <textarea
              id="programContent"
              placeholder="Enter program content"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-base resize-none"
              {...register("programContent", { required: true })}
              rows="4"
            />
            {errors.programContent && (
              <span className="text-red-500 text-sm">Content is required</span>
            )}
          </div>

          {/* Display loading indicator while submitting */}
          {loading ? (
            <button
              type="button"
              className="bg-[#ea7b30] text-white rounded-md px-4 py-2 font-medium cursor-not-allowed w-full"
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-[#ea7b30] text-white rounded-md px-4 py-2 font-medium w-full hover:bg-[#4f1930] transition-colors"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddProgram;
