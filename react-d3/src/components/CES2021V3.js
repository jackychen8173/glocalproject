import React, { useState, useEffect } from "react";
import Select from "react-select";
import Plot from "react-plotly.js";


function CES2021V3({ variableLabels }) {
  const [data, setData] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState(null);

  useEffect(() => {
    fetch("./ces2021_data_new.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load JSON:", err));
  }, []);

  const variableOptions =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          value: key,
          label: variableLabels && variableLabels[key] ? variableLabels[key] : key,
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
  };

  if (data.length > 0 && selectedVariable) {
    const values = data.map((row) => row[selectedVariable]).filter(Boolean);

    // Check if the variable label contains "select all that apply" (case insensitive)
    const varLabel = variableLabels && variableLabels[selectedVariable]
      ? variableLabels[selectedVariable].toLowerCase()
      : "";

    const isMultiSelect = varLabel.includes("select all that apply");

    const counts = {};

    if (isMultiSelect) {
      values.forEach((val) => {
        val
          .split(",")
          .map((v) => v.trim())
          .forEach((entry) => {
            counts[entry] = (counts[entry] || 0) + 1;
          });
      });
    } else {
      values.forEach((val) => {
        const key = val || "NA";
        counts[key] = (counts[key] || 0) + 1;
      });
    }

    // Filter out categories with count > 20
    const filteredEntries = Object.entries(counts).filter(([_, count]) => count <= 20);

    // Sort filtered entries by numeric prefix or alphabetically
    const sortedEntries = filteredEntries.sort((a, b) => {
      const numA = parseInt(a[0]);
      const numB = parseInt(b[0]);
      return isNaN(numA) || isNaN(numB)
        ? a[0].localeCompare(b[0])
        : numA - numB;
    });

    const labels = sortedEntries.map(([key]) => {
      const parts = key.split(": ");
      return parts.length > 1 ? parts.slice(1).join(": ") : key; // Removes the number prefix if present
    });

    const sortedCounts = sortedEntries.map(([_, count]) => count);

    plotData = {
      x: labels,
      y: sortedCounts,
      type: "bar",
      marker: { color: "skyblue" },
    };

    plotLayout = {
      title: `Responses for: ${variableLabels && variableLabels[selectedVariable] ? variableLabels[selectedVariable] : selectedVariable}`,
      xaxis: { title: variableLabels && variableLabels[selectedVariable] ? variableLabels[selectedVariable] : selectedVariable, tickangle: -45 },
      yaxis: { title: "Count" },
      margin: { t: 60, b: 140 },
    };
  }

  return (
    <div className="CES2021">
      <h1>CES2021 Data Explorer</h1>

      <div className="select-container">
        <Select
          options={variableOptions}
          defaultValue={
            selectedVariable
              ? { value: selectedVariable, label: variableLabels && variableLabels[selectedVariable] ? variableLabels[selectedVariable] : selectedVariable }
              : null
          }
          onChange={(option) => setSelectedVariable(option.value)}
        />
      </div>

      <Plot data={[plotData]} layout={plotLayout} />
    </div>
  );
}

export default CES2021V3;
