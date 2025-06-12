library (ggplot2)
library(shiny)
library(dplyr)
library(tidyr)
library(DT)

ui <- fluidPage(
  titlePanel("CES2021 Youth Data Explorer"),
  tabsetPanel(
    tabPanel("Bar Plot",
             sidebarLayout(
               sidebarPanel(
                 selectInput(
                   "variable",
                   "Choose a variable to plot:",
                   choices = names(ces2021_filtered_dta),
                   selected = "pes21_turnout2021"
                 )
               ),
               mainPanel(
                 plotOutput("barPlot")
               )
             )     
    ),
    tabPanel("Data Table",
             DT::dataTableOutput("dataTable")
    )
  )
)

server <- function(input, output) {
  output$barPlot <- renderPlot({
    var <- input$variable
     
    if (var %in% names(ces2021_filtered_dta)) {
      vals <- ces2021_filtered_dta[[var]]
      if (any(grepl(",", vals[!is.na(vals)]))) {
        # This is likely a combined multi-select column
        
        # Split and unnest all comma-separated values
        plot_data <- data.frame(combined = ces2021_filtered_dta[[var]]) %>%
          tidyr::separate_rows(combined, sep = ",\\s*") %>%
          dplyr::filter(!is.na(combined) & combined != "") %>%
          dplyr::count(combined, name = "n")
        
        plot_data$combined <- factor(plot_data$combined, levels = sort(unique(as.numeric(plot_data$combined))))
        
        ggplot(plot_data, aes(x = reorder(combined, -n), y = n)) +
          geom_bar(stat = "identity", fill = "skyblue", color = "black") +
          labs(
            title = paste("Breakdown of", var),
            x = "Option",
            y = "Count"
          ) +
          theme_minimal() +
          theme(axis.text.x = element_text(angle = 45, hjust = 1))
        
      } else {
        # Standard single-select variable
        ggplot(ces2021_filtered_dta, aes_string(x = paste0("factor(`", var, "`)"))) +
          geom_bar(fill = "skyblue", color = "black") +
          labs(
            title = paste("Age 18–29", var, "in CES2021"),
            x = var,
            y = "Count"
          ) +
          theme_minimal()
      }
    }
  })
  
  
  output$dataTable <- DT::renderDataTable({
    ces2021_filtered_dta
  })
}

shinyApp(ui, server)
