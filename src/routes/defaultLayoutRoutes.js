import React from "react";
import ContactUs from "../components/defaultComponents/contactUs/contactUs";
import Home from "../components/defaultComponents/home/home";
import SignUp from "../components/defaultComponents/signUp/signUp";

import { _Route as Route } from "../components/layouts/default/default";

const defaultLayoutRoutes = [
  { path: "/contact-us", component: ContactUs },
  { path: "/home", component: Home },
  { path: "/sign-up", component: SignUp },
];

export const setDefaultLayoutRoutes = () => {
  return defaultLayoutRoutes.map((r) => {
    return (
      <Route
        key={r.path}
        path={r.path}
        component={r.component}
        exact={r.exact}
      />
    );
  });
};
