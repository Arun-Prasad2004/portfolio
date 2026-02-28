import './Certifications.css';

const certifications = [
  {
    title: 'AWS Cloud Practitioner Essentials',
    image: '/aws.png',
    color: '#f97316',
  },
  {
    title: 'IBM Machine Learning with Python',
    image: '/ibm-ml-badge.png',
    color: '#00d4ff',
  },
  {
    title: 'IBM Python for Data Science',
    image: '/ibm-python-badge.png',
    color: '#7c3aed',
  },
  {
    title: 'Generative AI with Large Language Models',
    image: '/dliai-llm-badge.png',
    color: '#10b981',
  },
];

export const Certifications = () => (
  <div className="certifications-section">
    <h2 className="section-title">
      <span className="gradient-text">Certifications</span>
    </h2>
    <div className="cert-grid">
      {certifications.map((cert, index) => (
        <div className="cert-card-3d" key={index}>
          <div className="cert-card-inner" style={{ '--card-accent': cert.color }}>
            <div className="cert-image-wrapper">
              <img src={cert.image} alt={cert.title} className="cert-image" />
            </div>
            <span className="cert-title">{cert.title}</span>
            <div className="cert-shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
