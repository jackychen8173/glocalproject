// App.js
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Plot from "react-plotly.js";
// import DataTable from "react-data-table-component";

function CES2021() {
  const [data, setData] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState("pes21_turnout2021");

  useEffect(() => {
    fetch("./ces2021_data.json")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  // Get unique variable names
  const variableOptions = data.length > 0
    ? Object.keys(data[0]).map((col) => ({ value: col, label: col }))
    : [];

  // Get counts for selected variable
  const counts = {};
  data.forEach((row) => {
    const value = row[selectedVariable] || "NA";
    counts[value] = (counts[value] || 0) + 1;
  });

  // Prepare data for Plotly bar chart
  const plotData = {
    x: Object.keys(counts),
    y: Object.values(counts),
    type: "bar",
    marker: { color: "skyblue" },
  };

  return (
    <div className="CES2021">
      <h1>CES2021 Data Explorer</h1>
      <div style={{ margin: "1rem 0" }}>
        <Select
          options={variableOptions}
          defaultValue={{ value: selectedVariable, label: selectedVariable }}
          onChange={(option) => setSelectedVariable(option.value)}
        />
      </div>

      <Plot
        data={[plotData]}
        layout={{
          title: `18-29 ${selectedVariable} in CES2021`,
          xaxis: { title: selectedVariable },
          yaxis: { title: "Count" },
        }}
      />

      {/* <h2>Data Table</h2>
      <DataTable
        columns={
          data.length > 0
            ? Object.keys(data[0]).map((col) => ({ name: col, selector: (row) => row[col], sortable: true }))
            : []
        }
        data={data}
        pagination
      /> */}
    </div>
  );
}

export default CES2021;
