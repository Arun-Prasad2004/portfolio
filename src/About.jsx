import './About.css';

export const About = () => (
  <div className="about-section">
    <h2 className="section-title">
      About <span className="gradient-text">Me</span>
    </h2>
    <div className="about-content">
      <div className="about-image-wrapper">
        <div className="image-ring"></div>
        <div className="image-ring-2"></div>
        <img src="/profile.jpg" alt="Arun Prasad" className="about-img" />
        <div className="image-glow"></div>
      </div>
      <div className="about-info">
        <div className="about-glass-card">
          <p className="about-text">
            Versatile Engineer with deep expertise in{' '}
            <span className="highlight">AI/ML development</span>,{' '}
            <span className="highlight">Agentic AI systems</span>, and{' '}
            <span className="highlight">Java Development</span>. Experienced in
            deploying intelligent agents, multi-agent architectures, and scalable data pipelines.
            Passionate about building autonomous cognitive systems and pushing the boundaries
            of predictive modeling.
          </p>
          <div className="about-details">
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span>Madurai, India</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🎓</span>
              <span>B.Tech AI & Data Science</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">💻</span>
              <span>AI/ML & Agentic AI Developer</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🏫</span>
              <span>PSNA College of Engineering</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
