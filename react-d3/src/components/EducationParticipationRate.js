import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function EducationParticipationRate() {
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
    <div className="row">
      {Object.entries(ageGroupData).map(([ageGroup, group], idx) => {
        const traces = Object.entries(group).map(([institution, values]) => ({
          type: "scatter",
          mode: "lines+markers",
          name: institution,
          x: values.x,
          y: values.y,
        }));

        return (
          <div key={idx} className="col-md-6 justify-content-center mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-center">Participation in Education: {ageGroup}</h5>
                <Plot
                  data={traces}
                  layout={{
                    autosize: true,
                    xaxis: { title: "Year", tickangle: -45 },
                    yaxis: { title: "Participation Rate (%)", range: [0, 55] },
                    margin: { t: 30, b: 60, l: 50, r: 30 },
                    height: 350,
                    legend: { orientation: "h", y: -0.3 },
                  }}
                  config={{ displayModeBar: false }}
                  style={{width: "100%", height:"100%"}}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EducationParticipationRate;
