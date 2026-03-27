import CES2021ByCategoryAllAndU30 from "../components/CES2021ByCategoryAllAndU30";
import "../components/DataVisualization.css";

function CESDatasets() {
  return (
    <div className="data-viz-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">
            🗳️ Canadian Election Study Visualizations
          </h1>
          <p className="page-subtitle">
            Explore survey data from the 2021 and 2019 CES — filtered for
            Canadians under 30
          </p>
          <div className="page-note">
            <span>⚠️</span>
            <span>2025 data will be added once released</span>
          </div>
        </div>
      </div>

      {/* About CES Section */}
      <section className="info-box">
        <h2 className="info-box-title">About the Canadian Election Study</h2>
        <div className="info-box-content">
          <p>
            The <strong>Canadian Election Study (CES)</strong> is one of the
            world's longest-running academic projects on democratic attitudes
            and voting behaviour. It is led by the{" "}
            <strong>Consortium on Electoral Democracy (C-Dem)</strong> and
            surveys thousands of Canadians during each federal election.
          </p>
          <p><strong>CES collects data on:</strong></p>
          <ul>
            <li>Voting and political participation</li>
            <li>Opinions on leaders, parties, and policies</li>
            <li>Media use and campaign exposure</li>
            <li>Demographics and personal background</li>
          </ul>
          <p>
            This data helps researchers, educators, and policymakers better
            understand Canadian democracy from the perspective of the public.
          </p>
        </div>
      </section>

      {/* CES 2021 Visualization */}
      <section className="section-card">
        <CES2021ByCategoryAllAndU30 />
      </section>

      {/* Footer */}
      <footer className="viz-footer">
        <div>
          <strong>Data Source:</strong>{" "}
          <a
            href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/XBZHKC"
            target="_blank"
            rel="noreferrer"
          >
            CES 2021 Dataset
          </a>
        </div>
        <div style={{ marginTop: '8px', fontSize: '0.85rem' }}>
          Stephenson, Laura B., Allison Harell, Daniel Rubenson, and Peter John Loewen.
          <em> The 2021 Canadian Election Study.</em> [dataset]. Harvard Dataverse.
        </div>
      </footer>
    </div>
  );
}

export default CESDatasets;