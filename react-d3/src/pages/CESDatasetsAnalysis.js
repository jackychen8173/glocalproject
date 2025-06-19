import CES2021V3 from "../components/CES2021V3";
import Header from "../components/CES2021Header";
import Footer from "../components/CES2021Footer";

function CESDatasets() {
  return (
    <div className="app-container">
      <Header />
      <CES2021V3 />
      <Footer />
    </div>
  );
}

export default CESDatasets;