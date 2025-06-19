library(haven)
library(jsonlite)
library(dplyr)
library(stringr)

# 1. Read .dta file and filter youth
ces2021dtafile <- read_dta("C:/Users/jchen/Downloads/dataverse_files/2021 Canadian Election Study v2.0.dta")
ces2021_filtered_dta_v3 <- ces2021dtafile %>% filter(cps21_age < 30)

# 2. Read label map (JSON file with variable names you want to keep)
ces2021_label_map_json <- fromJSON("C:/Users/jchen/YouthEmploymentEducationProject/data/variable_label_map.json")
json_vars <- if (is.list(ces2021_label_map_json)) names(ces2021_label_map_json) else ces2021_label_map_json

# 3. Subset only columns in JSON
ces2021_filtered_dta_v3 <- ces2021_filtered_dta_v3 %>% select(all_of(json_vars))

# Convert -99 to NA
ces2021_filtered_dta_v3[ces2021_filtered_dta_v3 == -99] <- NA

# --- Multi-select grouping and combining ---
# 4. Identify multi-select column groups
multi_cols <- grep("_\\d+$", names(ces2021_filtered_dta_v3), value = TRUE)
prefixes <- unique(str_remove(multi_cols, "_\\d+$"))

# 5. Exclude multi-columns with >2 distinct (non -99) values (not binary)
multi_data <- ces2021_filtered_dta_v3[, multi_cols]
excluded_cols <- multi_data %>%
  summarise(across(everything(), ~ length(setdiff(unique(.), -99)) > 2)) %>%
  select(where(identity)) %>%
  names() %>%
  str_remove("_\\d+$") %>%
  unique()
prefixes_to_combine <- setdiff(prefixes, excluded_cols)

# 6. Combine multiselect columns using labels
combine_multiselect <- function(data, prefix) {
  cols <- grep(paste0("^", prefix, "_\\d+$"), names(data), value = TRUE)
  if (length(cols) == 0) return(data)
  
  first_col <- paste0(prefix, "_1")
  other_cols <- setdiff(cols, first_col)
  
  # Extract value:label for value == 1
  col_labels <- sapply(cols, function(col) {
    col_num <- str_extract(col, "\\d+$")
    labels <- attr(data[[col]], "labels")
    label_for_1 <- names(labels[labels == 1])
    if (length(label_for_1) > 0) {
      paste0(col_num, ": ", label_for_1)
    } else {
      paste0(col_num, ": Unknown")
    }
  }, USE.NAMES = FALSE)
  
  # Combine values row-wise into _1 column
  data[[first_col]] <- apply(data[cols], 1, function(row) {
    row[row == -99] <- NA
    selected <- which(row == 1)
    if (length(selected) == 0) return(NA)
    paste(col_labels[selected], collapse = ", ")
  })
  
  # Drop all the other *_2, *_3, etc.
  data <- data[, !(names(data) %in% other_cols)]
  
  return(data)
}

for (prefix in prefixes_to_combine) {
  ces2021_filtered_dta_v3 <- combine_multiselect(ces2021_filtered_dta_v3, prefix)
}

# Function to convert value codes to labels where applicable
convert_to_labels_with_code <- function(column) {
  labels <- attr(column, "labels")
  
  if (!is.null(labels) && is.numeric(column)) {
    label_map <- setNames(names(labels), as.character(labels))
    out <- as.character(column)  # Start with the original codes
    label_matches <- label_map[as.character(column)]
    
    out[!is.na(label_matches)] <- paste0(out[!is.na(label_matches)], ": ", label_matches[!is.na(label_matches)])
    
    return(out)
  } else {
    return(column)
  }
}

# Apply to all columns in-place (and stay named as-is)
ces2021_filtered_dta_v3 <- ces2021_filtered_dta_v3 %>%
  mutate(across(everything(), convert_to_labels_with_code))

# Replace column names with labels from loaded JSON (ces2021_label_map_json)
names(ces2021_filtered_dta_v3) <- sapply(names(ces2021_filtered_dta_v3), function(col) {
  label <- ces2021_label_map_json[[col]]
  if (!is.null(label) && nzchar(label)) {
    label
  } else {
    col
  }
})

library(jsonlite)
write_json(ces2021_filtered_dta_v3, 
           "C:/Users/jchen/YouthEmploymentEducationProject/react-d3/public/ces2021_data_new.json", pretty = TRUE)
