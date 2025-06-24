import React from "react";
import { Outlet } from "react-router-dom"; 
import Navbar from "./Navbar";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main className="site-content">
        <Outlet /> {/* 🔥 This is where Home, Education, etc. will render */}
      </main>
      <footer className="site-footer">
        © 2025 Jacky Chen
      </footer>
    </div>
  );
};

export default Layout;
