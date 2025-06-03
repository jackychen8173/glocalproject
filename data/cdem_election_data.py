import pandas as pd

# df = pd.read_stata('data/cdem_election_data_2021.dta', convert_categoricals=False)
# df.to_csv('data/cdem_election_data_2021.csv', index=False)
# df = pd.read_stata('data/CES21_dictionarycoding_public_release_final.dta')
# df.to_csv('data/CES21_dictionarycoding_public_release_final.csv', index=False)

df = pd.read_csv('data/cdem_election_data_2021.csv', low_memory=False)
unwanted_cols = ["cps21_StartDate", "cps21_EndDate", "Duration__in_seconds_", "RecordedDate", "cps21_ResponseId", "DistributionChannel", "cps21_consent_t_First_Click", 
                 "cps21_consent_t_Last_Click", "cps21_consent_t_Page_Submit", "cps21_consent_t_Click_Count"]
df = df.drop(columns=unwanted_cols)
rows = []
for col in df.columns:
    counts = df[col].value_counts(dropna=False)
    for value, count in counts.items():
        rows.append({"column": col, "value": value, "count": count})
        
print(df.columns.tolist())
# counts_df = pd.DataFrame(rows)
# counts_df.to_csv("data/cdem_election_data_counts_by_column_2021.csv", index=False)