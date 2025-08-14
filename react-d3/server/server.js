import fs from "fs";
import fetch from "node-fetch";
import AdmZip from "adm-zip";
import csvParser from "csv-parser";

const STATCAN_URL = "https://www150.statcan.gc.ca/n1/tbl/csv/14100287-eng.zip";
const LOCAL_JSON = "./data/labour_data.json";

app.get("/api/labour-data", async (req, res) => {
  try {
    if (!fs.existsSync(LOCAL_JSON)) {
      console.log("Fetching StatCan data...");
      const response = await fetch(STATCAN_URL);
      const buffer = await response.buffer();

      // Unzip
      const zip = new AdmZip(buffer);
      const csvEntry = zip.getEntries().find(e => e.entryName.endsWith(".csv"));

      // Parse CSV
      const results = [];
      fs.writeFileSync("./data/temp.csv", csvEntry.getData());

      fs.createReadStream("./data/temp.csv")
        .pipe(csvParser())
        .on("data", (row) => {
          if (
            row["Labour force characteristics"] === "Participation rate" ||
            row["Labour force characteristics"] === "Unemployment rate" ||
            row["Labour force characteristics"] === "Population"
          ) {
            results.push({
              date: row["REF_DATE"],
              region: row["GEO"],
              metric: row["Labour force characteristics"],
              value: parseFloat(row["VALUE"])
            });
          }
        })
        .on("end", () => {
          fs.writeFileSync(LOCAL_JSON, JSON.stringify(results));
          res.json(results);
        });
    } else {
      res.sendFile(LOCAL_JSON, { root: process.cwd() });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});
