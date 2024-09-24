import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify, Loading } from "notiflix";

function RequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false); // Loading state

  const onSubmit = async (data) => {
    const { email } = data;
    setLoading(true); // Set loading state to true when request starts

    try {
      const res = await axios.post(
        "https://future-focus-rwanada.onrender.com/password/requestReset",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Success notification
      if (res.data.success) {
        Notify.success("Password reset link sent to your email.");
      } else {
        Notify.failure(res.data.message || "Failed to send email.");
      }
    } catch (error) {
      // Error notification
      Notify.failure("Error occurred. Please try again.");
      console.log(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Request Password Reset
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            {...register("email", { required: true })}
            className={`w-full p-3 border rounded-lg focus:outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-full"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RequestForm;
