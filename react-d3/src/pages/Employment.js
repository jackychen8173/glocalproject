import React, {useEffect, useState} from "react";
import Plot from "react-plotly.js";
import LabourForcePlotByAgeGroup from "../components/LabourForcePlotByAgeGroup";
import LabourChartsMonthly from "../components/LabourChartsMonthly";

function Employment() {
    return(
        <div>
            <LabourForcePlotByAgeGroup />
            <LabourChartsMonthly />
        </div>
    );
}

export default Employment;