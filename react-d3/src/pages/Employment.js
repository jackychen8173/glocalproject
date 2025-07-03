import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import LabourForcePlotByAgeGroup from "../components/LabourForcePlotByAgeGroup";
import LabourChartsMonthly from "../components/LabourChartsMonthly";

function Employment() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">
          May 2025 Labour Force Data (Seasonally Adjusted){" "}
        </h2>
        <p className="text-muted">Visualized by age group using Statistics Canada data.</p>
      </div>

      <LabourChartsMonthly />

      <footer className="text-center text-muted mt-4 mb-5" style={{fontSize: "0.9rem"}}>
        Source: Statistics Canada, Table 14-10-0287-02
      </footer>

      <div className="mt-5">
      <LabourForcePlotByAgeGroup />
      <footer className="text-center text-muted mt-4 mb-5" style={{fontSize: "0.9rem"}}>
        Source: Statistics Canada, Table 14-10-0327-01
      </footer>
      </div>
    </div>
  );
}

export default Employment;
