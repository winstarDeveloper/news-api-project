import React from "react";

const Preloader = () => {
  return (
    <div className="preloader d-flex align-items-center justify-content-center">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  );
};

export default Preloader;
