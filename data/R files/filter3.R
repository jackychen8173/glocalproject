# Detect multi-select columns
multi_cols <- grep("_\\d+$", names(ces2021_filtered_data), value = TRUE)
prefixes <- unique(sub("(_\\d+)$", "", multi_cols))

# Exclude scales with more than 2 unique values (excluding -99)
multi_data <- ces2021_filtered_data[, multi_cols]
excluded_cols <- multi_data %>%
  summarise(across(everything(), ~ length(setdiff(unique(.), -99)) > 2)) %>%
  select(where(~ .x)) %>%
  names() %>%
  str_remove("_\\d+$") %>%
  unique()

# Combine multiselect function
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

# Apply and remove original columns
ces2021_filtered_data <- ces2021_filtered_data  # make a copy if needed
for (prefix in prefixes) {
  new_col <- paste0("combined_", prefix)
  ces2021_filtered_data <- combine_multiselect_simple(ces2021_filtered_data, prefix, new_col)
}

# Drop the original multiselect columns
cols_to_remove <- grep(paste0("^(", paste(setdiff(prefixes, excluded_cols), collapse = "|"), ")_\\d+$"), 
                       names(ces2021_filtered_data), value = TRUE)
ces2021_filtered_data <- ces2021_filtered_data[, !(names(ces2021_filtered_data) %in% cols_to_remove)]
