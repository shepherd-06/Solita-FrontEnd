import React from "react";
import { Link } from "react-router-dom";
import '../css/App.css';

function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <Link className="navbar-brand" to="/">Home</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Journey                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/station">Station </Link>
                    </li>
                </ul>
            </div>
        </nav >
    )
}

export default Navigation;