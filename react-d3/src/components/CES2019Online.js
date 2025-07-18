import React, { useState, useEffect } from "react";
import Select from "react-select";
import Plot from "react-plotly.js";

// Utility to wrap long titles
function wrapText(text, maxLineLength = 50) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    if ((currentLine + " " + word).trim().length > maxLineLength) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += " " + word;
    }
  });

  lines.push(currentLine.trim());
  return lines.join("<br>");
}

function CES2019Online() {
  const [data, setData] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("./ces2019_data.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load JSON:", err))
      .finally(() => setLoading(false));
  }, []);

  const variableOptions =
    data.length > 0
      ? Array.from(new Set(data.flatMap((row) => Object.keys(row)))).map((key) => ({
          value: key,
          label: key,
        }))
      : [];

  let plotData = {
    x: [],
    y: [],
    type: "bar",
    marker: { color: "skyblue" },
  };

  let plotLayout = {
    title: "Select a variable to display data",
    xaxis: { title: "", tickangle: -45 },
    yaxis: { title: "Count" },
    margin: { t: 60, b: 140 },
    width: 1000,
    height: 600,
  };

  if (data.length > 0 && selectedVariable) {
    const values = data.map((row) => row[selectedVariable]).filter(Boolean);
    const isMultiSelect = selectedVariable.startsWith("combined_");

    const counts = {};

    if (isMultiSelect) {
      values.forEach((val) =>
        val
          .split(",")
          .map((v) => v.trim())
          .forEach((entry) => {
            counts[entry] = (counts[entry] || 0) + 1;
          })
      );
    } else {
      values.forEach((val) => {
        const key = val || "NA";
        counts[key] = (counts[key] || 0) + 1;
      });
    }

    const sortedEntries = Object.entries(counts).sort((a, b) => {
      const numA = parseInt(a[0]);
      const numB = parseInt(b[0]);
      return isNaN(numA) || isNaN(numB) ? a[0].localeCompare(b[0]) : numA - numB;
    });

    const labels = sortedEntries.map(([key]) => {
      const parts = key.split(": ");
      return parts.length > 1 ? parts.slice(1).join(": ") : key;
    });
    const sortedCounts = sortedEntries.map(([_, count]) => count);

    plotData = {
      x: labels,
      y: sortedCounts,
      type: "bar",
      marker: { color: "skyblue" },
    };

    plotLayout = {
      title: {
        text: `Responses for:<br>${wrapText(selectedVariable)}`,
        font: { color: "#333", size: 18 },
        automargin: true,
        x: 0.5,
        xanchor: "center",
        pad: { t: 20 },
      },
      xaxis: {
        tickangle: -25,
        automargin: true,
      },
      yaxis: {
        title: {
          text: "Count",
          font: { color: "#333" },
        },
        automargin: true,
      },
      margin: {
        t: 180,
        b: 140,
        l: 80,
        r: 50,
      },
      width: 1000,
      height: 600,
      autosize: false,
    };
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">CES2019 Online Data Explorer - In Progress</h2>
        <p className="text-muted">
          Explore the 2019 CES Online dataset filtered to youth respondents under 30.
        </p>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <label className="form-label fw-semibold">Select a survey question:</label>
          <Select
            options={variableOptions}
            value={
              selectedVariable
                ? { value: selectedVariable, label: selectedVariable }
                : null
            }
            onChange={(option) => setSelectedVariable(option.value)}
          />
        </div>
      </div>

      <div className="card shadow-sm p-4 mb-5">
        <Plot data={[plotData]} layout={plotLayout} config={{ displayModeBar: false }} />
      </div>
    </div>
  );
}

export default CES2019Online;
