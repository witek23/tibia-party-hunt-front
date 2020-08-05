import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "../../navigation/sidebar/sidebar";
import "./dashboard.css";

export const Layout = ({ children }) => {
  return (
    <div className="dashboard-wrapper">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="content-container">{children}</div>
    </div>
  );
};

export const _Route = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};
