import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data/youth_labour_force.csv")
columns_to_keep = ["REF_DATE", "GEO", "Educational attainment level", "Labour force and education status", "VALUE"]

df = df[columns_to_keep]

df = df.rename(columns={
    'REF_DATE': 'year',
    'GEO': 'location',
    'Educational attainment level': 'education_level',
    'Labour force and education status': 'status',
    'VALUE': 'value'
})
df = df.dropna(subset=['value'])

df.to_csv("data/youth_labour_force_out.csv", index=False)

grouped = df.groupby(['location', 'education_level', 'status'])
for (location, edu, status), subset in grouped:
    if location == 'British Columbia':
        label = f"{location} - {edu} - {status}"
        plt.plot(subset['year'], subset['value'], label=label)

plt.title("Labour Force Value Over Time by Location")
plt.xlabel("Year")
plt.ylabel("Value")
plt.legend(title="Location", loc='upper left')
plt.xticks(rotation=45)
plt.grid(True)
plt.tight_layout()
plt.show()

