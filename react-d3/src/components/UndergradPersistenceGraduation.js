import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function UndergradPersistenceGraduation() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("./undergrad_degree_persistence_graduation.json") // adjust path as needed
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const cohortYears = data.map((d) => d.cohort);

  // Data Series
  const cohortSize = data.map((d) => d.cohort_size ?? null);
  const avgGradTime = data.map((d) => d.avg_grad_time ?? null);
  const persistence1Yr = data.map((d) => d.persistence_1yr ?? null);
  const persistence2Yr = data.map((d) => d.persistence_2yr ?? null);
  const grad4Yr = data.map((d) => d.grad_4yr ?? null);
  const grad6Yr = data.map((d) => d.grad_6yr ?? null);
  const grad8Yr = data.map((d) => d.grad_8yr ?? null);

  return (
    <div>
      {/* Chart 1: Cohort Size */}
      <Plot
        data={[
          {
            x: cohortYears,
            y: cohortSize,
            type: "scatter",
            mode: "lines+markers",
            name: "Cohort Size",
            line: { color: "#1f77b4" },
          },
        ]}
        layout={{
          title: "Number of Students in Entry Cohort",
          xaxis: { title: "Cohort Year" },
          yaxis: { title: "Number of Students" },
          margin: { t: 60, b: 60, l: 60, r: 20 },
        }}
        config={{ displayModeBar: false }}
      />

      {/* Chart 2: Avg Time to Graduation */}
      <Plot
        data={[
          {
            x: cohortYears,
            y: avgGradTime,
            type: "scatter",   
            mode: "lines+markers",
            name: "Avg. Time to Graduation",
            line: { color: "#2ca02c" },
          },
        ]}
        layout={{
          title: "Average Time to Graduation (Years)",
          xaxis: { title: "Cohort Year" },
          yaxis: { title: "Years", range: [4.5, 5] },
          margin: { t: 60, b: 60, l: 60, r: 20 },
        }}
        config={{ displayModeBar: false }}
      />

      {/* Chart 3: Persistence Rates */}
      <Plot
        data={[
          {
            x: cohortYears,
            y: persistence1Yr,
            type: "scatter",
            mode: "lines+markers",
            name: "Persistence after 1 Year",
            line: { color: "#9467bd" },
          },
          {
            x: cohortYears,
            y: persistence2Yr,
            type: "scatter",
            mode: "lines+markers",
            name: "Persistence after 2 Years",
            line: { color: "#8c564b" },
          },
        ]}
        layout={{
          title: "Persistence Rates by Cohort Year",
          xaxis: { title: "Cohort Year" },
          yaxis: { title: "Rate (%)", range: [0, 100] },
          legend: { orientation: "h", y: -0.3 },
          margin: { t: 60, b: 60, l: 60, r: 20 },
        }}
        config={{ displayModeBar: false }}
      />

      {/* Chart 4: Graduation Rates */}
      <Plot
        data={[
          {
            x: cohortYears,
            y: grad4Yr,
            type: "scatter",
            mode: "lines+markers",
            name: "Graduation after 4 Years",
            line: { color: "#ff7f0e" },
          },
          {
            x: cohortYears,
            y: grad6Yr,
            type: "scatter",
            mode: "lines+markers",
            name: "Graduation after 6 Years",
            line: { color: "#d62728" },
          },
          {
            x: cohortYears,
            y: grad8Yr,
            type: "scatter",
            mode: "lines+markers",
            name: "Graduation after 8 Years",
            line: { color: "#17becf" },
          },
        ]}
        layout={{
          title: "Graduation Rates by Cohort Year",
          xaxis: { title: "Cohort Year" },
          yaxis: { title: "Rate (%)", range: [0, 100] },
          legend: { orientation: "h", y: -0.3 },
          margin: { t: 60, b: 60, l: 60, r: 20 },
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}

export default UndergradPersistenceGraduation;
