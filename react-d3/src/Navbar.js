import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo"></h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cesdatasets">View CES Datasets</Link></li>
        <li><Link to="/cesdatasetsanalysis">Elections and Canadian Election Study</Link></li>
        <li><Link to="/">Education</Link></li>
        <li><Link to="/employment">Employment</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;