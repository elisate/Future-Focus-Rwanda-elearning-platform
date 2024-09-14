import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Notify } from "notiflix";

function StudentRegistration() {
  const { Pid } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [program, setProgram] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const fname = userToken?.user?.firstname;
  const lname = userToken?.user?.lastname;
  const Email = userToken?.user?.email;

  useEffect(() => {
    const singleProgram = async () => {
      const token = userToken?.user?.tokens?.accessToken;
      try {
        const res = await axios.get(
          `https://future-focus-rwanada.onrender.com/program/getProgramById/${Pid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProgram(res.data);
      } catch (error) {
        console.log("fetching errors", error);
      }
    };
    singleProgram();
  }, [Pid]);

  const onsubmit = async (data) => {
    const token = userToken?.user?.tokens?.accessToken;
    const {
      student_firstname,
      student_lastname,
      student_email,
      program_enrolled_in,
      student_gender,
      student_level_of_education,
      student_country,
      student_district,
    } = data;

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("student_firstname", student_firstname);
      formData.append("student_lastname", student_lastname);
      formData.append("student_email", student_email);
      formData.append("program_enrolled_in", program_enrolled_in);
      formData.append("student_gender", student_gender);
      formData.append("student_level_of_education", student_level_of_education);
      formData.append("student_country", student_country);
      formData.append("student_district", student_district);

      const res = await axios.post(
        "https://future-focus-rwanada.onrender.com/student/studentRegister",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Notify.success("Registration successful!");
      navigate("/studentCourse");
    } catch (error) {
      console.log(error);
      Notify.failure("Registration failed! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto  pt-20 px-4 py-10 md:px-20 lg:px-40">
      <div className="mb-6 text-base font-medium border-l-4 border-orange-600 pl-4 ">
        Please fill out the form and follow the instructions to complete your
        enrollment in{" "}
        <span className="text-orange-600">{program.program_title}</span>
      </div>

      <div className="bg-gray-100 rounded-lg shadow-md p-6 max-w-lg mx-auto">
        <div className="mb-4 text-center text-lg font-semibold">
          <span className="border-b border-orange-600">Student</span>{" "}
          Registration Form
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("student_firstname", {
                required: true,
                validate: (value) =>
                  value === fname || "First name must match the logged-in user",
              })}
              disabled={isLoading}
            />
            {errors.student_firstname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.student_firstname.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("student_lastname", {
                required: true,
                validate: (value) =>
                  value === lname || "Last name must match the logged-in user",
              })}
              disabled={isLoading}
            />
            {errors.student_lastname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.student_lastname.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("student_email", {
                required: true,
                validate: (value) =>
                  value === Email || "Email must match the logged-in user",
              })}
              disabled={isLoading}
            />
            {errors.student_email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.student_email.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">
              Program Enrolled In
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("program_enrolled_in", {
                required: true,
                validate: (value) =>
                  value === program.program_title ||
                  `Program must match the selected program: ${program.program_title}`,
              })}
              disabled={isLoading}
            />
            {errors.program_enrolled_in && (
              <p className="text-red-500 text-sm mt-1">
                {errors.program_enrolled_in.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("student_gender", { required: true })}
              disabled={isLoading}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">
              Level of Education
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("student_level_of_education", { required: true })}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("student_country", { required: true })}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">District</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("student_district", { required: true })}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-md shadow-md hover:bg-orange-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentRegistration;
