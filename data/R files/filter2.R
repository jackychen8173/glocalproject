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

ces2021_filtered_data <- ces2021_filtered_data_multi


library(dplyr)
library(purrr)
library(labelled)  # For val_labels(), if using labelled data

generate_label_dict <- function(data, prefixes) {
  label_dict <- list()
  
  for (prefix in prefixes) {
    # Get matching multi-select columns
    cols <- grep(paste0("^", prefix, "_\\d+$"), names(data), value = TRUE)
    if (length(cols) == 0) next
    
    # Try to get labels from one of the columns
    example_col <- data[[cols[1]]]
    
    # If it's a labelled column (from haven), use val_labels()
    if (!is.null(attr(example_col, "labels"))) {
      label_dict[[prefix]] <- setNames(
        as.character(attr(example_col, "labels")),
        as.character(attr(example_col, "labels"))
      )
    } else {
      # Otherwise, build from unique values across all columns
      unique_vals <- unique(unlist(data[cols]))
      unique_vals <- unique_vals[!is.na(unique_vals) & unique_vals != -99]
      label_dict[[prefix]] <- setNames(as.character(unique_vals), as.character(unique_vals))
    }
  }
  
  return(label_dict)
}

# Generate the dictionary
included_prefixes <- setdiff(prefixes, excluded_cols)
label_dict <- generate_label_dict(ces2021_filtered_data, included_prefixes)