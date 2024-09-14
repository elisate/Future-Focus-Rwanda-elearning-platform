import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify } from "notiflix";

function SignUp() {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { firstname, lastname, email, password } = data;
    setIsLoading(true); // Start loading
    try {
      const formData = {
        firstname,
        lastname,
        email,
        password,
      };

      const res = await axios.post(
        "https://future-focus-rwanada.onrender.com/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        Notify.success("Account created successfully!");
        navigate("/login");
      } else {
        Notify.failure("Failed to create an account. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Notify.failure("Email already exists. Please use a different email.");
      } else {
        Notify.failure("An error occurred. Please try again later.");
      }
      console.log(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-8 md:p-10 lg:p-20">
      <div className="flex flex-col items-center w-full max-w-lg mx-auto bg-gray-100 border border-gray-300 rounded-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <img src="logo_official.png" className="w-40 h-20 mb-4" alt="Logo" />
          <div className="text-xl font-normal mt-[-0.5rem] ">
            Create Your Profile To FFR System
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">First Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="First name"
                  {...register("firstname", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters",
                    },
                  })}
                  className="pl-10 py-2 border border-gray-300 rounded-md w-full"
                  disabled={isLoading}
                />
              </div>
              {errors.firstname && (
                <span className="text-red-500 text-xs">
                  {errors.firstname.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">Last Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastname", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters",
                    },
                  })}
                  className="pl-10 py-2 border border-gray-300 rounded-md w-full"
                  disabled={isLoading}
                />
              </div>
              {errors.lastname && (
                <span className="text-red-500 text-xs">
                  {errors.lastname.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="pl-10 py-2 border border-gray-300 rounded-md w-full"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="pl-10 py-2 border border-gray-300 rounded-md w-full"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-[#4f1930] transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
