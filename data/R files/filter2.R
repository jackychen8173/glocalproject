ces2021_filtered_data_multi <- ces2021_filtered_data

# Get all column names ending with _number
multi_cols <- grep("_\\d+$", names(ces2021_filtered_data), value = TRUE)

# Extract the prefixes (remove the suffix "_1", "_2", etc.)
prefixes <- unique(sub("(_\\d+)$", "", multi_cols))

# Excluded prefixes
multi_data <- ces2021_filtered_data[, multi_cols]
excluded_cols <- multi_data %>%
  summarise(across(everything(), ~ length(setdiff(unique(.), -99)) > 2)) %>%
  select(where(~ .x)) %>%
  names()
excluded_cols <- unique(str_remove(excluded_cols, "_\\d+$"))

combine_multiselect_simple <- function(data, prefix, new_col_name) {
  if(prefix %in% excluded_cols) return(data)
  
  cols <- grep(paste0("^", prefix, "_\\d+$"), names(data), value = TRUE)
  if (length(cols) == 0) return(data)
  
  data[[new_col_name]] <- apply(data[cols], 1, function(row) {
    selected <- which(!is.na(row) & row == 1)
    if (length(selected) == 0) return(NA)
    paste(selected, collapse = ", ")
  })
  
  return(data)
}

for (prefix in prefixes) {
  new_col <- paste0("combined_", prefix)
  ces2021_filtered_data_multi <- combine_multiselect_simple(ces2021_filtered_data_multi, prefix, new_col)
}

# Remove original multi-select columns (those ending in _1, _2, etc.) for non-excluded prefixes
cols_to_remove <- grep(paste0("^(", paste(setdiff(prefixes, excluded_cols), collapse = "|"), ")_\\d+$"), 
                       names(ces2021_filtered_data_multi), value = TRUE)

ces2021_filtered_data_multi <- ces2021_filtered_data_multi[, !(names(ces2021_filtered_data_multi) %in% cols_to_remove)]
