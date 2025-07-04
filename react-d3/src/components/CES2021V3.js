import React, { useState, useEffect } from "react";
import Select from "react-select";
import Plot from "react-plotly.js";

// Utility: wrap long text with <br> every maxLineLength characters
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

function CES2021V3() {
  const [data, setData] = useState([]);
  const [variableLabelMap, setVariableLabelMap] = useState({});
  const [groupedOptions, setGroupedOptions] = useState([]);   
  const [selectedVariable, setSelectedVariable] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("./ces2021_data_new.json").then((res) => res.json()),
      fetch("./categorized_variable_label_map.json").then((res) => res.json()),
    ])
      .then(([dataJson, labelMapJson]) => {
        setData(dataJson);
        setVariableLabelMap(labelMapJson);

        const grouped = Object.entries(labelMapJson).map(([category, variables]) => ({
          label: category,
          options: Object.entries(variables)
          .filter(([key]) => {
            const values = dataJson.map((row) => row[key]).filter(Boolean);
            const unique = new Set();
            values.forEach((val) => {
              if (typeof val === "string" && val.includes(",")) {
                val.split(",").map((v) => v.trim()).forEach((entry) => unique.add(entry));
              } else {
                unique.add(val);
              }
            });
            return unique.size <= 20;
          })
          .map(([key, label]) => ({value: key, label})),
        }));
        setGroupedOptions(grouped);
      })
      .catch((err) => console.error("Failed to load JSON:", err));
  }, []);

  // Create select options for variables with <= 20 unique values
  const variableOptions =
    data.length > 0
      ? Object.keys(data[0])
          .filter((key) => {
            const values = data.map((row) => row[key]).filter(Boolean);
            const isMultiSelect = key.includes("Select all that apply");
            const uniqueEntries = new Set();

            if (isMultiSelect) {
              values.forEach((val) =>
                val
                  .split(",")
                  .map((v) => v.trim())
                  .forEach((entry) => uniqueEntries.add(entry))
              );
            } else {
              values.forEach((val) => uniqueEntries.add(val));
            }

            return uniqueEntries.size <= 20;
          })
          .map((key) => ({ value: key, label: key }))
      : [];

  // Initialize empty plot
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

  // Populate plot data if a variable is selected
  if (data.length > 0 && selectedVariable) {
    const values = data.map((row) => row[selectedVariable]).filter(Boolean);
    const isMultiSelect = selectedVariable.includes("Select all that apply");

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

    // Sort entries by numeric prefix if applicable
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
      title: {
        text: `Survey Question:<br>${wrapText(selectedVariable)}`,
        font: { color: "#333" },
        automargin: false,
        x: 0.5,
        xanchor: "center",
        pad: { t: 20 },
      },
      xaxis: {
        tickangle: -25,
        automargin: false,
      },
      yaxis: {
        title: {
          text: "Number of People",
          font: { color: "#333" },
        },
        automargin: false,
      },
      margin: {
        t: 140,
        b: 140,
        l: 80,
        r: 50,
      },
      width: 1000,
      height: 600,
      autosize: false,
    };
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">CES2021 Data Explorer</h2>
        <p className="text-muted">
          Visualize how young Canadians under 30 years of age responded to
          survey questions in the 2021 Canadian Election Study.
        </p>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <label className="form-lael fw-semibold">Select a variable:</label>
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
        <Plot
          data={[plotData]}
          layout={plotLayout}
          config={{ displayModeBar: false }}
        />
      </div>
    </div>
  );
}

export default CES2021V3;
