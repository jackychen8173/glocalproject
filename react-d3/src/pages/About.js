import React from "react";

function About() {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5 mb-5 rounded shadow-sm">
        <h1 className="display-4 fw-bold mb-3">About This Project</h1>
        <p className="lead">
          Making young Canadians' data visual, accessible, and meaningful.
        </p>
      </div>

      {/* What is this Project */}
      <section className="p-4 mb-5 bg-light rounded shadow-sm">
        <h2 className="fs-4 fw-bold mb-3">📌 What is This Project?</h2>
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
          in terms of their real-life situations (like education and employment)
          and their perspectives on politics and society.
        </p>
        <p>
          This interactive website brings together survey responses and official
          statistics to paint a fuller picture of youth in Canada today.
          Engaging visualizations help make this data easier to understand for
          Canadians and global audiences alike.
        </p>
      </section>

      {/* Why I Chose This */}
      <section className="p-4 mb-5 bg-light rounded shadow-sm">
        <h2 className="fs-4 fw-bold mb-3">💡 Why I Chose to Do This</h2>
        <p>
          I'm part of the generation this project focuses on. I've seen how many
          young Canadians are navigating uncertainty around employment,
          education, and the future. Youth voices are often underrepresented in
          policy conversations, and I wanted to help amplify them through data.
        </p>
        <p>
          I focused on election, education, and employment data — key areas that
          shape young people's opportunities and experiences.
        </p>
      </section>

      {/* Datasets */}
      <section className="p-4 mb-5 bg-light rounded shadow-sm">
        <h2 className="fs-4 fw-bold mb-3">📊 Datasets Used</h2>
        <ul className="ps-3 mb-0">
          <li className="mb-2">
            <strong>CES 2021 Dataset:</strong> Canadian Election Study filtered
            for respondents under 30. Excludes questions with over 20 responses
            or open-text inputs.{" "}
            <a
              href="https://glocalfoundation.ca/canadian-election-study"
              target="_blank"
              rel="noreferrer"
            >
              GLOCAL's CES 2021 analysis
            </a>
            .
          </li>
          <li className="mb-2">
            <strong>CES 2019 Online Dataset:</strong> Online portion only,
            filtered similarly. Original codes and labels preserved.
          </li>
          <li className="mb-2">
            <strong>Participation in Education:</strong> Tracks education
            participation by age and institution type from 2006/2007 to
            2023/2024.
          </li>
          <li className="mb-2">
            <strong>Undergraduate Persistence & Graduation:</strong> Follows
            persistence and graduation rates from 2011/2012 to 2022/2023,
            including average graduation time.
          </li>
          <li className="mb-2">
            <strong>Monthly Labour Force:</strong> May 2025 data by age group
            (seasonally adjusted). See{" "}
            <a
              href="https://www.statcan.gc.ca/en/dai/btd/sad-faq"
              target="_blank"
              rel="noreferrer"
            >
              StatsCan FAQ
            </a>{" "}
            for seasonal adjustment details.
          </li>
          <li className="mb-2">
            <strong>Annual Labour Force:</strong> Annual labour force population
            by age group.
          </li>
        </ul>
      </section>

      {/* Challenges */}
      <section className="p-4 mb-5 bg-light rounded shadow-sm">
        <h2 className="fs-4 fw-bold mb-3">🧩 Challenges Faced</h2>
        <ul className="ps-3 mb-0">
          <li className="mb-2">Cleaning `.dta` files and choosing useful variables.</li>
          <li className="mb-2">Handling "select all that apply" and coded labels.</li>
          <li className="mb-2">Mapping values to readable labels.</li>
          <li className="mb-2">Building responsive, interactive charts with React + Plotly.</li>
        </ul>
      </section>

      {/* Future Plans */}
      <section className="p-4 mb-5 bg-light rounded shadow-sm">
        <h2 className="fs-4 fw-bold mb-3">🚀 Future Ideas & Plans</h2>
        <ul className="ps-3 mb-0">
          <li className="mb-2">Add more datasets as they become available.</li>
          <li className="mb-2">Support broader demographics beyond youth.</li>
          <li className="mb-2">Enable filters by gender, region, and more.</li>
          <li className="mb-2">Add automated summaries and insights.</li>
        </ul>
      </section>

      {/* About Me */}
      <section className="p-4 bg-light rounded shadow-sm">
        <h2 className="fs-4 fw-bold mb-3">👋 About Me</h2>
        <p>
          I'm Jacky — a developer with a background in Computer Science and an
          interest in making data easier to understand. I built this project to
          connect public datasets with interactive, visual tools for learning
          and insight.
        </p>
      </section>
    </div>
  );
}

export default About;
