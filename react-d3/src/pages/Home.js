import React from "react";
import "./Home.css";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to My Canadian Data Visualizer</h1>
        <p>
          Built by Jacky Chen — exploring young Canadian data and perspectives
          through interactive data
        </p>
        <a href="/cesdatasets" className="cta-button">
          Explore the Visualizer
        </a>
      </section>

      {/* Project Overview */}
      <section>
        <h2>What is This Project?</h2>
        <p>
          As a CSJ worker at
          <a
            href="https://glocalfoundation.ca/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            GLOCAL Foundation of Canada
          </a>
          , my original goal for the project was to explore data about election,
          employment, and education regarding young Canadians. I wanted to
          explore see the data on the outlook of young Canadians and how they
          were doing. However, I realized this was an outside point of view on
          young people, and I also wanted to look at the inside perspective of
          what young Canadians were thinking. Therefore, I ended up spending a
          lot of time on C-dem's Canadian Election study, particulary the
          <a
            href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/XBZHKC"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            2021 study
          </a>
          , as the 2025 version is not released yet. So I spent most of my focus
          working on the 2021 CES dataset and making it more accessible, and I
          created a visualization tool which turns survey responses into
          interactive charts where you can explore by topic.
        </p>
      </section>

      {/* Datasets */}
      <section>
        <h2>Datasets Used</h2>
        <ul>
          <li>
            <strong>CES 2021 Dataset</strong> – Filtered to respondents under
            30, processed using R, Cleaned and transformed to structured JSON.
          </li>
          <li>
            <strong>CES 2019 Online Dataset</strong> – Filtered to respondents
            under 30, processed using R, Cleaned and transformed to structured
            JSON.
          </li>
          <li>
            <strong>Annual Labour Force Dataset</strong> – Processed using Python, Cleaned and transformed to structured
            JSON.
          </li>
          <li>
            <strong>Monthly Labour Force Dataset</strong> – Processed using Python, Cleaned and transformed to structured
            JSON.
          </li>
        </ul>
      </section>

      {/* How to Use */}
      <section>
        <h2>How to Use This Website</h2>
        <ul>
          <li>
            Choose any of the tabs to view the data relating to the topic.
          </li>
          <li>For the CES datasets, choose any variable from the dropdown to explore and hover to see details.</li>
        </ul>
      </section>

      {/* Challenges */}
      <section>
        <h2>Challenges Faced</h2>
        <p>The challenges I faced included:
        </p>
        <ul>
          <li>
            Filtering out non survey columns. I tried to clean my dataset to only include survey questions and not other columns.
          </li>
          <li>
            Cleaning and restructuring `.dta` files with R. The survey contained questions in different formats, for example there were select all that apply questions,
            which I tried to group together with R. 
          </li>
          <li>
            Label mapping for coded survey responses. The data values were numerical that represented the questions and answers in the survey, which were
            contained in the labels.
          </li>
          <li>Putting the data onto a webpage and creating responsive charts. </li>
        </ul>
      </section>

      {/* Future Plans */}
      <section>
        <h2>Future Plans/Possible Ideas</h2>
        <ul>
          <li>Continue to add more datasets, particulary more recent data.</li>
          <li>It is possible to make the data more general, to include whole population instead of just young Canadians.</li>
          <li>Filter by different areas, including gender, region, education level, and more.</li>
          <li>Integrate more CES datasets to show historical change.</li>
          <li>Include a summary of key trends and visual highlights.</li>
        </ul>
      </section>

      {/* About Me */}
      <section>
        <h2>About Me</h2>
        <p>
          My name is Jacky, a developer with a background in Computer Science. I
          love building tools to make data accessible and insightful.
        </p>
      </section>
    </>
  );
}

export default Home;
