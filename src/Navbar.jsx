import { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
  { id: '#hero', label: 'Home' },
  { id: '#about', label: 'About' },
  { id: '#skills', label: 'Skills' },
  { id: '#education', label: 'Education' },
  { id: '#projects', label: 'Projects' },
  { id: '#experience', label: 'Responsibility' },
  { id: '#certifications', label: 'Certifications' },
  { id: '#achievements', label: 'Achievements' },
  { id: '#contact', label: 'Contact' },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.id.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection('#' + sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-brand">
        <span className="brand-name">AP</span>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
      </div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.id}
            className={activeSection === link.id ? 'active' : ''}
            onClick={(e) => scrollToSection(e, link.id)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};
