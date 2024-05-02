import React, { useState } from "react";
import "./SpinWheel.css";

const SpinWheel = () => {
  const [number, setNumber] = useState(Math.ceil(Math.random() * 1) + 5000);
  const [showOverlay, setShowOverlay] = useState(false);
  const [result, setResult] = useState("");

  const spinWheel = () => {
    const container = document.querySelector(".container");
    const angle = number % 360;
    let index = Math.floor(angle / 45);
    if (angle < 0) index += 8; 
    const visibleDiv = document.querySelector(`.container div:nth-child(${index + 1})`);

    if (visibleDiv) {
      const resultText = visibleDiv.textContent;
      console.log("Result:", resultText);
      setResult(resultText);
      setShowOverlay(true);

      if (resultText !== "Catch") {
        setShowOverlay(false); 
      }
    } else {
      console.log("Error: div not found");
    }

    setNumber(number + Math.ceil(Math.random() * 1) + 5000); 
    container.style.transform = `rotate(${number}deg)`;
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <div>
      <button id="spin" onClick={spinWheel}>Spin</button>
      <span className="arrow"></span>
      <div className="container">
        <div className="one">run</div>
        <div className="two">run</div>
        <div className="three">run</div>
        <div className="four">run</div>
        <div className="five">run</div>
        <div className="six">run</div>
        <div className="seven">run</div>
        <div className="eight" style={{ color: "white" }}>Catch</div>
      </div>
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Result: {result}</h2>
            <button onClick={closeOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
