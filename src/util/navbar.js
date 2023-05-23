import React from "react";
import { Link } from "react-router-dom";
import "../css/App.css";
import { useLocation } from "react-router-dom";

function Navigation() {
  let location = useLocation().pathname.replace("/", "");

  return (
    <nav
      className="navbar navbar-expand-lg container"
      style={{
        background: "white",
        marginBottom: "15px",
        borderRadius: "15px",
      }}
    >
      <Link className="navbar-brand" to="/">
        Home
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className={
                "nav-link " + (location === "" ? " nav_item_focus" : "")
              }
              to="/"
            >
              Journey
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                "nav-link " + (location === "station" ? " nav_item_focus" : "")
              }
              to="/station"
            >
              Station
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
