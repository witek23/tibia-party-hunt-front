import React from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Redirect, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Login from "./components/login";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect path="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
