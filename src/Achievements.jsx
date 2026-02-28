import './Achievements.css';
import { FaTrophy, FaCode } from 'react-icons/fa';

export const Achievements = () => (
  <div className="achievements-section">
    <h2 className="section-title">
      <span className="gradient-text">Achievements</span>
    </h2>
    <div className="achievements-grid">
      <div className="achievement-card-3d">
        <div className="achievement-card-inner">
          <div className="achievement-icon trophy">
            <FaTrophy />
          </div>
          <img src="/tce.jpg" alt="TechFusion Certificate" className="achievement-img" />
          <h3>TechFusion Ideathon</h3>
          <p className="achievement-detail">2nd Prize – TCE Madurai</p>
          <span className="achievement-date">September 2024</span>
        </div>
      </div>

      <div className="achievement-card-3d">
        <div className="achievement-card-inner">
          <div className="achievement-icon trophy">
            <FaTrophy />
          </div>
          <img src="/srm.jpg" alt="Techspectrum Certificate" className="achievement-img" />
          <h3>Techspectrum Ideanova</h3>
          <p className="achievement-detail">2nd Prize – SRM Trichy</p>
          <span className="achievement-date">October 2024</span>
        </div>
      </div>

      <div className="achievement-card-3d">
        <div className="achievement-card-inner">
          <div className="achievement-icon code">
            <FaCode />
          </div>
          <div className="leetcode-badge">
            <span className="leetcode-number">200+</span>
            <span className="leetcode-text">Problems Solved</span>
          </div>
          <h3>LeetCode</h3>
          <p className="achievement-detail">Consistent Problem Solver</p>
          <span className="achievement-date">2025 – 2026</span>
        </div>
      </div>
    </div>
  </div>
);
