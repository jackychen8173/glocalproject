import React from "react";
import LabourForcePlotByAgeGroup from "../components/LabourForcePlotByAgeGroup";
import LabourChartsMonthly from "../components/LabourChartsMonthly";
import "../components/DataVisualization.css";

function Employment() {
  return (
    <div className="data-viz-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">
            💼 Canadian Employment Trends
          </h1>
          <p className="page-subtitle">
            Analyze labour force statistics, employment rates, and workforce trends by age group
          </p>
          <div className="page-note">
            <span>💡</span>
            <span>Double-click or drag to zoom in on the graph for detailed analysis</span>
          </div>
        </div>
      </div>

      {/* Section 1: Monthly Labour Force */}
      <section className="section-card">
        <div className="section-card-header">
          <h2 className="section-card-title">
            <span>📊</span>
            <span>July 2025 Labour Force (Seasonally Adjusted)</span>
          </h2>
          <p className="section-card-subtitle">
            Current labour market snapshot visualized by age group using Statistics Canada data
          </p>
        </div>
        <LabourChartsMonthly />
      </section>

      <footer className="viz-footer">
        <strong>Source:</strong> Statistics Canada, Table 14-10-0287-02
      </footer>

      {/* Section 2: Labour Force By Age Group */}
      <section className="section-card">
        <div className="section-card-header">
          <h2 className="section-card-title">
            <span>👥</span>
            <span>Labour Force Trends by Age Group</span>
          </h2>
          <p className="section-card-subtitle">
            Historical trends showing how employment patterns evolve across different age demographics
          </p>
        </div>
        <LabourForcePlotByAgeGroup />
      </section>

      <footer className="viz-footer">
        <strong>Source:</strong> Statistics Canada, Table 14-10-0327-01
      </footer>
    </div>
  );
}

export default Employment;