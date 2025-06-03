# run on rstudio
# in r the slash is the opposite from copying
cdem2019phonedta <- read_dta("C:/Users/jchen/YouthEmploymentEducationProject/data/original/cdem_election_data_phone_2019.dta")

write.csv(cdem2019phonedta, "C:/Users/jchen/YouthEmploymentEducationProject/data/original/cdem2019rstudiophonedata.csv")

cdem2019phonedata <- read.csv("C:/Users/jchen/YouthEmploymentEducationProject/data/original/cdem2019rstudiophonedata.csv")


cdem2019onlinedta <- read_dta("C:/Users/jchen/YouthEmploymentEducationProject/data/original/cdem_election_survey_data_online_2019.dta")

write.csv(cdem2019onlinedta, "C:/Users/jchen/YouthEmploymentEducationProject/data/original/cdem2019rstudioonlinedata.csv")

cdem2019onlinedata <- read.csv("C:/Users/jchen/YouthEmploymentEducationProject/data/original/cdem2019rstudioonlinedata.csv")