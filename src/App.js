import React from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./custom.css";
import "./App.css";
import Home from "./components/home";
/*
import Navbar from "./components/navbar";

import SignUp from "./components/signUp";

import AddCharacter from "./components/addCharacter";

import ProtectedRoute from "./components/ProtectedRoute";
import Character from "./components/character";
import CreateParty from "./components/createParty";
import Party from "./components/party";
import ContactUs from "./components/contactUs";*/

//////////////////////
import DashboardLayout from "./components/layouts/dashboard/dashboard";
import DefaultLayout from "./components/layouts/default/default";
import EmptyLayout from "./components/layouts/empty/empty";

import ProtectedRoute from "./components/ProtectedRoute";

import MyAccount from "./components/myAccount";
import Login from "./components/login";
import Logout from "./components/logout";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Switch>
        <Redirect path="/" exact to="/home" />
        <EmptyLayout._Route path="/logout" component={Logout} />
        <EmptyLayout._Route path="/login" component={Login} />
        <DefaultLayout._Route path="/home" component={Home} />
        <ProtectedRoute
          path="/my-account"
          layout={DashboardLayout.Layout}
          component={MyAccount}
        />
      </Switch>
    </React.Fragment>
  );
}

export default App;

/*      <Switch>
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

        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Redirect path="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>
      */
