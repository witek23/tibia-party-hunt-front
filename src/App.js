import React from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./custom.css";
import "./App.css";

import { setDefaultLayoutRoutes } from "./routes/defaultLayoutRoutes";
import { setEmptyLayoutRoutes } from "./routes/emptyLayoutRoutes";
import { setProtectedRoutes } from "./routes/protectedRoutes";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Switch>
        {setEmptyLayoutRoutes()}
        {setDefaultLayoutRoutes()}
        {setProtectedRoutes()}

        <Redirect to={"/not-found"} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
