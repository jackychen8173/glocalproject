import pandas as pd

df = pd.read_csv("data\labour_force_by_agegroup_monthly_may2025.csv")

# Rename columns for consistency
df = df.rename(columns={
    "REF_DATE": "Date",
    "Labour force characteristics": "Metric",
    "Age group": "Age Group",
    "VALUE": "Value",
    "UOM": "Unit"
})

# Make sure Value is numeric
df["Value"] = pd.to_numeric(df["Value"], errors="coerce")
df = df[df["Value"].notna()]

# Keep only the metrics you want
keep_metrics = ["Population", "Employment rate", "Unemployment rate", "Participation rate"]
df_filtered = df[df["Metric"].isin(keep_metrics)]


# df_clean.to_csv("data\cleaned_labour_data_monthly.csv", index=False)

# Export to JSON for Plotly.js
df_filtered.to_json("react-d3\public\cleaned_labour_data_monthly_may2025.json", orient="records", indent=2)