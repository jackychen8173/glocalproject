import React from "react";
import CES2021 from "./components/CES2021";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CESDataExplorer from "./components/CESDataExplorer";
import CES2021V3 from "./components/CES2021V3";

const App = () => (
  <div className="app-container">
    <Header />
    <CES2021 />
    <Footer />
  </div>
);

export default App;