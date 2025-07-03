import CES2021V3 from "../components/CES2021V3";
import CES2021Header from "../components/CES2021Header";
import CES2021Footer from "../components/CES2021Footer";
import CES2019Online from "../components/CES2019Online";

function CESDatasets() {
  return (
    <div className="container py-5">
      <div className="mb-4 text-center">
        <h1 className="fw-bold">
          C-Dem's Canadian Election Study Visualizations
        </h1>
        <p className="text-muted">
          View survey data from the 2021 and 2019 CES, filtered to young
          Canadians under 30.
        </p>
        <p className="text-danger">2025 data will be added when released.</p>
      </div>

      <CES2021V3 />
      <CES2021Footer />
      <CES2019Online />
    </div>
  );
}

export default CESDatasets;
