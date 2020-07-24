import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./sidebar.css";

const paths = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "My Account", path: "/my-account" },
  { label: "Hunts", path: "/hunts" },
  { label: "Home", path: "/home" },
];

let active = "/dashboard";

const Sidebar = () => {
  const handleActive = (_path) => {
    active = _path;
  };

  return (
    <>
      <Nav defaultActiveKey="/home" className="sidebar-wrapper flex-column">
        <Nav.Item className="sidebar-brand">Party Stats</Nav.Item>
        {paths.map((p) => (
          <Nav.Link
            className={
              p.path === active ? "sidebar-item-active" : "sidebar-item"
            }
            key={p.path}
            onClick={() => handleActive(p.path)}
            as={Link}
            to={p.path}
          >
            {p.label}
          </Nav.Link>
        ))}
      </Nav>
    </>
  );
};

export default Sidebar;
