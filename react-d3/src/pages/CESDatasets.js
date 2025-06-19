import CES2021V3 from "../components/CES2021V3";
import CES2021Header from "../components/CES2021Header";
import CES2021Footer from "../components/CES2021Footer";
import CES2019Online from "../components/CES2019Online";

function CESDatasets() {
  return (
    <div className="app-container">
      <h1>Canadian Election Study 2025 -- Coming Soon</h1>
      <p>I will add 2025 data when the data is released.</p>
      <CES2021V3 />
      <CES2021Footer />
      <CES2019Online />
    </div>
  );
}

export default CESDatasets;