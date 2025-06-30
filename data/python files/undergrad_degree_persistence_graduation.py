import pandas as pd

# Load CSV
df = pd.read_csv(r"data\undergrad_degree_persistence_graduation.csv")

# Pivot the data to one row per cohort
df_pivot = df.pivot_table(
    index="REF_DATE",
    columns="Indicators",
    values="VALUE",
    aggfunc="first"
).reset_index()

# Rename columns for cleaner keys
df_pivot = df_pivot.rename(columns={
    "REF_DATE": "cohort",
    "Number of students in entry cohort": "cohort_size",
    "Persistence rate after one year": "persistence_1yr",
    "Persistence rate after two years": "persistence_2yr",
    "Graduation rate after four years": "grad_4yr",
    "Graduation rate after six years": "grad_6yr",
    "Graduation rate after eight years": "grad_8yr",
    "Average time to graduation (years)": "avg_grad_time"
})

# Save as JSON
df_pivot.to_json("undergrad_degree_persistence_graduation.json", orient="records", indent=2)
