import DC2024ByCategoryAllAndU30 from "../components/DC2024ByCategoryAllAndU30";
import "../components/DataVisualization.css";

function DC2024() {
  return (
    <div className="data-viz-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">
            🗳️ Democracy Checkup 2024
          </h1>
          <p className="page-subtitle">
            Explore Canadian perspectives on democracy, governance, and civic engagement
          </p>
        </div>
      </div>

      {/* DC 2024 Visualization */}
      <section className="section-card">
        <DC2024ByCategoryAllAndU30 />
      </section>
    </div>
  );
}

export default DC2024;