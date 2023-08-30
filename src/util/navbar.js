import React from "react";
import { Link } from "react-router-dom";
import "../css/App.css";
import { useLocation } from "react-router-dom";
import logo_github from "../img/github-mark.png";

function Navigation() {
  let location = useLocation().pathname.replace("/", "");

  return (
    <nav
  className="navbar navbar-expand-lg container .navbar-nav .navbar-toggler .navbar-text .collapse.navbar-collapse"
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
          className={"nav-link " + (location === "" ? " nav_item_focus" : "")}
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
  <a
    className="nav-link btn_github"
    href="https://github.com/shepherd-06/Solita-FrontEnd"
    target="_blank"
    rel="noopener noreferrer"
    style={{ marginLeft: "auto" }}
  >
    <img
      src={logo_github}
      alt="GitHub Logo"
      style={{ width: "24px", marginRight: "5px" }}
    />
    Find me on GitHub
  </a>
</nav>

  );
}

export default Navigation;
