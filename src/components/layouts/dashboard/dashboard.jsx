import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "../../navigation/sidebar/sidebar";
import "./dashboard.css";

const Layout = ({ children }) => {
  return (
    // <Container fluid>
    //   <Row>
    //     <Col xs={2} id="sidebar-wrapper">
    //       <Sidebar />
    //     </Col>
    //     <Col xs={10} id="page-content-wrapper">
    //       {children}
    //     </Col>
    //   </Row>
    // </Container>
    <div className="dashboard-wrapper">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="content-container">{children}</div>
    </div>
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
  _Route: _Route,
  Layout: Layout,
};
