import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <motion.section
        className="text-center mb-5"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h1 className="display-4 fw-bold text-primary">
          🧭 Young Canadian Data Explorer
        </h1>
        <p className="lead mt-3 text-muted">
          Explore how youth in Canada engage with education, employment, and elections — powered by interactive data visualizations.
        </p>
        <Link to="/cesdatasets" className="btn btn-primary btn-lg mt-4 shadow-sm px-4 py-2">
          Explore the Visualizer
        </Link>
      </motion.section>

      {/* Quick Links to Sections */}
      <motion.section
        className="row text-center g-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {[
          {
            title: "🗳️ Elections",
            text: "Explore Canadian Election Study data filtered for youth voters.",
            link: "/cesdatasets",
            button: "View CES",
          },
          {
            title: "🎓 Education",
            text: "Compare postsecondary participation and graduation across age groups.",
            link: "/education",
            button: "View Education",
          },
          {
            title: "💼 Employment",
            text: "See how labour trends differ by age, gender, and region.",
            link: "/employment",
            button: "View Employment",
          },
        ].map((item, i) => (
          <motion.div
            className="col-md-4"
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold">{item.title}</h5>
                  <p className="card-text text-muted">{item.text}</p>
                </div>
                <Link to={item.link} className="btn btn-outline-primary mt-3">
                  {item.button}
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>
    </motion.div>
  );
}

export default Home;
