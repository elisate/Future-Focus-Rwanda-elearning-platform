import React, { useState, useEffect } from "react";
import Writer from "./Writer";
import { mycontext } from "../fetch/ContextProvider";

function Landing() {
  const { program } = mycontext();

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const cardsPerPage = 3;
  const autoScrollInterval = 10000;

  useEffect(() => {
    const autoScrollTimer = setInterval(() => {
      nextCard();
    }, autoScrollInterval);

    return () => clearInterval(autoScrollTimer);
  }, []);

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % program.length);
  };

  const visibleCards = program.slice(
    currentCardIndex,
    currentCardIndex + cardsPerPage
  );
  if (visibleCards.length < cardsPerPage) {
    visibleCards.push(...program.slice(0, cardsPerPage - visibleCards.length));
  }

  const totalPages = Math.ceil(program.length / cardsPerPage);

  const handleDotClick = (pageIndex) => {
    setCurrentCardIndex(pageIndex * cardsPerPage);
  };

  const cardServices = [
    {
      cardImage: "/C1.jpeg",
      cardTitle: "In-School Program",
      cardDescription:
        "The STEM activities 100% match REB's Curriculum, we are building partnerships with different schools in region so that STEM programs gets into schools basing on Singapore's Teaching Methodology.",
    },
    {
      cardImage: "/D1.jpeg",
      cardTitle: "After School Program",
      cardDescription:
        "The STEM activities 100% match REB's Curriculum, we are building partnerships with different schools in region so that STEM programs gets into schools basing on Singapore's Teaching Methodology.",
    },
    {
      cardImage: "/P1.jpg",
      cardTitle: "Online Learning",
      cardDescription:
        "The STEM activities 100% match REB's Curriculum, we are building partnerships with different schools in region so that STEM programs gets into schools basing on Singapore's Teaching Methodology.",
    },
    {
      cardImage: "/pr1.jpg",
      cardTitle: "Centered Learning",
      cardDescription:
        "The STEM activities 100% match REB's Curriculum, we are building partnerships with different schools in region so that STEM programs gets into schools basing on Singapore's Teaching Methodology.",
    },
    {
      cardImage: "/P1.jpg",
      cardTitle: "Online Learning",
      cardDescription:
        "The STEM activities 100% match REB's Curriculum, we are building partnerships with different schools in region so that STEM programs gets into schools basing on Singapore's Teaching Methodology.",
    },
    {
      cardImage: "/ro1.jpg",
      cardTitle: "Home Coaching",
      cardDescription:
        "The STEM activities 100% match REB's Curriculum, we are building partnerships with different schools in region so that STEM programs gets into schools basing on Singapore's Teaching Methodology.",
    },
  ];

  return (
    <div className="bg-white pb-12">
      <div
        className="bg-cover bg-center bg-no-repeat h-[35rem] w-full flex flex-col items-center justify-center"
        style={{ backgroundImage: 'url("/bg2.jpg")' }}
      >
        <div className="text-white text-2xl font-bold gap-2 flex flex-col sm:flex-row justify-center px-6 sm:px-20 pt-36 sm:pt-56">
          <span>Welcome to Future Focus Rwanda</span>
          <Writer />
        </div>
        <div className="text-white text-base sm:text-lg font-normal text-center pt-12 sm:pt-20 px-6 sm:px-64">
          Join our coding and robotics community and discover how to harness
          your full potential. Develop cutting-edge solutions, collaborate with
          peers, and prepare for a successful career in technology.
        </div>
      </div>

      <div className="pt-12 px-6 sm:px-20">
        <div className="text-xl sm:text-2xl font-bold">
          Future Focus Rwanda Platform
        </div>
        <div className="text-lg sm:text-xl pb-8">Program Categories</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
          {visibleCards.map((item, index) => (
            <div
              key={index}
              className="transition-transform transform hover:translate-y-[-14px] cursor-pointer"
            >
              <img
                src={item.images}
                className="w-full h-48 sm:h-64 object-cover"
              />
              <div className="text-center font-medium pt-4">
                {item.program_title}
              </div>
              <div className="px-4 py-4 box-border">{item.programContent}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-2 pb-4 space-x-2">
          {Array.from({ length: totalPages }, (_, pageIndex) => (
            <span
              key={pageIndex}
              className={`h-[13px] w-[13px] bg-orange-500 rounded-full inline-block cursor-pointer ${
                currentCardIndex / cardsPerPage === pageIndex
                  ? "bg-[#4f1930]"
                  : ""
              }`}
              onClick={() => handleDotClick(pageIndex)}
            ></span>
          ))}
        </div>
      </div>

      <div className="text-center text-xl sm:text-2xl font-semibold">
        Join Us For
      </div>
      <div className="pt-8 px-6 sm:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {cardServices.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={item.cardImage}
              alt="card images"
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="text-center font-medium pt-4">{item.cardTitle}</div>
            <div className="text-center px-4 py-4 box-border">
              {item.cardDescription}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing;
