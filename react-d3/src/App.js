import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import CESDatasets from "./pages/CESDatasets";
import Employment from "./pages/Employment";
import CESDatasetsAnalysis from "./pages/CESDatasetsAnalysis"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employment" element={<Employment />} />
        <Route path="/cesdatasetsanalysis" element={<CESDatasetsAnalysis />} />
        <Route path="/cesdatasets" element={<CESDatasets />} />
      </Routes>
    </Router>
  );
}

export default App;