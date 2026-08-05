import React from "react";
import "./Loader.css";

const Loader = ({ LoadingName }) => {
  return (
    <div className="loader-container">
      <div className="loader-container-pop-cart">
        <div className="loader-container-animation">
          <div className="loader-loading-text"></div>
        </div>

        <h2>{LoadingName}..!!</h2>
      </div>
    </div>
  );
};

export default Loader;