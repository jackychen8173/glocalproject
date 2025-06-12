
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