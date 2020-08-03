import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./sidebar.css";

const columns = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Characters", path: "/dashboard/characters" },
  { label: "Parties", path: "/dashboard/parties" },
  { label: "Home", path: "/home" },
];

class Sidebar extends Component {
  state = {
    activeLink: "",
    paths: columns,
  };

  componentDidMount = () => {
    this.setState({ activeLink: window.location.pathname });
  };

  handleActive = (path) => {
    this.setState({ activeLink: path });
  };

  render() {
    const { paths, activeLink } = this.state;
    return (
      <Nav defaultActiveKey="/home" className="sidebar-wrapper flex-column">
        <Nav.Item className="sidebar-brand">Party Stats</Nav.Item>
        {paths.map((p) => (
          <Nav.Link
            className={
              p.path === activeLink ? "sidebar-item-active" : "sidebar-item"
            }
            key={p.path}
            onClick={() => this.handleActive(p.path)}
            as={Link}
            to={p.path}
          >
            {p.label}
          </Nav.Link>
        ))}
      </Nav>
    );
  }
}

export default Sidebar;
