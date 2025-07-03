import React from "react";

function About() {
  return (
    <div className="container py-5">
      {/* Hero Section*/}
      <div className="bg-primary text-white text-center py-5 mb-5 rounded shadow-sm">
        <h1 className="fw-bold mb-4">About This Project</h1>
        <p className="lead">
          Making young Canadians data visual, accessible, and meaningful.
        </p>
      </div>

      {/* Project Description */}
      <section className="p-4 mb-4 bg-light rounded shadow-sm">
        <h2 className="h4 fw-semibold">What is This Project?</h2>
        <p>
          As a Canada Summer Jobs (CSJ) worker at{" "}
          <a
            href="https://glocalfoundation.ca/"
            target="_blank"
            rel="noreferrer"
          >
            GLOCAL Foundation of Canada
          </a>
          , I set out to explore what life looks like for young Canadians — both
          in terms of their situations (employment and education) and their
          perspectives on politics and society. This project aims to make
          youth-focused data more accessible and understandable through
          engaging, interactive visualizations.
        </p>
      </section>

      {/* Datasets */}
      <section className="p-4 mb-4 bg-light rounded shadow-sm">
        <h2 className="h4 fw-semibold">Datasets</h2>
        <ul className="ps-3 mb-0">
          <li className="mb-2">
            <strong>CES 2021 Dataset:</strong> The 2021 Canadian Election Study
            (CES) was conducted to document the attitudes of Canadians during
            and after the 2021 election. It was also designed to mimic the
            distributions in the population. For my visualization, I filtered to
            only include survey respondents under the age of 30. I also have not
            included questions that have over 20 responses, which includes
            questions that contains 0-100 scales and open-ended questions. For
            more information, here is{" "}
            <a
              href="https://glocalfoundation.ca/canadian-election-study"
              target="_blank"
              rel="noreferrer"
            >
              GLOCAL's analysis of the 2021 election study
            </a>
            .
          </li>
          <li className="mb-2">
            <strong>CES 2019 Online Dataset:</strong> Similar to the CES2021
            dataset, it is filtered to only include respondents under the age of
            30 and containing 20 or less response answers. This data also only
            includes the online portion and not the phone survey data. The
            original question codes and labels are stil included.
          </li>
          <li className="mb-2">
            <strong>Participation in Education Dataset:</strong> This dataset
            looks at the participation rate of education in Canada, sorted by
            age group (18-24 years and 25-29 years) and type of institution
            attended (total, elementary/high school, college, and university)
            from 2006/2007 to 2023/2024
          </li>
          <li className="mb-2">
            <strong>Undergraduate Persistence and Graduation Dataset:</strong>{" "}
            This dataset looks at the persistence rate (after 1 year and after 2
            years) and graduation rate (within 4 years, within 6 years, and
            within 8 years) of undergraduate degree Canadian students from
            2011/2012 to 2022/2023. The data also includes the average time it
            takes to graduate.
          </li>
          <li className="mb-2">
            <strong>Monthly Labour Force Dataset:</strong> This dataset shows the
            monthly labour force characteristics (population, employment rate, 
            unemployment rate, and participation rate) by age group, seasonally adjusted.
            The data currently displayed is May 2025. For more information about seasonal 
            adjustment, here is the {" "}
            <a
              href="https://www.statcan.gc.ca/en/dai/btd/sad-faq"
              target="_blank"
              rel="noreferrer"
            >
              Statistics Canada post 
            </a> 
            {" "} about it.
          </li>
          <li className="mb-2">
            <strong>Annual Labour Force Dataset:</strong> This dataset shows the yearly 
            labour force population sorted by age group.
          </li>
        </ul>
      </section>


      {/* Challenges */}
      <section className="p-4 mb-4 bg-light rounded shadow-sm">
        <h2 className="h4 fw-semibold">Challenges Faced</h2>
        <ul className="ps-3 mb-0">
          <li className="mb-2">
            Cleaning .dta files and selecting meaningful variables.
          </li>
          <li className="mb-2">
            Handling "select all that apply" and coded label formats.
          </li>
          <li className="mb-2">
            Label mapping for human-readable visualization.
          </li>
          <li className="mb-2">
            Building responsive, interactive charts in a React app.
          </li>
        </ul>
      </section>

      {/* Future Plans */}
      <section className="p-4 mb-4 bg-light rounded shadow-sm">
        <h2 className="h4 fw-semibold">Future Plans</h2>
        <ul className="ps-3 mb-0">
          <li className="mb-2">Add more datasets as they become available.</li>
          <li className="mb-2">Support broader demographics beyond youth.</li>
          <li className="mb-2">
            Enable filtering by gender, region, and other attributes.
          </li>
          <li className="mb-2">
            Provide summaries or key insights automatically.
          </li>
        </ul>
      </section>

      <section className="p-4 mb-4 bg-light rounded shadow-sm">
        <h2 className="h4 fw-semibold">About Me</h2>
        <p>
          I'm Jacky, a developer with a background in Computer Science and an
          interest in making data easier to understand. I created this project
          to bridge public datasets with accessible visual tools for education
          and insight.
        </p>
      </section>
    </div>
  );
}

export default About;
