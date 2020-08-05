import React from "react";
import NotFound from "../components/emptyComponents/notFound/notFound";
import Logout from "../components/emptyComponents/logout/logout";
import Login from "../components/emptyComponents/login/login";
import WelcomePage from "../components/emptyComponents/welcome/welcomePage";

import { _Route as Route } from "../components/layouts/empty/empty";

const emptyLayoutRoutes = [
  { path: "/not-found", component: NotFound },
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/", component: WelcomePage, exact: true },
];

export const setEmptyLayoutRoutes = () => {
  return emptyLayoutRoutes.map((r) => {
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
