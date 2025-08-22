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

function DC2024ByCategoryAllAndU30() {
  const [data, setData] = useState({});
  const [labelMap, setLabelMap] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [under30, setUnder30] = useState(false); // toggle for under 30

  useEffect(() => {
    fetch("./categorized_democracy_checkup.json")
      .then((res) => res.json())
      .then((labelMapJson) => {
        setLabelMap(labelMapJson);
      })
      .catch((err) => console.error("Failed to load label map:", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(
      under30
        ? "./aggregated_survey_dc2024u30.json"
        : "./aggregated_survey_dc2024.json"
    )
      .then((res) => res.json())
      .then((aggData) => {
        setData(aggData);
      })
      .catch((err) => console.error("Failed to load agg data:", err))
      .finally(() => setLoading(false));
  }, [under30]);

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
        <h2 className="fw-bold">DC2024 Data by Category</h2>
        <p className="text-muted">
          Explore Democracy Checkup 2024 responses by selecting a category and
          question.
        </p>
      </div>

      <div className="d-flex justify-content-center align-items-center mb-3">
        <span className="me-3">
          {under30
            ? "Currently Viewing: Age under 30"
            : "Currently Viewing: All Ages"}
        </span>
        <button
          type="button"
          className={`btn ${under30 ? "btn-primary" : "btn-outline-primary"}`}
          onClick={(e) => {
            e.preventDefault(); // defensive
            e.currentTarget.blur(); // remove focus so page doesn't scroll back
            setUnder30(!under30);
          }}
        >
          {under30 ? "Click to view all ages" : "Click to view age under 30"}
        </button>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Select a category:</label>
          <Select
            options={categoryOptions}
            value={
              selectedCategory
                ? { value: selectedCategory, label: selectedCategory }
                : null
            }
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
            value={
              selectedLabel
                ? { value: selectedLabel, label: selectedLabel }
                : null
            }
            onChange={(opt) => setSelectedLabel(opt.value)}
            isDisabled={!selectedCategory}
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
      <footer
        className="text-center text-muted mt-4 mb-5"
        style={{ fontSize: "0.9rem" }}
      >
        <div>
          Data Source:{" "}
          <a
            href="https://www.samaracanada.com/democracy-checkup"
            target="_blank"
            rel="noreferrer"
          >
            Democracy Checkup 2024
          </a>
        </div>
        <div>
          Harell, Allison; Stephenson, Laura B.; Rubenson, Daniel; Loewen, Peter
          John. (2024).
          <em> Democracy Checkup 2024 Survey Dataset. </em> Samara Centre for
          Democracy.
        </div>
      </footer>
    </div>
  );
}

export default DC2024ByCategoryAllAndU30;
