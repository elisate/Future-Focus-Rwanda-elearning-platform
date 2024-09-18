import React, { useState } from "react";
import Writer2 from "./Writer2";
import { FaPhone } from "react-icons/fa6";
import { AiTwotoneMail } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify } from "notiflix";

function AboutUs() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    const { names, email, subject, message } = data;
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("names", names);
      formdata.append("email", email);
      formdata.append("subject", subject);
      formdata.append("message", message);

      const res = await axios.post(
        `http://localhost:5000/contact/createContact`,
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Notify.success("Your message has been sent successfully!");
      reset();
    } catch (error) {
      Notify.failure("Failed to send your message. Please try again later.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 ">
      {/* Background Image */}
      <div
        className="relative bg-cover bg-center bg-no-repeat h-72 w-full md:h-96"
        style={{ backgroundImage: "url('/about_image.jpg')" }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center px-5 py-32 text-center text-white font-bold">
          <Writer2 />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="text-xl font-medium pt-8 pb-1 px-6 sm:px-10 lg:px-20">
        <span className="border-l-2 border-orange-500 pl-2">
          Future Focus Rwanda
        </span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start pt-3 gap-8 pb-8 px-6 sm:px-10 lg:px-20">
        <img
          src="about2.jpg"
          className="w-90 h-60 md:w-[500px] md:h-[400px]"
          alt="About Us"
        />

        <div className="w-full md:w-[50%]">
          <p className="mb-5">
            Welcome to Future Focus Rwanda. Our passion at Future Focus Rwanda
            is to democratize access to STEAM education in Rwanda. We provide
            world-class STEAM (Science, Technology, Engineering, Arts and
            Mathematics) education to students in the 4 – 16 years age-group.
          </p>
          <p className="mb-5">
            Our focus at FUTURE FOCUS RWANDA are students (in and out of school)
            in Rwanda. We expose students to cutting-edge technologies such as
            Robotics, 3D Printing, Coding in different languages to ensure a
            thorough grounding in STEM subjects. We also introduce technology
            concepts to learners while making their learning experience fun,
            engaging and hands-on with integrative projects.
          </p>
          <p>
            Join us in our mission to inspire the next generation of innovators
            and leaders in Rwanda! At Future Focus Rwanda, we are dedicated to
            shaping a brighter future through cutting-edge education and
            visionary programs. Our commitment is to empower students with the
            skills and knowledge needed to excel in a rapidly evolving world.
           
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row justify-between gap-8 pt-18 pb-20 px-6 sm:px-10 lg:px-20">
        {/* Contact Details */}
        <div className="md:w-1/2">
          <div className="pt-8">
            <div className="text-xl font-medium">
              Contact our team for assistance and support.
            </div>
            <div className="pt-20 text-lg">
              <span className="border-b-2 border-orange-500">Get</span> in touch
              with Future Focus Rwanda today:
            </div>
            <div className="flex flex-col gap-4 pt-8">
              <div className="flex items-center gap-4">
                <FaPhone className="text-white bg-orange-500 p-2 rounded-full hover:bg-red-700" />
                <span className="text-base">+250 788 715 158</span>
              </div>
              <div className="flex items-center gap-4">
                <AiTwotoneMail className="text-white bg-orange-500 p-2 rounded-full hover:bg-red-700" />
                <span className="text-base">stem@futurefocus.rw</span>
              </div>
              <div className="flex items-center gap-4">
                <IoLocationOutline className="text-white bg-orange-500 p-2 rounded-full hover:bg-red-700" />
                <span className="text-base">
                  KIGALI CITY - GASABO - KINYINYA | KG 9 AVE
                </span>
              </div>
              <div className="pt-2 text-base pl-12">
                <span>Learning Centers: Rwanda Build Tech Lab - Kiyovu,</span>
                <br />
                <span>CCR-Gacuriro Vision 2020 Estates.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:w-1/2 pt-12">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Names"
                className="border border-gray-300 p-2 rounded"
                {...register("names", { required: true })}
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 p-2 rounded"
                {...register("email", { required: true })}
              />
              <input
                type="text"
                placeholder="Subject"
                className="border border-gray-300 p-2 rounded"
                {...register("subject", { required: true })}
              />
              <textarea
                placeholder="Message"
                className="border border-gray-300 p-2 rounded resize-none h-32"
                {...register("message", { required: true })}
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white p-2 rounded hover:bg-[#4f1930] transition duration-300"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
