import pandas as pd
import pyreadstat

# df, meta = pyreadstat.read_dta("data/cdem_election_survey_data_online_2019.dta")
# print(meta.file_encoding)

# df = pd.read_stata('data/cdem_election_survey_data_online_2019.dta')
# df.to_csv('data/cdem_election_survey_data_online_2019.csv', index=False)
# converted in rstudio

df = pd.read_stata('data/cdem_election_data_phone_2019.dta')
df.to_csv('data/cdem_election_data_phone_2019.csv', index=False)

# df = pd.read_csv('data/cdem_election_data_online_2019_to_utf8.csv')