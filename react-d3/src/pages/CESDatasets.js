import CES2021V3 from "../components/CES2021V3";
import CES2021Header from "../components/CES2021Header";
import CES2021Footer from "../components/CES2021Footer";
import CES2019Online from "../components/CES2019Online";
import CES2021ByCategory from "../components/CES2021ByCategory";
import CES2021ByCategoryAll from "../components/CES2021ByCategoryAll";
import CES2021ByCategoryAllAndU30 from "../components/CES2021ByCategoryAllAndU30";

function CESDatasets() {
  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="mb-5 text-center">
        <h1 className="display-4 fw-bold text-primary">
          🗳️ Canadian Election Study Visualizations
        </h1>
        <p className="text-muted fs-5">
          Explore survey data from the 2021 and 2019 CES — filtered for
          Canadians under 30.
        </p>
        <p className="text-danger fw-semibold fs-6">
          ⚠️ 2025 data will be added once released.
        </p>
      </div>

      <section>
        <h2 className="fs-4 fw-bold mb-3">About the Canadian Election Study</h2>
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <p className="card-text">
              The <strong>Canadian Election Study (CES)</strong> is one of the
              world’s longest-running academic projects on democratic attitudes
              and voting behaviour. It is led by the{" "}
              <strong>Consortium on Electoral Democracy (C-Dem)</strong> and
              surveys thousands of Canadians during each federal election.
            </p>
            <p className="card-text">CES collects data on:</p>
            <ul className="card-text">
              <li>Voting and political participation</li>
              <li>Opinions on leaders, parties, and policies</li>
              <li>Media use and campaign exposure</li>
              <li>Demographics and personal background</li>
            </ul>
            <p className="card-text">
              This data helps researchers, educators, and policymakers better
              understand Canadian democracy from the perspective of the public.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: CES 2021 */}
      <section className="mb-5">
        {/* <CES2021V3 /> */}
        <CES2021ByCategoryAllAndU30 />
        <CES2021Footer />
      </section>

      {/* Section 2: CES 2019 
      <section className="mb-5">
        <CES2019Online />
        <footer
          className="text-center text-muted mt-4"
          style={{ fontSize: "0.9rem" }}
        >
          Data Source:{" "}
          <a
            href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/DUS88V"
            target="_blank"
            rel="noreferrer"
          >
            CES 2019 Online Dataset
          </a>
          <div>
            Stephenson, Laura B., Allison Harell, Daniel Rubenson, and Peter
            John Loewen.
            <em> The 2019 Canadian Election Study – Online Survey. </em>{" "}
            [dataset].{" "}
            <a
              href="https://doi.org/10.7910/DVN/DUS88V"
              target="_blank"
              rel="noreferrer"
            >
              https://doi.org/10.7910/DVN/DUS88V
            </a>
            . Harvard Dataverse.
          </div>
        </footer>
      </section>
      */}
    </div>
  );
}

export default CESDatasets;
