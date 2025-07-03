import EducationParticipationRate from "../components/EducationParticipationRate";
import UndergradPersistenceGraduation from "../components/UndergradPersistenceGraduation";

function Education() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Participation in Education</h2>
        <p className="text-muted"></p>
      </div>

      <EducationParticipationRate />

      <footer
        className="text-center text-muted mt-4 mb-5"
        style={{ fontSize: "0.9rem" }}
      >
        Source: Statistics Canada, Table 37-10-0103-01
      </footer>

      <div className="text-center mb-5">
        <h2 className="fw-bold">Undergraduate Persistence & Graduation</h2>
      </div>
      
      <UndergradPersistenceGraduation />

      <footer
        className="text-center text-muted mt-4 mb-5"
        style={{ fontSize: "0.9rem" }}
      >
        Source: Statistics Canada, Table 37-10-0136-03
      </footer>
    </div>
  );
}

export default Education;
