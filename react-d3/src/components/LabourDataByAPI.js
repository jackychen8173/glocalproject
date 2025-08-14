import React, { useEffect, useState } from "react";
import { unzipSync } from "fflate";
import Papa from "papaparse";

function LabourDataByAPI() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch ZIP from your backend
        const response = await fetch("http://localhost:5000/api/labour-data");
        if (!response.ok) throw new Error("Failed to fetch from backend");

        const arrayBuffer = await response.arrayBuffer();

        // Unzip in the browser
        const files = unzipSync(new Uint8Array(arrayBuffer));
        const fileName = Object.keys(files)[0]; // usually only one CSV
        const csvText = new TextDecoder().decode(files[fileName]);

        // Parse CSV
        const parsed = Papa.parse(csvText, { header: true });
        setData(parsed.data);
      } catch (err) {
        console.error("Error fetching/unzipping/parsing:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading data...</div>;

  return (
    <div>
      <h2>Labour Data (first 5 rows)</h2>
      <pre>{JSON.stringify(data.slice(0, 5), null, 2)}</pre>
    </div>
  );
}

export default LabourDataByAPI;
