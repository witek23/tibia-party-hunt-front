import React from "react";
import { Route } from "react-router-dom";

const Layout = ({ children }) => {
  return <>{children}</>;
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
