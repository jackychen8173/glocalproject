# run on rstudio
cdem2021data <- read.csv("C:/Users/jchen/YouthEmploymentEducationProject/data/original/cdem2021rstudiocsv.csv")
install.packages("tidyverse")
library(dplyr)
library(magrittr)

youth30andunder <- cdem2021data %>% filter(cps21_age <= 30)
selected_data <- youth30andunder %>% select(cps21_ResponseId, cps21_age, cps21_genderid, cps21_trans, cps21_province, cps21_education, pes21_mostimpissue, pes21_turnout2021, pes21_notvotereason1, pes21_howvote, pes21_votechoice2021, pes21_resason_chose, pes21_when_decide, pes21_pr_votechoice, pes21_dem_sat, pes21_campatt, pes21_govtcare, pes21_internetvote1, pes21_internetvote2, pes21_occ_cat, cps21_news_cons, cps21_duty_choice, cps21_govt_confusing, cps21_govt_say, cps21_interest_gen_1)

# view counts
table(cdem2021filtered_data$pes21_turnout2021)

# view counts as percentages
prop.table(table(cdem2021filtered_data$pes21_turnout2021)) * 100

# filter by voter turnout == 1 (the ones that said they voted) and select age and education
cdem2021filtered_voted_education <- cdem2021filtered_data %>% filter(pes21_turnout2021 == 1) %>% select(cps21_age, cps21_education)

# view counts
counts_list <- lapply(cdem2021filtered_voted_education, function(x) table(x, useNA = 'ifany'))

# percentages 
percentages_list <- lapply(cdem2021filtered_voted_education, function(x) {
     round(prop.table(table(x, useNA = "ifany")) * 100, 2) })

# plot counts by age 
ggplot(cdem2021filtered_voted_education, aes(x = factor(cps21_age))) +
          geom_bar(fill = "skyblue", color = "black") +
          labs(
                  title = "Counts of Youth by Age in CES2021",
                  x = "Age",
                 y = "Count"
              ) 
          theme_minimal()

