import React from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Redirect, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/navbar";
import Login from "./components/login";
import SignUp from "./components/signUp";
import Home from "./components/home";
import MyAccount from "./components/myAccount";
import AddCharacter from "./components/addCharacter";
import Logout from "./components/logout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar />
      <Switch>
        <ProtectedRoute
          path="/my-account/add-character"
          component={AddCharacter}
        />
        <ProtectedRoute path="/my-account" component={MyAccount} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Redirect path="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
