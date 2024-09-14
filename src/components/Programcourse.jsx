import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Programcourse() {
  const { Pid } = useParams();
  const [program, setProgram] = useState({});
  const navigate = useNavigate();

  const navigateRegistration = (id) => {
    navigate(`/studentregistration/${id}`);
  };

  useEffect(() => {
    const singleProgram = async () => {
      const userToken = JSON.parse(localStorage.getItem("userToken"));
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

  return (
    <div className="flex flex-col">
      <div
        className="relative bg-cover bg-center h-[80vh] w-full"
        style={{
          backgroundImage: `url(${program.images})`,
        }}
      >
        <div className="text-white text-3xl sm:text-4xl lg:text-6xl font-bold pt-40 pl-8 pr-8 sm:pt-64 sm:pl-20 sm:pr-20">
          {program?.program_title}
        </div>
        <div className="pt-2 sm:pt-4 pl-8 pr-8 sm:pl-20 sm:pr-20">
          <button
            type="button"
            className="bg-[#ea7b30] text-white rounded-full py-2 px-6 text-base font-medium transition-colors hover:bg-[#4f1930]"
            onClick={() => navigateRegistration(Pid)}
          >
            Enroll
          </button>
        </div>
      </div>

      <div className="pt-8 sm:pt-16 pl-8 pr-8 sm:pl-20 sm:pr-20">
        <div className="text-xl sm:text-2xl lg:text-3xl font-medium border-l-4 border-[#ea7b30] pl-4 mb-8">
          Program Details For{" "}
          <span className="text-[#ea7b30]">{program?.program_title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <img
            src={program.images}
            alt="Program"
            className="w-full lg:w-[30rem] h-[20.7rem] object-cover"
          />
          <div className="flex flex-col gap-4">
            <div className="shadow-md p-6 rounded-md bg-white max-w-lg">
              {program.programContent}
            </div>
            <div className="px-5 py-14">
              <button
                type="button"
                className="bg-[#ea7b30] w-24 text-white rounded-lg py-2 px-2 text-base font-medium transition-colors hover:bg-[#4f1930]"
                onClick={() => navigateRegistration(Pid)}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Programcourse;
