import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("Labour_force_annual.csv")
columns_to_keep = ["REF_DATE", "Gender", "Age group", "UOM", "VALUE"]

df = df[columns_to_keep]

df_cleaned = df.rename(columns={
    'REF_DATE': 'year',
    'Gender': 'gender',
    'Age group': 'age_group',
    'UOM': 'uom',
    'VALUE': 'counts'
})
df_cleaned['counts'] = pd.to_numeric(df_cleaned['counts'], errors='coerce')

df_pivoted = df_cleaned.pivot_table(
    index='year',
    columns='age_group',
    values='counts', 
    aggfunc='sum'
)
df_pivoted.reset_index(inplace=True)
df_pivoted.to_csv("labour_force.csv")

df_pivoted.set_index("year").plot(marker='o', title="Labour Force by Age Group Over Time")
plt.ylabel("Persons in thousands")
plt.xticks(rotation=45)
plt.grid(True)
plt.tight_layout()
plt.show()
