import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function LabourChartsMonthly() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("./cleaned_labour_data_monthly_may2025.json")
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
      <Plot
        key={metric}
        data={[
          {
            x: metricData.map((d) => d.age),
            y: metricData.map((d) => d.value),
            type: "bar",
            text: metricData.map((d) =>
              unit === "%" ? `${d.value.toFixed(1)}%` : `${d.value.toFixed(1)}K`
            ),
            textposition: "outside",
            marker: { color },
          },
        ]}
        layout={{
          title,
          xaxis: { title: "Age Group" },
          yaxis: { title: unit, range: yRange },
          margin: { t: 60, b: 60 },
          height: 350,
        }}
      />
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        padding: "2rem",
        justifyItems: "center",
      }}
    >
      {renderChart(
        "Population by Age Group",
        "Population",
        "Thousands",
        "cornflowerblue"
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
