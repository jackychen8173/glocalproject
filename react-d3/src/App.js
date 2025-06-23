import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import CESDatasets from "./pages/CESDatasets";
import Employment from "./pages/Employment";
import CESDatasetsAnalysis from "./pages/CESDatasetsAnalysis"; 
import Education from "./pages/Education";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/glocalproject" element={<Home />} />
        <Route path="/employment" element={<Employment />} />
        <Route path="/education" element={<Education />} />
        <Route path="/cesdatasetsanalysis" element={<CESDatasetsAnalysis />} />
        <Route path="/cesdatasets" element={<CESDatasets />} />
      </Routes>
    </Router>
  );
}

export default App;