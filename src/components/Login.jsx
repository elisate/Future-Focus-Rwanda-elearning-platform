import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify } from "notiflix";

function Login() {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    setIsLoading(true); // Start loading
    try {
      const res = await axios.post(
        "https://future-focus-rwanada.onrender.com/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        Notify.success("Login successful!");
        const userToken = res.data;
        localStorage.setItem("userToken", JSON.stringify(userToken));

        const role = userToken.user.role;

        if (role === "isAdmin") {
          navigate("/dashboard");
        } else {
          navigate("/landing");
        }
      } else {
        Notify.failure("Login failed. Please check your credentials.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Notify.failure("Invalid credentials. Please try again.");
      } else if (error.response && error.response.status === 404) {
        Notify.failure("User not found. Please sign up.");
      } else {
        Notify.failure("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="pt-4 px-4 sm:px-6 lg:px-8">
      <form
        className="flex flex-col max-w-md mx-auto p-6 sm:p-8 border border-gray-300 rounded-lg bg-gray-100 shadow-md box-border"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center mb-4">
          <img
            src="logo_official.png"
            className="w-24 h-16 sm:w-32 sm:h-20"
            alt="Logo"
          />
          <div className="text-lg sm:text-xl font-normal mt-[-0.5rem] mb-6">
            Welcome Back User!!!
          </div>
        </div>

        <div className="flex flex-col w-full mb-4">
          <label className="font-normal mb-2 text-sm sm:text-base">Email</label>
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-2 text-gray-500" />
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
              disabled={isLoading} // Disable inputs when loading
              className="pl-10 py-2 border border-gray-300 rounded-md text-sm sm:text-base w-full placeholder-gray-500"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col w-full mb-4">
          <label className="font-normal mb-2 text-sm sm:text-base">
            Password
          </label>
          <div className="relative flex items-center">
            <FaLock className="absolute left-2 text-gray-500" />
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
              disabled={isLoading} // Disable inputs when loading
              className="pl-10 py-2 border border-gray-300 rounded-md text-sm sm:text-base w-full placeholder-gray-500"
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="my-4">
          <Link
            to="/forgot-password"
            className="text-black hover:underline text-sm sm:text-base"
          >
            Forgot Password?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            className="w-full text-white bg-orange-500 rounded-md border border-transparent py-2 px-4 text-sm sm:text-base font-medium cursor-pointer transition-colors duration-300 hover:bg-[#4f1930]"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>

        <div className="mt-4 text-sm sm:text-base">
          Don't have an account?{" "}
          <Link to="/signIn">
            <span className="font-bold text-black cursor-pointer hover:underline">
              Sign up
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
