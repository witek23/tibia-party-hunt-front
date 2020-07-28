import React from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./custom.css";
import "./App.css";
import Home from "./components/home";
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
import Characters from "./components/dashboardComponents/characters/characters";
import Character from "./components/dashboardComponents/characters/character";
import AddCharacter from "./components/dashboardComponents/characters/addCharacter";
import NotFound from "./components/notFound";
import Parties from "./components/dashboardComponents/party/parties";
import Party from "./components/dashboardComponents/party/party";
import AddParty from "./components/dashboardComponents/party/addParty";
import SignUp from "./components/signUp";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Switch>
        <Redirect path="/" exact to="/home" />

        <DashboardLayout._Route path="/hunts" component={Hunts} />

        <EmptyLayout._Route path="/not-found" component={NotFound} />
        <EmptyLayout._Route path="/logout" component={Logout} />
        <EmptyLayout._Route path="/login" component={Login} />

        <DefaultLayout._Route path="/sign-up" component={SignUp} />
        <DefaultLayout._Route path="/home" component={Home} />

        <ProtectedRoute
          path="/dashboard/parties/add-party"
          layout={DashboardLayout.Layout}
          component={AddParty}
        />
        <ProtectedRoute
          path="/dashboard/parties/:id"
          layout={DashboardLayout.Layout}
          component={Party}
        />
        <ProtectedRoute
          path="/dashboard/characters/add-character"
          layout={DashboardLayout.Layout}
          component={AddCharacter}
        />
        <ProtectedRoute
          path="/dashboard/parties"
          layout={DashboardLayout.Layout}
          component={Parties}
        />
        <ProtectedRoute
          path="/dashboard/characters/:id"
          layout={DashboardLayout.Layout}
          component={Character}
        />
        <ProtectedRoute
          path="/dashboard/characters"
          layout={DashboardLayout.Layout}
          component={Characters}
        />
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
