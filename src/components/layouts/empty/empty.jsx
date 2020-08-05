import React from "react";
import { Route } from "react-router-dom";

export const Layout = ({ children }) => {
  return <>{children}</>;
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
