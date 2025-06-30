import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <section className="text-center mb-5">
        <h1 className="display-4 fw-bold">Young Canadian Data Visualizer</h1>
        <p className="lead mt-3">
          Explore the perspectives of young Canadians — from elections to education and employment — using interactive data.
        </p>
        <Link to="/cesdatasets" className="btn btn-primary btn-lg mt-3">
          Explore the Visualizer
        </Link>
      </section>

      {/* Quick Links to Sections */}
      <section className="row text-center g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Elections</h5>
              <p className="card-text">Explore Canadian Election Study data filtered for youth voters.</p>
              <Link to="/cesdatasets" className="btn btn-outline-primary">
                View CES
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Employment</h5>
              <p className="card-text">See how employment trends vary by age, gender, and region.</p>
              <Link to="/employment" className="btn btn-outline-primary">
                View Employment
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Education</h5>
              <p className="card-text">Compare postsecondary participation rates by demographic group.</p>
              <Link to="/education" className="btn btn-outline-primary">
                View Education
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
