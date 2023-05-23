import React, { useEffect, useState } from "react";

const Spinner = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        if (newProgress >= 100) {
          clearInterval(timer);
        }
        return newProgress;
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const spinnerStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "5px solid #097AAE",
    position: "relative",
    overflow: "hidden",
  };

  const fillStyle = {
    width: `${progress}%`,
    height: "100%",
    backgroundColor: "#F7D002",
    position: "absolute",
    top: 0,
    left: 0,
  };

  return (
    <div style={spinnerStyle}>
      <div style={fillStyle}></div>
    </div>
  );
};

export default Spinner;
