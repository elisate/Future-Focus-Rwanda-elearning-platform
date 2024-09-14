import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
// import "bootstrap/dist/css/bootstrap.min.css";

function ViewCourse() {
  const [videoProgress, setVideoProgress] = useState(0);
  const [documentProgress, setDocumentProgress] = useState(0);
  const [contentProgress, setContentProgress] = useState(0);

  const [singlecourse, setSinglecourse] = useState({});
  const [activeSection, setActiveSection] = useState("video");
  const [completion, setCompletion] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to toggle sidebar visibility
  const { courseId } = useParams();
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const token = userToken?.user?.tokens?.accessToken;

  const videoRef = useRef(null);
  const documentsRef = useRef(null);
  const contentRef = useRef(null);

  // Fetch course data
  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get(
          `https://future-focus-rwanada.onrender.com/student/student/course/${courseId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSinglecourse(response.data);
      } catch (err) {
        console.log("Error fetching course:", err);
      }
    };
    getCourse();
  }, [courseId, token]);

  // Fetch progress data
  useEffect(() => {
    const getProgress = async () => {
      try {
        const response = await axios.get(
          `https://future-focus-rwanada.onrender.com/progress/${userToken.user._id}/${courseId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const progressData = response.data;
        setVideoProgress(progressData.videoProgress || 0);
        setDocumentProgress(progressData.documentProgress || 0);
        setContentProgress(progressData.contentProgress || 0);
        const overallProgress =
          (progressData.videoProgress +
            progressData.documentProgress +
            progressData.contentProgress) /
          3;
        setCompletion(overallProgress || 0);
        setActiveSection(determineActiveSection(progressData));
      } catch (err) {
        console.log("Error fetching progress:", err);
      }
    };
    getProgress();
  }, [courseId, token, userToken.user._id]);

  // Determine active section based on progress data
  const determineActiveSection = (progressData) => {
    if (progressData.videoProgress < 100) return "video";
    if (progressData.documentProgress < 100) return "documents";
    if (progressData.contentProgress < 100) return "content";
    return "video"; // default to video if everything is complete
  };

  // Calculate and update progress when a section is clicked
  const handleSectionClick = async (section) => {
    setActiveSection(section);

    let newVideoProgress = videoProgress;
    let newDocumentProgress = documentProgress;
    let newContentProgress = contentProgress;

    // Update progress only for the clicked section
    if (section === "video" && videoProgress < 100) newVideoProgress = 100;
    if (section === "documents" && documentProgress < 100)
      newDocumentProgress = 100;
    if (section === "content" && contentProgress < 100)
      newContentProgress = 100;

    // Recalculate the overall completion
    const newCompletion =
      (newVideoProgress + newDocumentProgress + newContentProgress) / 3;
    setCompletion(newCompletion);

    // Update the progress states
    setVideoProgress(newVideoProgress);
    setDocumentProgress(newDocumentProgress);
    setContentProgress(newContentProgress);

    // Update progress on the backend
    try {
      await axios.post(
        "https://future-focus-rwanada.onrender.com/progress/update",
        {
          studentId: userToken.user._id,
          courseId,
          videoProgress: newVideoProgress,
          documentProgress: newDocumentProgress,
          contentProgress: newContentProgress,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log("Error updating progress:", err);
    }

    // Scroll to the selected section
    if (section === "video") {
      videoRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "documents") {
      documentsRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "content") {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row pt-32 px-4 lg:px-8">
      {/* Sidebar */}
      <div
        className={`lg:w-1/5 bg-[#f4f4f4] p-4 border-b-2 border-[#ddd] lg:border-b-0 lg:border-r-2 lg:border-[#ddd] lg:fixed lg:top-16 lg:left-0 lg:h-full lg:pt-16 lg:overflow-y-auto ${
          sidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <ul className="list-none p-0">
          <li
            className={`p-4 mb-4 bg-white rounded-md cursor-pointer text-lg transition-colors duration-300 hover:bg-[#ea7b30] hover:text-white shadow-md ${
              activeSection === "video" ? "bg-[#ea7b30] text-white" : ""
            }`}
            onClick={() => handleSectionClick("video")}
          >
            Video
          </li>
          <li
            className={`p-4 mb-4 bg-white rounded-md cursor-pointer text-lg transition-colors duration-300 hover:bg-[#ea7b30] hover:text-white shadow-md ${
              activeSection === "documents" ? "bg-[#ea7b30] text-white" : ""
            }`}
            onClick={() => handleSectionClick("documents")}
          >
            Documents
          </li>
          <li
            className={`p-4 mb-4 bg-white rounded-md cursor-pointer text-lg transition-colors duration-300 hover:bg-[#ea7b30] hover:text-white shadow-md ${
              activeSection === "content" ? "bg-[#ea7b30] text-white" : ""
            }`}
            onClick={() => handleSectionClick("content")}
          >
            Content
          </li>
        </ul>
        <div className="mt-5 w-full px-2">
          <div className="mb-4 text-lg">Course Progress</div>
          <ProgressBar
            now={completion}
            label={`${completion}%`}
            className="bg-[#ea7b30] rounded-2xl text-center text-white"
          />
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`w-full lg:w-3/4 xl:w-2/3 lg:ml-auto p-4 lg:p-8 lg:pl-4 lg:pr-4 lg:pt-8 ${
          sidebarOpen ? "lg:ml-[28%]" : ""
        }`}
      >
        <div ref={videoRef}>
          {activeSection === "video" && (
            <div>
              <video controls className="w-full rounded-lg shadow-md mb-8">
                <source src={singlecourse.videos} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
        <div ref={documentsRef}>
          {activeSection === "documents" && (
            <div className="flex flex-col">
              {singlecourse.documents?.map((doc, index) => (
                <iframe
                  key={index}
                  src={doc}
                  className="w-full h-96 mb-4 rounded-lg shadow-md"
                  title={`Document ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        <div ref={contentRef}>
          {activeSection === "content" && (
            <div className="text-lg leading-relaxed">
              {singlecourse.courseContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
