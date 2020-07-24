import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import authService from "../../../services/authService";
import userService from "../../../services/userService";

const Navigation = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const auth = authService.getCurrentUser();
    const fetchData = async () => {
      if (auth) {
        const { data: user } = await userService.getUser(auth._id);

        setUser(user);
      }
    };

    fetchData();
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Party Statistics</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavItem className="nav-link" as={NavLink} to="/home">
            Home
          </NavItem>
          <NavItem className="nav-link" as={Link} to="/">
            Pricing
          </NavItem>
        </Nav>
        {user.name && (
          <Nav>
            <NavItem className="nav-link">Welcome {user.name}</NavItem>
            <NavDropdown title={"Settings "} id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/dashboard">
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">
                Log out
              </NavDropdown.Item>
            </NavDropdown>
            <NavItem className="nav-link" as={NavLink} to="/contact-us">
              Contact Us
            </NavItem>
          </Nav>
        )}
        {!user.name && (
          <Nav>
            <NavItem className="nav-link" as={NavLink} to="/login">
              Sign In
            </NavItem>
            <NavItem className="nav-link" as={NavLink} to="/contact-us">
              Contact Us
            </NavItem>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
