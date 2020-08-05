import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="container">
        <h2>Wooops...</h2>
        <div>The page you've been looking for does not exist.</div>
        <div className="row">
          <Link to="/home" className="btn btn-primary mr-3">
            Home
          </Link>

          <Link to="/dashboard" className="btn btn-primary">
            Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
