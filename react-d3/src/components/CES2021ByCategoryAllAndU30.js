import React, { useState, useEffect } from "react";
import Select from "react-select";
import Plot from "react-plotly.js";
import "./DataVisualization.css";

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

// Custom styles for react-select
const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#2374ab' : '#d0d7de',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(35, 116, 171, 0.1)' : 'none',
    borderRadius: '8px',
    padding: '4px',
    '&:hover': {
      borderColor: '#2374ab',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#2374ab' 
      : state.isFocused 
      ? '#e8f3fb' 
      : 'white',
    color: state.isSelected ? 'white' : '#0f1419',
    padding: '12px 16px',
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(15, 20, 25, 0.08), 0 2px 4px -1px rgba(15, 20, 25, 0.04)',
    border: '1px solid #d0d7de',
  }),
};

function CES2021ByCategoryAllAndU30() {
  const [data, setData] = useState({});
  const [labelMap, setLabelMap] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [under30, setUnder30] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(
        under30 ? "./aggregated_survey_u30.json" : "./aggregated_survey.json"
      ).then((res) => res.json()),
      fetch("./categorized_variable_label_map.json").then((res) => res.json()),
    ])
      .then(([aggData, labelMapJson]) => {
        setData(aggData);
        setLabelMap(labelMapJson);
      })
      .catch((err) => console.error("Failed to load:", err))
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

  let plotData = { 
    x: [], 
    y: [], 
    type: "bar", 
    marker: { 
      color: '#2374ab',
      line: {
        color: '#0f4c75',
        width: 1
      }
    },
    hovertemplate: '<b>%{x}</b><br>Count: %{y}<extra></extra>',
  };
  
  let plotLayout = {
    title: {
      text: "Select a question to display data",
      font: { 
        color: "#0f1419",
        size: 18,
        family: "Inter, -apple-system, sans-serif"
      },
      x: 0.5,
      xanchor: "center",
    },
    xaxis: { 
      tickangle: -45,
      tickfont: { color: "#57606a", size: 12 },
      gridcolor: '#e6eaef',
    },
    yaxis: { 
      title: { 
        text: "Count",
        font: { color: "#0f1419", size: 14 }
      },
      tickfont: { color: "#57606a", size: 12 },
      gridcolor: '#e6eaef',
    },
    margin: { t: 80, b: 100, l: 60, r: 40 },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#f6f8fa',
    hovermode: 'closest',
  };

  if (data && selectedLabel) {
    const countsRaw = data[selectedLabel] || {};
    const counts = {};

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
      marker: { 
        color: '#2374ab',
        line: {
          color: '#0f4c75',
          width: 1
        }
      },
      hovertemplate: '<b>%{x}</b><br>Count: %{y}<extra></extra>',
    };

    plotLayout = {
      title: {
        text: `Survey Question:<br>${wrapText(selectedLabel)}`,
        font: { 
          color: "#0f1419",
          size: 16,
          family: "Inter, -apple-system, sans-serif"
        },
        x: 0.5,
        xanchor: "center",
      },
      xaxis: { 
        tickangle: -25,
        tickfont: { color: "#57606a", size: 11 },
        gridcolor: '#e6eaef',
      },
      yaxis: { 
        title: { 
          text: "Number of People", 
          font: { color: "#0f1419", size: 14 } 
        },
        tickfont: { color: "#57606a", size: 12 },
        gridcolor: '#e6eaef',
      },
      margin: { t: 120, b: 100, l: 80, r: 50 },
      paper_bgcolor: '#ffffff',
      plot_bgcolor: '#f6f8fa',
      hovermode: 'closest',
    };
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="loading-text">Loading survey data...</p>
      </div>
    );
  }

  return (
    <div className="data-viz-container">
      {/* Header */}
      <div className="viz-header">
        <h2 className="viz-title">CES2021 Data by Category</h2>
        <p className="viz-subtitle">
          Explore CES2021 responses by selecting a category and question below
        </p>
      </div>

      {/* Age Toggle */}
      <div className="age-toggle-section">
        <div className="toggle-wrapper">
          <span className="toggle-label">
            {under30 ? "📊 Viewing: Age under 30" : "📊 Viewing: All Ages"}
          </span>
          <button
            className={`toggle-button ${under30 ? 'active' : ''}`}
            onClick={() => setUnder30(!under30)}
          >
            {under30 ? "Switch to All Ages" : "Switch to Under 30"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">📁</span>
            Select a category
          </label>
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
            styles={selectStyles}
            placeholder="Choose a category..."
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">❓</span>
            Select a question
          </label>
          <Select
            options={questionOptions}
            value={
              selectedLabel
                ? { value: selectedLabel, label: selectedLabel }
                : null
            }
            onChange={(opt) => setSelectedLabel(opt.value)}
            isDisabled={!selectedCategory}
            styles={selectStyles}
            placeholder={
              selectedCategory 
                ? "Choose a question..." 
                : "Select a category first"
            }
          />
        </div>
      </div>

      {/* Chart */}
      <div className="chart-section">
        <div className="chart-wrapper">
          <Plot
            data={[plotData]}
            layout={plotLayout}
            config={{ 
              displayModeBar: true,
              displaylogo: false,
              modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
              responsive: true,
            }}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler={true}
          />
        </div>
      </div>
    </div>
  );
}

export default CES2021ByCategoryAllAndU30;