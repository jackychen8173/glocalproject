library(haven)
library(labelled)

# Build value label dictionary safely
value_label_dict <- lapply(ces2021dtafile, function(col) {
  if (inherits(col, "labelled")) {
    val_labs <- val_labels(col)  # <- Renamed from 'labels' to avoid conflict
    if (!is.null(val_labs)) {
      return(setNames(names(val_labs), as.character(val_labs)))
    }
  }
  return(NULL)
})

# Remove NULL entries   
value_label_dict <- value_label_dict[!sapply(value_label_dict, is.null)]


var_label_dict <- sapply(ces2021_filtered_dta, function(col) attr(col, "label"))
var_label_dict <- var_label_dict[!is.na(var_label_dict)]