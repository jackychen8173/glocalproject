library(haven)
library(dplyr)

#read dta file
ces2021dtafile <- read_dta("C:/Users/jchen/Downloads/dataverse_files/2021 Canadian Election Study v2.0.dta")

# filter from dta file
ces2021_filtered_dta <- ces2021dtafile %>% filter(cps21_age < 30)
ces2021_filtered_dta <- ces2021_filtered_dta %>%
  select(cps21_age, where(~ n_distinct(.) <= 10 & n_distinct(.) > 1)) %>%
  select(-matches("DO"), -matches("quality"), -matches("TEXT"), -matches("captcha"), 
         -matches("pccf"), -matches("PCCF"), -matches("Click_Count"),
         -matches("survey"), -matches("flag"), -matches("wave"), -matches("govt_programs_word"),
         -matches("pes21_inattentive"), -matches("message"))   


library(dplyr)
library(stringr)

# 1. Identify all multi-select columns
multi_cols <- grep("_\\d+$", names(ces2021_filtered_dta), value = TRUE)

# 2. Get list of prefixes
prefixes <- unique(str_remove(multi_cols, "_\\d+$"))

# 3. Compute excluded prefixes based on unique value rule
multi_data <- ces2021_filtered_dta[, multi_cols]

excluded_cols <- multi_data %>%
  summarise(across(everything(), ~ length(setdiff(unique(.), -99)) > 2)) %>%
  select(where(~ .x)) %>%
  names() %>%
  str_remove("_\\d+$") %>%
  unique()

# 4. Keep only prefixes not in excluded list
prefixes_to_combine <- setdiff(prefixes, excluded_cols)

# 5. Define combination function
combine_multiselect_overwrite_first_with_label <- function(data, prefix, var_labels) {
  cols <- grep(paste0("^", prefix, "_\\d+$"), names(data), value = TRUE)
  
  if (length(cols) == 0) return(data)
  
  first_col <- cols[1]
  other_cols <- cols[-1]
  original_label <- attr(data[[first_col]], "label")
  
  col_num_labels <- sapply(cols, function(col) {
    col_num <- str_extract(col, "\\d+$")
    label <- attr(data[[col]], "label")
    if (!is.null(label) && nzchar(label)) {
      paste0(col_num, ": ", label)
    } else {
      paste0(col_num, ": Unknown")
    }
  })
  
  # Step 2: Row-wise combine based on value == 1
  data[[first_col]] <- apply(data[cols], 1, function(row) {
    row[row == -99] <- NA
    selected <- which(row == 1)
    if (length(selected) == 0) return(NA)
    paste(col_num_labels[selected], collapse = ", ")
  })
  
  # Remove the other columns
  data <- data[, !(names(data) %in% other_cols)]
  
  # Append label if exists
  if (!is.null(original_label) && nzchar(original_label)) {
    names(data)[names(data) == first_col] <- paste0(prefix, " (", original_label, ")")
  } else {
    names(data)[names(data) == first_col] <- prefix
  }
  
  return(data)
}

# Extract labels once from your data frame
var_labels <- sapply(ces2021_filtered_dta, function(x) attr(x, "label"))

# Combine multi-select prefixes that are valid (non-excluded)
for (prefix in prefixes_to_combine) {
  ces2021_filtered_dta <- combine_multiselect_overwrite_first_with_label(ces2021_filtered_dta, prefix, var_labels)
}

library(haven)

names(ces2021_filtered_dta) <- sapply(names(ces2021_filtered_dta), function(col) {
  label <- attr(ces2021_filtered_dta[[col]], "label")
  label <- as.character(label)[1]  # Ensure it's length 1
  if (!is.null(label) && !is.na(label) && nzchar(label)) {
    paste0(col, " (", label, ")")
  } else {
    col
  }
})

ces2021_filtered_dta <- ces2021_filtered_dta %>%
  mutate(across(everything(), ~ if (is.labelled(.)) as_factor(.) else .))

library(jsonlite)
write_json(ces2021_filtered_dta, 
           "C:/Users/jchen/YouthEmploymentEducationProject/react-d3/public/ces2021_data.json", pretty = TRUE)
