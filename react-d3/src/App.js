import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import CESDatasets from "./pages/CESDatasets";
import Employment from "./pages/Employment";
import CESDatasetsAnalysis from "./pages/CESDatasetsAnalysis";
import Education from "./pages/Education";
import Layout from "./Layout";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/employment" element={<Employment />} />
          <Route path="/education" element={<Education />} />
          <Route
            path="/cesdatasetsanalysis"
            element={<CESDatasetsAnalysis />}
          />
          <Route path="/cesdatasets" element={<CESDatasets />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
