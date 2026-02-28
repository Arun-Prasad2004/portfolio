import React, { useEffect, useState, useRef } from 'react';
import './Hero.css';

const roles = [
  'AI/ML Developer',
  'Java Developer',
  'Agentic AI Builder',
  'Data Science Enthusiast',
];

const stats = [
  { target: 4, suffix: '+', label: 'Projects' },
  { target: 200, suffix: '+', label: 'LeetCode' },
  { target: 4, suffix: '', label: 'Certifications' },
];

function AnimatedStat({ target, suffix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const start = performance.now();
          const duration = target > 100 ? 2200 : 1200;
          const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-number">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting) {
      if (text.length < currentRole.length) {
        timeout = setTimeout(() => setText(currentRole.slice(0, text.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <div className={`hero-section ${visible ? 'hero-visible' : ''}`}>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Available for Opportunities
        </div>
        <h1 className="hero-title">
          <span className="hero-greeting">Hi, I'm</span>
          <span className="glitch-wrapper">
            <span className="glitch-text" data-text="Arun Prasad">Arun Prasad</span>
          </span>
        </h1>
        <div className="hero-typing">
          <span className="typing-prefix">I'm a </span>
          <span className="typing-text">{text}</span>
          <span className="cursor">|</span>
        </div>
        <p className="hero-desc">
          Versatile Engineer specializing in AI/ML, Agentic AI, and Java Development.
          Building intelligent agents, autonomous systems, and data pipelines.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="hero-btn primary">
            <span>View Projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17l9.2-9.2M17 17V7H7"/>
            </svg>
          </a>
          <a href="#contact" className="hero-btn secondary">Contact Me</a>
        </div>
        <div className="hero-stats">
          {stats.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div className="stat-divider"></div>}
              <AnimatedStat target={s.target} suffix={s.suffix} label={s.label} />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span className="scroll-text">Scroll Down</span>
      </div>
    </div>
  );
};
