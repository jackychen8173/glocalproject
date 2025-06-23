import React, {useEffect, useState} from "react";
import Plot from "react-plotly.js";

function LabourForceMonthlyMay2025 ({metric, title, unit, color , yRange}) {
    return (
    <div>
      <MetricChart
        metric="Population"
        title="Population by Age Group"
        unit="Thousands"
        color="cornflowerblue"
      />
      <MetricChart
        metric="Employment rate"
        title="Employment Rate by Age Group"
        unit="%"
        color="seagreen"
        yRange={[0, 100]}
      />
      <MetricChart
        metric="Unemployment rate"
        title="Unemployment Rate by Age Group"
        unit="%"
        color="firebrick"
        yRange={[0, 100]}
      />
      <MetricChart
        metric="Participation rate"
        title="Participation Rate by Age Group"
        unit="%"
        color="darkorange"
        yRange={[0, 100]}
      />
    </div>
  );
}

export default LabourForceMonthlyMay2025;