import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data/original/education_data.csv")
columns_to_keep = ["REF_DATE", "School type", "Program type", "VALUE"]

df = df[columns_to_keep]

df_cleaned = df.rename(columns={
    'REF_DATE': 'year',
    'School type': 'school_type',
    'Program type': 'program_type',
    'VALUE': 'counts'
})

df_pivoted = df_cleaned.pivot_table(
    index='year',
    columns='program_type',
    values='counts', 
    aggfunc='first'
)
df_pivoted.reset_index(inplace=True)
df_pivoted.to_csv("data/cleaned/education_data_cleaned.csv")

df_pivoted.set_index("year").plot(marker='o', title="Education Programs Population Over Time")
plt.ylabel("persons")
plt.xticks(rotation=45)
plt.grid(True)
plt.tight_layout()
plt.show()