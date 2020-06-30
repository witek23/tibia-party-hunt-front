import React from "react";
import { NavLink } from "react-router-dom";
import auth from "../services/authService";

const Navbar = () => {
  const user = auth.getCurrentUser();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        Navbar
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <NavLink className="nav-link" to={"/"}>
            Home
          </NavLink>
        </ul>
        <ul className="navbar-nav ml-auto">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-link ml-auto" to="/login">
                Sign In
              </NavLink>
              <NavLink className="nav-link ml-auto" to="/sign-up">
                Sign Up
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-link ml-auto" to="/my-account">
                My Account
              </NavLink>
              <NavLink className="nav-link ml-auto" to="/logout">
                Sign Out
              </NavLink>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
