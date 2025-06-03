import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("youth_not_in_employment_education.csv")
columns_to_keep = ["REF_DATE", "Not in employment, education or training", "UOM", "VALUE"]

df = df[columns_to_keep]

df = df.rename(columns={
    'REF_DATE': 'year',
    'Not in employment, education or training': 'not_in_employment_education_training',
    'UOM': 'uom',
    'VALUE': 'value'
})

df_value = df[df['uom'].str.lower().str.contains('number|count')]
df_percent = df[df['uom'].str.lower().str.contains('percent')]

pivot_value = df_value.pivot_table(
    index='year',
    columns='not_in_employment_education_training',
    values='value', 
    aggfunc='first'
)

pivot_percent = df_percent.pivot_table(
    index='year',
    columns='not_in_employment_education_training',
    values='value', 
    aggfunc='first'
)

pivot_value.columns = [f"{col} (count)" for col in pivot_value.columns]
pivot_percent.columns = [f"{col} (%)" for col in pivot_percent.columns]

df_combined = pd.concat([pivot_value, pivot_percent], axis=1)
df_combined = df_combined.round(4)
df_combined.to_csv("youth_unemployment.csv")