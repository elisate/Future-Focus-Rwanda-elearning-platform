import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BsReplyAll } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify } from "notiflix";

function ReplyContact({ contactId, handlereplymodal }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false); // Loading state

  const onsubmit = async (data) => {
    const { replySubject, replyMessage } = data;

    const formData = new FormData();
    formData.append("contactId", contactId); // Use contactId directly from props
    formData.append("replySubject", replySubject);
    formData.append("replyMessage", replyMessage);

    setLoading(true); // Set loading to true
    try {
      const res = await axios.post(
        `https://future-focus-rwanada.onrender.com/contact/reply`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Notify.success("Reply sent successfully!"); // Notify success
      reset(); // Reset form fields
      handlereplymodal(); // Close the modal after success
    } catch (error) {
      console.log(error);
      Notify.failure("Failed to send reply. Please try again."); // Notify failure
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Overlay */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 text-lg sm:text-2xl">
          {/* Left Section: Icon and Title */}
          <div className="flex flex-row gap-2 items-center">
            <BsReplyAll className="text-gray-800 text-xl sm:text-2xl" />
            <div className="text-gray-800 text-base sm:text-lg lg:text-xl">
              Reply to Contact
            </div>
          </div>

          {/* Right Section: Close Icon */}
          <IoCloseOutline
            className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl cursor-pointer"
            onClick={handlereplymodal}
          />
        </div>

        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-4 hidden">
            <label
              htmlFor="contactId"
              className="block text-gray-700 font-medium mb-2"
            >
              Contact ID
            </label>
            <input
              type="text"
              name="contactId"
              value={contactId}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              {...register("contactId", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="replySubject"
              className="block text-gray-700 font-medium mb-2"
            >
              Reply Subject
            </label>
            <input
              type="text"
              name="replySubject"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              placeholder="Enter reply subject"
              {...register("replySubject", { required: true })}
            />
            {errors.replySubject && (
              <p className="text-red-500">This field is required.</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="replyMessage"
              className="block text-gray-700 font-medium mb-2"
            >
              Reply Message
            </label>
            <textarea
              name="replyMessage"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 resize-none"
              placeholder="Enter your reply message"
              rows="4"
              {...register("replyMessage", { required: true })}
            ></textarea>
            {errors.replyMessage && (
              <p className="text-red-500">This field is required.</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-300 ${
                loading ? " cursor-pointer" : ""
              }`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReplyContact;
