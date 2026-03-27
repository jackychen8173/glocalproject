import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";

function Home() {
  const cards = [
    {
      icon: "🗳️",
      title: "Elections",
      description: "Explore Canadian Election Study data filtered for youth voters under 30.",
      link: "/cesdatasets",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      stats: { label: "CES 2021 & 2019", value: "Survey Data" }
    },
    {
      icon: "🎓",
      title: "Education",
      description: "Compare postsecondary participation, persistence, and graduation across age groups.",
      link: "/education",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      stats: { label: "2006-2024", value: "Trends" }
    },
    {
      icon: "💼",
      title: "Employment",
      description: "Explore how labour force trends vary by age over months and years.",
      link: "/employment",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      stats: { label: "Latest Stats", value: "July 2025" }
    },
  ];

  const features = [
    {
      icon: "📊",
      title: "Interactive Visualizations",
      description: "Explore data through dynamic charts and graphs with zoom, filter, and comparison features."
    },
    {
      icon: "🔍",
      title: "Youth-Focused Insights",
      description: "All datasets filtered to highlight trends and patterns specific to Canadians under 30."
    },
    {
      icon: "📈",
      title: "Multi-Year Trends",
      description: "Track changes over time with historical data spanning multiple years and election cycles."
    },
    {
      icon: "🌐",
      title: "Open Data Sources",
      description: "Built on publicly available datasets from Statistics Canada and CES research."
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <span className="badge-icon">✨</span>
            <span>Empowering Youth Through Data</span>
          </motion.div>
          
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Youth Data Explorer
          </motion.h1>
          
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Discover how young Canadians engage with education, employment, and elections through
            interactive data visualizations and comprehensive insights.
          </motion.p>
          
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link to="/cesdatasets" className="btn btn-primary btn-lg hero-cta">
              <span>Explore Data</span>
              <span className="arrow">→</span>
            </Link>
            <Link to="/about" className="btn btn-outline-primary btn-lg">
              Learn More
            </Link>
          </motion.div>
        </div>
        
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
      </motion.section>

      {/* Data Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Explore by Category</h2>
          <p className="section-subtitle">
            Dive into comprehensive datasets covering key aspects of youth life in Canada
          </p>
        </div>

        <motion.div
          className="categories-grid"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="category-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="card-icon-wrapper" style={{ background: card.gradient }}>
                <span className="card-icon">{card.icon}</span>
              </div>
              
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                
                <div className="card-stats">
                  <span className="stat-label">{card.stats.label}</span>
                  <span className="stat-value">{card.stats.value}</span>
                </div>
              </div>
              
              <Link to={card.link} className="card-link">
                <span>Explore {card.title}</span>
                <span className="link-arrow">→</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Why Use This Platform?</h2>
          <p className="section-subtitle">
            Powerful tools and insights to understand Canadian youth trends
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="cta-content">
          <h2 className="cta-title">Ready to Explore?</h2>
          <p className="cta-subtitle">
            Start discovering insights about Canadian youth across elections, education, and employment.
          </p>
          <Link to="/cesdatasets" className="btn btn-primary btn-lg">
            <span>Get Started</span>
            <span className="arrow">→</span>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;