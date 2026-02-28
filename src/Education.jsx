import './Education.css';

const educationData = [
  {
    degree: 'B.Tech Artificial Intelligence & Data Science',
    institution: 'PSNA College of Engineering and Technology',
    location: 'Dindigul, India',
    period: '2023 – Present',
    score: 'CGPA: 7.5',
    icon: '🎓',
  },
  {
    degree: 'Higher Secondary (HSC)',
    institution: 'CEOA Matric. Hr. Sec. School',
    location: 'Madurai, India',
    period: '2022 – 2023',
    score: '85.16%',
    icon: '📚',
  },
  {
    degree: 'SSLC',
    institution: 'CEOA Matric. Hr. Sec. School',
    location: 'Madurai, India',
    period: '2020 – 2021',
    score: '',
    icon: '🏫',
  },
];

export const Education = () => (
  <div className="education-section">
    <h2 className="section-title">
      <span className="gradient-text">Education</span>
    </h2>
    <div className="edu-timeline">
      {educationData.map((edu, index) => (
        <div className="edu-card-3d" key={index}>
          <div className="edu-timeline-dot">
            <span className="dot-inner"></span>
          </div>
          <div className="edu-card-inner">
            <div className="edu-icon">{edu.icon}</div>
            <h3 className="edu-degree">{edu.degree}</h3>
            <p className="edu-institution">{edu.institution}</p>
            <p className="edu-location">{edu.location}</p>
            <p className="edu-period">{edu.period}</p>
            {edu.score && <span className="edu-score">{edu.score}</span>}
          </div>
        </div>
      ))}
    </div>
  </div>
);
