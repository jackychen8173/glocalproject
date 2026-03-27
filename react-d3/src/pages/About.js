import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-content">
        {/* Hero Section - Now as a card like the rest */}
        <section className="about-section about-hero-card">
          <div className="hero-card-content">
            <h1 className="about-title">About This Project</h1>
            <p className="about-lead">
              Making young Canadians' data visual, accessible, and meaningful through
              interactive exploration and evidence-based insights.
            </p>
          </div>
        </section>

        {/* What is this Project */}
        <section className="about-section">
          <div className="section-icon">📌</div>
          <h2 className="section-heading">What is This Project?</h2>
          <div className="section-body">
            <p>
              As a Canada Summer Jobs (CSJ) worker at{" "}
              <a
                href="https://glocalfoundation.ca/"
                target="_blank"
                rel="noreferrer"
                className="inline-link"
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
          </div>
        </section>

        {/* Why I Chose This */}
        <section className="about-section">
          <div className="section-icon">💡</div>
          <h2 className="section-heading">Why I Chose to Do This</h2>
          <div className="section-body">
            <p>
              I chose to focus on young Canadians because I'm part of this generation,
              and I've witnessed firsthand how many young people are navigating
              uncertainty around employment, education, and the future. Youth voices
              are often underrepresented in policy conversations, and I wanted to help
              amplify them through data.
            </p>
            <p>
              I focused on election, education, and employment data — key areas that
              shape young people's opportunities and experiences.
            </p>
          </div>
        </section>

        {/* Datasets */}
        <section className="about-section">
          <div className="section-icon">📊</div>
          <h2 className="section-heading">Datasets Used</h2>
          <div className="section-body">
            <div className="dataset-grid">
              <div className="dataset-item">
                <h3 className="dataset-title">CES 2021 Dataset</h3>
                <p className="dataset-description">
                  Canadian Election Study filtered for respondents under 30. Excludes
                  questions with over 20 responses or open-text inputs.
                </p>
                <a
                  href="https://glocalfoundation.ca/canadian-election-study"
                  target="_blank"
                  rel="noreferrer"
                  className="dataset-link"
                >
                  View GLOCAL's Analysis →
                </a>
              </div>

              <div className="dataset-item">
                <h3 className="dataset-title">CES 2019 Online Dataset</h3>
                <p className="dataset-description">
                  Online portion only, filtered similarly. Original codes and labels
                  preserved for analysis.
                </p>
              </div>

              <div className="dataset-item">
                <h3 className="dataset-title">Participation in Education</h3>
                <p className="dataset-description">
                  Tracks education participation by age and institution type from
                  2006/2007 to 2023/2024.
                </p>
              </div>

              <div className="dataset-item">
                <h3 className="dataset-title">Undergraduate Persistence & Graduation</h3>
                <p className="dataset-description">
                  Follows persistence and graduation rates from 2011/2012 to 2022/2023,
                  including average graduation time.
                </p>
              </div>

              <div className="dataset-item">
                <h3 className="dataset-title">Monthly Labour Force</h3>
                <p className="dataset-description">
                  July 2025 data by age group (seasonally adjusted). See{" "}
                  <a
                    href="https://www.statcan.gc.ca/en/dai/btd/sad-faq"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-link"
                  >
                    StatsCan FAQ
                  </a>{" "}
                  for seasonal adjustment details.
                </p>
              </div>

              <div className="dataset-item">
                <h3 className="dataset-title">Annual Labour Force</h3>
                <p className="dataset-description">
                  Annual labour force population by age group tracking long-term trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="about-section">
          <div className="section-icon">🧩</div>
          <h2 className="section-heading">Challenges Faced</h2>
          <div className="section-body">
            <div className="challenges-list">
              <div className="challenge-item">
                <div className="challenge-number">01</div>
                <div className="challenge-content">
                  <h3>Data Cleaning</h3>
                  <p>Cleaning <code>.dta</code> files and choosing useful variables from large datasets.</p>
                </div>
              </div>
              
              <div className="challenge-item">
                <div className="challenge-number">02</div>
                <div className="challenge-content">
                  <h3>Multi-Select Responses</h3>
                  <p>Handling "select all that apply" questions and coded labels properly.</p>
                </div>
              </div>
              
              <div className="challenge-item">
                <div className="challenge-number">03</div>
                <div className="challenge-content">
                  <h3>Label Mapping</h3>
                  <p>Mapping numeric values to readable labels for user-friendly visualizations.</p>
                </div>
              </div>
              
              <div className="challenge-item">
                <div className="challenge-number">04</div>
                <div className="challenge-content">
                  <h3>Interactive Development</h3>
                  <p>Building responsive, interactive charts with React and Plotly.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Plans */}
        <section className="about-section">
          <div className="section-icon">🚀</div>
          <h2 className="section-heading">Future Ideas & Plans</h2>
          <div className="section-body">
            <div className="future-grid">
              <div className="future-item">
                <div className="future-icon">📅</div>
                <h3>Additional Datasets</h3>
                <p>Incorporate more datasets as they become available from official sources.</p>
              </div>
              
              <div className="future-item">
                <div className="future-icon">👥</div>
                <h3>Broader Demographics</h3>
                <p>Support exploration beyond youth to compare across all age groups.</p>
              </div>
              
              <div className="future-item">
                <div className="future-icon">🔍</div>
                <h3>Advanced Filters</h3>
                <p>Enable filtering by gender, region, income level, and more dimensions.</p>
              </div>
              
              <div className="future-item">
                <div className="future-icon">🤖</div>
                <h3>AI Insights</h3>
                <p>Add automated summaries and pattern detection for key findings.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Me */}
        <section className="about-section about-me">
          <div className="section-icon">👋</div>
          <h2 className="section-heading">About Me</h2>
          <div className="section-body">
            <p>
              I'm Jacky — a developer with a background in Computer Science and
              Microbiology & Immunology, currently pursuing my MSc in Applied Computing
              at BCIT. I built this project to connect public datasets with interactive,
              visual tools for learning and insight.
            </p>
            <p>
              My goal is to make complex data more accessible and help people discover
              meaningful patterns in Canadian youth trends. This project combines my
              interests in data analytics, web development, and public service.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;