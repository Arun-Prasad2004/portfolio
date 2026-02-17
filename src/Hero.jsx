import { useEffect, useRef, useState } from "react";
import "./Hero.css";

export const Hero = () => {
  const [animate, setAnimate] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect(); // run once → efficiency
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className={`hero-section ${animate ? "show" : ""}`}>
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay">
        <h1>
          Hi, I'm <span className="highlight">Arun</span>
        </h1>

        <p className="typing">
          AI + Web Developer blending logic with creativity
        </p>

        <div className="hero-actions">
          <button className="primary-btn">View Projects</button>
          <button className="secondary-btn">Contact Me</button>
        </div>

        <div className="scroll-indicator">
          <div className="mouse"></div>
        </div>
      </div>
    </section>
  );
};
