import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">
      <div className="container-fluid px-4">
        <NavLink className="navbar-brand fw-bold" to="/">
          Data Visualizer
        </NavLink>
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
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "nav-link border-bottom border-primary border-2"
                    : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link border-bottom border-primary border-2"
                    : "nav-link"
                }
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/cesdatasets"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link border-bottom border-primary border-2"
                    : "nav-link"
                }
              >
                View CES Datasets
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/cesdatasetsanalysis"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link border-bottom border-primary border-2"
                    : "nav-link"
                }
              >
                Elections and Canadian Election Study
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/education"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link border-bottom border-primary border-2"
                    : "nav-link"
                }
              >
                Education
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/employment"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link border-bottom border-primary border-2"
                    : "nav-link"
                }
              >
                Employment
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
