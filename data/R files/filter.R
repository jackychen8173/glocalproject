library(tidyverse)

cdem2021rstudiocsv <- read.csv("C:/Users/jchen/YouthEmploymentEducationProject/data/original/cdem2021rstudiocsv.csv")

ces2021_filtered_data <- cdem2021rstudiocsv %>% select(cps21_ResponseId, where(~n_distinct(.) <= 10 & n_distinct(.) > 1))


ces2021_filtered_data <- cdem2021rstudiocsv %>%
  select(cps21_ResponseId, cps21_age, where(~ n_distinct(.) <= 10 & n_distinct(.) > 1)) %>%
  select(-matches("DO"))

write_json(ces2021_filtered_data, "C:/Users/jchen/YouthEmploymentEducationProject/react-d3/public/ces2021_data.json", pretty = TRUE)