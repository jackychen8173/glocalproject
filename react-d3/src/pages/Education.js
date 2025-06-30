import EducationParticipationRate from "../components/EducationParticipationRate";
import UndergradPersistenceGraduation from "../components/UndergradPersistenceGraduation";

function Employment() {
  return (
    <>
      <EducationParticipationRate />
      <footer
        style={{
          marginTop: "2rem",
          fontSize: "0.9rem",
          color: "#888",
          textAlign: "center",
        }}
      >
        Data Source: Statistics Canada, 
      </footer>
      <UndergradPersistenceGraduation />
      <footer
        style={{
          marginTop: "2rem",
          fontSize: "0.9rem",
          color: "#888",
          textAlign: "center",
        }}
      >
        Data Source: Statistics Canada, 
      </footer>
    </>
  );
}

export default Employment;
