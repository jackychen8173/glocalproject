library(haven)

# 1. Read .dta file
democracy_checkup2024 <- read_dta("C:/Users/jchen/Downloads/dataverse_files (3)/Democracy Checkup 2024 v1.0.dta")

# Get all variable names
all_vars <- names(democracy_checkup2024)


# Save to CSV
write.csv(all_vars,
          "C:/Users/jchen/YouthEmploymentEducationProject/data/democracy_checkup_labels.csv",
          row.names = FALSE)
