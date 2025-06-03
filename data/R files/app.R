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
    ggplot(ces2021_filtered_data, aes_string(x = paste0("factor(", input$variable, ")"))) +
      geom_bar(fill = "skyblue", color = "black") +
      labs(
        title = paste("Canadian", input$variable, "in CES2021"),
        x = input$variable,
        y = "Count"
      ) +
      theme_minimal()
  })
  
  output$dataTable <- DT::renderDataTable({
    ces2021_filtered_data
  })
}

shinyApp(ui, server)
