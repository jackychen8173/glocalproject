import EducationParticipationRate from "../components/EducationParticipationRate";
import UndergradPersistenceGraduation from "../components/UndergradPersistenceGraduation";

function Education() {
  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="mb-5 text-center">
        <h1 className="display-4 fw-bold text-primary">
          📚 Canadian Education Insights
        </h1>
        <p className="text-muted fs-5 mt-3">
          Double-click or drag a box on any graph to zoom in for a closer view.
        </p>
      </div>

      {/* Section 1: Participation Rate */}
      <section className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold fs-3">🎓 Participation Rate in Education</h2>
          <p className="text-muted fs-6">
            View by age group and institution type across Canada
          </p>
        </div>
        <EducationParticipationRate />
        <footer className="text-center text-muted mt-3" style={{ fontSize: "0.9rem" }}>
          Source: Statistics Canada, Table 37-10-0103-01
        </footer>
      </section>

      {/* Section 2: Undergrad Persistence */}
      <section>
        <div className="text-center mb-4">
          <h2 className="fw-bold fs-3">📈 Undergraduate Persistence & Graduation</h2>
          <p className="text-muted fs-6">
            Canadian students aged 15-19 years, Persistence rates after 1 & 2 years, plus graduation within 4, 6, and 8 years
          </p>
        </div>
        <UndergradPersistenceGraduation />
        <footer className="text-center text-muted mt-3" style={{ fontSize: "0.9rem" }}>
          Source: Statistics Canada, Table 37-10-0136-03
        </footer>
      </section>
    </div>
  );
}

export default Education;
