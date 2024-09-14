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
          setDisplayedText((prev) => prev + currentString[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, speed);

        return () => clearTimeout(charTimer);
      } else {
        const pauseTimer = setTimeout(() => {
          setIsPaused(true);
          const nextTextTimer = setTimeout(() => {
            setDisplayedText(""); // Clear displayed text
            setCharIndex(0);
            setTextIndex((prev) => prev + 1);
            setIsPaused(false);
          }, pause);

          return () => clearTimeout(nextTextTimer);
        }, pause);

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
  }, [charIndex, textIndex, text, speed, pause, isPaused]);

  return <div>{displayedText}</div>;
};

const Writer2 = () => {
  const text = [
    "Join us in revolutionizing education in Rwanda!!!",
  ];
  const speed = 115; // Speed in milliseconds
  const pause = 1030; // Pause in milliseconds

  return (
    <div className="text-white text-2xl">
      <WordByWordWriter text={text} speed={speed} pause={pause} />
    </div>
  );
};

export default Writer2;
