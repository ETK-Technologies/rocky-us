"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Typewriter({
  text,
  className,
  speed = 100,
  waitTime = 1000,
  deleteSpeed = 50,
  cursorChar = "|",
}) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const firstRun = useRef(true);

  // Blink the cursor
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  // Typing effect
  useEffect(() => {
    // If it's an array of text to cycle through
    if (Array.isArray(text)) {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }

      const currentText = text[index];

      if (!reverse && subIndex < currentText.length) {
        // Typing forward
        const timer = setTimeout(() => {
          setDisplayText((prev) => prev + currentText[subIndex]);
          setSubIndex(subIndex + 1);
        }, speed);
        return () => clearTimeout(timer);
      }

      if (!reverse && subIndex === currentText.length) {
        // Finished typing current word
        const timer = setTimeout(() => {
          setReverse(true);
        }, waitTime);
        return () => clearTimeout(timer);
      }

      if (reverse && subIndex > 0) {
        // Deleting
        const timer = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
          setSubIndex(subIndex - 1);
        }, deleteSpeed);
        return () => clearTimeout(timer);
      }

      if (reverse && subIndex === 0) {
        // Ready for next word
        const nextIndex = (index + 1) % text.length;
        setReverse(false);
        setIndex(nextIndex);
      }
    } else {
      // If it's a single text string
      if (subIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => prev + text[subIndex]);
          setSubIndex(subIndex + 1);
        }, speed);
        return () => clearTimeout(timer);
      }
    }
  }, [text, index, subIndex, reverse, speed, waitTime, deleteSpeed]);

  return (
    <>
      <span className={className}>{displayText}</span>
      {showCursor && <span className="animate-pulse">{cursorChar}</span>}
    </>
  );
}
