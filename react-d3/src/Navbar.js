import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top ">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" to="/">
          Data Visualizer
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cesdatasets">View CES Datasets</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cesdatasetsanalysis">
                Elections and Canadian Election Study
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/education">Education</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/employment">Employment</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
