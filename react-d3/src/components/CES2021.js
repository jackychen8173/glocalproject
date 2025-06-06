import React, { useState, useEffect } from "react";
import Select from "react-select";
import Plot from "react-plotly.js";

// Label mappings for multiselect variables
const labelMappings = {
  combined_lead_int: [
    "Justin Trudeau",
    "Erin O'Toole",
    "Jagmeet Singh",
    "Yves-François Blanchet",
    "Annamie Paul",
    "None of these",
    "Don't know/ Prefer not to answer",
  ],
  combined_language: [
    "English",
    "French",
    "Indigenous language",
    "Arabic",
    "Chinese / Cantonese / Mandarin",
    "Filipino / Tagalog ",
    "German",
    "Indian / Hindi / Gujarati",
    "Italian",
    "Korean",
    "Pakistani / Punjabi / Urdu",
    "Persian, Farsi",
    "Russian",
    "Spanish",
    "Tamil",
    "Vietnamese",
    "Other",
    "Don't Know/Prefer not to answer",
  ],
};

// Helper function to get ordered counts for multi-select fields
function getOrderedCounts(values, orderedLabels) {
  const counts = Object.fromEntries(orderedLabels.map((label) => [label, 0]));

  values.forEach((val) => {
    if (!val) return;
    val.split(",").map((v) => v.trim()).forEach((entry) => {
      if (counts.hasOwnProperty(entry)) {
        counts[entry]++;
      } else {
        counts[entry] = 1; // Just in case there's something unexpected
      }
    });
  });

  return counts;
}

function CES2021() {
  const [data, setData] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState("pes21_turnout2021");

  useEffect(() => {
    fetch("./ces2021data.json")
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

  if (labelMappings.hasOwnProperty(selectedVariable)) {
    const counts = getOrderedCounts(
      data.map((row) => row[selectedVariable]),
      labelMappings[selectedVariable]
    );

    plotData = {
      x: Object.keys(counts),
      y: Object.values(counts),
      type: "bar",
      marker: { color: "skyblue" },
    };
  } else {
    const counts = {};
    data.forEach((row) => {
      const val = row[selectedVariable] || "NA";
      counts[val] = (counts[val] || 0) + 1;
    });

    plotData = {
      x: Object.keys(counts),
      y: Object.values(counts),
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

      <Plot
        data={[plotData]}
        layout={{
          title: `18–29 ${selectedVariable} in CES2021`,
          xaxis: { title: selectedVariable },
          yaxis: { title: "Count" },
          margin: { t: 40, b: 120 },
        }}
      />
    </div>
  );
}

export default CES2021;
