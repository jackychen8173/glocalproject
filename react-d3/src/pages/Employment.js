import React from "react";
import Plot from "react-plotly.js";
import LabourForcePlotByAgeGroup from "../components/LabourForcePlotByAgeGroup";
import LabourChartsMonthly from "../components/LabourChartsMonthly";

function Employment() {
  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="mb-5 text-center">
        <h1 className="display-4 fw-bold text-success">
          💼 Canadian Employment Trends
        </h1>
        <p className="text-muted fs-5 mt-3">
          Double-click or drag to zoom in on the graph for a closer view.
        </p>
      </div>

      {/* Section 1: Monthly Labour Force */}
      <section className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold fs-3">📊 May 2025 Labour Force (Seasonally Adjusted)</h2>
          <p className="text-muted fs-6">
            Visualized by age group using Statistics Canada data
          </p>
        </div>
        <LabourChartsMonthly />
        <footer className="text-center text-muted mt-3" style={{ fontSize: "0.9rem" }}>
          Source: Statistics Canada, Table 14-10-0287-02
        </footer>
      </section>

      {/* Section 2: Labour Force By Age Group */}
      <section className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold fs-3">👥 Labour Force Trends by Age Group</h2>
        </div>
        <LabourForcePlotByAgeGroup />
        <footer className="text-center text-muted mt-3" style={{ fontSize: "0.9rem" }}>
          Source: Statistics Canada, Table 14-10-0327-01
        </footer>
      </section>
    </div>
  );
}

export default Employment;
