library(tidyverse)

cdem2021rstudiocsv <- read.csv("C:/Users/jchen/YouthEmploymentEducationProject/data/original/cdem2021rstudiocsv.csv")

ces2021_filtered_data <- cdem2021rstudiocsv %>% filter(cps21_age < 30)
ces2021_filtered_data <- ces2021_filtered_data %>%
  select(cps21_ResponseId, cps21_age, where(~ n_distinct(.) <= 10 & n_distinct(.) > 1)) %>%
  select(-matches("DO"), -matches("quality"), -matches("TEXT"))

# 

combine_multiselect <- function(data, columns, labels, new_col_name) {
  data[[new_col_name]] <- apply(data[columns], 1, function(row) {
    selected <- names(labels)[which(row == 1)]
    if (length(selected) == 0) return(NA)
    paste(labels[selected], collapse = ", ")
  })
  data
}

cps21_lead_int_option_labels <- c(
  "1" = "Justin Trudeau",
  "2" = "Erin O'Toole",
  "3" = "Jagmeet Singh",
  "4" = "Yves-François Blanchet",
  "5" = "Annamie Paul",
  "6" = "None of these",
  "7" = "Don't know/ Prefer not to answer"
)

cps21_language_option_labels <- c(
  "1" = "English",
  "2" = "French",
  "3" = "Indigenous language",
  "4" = "Arabic",
  "5" = "Chinese / Cantonese / Mandarin",
  "6" = "Filipino / Tagalog ",
  "7" = "German",
  "8" = "Indian / Hindi / Gujarati",
  "9" = "Italian",
  "10" = "Korean",
  "11" = "Pakistani / Punjabi / Urdu",
  "12" = "Persian, Farsi",
  "13" = "Russian",
  "14" = "Spanish",
  "15" = "Tamil",
  "16" = "Vietnamese",
  "17" = "Other",
  "18" = "Don't Know/Prefer not to answer"
)

ces2021_filtered_data <- combine_multiselect(
  ces2021_filtered_data,
  paste0("cps21_lead_int_", 1:7),
  cps21_lead_int_option_labels,
  "combined_lead_int"
)

ces2021_filtered_data <- combine_multiselect(
  ces2021_filtered_data,
  paste0("cps21_language_", 1:18),
  cps21_language_option_labels,
  "combined_language"
)


library(jsonlite)
write_json(ces2021_filtered_data, 
           "C:/Users/jchen/YouthEmploymentEducationProject/react-d3/public/ces2021_data.json", pretty = TRUE)
