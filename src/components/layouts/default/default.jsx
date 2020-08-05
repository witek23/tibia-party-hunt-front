import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../../navigation/navbar/navbar";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
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
