import React, { useState, useEffect } from "react";
const WordByWordWriter = ({ text, speed, pause }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (textIndex < text.length && !isPaused) {
      const currentString = text[textIndex];

      if (charIndex < currentString.length) {
        const charTimer = setTimeout(() => {
          setDisplayedText(displayedText + currentString[charIndex]);
          setCharIndex(charIndex + 1);
        }, speed);

        return () => clearTimeout(charTimer);
      } else {
        const pauseTimer = setTimeout(() => {
          setIsPaused(true);
          const nextTextTimer = setTimeout(() => {
            setDisplayedText(""); // Clear displayed text
            setCharIndex(0);
            setTextIndex(textIndex + 1);
            setIsPaused(false);
          }, pause);

          return () => clearTimeout(nextTextTimer);
        }, speed);

        return () => clearTimeout(pauseTimer);
      }
    } else if (textIndex >= text.length) {
      // Reset to start over
      const resetTimer = setTimeout(() => {
        setTextIndex(0);
        setCharIndex(0);
        setDisplayedText("");
        setIsPaused(false);
      }, pause);

      return () => clearTimeout(resetTimer);
    }
  }, [charIndex, textIndex, text, speed, pause, isPaused, displayedText]);

  return <div>{displayedText}</div>;
};
const Writer = () => {
  const text = [
    "E-learning Platform",
    "Innovative Learning Solutions",
    "Innovative Tech Enthusiast",
  ];
  const speed = 118; // Speed in milliseconds
  const pause = 1010; // Pause in milliseconds

  return (
    <div className="text-[#ea7b30]">
      <WordByWordWriter text={text} speed={speed} pause={pause} />
    </div>
  );
};

export default Writer;
