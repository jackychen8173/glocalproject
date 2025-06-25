import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import LabourForcePlotByAgeGroup from "../components/LabourForcePlotByAgeGroup";
import LabourChartsMonthly from "../components/LabourChartsMonthly";

function Employment() {
  return (
    <div>
      <h2>May 2025 Labour Force Data, Adjusted Seasonally</h2>
      <LabourChartsMonthly />
      <footer
        style={{
          marginTop: "2rem",
          fontSize: "0.9rem",
          color: "#888",
          textAlign: "center",
        }}
      >
        Data Source: Statistics Canada, Table 14-10-0287-02
      </footer>
      <LabourForcePlotByAgeGroup />
      <footer
        style={{
          marginTop: "2rem",
          fontSize: "0.9rem",
          color: "#888",
          textAlign: "center",
        }}
      >
        Data Source: Statistics Canada, Table 14-10-0327-01
      </footer>
    </div>
  );
}

export default Employment;
