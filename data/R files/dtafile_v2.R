library(haven)
library(dplyr)

#read dta file
ces2021dtafile <- read_dta("C:/Users/jchen/Downloads/dataverse_files/2021 Canadian Election Study v2.0.dta")

# filter from dta file
ces2021_filtered_dta <- ces2021dtafile %>% filter(cps21_age < 30)
ces2021_filtered_dta <- ces2021_filtered_dta %>%
  select(cps21_age, cps21_province, where(~ n_distinct(.) <= 10 & n_distinct(.) > 1)) %>%
  select(-matches("DO"), -matches("quality"), -matches("TEXT"), -matches("captcha"), 
         -matches("pccf"), -matches("PCCF"), -matches("Click_Count"),
         -matches("survey"), -matches("flag"), -matches("wave"), -matches("govt_programs_word"),
         -matches("pes21_inattentive"), -matches("message"), -matches("Positionstatements_medicaltreatm"),
         -matches("split_partyissue_namegen"), -matches("split"), -matches("justice_law_fr"))   
ces2021_filtered_dta <- ces2021_filtered_dta %>%
  mutate(across(everything(), ~ replace(., . == -99, NA)))

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
  
  # Step 1: Extract the numeric suffix and its associated label for value 1
  col_num_labels <- sapply(cols, function(col) {
    col_num <- str_extract(col, "\\d+$")
    labels <- attr(data[[col]], "labels")
    label_for_1 <- names(labels[labels == 1])
    if (length(label_for_1) > 0) {
      paste0(col_num, ": ", label_for_1)
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
  
  # Step 3: Drop other columns and rename
  data <- data[, !(names(data) %in% other_cols)]
  
  if (!is.null(original_label) && !is.na(original_label) && nzchar(original_label)) {
    names(data)[names(data) == first_col] <- paste0("combined_", prefix, " (", original_label, ")")
  } else {
    names(data)[names(data) == first_col] <- paste0("combined_", prefix)
  }
  
  return(data)
}

# Extract labels once from your data frame
var_labels <- sapply(ces2021_filtered_dta, function(x) attr(x, "label"))

# For each prefix group like "cps21_lead_int"
for (prefix in prefixes_to_combine) {
  ces2021_filtered_dta <- combine_multiselect_overwrite_first_with_label(ces2021_filtered_dta, prefix)
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

library(haven)
library(dplyr)

ces2021_filtered_dta <- ces2021_filtered_dta %>%
  mutate(across(everything(), ~ {
    if (is.labelled(.)) {
      original_labels <- attr(., "labels")
      if (is.null(original_labels)) return(.)  # skip if no labels
      
      # Build a factor with numeric values but labeled with "1: Liberal", etc.
      numeric_codes <- unname(original_labels)
      label_texts <- names(original_labels)
      prefixed_labels <- paste0(numeric_codes, ": ", label_texts)
      
      # Convert to factor directly using forcats (no more labelled -> as_factor conversion)
      factor_val <- factor(., levels = numeric_codes, labels = prefixed_labels)
      return(factor_val)    
    } else {
      return(.)
    }
  }))

library(jsonlite)
write_json(ces2021_filtered_dta, 
           "C:/Users/jchen/YouthEmploymentEducationProject/react-d3/public/ces2021_data.json", pretty = TRUE)
