import React from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Redirect, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./custom.css";
import "./App.css";
import Navbar from "./components/navbar";
import Login from "./components/login";
import SignUp from "./components/signUp";
import Home from "./components/home";
import MyAccount from "./components/myAccount";
import AddCharacter from "./components/addCharacter";
import Logout from "./components/logout";
import ProtectedRoute from "./components/ProtectedRoute";
import Character from "./components/character";
import CreateParty from "./components/createParty";
import Party from "./components/party";
import ContactUs from "./components/contactUs";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route path="/contact-us" component={ContactUs} />
        <ProtectedRoute path="/my-account/party/:name" component={Party} />
        <ProtectedRoute
          path="/my-account/create-party"
          component={CreateParty}
        />
        <ProtectedRoute
          path="/my-account/characters/:name"
          component={Character}
        />
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
