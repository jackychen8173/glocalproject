import CES2021V3 from "../components/CES2021V3";
import CES2021Header from "../components/CES2021Header";
import CES2021Footer from "../components/CES2021Footer";
import CES2019Online from "../components/CES2019Online";
import CES2021ByCategory from "../components/CES2021ByCategory";

function CESDatasets() {
  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="mb-5 text-center">
        <h1 className="display-4 fw-bold text-primary">
          🗳️ Canadian Election Study Visualizations
        </h1>
        <p className="text-muted fs-5">
          Explore survey data from the 2021 and 2019 CES — filtered for Canadians under 30.
        </p>
        <p className="text-danger fw-semibold fs-6">
          ⚠️ 2025 data will be added once released.
        </p>
      </div>

      {/* Section 1: CES 2021 */}
      <section className="mb-5">
        <CES2021V3 />
        <CES2021ByCategory />
        <CES2021Footer />
      </section>

      {/* Section 2: CES 2019 */}
      <section className="mb-5">
        <CES2019Online />
        <footer className="text-center text-muted mt-4" style={{ fontSize: "0.9rem" }}>
          Data Source:{" "}
          <a
            href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/DUS88V"
            target="_blank"
            rel="noreferrer"
          >
            CES 2019 Online Dataset
          </a>
        </footer>
      </section>
    </div>
  );
}

export default CESDatasets;
