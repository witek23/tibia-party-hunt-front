import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../../navigation/navbar/navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const _Route = ({ component: Component, ...rest }) => {
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

export default {
  Layout: Layout,
  _Route: _Route,
};
