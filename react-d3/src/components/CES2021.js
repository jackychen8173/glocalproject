import React, { useState, useEffect } from "react";
import Select from "react-select";
import Plot from "react-plotly.js";

function CES2021() {
  const [data, setData] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState(null);

  useEffect(() => {
    fetch("./ces2021_data.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load JSON:", err));
  }, []);

  const variableOptions =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          value: key,
          label: key,
        }))
      : [];

  let plotData;

  if (data.length > 0) {
    const values = data.map((row) => row[selectedVariable]).filter(Boolean);
    const isMultiSelect = selectedVariable && selectedVariable.startsWith("combined_");

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
      return numA - numB;
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
  }

  return (
    <div className="CES2021" style={{ padding: "1rem" }}>
      <h1>CES2021 Data Explorer</h1>

      <div style={{ marginBottom: "1rem", width: "300px" }}>
        <Select
          options={variableOptions}
          defaultValue={{ value: selectedVariable, label: selectedVariable }}
          onChange={(option) => setSelectedVariable(option.value)}
        />
      </div>

      {plotData && (
        <Plot
          data={[plotData]}
          layout={{
            title: `18–29 ${selectedVariable} in CES2021`,
            xaxis: { title: selectedVariable },
            yaxis: { title: "Count" },
            margin: { t: 40, b: 120 },
          }}
        />
      )}
    </div>
  );
}

export default CES2021;
