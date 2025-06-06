library(haven)
library(dplyr)

#read dta file
ces2021dtafile <- read_dta("C:/Users/jchen/Downloads/dataverse_files/2021 Canadian Election Study v2.0.dta")

# filter from dta file
ces2021_filtered_dta <- ces2021_filtered_dtafile v %>% filter(cps21_age < 30)
ces2021_filtered_dta <- ces2021_filtered_dta %>%
  select(cps21_ResponseId, cps21_age, where(~ n_distinct(.) <= 10 & n_distinct(.) > 1)) %>%
  select(-matches("DO"), -matches("quality"), -matches("TEXT"))


# convert variable to labels
ces2021_filtered_dta <- data %>%
  mutate(across(where(is.labelled), ~ as.character(as_factor(.))))

# convert columns to labels
# Get variable labels
var_labels <- sapply(ces2021_filtered_dta, function(x) attr(x, "label"))

# Use labels as column names (falling back to old name if no label)
new_names <- ifelse(!is.na(var_labels) & var_labels != "", var_labels, names(data))

# Set new column names
colnames(ces2021_filtered_dta) <- new_names