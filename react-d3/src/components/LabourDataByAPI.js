import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const TABLE_ID = "14-10-0287-02";
const START_PERIOD = "2023-01";
const END_PERIOD = "2023-12";

export default function LabourDataByAPI() {
  const [plotData, setPlotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to find the vectorId for "Unemployment rate" & "Canada"
  const findVectorIdForCanadaUnemployment = (metadata) => {
    const vectorClass = metadata.object.classification.find(c => c.name === "Vector");
    const geoClass = metadata.object.classification.find(c => c.name === "GEO");

    // Find vector codes labeled with "Unemployment rate"
    const unemploymentVectors = vectorClass.member.filter(v => v.label.includes("Unemployment rate"));

    // Find GEO code for Canada
    const canadaGeo = geoClass.member.find(g => g.label.toLowerCase() === "canada");

    // Find vector that matches Canada GEO
    // The data vectors combine dimensions, so we want vectorIds matching "Unemployment rate" + "Canada"
    // Actually, the API data returns vectors for combinations; we'll filter later by vectorId

    // We'll return all unemployment vector codes to filter on data side
    return unemploymentVectors.map(v => v.code);
  };

  useEffect(() => {
    async function fetchAndProcess() {
      try {
        // 1. Fetch metadata
        const metaRes = await fetch(
          `https://www150.statcan.gc.ca/t1/wds/rest/getCubeMetadata/${TABLE_ID}`
        );
        const metaJson = await metaRes.json();

        const unemploymentVectorIds = findVectorIdForCanadaUnemployment(metaJson);
        if (!unemploymentVectorIds.length) {
          setError("No unemployment vectors found in metadata");
          setLoading(false);
          return;
        }

        // 2. Fetch data
        const dataRes = await fetch(
          `https://www150.statcan.gc.ca/t1/wds/rest/getDataFromCubePidAndTimePeriod/${TABLE_ID}/${START_PERIOD}/${END_PERIOD}`
        );
        const dataJson = await dataRes.json();

        // 3. Filter data: only unemployment vectors AND GEO=Canada
        // Data format: dataJson.object.vectorDataPoint = array of { vectorId, value, REF_DATE, ... }
        // Unfortunately, vectorId alone doesn't tell us geography; 
        // we must cross-reference with metadata.vector and metadata.geography

        // Build maps for vectorId -> metadata for filtering
        const vectorMeta = metaJson.object.classification.find(c => c.name === "Vector").member;
        const geoMeta = metaJson.object.classification.find(c => c.name === "GEO").member;

        // Map vector code => label
        const vectorMap = new Map(vectorMeta.map(v => [v.code, v.label]));
        // Map geo code => label
        const geoMap = new Map(geoMeta.map(g => [g.code, g.label]));

        // The vectorId is a combination of vector and geography code?  
        // Actually, the API returns vectorIds as numeric codes that correspond to unique combinations (composite keys).

        // But since this is complicated, let's simplify: plot all vectorDataPoints with value, and
        // the ones whose vectorId label contains "Canada" and "Unemployment rate"

        // To get geography for each vectorId, we need to fetch the vector info from metadata; 
        // but API only returns a single classification "Vector" that combines dimensions.

        // So let's filter vectorDataPoint items where vector label includes "Canada" and "Unemployment rate"

        // We'll build a combined label map: vector code => label string
        // Then filter data by vectorId whose label includes both keywords

        const filteredDataPoints = dataJson.object.vectorDataPoint.filter(dp => {
          const label = vectorMap.get(dp.vectorId);
          return label && label.toLowerCase().includes("unemployment rate") && label.toLowerCase().includes("canada");
        });

        if (!filteredDataPoints.length) {
          setError("No data points found for Canada Unemployment rate");
          setLoading(false);
          return;
        }

        // Prepare plot data: x = REF_DATE, y = value
        const x = filteredDataPoints.map(dp => dp.refPeriode); // refPeriode format: YYYY-MM
        const y = filteredDataPoints.map(dp => dp.value);

        setPlotData({
          x,
          y,
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "blue" },
          name: "Unemployment Rate (Canada)",
        });
        setLoading(false);
      } catch (e) {
        console.error(e);
        setError("Failed to load data");
        setLoading(false);
      }
    }

    fetchAndProcess();
  }, []);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Plot
        data={[plotData]}
        layout={{
          title: "Monthly Unemployment Rate in Canada",
          xaxis: { title: "Month" },
          yaxis: { title: "Unemployment Rate (%)" },
          autosize: true,
        }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
      />
    </div>
  );
}
