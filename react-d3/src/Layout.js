import React from "react";
import { Outlet } from "react-router-dom"; 
import Navbar from './components/Navbar';
import "./Layout.css";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-fill container py-4">
        <Outlet />
      </main>
      <footer className="bg-light text-center text-muted py-3 border-top">
        © 2025 Jacky Chen • Built with React & Bootstrap
      </footer>
    </div>
  );
};

export default Layout;