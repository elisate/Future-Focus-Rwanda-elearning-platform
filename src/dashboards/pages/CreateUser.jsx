import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { Notify } from "notiflix";

const CreateUser = ({ handleadd }) => {
  const [loading, setLoading] = useState(false); // State for loading
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    const {
      firstname,
      lastname,
      email,
      role,
      password,
      gender,
      instructor_department,
    } = data;
    const formData = new FormData();
    setLoading(true); // Set loading state to true when request starts
    try {
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("gender", gender);
      formData.append("instructor_department", instructor_department);

      const res = await axios.post(
        "https://future-focus-rwanada.onrender.com/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      


      // Success notification
      Notify.success("User created successfully!");
      

      // Reset form after successful submission
      reset();
    } catch (error) {
      // Error notification
      Notify.failure("Failed to create user. Please try again.");
      console.log(error);
    } finally {
      setLoading(false); // Set loading state back to false when request is complete
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg relative mx-4 sm:mx-auto">
          <div className="flex flex-row items-center justify-between">
            <div className="text-2xl font-extralight mb-6">Register User</div>
            <MdClose
              onClick={handleadd}
              className=" text-gray-600 hover:text-gray-900 font-bold text-xl cursor-pointer"
            />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
            {/* Grid layout for inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-opacity-50"
                  {...register("firstname", { required: true })}
                />
              </div>

              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-opacity-50"
                  {...register("lastname", { required: true })}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-opacity-50"
                  {...register("email", { required: true })}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-opacity-50"
                  {...register("password", { required: true })}
                />
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-opacity-50"
                  {...register("gender", { required: true })}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="Instructor Department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Instructor Department
                </label>
                <select
                  name="instructor_department"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-opacity-50"
                  {...register("instructor_department", { required: true })}
                >
                  <option value="">Select Department</option>
                  <option value="Robotics">Robotics</option>
                  <option value="Electronics & Embedded Systems">
                    {" "}
                    Electronics & Embedded Systems
                  </option>
                  <option value="Computer Programming">
                    Computer Programming
                  </option>
                  <option value="3D Designing & 3D Printing">
                    3D Designing & 3D Printing
                  </option>
                  <option value="Mathematics of Problems Solving">
                    {" "}
                    Mathematics of Problems Solving
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="User Role"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Role
                </label>
                <input
                  type="text"
                  name="role"
                  value="isInstructor"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-opacity-50"
                  {...register("role", { required: true })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#ea7b30] text-white  py-2 px-4 rounded-md hover:bg-[#4f1930] transition duration-300"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Loading..." : "Create"}{" "}
              {/* Show Loading... or Create */}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
