import { useEffect, useState } from 'react';
import { Hero } from './Hero';
import { About } from './About';
import { Skills } from './Skills';
import { Education } from './Education';
import { Projects } from './Projects';
import { Experience } from './Experience';
import { Certifications } from './Certifications';
import { Achievements } from './Achievements';
import { Contact } from './Contact';
import { Navbar } from './Navbar';
import { ThreeBackground } from './WavyBackground';
import { useCursorGlow } from './hooks';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useCursorGlow();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const revealEls = document.querySelectorAll('[class*="reveal-"]');
    const sections = document.querySelectorAll('.fade-section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    revealEls.forEach((el) => observer.observe(el));
    return () => {
      sections.forEach((s) => observer.unobserve(s));
      revealEls.forEach((el) => observer.unobserve(el));
    };
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="preloader">
        <div className="preloader-content">
          <div className="preloader-ring">
            <div className="preloader-ring-inner"></div>
          </div>
          <span className="preloader-name">AP</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <ThreeBackground />
      <div className="app-container">
        <Navbar />
        <section id="hero"><Hero /></section>
        <div className="section-divider"></div>
        <section id="about" className="fade-section reveal-left"><About /></section>
        <div className="section-divider"></div>
        <section id="skills" className="fade-section reveal-up"><Skills /></section>
        <div className="section-divider"></div>
        <section id="education" className="fade-section reveal-right"><Education /></section>
        <div className="section-divider"></div>
        <section id="projects" className="fade-section reveal-up"><Projects /></section>
        <div className="section-divider"></div>
        <section id="experience" className="fade-section reveal-left"><Experience /></section>
        <div className="section-divider"></div>
        <section id="certifications" className="fade-section reveal-scale"><Certifications /></section>
        <div className="section-divider"></div>
        <section id="achievements" className="fade-section reveal-right"><Achievements /></section>
        <div className="section-divider"></div>
        <section id="contact" className="fade-section reveal-up"><Contact /></section>

        <footer className="portfolio-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-logo">AP</span>
              <p className="footer-tagline">Building the future with AI & Code</p>
            </div>
            <div className="footer-links">
              <a href="https://github.com/Arun-Prasad2004" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href="https://linkedin.com/in/arun-prasad-m-7a5882293" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="mailto:arunprasad839@gmail.com" aria-label="Email"><FaEnvelope /></a>
            </div>
            <p className="footer-copy">&copy; 2026 Arun Prasad M. Crafted with ❤️ and React.</p>
          </div>
        </footer>
      </div>

      {showTopBtn && (
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}

export default App;
