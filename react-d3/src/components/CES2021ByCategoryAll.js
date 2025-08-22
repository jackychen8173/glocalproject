import React, { useState, useEffect } from "react";
import Select from "react-select";
import Plot from "react-plotly.js";

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

function CES2021ByCategory() {
  const [data, setData] = useState({});
  const [labelMap, setLabelMap] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("./aggregated_survey.json").then((res) => res.json()),
      fetch("./categorized_variable_label_map.json").then((res) => res.json()),
    ])
      .then(([aggData, labelMapJson]) => {
        setData(aggData);
        setLabelMap(labelMapJson);
      })
      .catch((err) => console.error("Failed to load:", err))
      .finally(() => setLoading(false));
  }, []);

  const reverseLabelMap = React.useMemo(() => {
    const map = {};
    Object.entries(labelMap).forEach(([category, variables]) => {
      Object.entries(variables).forEach(([code, label]) => {
        map[label] = code;
      });
    });
    return map;
  }, [labelMap]);

  const categoryOptions = Object.keys(labelMap).map((cat) => ({
    value: cat,
    label: cat,
  }));

  const questionOptions =
    selectedCategory && labelMap[selectedCategory]
      ? Object.values(labelMap[selectedCategory]).map((label) => ({
          value: label,
          label: label,
        }))
      : [];

  const selectedCode = selectedLabel ? reverseLabelMap[selectedLabel] : null;

  let plotData = { x: [], y: [], type: "bar", marker: { color: "skyblue" } };
  let plotLayout = {
    title: "Select a question to display data",
    xaxis: { tickangle: -45 },
    yaxis: { title: "Count" },
    margin: { t: 60, b: 140 },
    width: 1000,
    height: 600,
  };

  if (data && selectedLabel) {
    const countsRaw = data[selectedLabel] || {};
    const counts = {};

    // Handle multi-select by splitting "|" if present
    Object.entries(countsRaw).forEach(([key, value]) => {
      const isMultiSelect = key.includes("|");
      if (isMultiSelect) {
        key.split("|").forEach((entry) => {
          const trimmed = entry.trim();
          counts[trimmed] = (counts[trimmed] || 0) + value;
        });
      } else {
        counts[key] = (counts[key] || 0) + value;
      }
    });

    // Sort entries by numeric code before the colon
    const sortedEntries = Object.entries(counts).sort((a, b) => {
      const numA = parseInt(a[0].split(":")[0]);
      const numB = parseInt(b[0].split(":")[0]);
      return numA - numB;
    });

    // Prepare labels and counts
    const labels = sortedEntries.map(([key]) => key.split(": ")[1] || key);
    const sortedCounts = sortedEntries.map(([_, count]) => count);

    plotData = {
      x: labels,
      y: sortedCounts,
      type: "bar",
      marker: { color: "skyblue" },
    };

    plotLayout = {
      title: {
        text: `Survey Question:<br>${wrapText(selectedLabel)}`,
        font: { color: "#333" },
        x: 0.5,
        xanchor: "center",
      },
      xaxis: { tickangle: -25 },
      yaxis: { title: { text: "Number of People", font: { color: "#333" } } },
      margin: { t: 140, b: 140, l: 80, r: 50 },
      width: 1000,
      height: 600,
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
        <h2 className="fw-bold">CES2021 Data by Category</h2>
        <p className="text-muted">Explore CES2021 responses by selecting a category and question.</p>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Select a category:</label>
          <Select
            options={categoryOptions}
            value={selectedCategory ? { value: selectedCategory, label: selectedCategory } : null}
            onChange={(opt) => {
              setSelectedCategory(opt.value);
              setSelectedLabel(null);
            }}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Select a question:</label>
          <Select
            options={questionOptions}
            value={selectedLabel ? { value: selectedLabel, label: selectedLabel } : null}
            onChange={(opt) => setSelectedLabel(opt.value)}
            isDisabled={!selectedCategory}
          />
        </div>
      </div>

      <div className="card shadow-sm p-4 mb-5">
        <Plot data={[plotData]} layout={plotLayout} config={{ displayModeBar: false }} />
      </div>
    </div>
  );
}

export default CES2021ByCategory;
