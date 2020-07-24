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

import Dashboard from "./components/dashboardComponents/dashboard/dashboard";
import Hunts from "./components/dashboardComponents/hunts/hunts";
import MyAccount from "./components/myAccount";
import Login from "./components/login";
import Logout from "./components/logout";
import Invitations from "./components/dashboardComponents/invitations/invitations";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Switch>
        <Redirect path="/" exact to="/home" />
        <DashboardLayout._Route path="/hunts" component={Hunts} />
        <EmptyLayout._Route path="/logout" component={Logout} />
        <EmptyLayout._Route path="/login" component={Login} />
        <DefaultLayout._Route path="/home" component={Home} />

        <ProtectedRoute
          path="/dashboard/invitations"
          layout={DashboardLayout.Layout}
          component={Invitations}
        />
        <ProtectedRoute
          path="/dashboard"
          layout={DashboardLayout.Layout}
          component={Dashboard}
        />
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
