import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const WelcomePage = () => {
  return (
    <div className="main">
      <h3>Welcome to super page by Witek</h3>
      <button className="btn btn-info">Go to the website</button>
    </div>
  );
};

export default WelcomePage;
