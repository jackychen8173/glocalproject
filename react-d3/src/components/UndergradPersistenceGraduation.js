import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function UndergradPersistenceGraduation() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("./undergrad_degree_persistence_graduation.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const cohortYears = data.map((d) => parseInt(d.cohort));
  const cohortSize = data.map((d) => d.cohort_size ?? null);
  const avgGradTime = data.map((d) => d.avg_grad_time ?? null);
  const persistence1Yr = data.map((d) => d.persistence_1yr ?? null);
  const persistence2Yr = data.map((d) => d.persistence_2yr ?? null);
  const grad4Yr = data.map((d) => d.grad_4yr ?? null);
  const grad6Yr = data.map((d) => d.grad_6yr ?? null);
  const grad8Yr = data.map((d) => d.grad_8yr ?? null);

  const charts = [
    {
      title: "Cohort Size by Year",
      data: [
        {
          x: cohortYears,
          y: cohortSize,
          type: "scatter",
          mode: "lines+markers",
          name: "Cohort Size",
          line: { color: "#1f77b4" },
        },
      ],
      yaxis: "Number of Students",
      yRange: [0, 150000]
    },
    {
      title: "Average Time to Graduation (Years)",
      data: [
        {
          x: cohortYears,
          y: avgGradTime,
          type: "scatter",
          mode: "lines+markers",
          name: "Avg. Grad Time",
          line: { color: "#2ca02c" },
        },
      ],
      yaxis: "Years",
      yRange: [4, 6],
    },
    {
      title: "Persistence Rates",
      data: [
        {
          x: cohortYears,
          y: persistence1Yr,
          type: "scatter",
          mode: "lines+markers",
          name: "After 1 Year",
          line: { color: "#9467bd" },
        },
        {
          x: cohortYears,
          y: persistence2Yr,
          type: "scatter",
          mode: "lines+markers",
          name: "After 2 Years",
          line: { color: "#8c564b" },
        },
      ],
      yaxis: "Persistence (%)",
      yRange: [0,100],
    },
    {
      title: "Graduation Rates",
      data: [
        {
          x: cohortYears,
          y: grad4Yr,
          type: "scatter",
          mode: "lines+markers",
          name: "Within 4 Years",
          line: { color: "#ff7f0e" },
        },
        {
          x: cohortYears,
          y: grad6Yr,
          type: "scatter",
          mode: "lines+markers",
          name: "Within 6 Years",
          line: { color: "#d62728" },
        },
        {
          x: cohortYears,
          y: grad8Yr,
          type: "scatter",
          mode: "lines+markers",
          name: "Within 8 Years",
          line: { color: "#17becf" },
        },
      ],
      yaxis: "Graduation (%)",
      yRange: [0, 100]
    },
  ];

  return (
    <div className="row">
      {charts.map((chart, idx) => (
        <div key={idx} className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-center">{chart.title}</h5>
              <Plot
                data={chart.data}
                layout={{
                  autosize: true,
                  xaxis: { title: "Cohort Year", range: chart.xRange },
                  yaxis: { title: chart.yaxis, range: chart.yRange },
                  margin: { t: 30, b: 60, l: 60, r: 20 },
                  height: 350,
                  legend: { orientation: "h", y: -0.3 },
                }}
                config={{ displayModeBar: false }}
                style={{width:"100%", height:"100%"}}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UndergradPersistenceGraduation;
