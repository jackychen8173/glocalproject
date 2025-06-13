import React from "react";
import CES2021 from "./components/CES2021";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CESDataExplorer from "./components/CESDataExplorer";

const App = () => (
  <div className="app-container">
    <Header />
    <CESDataExplorer />
    <Footer />
  </div>
);

export default App;