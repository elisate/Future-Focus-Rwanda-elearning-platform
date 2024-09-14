import React from "react";
import { CgArrowLongRight } from "react-icons/cg";
import { mycontext } from "../fetch/ContextProvider";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";

function Programs() {
  const { program } = mycontext();
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const token = userToken?.user?.tokens?.accessToken;
    if (!token) {
      Notify.warning("Please log in to enroll in a program");
      navigate("/login");
    } else {
      navigate(`/sprogram/${id}`);
    }
  };

  return (
    <div className="pt-28 pb-8 px-6 sm:px-10 lg:px-20 max-w-screen-xl mx-auto bg-white">
      <div className="text-center text-xl md:text-2xl font-semibold mb-10">
        <span className="border-b-2 border-[#ea7b30]">Join</span> Our Exciting
        Programs Today!
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {program?.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-md overflow-hidden transition-transform duration-300 hover:translate-y-[-14px] cursor-pointer"
          >
            <img
              src={item.images}
              className="w-full h-48 sm:h-64 object-cover"
              alt={item.program_title}
            />
            <div className="p-4">
              <div className="text-lg font-medium text-gray-800 text-center mb-2">
                {item.program_title}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                {item.programContent}
              </div>
              <div
                className="flex items-center text-[#ea7b30] hover:text-[#4f1930] cursor-pointer"
                onClick={() => handleNavigate(item?._id)}
              >
                <span className="mr-2">Enroll Now</span>
                <CgArrowLongRight />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Programs;
