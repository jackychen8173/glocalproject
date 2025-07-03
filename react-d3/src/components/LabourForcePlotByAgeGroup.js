import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "./LabourForcePlotByAgeGroup.css";

function LabourForcePlotByAgeGroup() {
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    fetch("./labour_force_by_agegroup.csv")
      .then((res) => res.text())
      .then((text) => {
        const [headerLine, ...rows] = text.trim().split("\n");
        const headers = headerLine.split(",").slice(1); // Skip the first empty column
        const yearIdx = headers.indexOf("year");

        const dataRows = rows.map((row) => row.split(",").slice(1)); // skip first empty column

        const years = dataRows.map((row) => row[yearIdx]);

        const traces = [];

        // Loop through all age group columns
        headers.forEach((col, colIdx) => {
          if (col !== "year") {
            const yValues = dataRows.map((row) => parseFloat(row[colIdx]));
            traces.push({
              x: years,
              y: yValues,
              type: "scatter",
              mode: "lines+markers",
              name: col,
            });
          }
        });

        setPlotData(traces);
      });
  }, []);

  return (
    <div className="mt-5">
      <div className="text-center mb-4">
        <h3 className="fw-bold">Employment Trends by Age Group (Over Time)</h3>
        <p className="text-muted">
          Line chart showing employment by age group from historical data.
        </p>
      </div>
      <div className="card shadow-sm p-4">
        <Plot
          data={plotData}
          layout={{
            title: {
              text: "Labour Force by Age Group",
              font: {
                color: "#333",
              },
            },
            width: 800,
            height: 500,
            margin: {
              l: 80,
              r: 50,
              b: 80,
              t: 80,
              pad: 10,
            },
            xaxis: {
              title: {
                text: "Year",
                font: {
                  color: "#333",
                },
              },
            },
            yaxis: {
              title: {
                text: "Number Employed (person in thousands)",
                font: {
                  color: "#333",
                },
              },
            },
          }}
          config={{
            displayModeBar: false,
          }}
        />
      </div>
    </div>
  );
}

export default LabourForcePlotByAgeGroup;
