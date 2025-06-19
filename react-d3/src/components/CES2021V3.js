import React, { useState, useEffect } from "react";
import Select from "react-select";
import Plot from "react-plotly.js";

function CES2021() {
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
    ? Object.keys(data[0])
        .filter((key) => {
          const values = data.map((row) => row[key]).filter(Boolean);
          const isMultiSelect = key.includes("Select all that apply");

          const uniqueEntries = new Set();

          if (isMultiSelect) {
            values.forEach((val) => {
              val
                .split(",")
                .map((v) => v.trim())
                .forEach((entry) => uniqueEntries.add(entry));
            });
          } else {
            values.forEach((val) => {
              uniqueEntries.add(val);
            });
          }

          return uniqueEntries.size <= 20;
        })
        .map((key) => ({
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
  };

  if (data.length > 0 && selectedVariable) {
    const values = data.map((row) => row[selectedVariable]).filter(Boolean);
    const isMultiSelect =
      selectedVariable && selectedVariable.includes("Select all that apply");

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

    // Convert counts object into sorted entries based on numeric prefix
    const sortedEntries = Object.entries(counts).sort((a, b) => {
      const numA = parseInt(a[0]);
      const numB = parseInt(b[0]);
      return isNaN(numA) || isNaN(numB)
        ? a[0].localeCompare(b[0])
        : numA - numB;
    });

    const labels = sortedEntries.map(([key]) => {
      const parts = key.split(": ");
      return parts.length > 1 ? parts.slice(1).join(": ") : key; // Removes the number
    });
    const sortedCounts = sortedEntries.map(([_, count]) => count);

    plotData = {
      x: labels,
      y: sortedCounts,
      type: "bar",
      marker: { color: "skyblue" },
    };

    plotLayout = {
      title: `Responses for: ${selectedVariable}`,
      xaxis: { title: selectedVariable, tickangle: -45 },
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
              ? { value: selectedVariable, label: selectedVariable }
              : null
          }
          onChange={(option) => setSelectedVariable(option.value)}
        />
      </div>

      <Plot data={[plotData]} layout={plotLayout} />
    </div>
  );
}

export default CES2021;
