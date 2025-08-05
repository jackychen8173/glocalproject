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
  const [selectedVariable, setSelectedVariable] = useState(null);

  useEffect(() => {
    fetch("./ces2021_data_new.json")
      .then((response) => response.json())
      .then((json) => setData(json))
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
        <a
            href="https://glocalfoundation.ca/canadian-election-study"
            target="_blank"
            rel="noreferrer"
          >
            GLOCAL's report on the 2021 Canadian Election Study
          </a>
      </div>

      {data.length === 0 ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2 text-muted">Loading CES2021 data...</p>
        </div>
      ) : (
        <>
          <div className="row justify-content-center mb-4">
            <div className="col-md-8">
              <label className="form-label fw-semibold">
                Select a variable:
              </label>
              <Select
                options={variableOptions}
                placeholder="Choose a survey question..."
                value={
                  selectedVariable
                    ? { value: selectedVariable, label: selectedVariable }
                    : null
                }
                onChange={(option) => setSelectedVariable(option.value)}
              />
            </div>
          </div>

          {selectedVariable &&
            selectedVariable.includes("Select all that apply") && (
              <div className="alert alert-info text-center mt-3">
                <strong>Note:</strong> This is a "Select all that apply"
                question. Each response may include multiple options.
              </div>
            )}

          <div className="card shadow-sm p-4 mb-3">
            <Plot
              data={[plotData]}
              layout={plotLayout}
              config={{ displayModeBar: false, responsive: true }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <p className="text-muted text-center mt-2" style={{ fontSize: "0.85rem" }}>
            Data is filtered for respondents under 30 years of age.
          </p>
        </>
      )}
    </div>
  );
}

export default CES2021V3;
