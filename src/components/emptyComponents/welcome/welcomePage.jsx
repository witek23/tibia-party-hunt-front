import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const WelcomePage = () => {
  return (
    <div className="main">
      <div className="flex-container">
        <div className="text-container">
          <p className="p-2 text-center" style={{ fontSize: "35px" }}>
            Make your hunts easier
          </p>
          <p className="p-2 text-center" style={{ fontSize: "35px" }}>
            cos tam kurwa mac
          </p>
        </div>
        <Link className="button btn-container" to="/home">
          Enter Website
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
