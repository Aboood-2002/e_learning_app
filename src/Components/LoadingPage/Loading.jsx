import React from "react";
import Lottie from "lottie-react";
import rabbitAnimation from "../../Assets/rabbet.json"; // Adjust the path if needed
import "./Loading.css"; // Import the CSS file

const Loading = () => {
  return (
    <div className="loading-container">
      <Lottie animationData={rabbitAnimation} loop={true} className="animation" />
      <div className="loading-bar"></div> {/* Red loading line */}
    </div>
  );
};

export default Loading;
