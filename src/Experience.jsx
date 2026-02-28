import './Experience.css';

export const Experience = () => (
  <div className="experience-section">
    <h2 className="section-title">
      Position of <span className="gradient-text">Responsibility</span>
    </h2>
    <div className="experience-container">
      <div className="experience-card-3d">
        <div className="experience-card-inner">
          <div className="experience-logo-wrapper">
            <img src="/aws.png" alt="AWS Cloud Club" className="experience-logo" />
          </div>
          <div className="experience-content">
            <h3 className="experience-role">Graphic Designer</h3>
            <p className="experience-org">PSNA AWS Cloud Club</p>
            <p className="experience-duration">2025 – 2026</p>
            <p className="experience-desc">
              Designing visual content and promotional materials for the AWS Cloud Club
              at PSNA College of Engineering and Technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
