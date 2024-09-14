import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UserDashboard() {
  const { Pid } = useParams();
  const navigate = useNavigate();
  const navigateSingleCourse = (courseId) => {
    navigate(`/viewCourse/${courseId}`);
  };

  const [course, setCourse] = useState([]);

  useEffect(() => {
    const getcourse = async () => {
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const token = userToken?.user?.tokens?.accessToken;
      try {
        const response = await axios.get(
          "https://future-focus-rwanada.onrender.com/student/student/courses",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourse(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getcourse();
  }, []);

  const groupedCourses = course.reduce((acc, curr) => {
    if (!acc[curr.program_title]) {
      acc[curr.program_title] = [];
    }
    acc[curr.program_title].push(curr);
    return acc;
  }, {});

  return (
    <div className="px-6 lg:px-14 sm:px-6 pt-6 sm:pt-10 md:pt-12 lg:pt-32 pb-8 flex flex-col gap-6 sm:gap-8 lg:gap-12 max-w-screen-lg mx-auto">
      {Object.keys(groupedCourses).map((programTitle) => (
        <div key={programTitle}>
          <div className="text-lg sm:text-xl lg:text-2xl font-medium pb-4 sm:pb-6 pt-16 sm:pt-16 lg:pb-6 text-center sm:text-left">
            {programTitle} <span className="text-[#ea7b30]">Courses</span>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 justify-center sm:justify-start">
            {groupedCourses[programTitle].map((item) => (
              <div
                key={item._id}
                className="cursor-pointer border border-[#ddd] rounded-lg overflow-hidden bg-white shadow-md transition-transform transform hover:translate-y-[-14px] flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[250px]"
                onClick={() => navigateSingleCourse(item._id)}
              >
                <img
                  src={item.images[0]}
                  className="w-full h-40 sm:h-48 lg:h-60 object-cover"
                  alt={item.courseTitle}
                />
                <div className="pt-4 text-base sm:text-lg font-medium">
                  {item.courseTitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserDashboard;
