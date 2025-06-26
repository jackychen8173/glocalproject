import pandas as pd

df = pd.read_csv("data\participation_rate_in_education.csv")
columns_to_keep = ["REF_DATE", "Age group", "Participation rate by type of institution attended", "UOM", "VALUE"]

df = df[columns_to_keep]
  
df.columns = ["year", "age group", "institution", "unit", "value"]

df.to_json(r"react-d3\public\participation_rate_in_education.json", orient="records", indent=2)