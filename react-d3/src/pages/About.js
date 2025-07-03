import React from "react";

function About() {
  return (
    <div className="container py-5">
      {/* Title banner */}
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
          ,I set out to explore what life looks like for young Canadians — both
          in terms of their situations (like employment and education) and their
          perspectives on politics and society.
        </p>
      </section>

      {/* Datasets */}
      <section className="p-4 mb-4 bg-light rounded shadow-sm">
        <h2 className="h4 fw-semibold">Datasets Used</h2>
        <ul className="ps-3 mb-0">
          <li className="mb-2">
            <strong>CES 2021 Dataset:</strong> Youth-focused subset processed
            with R and exported to JSON.
          </li>
          <li className="mb-2">
            <strong>CES 2019 Online Dataset:</strong> Similar filtering and
            transformation.
          </li>
          <li className="mb-2">
            <strong>Annual Labour Force Dataset:</strong> Cleaned and grouped
            using Python.
          </li>
          <li className="mb-2">
            <strong>Monthly Labour Force Dataset:</strong> Processed for time
            trends.
          </li>
        </ul>
      </section>

      {/* How to Use*/}
      <section className="p-4 mb-4 bg-light rounded shadow-sm">
        <h2 className="h4 fw-semibold">How to Use This Website</h2>
        <ul className="ps-3 mb-0">
          <li className="mb-2">
            Use the navigation bar to explore CES, Employment, and Education
            data..
          </li>
          <li className="mb-2">
            Interact with charts by selecting variables or hovering over data.
          </li>
        </ul>
      </section>

      {/* Challenges */}
      <section className="p-4 mb-4 bg-light rounded shadow-sm">
        <h2 className="h4 fw-semibold">Challenges Faced</h2>
        <ul className="ps-3 mb-0">
          <li className="mb-2">Cleaning .dta files and selecting meaningful variables.</li>
          <li className="mb-2">Handling "select all that apply" and coded label formats.</li>
          <li className="mb-2">Label mapping for human-readable visualization.</li>
          <li className="mb-2">Building responsive, interactive charts in a React app.</li>
        </ul>
      </section>

      {/* Future Plans */}
      <section className="p-4 mb-4 bg-light rounded shadow-sm">
        <h2 className="h4 fw-semibold">Future Plans</h2>
        <ul className="ps-3 mb-0">
          <li className="mb-2">Add more datasets as they become available.</li>
          <li className="mb-2">Support broader demographics beyond youth.</li>
          <li className="mb-2">Enable filtering by gender, region, and other attributes.</li>
          <li className="mb-2">Provide summaries or key insights automatically.</li>
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
