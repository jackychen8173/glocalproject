import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("Voter_Turnout_by_Age_Group_2004-2021.csv")
df = df.loc[:, ~df.columns.str.contains("_F")]
df = df.drop(columns=df.columns[df.columns.str.contains("PROVINCE_E")])
df = df.drop(columns=df.columns[df.columns.str.contains("GENDER_E")])
df = df.drop(columns=df.columns[df.columns.str.contains("Unnamed")])

df_cleaned = df.rename(columns={
    'ELECTION_E': 'election',
    'AGE_GROUP_E': 'age_group',
    'VOTES': 'votes',
    'ELIGIBLE_ELECTORS': 'eligible_electors',
    'TURNOUT_ELIGIBLE_ELECTOR': 'turnout'
})

df_pivoted = df_cleaned.pivot_table(
    index='election',
    columns='age_group',
    values='turnout', 
    aggfunc='first'
)

df_pivoted.reset_index(inplace=True)
df_pivoted = df_pivoted.round(4)
df_pivoted.to_csv("voter_turnout.csv")

df_pivoted.set_index("election").plot(marker='o', title="Voter Turnout by Age Group Over Time")
plt.ylabel("Turnout Rate")
plt.xticks(rotation=45)
plt.grid(True)
plt.tight_layout()
plt.show()