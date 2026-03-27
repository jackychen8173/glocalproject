import EducationParticipationRate from "../components/EducationParticipationRate";
import UndergradPersistenceGraduation from "../components/UndergradPersistenceGraduation";
import "../components/DataVisualization.css";

function Education() {
  return (
    <div className="data-viz-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">
            📚 Canadian Education Insights
          </h1>
          <p className="page-subtitle">
            Explore participation rates, persistence, and graduation trends across Canadian educational institutions
          </p>
          <div className="page-note">
            <span>💡</span>
            <span>Double-click or drag on any graph to zoom in for detailed analysis</span>
          </div>
        </div>
      </div>

      {/* Section 1: Participation Rate */}
      <section className="section-card">
        <div className="section-card-header">
          <h2 className="section-card-title">
            <span>🎓</span>
            <span>Participation Rate in Education</span>
          </h2>
          <p className="section-card-subtitle">
            Track educational participation by age group and institution type across Canada (2006-2024)
          </p>
        </div>
        <EducationParticipationRate />
      </section>

      <footer className="viz-footer">
        <strong>Source:</strong> Statistics Canada, Table 37-10-0103-01
      </footer>

      {/* Section 2: Undergrad Persistence */}
      <section className="section-card">
        <div className="section-card-header">
          <h2 className="section-card-title">
            <span>📈</span>
            <span>Undergraduate Persistence & Graduation</span>
          </h2>
          <p className="section-card-subtitle">
            Canadian students aged 15-19 years: Persistence rates after 1 & 2 years, plus graduation within 4, 6, and 8 years
          </p>
        </div>
        <UndergradPersistenceGraduation />
      </section>

      <footer className="viz-footer">
        <strong>Source:</strong> Statistics Canada, Table 37-10-0136-03
      </footer>
    </div>
  );
}

export default Education;