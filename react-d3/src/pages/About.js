import React from "react";

function About() {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">About This Project</h1>

      <section className="mb-5">
        <h2 className="h4 fw-semibold">What is This Project?</h2>
        <p>
          As a CSJ worker at{" "}
          <a href="https://glocalfoundation.ca/" target="_blank" rel="noreferrer">
            GLOCAL Foundation of Canada
          </a>, I wanted to explore data on the lives of young Canadians — not only how they're doing (jobs, education, participation), but also what they think.
          The project focuses on building an accessible tool to explore public data, particuarly the{" "}
          <a
            href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/XBZHKC"
            target="_blank"
            rel="noreferrer"
          >
            2021 Canadian Election Study (CES)
          </a>.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="h4 fw-semibold">Datasets Used</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>CES 2021 Dataset:</strong> Youth-focused subset processed with R and exported to JSON.
          </li>
          <li className="list-group-item">
            <strong>CES 2019 Online Dataset:</strong> Similar filtering and transformation.
          </li>
          <li className="list-group-item">
            <strong>Annual Labour Force Dataset:</strong> Cleaned and grouped using Python.
          </li>
          <li className="list-group-item">
            <strong>Monthly Labour Force Dataset:</strong> Processed for time trends.
          </li>
        </ul>
      </section>

      <section className="mb-5">
        <h2 className="h4 fw-semibold">How to Use This Website</h2>
        <ul>
          <li>Use the navigation bar to choose a topic: CES, Employment, or Education.</li>
          <li>Interact with charts by selecting variables or hovering over data.</li>
        </ul>
      </section>

      <section className="mb-5">
        <h2 className="h4 fw-semibold">Challenges Faced</h2>
        <ul>
          <li>Cleaning `.dta` files and extracting meaningful variables.</li>
          <li>Handling "select all that apply" and coded label formats.</li>
          <li>Label mapping for human-readable visualization.</li>
          <li>Building responsive, interactive charts in a React app.</li>
        </ul>
      </section>

      <section className="mb-5">
        <h2 className="h4 fw-semibold">Future Plans</h2>
        <ul>
          <li>Add more datasets as they become available.</li>
          <li>Support broader demographics beyond youth.</li>
          <li>Enable filtering by gender, region, and other attributes.</li>
          <li>Provide summaries or key insights automatically.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="h4 fw-semibold">About Me</h2>
        <p>
          I'm Jacky, a developer with a background in Computer Science and an interest in making data easier to understand.
          I created this project to bridge public datasets with accessible visual tools for education and insight.
        </p>
      </section>
    </div>
  );
}

export default About;
