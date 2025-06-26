import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function ParticipationStackedPlots() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("./participation_rate_in_education.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const groupByAge = () => {
    const grouped = {};
    data.forEach((row) => {
      const { year, "age group": ageGroup, institution, value } = row;
      if (!grouped[ageGroup]) grouped[ageGroup] = {};
      if (!grouped[ageGroup][institution])
        grouped[ageGroup][institution] = { x: [], y: [] };

      grouped[ageGroup][institution].x.push(year);
      grouped[ageGroup][institution].y.push(value);
    });
    return grouped;
  };

  const ageGroupData = groupByAge();

  const generatePlotData = (group) =>
    Object.entries(group).map(([institution, values]) => ({
      type: "scatter",
      mode: "lines+markers",
      name: institution,
      x: values.x,
      y: values.y,
    }));

  return (
    <div>
      {Object.entries(ageGroupData).map(([ageGroup, group], idx) => (
        <Plot
          key={idx}
          data={generatePlotData(group)}
          layout={{
            title: {
              text: `Participation in Education: ${ageGroup}`,
              font: { color: "#333" },
            },
            xaxis: {
              title: {text: "Year", font: {color: "#333"}},
              tickangle: -45,
              tickmode: "auto",
              nticks: 10,
            },
            yaxis: {title: { text: "Participation Rate (%)",
              font: {color: "#333"}
            }, range: [0, 53] },
            margin: { t: 60 },
            height: 400,
          }}  
          config={{ displayModeBar: false }}
          style={{ width: "100%", paddingBottom: "2rem" }}
        />
      ))}
    </div>
  );
}

export default ParticipationStackedPlots;
