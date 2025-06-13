import React, { useState, useEffect } from "react";
import Select from "react-select";
import Plot from "react-plotly.js";

function CESDataExplorer() {
  const [data, setData] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("ces2021");
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [variableOptions, setVariableOptions] = useState([]);

  // Load data when dataset changes
  useEffect(() => {
    fetch(`./${selectedDataset}_data.json`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        const options =
          json.length > 0
            ? Object.keys(json[0]).map((key) => ({
                value: key,
                label: key, // Full label
              }))
            : [];
        setVariableOptions(options);
        setSelectedVariable(null);
      })
      .catch((err) => console.error("Failed to load JSON:", err));
  }, [selectedDataset]);

  const selectedOption =
    variableOptions.find((opt) => opt.value === selectedVariable) || null;

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
    const isMultiSelect = selectedVariable.startsWith("combined_");

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

    const sortedEntries = Object.entries(counts).sort((a, b) => {
      const numA = parseInt(a[0]);
      const numB = parseInt(b[0]);
      return isNaN(numA) || isNaN(numB)
        ? a[0].localeCompare(b[0])
        : numA - numB;
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
      title: `Responses for: ${selectedOption?.label || selectedVariable} (${selectedDataset.toUpperCase()})`,
      xaxis: { title: selectedOption?.label || selectedVariable, tickangle: -45 },
      yaxis: { title: "Count" },
      margin: { t: 60, b: 140 },
    };
  }

  return (
    <div className="CESDataExplorer" style={{ maxWidth: "900px", margin: "0 auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center" }}>CES Data Explorer</h1>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <div style={{ flex: 1 }}>
          <Select
            options={[
              { value: "ces2021", label: "CES 2021" },
              { value: "ces2019", label: "CES 2019" },
            ]}
            defaultValue={{ value: "ces2021", label: "CES 2021" }}
            onChange={(option) => setSelectedDataset(option.value)}
          />
        </div>

        <div style={{ flex: 2 }}>
          <Select
            options={variableOptions}
            value={selectedOption}
            onChange={(option) => setSelectedVariable(option.value)}
            placeholder="Select a variable..."
          />
        </div>
      </div>

      <Plot data={[plotData]} layout={plotLayout} />
    </div>
  );
}

export default CESDataExplorer;
