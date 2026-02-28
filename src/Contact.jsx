import './Contact.css';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaCode,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const contactLinks = [
  {
    icon: <FaEnvelope />,
    label: 'arunprasad839@gmail.com',
    href: 'mailto:arunprasad839@gmail.com',
    color: '#ea4335',
  },
  {
    icon: <FaPhone />,
    label: '+91 6379077509',
    href: 'tel:+916379077509',
    color: '#10b981',
  },
  {
    icon: <FaLinkedin />,
    label: 'linkedin.com/in/arun-prasad-m',
    href: 'https://linkedin.com/in/arun-prasad-m-7a5882293',
    color: '#0077b5',
  },
  {
    icon: <FaGithub />,
    label: 'github.com/Arun-Prasad2004',
    href: 'https://github.com/Arun-Prasad2004',
    color: '#e2e8f0',
  },
  {
    icon: <FaCode />,
    label: 'LeetCode Profile',
    href: 'https://leetcode.com/u/l4FJd8ON8Y/',
    color: '#f97316',
  },
  {
    icon: <FaMapMarkerAlt />,
    label: 'Madurai, India',
    href: null,
    color: '#00d4ff',
  },
];

export const Contact = () => (
  <div className="contact-section">
    <h2 className="section-title">
      Get in <span className="gradient-text">Touch</span>
    </h2>
    <p className="contact-subtitle">
      Feel free to reach out through any of the platforms below.
    </p>
    <div className="contact-grid">
      {contactLinks.map((link, index) => {
        const Tag = link.href ? 'a' : 'div';
        const linkProps = link.href
          ? {
              href: link.href,
              target: link.href.startsWith('http') ? '_blank' : undefined,
              rel: 'noopener noreferrer',
            }
          : {};
        return (
          <Tag key={index} className="contact-card-3d" {...linkProps}>
            <div className="contact-card-inner" style={{ '--card-accent': link.color }}>
              <div className="contact-icon" style={{ color: link.color }}>
                {link.icon}
              </div>
              <span className="contact-label">{link.label}</span>
            </div>
          </Tag>
        );
      })}
    </div>
  </div>
);
