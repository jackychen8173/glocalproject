


ui <- fluidPage(
  titlePanel("CES2021 Youth Data Explorer"),
  tabsetPanel(
    tabPanel("Bar Plot",
             sidebarLayout(
               sidebarPanel(
                 selectInput(
                   "variable",
                   "Choose a variable to plot:",
                   choices = names(ces2021_filtered_data),
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
    
    if (var %in% names(label_dict)) {
      labels <- label_dict[[var]]
      print(labels)
      
      plot_data <- data.frame(label = unlist(strsplit(ces2021_filtered_data[[var]], ",\\s*"))) %>%
        dplyr::count(label)
      
      plot_data$label <- factor(plot_data$label, levels = unname(labels))
      
      ggplot(plot_data, aes(x = label, y = n)) +
        geom_bar(stat = "identity", fill = "skyblue", color = "black") +
        labs(
          title = paste("Breakdown of", var),
          x = "Option",
          y = "Count"
        ) +
        theme_minimal()
    } else {
      ggplot(ces2021_filtered_data, aes_string(x = paste0("factor(", input$variable, ")"))) +
        geom_bar(fill = "skyblue", color = "black") +
        labs(
          title = paste("Age 18–29", input$variable, "in CES2021"),
          x = input$variable,
          y = "Count"
        ) +
        theme_minimal()
    }
  })
  
  output$dataTable <- DT::renderDataTable({
    ces2021_filtered_data
  })
}

shinyApp(ui, server)
