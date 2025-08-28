import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function LabourChartsMonthly() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("./cleaned_labour_data_monthly_july2025.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const filterByMetric = (metric) =>
    data
      .filter((d) => d.Metric === metric)
      .map((d) => ({ age: d["Age Group"], value: d.Value }));

  const renderChart = (title, metric, unit, color, yRange) => {
    const metricData = filterByMetric(metric);
    return (
      <div key={metric} className="col-md-6 mb-4">
        <div className="card shadow-sm h-100">
          <h5 className="card-title text-center">{title}</h5>
        <Plot
          data={[
            {
              x: metricData.map((d) => d.age),
              y: metricData.map((d) => d.value),
              type: "bar",
              text: metricData.map((d) =>
                unit === "%"
                  ? `${d.value.toFixed(1)}%`
                  : `${d.value.toFixed(1)}K`
              ),
              textposition: "outside",
              marker: { color },
            },
          ]}
          layout={{
            xaxis: {
              title: {
                text: "Age Group",
                font: { color: "#333" },
              },
            },
            yaxis: {
              title: { text: unit, font: { color: "#333" } },
              range: yRange,
            },
            margin: { t: 30, b: 40, l: 40, r: 20 },
            height: 400,
          }}
          config={{ displayModeBar: false }}
        />
        </div>
      </div>
    );
  };

  return (
    <div className="row">
      {renderChart(
        "Population by Age Group",
        "Population",
        "Thousands",
        "cornflowerblue",
        [0, 20000]
      )}
      {renderChart(
        "Employment Rate by Age Group",
        "Employment rate",
        "%",
        "seagreen",
        [0, 100]
      )}
      {renderChart(
        "Unemployment Rate by Age Group",
        "Unemployment rate",
        "%",
        "firebrick",
        [0, 100]
      )}
      {renderChart(
        "Participation Rate by Age Group",
        "Participation rate",
        "%",
        "darkorange",
        [0, 100]
      )}
    </div>
    
  );
}

export default LabourChartsMonthly;
